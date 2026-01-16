import React from 'react'
import { useState,useContext } from 'react'
import apiURL from "../utils/api/apiUrl"
import useAuthContext from "./useAuthContext"

const useApply = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const apply = async (values) => {
        setError(null);
        setIsLoading(true);
    
        try {
            const response = await fetch(`${apiURL}/api/courses/applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
    
            const json = await response.json(); 
    
            if (!response.ok) {
                setIsLoading(false);
                setError(json.message || 'An error occurred while processing your request.');
            }
            if (response.ok) {
                setIsLoading(false);
                setSuccess(true);
    
                // Reset success state after a certain period
                setTimeout(() => {
                    setSuccess(false);
                }, 3000); 
            }
        } catch (error) {
            console.error('Error occurred:', error);
            setError('An error occurred while processing your request.');
            setIsLoading(false);
        }
    };
    
    

    return { apply, isLoading, error, success };
};

export default useApply