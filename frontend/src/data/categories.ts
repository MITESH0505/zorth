export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  color: string;
  count?: number;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Streaming",
    slug: "streaming",
    icon: "tv",
    description: "Live TV, sports streams, and IPTV resources",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "2",
    name: "Anime",
    slug: "anime",
    icon: "film",
    description: "Anime streaming, manga, and community platforms",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "3",
    name: "Movies / TV",
    slug: "movies",
    icon: "clapperboard",
    description: "Movie streaming, databases, and reviews",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "4",
    name: "Gaming",
    slug: "gaming",
    icon: "gamepad-2",
    description: "Game downloads, mods, and gaming communities",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "5",
    name: "Reading",
    slug: "reading",
    icon: "book-open",
    description: "ebooks, articles, libraries, and literature",
    color: "from-yellow-500 to-amber-500",
  },
  {
    id: "6",
    name: "AI",
    slug: "ai",
    icon: "sparkles",
    description: "AI tools, chatbots, and machine learning resources",
    color: "from-violet-500 to-indigo-500",
  },
  {
    id: "7",
    name: "Software",
    slug: "software",
    icon: "terminal",
    description: "Software downloads, open source tools, and utilities",
    color: "from-sky-500 to-blue-500",
  },
  {
    id: "8",
    name: "Music",
    slug: "music",
    icon: "music",
    description: "Music streaming, downloads, and audio tools",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "9",
    name: "Android / iOS",
    slug: "android-ios",
    icon: "smartphone",
    description: "Mobile apps, APKs, and iOS resources",
    color: "from-green-500 to-teal-500",
  },
  {
    id: "10",
    name: "Linux / macOS",
    slug: "linux-macos",
    icon: "monitor",
    description: "Desktop tools, tweaks, and system utilities",
    color: "from-orange-500 to-yellow-500",
  },
  {
    id: "11",
    name: "Educational",
    slug: "educational",
    icon: "graduation-cap",
    description: "Courses, tutorials, and learning platforms",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "12",
    name: "Miscellaneous",
    slug: "miscellaneous",
    icon: "grid-3x3",
    description: "Internet tools, utilities, and other resources",
    color: "from-gray-500 to-slate-500",
  },
];
