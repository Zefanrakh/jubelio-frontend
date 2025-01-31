import { useAdjustmentStore } from "@/stores/adjustmentStore";
import { useProductStore } from "@/stores/productStore";
import LoadingSpinner from "../layout/LoadingSpinner";

export default function FormSubmitButton({ label }: { label: string }) {
  /* ----------------------------- STATE HOOK -------------------------------- */

  const isLoadingProduct = useProductStore((state) => state.isLoading);
  const isLoadingAdjustment = useAdjustmentStore((state) => state.isLoading);

  /* ----------------------------- RENDER -------------------------------- */

  return (
    <button
      type="submit"
      className="bg-white px-4 py-2 rounded font-bold"
      style={{ color: "var(--teal_300)" }}
    >
      {isLoadingProduct || isLoadingAdjustment ? (
        <LoadingSpinner className="!w-[15px] !h-[15px] !border-[2px] !border-teal-500" />
      ) : (
        label
      )}
    </button>
  );
}
