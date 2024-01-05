import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import HoyaLogo from "@/res/hoya.svg";
import {
  Pen,
  Users,
  Focus,
  FolderKanban,
  Paintbrush,
  SearchCode,
  Shapes,
  ArrowRight,
  Search,
} from "lucide-react";
import {
  TextInput,
  Accordion,
  AccordionHeader,
  AccordionBody,
  AccordionList,
} from "@tremor/react";
import Course from "@/components/course";
import CourseSection from "@/components/course-section";
import { defaultCategories } from "@/components/categories";

// import {StlViewer} from "react-stl-viewer";

const style = {
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
};

export default async function IndexPage({}) {
  const courses = await prisma.course.findMany({});
  const categories = [...defaultCategories]

  courses.forEach((element) => {
    let a =
      categories[
        categories.indexOf(
          categories.filter((i: any) => i.name == element.category)[0],
        )
      ];

    a.courses.push(element);
  });

  return (
    <>
      <CourseSection courseCount={courses.length} categories={categories} />
    </>
  );
}

// export const Head = () => <Seo title="Home" children={<><base target="_top" /></>} />
