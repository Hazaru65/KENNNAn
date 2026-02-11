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

// PUT: Proje güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const projects = await readProjects();
  const index = projects.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Proje bulunamadı" }, { status: 404 });
  }

  // Keep id, merge everything else
  const updated: Project = {
    ...projects[index],
    name: body.name ?? projects[index].name,
    location: body.location ?? projects[index].location,
    year: body.year ?? projects[index].year,
    category: body.category ?? projects[index].category,
    heroImage: body.heroImage ?? projects[index].heroImage,
    thumbnail: body.thumbnail ?? projects[index].thumbnail,
    area: body.area ?? projects[index].area,
    role: body.role ?? projects[index].role,
    software: body.software ?? projects[index].software,
    story: body.story ?? projects[index].story,
    gallery: body.gallery ?? projects[index].gallery,
    topView: body.topView ?? projects[index].topView,
    tourScenes: body.tourScenes ?? projects[index].tourScenes,
    panoramaScenes: body.panoramaScenes ?? projects[index].panoramaScenes,
  };

  projects[index] = updated;
  await writeProjects(projects);

  return NextResponse.json(updated);
}

// DELETE: Proje sil
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const { id } = await params;
  const projects = await readProjects();
  const index = projects.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Proje bulunamadı" }, { status: 404 });
  }

  projects.splice(index, 1);
  await writeProjects(projects);

  return NextResponse.json({ success: true });
}
