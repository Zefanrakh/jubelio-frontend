import { useAdjustmentStore } from "@/stores/adjustmentStore";
import { useProductStore } from "@/stores/productStore";
import { MouseEventHandler } from "react";
import LoadingSpinner from "../layout/LoadingSpinner";

export function FormCancelButton({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  /* ----------------------------- STATE HOOK -------------------------------- */

  const isLoadingProduct = useProductStore((state) => state.isLoading);
  const isLoadingAdjustment = useAdjustmentStore((state) => state.isLoading);

  /* ----------------------------- RENDER -------------------------------- */

  return (
    <button
      type="button"
      className="text-white px-4 py-2 rounded mr-2"
      style={{
        background: "var(--coral)",
      }}
      onClick={onClick}
    >
      {isLoadingProduct || isLoadingAdjustment ? (
        <LoadingSpinner className="!w-[15px] !h-[15px] !border-[2px] !border-white" />
      ) : (
        "Cancel"
      )}
    </button>
  );
}
