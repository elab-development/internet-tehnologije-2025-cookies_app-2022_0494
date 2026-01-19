"use client"
import ParticlesBackground from "@/components/ParticlesBackground"
import Link from "next/link"
import { FaUser,FaPhoneAlt  } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import regSchema from "../../schemas/regSchema"
import axios from "axios";
import apiUrl from "@/utils/api/apiUrl";
import useRegister from "@/hooks/useRegister"

import Loading from '@/components/Loading';
import useAuthContext from '@/hooks/useAuthContext';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page(){

    const {register, error, isLoading,success} = useRegister();

    const { user } = useAuthContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ensure loading state is handled correctly
        if (user !== null) {
            redirect("/");
         } else {
            setLoading(false);
          }
        
      }, [user]);

    return(
    <>
     <Loading />
        <ParticlesBackground/>
        <Formik
                initialValues={{
                    name: "",
                    age: "",
                    phone: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                }}
                validationSchema={regSchema}
                onSubmit={ async (values) => {
                    const {name,age,phone,email,password,confirmPassword} =  values;
                    await register(name,age,phone,email,password,confirmPassword)
                }}
            >
                {formikProps => (
                    <Form className="sm:h-[87vh] pt-20 pb-4 sm:pb-0 sm:pt-14 flex flex-col gap-3 w-[90%] sm:w-[450px] justify-center items-center mx-auto bg-red-80 z-[999]">
                        <h2 className="sm:w-9/12 py-7 pb-5 sm:pt-10 sm:pb-3  text-xl md:text-3xl font-extrabold self-stsart text-center">Registruj svoj ITnaTI nalog besplatno!</h2>
                        <h4 className= "py-1 pb-3 sm:pb-5 text-sm pl-2 sm:pl-1 sm:text-base hover:scale-105 transition-all">Unesite svoje podatke za kreiranje naloga</h4>
                        <div className="flex flex-col justify-center items-center w-full">
                            <div className={`relative flex flex-row justify-center items-center w-full `}>
                                <div className="absolute z-[99999] left-3 opacity-50">
                                    <FaUser />
                                </div>
                                <Field name="name" className={`reg-input w-full py-[5px] pl-10 ${formikProps.errors.name && formikProps.touched.name ? 'has-error' : ''} `} type="text" placeholder="Ime i prezime" />
                            </div>
                            <ErrorMessage name="name" component="div" className="error-message" />
                        </div>
                        
                       
                        <div className="flex flex-col justify-center items-center w-full">
                            <div className={`relative flex flex-row justify-center items-center w-full`}>
                                <div className="absolute z-[99999] left-3 opacity-50">
                                    <FaUser />
                                </div>
                                <Field name="age" className={`reg-input w-full py-[5px] pl-10 ${formikProps.errors.age && formikProps.touched.age ? 'has-error' : ''}`} type="text" placeholder="Godine" />
                            </div>
                            <ErrorMessage name="age" component="div" className="error-message" />
                        </div>

                        <div className="flex flex-col justify-center items-center w-full">
                            <div className={`relative flex flex-row justify-center items-center w-full `}>
                                <div className="absolute z-[99999] left-3 opacity-50">
                                    <FaPhoneAlt />
                                </div>
                                <Field name="phone" className={`reg-input w-full py-[5px] pl-10 ${formikProps.errors.phone && formikProps.touched.phone ? 'has-error' : ''}`} type="text" placeholder="Broj telefona" />
                            </div>
                            <ErrorMessage name="phone" component="div" className="error-message" />
                        </div>

                        <div className="flex flex-col justify-center items-center w-full">
                            <div className={`relative flex flex-row justify-center items-center w-full`}>
                                <div className="absolute z-[99999] left-3 opacity-50 text-xl">
                                    <MdEmail />
                                </div>
                                <Field name="email" className={`reg-input w-full py-[5px] pl-10 ${formikProps.errors.email && formikProps.touched.email ? 'has-error' : ''}`} type="email" placeholder="Email" />
                            </div>
                            <ErrorMessage name="email" component="div" className="error-message" />
                        </div>

                        <div className="flex flex-col justify-center items-center w-full">
                            <div className={`relative flex flex-row justify-center items-center w-full`}>
                                <div className="absolute z-[99999] left-3 opacity-50 text-xl">
                                    <IoIosLock />
                                </div>
                                <Field name="password" className={`reg-input w-full py-[5px] pl-10 ${formikProps.errors.password && formikProps.touched.password ? 'has-error' : ''}`} type="password" placeholder="Kreiraj lozinku" />
                            </div>
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>

                        <div className="flex flex-col justify-center items-center w-full">
                            <div className={`relative flex flex-row justify-center items-center w-full `}>
                                <div className="absolute z-[99999] left-3 opacity-50 text-xl">
                                    <IoIosLock />
                                </div>
                                <Field name="confirmPassword" className={`reg-input w-full py-[5px] pl-10 ${formikProps.errors.confirmPassword && formikProps.touched.confirmPassword ? 'has-error' : ''}`} type="password" placeholder="Potvrda lozinke" />
                            </div>
                            <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                        </div>

                        <button disabled={isLoading} type="submit" className={`{${isLoading ? "opacity-70":""} w-full mt-4 border border-white py-2 hover:scale-95 transition-all`}>{success ? <span className="text-green transition-all">Uspešna registracija!</span> : "Registruj se"} </button>
                        <div className="flex flex-col gap-1 justify-center items-center">
                            <h4 className="pt-1 hover:scale-105 transition-all"><span className="text-neutral-300 font-light">Već imaš kreiran nalog?</span> <Link href="/login" className="font-bold">Prijavi se</Link></h4>
                            {error && <h3 className="text-red-700 text-lg">{error}</h3>}
                        </div>
                        
                    </Form>
                )}
            </Formik>
    </>
    )
}