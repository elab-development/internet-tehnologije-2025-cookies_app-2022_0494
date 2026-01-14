"use client"
import { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loadingAnimation.json"

const Loading = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1200);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div >
      
      {isVisible && <div className="h-full w-full bg-black absolute inset-0 z-[99999] flex flex-col gap-3 justify-center items-center transition-opacity">
        <Lottie animationData={loadingAnimation} className="w-[35px] h-[35px]"/>
        Loading</div>}
    </div>
  );
};

export default Loading;
