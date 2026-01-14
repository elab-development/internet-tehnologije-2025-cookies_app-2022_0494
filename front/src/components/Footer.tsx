import Image from "next/image"
import Logo from "../assets/logo.png"
import Link from "next/link"
import {FaLinkedin,FaTiktok ,FaInstagramSquare} from "react-icons/fa"



export default function Footer(){
    return(
        <>
        <div className='relative flex flex-col gap-3 py-5 pt-6 sm:pt-4 bg-heavy-trans w-full justify-center items-center'>
            <div className="flex w-full flex-col sm:flex-row-reverse sm:pb-2 gap-2 sm:justify-around justify-center items-center ">
                <div className="flex w-full gap-0 sm:gap-4 sm:w-auto sm:flex-row pb-3 sm:pb-0 text-white justify-around items-center px-3">
                    <h2 className="text-xl">Treba ti pomoć?</h2>
                    <button className='text-l sm:text-2xl p-2 px-4 hover:bg-black hover:text-white border-2 font-bold border-green transition-all'>Kontakt</button>
                </div>
                <div className='text-white flex flex-row justify-center items-center pl-3 sm:p-0 gap-3 my-1'>
                <Link href="/"><Image className="w-[110px] z-50 md:w-[160px] " alt="Logo ITnaTI" src={Logo}></Image></Link>    
                </div>
            </div>
            <hr className='bg-white sm:mb-1 w-3/4' />
            <div className='text-white flex flex-row justify-center items-center gap-x-3'>
                <Link target='_blank' href="https://www.instagram.com/itnati.rs/" ><FaInstagramSquare className='text-[33px] hover:text-[36px] transition-all'/></Link>
                <Link target='_blank' href="https://www.instagram.com/itnati.rs/"><FaTiktok  className='text-[33px] hover:text-[36px] transition-all'/></Link>
                <Link target='_blank' href="https://www.instagram.com/itnati.rs/"><FaLinkedin className='text-[33px] hover:text-[36px] transition-all'/></Link>
            </div>
            <div className="flex text-white pt-3">
                <h3>©ITnaTI.  All rights reserved</h3>
            </div>
        </div>

        </>
    )
}