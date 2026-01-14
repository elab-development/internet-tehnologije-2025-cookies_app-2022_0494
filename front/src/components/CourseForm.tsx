import Link from "next/link"
import Image from "next/image"
import slika from "../assets/CourseFormImg.png"

export default function CourseForm(){
    return(
        <>
            <form action="https://formsubmit.co/itnatisrbija@gmail.com" method="POST" className="flex flex-col justify-center items-start bg-purple-trans w-[95%]  sm:w-[430px]  rounded-2xl border-gray-600 gap-1 border card-bg card-glow hover:scale-105 transition-all">
                <Image src={slika} className="bg-cover w-[99.8%] h-full  image-radius self-center opacity-80 z-30" alt="Slika kursa"/>
                <div className="flex justify-center items-start flex-col gap-3 w-full p-3 sm:p-5">
                    <input required className="text-base sm:text-lg font-bold font-mono" type="text" placeholder="Ime kursa" name="ime-kursa"/>
                    <textarea name="opis-kursa" id="opis-kursa" className="w-full h-16 pt-1" placeholder="Opis kursa koji želite da vidite na ITnaTI"></textarea>
                    <div className="flex justify-between w-full">
                        <div className="flex flex-col justify-center items-center gap-0 font-mono text-lg">
                            <h2 className="text-[16px] sm:text-lg ">Uzrast:</h2>
                            <input name="uzrast" className="w-[80px] sm:w-[120px] font-mono" type="text" placeholder="10-14 god"/>
                        </div>
                        <button className="font-mono border border-white px-4 sm:px-7 py-0 h-11 self-end hover:border-purple hover:scale-110 transition-all">Pošalji</button>
                        <div className="flex flex-col justify-center items-center gap-0 font-mono text-lg">
                            <h2 className="text-[16px] sm:text-lg">Cena:</h2>
                            <input name="cena" className="w-[80px] sm:w-[120px] font-mono text-[16px] sm:text-lg font-semibold" type="text" placeholder="4990.00 RSD"/>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}