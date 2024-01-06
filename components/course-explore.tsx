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

export default function CourseExplore({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section className="bg-white py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-sm p-2">
        <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Explore Courses
        </h2>
        <TextInput icon={Search} placeholder="What would you like to learn?" />
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((i, n) => {
          if (i.courses.length == 0) return <></>;

          return (
            <Accordion key={n} className="h-min">
              <AccordionHeader>
                {/* <div className="rounded-full aspect-square" style={{ background: i.color }}> */}
                {i.icon}
                {/* </div> */}
                <div className="w-2" />
                {i.name}
              </AccordionHeader>
              <AccordionBody>
                <ul>
                  {i.courses.map((j, m) => {
                    return (
                      <li key={m}>
                        <a href={`/courses/${j.slug}`}>{j.name}</a>
                      </li>
                    );
                  })}
                </ul>
              </AccordionBody>
            </Accordion>
          );
        })}
      </div>
    </section>
  );
}
