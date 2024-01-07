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
  Binary,
  Shapes,
  ArrowRight,
  Search,
} from "lucide-react";
import CourseExplore from "@/components/course-explore";
import { defaultCategories } from "@/components/categories";
import QuizComponent from "@/components/article/quiz";

// import {StlViewer} from "react-stl-viewer";

const style = {
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
};

const supporters = [
  {
    name: "Georgetown Disruptive Tech",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiBmaWxsPSJ3aGl0ZSIvPgo8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMF9kXzVfMikiPgo8cGF0aCBkPSJNNjkwLjUgMjQ5LjVINzIxTDQ2Mi41IDc5M0g0MzJMNjkwLjUgMjQ5LjVaIiBmaWxsPSIjRkMzODU4Ii8+CjxwYXRoIGQ9Ik02OTAuNSAyNDUuNUg2ODcuOTczTDY4Ni44ODggMjQ3Ljc4Mkw0MjguMzg4IDc5MS4yODJMNDI1LjY2OCA3OTdINDMySDQ2Mi41SDQ2NS4wMjdMNDY2LjExMiA3OTQuNzE4TDcyNC42MTIgMjUxLjIxOEw3MjcuMzMyIDI0NS41SDcyMUg2OTAuNVoiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iOCIvPgo8L2c+CjxtYXNrIGlkPSJtYXNrMF81XzIiIHN0eWxlPSJtYXNrLXR5cGU6YWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjMzNSIgeT0iMjQ5IiB3aWR0aD0iMzYwIiBoZWlnaHQ9IjU0NCI+CjxwYXRoIGQ9Ik0zMzUgMjQ5LjVMNjk1IDI0OS41TDQzNi41IDc5M0gzMzVMMzM1IDI0OS41WiIgZmlsbD0iI0Q5RDlEOSIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazBfNV8yKSI+CjxwYXRoIGQ9Ik01MTkuNTYzIDcxOEgzNzcuNzY2VjMxOEg1MjAuNzM0QzU2MC45NjkgMzE4IDU5NS42MDQgMzI2LjAwOCA2MjQuNjQxIDM0Mi4wMjNDNjUzLjY3NyAzNTcuOTA5IDY3Ni4wMDggMzgwLjc2IDY5MS42MzMgNDEwLjU3OEM3MDcuMzg4IDQ0MC4zOTYgNzE1LjI2NiA0NzYuMDczIDcxNS4yNjYgNTE3LjYwOUM3MTUuMjY2IDU1OS4yNzYgNzA3LjM4OCA1OTUuMDgzIDY5MS42MzMgNjI1LjAzMUM2NzYuMDA4IDY1NC45NzkgNjUzLjU0NyA2NzcuOTYxIDYyNC4yNSA2OTMuOTc3QzU5NS4wODMgNzA5Ljk5MiA1NjAuMTg4IDcxOCA1MTkuNTYzIDcxOFpNNDYyLjMzNiA2NDUuNTM5SDUxNi4wNDdDNTQxLjA0NyA2NDUuNTM5IDU2Mi4wNzYgNjQxLjExMiA1NzkuMTMzIDYzMi4yNThDNTk2LjMyIDYyMy4yNzMgNjA5LjIxMSA2MDkuNDA2IDYxNy44MDUgNTkwLjY1NkM2MjYuNTI5IDU3MS43NzYgNjMwLjg5MSA1NDcuNDI3IDYzMC44OTEgNTE3LjYwOUM2MzAuODkxIDQ4OC4wNTIgNjI2LjUyOSA0NjMuODk4IDYxNy44MDUgNDQ1LjE0OEM2MDkuMjExIDQyNi4zOTggNTk2LjM4NSA0MTIuNTk2IDU3OS4zMjggNDAzLjc0MkM1NjIuMjcxIDM5NC44ODggNTQxLjI0MiAzOTAuNDYxIDUxNi4yNDIgMzkwLjQ2MUg0NjIuMzM2VjY0NS41MzlaIiBmaWxsPSIjMTkxODMwIi8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZF81XzIiIHg9IjQwOS4zMzYiIHk9IjIzMS41IiB3aWR0aD0iMzM0LjMyOCIgaGVpZ2h0PSI1NzkuNSIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0Lz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iNSIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJvdXQiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMC44NjY2NjcgMCAwIDAgMCAwLjg2NjY2NyAwIDAgMCAwIDAuODY2NjY3IDAgMCAwIDEgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvd181XzIiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfNV8yIiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPgo=",
    website: "https://gtowntech.org",
  },
];

