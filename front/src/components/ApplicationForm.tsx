"use client"
import Link from "next/link"
import { FaUser,FaPhoneAlt  } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Field, Form, Formik,ErrorMessage, FormikProps,FormikHelpers } from 'formik';
import applicationSchema from "../schemas/applicationSchema"
import axios from "axios";
import useAuthContext from "@/hooks/useAuthContext";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { motion } from "framer-motion"
import useApply from "../hooks/useApply"
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loadingAnimation.json"
 
interface ApplicationFormProps {
    courseID: string,
    courseName:string,
}

export default function ApplicationForm({ courseID, courseName }: ApplicationFormProps){
    
    const {user} = useAuthContext();
    const [popUp, setPopUp] = useState(false)

    let initialValues = { email: "", name: "", phone: "", courseName:"", courseId:"", userId:"" };
    if (user) {
        initialValues = { email: user.email, name: user.name, phone: user.phone, userId:user._id,courseId:courseID, courseName:courseName };
      }
      const {apply, success, error, isLoading} = useApply()
    return(
        <>
          <Formik
                validationSchema={applicationSchema}
                initialValues={initialValues}
                onSubmit={ async ({name,phone,email,courseId,userId,courseName},{resetForm}) => { 
                    console.log({name,phone,email,courseId,userId,courseName})
                        await apply({name,phone,email,courseId,userId,courseName})
                        resetForm();
                }}
            >
                {(formikProps) => (
                    <Form className={`pt-0 flex flex-col gap-4 w-[100%] lg:w-[550px] justify-center items-center mx-auto z-[999] `}>
                        <h4 className= "py-0 pb-3 sm:pb-3 text-md pl-2  sm:text-base hover:scale-105 transition-all">Nakon uspešne prijave dobijate uputstvo za plaćanje na email</h4>
                        <div className={`flex flex-col gap-4 w-full -z-10 ${popUp ? "blur-sm" : ""}`}>
                            <div className="flex flex-col justify-center items-center w-full">
                                <div className={`relative flex flex-row justify-center items-center w-full`}>
                                    <div className="absolute z-[99999] left-3 opacity-50 text-xl">
                                        <FaUser />
                                    </div>
                                    <Field name="name" className={`reg-input w-full py-[5px] pl-10 z-0 ${formikProps.errors.name && formikProps.touched.name ? 'has-error' : ''}  ${error ? "has-error" : ""}`} type="text" placeholder="Ime i prezime"/>
                                </div>
                                <ErrorMessage name="name" component="div" className="error-message" />
                            </div>
                            
                            <div className="flex flex-col justify-center items-center w-full">
                                <div className={`relative flex flex-row justify-center items-center w-full`}>
                                    <div className="absolute z-[99999] left-3 opacity-50 text-xl">
                                        <MdEmail/>
                                    </div>
                                    <Field  name="email" className={`reg-input w-full py-[5px] pl-10 z-0 ${formikProps.errors.email && formikProps.touched.email ? 'has-error' : ''}  ${error ? "has-error" : ""}`} type="email" placeholder="Email"/>
                                </div>
                                <ErrorMessage name="email" component="div" className="error-message" />
                            </div>

                            <div className="flex flex-col justify-center items-center w-full">
                                <div className={`relative flex flex-row justify-center items-center w-full `}>
                                    <div className="absolute z-[99999] left-3 opacity-50">
                                        <FaPhoneAlt />
                                    </div>
                                    <Field name="phone" className={`reg-input w-full py-[5px] pl-10 z-0 ${formikProps.errors.phone && formikProps.touched.phone ? 'has-error' : ''}  ${error ? "has-error" : ""}`} type="text" placeholder="Broj telefona" />
                                </div>
                                <ErrorMessage name="phone" component="div" className="error-message" />
                            </div>

                            <div className="w-full flex justify-between items-center">
                                    <div className="flex justify-center items-center">
                                        <input checked name="useUserData" type="checkbox" className="mr-2 mt-[1px] rounded-md"/>
                                        <label>Koristi podatke sa naloga</label>
                                    </div>
                            </div>
                        </div> 
                       
        
                        {user && 
                              <button disabled={!user && isLoading} type="submit"  className={` w-full mt-4 border border-white py-2 hover:scale-95 transition-all`}> {success ? <span className="text-green transition-all">Uspešna prijava!</span> : "Prijavi se"}</button>
                        }
                        {!user && 
                            <div className={`w-full z-20 ${popUp ? "blur-sm" : ""}`} onClick={()=> setPopUp(true)}>
                               <button className={` w-full mt-4 border border-white py-2 hover:scale-95 transition-all`}> Prijavi se za kurs! </button>
                           </div>
                        }
                        {isLoading && 
                            <Lottie animationData={loadingAnimation} className="w-[35px] h-[35px]"/>
                        }
                        <div className="flex flex-col justify-center items-center pt-2">
                            <h4 className= "py-1 pb-3 sm:pb-0 text-sm pl-2 sm:pl-1 sm:text-lg hover:scale-105 transition-all">Treba ti pomoć?</h4>
                            <h4 className= "py-1 pb-3 sm:pb-5 text-sm pl-2 sm:pl-1 sm:text-base hover:scale-105 transition-all font-light">itnatisrbija@gmail.com  <span className="pl-5">+381 656490107</span></h4>
                            <motion.h4 initial={{opacity:0, y:-100}} animate={{opacity:1, y:0}}  className="text-red-600 text-lg">{error}</motion.h4>
                        </div>
                        
                        {popUp && <>
                            <motion.div
                                initial={{ opacity: 0, x:-500 }}
                                animate={{opacity:1,x:0}}
                            className="absolute z-50  bg-purple/90 backdrop-blur-md border-2 border-white/40 rounded-2xl w-[90%] lg:w-[450px] py-12 lg:py-16 lg:mb-12 flex flex-col items-center justify-center gap-2 "> 
                                <button onClick={()=> setPopUp(false)} className="absolute right-3 top-3 text-4xl bg-white/10 rounded-lg hover:bg-white/30 transition-all">
                                    <IoClose/>
                                </button>
                                <h1 className="text-2xl lg:text-3xl tracking-widest font-bold">Nisi ulogovan!</h1>
                                <h2 className="text-lg lg:text-xl tracking-wide">Moraš imati nalog!</h2>
                                <div>
                                    <h4 className= "pt-3 pb-3 hover:scale-105 transition-all"><span className="text-neutral-300 font-light">Nemaš kreiran nalog?</span> <Link href="/register" className="font-bold">Registruj se</Link></h4>
                                    <h4 className="pt-0 hover:scale-105 transition-all"><span className="text-neutral-300 font-light">Već imaš kreiran nalog?</span> <Link href="/login" className="font-bold">Prijavi se</Link></h4>
                                </div>
                            </motion.div>     
                        </>}
         
                       
                    </Form>
                )}
            </Formik>
        </>
    )
}