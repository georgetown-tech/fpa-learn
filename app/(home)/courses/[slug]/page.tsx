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

export default async function IndexPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = decodeURIComponent(params.slug);
  const course = await prisma.course.findUnique({
    where: {
      slug: slug,
    },
  });

  return (
    <>
      <section className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <p className="mb-2 font-semibold text-indigo-500 md:mb-3 lg:text-lg">
            {course?.category}
          </p>

          <h2 className="mb-4 text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            {course?.name}
          </h2>

          <p className="max-w-screen-md text-gray-500 md:text-lg">
            {course?.description}
          </p>
        </div>
      </section>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Meet your Teachers
            </h2>

            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
              Our teachers are passionate experts dedicated to nurturing your
              programming journey. They bring real-world experience and
              enthusiasm to every class&mdash; making learning rewarding.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            <div className="flex flex-col items-center gap-2 sm:flex-row md:gap-4">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100 shadow-lg md:h-32 md:w-32">
                <img
                  src="https://images.unsplash.com/photo-1567515004624-219c11d31f2e??auto=format&q=75&fit=crop&w=256"
                  loading="lazy"
                  alt="Photo by Radu Florin"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div>
                <div className="text-center font-bold text-indigo-500 sm:text-left md:text-lg">
                  John McCulling
                </div>
                <p className="text-center text-sm text-gray-500 sm:text-left md:text-base">
                  Founder / CEO
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// export const Head = () => <Seo title="Home" children={<><base target="_top" /></>} />
