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
import CharterMap from "@/components/charter-map";

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
        <CharterMap className="mx-auto aspect-video w-full max-w-3xl overflow-hidden rounded-xl border shadow" />
        <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
          <h1 className="mb-4 mt-16 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            Join a Charter Today
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
            Our charters compete in competitions, hold social events, but most
            importantly&mdash; spread a deep passion for teaching around the
            world.
          </p>
        </div>
      </section>
    </>
  );
}

// export const Head = () => <Seo title="Home" children={<><base target="_top" /></>} />
