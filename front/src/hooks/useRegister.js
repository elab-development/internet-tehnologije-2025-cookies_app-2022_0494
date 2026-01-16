import { useState } from "react";
import useAuthContext from "./useAuthContext";
import React from 'react'
import apiUrl from "../utils/api/apiUrl"

const useRegister = () => {

const [isLoading,setIsLoading] = useState(false)
const [error, setErorr]= useState(null)
const {dispatch} = useAuthContext()
const [success, setSucces]=useState(false)

const register = async (name, age, phone, email, password, confirmPassword) => {
    setErorr(null)
    setIsLoading(true);

    try {
        const response = await fetch(`${apiUrl}/api/users/register`, {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, age, phone, email, password, confirmPassword })
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setErorr(json.message);
        } else {
            localStorage.setItem("user", JSON.stringify(json));
            dispatch({ type: "LOGIN", payload: json });
            setIsLoading(false);
            setTimeout(() => {
                window.location.replace("/")
            }, 1800);
        }
    } catch (error) {
        // Handle any fetch errors
        console.error("Error:", error);
        setIsLoading(false);
        setErorr("An error occurred during registration.");
    }
}
    return {register, isLoading, error,success}
}

export default useRegister