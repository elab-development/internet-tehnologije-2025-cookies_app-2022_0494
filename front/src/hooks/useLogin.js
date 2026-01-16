import React from 'react'
import { useState,useContext } from 'react'
import apiURL from "../utils/api/apiUrl"
import useAuthContext from "./useAuthContext"

const useLogin = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const {dispatch} = useAuthContext()
    const [success, setSucces]=useState(false)

    const login =  async (email, password) =>{
        setError(null)
        
        setIsLoading(true)
        try { 
            console.log("test1")
            const response = await fetch(`${apiURL}/api/users/login`,{
               method:"POST", 
               headers:{
                "Content-Type":"application/json",
            },
               body: JSON.stringify({email,password})
            })
            console.log("test2")
            const json = await response.json();
   
            if(!response.ok){
               setIsLoading(false)
               setError(json.message)
            }
            if(response.ok){
                localStorage.setItem("user",  JSON.stringify(json))
                dispatch({type: "LOGIN", payload: json})
                setIsLoading(false)
                setSucces(true)
                setTimeout(() => {
                    window.location.replace("/")
                }, 1000);
                
            }
        } catch (error) {
            console.error("Error:", error);
            setIsLoading(false);
            setError("An error occurred during login.");
        }
       
    }

  return {login, isLoading, error, success}
}

export default useLogin