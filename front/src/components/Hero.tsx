'use client';
import Lottie from "lottie-react"
import animation1 from "@/assets/animation1.json"
import ParticlesBackground from "@/components/ParticlesBackground"
import Link from "next/link";

export default function Hero(){
    return(
        <>
        <ParticlesBackground/>
            <div className=" z-10 px-6 md:px-20 pb-0 lg:px-52 lg:pr-40 gap-0 sm:gap-3 flex flex-col lg:flex-row justify-center items-center py-10 pt-[125px] lg:pt-[170px] lg:mb-[80px] sm:min-h-[87vh] font-sans w-full">
                <div className="flex flex-col justify-start items-start md:w-1/2">
                    <h1 className="text-white text-5xl lg:text-[75px] font-bold tracking-[5px] lg:mb-7 mb-3 pr-3 lg:pr-0">IT Kursevi Za Decu</h1>
                    <h2 className="tracking-[2px] text-xl lg:text-4xl text-green font-medium font-san">Nauči programiranje uz ITnaTI</h2>
               
                    <h2 className="my-5 sm:my-6 mb-2 sm:mb-6  lg:text-2xl font-thin">Uzbudljivi IT kursevi su stigli! Povedite svoje mališane na nezaboravno putovanje kroz svet tehnologije, programiranja i kreativnosti.
                        Naši kursevi prilagođeni su uzrastu vašeg deteta, osmišljeni da razviju kritičko razmišljanje i kreativnost kroz zabavne aktivnosti.
                        Pustite mašti na volju i dopustite vašem detetu da postane kreator tehnologije budućnosti!</h2>
                    <div className="flex flex-row gap-4 my-5 mb-0 sm:my-6 justify-center items-center">
                        <Link href="/moji-kursevi"> <button className="bg-green py-2 pb-[10px] px-4 md:py-3 md:pb-4 md:px-6 hover:bg-transparent  hover:border-green hover:border-2 rounded-[30px] text-lg md:text-xl text-center flex text-shadow flex-row justify-center items-center">Moji kursevi</button></Link>   
                        <Link href="/kursevi"><button className="bg-transparent border-2 border-green py-2 hover:scale-105  hover:bg-green pb-[10px] px-4 md:py-3 md:pb-4 md:px-6 rounded-[30px] text-lg md:text-xl text-center">Kursevi</button></Link> 
                    </div>
                </div>
                <Lottie animationData={animation1} className='z-10 relative bottom-0 sm:bottom-20 sm:static min-w-[320px] lg:w-[720px] overflow-hidden'/>
            </div>
          
        </>
    )
}