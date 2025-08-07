// components/Benefits.jsx
import React from "react";
import img1 from "../../../assets/illustration1.png";
import img2 from "../../../assets/illustration2.png";
import img3 from "../../../assets/illustration2.png";

const benefitsData = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
    image: img1,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: img2,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: img3,
  },
];

const Benefits = () => {
  return (
    <section data-aos="fade-up" className="bg-white  rounded-2xl py-12 px-4 md:px-16">
      <div className="space-y-8">
        {benefitsData.map((benefit, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center bg-base-200 p-6 rounded-lg shadow-md gap-6"
          >
            {/* Left Side Image */}
            <div className="w-full md:w-1/4 flex justify-center">
              <img
                src={benefit.image}
                alt={benefit.title}
                className="h-52 object-contain"
              />
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-60 mx-2 border-l border-black  border-dotted ">
              &nbsp;
            </div>
            <div className="block md:hidden w-full my-2 border-t border-dotted border-black">
              &nbsp;
            </div>

            {/* Right Side Content */}
            <div className="w-full md:w-3/4">
              <h3 className="text-2xl text-[#03373D] font-extrabold mb-2 ">
                {benefit.title}
              </h3>
              <p className="text-gray-600 ">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
