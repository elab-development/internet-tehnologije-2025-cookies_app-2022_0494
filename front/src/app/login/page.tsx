"use client"
import ParticlesBackground from "../../components/ParticlesBackground"
import Link from "next/link"
import { FaUser,FaPhoneAlt  } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Field, Form, Formik,ErrorMessage, FormikProps,FormikHelpers } from 'formik';
import loginSchema from "../../schemas/loginSchema"
import axios from "axios";
import apiUrl from "../../utils/api/apiUrl"
import useLogin from "../../hooks/useLogin"

import Loading from '@/components/Loading';
import useAuthContext from '@/hooks/useAuthContext';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page(){
    const {login, isLoading, error,success} = useLogin()
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
                validationSchema={loginSchema}
                initialValues={{ email: "", password: "" }}
                onSubmit={ async (values) => {
                    const {email, password} = values;
                    await login(email, password);
                    // try {
                    //     await axios.post(`${apiUrl}/api/users/login`,values)
                    //     console.log("Form submitted with values:", values);
                    // } catch (error) {
                    //     console.log(error)
                    // }     
                }}
            >
                {(formikProps) => (
                    <Form className="h-[80svh] pt-14 flex flex-col gap-4 w-[90%] sm:w-[450px] justify-center items-center mx-auto bg-red-80 z-[999]">
                        <h2 className="w-9/12 pt-10 text-xl sm:text-3xl font-extrabold text-center">Dobrodošli nazad!</h2>
                        <h4 className= "py-1 pb-3 sm:pb-5 text-sm pl-2 sm:pl-1 sm:text-base hover:scale-105 transition-all">Unesite email i lozinku kako bi pristupili nalogu</h4>
                        <div className="flex flex-col justify-center items-center w-full">
                            <div className={`relative flex flex-row justify-center items-center w-full`}>
                                <div className="absolute z-[99999] left-3 opacity-50 text-xl">
                                    <MdEmail/>
                                </div>
                                <Field name="email" className={`reg-input w-full py-[5px] pl-10 ${formikProps.errors.email && formikProps.touched.email ? 'has-error' : ''}  ${error ? "has-error" : ""}`} type="email" placeholder="Email"/>
                            </div>
                            <ErrorMessage name="email" component="div" className="error-message" />
                        </div>
                        <div className="flex flex-col justify-center items-center w-full">
                            <div className={`relative flex flex-row justify-center items-center w-full`}>
                                <div className="absolute z-[99999] left-3 opacity-50 text-xl">
                                    <IoIosLock/>
                                </div>
                                <Field name="password" className={`reg-input w-full py-[5px] pl-10 ${formikProps.errors.password && formikProps.touched.password ? 'has-error' : ''}  ${error ? "has-error" : ""}`} type="password" placeholder="Lozinka"/>
                            </div>
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>
                       
                        <div className="w-full flex justify-between items-center">
                            <div className="flex justify-center items-center">
                                <Field name="rememberMe" type="checkbox" className="mr-2 mt-[2px] rounded-md"/>
                                <label>Zapamti me</label>
                            </div>
                            <Link href="/" className="hover:scale-105 transition-all text-neutral-300 font-light">Zaboravljena lozinka</Link>
                        </div>
                        <button disabled={isLoading} type="submit" className={`{${isLoading ? "opacity-70":""} w-full mt-4 border border-white py-2 hover:scale-95 transition-all`}>{success ? <span className="text-green transition-all">Uspešna prijava!</span> : "Prijavi se"} </button>
                        <div className="flex flex-col gap-0 justify-center items-center pb-3">
                            <h4 className= "py-1 pb-3 hover:scale-105 transition-all"><span className="text-neutral-300 font-light">Nemaš kreiran nalog?</span> <Link href="/register" className="font-bold">Registruj se</Link></h4>
                            {error && <h3 className="text-red-700 text-lg">{error}</h3>}
                        </div>
                       
                    </Form>
                )}
            </Formik>
        </>
    )
}
