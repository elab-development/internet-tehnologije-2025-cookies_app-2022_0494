import { useState } from 'react'
import apiURL from "../utils/api/apiUrl"

const useQuestion = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const sendQuestion = async (values) => {
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(`${apiURL}/api/questions`, {
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

    return { sendQuestion, isLoading, error, success };
};

export default useQuestion
