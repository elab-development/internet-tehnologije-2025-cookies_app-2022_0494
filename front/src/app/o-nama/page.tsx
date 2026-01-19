"use client"
import ParticlesBackground from "@/components/ParticlesBackground"
import dynamic from 'next/dynamic';
// Dynamically import Lottie component to load it only when needed
import aboutUsAnimation from "../../assets/aboutus.json"
import contactAnimation from "../../assets/contact.json"
import Link from "next/link"
import ContactForm from "../../components/ContactForm"
import { MdEmail,MdPhone } from "react-icons/md";
import { FaInstagramSquare } from "react-icons/fa";
const Lottie = dynamic(() => import('lottie-react'));

export default function Page(){
   
    return(
    
    <>
    <ParticlesBackground/>
    <div className="containers">
        <div className=" z-10 px-6 md:px-20 pb-0 lg:px-52 lg:pr-40 gap-0 sm:gap-3 flex flex-col lg:flex-row justify-center items-center py-10 pt-[125px] lg:pt-[70px] lg:mb-[0px] sm:min-h-[80vh] font-sans w-full">
            <div className="flex flex-col justify-start items-start md:w-1/2">
                <h1 className="text-white text-5xl lg:text-[66px] font-bold tracking-[5px] lg:mb-7 mb-3 pr-3 lg:pr-0">O Nama</h1>
                <h2 className="tracking-[2px] text-xl lg:text-4xl text-green font-medium font-san">Nauči programiranje uz ITnaTI</h2>
        
                <h2 className="my-5 sm:my-6 mb-2 sm:mb-6  lg:text-2xl font-thin">Uzbudljivi IT kursevi su stigli! Povedite svoje mališane na nezaboravno putovanje kroz svet tehnologije, programiranja i kreativnosti.
                    Naši kursevi prilagođeni su uzrastu vašeg deteta, osmišljeni da razviju kritičko razmišljanje i kreativnost kroz zabavne aktivnosti.
                    Pustite mašti na volju i dopustite vašem detetu da postane kreator tehnologije budućnosti!</h2>
                <div className="flex flex-row gap-4 my-5 mb-0 sm:my-6 justify-center items-center">
                    {/* <Link href="#kursevi"> <button className="bg-green py-2 pb-[10px] px-4 md:py-3 md:pb-4 md:px-6 hover:bg-transparent  hover:border-green hover:border-2 rounded-[30px] text-lg md:text-xl text-center flex text-shadow flex-row justify-center items-center">Moji kursevi</button></Link>   
                    <Link href="#kursevi"><button className="bg-transparent border-2 border-green py-2 hover:scale-105  hover:bg-green pb-[10px] px-4 md:py-3 md:pb-4 md:px-6 rounded-[30px] text-lg md:text-xl text-center">Kursevi</button></Link>  */}
                </div>
            </div>
            <Lottie animationData={aboutUsAnimation} className='z-10 relative bottom-0 sm:bottom-20 sm:static min-w-[320px] lg:w-[640px] overflow-hidden'/>
        </div>

       <div className="flex justify-center items-center flex-col 2xl:flex-row-reverse mx-auto gap-2 sm:gap-4 mb-8 lg:mb-16">
        <div className="w-[95%] sm:w-3/4 xl:w-1/2  py-6 pb-0 sm:p-10 sm:py-14 mx-autos flex justify-center items-center flex-col 2xl:flex-row gap-8 bg-white/5 border-2 border-white/40 rounded-3xl backdrop-blur-[3px]">
                <div className="flex justify-center items-center flex-col">
                    <div className="flex justify-center items-center flex-col absolute top-5 lg:top-10 ">
                        <h1 className="text-white text-3xl lg:text-5xl font-bold tracking-[2px] sm:tracking-[5px] lg:mb-3 mb-2 pr-3 lg:pr-0">Kontakt</h1>
                        <h4 className= "py-0 pb-3 sm:pb-3 text-md pl-2 w-[95%] sm:w-[70%]  sm:text-base hover:scale-105 transition-all">Ostavite nam poruku! Naš tim je spreman da odgovori na Vaša pitanja ili primedbe u najkraćem mogućem roku.</h4>
                    </div>
                    <div className="relative top-[68px] sm:top-16 py-5">
                        <Lottie animationData={contactAnimation} className='z-10  sm:static min-w-[320spx] w-[220px] sm:w-[300px] lg:w-[400px] overflow-hidden'/>
                    </div>
                
                </div>
             
            <ContactForm/>
            </div>
            <div className="w-[95%]  2xl:w-auto p-3 py-3 2xl:py-20 flex justify-center items-center flex-row 2xl:flex-col gap-4 lg:gap-16 bg-white/5 border-2 border-white/40 rounded-3xl backdrop-blur-[3px]">
                <div className="flex justify-center items-center flex-col gap-2 sm:gap-3">
                    <div className="flex justify-center items-center text-4xl md:text-[50px] w-full">
                        <MdPhone/>
                    </div> 
                    <h4 className= "text-center text-md sm:text-base hover:scale-105 transition-all">0656490107</h4>
                </div>
                <div className="flex justify-center items-center flex-col gap-2 sm:gap-3">
                    <div className="flex justify-center items-center text-4xl md:text-[50px] w-full">
                        <MdEmail/>
                    </div> 
                    <h4 className= "text-center text-sm tracking-tighter sm:text-base hover:scale-105 transition-all">itnatisrbija@gmail.com</h4>
                </div>
                <div className="flex justify-center items-center flex-col gap-2 sm:gap-3">
                    <div className="flex justify-center items-center text-4xl md:text-[50px] w-full">
                        <FaInstagramSquare/>
                    </div> 
                    <h4 className= "text-center text-md sm:text-base hover:scale-105 transition-all">itnati.rs</h4>
                </div>
            </div>
       </div>
       
    </div>
    {/* w-[95%] sm:w-3/4 xl:w-1/2 p-5 py-8 sm:p-10 sm:py-14 mx-auto flex justify-center items-center flex-col 2xl:flex-ro */}
    {/* "my-3 w-[95%] sm:w-3/4 xl:w-1/2 p-3 py-8 sm:p-6 mx-auto flex justify-center items-center flex-cols flex-row gap-4 lg:gap-16 */}
    </>
    )
    }