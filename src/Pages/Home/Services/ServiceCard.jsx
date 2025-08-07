// components/ServiceCard.jsx
import React from "react";
import {
  FaTruck,
  FaGlobe,
  FaBoxOpen,
  FaMoneyBillWave,
  FaBuilding,
  FaUndoAlt,
} from "react-icons/fa";

const iconMap = {
  "Express & Standard Delivery": (
    <FaTruck className="text-4xl text-[#03373D]" />
  ),
  "Nationwide Delivery": <FaGlobe className="text-4xl text-[#03373D]" />,
  "Fulfillment Solution": <FaBoxOpen className="text-4xl text-[#03373D]" />,
  "Cash on Home Delivery": (
    <FaMoneyBillWave className="text-4xl text-[#03373D]" />
  ),
  "Corporate Service / Contract In Logistics": (
    <FaBuilding className="text-4xl text-[#03373D]" />
  ),
  "Parcel Return": <FaUndoAlt className="text-4xl text-[#03373D]" />,
};

const ServiceCard = ({ move, title, description }) => {
  return (
    <div
      data-aos={move}
    
      className="card bg-gray-200 shadow-xl shadow-gray-600 p-5 hover:shadow-2xl hover:bg-[#CAEB66] transition-shadow duration-300"
    >
      <div className="mb-4 mx-auto ">{iconMap[title]}</div>
      <h3 className="text-lg text-center font-bold mb-2 text-[#03373D]">
        {title}
      </h3>
      <p className="text-sm text-center text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
