import "server-only";
import fs from "fs/promises";
import path from "path";
import type { Project } from "./projects";

const DATA_PATH = path.join(process.cwd(), "public", "data", "projects.json");

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(data) as Project[];
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.id === slug);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.slice(0, 3);
}
