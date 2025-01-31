"use client";

import { useAdjustmentStore } from "@/stores/adjustmentStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "@/styles/adjustments/AdjustmentTable.module.scss";
import OneCellAdjustment from "@/components/adjustments/OneCellAdjustment";
import AdjustmentAction from "@/components/adjustments/AdjustmentAction";
import Modal from "@/components/layout/Modal";
import { useModalStore } from "@/stores/modalStore";
import CreateAdjustmentButton from "@/components/adjustments/CreateAdjustmentButton";

const AdjustmentTable = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const router = useRouter();
  const fetchAdjustments = useAdjustmentStore(
    (state) => state.fetchAdjustments
  );
  const adjustments = useAdjustmentStore((state) => state.adjustments);
  const totalPages = useAdjustmentStore((state) => state.totalPages);
  const modalOpen = useModalStore((state) => state.open);

  useEffect(() => {
    fetchAdjustments(currentPage);
  }, []);

  const handlePageChange = (page: number) => {
    router.push(`/adjustments?page=${page}`);
  };

  const handleRowClick = (id: number) => {
    router.push(`/adjustments/${id}`);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-green-900">Adjustments</h1>
        <CreateAdjustmentButton />
      </div>
      <table className={style.adjustmentTable}>
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            {/* Column that shown below 768 px */}
            <th className="border border-gray-300 px-4 py-2 text-left">
              Adjustment
            </th>
            {/* End of Column that shown below 768 px */}
            <th className="border border-gray-300 px-4 py-2 text-left">SKU</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Qty</th>
            <th className="border border-gray-300 px-4 py-2 text-right">
              Amount
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {adjustments.map((adjustment) => (
            <tr
              key={adjustment.id}
              onClick={() => handleRowClick(adjustment.id)}
              className="hover:bg-gray-100"
            >
              <td className="border border-gray-300 px-4 py-2">
                {adjustment.id}
              </td>
              {/* Column that shown below 768 px */}
              <td className="border border-gray-300 px-4 py-2">
                <OneCellAdjustment adjustment={adjustment} />
              </td>
              {/* End of Column that shown below 768 px */}
              <td className="border border-gray-300 px-4 py-2">
                {adjustment.sku}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                {adjustment.qty}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right">
                ${adjustment.amount.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <AdjustmentAction adjustment={adjustment} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <button
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {modalOpen && <Modal />}
    </>
  );
};

export default AdjustmentTable;
