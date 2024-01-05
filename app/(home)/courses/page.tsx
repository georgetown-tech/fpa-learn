"use client"

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
  Search
} from "lucide-react";
import { TextInput, Accordion, AccordionHeader, AccordionBody, AccordionList } from "@tremor/react";
import Course from "@/components/course";

const categories = [
  {
    icon: <Pen className="w-5" />,
    name: "Writing",
    courses: [
      {
        name: "Intro to Creative Writing",
        slug: "intro-to-creative-writing"
      },
      {
        name: "Advanced Writing",
        slug: "advanced-writing"
      },
    ],
    color: "#82C0CC"
  }
]

// import {StlViewer} from "react-stl-viewer";

const style = {
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
};

export default  function IndexPage({}) {

  return (
    <>
        <section className="mx-auto max-w-screen-xl p-4 flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row">
            <div className="flex flex-col justify-between xl:w-5/12">
                <div></div>

                <div className="sm:text-center lg:py-12 lg:text-left xl:py-24">
                    <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-md xl:text-xl">Over {500} Courses and Counting</p>

                    <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-5xl">Through Knowledge, Meaning is Found.</h1>

                    <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
                        <TextInput icon={Search} placeholder="What would you like to learn?" />
                        <a href="/random" className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base whitespace-nowrap">Surprise me!</a>
                    </div>
                </div>
            </div>
            <div className="h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-auto xl:w-5/12">
                <img src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&q=75&fit=crop&w=1000" loading="lazy" alt="Photo by Fakurian Design" className="h-full w-full object-cover object-center" />
            </div>
        </section>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <h2 className="text-left text-2xl font-bold text-gray-800 lg:text-3xl">Writing</h2>
            <p className="mb-8 md:mb-12">This is a really short description.</p>

            <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                <Course data={{ id: "5", name: "Intro to Writing", description: "" }} />
            </div>
        </div>
    </div>
    </>
  );
}

// export const Head = () => <Seo title="Home" children={<><base target="_top" /></>} />
