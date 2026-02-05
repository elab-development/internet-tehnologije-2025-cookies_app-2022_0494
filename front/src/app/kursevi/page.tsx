"use client"
import dynamic from "next/dynamic"
import AllCourses from "@/components/AllCourses"


const ParticlesBackground = dynamic(() => import("@/components/ParticlesBackground"), { ssr: false });

export default function Page(){
    return(
    
    <>
    <ParticlesBackground/>
    <div className="pt-[130px]">
        <AllCourses />
    </div>
    
    </>
    )
    }