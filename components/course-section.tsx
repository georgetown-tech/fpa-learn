"use client";

import { Search } from "lucide-react";
import {
  TextInput,
  Accordion,
  AccordionHeader,
  AccordionBody,
  AccordionList,
} from "@tremor/react";
import { ReactElement } from "react";
import { Category } from "@/components/categories";
import Course from "./course";

export default function CourseSection({
  categories,
  courseCount,
}: {
  categories: Category[];
  courseCount: number;
}) {
  return (
    <>
      <section className="mx-auto flex max-w-screen-xl flex-col justify-between gap-6 p-4 sm:gap-10 md:gap-16 lg:flex-row">
        <div className="flex flex-col justify-between xl:w-5/12">
          <div></div>

          <div className="sm:text-center lg:py-12 lg:text-left xl:py-24">
            <p className="md:text-md mb-4 font-semibold text-indigo-500 md:mb-6 xl:text-xl">
              Over {courseCount} Courses and Counting
            </p>

            <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-5xl">
              Through Knowledge, Meaning is Found.
            </h1>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
              <TextInput
                icon={Search}
                placeholder="What would you like to learn?"
              />
              <a
                href="/random"
                className="inline-block whitespace-nowrap rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
              >
                Surprise me!
              </a>
            </div>
          </div>
        </div>
        <div className="h-48 hidden md:block overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-auto xl:w-5/12">
          <img
            src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&q=75&fit=crop&w=1000"
            loading="lazy"
            alt="Photo by Fakurian Design"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </section>
      {categories.map((i, n) => {
        return (
          <div className="bg-white py-6 sm:py-8 lg:py-12" key={n}>
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
              <div className="flex flex-row gap-2">
                <div className="aspect-square h-full p-4 [&>*]:scale-150">
                  {i.icon}
                </div>
                <div>
                  <h2 className="text-left text-2xl font-bold text-gray-800 lg:text-3xl">
                    {i.name}
                  </h2>
                  <p className="mb-8 md:mb-12">{i.description}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {i.courses.map((j, m) => (
                  <Course key={m} data={j} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
