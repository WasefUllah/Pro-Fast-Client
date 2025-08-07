// components/Services.jsx
import React from "react";
import ServiceCard from "./ServiceCard";

const servicesData = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
      movement: "fade-up-left"
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
      movement: "fade-up"
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
      movement: "fade-up-right"
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      movement: "fade-down-left"
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
      movement: "fade-down"
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
      movement: "fade-down-right"
  },
];

const Services = () => {
  return (
    <section
    data-aos="fade-left"
    className="py-16 px-4 lg:px-24 bg-[#03373D] rounded-2xl my-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl text-white font-bold mb-4">Our Services</h2>
        <p className="max-w-2xl mx-auto text-gray-400">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((service) => (
          <ServiceCard key={service.title} move={service.movement} title={service.title} description={service.description} />
        ))}
      </div>
    </section>
  );
};

export default Services;
