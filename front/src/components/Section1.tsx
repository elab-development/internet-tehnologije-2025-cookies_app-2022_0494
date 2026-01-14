import Photo1 from "@/assets/learning.jpg";
import Image from "next/image";
import { IoSchool } from "react-icons/io5";
import { RiPresentationLine } from "react-icons/ri";
import { FaRegPaste } from "react-icons/fa6";
import { FaWifi } from "react-icons/fa";
import { FaUserFriends,FaMoneyBillWave ,FaLightbulb  } from "react-icons/fa";

export default function Section1(){
return(
    <>
        <div className="flex 2xl:flex-row flex-col justify-between items-center gap-16 md:gap-12 px-6 md:px-56 pb-[60px] sm:pb-[100px] background-section1">
            <div className="flex flex-col gap-4 sm:gap-8 justify-center items-start w-100% sm:w-auto sm:min-w-[430px]">
                <Image className="w-[90%] sm:w-[430px] z-20 rounded-lg mb-1 sm:mb-0" alt="Logo ITnaTI" src={Photo1}></Image>
                <h2 className="text-2xl sm:text-3xl text-green font-bold ">Budi sa IT na TI</h2>
                <h4 className="sm:w-[430px] font-light">ITnaTI je najnovija platforma za online učenje na Balkanu! 
                    Posvećeni smo pružanju visokokvalitetnog IT obrazovanja za decu. Naša misija je osnažiti mlade umove kroz edukaciju, inspirisati ih da istražuju svet informacionih tehnologija i razvijaju svoje veštine za digitalno doba.
                </h4>
            </div>
            <div className="flex flex-wrap sm:gap-9 gap-7 sm:gap-y-12 sm:flex-row justify-start sm:justify-center items-center">
                <div className="flex flex-col gap-1 justify-center items-start w-[270px] ">
                    <div className="text-3xl bg-green p-2 rounded-2xl mb-2">
                        <IoSchool />
                    </div>
                    <h2 className="text-start font-bold sm:text-lg">Inovativan pristup učenju </h2>
                    <h4 className="font-thin sm:text-md">ITnaTI koristi interaktivne metode i igre kako bi decu uvela u svet tehnologije, čineći učenje zabavnim i angažujućim</h4>
                </div>
                <div className="flex flex-col gap-1 justify-center items-start w-[270px] ">
                    <div className="text-3xl bg-green p-2 rounded-2xl mb-2">
                    <RiPresentationLine />
                    </div>
                    <h2 className="text-start font-bold sm:text-lg">Širok spektar kurseva</h2>
                    <h4 className="font-thin sm:text-md"> ITnaTI nudi raznolike kurseve iz svih oblasti IT-ja, kao što su programiranje, informatika, računarstvo...</h4>
                </div>
                <div className="flex flex-col gap-1 justify-center items-start w-[270px] ">
                    <div className="text-3xl bg-green p-2 rounded-2xl mb-2">
                        <FaLightbulb  />
                    </div>
                    <h2 className="text-start font-bold sm:text-lg">Fokus na kreativnosti</h2>
                    <h4 className="font-thin sm:text-md">Fokus naših kurseva je na kreativnosti, podsticajući decu da razmišljaju inovativno i da koriste tehnologiju kao alat za rešavanje problema.</h4>
                </div>
                <div className="hidden sm:flex flex-col gap-1 justify-center items-start w-[270px] ">
                    <div className="text-3xl bg-green p-2 rounded-2xl mb-2">
                        <FaUserFriends />
                    </div>
                    <h2 className="text-start font-bold sm:text-lg">Zajednica</h2>
                    <h4 className="font-thin sm:text-md">ITnaTI nije samo platforma za učenje, već i zajednica gde se deca mogu povezati, deliti ideje i inspirisati jedni druge.</h4>
                </div>
                <div className="hidden sm:flex flex-col gap-1 justify-center items-start w-[270px] ">
                    <div className="text-3xl bg-green p-2 rounded-2xl mb-2">
                    <FaWifi  />
                    </div>
                    <h2 className="text-start font-bold sm:text-lg">Online predavanja i materijali</h2>
                    <h4 className="font-thin sm:text-md">Kroz interaktivna online video predavanja, deca imaju pristup velikoj količini materijala za učenje, kao i vežbica i testova.</h4>
                </div>
                <div className="hidden sm:flex flex-col gap-1 justify-center items-start w-[270px] ">
                    <div className="text-3xl bg-green p-2 rounded-2xl mb-2">
                        <FaMoneyBillWave  />
                    </div>
                    <h2 className="text-start font-bold sm:text-lg">Najpovoljniji kursevi</h2>
                    <h4 className="font-thin sm:text-md"> Pristupačni i kvalitetni! Naši kursevi prilagođeni su svim budžetima, jer verujemo da obrazovanje treba biti dostupno svima </h4>
                </div>
            </div>
        </div>
    </>
)

}