
import React from "react";
import Marquee from "react-fast-marquee";

import brand1 from "../../../assets/brands/amazon.png";
import brand2 from "../../../assets/brands/amazon_vector.png";
import brand3 from "../../../assets/brands/casio.png";
import brand4 from "../../../assets/brands/moonstar.png";
import brand5 from "../../../assets/brands/randstad.png";
import brand6 from "../../../assets/brands/start-people 1.png";
import brand7 from "../../../assets/brands/start.png";


const brands = [brand1, brand2, brand3, brand4, brand5, brand6, brand7];

const Brands = () => {
  return (
    <section className="py-12 my-4 rounded-2xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#03373D]">We've helped thousands of sales teams</h2>
        
      </div>

      <Marquee
        direction="left"
        speed={40}
        pauseOnHover={true}
        className="overflow-hidden"
      >
        {brands.map((logo, idx) => (
          <div
            key={idx}
            className="mx-8 flex items-center justify-center w-32 sm:w-28 md:w-36 lg:w-40"
          >
            <img src={logo} alt={`Brand ${idx + 1}`} className="w-full object-contain h-20" />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Brands;
