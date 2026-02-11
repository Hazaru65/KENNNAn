import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import type { Project } from "@/data/projects";

const DATA_PATH = path.join(process.cwd(), "public", "data", "projects.json");
const COOKIE_NAME = "admin_session";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === "authenticated";
}

async function readProjects(): Promise<Project[]> {
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeProjects(projects: Project[]): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(projects, null, 2), "utf-8");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// GET: Tüm projeleri listele (public)
export async function GET() {
  const projects = await readProjects();
  return NextResponse.json(projects);
}

// POST: Yeni proje ekle (admin only)
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const body = await request.json();
  const projects = await readProjects();

  // Auto-generate slug from name
  let id = slugify(body.name || "proje");
  // Ensure unique
  let counter = 1;
  while (projects.some((p) => p.id === id)) {
    id = slugify(body.name || "proje") + "-" + counter;
    counter++;
  }

  const newProject: Project = {
    id,
    name: body.name || "",
    location: body.location || "",
    year: body.year || new Date().getFullYear().toString(),
    category: body.category || "Konut",
    heroImage: body.heroImage || "",
    thumbnail: body.thumbnail || "",
    area: body.area || "",
    role: body.role || "",
    software: body.software || "",
    story: body.story || [],
    gallery: body.gallery || [],
    topView: body.topView || "",
    tourScenes: body.tourScenes || [],
    panoramaScenes: body.panoramaScenes || [],
  };

  projects.push(newProject);
  await writeProjects(projects);

  return NextResponse.json(newProject, { status: 201 });
}
