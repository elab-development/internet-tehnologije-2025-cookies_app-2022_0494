"use client"
import Logo from "../assets/logo.png"
import Image from "next/image"
import { useState, useEffect } from "react"
import { HiMenu } from "react-icons/hi";
import Link from "next/link";
import useAuthContext from "@/hooks/useAuthContext";
import useLogout from "@/hooks/useLogout"

export default function Nav(){

    const {logout} = useLogout();
    const {user} = useAuthContext();
    const [isMobile, setIsMobile] = useState(false);

    const closeNavbar = () => {
        setIsMobile(false);
      };

    useEffect(() => {
        // Attach event listener to the document to close the navbar on outside click
        const handleOutsideClick = (e:any) => {
          if (isMobile && !e.target.closest('.navbar')) {
            closeNavbar();
          }
        };
    
        document.addEventListener('click', handleOutsideClick);
    
        return () => {
          // Cleanup the event listener on component unmount
          document.removeEventListener('click', handleOutsideClick);
        };
      }, [isMobile]);

    return(
        <>
        
        <div className=" px-6 md:px-20 lg:px-52 bg-heavy-trans py-3 sm:py-4 text-slate-200 flex row justify-between items-center w-full fixed z-[99999]">
            <Link href="/" className="z-[999]"><Image className="w-[105px] z-[999] md:w-[150px] " alt="Logo ITnaTI" src={Logo}></Image></Link>
            <ul className={` ${isMobile ? "flex-col bg-heavy-trans pt-24 absolute inset-0 w-full h-[400px]" : "hidden"} fadeIn xl:static xl:h-auto xl:w-auto z-40 list-none xl:flex xl:flex-row xl:gap-5 justify-center items-center text-lg lg:text-xl`}>
                <Link href="/"> <li className="py-1 sm:py-2 text-center cursor-pointer hover:scale-105">Početna</li> </Link>
                <Link href="/kursevi">  <li className="py-1 sm:py-2 text-center cursor-pointer hover:scale-105">Kursevi</li></Link>
                <Link href="/o-nama">  <li className="py-1 sm:py-2 text-center cursor-pointer hover:scale-105">O Nama</li></Link>
                <Link href="/moji-kursevi">  <li className="py-1 sm:py-2 text-center cursor-pointer hover:scale-105">Moji kursevi</li></Link>
                {!user && (
                  <>
                  <Link href="/login"> <button className="mx-auto  lg:hover:ml-1 sm:ml-2 sm:mr-0 transition-alls transition-func py-2 px-4 block text-center rounded-[30px] bg-green hover:bg-transparent  hover:border-green hover:border-2  text-white text-shadow my-3 sm:my-0">Prijavi se</button></Link> 
                  <Link href="/register"> <button className="mx-auto transition-all sm:ml-1 sm:mr-2 py-2 px-4 block text-center rounded-[30px] hover:bg-green bg-transparent  border-green border-2  text-white text-shadow my-3 sm:my-0">Registruj se</button></Link> 
                  </>
                )}
                {user && (
                  <>
                    <Link href="/"> <button className="mx-auto py-0  xl:ml-2 xl:mr-2 sm:py-2 px-2 block text-center rounded-[30px] hover:bg-sgreen bg-transparent  text-white text-shadow my-2 sm:my-0"> <span className="text-green mr-1 text-xl">|</span> {user.name} <span className="text-green ml-1 text-xl">|</span></button></Link> 
                    <button onClick={()=>logout()} className="mx-auto py-2 xl:ml-2 xl:mr-2 sm:py-2 sm:mt-2 px-4 block text-center rounded-[30px] hover:bg-green bg-transparent  border-green border-2  text-white text-shadow mt-2 sm:my-0">Izloguj se</button>
                  </>
                )}
                
            </ul>
            <div className="text-[40px] xl:hidden z-50 cursor-pointer" onClick={()=>setIsMobile(!isMobile)}><HiMenu style={"font-size:2.1rem"}/></div>
            
        </div>
        
        </>
    )
}