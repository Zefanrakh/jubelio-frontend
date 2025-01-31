"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import Modal from "@/components/layout/Modal";
import { useModalStore } from "@/stores/modalStore";
import { useAdjustmentStore } from "@/stores/adjustmentStore";
import AdjustmentAction from "@/components/adjustments/AdjustmentAction";
import dayjs from "dayjs";

export default function AdjustmentDetail() {
  const { id } = useParams();
  const getAdjustment = useAdjustmentStore((state) => state.getAdjustment);
  const adjustment = useAdjustmentStore(
    (state) => state.selectedAdjustmentDetail
  );
  const modalOpen = useModalStore((state) => state.open);

  useEffect(() => {
    getAdjustment(id as string);
  }, [id]);

  if (!adjustment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-bold">Loading adjustment details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start gap-5">
      <div className="bg-white mt-3 shadow-lg rounded-lg overflow-hidden w-3/4 md:w-1/2">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">{adjustment.sku}</h1>
          <p className="text-gray-500 text-sm">
            Adjustment Quantity: {adjustment.qty}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Created At:{" "}
            <span className="text-blue-500 font-medium">
              {dayjs(adjustment.created_at).format("MMMM d, YYYY h:mm a")}
            </span>
          </p>
        </div>
      </div>
      <AdjustmentAction
        adjustment={adjustment}
        afterDeleteRedirection="/adjustments"
      />
      {modalOpen && <Modal />}
    </div>
  );
}
