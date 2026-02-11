export type Project = {
  id: string;
  name: string;
  location: string;
  year: string;
  category: "Konut" | "Ticari" | "Ic Mekan" | "Kentsel";
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
};

export const projects: Project[] = [
  {
    id: "sahil-yali",
    name: "Sahil Yalisi",
    location: "Izmir, Turkiye",
    year: "2024",
    category: "Konut",
    heroImage: "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=900&auto=format&fit=crop",
    area: "4.200 m2",
    role: "Mimari Tasarim + Uygulama",
    software: "Revit, Rhino, Lumion",
    story: [
      "Denizle kurdugu iliski, yapinin her hattinda akiskan bir ritim yaratir. Yapinin kurgusu, gun isigini iceriye davet ederken ruzgarin yonunu da dikkate alir.",
      "Konutun ana omurgasi kuzeye dogru bir galeriyle genisler. Zemin kat acik ve yari acik hacimler arasinda esnek bir dolasim sunar.",
      "Malzeme seciminde dogal tas ve sicak ahsap birlikte kullanildi. Bu ikili, mekanin sade ama zamansiz karakterini guclendirir.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=1600&auto=format&fit=crop",
    ],
    topView: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1400&auto=format&fit=crop",
    tourScenes: [
      {
        id: "giris",
        title: "Giris Avlusu",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop",
        next: ["salon", "teras"],
      },
      {
        id: "salon",
        title: "Salon",
        image: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=1600&auto=format&fit=crop",
        next: ["giris", "teras"],
      },
      {
        id: "teras",
        title: "Teras",
        image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1600&auto=format&fit=crop",
        next: ["giris"],
      },
    ],
  },
  {
    id: "kent-kulesi",
    name: "Kent Kulesi",
    location: "Ankara, Turkiye",
    year: "2023",
    category: "Ticari",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=900&auto=format&fit=crop",
    area: "28.000 m2",
    role: "Konsept + Mimari",
    software: "Revit, 3ds Max, Twinmotion",
    story: [
      "Kentin yogun dokusu icinde yukselen kule, yalin bir siluet ve dengeli bir cephe ritmiyle tanimlanir.",
      "Icteki programlar katlara duzenli sekilde dagilirken ortak alanlar manzara odakli kurgulanmistir.",
      "Cephede kullanilan metal mesh, gunes kontrolunu saglarken gece gorunumunde opak bir parilti yaratir.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop",
    ],
    topView: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1400&auto=format&fit=crop",
    tourScenes: [
      {
        id: "lobi",
        title: "Lobi",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
        next: ["atrium"],
      },
      {
        id: "atrium",
        title: "Atrium",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop",
        next: ["lobi"],
      },
    ],
  },
  {
    id: "beyaz-avlu",
    name: "Beyaz Avlu",
    location: "Antalya, Turkiye",
    year: "2022",
    category: "Ic Mekan",
    heroImage: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=900&auto=format&fit=crop",
    area: "1.250 m2",
    role: "Ic Mekan Tasarim",
    software: "SketchUp, V-Ray",
    story: [
      "Ic mekan, tek bir avlu etrafinda dolasan aydinlik hacimler uzerine kurgulandi.",
      "Beyaz tonlar ve ince dokular, gun boyu degisen isigi yansitarak mekani aydinlik tutar.",
      "Sirkulasyon, avlu boyunca panoramik bir rota yaratir ve kullaniciyi mekanin kalbine tasir.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop",
    ],
    topView: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1400&auto=format&fit=crop",
    tourScenes: [
      {
        id: "avlu",
        title: "Avlu",
        image: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=1600&auto=format&fit=crop",
        next: ["hol"],
      },
      {
        id: "hol",
        title: "Hol",
        image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1600&auto=format&fit=crop",
        next: ["avlu"],
      },
    ],
  },
  {
    id: "lagun-park",
    name: "Lagun Park",
    location: "Mugla, Turkiye",
    year: "2021",
    category: "Kentsel",
    heroImage: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1600&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=900&auto=format&fit=crop",
    area: "62.000 m2",
    role: "Kentsel Tasarim",
    software: "AutoCAD, Rhino",
    story: [
      "Kiyiya paralel uzanan promenad, su kenarinda nefes alan bir kamusal hat olusturur.",
      "Yesil cepler ve gozlem teraslari, peyzajla mimariyi tek bir akista bulusturur.",
      "Gece aydinlatmalari, guvenli ve yavas bir yuruyus deneyimi sunar.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
    ],
    topView: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",
    tourScenes: [
      {
        id: "promenad",
        title: "Promenad",
        image: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1600&auto=format&fit=crop",
        next: ["teras"],
      },
      {
        id: "teras",
        title: "Teras",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
        next: ["promenad"],
      },
    ],
  },
];

export const featuredProjects = projects.slice(0, 3);
