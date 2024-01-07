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
import BlurImage from "@/components/blur-image";
import { ArticleType } from "@prisma/client";
import Article from "@/components/article";

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
    include: {
      chapters: true,
    },
  });

  if (course == null) return <>Implement 404 Page.</>;

  const articles = await prisma.article.findMany({
    where: {
      courseId: course.id,
    },
    include: {
      user: true,
    },
  });

  let chapters = [...course.chapters];
  let chapterContent: Array<Array<ArticleType>> = [];

  // Fill in chapter content
  chapters.forEach((i, n) => (chapterContent[n] = []));

  articles.forEach((i) => {
    let mapChapId = chapters.indexOf(
      chapters.filter((j) => j.id == i.chapterId)[0],
    );

    chapterContent[mapChapId].push(i);
  });

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
          <div className="mr-auto place-self-center lg:col-span-7">
            <p className="mb-2 font-semibold text-indigo-500 md:mb-3 lg:text-lg">
              {course?.category}
            </p>
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
              {course?.name}
            </h1>
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              {course?.description}
            </p>
            <a
              href="#"
              className="mr-3 inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Start Learning
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="#teachers"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              See Teachers
            </a>
          </div>
          <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
            <BlurImage
              className="aspect-video w-full rounded-xl object-cover shadow"
              src={course?.image || ""}
              blurDataURL={course?.imageBlurhash || ""}
              alt={`Course image for ${course?.name}`}
              width={800}
              height={500}
            />
          </div>
        </div>
      </section>
      {course?.chapters.map((i, n) => {
        return (
          <section key={n} className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {i.title}
              </h2>
              <p className="mb-8 max-w-screen-md text-gray-500 md:text-lg">
                {i.description}
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
                {chapterContent[n].map((j, m) => (
                  <Article key={m} data={j} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section id="teachers" className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
            Meet your Teachers
          </h2>
          <p className="mb-8 max-w-screen-md text-gray-500 md:text-lg">
            Our teachers are passionate experts dedicated to nurturing your
            programming journey. They bring real-world experience and enthusiasm
            to every class&mdash; making learning rewarding.
          </p>
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
      </section>
    </>
  );
}

// export const Head = () => <Seo title="Home" children={<><base target="_top" /></>} />
