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
import { Article as ArticleType, User } from "@prisma/client";
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
  const article = await prisma.article.findUnique({
    where: {
      slug: slug,
    },
    include: {
      user: true,
    },
  });

  if (article == null) return <>Implement 404 Page.</>;

  return (
    <main className="bg-white pb-16 pt-8 antialiased dark:bg-gray-900 lg:pb-24 lg:pt-16">
      <div className="mx-auto flex max-w-screen-xl justify-between px-4 ">
        <article className="format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mx-auto w-full max-w-2xl">
          <header className="not-format mb-4 lg:mb-6">
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 dark:text-white lg:mb-6 lg:text-4xl">
              {article.title}
            </h1>
            <address className="mb-6 flex items-center not-italic">
              <div className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
                <img
                  className="mr-4 h-12 w-12 rounded-full"
                  src={article.user?.image || ""}
                  alt={article.user?.name || ""}
                />
                <div>
                  <a
                    href={`/teacher/${article.user?.id}`}
                    rel="author"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {article.user?.name}
                  </a>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    <time
                      dateTime={article.createdAt.toISOString()}
                      title="February 8th, 2022"
                    >
                      {article.createdAt.toISOString()}
                    </time>
                  </p>
                </div>
              </div>
            </address>
          </header>
          <p className="lead">
            {article.content}
          </p>
        </article>
      </div>
    </main>
  );
}
