import {
  Activity,
  Binary,
  Book,
  BookOpen,
  Briefcase,
  Contact2,
  Film,
  Globe,
  Landmark,
  Megaphone,
  Orbit,
  Settings,
  Shell,
  TestTubes,
  TrendingUp,
  Users,
} from "lucide-react";
import { ReactElement } from "react";

export interface Course {
  id: string;
  category: string | null;
  name: string | null;
  description: string | null;
  image: string | null;
  imageBlurhash: string | null;
  slug: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  icon: ReactElement;
  name: string;
  description: string;
  color: string;
  courses: Course[];
}

export const defaultCategories: Category[] = [
  {
    icon: <Binary className="w-5" />,
    name: "Computer Science",
    description:
      "Explore the fundamentals of computing, algorithms, and programming languages.",
    courses: [],
    color: "#82C0CC",
  },
  {
    icon: <BookOpen className="w-5" />,
    name: "Mathematics",
    description:
      "Dive into the world of numbers, equations, and mathematical theories.",
    courses: [],
    color: "#A593E0",
  },
  {
    icon: <Shell className="w-5" />,
    name: "Biology",
    description: "Study life and living organisms, from cells to ecosystems.",
    courses: [],
    color: "#F4A261",
  },
  {
    icon: <TestTubes className="w-5" />,
    name: "Chemistry",
    description: "Discover the properties and transformations of matter.",
    courses: [],
    color: "#6D6875",
  },
  {
    icon: <TrendingUp className="w-5" />,
    name: "Economics",
    description:
      "Learn about the production, consumption, and transfer of wealth.",
    courses: [],
    color: "#F4A261",
  },
  {
    icon: <Orbit className="w-5" />,
    name: "Physics",
    description:
      "Explore the fundamental forces and laws governing the natural world.",
    courses: [],
    color: "#E07A5F",
  },
  {
    icon: <Settings className="w-5" />,
    name: "Engineering",
    description:
      "Delve into the application of scientific principles to design and build structures, machines, and systems.",
    courses: [],
    color: "#6D6875",
  },
  {
    icon: <Users className="w-5" />,
    name: "Psychology",
    description: "Study human behavior and mental processes.",
    courses: [],
    color: "#82C0CC",
  },
  {
    icon: <Globe className="w-5" />,
    name: "Sociology",
    description: "Examine the structure and dynamics of human society.",
    courses: [],
    color: "#F4A261",
  },
  {
    icon: <Film className="w-5" />,
    name: "Film Studies",
    description: "Analyze the art, history, and techniques of filmmaking.",
    courses: [],
    color: "#A593E0",
  },
  {
    icon: <Briefcase className="w-5" />,
    name: "Business",
    description:
      "Explore the principles of managing organizations and businesses.",
    courses: [],
    color: "#E07A5F",
  },
  {
    icon: <Megaphone className="w-5" />,
    name: "Marketing",
    description:
      "Study strategies for promoting and selling products or services.",
    courses: [],
    color: "#82C0CC",
  },
  {
    icon: <Landmark className="w-5" />,
    name: "Finance",
    description:
      "Learn about managing money, investments, and financial planning.",
    courses: [],
    color: "#F4A261",
  },
  {
    icon: <Contact2 className="w-5" />,
    name: "Human Resources",
    description: "Understand the management of an organization's workforce.",
    courses: [],
    color: "#A593E0",
  },
  {
    icon: <Book className="w-5" />,
    name: "Literature",
    description:
      "Explore written works, literary techniques, and cultural significance.",
    courses: [],
    color: "#6D6875",
  },
];
