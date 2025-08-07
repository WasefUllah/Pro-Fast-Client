import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const { user } = useAuth();
  const serviceCenters = useLoaderData();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const uniqueRegions = [
    ...new Set(serviceCenters.map((center) => center.region)),
  ];
  const getDistrictsByRegion = (region) => {
    const districts = serviceCenters
      .filter((center) => center.region == region)
      .map((center) => center.district);
    return districts;
  };
  const productType = watch("productType");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const getTrackingId = () => {
    const datePart = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `PCL-${datePart}-${rand}`;
  };
  const onSubmit = (data) => {
    console.log(data);
    const weight = parseFloat(data.parcelWeight);
    const isSameDistrict = data.senderRegion == data.receiverRegion;

    let cost = 0;
    let extraCost = 0;
    if (data.productType == "document") {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (weight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const extraWeight = weight - 3;
        extraCost = extraWeight * 40;
        cost = isSameDistrict ? 110 + extraCost : 150 + extraCost;
      }
    }

    // let isConfirm = false;
    toast((t) => (
      <div>
        <p className="font-bold text-lg">Total Price details</p>
        <p>
          <strong>Type: </strong> {productType}
        </p>
        <p>
          <strong>Weight: </strong> {data.parcelWeight}
        </p>
        <p>
          <strong>Delivery Area: </strong>{" "}
          {isSameDistrict ? "Within same district" : "Outside of the district"}
        </p>
        <hr className="my-2" />
        <p>
          <strong>Base cost:</strong>{" "}
          {productType == "document"
            ? isSameDistrict
              ? 60
              : 80
            : isSameDistrict
            ? 110
            : 150}
        </p>
        {extraCost > 0 ? (
          <p>
            <strong>Extra charge: </strong> {extraCost}
          </p>
        ) : (
          ""
        )}
        <p>
          <strong>Total cost: </strong>
          {cost}
        </p>
        <div className="text-center space-x-2 my-2">
          <button
            className="btn btn-primary text-black"
            onClick={() => {
              const parcelData = {
                ...data,
                cost,
                createdBy: user.email,
                paymentStatus: "unpaid",
                deliveryStatus: "notCollected",
                creationDate: new Date().toString(),
                trackingId: getTrackingId(),
              };
              toast.success("Proceeding...");
              toast.dismiss(t.id);
              console.log(parcelData);
            }}
          >
            Proceed to payment
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="btn btn-error text-black"
          >
            Dismiss
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <Toaster />
      <h1 className="font-bold text-3xl mb-2">Add Parcel</h1>
      <p>Enter your parcel details</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Product Type */}
        <div>
          <span className="mr-3">
            <input
              type="radio"
              {...register("productType", { required: true })}
              value="document"
              className="mr-1"
            />
            <label>Document</label>
          </span>
          <span className="mr-3">
            <input
              type="radio"
              {...register("productType", { required: true })}
              value="nonDocument"
              className="mr-1"
            />
            <label>Non-document</label>
          </span>
          {errors.productType && (
            <p role="alert" className="text-red-500 text-sm">
              Product type is required
            </p>
          )}
        </div>

        {/* Parcel Name & Weight */}
        <div className="md:flex md:flex-row md:gap-2 lg:gap-4 justify-between items-center">
          <div className="flex-1">
            <label className="label text-black">Parcel Name</label>
            <br />
            <input
              type="text"
              className="input w-full"
              {...register("parcelName", { required: true })}
            />
            {errors.parcelName && (
              <p role="alert" className="text-red-500 text-sm">
                Parcel name is required
              </p>
            )}
          </div>

          <div className="flex-1">
            <label className="label text-black">Parcel Weight (kg)</label>
            <br />
            <input
              type="number"
              disabled={productType !== "nonDocument"}
              className="input w-full"
              {...register("parcelWeight", {
                required: productType === "nonDocument",
                min: 0.01,
              })}
            />
            {errors.parcelWeight && (
              <p role="alert" className="text-red-500 text-sm">
                Valid weight is required
              </p>
            )}
          </div>
        </div>

        {/* Sender Information */}
        <div className="md:flex md:flex-row md:gap-2 lg:gap-4 justify-between items-center mt-2">
          <div className="flex-1">
            <p className="text-2xl font-semibold">Sender Information</p>

            {/* Name & Contact */}
            <div className="lg:flex lg:flex-row justify-between items-center lg:gap-4">
              <div className="flex-1">
                <label className="label text-black">Sender Name</label>
                <br />
                <input
                  type="text"
                  className="input w-full"
                  {...register("senderName", { required: true })}
                />
                {errors.senderName && (
                  <p className="text-red-500 text-sm">
                    Sender name is required
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label className="label text-black">
                  Sender Contact number
                </label>
                <br />
                <input
                  type="tel"
                  className="input w-full"
                  {...register("senderContactNumber", { required: true })}
                />
                {errors.senderContactNumber && (
                  <p className="text-red-500 text-sm">
                    Contact number is required
                  </p>
                )}
              </div>
            </div>

            {/* Region & District */}
            <div className="lg:flex lg:flex-row justify-between items-center lg:gap-4">
              <div className="flex-1">
                <label className="label text-black">Sender Region</label>
                <br />
                <select
                  className="select select-bordered w-full"
                  {...register("senderRegion", { required: true })}
                >
                  <option value="">Select Region</option>
                  {uniqueRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.senderRegion && (
                  <p className="text-red-500 text-sm">Region is required</p>
                )}
              </div>

              <div className="flex-1">
                <label className="label text-black">Sender District</label>
                <br />
                <select
                  className="select select-bordered w-full"
                  {...register("senderDistrict", { required: true })}
                >
                  <option value="">Select District</option>
                  {getDistrictsByRegion(senderRegion).map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.senderDistrict && (
                  <p className="text-red-500 text-sm">District is required</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="flex-1">
              <label className="label text-black">Sender Address</label>
              <br />
              <input
                type="text"
                className="input w-full"
                {...register("senderAddress", { required: true })}
              />
              {errors.senderAddress && (
                <p className="text-red-500 text-sm">Address is required</p>
              )}
            </div>

            {/* Pickup Info */}
            <div>
              <label className="label text-black">Pickup Information</label>
              <br />
              <textarea
                className="input w-full"
                {...register("pickupInformation", { required: true })}
              ></textarea>
              {errors.pickupInformation && (
                <p className="text-red-500 text-sm">Pickup info is required</p>
              )}
            </div>
          </div>

          {/* Receiver Info */}
          <div className="flex-1">
            <p className="text-2xl font-semibold">Receiver Information</p>

            {/* Name & Contact */}
            <div className="lg:flex lg:flex-row justify-between items-center lg:gap-4">
              <div className="flex-1">
                <label className="label text-black">Receiver Name</label>
                <br />
                <input
                  type="text"
                  className="input w-full"
                  {...register("receiverName", { required: true })}
                />
                {errors.receiverName && (
                  <p className="text-red-500 text-sm">
                    Receiver name is required
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label className="label text-black">
                  Receiver Contact number
                </label>
                <br />
                <input
                  type="tel"
                  className="input w-full"
                  {...register("receiverContactNumber", { required: true })}
                />
                {errors.receiverContactNumber && (
                  <p className="text-red-500 text-sm">
                    Contact number is required
                  </p>
                )}
              </div>
            </div>

            {/* Region & District */}
            <div className="lg:flex lg:flex-row justify-between items-center lg:gap-4">
              <div className="flex-1">
                <label className="label text-black">Receiver Region</label>
                <br />
                <select
                  className="select select-bordered w-full"
                  {...register("receiverRegion", { required: true })}
                >
                  <option value="">Select Region</option>
                  {uniqueRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.receiverRegion && (
                  <p className="text-red-500 text-sm">Region is required</p>
                )}
              </div>

              <div className="flex-1">
                <label className="label text-black">Receiver District</label>
                <br />
                <select
                  className="select select-bordered w-full"
                  {...register("receiverDistrict", { required: true })}
                >
                  <option value="">Select District</option>
                  {getDistrictsByRegion(receiverRegion).map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.receiverDistrict && (
                  <p className="text-red-500 text-sm">District is required</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="flex-1">
              <label className="label text-black">Receiver Address</label>
              <br />
              <input
                type="text"
                className="input w-full"
                {...register("receiverAddress", { required: true })}
              />
              {errors.receiverAddress && (
                <p className="text-red-500 text-sm">Address is required</p>
              )}
            </div>

            {/* Delivery Info */}
            <div>
              <label className="label text-black">Delivery Information</label>
              <br />
              <textarea
                className="input w-full"
                {...register("deliveryInformation", { required: true })}
              ></textarea>
              {errors.deliveryInformation && (
                <p className="text-red-500 text-sm">
                  Delivery info is required
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary text-black mt-6">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
