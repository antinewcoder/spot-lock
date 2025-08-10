"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function Hero({word}) {
  const [displayText, setDisplayText] = useState(word);
  function maskText(word) {
    let starNumber = 0;
    const interval = setInterval(() => {

      starNumber++;
      const maskedPassword = "*".repeat(starNumber) + word.slice(starNumber);

      setDisplayText(maskedPassword);

      if (starNumber === word.length){
        clearInterval(interval);
      }

  }, 200);
  }

  useEffect(() => {
   
    gsap.to("#hero", {
      opacity: 1,
      duration: 1,
      delay: 1,
      onComplete: () => {
        maskText(word);
      },
    });

  }, [word]);

  return (
  <>
    <div className="mt-40 flex-col md:flex gap-6 text-center">
      <h1 className="text-white font-bold text-6xl text-shadow-lg">Save your</h1>
      <h1 id="hero" className="text-white font-bold opacity-100 text-8xl text-shadow-lg">
        {displayText}
      </h1>
      
    </div>
    <div className="text-white text-center mx-4 gap-6 flex flex-col ">
      <h1 className=" text-2xl text-shadow-lg">with SpotLock.</h1>
      <p className="text-l ">Manage your passwords for all the places you love to visit from coffee shops to gyms.</p>
    </div>
  </>
  );
}