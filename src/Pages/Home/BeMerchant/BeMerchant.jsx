import React from "react";
import img from "../../../assets/location-merchant.png";

const BeMerchant = () => {
  return (
    <div
     data-aos="fade-up-left"

      className="bg-no-repeat p-20 bg-[#03373D] rounded-2xl my-4 bg-[url('assets/be-a-merchant-bg.png')]"
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={img} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold text-white">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6 text-gray-400">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="space-x-3">
            <button className="btn btn-primary px-4 py-2 text-[#03373D] rounded-full bg-primary">
              Become a Merchant
            </button>
            <button className="btn  px-4 py-2 border-2 border-primary bg-[#03373D] text-primary rounded-full">
              Earn with Profast Courier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
