import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === "authenticated";
}

// Dosya adını güvenli hale getir
function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (files.length === 0) {
      return NextResponse.json(
        { error: "Dosya yüklenmedi" },
        { status: 400 }
      );
    }

    // Alt klasör (opsiyonel) - proje slug'ı ile organize etmek için
    const subfolder = formData.get("subfolder") as string | null;
    const targetDir = subfolder
      ? path.join(UPLOAD_DIR, sanitizeFilename(subfolder))
      : UPLOAD_DIR;

    // Klasörü oluştur
    await fs.mkdir(targetDir, { recursive: true });

    const uploadedUrls: string[] = [];

    for (const file of files) {
      // Boyut kontrolü: max 10MB
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: `Dosya çok büyük: ${file.name} (max 10MB)` },
          { status: 400 }
        );
      }

      // Tip kontrolü
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: `Geçersiz dosya tipi: ${file.name}` },
          { status: 400 }
        );
      }

      // Benzersiz dosya adı
      const ext = path.extname(file.name) || ".jpg";
      const baseName = sanitizeFilename(path.basename(file.name, ext));
      const timestamp = Date.now();
      const fileName = `${baseName}-${timestamp}${ext}`;

      // Dosyayı yaz
      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(targetDir, fileName);
      await fs.writeFile(filePath, buffer);

      // Public URL
      const relativePath = subfolder
        ? `/uploads/${sanitizeFilename(subfolder)}/${fileName}`
        : `/uploads/${fileName}`;
      uploadedUrls.push(relativePath);
    }

    return NextResponse.json({ urls: uploadedUrls }, { status: 201 });
  } catch (error) {
    console.error("Yükleme hatası:", error);
    return NextResponse.json(
      { error: "Dosya yükleme başarısız" },
      { status: 500 }
    );
  }
}
