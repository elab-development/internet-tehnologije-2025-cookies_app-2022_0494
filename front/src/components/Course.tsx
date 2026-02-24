"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import useAuthContext from "@/hooks/useAuthContext"
import { redirect } from 'next/navigation'
import { MdCurrencyExchange } from "react-icons/md"

export default function Course({id,name,desc,range,price,link,image,eurRate}:{id:String, name:String,desc:String,range:String,price:String,link:any, image:any, eurRate?: number}){

    const {user} =  useAuthContext();
    const [bought, setBought] = useState(false);
    const [showEur, setShowEur] = useState(false);

    useEffect(() => {
        if (user?.courses.includes(id)) {
            setBought(true)
        }
    }, [user])

    const eurPrice = eurRate ? (parseFloat(price as string) / eurRate).toFixed(2) : null;

    return(
        <>
            <div className="flex flex-col justify-center items-start bg-purple-trans w-[95%] sm:w-[430px] rounded-2xl border-gray-600 gap-1 border card-bg card-glow hover:scale-105 transition-all z-0">
                <Link href={bought ? `/nastava/${id}` : link} className="w-full">
                    <div className="relative w-full h-full">
                        <Image src={image} width={100} height={100} objectFit="cover" className="rounded-t-2xl w-full" alt="Slika kursa"/>
                    </div>
                    <div className="flex justify-center items-start flex-col gap-3 w-full p-3 sm:p-5 backdrop-blur-sm rounded-2xl">
                        <h2 className="text-lg sm:text-xl font-bold font-mono">{name}</h2>
                        <h4 className="font-extralight text-sm md:text-base">{desc}</h4>
                    </div>
                </Link>

                <div className="flex justify-between w-full px-3 sm:px-5 pb-4">
                    <div className="flex flex-col justify-center items-center gap-0 font-mono text-lg">
                        <h2 className="text-[16px] sm:text-lg">Uzrast:</h2>
                        <h2 className="font-semibold text-[16px] sm:text-lg">{range} godina</h2>
                    </div>

                    <Link href={bought ? `/nastava/${id}` : link}>
                        <button className="font-mono border border-white px-4 sm:px-7 py-0 h-10 self-end hover:border-purple hover:scale-110 transition-all">
                            {bought ? "Gledaj" : "KUPI"}
                        </button>
                    </Link>

                    <div className="flex flex-col justify-center items-center gap-0 font-mono text-lg">
                        <div className="flex items-center gap-1">
                            <h2 className="text-[16px] sm:text-lg">Cena:</h2>
                            {eurRate && (
                                <button
                                    onClick={() => setShowEur(v => !v)}
                                    title={showEur ? "Prikaži u RSD" : "Prikaži u EUR"}
                                    className="text-base text-purple-300 hover:text-white transition-colors cursor-pointer"
                                >
                                    <MdCurrencyExchange />
                                </button>
                            )}
                        </div>
                        {showEur && eurPrice
                            ? <h2 className="text-[16px] sm:text-lg font-semibold">{eurPrice} EUR</h2>
                            : <h2 className="text-[16px] sm:text-lg font-semibold">{price}<span className="hidden sm:inline">.00</span> RSD</h2>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}