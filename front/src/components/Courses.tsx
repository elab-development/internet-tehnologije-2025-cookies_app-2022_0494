"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Course from "../components/Course";
import CourseForm from "./CourseForm";
import { v4 as uuidv4 } from 'uuid';
import coursesList from "../app/courses"
import {motion} from "framer-motion"

interface Course {
  id:string,
  name: string,
  desc: string,
  range: string,
  price: string,
  related:string[],
  link:string,
  image:string,
  aktuelan: boolean,
  onSale:boolean,
}

export default function Courses({ aktuelni = false, onSale = false }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
        setCourses(coursesList);
  }, []);

  const handleFilterClick = (filter: string) => {
    // Toggle the filter: if it's the current active filter, unselect it; otherwise, select it
    setActiveFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };

  let filteredCourses = courses;
  if (aktuelni) {
    filteredCourses = courses.filter((course) => course.aktuelan === true);
  }
  if (onSale) {
    filteredCourses = courses.filter((course) => course.onSale === true);
  }

  // Filter courses based on the active filter
  if (activeFilter) {
    filteredCourses = courses.filter((course) =>
      course.related.includes(activeFilter)
    );
  }

  return (
    <>
      <div id="kursevi" className="flex flex-col justify-center items-flex gap-7 sm:gap-12 w-full sm:pt-10 mb-16 md:mb-28 px-3 md:px-[220px]">
        <div className="flex flex-col gap-1 pl-2 sm:pl-0">
          <h1 className="text-xl sm:text-4xl font-bold">Kursevi</h1>
          <h3 className="font-thin text-base sm:text-lg">Lista naših aktuelnih kurseva</h3>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center w-full pl-1">
          <div className="flex flex-row flex-wrap justify-start items-center gap-3 sm:gap-7 w-full pl-1 sm:pl-0">
            {['frontend', 'backend', 'informatika', 'racunarstvo'].map((filter) => (
              <h3
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={`hover:scale-105 transition-all hover:border-green text-md md:text-xl rounded-[30px] border px-3 py-2 md:py-3 md:px-4 cursor-pointer ${activeFilter === filter ? "active-filter" : ""}`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </h3>
            ))}
            <Link href="/kursevi" className="hover:scale-105 transition-all hover:border-green block lg:hidden text-md md:text-xl rounded-[30px] border px-3 py-2 md:py-3 md:px-6 cursor-pointer break-inside-avoid-column preventCol">
              <h3 className="inline-block">Svi kursevi</h3>
            </Link>
          </div>
          <Link href="/kursevi" className="hover:scale-105 transition-all hover:border-green hidden lg:block text-md md:text-xl rounded-[30px] border px-3 py-2 md:py-3 md:px-6 cursor-pointer break-inside-avoid-column preventCol">
            <h3 className="inline-block">Svi_kursevi</h3>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-x-16 gap-y-14 justify-center md:justify-start items-center flex-wrap sm:mt-3 ">
          {filteredCourses.map((course) => (
            <motion.div key={uuidv4()} initial={{opacity:0, x:-100}} animate={{opacity:1,x:0}} className="flex justify-center items-center">
                  <Course id={course.id} name={course.name} desc={course.desc} range={course.range} price={course.price} image={course.image} link={course.link} />
            </motion.div>
          ))}
          <CourseForm />
        </div>
      </div>
    </>
  );
}
