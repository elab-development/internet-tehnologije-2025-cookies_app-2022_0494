"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import useAuthContext from "@/hooks/useAuthContext"
import { redirect } from 'next/navigation'

export default function Course({id,name,desc,range,price,link,image}:{id:String, name:String,desc:String,range:String,price:String,link:any, image:any}){

    const {user} =  useAuthContext();
    const [bought, setBought] = useState(false);

    useEffect(() => {
        if (user?.courses.includes(id)) {
            setBought(true)
        }
    }, [user])

    return(
        <>
            <div className="flex flex-col justify-center items-start bg-purple-trans w-[95%]  sm:w-[430px]   rounded-2xl border-gray-600 gap-1 border card-bg card-glow hover:scale-105 transition-all z-0 ">
                 <Link href={bought ? `/nastava/${id}` : link}>
                
                    {/* <Image src="/images/kursevi/word.png" width={100} height={100} alt="ads"></Image> */}
                    <div className="relative w-full h-full">
                        <Image src={image}  width={100} height={100} objectFit="cover" className="rounded-t-2xl w-full" alt="Slika kursa"/>
                    </div>
                    <div className="flex justify-center items-start flex-col gap-3 w-full p-3 sm:p-5 backdrop-blur-sm rounded-2xl hover:backdrop-blur-nonse" >
                        <h2 className="text-lg sm:text-xl font-bold font-mono">{name}</h2>
                        <h4 className="font-extralight text-sm md:text-base ">{desc} {bought ? <Link className="font-bold pl-3" href={`/${link}`}> Vidi još</Link> : "" }</h4>
                        <div className="flex justify-between w-full">
                            <div className="flex flex-col justify-center items-center gap-0 font-mono text-lg">
                                <h2 className="text-[16px] sm:text-lg">Uzrast:</h2>
                                <h2 className="font-semibold text-[16px] sm:text-lg">{range} godina</h2>
                            </div>
                            <button className="font-mono border border-white px-4 sm:px-7 py-0 h-10 self-end hover:border-purple hover:scale-110 transition-all">{bought ? <Link href={`/nastava/${id}`}>Gledaj</Link> : "KUPI" }</button>
                            <div className="flex flex-col justify-center items-center gap-0 font-mono text-lg">
                                <h2 className="text-[16px] sm:text-lg">Cena:</h2>
                                <h2 className="text-[16px] sm:text-lg font-semibold">{price}<span className="hidden sm:inline">.00</span> RSD </h2>
                            </div>
                        </div>
                    </div>  
                </Link>
            </div>
        
        </>
    )
}