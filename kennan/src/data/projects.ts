export type PanoramaHotspot = {
  id: string;
  targetSceneId: string;
  yaw: number;
  pitch: number;
  label?: string;
};

export type PanoramaScene = {
  id: string;
  name: string;
  imageUrl: string;
  position: { x: number; y: number };
  hotspots: PanoramaHotspot[];
};

export type Project = {
  id: string;
  name: string;
  location: string;
  year: string;
  category: "Konut" | "Ticari" | "İç Mekân" | "Kentsel";
  heroImage: string;
  thumbnail: string;
  area: string;
  role: string;
  software: string;
  story: string[];
  gallery: string[];
  topView: string;
  tourScenes: {
    id: string;
    title: string;
    image: string;
    next?: string[];
  }[];
  panoramaScenes?: PanoramaScene[];
};

// Client-side: fetch from API
export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch("/api/projects", { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export async function fetchProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await fetchProjects();
  return projects.find((p) => p.id === slug);
}
