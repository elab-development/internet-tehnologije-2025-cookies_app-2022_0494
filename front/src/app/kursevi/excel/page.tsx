"use client"
import ParticlesBackground from "@/components/ParticlesBackground"
import Image from "next/image"
import ApplicationForm from "@/components/ApplicationForm"
import Link from "next/link"

export default function Page(){

  const courseId = "65e605afdd72028d4e05d752";
  const courseName = "Microsoft Excel";

    return(
    <>
    
    <div className="container pt-[170px] flex justify-center items-center flex-col ">
        <div className="gap-12 p-4 pl-6 lg:p-16 flex justify-center items-center flex-col bg-white/5 border-2 border-white/40 rounded-3xl backdrop-blur-[3px] mb-10">
            <h1 className="text-2xl lg:text-5xl font-bold tracking-widest text-center">Office 365: Microsoft Excel</h1>
            <div className="flex justify-between items-center flex-col lg:flex-row gap-8 lg:gap-12 lg:pt-10">
           
                <div className="flex justify-center items-center flex-col gap-5 w-[125px] lg:w-auto">
                    {/* <h3 className="text-2xl">Tehnologije:</h3> */}
                    <Image src={"/images/ikonice/excel.webp"} alt={"Powerpoint ikonica"} height={250} width={250}></Image>
                </div>
     
                <div className="flex justify-center items-start flex-row lg:flex-col gap-4 flex-wrap">
                    <div className="flex justify-center items-start flex-col gap-2">
                        <h3 className="text-lg lg:text-2xl font-bold tracking-widest">Uzrast:</h3>
                        <h3 className="text-lg lg:text-2xl  tracking-widest">7-18 godina</h3>
                    </div>

                    <div className="flex justify-center items-start flex-col gap-2">
                        <h3 className="text-lg lg:text-2xl font-bold tracking-widest">Cena:</h3>
                        <h3 className="text-lg lg:text-2xl  tracking-widest">1000 RSD</h3>
                    </div>
                    <div className="w-full">
                        <Link href="#prijava" >
                            <button  className={` w-full mt-1 lg:mt-4 border bg-purpl border-white/50 py-2 hover:scale-95 transition-all purple-box-shadow purple-button`}>Prijavi se! </button>
                        </Link>
                    </div>
                   
                   
                </div>
            </div>
       
            <div className="flex justify-center items-start flex-col gap-4 pt-7">
                <h2 className="text-2xl lg:text-3xl font-bold tracking-widest">Šta ćeš naučiti na kursu?</h2>
                <h3 className="text-md lg:text-lg tracking-wide">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid accusamus omnis accusantium sed? Libero impedit doloremque quisquam dolores suscipit velit error tempore, minima modi placeat, hic obcaecati repellendus repudiandae a aut id recusandae soluta odio nulla voluptas consectetur? Illum ipsum unde ipsam est magni commodi repellendus, corporis iusto corrupti sit?
                </h3>
            </div>

            <div className="flex justify-center items-start flex-row flex-wrap gap-7 lg:gap-12">
                <div className="flex justify-center items-start flex-col gap-2 w-[300px]">
                    <h2 className="text-xl font-bold tracking-widest">Format predavanja:</h2>
                    <h2 className="text-base font-light">Lorem ipsum dolor sit amet consectr adipisicing elit. Hic minus voluptatibus ipsam exercitationem laborum. Accusantium.</h2>
                </div>
                <div className="flex justify-center items-start flex-col gap-2 w-[300px]">
                    <h2 className="text-xl font-bold tracking-widest">Kada je upis?</h2>
                    <h2 className="font-light">Lorem ipsum dolor sit amet consectr adipisicing elit. Hic minus voluptatibus ipsam exercitationem laborum. Accusantium.</h2>
                </div>
                <div className="flex justify-center items-start flex-col gap-2 w-[300px]">
                    <h2 className="text-xl font-bold tracking-widest">Kako da se prijavim?</h2>
                    <h2 className="font-light">Lorem ipsum dolor sit amet consectr adipisicing elit. Hic minus voluptatibus ipsam exercitationem laborum. Accusantium.</h2>
                </div>
                <div className="flex justify-center items-start flex-col gap-2 w-[300px]">
                    <h2 className="text-xl font-bold tracking-widest">Format:</h2>
                    <h2 className="font-light">Lorem ipsum dolor sit amet consectr adipisicing elit. Hic minus voluptatibus ipsam exercitationem laborum. Accusantium.</h2>
                </div>
            </div>

            <div className="flex justify-center items-start flex-col gap-4">
                <h2 className="text-2xl lg:text-3xl font-bold tracking-widest">Za koga je ovaj kurs?</h2>
                <h3 className="text-md lg:text-lg tracking-wide">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid accusamus omnis accusantium sed? Libero impedit doloremque quisquam dolores suscipit velit error tempore, minima modi placeat, hic obcaecati repellendus repudiandae a aut id recusandae soluta odio nulla voluptas consectetur? Illum ipsum unde ipsam est magni commodi repellendus, corporis iusto corrupti sit?
                </h3>
            </div>

            <h1 id="prijava" className="text-3xl lg:text-4xl font-bold tracking-widest lg:pt-7">PRIJAVA</h1>
            <ApplicationForm courseID={courseId} courseName={courseName}/>

           
        </div>
    </div>

        <div className="z-[-9]">
            <ParticlesBackground/>
        </div>
      
    </>
    )
}