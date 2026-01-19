import Image from 'next/image'
import Hero from '@/components/Hero'
import Section1 from "@/components/Section1"
import Nav from '@/components/Nav'
import Courses from '@/components/Courses'
import Slika from "../../public/bg-mb6.png"

export default function Home() {
  return (
   <>
   <div className='background w-full h-full'>
    {/* <Image src={Slika} alt='bg-image' className='bg-cover z-[-3] absolute top-[70px] overflow-hidden'></Image> */}
      <Hero/>
      <Section1/>
      <Courses aktuelni={true}/>
      {/* <div className='h-[700px]'></div> */}
   </div>
   
   </>
  )
}
