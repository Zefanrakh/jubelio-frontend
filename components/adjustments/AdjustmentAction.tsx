import { useAdjustmentStore } from "@/stores/adjustmentStore";
import { useModalStore } from "@/stores/modalStore";
import { useProductStore } from "@/stores/productStore";
import { ReadAdjustmentDto } from "@/types/adjustment/ReadAdjustmentDto";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import EditButton from "../utils/EditButton";
import DeleteButton from "../utils/DeleteButton";

export default function AdjustmentAction({
  adjustment,
  afterDeleteRedirection,
}: {
  adjustment: ReadAdjustmentDto;
  afterDeleteRedirection?: string;
}) {
  /* ----------------------------- STATE HOOK -------------------------------- */

  const deleteAdjustment = useAdjustmentStore(
    (state) => state.deleteAdjustment
  );
  const setSelectedAdjustment = useAdjustmentStore(
    (state) => state.setSelectedAdjustmentUpdate
  );
  const setModalOpen = useModalStore((state) => state.setModalOpen);
  const isLoadingProduct = useProductStore((state) => state.isLoading);
  const isLoadingAdjustment = useAdjustmentStore((state) => state.isLoading);

  /* ----------------------------- HOOK -------------------------------- */

  const router = useRouter();

  /* ----------------------------- FUNCTION -------------------------------- */

  const handleEditAdjustment: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.stopPropagation();
    if (isLoadingProduct || isLoadingAdjustment) {
      return;
    }
    setSelectedAdjustment(adjustment);
    setModalOpen("adjustment");
  };

  const handleDeleteAdjustment: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.stopPropagation();
    if (isLoadingProduct || isLoadingAdjustment) {
      return;
    }
    await deleteAdjustment(adjustment.id);
    if (afterDeleteRedirection) {
      router.push(afterDeleteRedirection);
    }
  };

  /* ----------------------------- RENDER -------------------------------- */

  return (
    <div className="flex justify-end flex-wrap gap-3">
      <EditButton handleEdit={handleEditAdjustment} />
      <DeleteButton handleDelete={handleDeleteAdjustment} />
    </div>
  );
}
