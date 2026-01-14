"use client";

import React, { useState, useEffect } from "react";
import Course from "../components/Course";
import CourseForm from "./CourseForm";
import { v4 as uuidv4 } from "uuid";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { motion } from "framer-motion";
import coursesList from "../app/courses";

interface Course {
  id: string;
  name: string;
  desc: string;
  range: string;
  price: string;
  related: string[];
  link: string;
  image: string;
  aktuelan: boolean;
  onSale: boolean;
}

export default function AllCourses() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  const handleFilterClick = (filter: string) => {
    // Toggle the filter: if it's the current active filter, unselect it; otherwise, select it
    setActiveFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };

  useEffect(() => {
    const courses: Course[] = coursesList;
    const searchTerm = search.toLowerCase();
    const filtered = courses.filter((course) => {
      // Check if the course matches the active filter
      const matchesFilter = activeFilter
        ? (activeFilter === "onSale" ? course.onSale : activeFilter === "aktuelan" ? course.aktuelan : course.related.includes(activeFilter))
        : true;

      // Check if any related word contains the search term
      const matchesSearch = course.related.some((relatedWord) =>
        relatedWord.toLowerCase().includes(searchTerm)
      );

      // Return true if the course matches both the active filter and the search term
      return matchesFilter && matchesSearch;
    });

    setFilteredCourses(filtered);
  }, [search, activeFilter]);

  return (
    <>
      <div
        id="kursevi"
        className="flex flex-col justify-center items-flex gap-7 sm:gap-12 w-full sm:pt-10 mb-16 md:mb-28 px-3 md:px-[220px]"
      >
        <div className="flex flex-col gap-1 pl-2 sm:pl-0">
          <h1 className="text-xl sm:text-4xl font-bold">Kursevi</h1>
          <h3 className="font-thin text-base sm:text-lg">
            Lista svih naših dostupnih kurseva
          </h3>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center w-full pl-1">
          <div className="flex flex-row flex-wrap justify-start items-center gap-3 sm:gap-7 w-full pl-1 sm:pl-0">
            <h3
              onClick={() => handleFilterClick("frontend")}
              className={`hover:scale-105 transition-all hover:border-green text-md md:text-xl rounded-[30px] border px-3 py-2 md:py-3 md:px-4 cursor-pointer ${
                activeFilter === "frontend" ? "active-filter" : ""
              }`}
            >
              Frontend
            </h3>
            <h3
              onClick={() => handleFilterClick("backend")}
              className={`hover:scale-105 transition-all hover:border-green text-md md:text-xl rounded-[30px] border px-3 py-2 md:py-3 md:px-4 cursor-pointer ${
                activeFilter === "backend" ? "active-filter" : ""
              }`}
            >
              Backend
            </h3>
            <h3
              onClick={() => handleFilterClick("office")}
              className={`hover:scale-105 transition-all hover:border-green text-md md:text-xl rounded-[30px] border px-3 py-2 md:py-3 md:px-4 cursor-pointer ${
                activeFilter === "office" ? "active-filter" : ""
              }`}
            >
              Microsoft Office
            </h3>
            <h3
              onClick={() => handleFilterClick("onSale")}
              className={`hover:scale-105 transition-all hover:border-green text-md md:text-xl rounded-[30px] border px-3 py-2 md:py-3 md:px-4 cursor-pointer ${
                activeFilter === "onSale" ? "active-filter" : ""
              }`}
            >
              Na popustu
            </h3>
            <h3
              onClick={() => handleFilterClick("aktuelan")}
              className={`hover:scale-105 transition-all hover:border-green text-md md:text-xl rounded-[30px] border px-3 py-2 md:py-3 md:px-4 cursor-pointer ${
                activeFilter === "aktuelan" ? "active-filter" : ""
              }`}
            >
              Aktuelan
            </h3>

            <form
              action=""
              className="lg:hidden flex justify-center items-center relative"
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="text-md md:text-xl rounded-[30px] border border-white px-3 py-[7px] md:py-3 md:px-4 w-[240px]"
                placeholder="Pretraži kurseve"
              />
              <div className="text-2xl absolute right-4 opacity-80">
                <FaMagnifyingGlass />
              </div>
            </form>
          </div>
          <div className="hidden lg:flex justify-center items-center relative self-end">
            <form action="" className="flex justify-center items-center relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="text-md md:text-xl rounded-[30px] border border-white px-3 py-[7px] md:py-3 md:px-4 w-[240px]"
                placeholder="Pretraži kurseve"
              />
              <div className="text-2xl absolute right-4 opacity-80">
                <FaMagnifyingGlass />
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-x-16 gap-y-14 justify-center md:justify-start items-center flex-wrap sm:mt-3 ">
          {filteredCourses.map((course) => (
            <motion.div
              key={uuidv4()}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-center items-center"
            >
              <Course
                id={course.id}
                name={course.name}
                desc={course.desc}
                range={course.range}
                price={course.price}
                image={course.image}
                link={course.link}
              />
            </motion.div>
          ))}
          <CourseForm />
        </div>
      </div>
    </>
  );
}
