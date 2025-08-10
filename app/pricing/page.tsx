"use client";

import { useEffect } from "react";
import { pricingPlans } from "../../data/pricing";
import PricingCard from "../../components/PricingCard.jsx";
import { gsap } from "gsap";




export default function Pricing() {
  useEffect(() => {
    gsap.utils.toArray(".price-card").forEach((priceCard) => {
      gsap.fromTo(
        priceCard as gsap.TweenTarget,
        { y: "50%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          ease: "power1.out",
          
        }
      );
    });

  }, []);

  return (
    <div className="align-center justify-between mt-40 m-4">
      <div className="text-7xl font-bold text-center">
        <h1>
          Affordable{" "}
          <span className="bg-gradient-to-b from-blue-600 via-blue-700 to-slate-900 bg-clip-text text-transparent text-shadow-lg ">
            pricing
          </span>
        </h1>
      </div>

      <p className="text-l mt-10 text-center">
        Our pricing is designed to be budget-friendly, offering powerful features
        at every level
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-10">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            className="price-card"
            title={plan.title}
            price={plan.price}
            features={plan.features}
          />
        ))}
      </div>
    </div>
  );
}