export default async function IndexPage({}) {
  const categories = [...defaultCategories];

  const courses = await prisma.course.findMany({});

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
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
          <h1 className="mb-4 mt-16 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            Get Educated for Free
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
            The Fairfield Programming Association is the only organization of
            its kind&mdash; we want every person in the world to have access to
            an all-star education.
          </p>
          <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16">
            <a
              href="/login"
              className="inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Sign Up
              <ArrowRight className="ml-2 w-5" />
            </a>
            <a
              href="/courses"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <Shapes className="mr-2 w-5" />
              See Courses
            </a>
          </div>
          <div className="mx-auto px-4 text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <span className="font-semibold uppercase text-gray-400">
              Supported By
            </span>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-gray-500 sm:justify-center">
              {supporters.map((i, n) => (
                <a
                  key={n}
                  href={i.website}
                  className="mb-5 mr-5 w-max hover:text-gray-800 dark:hover:text-gray-400 lg:mb-0"
                >
                  <img
                    className="h-12 opacity-60 grayscale hover:opacity-80"
                    src={i.icon || ""}
                    alt={i.name || ""}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CourseExplore categories={categories} />

      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl items-center gap-16 px-4 py-8 lg:grid lg:grid-cols-2 lg:px-6 lg:py-16">
          <div className="hidden lg:block">
            <QuizComponent
              questions={[
                {
                  type: "radio",
                  questionText: "What color is the sun?",
                  options: [
                    {
                      text: "Red",
                      isCorrect: false,
                    },
                    {
                      text: "Green",
                      isCorrect: false,
                    },
                    {
                      text: "Yellow",
                      isCorrect: false,
                    },
                    {
                      text: "White",
                      isCorrect: true,
                    },
                  ],
                },
                {
                  type: "radio",
                  questionText: "What's my favorite color?",
                  options: [
                    {
                      text: "Red",
                      isCorrect: false,
                    },
                    {
                      text: "Green",
                      isCorrect: true,
                    },
                    {
                      text: "Blue",
                      isCorrect: true,
                    },
                    {
                      text: "Black",
                      isCorrect: false,
                    },
                  ],
                },
              ]}
            />
          </div>
          <div className="font-light text-gray-500 dark:text-gray-400 sm:text-lg">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Interactive Learning Tools Built-in
            </h2>
            <p className="mb-4">
              Learning shouldn&apos;t be a passive experience. That&apos;s why
              we&apos;ve infused our resources with interactive widgets. These
              tools aren&apos;t just add-ons; they&apos;re your guides to
              understanding complex concepts. They&apos;re built right into our
              learning materials, making it easy and engaging to explore
              difficult ideas. With these interactive tools, learning becomes an
              adventure, not a chore. Dive into our resources and experience a
              new way of learning—one that&apos;s hands-on, fun, and totally
              immersive.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl items-center gap-16 px-4 py-8 lg:grid lg:grid-cols-2 lg:px-6 lg:py-16">
          <div className="font-light text-gray-500 dark:text-gray-400 sm:text-lg">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Built by Students and Teachers
            </h2>
            <p className="mb-4">
              Our association stands as a testament to collaboration, where
              students and teachers co-create an environment ripe for learning.
              This unique partnership blends fresh perspectives with seasoned
              expertise, fostering innovation and a holistic approach to
              programming education.
            </p>
            <p>
              Together, we bridge theory and real-world application, cultivating
              a dynamic space where ideas flourish and boundaries blur. Join us
              in shaping the future of programming education through our
              collective expertise and shared passion for learning.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <img
              className="w-full rounded-lg opacity-80"
              src="/main2.jpg"
              alt="Georgetown University Healy Statue"
            />
            <img
              className="mt-4 w-full rounded-lg lg:mt-10"
              src="/main1.png"
              alt="Georgetown Disruptive Tech Meeting #1"
            />
          </div>
        </div>
      </section>
      <section>
        <hr />
      </section>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-48">
          <h2 className="mb-8 text-2xl font-extrabold sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="flow-root">
            <div className="-my-8 divide-y divide-gray-100">
              {[
                {
                  question:
                    "How are the courses structured—what levels or tiers of expertise do they cater to?",
                  answer:
                    "The courses within the Fairfield Programming Association are meticulously structured to accommodate various levels of expertise. We offer a tiered approach that caters to beginners, intermediate learners, and those seeking advanced knowledge. Each tier is designed to provide a progressive learning experience, starting with foundational concepts and gradually advancing to more complex topics. Whether you're just starting your programming journey or looking to expand your existing skills, our structured courses ensure there's a suitable path for every level of expertise.",
                },
                {
                  question:
                    "Could you describe the teaching methodology used within the FPA?",
                  answer:
                    "We focus on interactive and project-based learning at the Fairfield Programming Association. Our classes involve hands-on activities, group projects, and real-world problem-solving. Through this approach, students actively engage with the material, collaborate with peers, and apply their knowledge to practical situations, preparing them for the challenges they'll face in the field.",
                },
                {
                  question:
                    "How often are the courses updated to keep up with industry trends?",
                  answer:
                    "Our courses are regularly updated to align with the latest industry trends. We prioritize staying current with the ever-evolving landscape of technology and programming. Our team consistently reviews and revises course content to ensure that students receive up-to-date information, equipping them with relevant skills and knowledge demanded by the industry. This commitment to frequent updates enables us to offer a curriculum that remains in sync with the latest advancements and trends in the programming field.",
                },
              ].map((data, i) => (
                <details
                  key={i}
                  className="group py-8 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-gray-900">
                    <h2 className="text-lg font-medium">{data.question}</h2>

                    <span className="relative h-5 w-5 shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </summary>

                  <p className="mt-4 leading-relaxed text-gray-700">
                    {data.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// export const Head = () => <Seo title="Home" children={<><base target="_top" /></>} />
