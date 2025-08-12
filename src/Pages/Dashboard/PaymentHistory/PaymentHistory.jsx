import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaCreditCard } from "react-icons/fa";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isPending } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-semibold mb-4">💳 Payment History</h2>
      <table className="table table-zebra w-full">
        {/* Table Head */}
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Paid At</th>
            <th>Parcel ID</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {payments.length > 0 ? (
            payments.map((payment) => {
              const date = new Date(payment.paidAt).toLocaleString();
              return (
                <tr key={payment._id}>
                  <td className="font-mono">{payment.transactionId}</td>
                  <td className="font-semibold">{payment.amount} ৳</td>
                  <td className="capitalize flex items-center gap-2">
                    <FaCreditCard /> {payment.paymentMethod?.join(", ")}
                  </td>
                  <td>{date}</td>
                  <td className="font-mono">{payment.parcelId}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No payment history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
