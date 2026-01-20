"use client"
import ParticlesBackground from "@/components/ParticlesBackground"
import MyCourses from "@/components/MyCourses"

export default function Page(){
    return(
    
    <>
    <ParticlesBackground/>
    <div className="pt-[130px]">
        <MyCourses />
    </div>
    
    </>
    )
    }