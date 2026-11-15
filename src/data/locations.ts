type Location = {
  readonly name: string;
  readonly region: string;
  readonly status: string;
  readonly homes: string;
  readonly projectSlug?: string;
  readonly coords: readonly [number, number];
};

export const locations: readonly Location[] = [
  {
    name: "Palm Jumeirah",
    region: "Dubai",
    status: "Building",
    homes: "340 delivered · 92 in progress",
    projectSlug: "the-solenne",
    coords: [55.138, 25.112],
  },
  {
    name: "Dubai Hills",
    region: "Dubai",
    status: "Building",
    homes: "88 delivered · 24 in progress",
    projectSlug: "maison-aria",
    coords: [55.25, 25.1],
  },
  {
    name: "Downtown Dubai",
    region: "Dubai",
    status: "Building",
    homes: "312 in progress",
    projectSlug: "the-residences-08",
    coords: [55.274, 25.197],
  },
  {
    name: "Jumeirah Bay",
    region: "Dubai",
    status: "Delivered",
    homes: "32 delivered",
    coords: [55.243, 25.212],
  },
  {
    name: "Saadiyat Island",
    region: "Abu Dhabi",
    status: "Delivered",
    homes: "240 delivered",
    coords: [54.44, 24.545],
  },
  {
    name: "Al Marjan Island",
    region: "Ras Al Khaimah",
    status: "Delivered",
    homes: "210 delivered",
    coords: [55.755, 25.665],
  },
  {
    name: "Al Mouj",
    region: "Muscat",
    status: "Delivered",
    homes: "160 delivered",
    coords: [58.28, 23.63],
  },
  {
    name: "Sindalah",
    region: "Red Sea",
    status: "Planned",
    homes: "Home count not provided",
    coords: [35.2, 27.95],
  },
] as const;
