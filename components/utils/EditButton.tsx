import { useAdjustmentStore } from "@/stores/adjustmentStore";
import { useProductStore } from "@/stores/productStore";
import { MouseEventHandler } from "react";
import LoadingSpinner from "../layout/LoadingSpinner";

export default function EditButton({
  handleEdit,
}: {
  handleEdit: MouseEventHandler<HTMLButtonElement>;
}) {
  /* ----------------------------- STATE HOOK -------------------------------- */

  const isLoadingProduct = useProductStore((state) => state.isLoading);
  const isLoadingAdjustment = useAdjustmentStore((state) => state.isLoading);

  /* ----------------------------- RENDER -------------------------------- */

  return (
    <button
      className="bg-yellow-500 text-white px-3 py-1 rounded"
      onClick={handleEdit}
      disabled={isLoadingProduct || isLoadingAdjustment}
    >
      {isLoadingProduct || isLoadingAdjustment ? (
        <LoadingSpinner className="!w-[15px] !h-[15px] !border-[2px]" />
      ) : (
        "Edit"
      )}
    </button>
  );
}
