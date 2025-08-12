import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div>
          Are you sure you want to delete?
          <div className="mt-2 flex gap-2">
            <button
              className="btn btn-xs btn-error text-white"
              onClick={async () => {
                try {
                  await axiosSecure.delete(`/parcels/${id}`).then((res) => {
                    if (res.data.deletedCount) {
                      refetch();
                    }
                  });

                  toast.dismiss(t.id);
                  toast.success("Parcel deleted successfully");
                } catch (error) {
                  console.log(error);
                  toast.dismiss(t.id);
                  toast.error("Failed to delete parcel");
                }
              }}
            >
              Yes
            </button>
            <button className="btn btn-xs" onClick={() => toast.dismiss(t.id)}>
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };
  console.log(parcels);
  return (
    <div className="overflow-x-auto">
      <Toaster></Toaster>
      <table className="table table-zebra w-full">
        {/* Table Head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
            <th>Cost</th>
            <th>Created At</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {parcels.map((parcel, idx) => {
            const formattedDate = new Date(
              parcel.creationDate
            ).toLocaleDateString();
            const paymentColor =
              parcel.paymentStatus === "paid"
                ? "badge badge-success"
                : "badge badge-error";

            return (
              <tr key={parcel._id}>
                <td>{idx + 1}</td>
                <td className="font-medium max-w-80 truncate">
                  {parcel.parcelName}
                </td>
                <td className="font-medium">{parcel.productType}</td>
                <td>{parcel.cost} ৳</td>
                <td>{formattedDate}</td>
                <td>
                  <span className={`${paymentColor} text-white capitalize`}>
                    {parcel.paymentStatus}
                  </span>
                </td>
                <td className="flex gap-2 flex-wrap">
                  <Link
                    to={`/parcels/${parcel._id}`}
                    className="btn btn-xs btn-info text-white"
                  >
                    View
                  </Link>
                  <Link
                    to={`/dashboard/payment/${parcel._id}`}
                    className="btn btn-xs btn-primary  text-black"
                  >
                    Pay
                  </Link>
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-xs btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
