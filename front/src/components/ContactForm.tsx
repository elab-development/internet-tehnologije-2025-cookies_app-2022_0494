"use client"
import Link from "next/link"
import { FaUser,FaPhoneAlt  } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Field, Form, Formik,ErrorMessage, FormikProps,FormikHelpers } from 'formik';
import contactSchema from "../schemas/contactSchema"
import axios from "axios";
import useAuthContext from "@/hooks/useAuthContext";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { motion } from "framer-motion"
import useApply from "../hooks/useApply"
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loadingAnimation.json"
 

export default function ContactForm(){
    
    const {user} = useAuthContext();

    let initialValues = { email: "", name: "", message:""};
    if (user) {
        initialValues = { email: user.email, name: user.name, message:""};
      }
      const {apply, success, error, isLoading} = useApply()
    return(
        <>
          <Formik
                validationSchema={contactSchema}
                initialValues={initialValues}
                onSubmit={ async ({name,email,message},{resetForm}) => { 
                        
                        resetForm();
                }}
            >
                {(formikProps) => (
                    <Form className={` py px-13 flex flex-col gap-4 w-[100%] xl:w-[600px] justify-center items-center  z-[999] `}>
                        {/* <h4 className= "py-0 pb-3 sm:pb-3 text-md pl-2  sm:text-base hover:scale-105 transition-all">Nakon uspešne prijave dobijate uputstvo za plaćanje na email</h4> */}
                        <div className={`flex flex-col gap-2 sm:gap-4 w-[93%] lg:w-full -z-10 `}>
                            <div className="flex flex-col justify-center items-center w-full">
                                <div className={`relative flex flex-row justify-center items-center w-full`}>
                                    <div className="absolute z-[99999] left-3 opacity-50 text-xl">
                                        <FaUser />
                                    </div>
                                    <Field name="name" className={`reg-input w-full py-[5px] pl-10 z-0 ${formikProps.errors.name && formikProps.touched.name ? 'has-error' : ''}  ${error ? "has-error" : ""}`} type="text" placeholder="Ime i prezime"/>
                                </div>
                                <ErrorMessage name="name" component="div" className="error-message " />
                            </div>
                            
                            <div className="flex flex-col justify-center items-center w-full">
                                <div className={`relative flex flex-row justify-center items-center w-full`}>
                                    <div className="absolute z-[99999] left-3 opacity-50 text-xl">
                                        <MdEmail/>
                                    </div>
                                    <Field  name="email" className={`reg-input w-full py-[5px] pl-10 z-0 ${formikProps.errors.email && formikProps.touched.email ? 'has-error' : ''}  ${error ? "has-error" : ""}`} type="email" placeholder="Vaš Email"/>
                                </div>
                                <ErrorMessage name="email" component="div" className="error-message " />
                            </div>

                            <div className="flex flex-col justify-center items-center w-full">
                                <div className={`relative flex flex-row justify-center items-center w-full`}>
                                    <div className="absolute z-[99999] top-2 left-3 opacity-50 text-xl">
                                        <MdEmail/>
                                    </div>
                                    <textarea
                                        name="message"
                                        className={`reg-input w-full py-[5px] h-20 sm:h-40 xl:h-52 pl-10 z-0 ${formikProps.errors.message && formikProps.touched.message ? 'has-error' : ''}  ${error ? "has-error" : ""}`}
                                        placeholder="Poruka"
                                        value={formikProps.values.message}
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur} // Add onBlur event handler
                                    />
                                </div>
                                <ErrorMessage name="message" component="div" className="error-message " />
                            </div>
                           

                 

                            <div className=" w-full flex justify-between items-center">
                                    <div className="flex justify-center items-center">
                                        <input checked={user} name="useUserData" type="checkbox" className="mr-2 mt-[1px] rounded-md"/>
                                        <label>Koristi podatke sa naloga</label>
                                    </div>
                            </div>
                        </div> 
                       
                        <button disabled={!user && isLoading} type="submit"  className={` w-[93%] lg:w-full mt-2 sm:mt-4 border border-white py-2 hover:scale-95 transition-all`}> {success ? <span className="text-green transition-all">Uspešno poslato!</span> : "Pošalji poruku"}</button>
                    
                        {isLoading && 
                            <Lottie animationData={loadingAnimation} className="w-[35px] h-[35px]"/>
                        }
                        
            
         
                       
                    </Form>
                )}
            </Formik>
        </>
    )
}