import { useAdjustmentStore } from "@/stores/adjustmentStore";
import { useModalStore } from "@/stores/modalStore";
import { ReadAdjustmentDto } from "@/types/adjustment/ReadAdjustmentDto";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

export default function AdjustmentAction({
  adjustment,
  afterDeleteRedirection,
}: {
  adjustment: ReadAdjustmentDto;
  afterDeleteRedirection?: string;
}) {
  const router = useRouter();
  const deleteAdjustment = useAdjustmentStore(
    (state) => state.deleteAdjustment
  );
  const setSelectedAdjustment = useAdjustmentStore(
    (state) => state.setSelectedAdjustmentUpdate
  );
  const setModalOpen = useModalStore((state) => state.setModalOpen);

  const handleEditAdjustment: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.stopPropagation();
    setSelectedAdjustment(adjustment);
    setModalOpen("adjustment");
  };

  const handleDeleteAdjustment: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.stopPropagation();
    await deleteAdjustment(adjustment.id);
    if (afterDeleteRedirection) {
      router.push(afterDeleteRedirection);
    }
  };

  return (
    <div className="flex justify-end flex-wrap gap-3">
      <button
        className="bg-yellow-500 text-white px-3 py-1 rounded"
        onClick={handleEditAdjustment}
      >
        Edit
      </button>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded"
        onClick={handleDeleteAdjustment}
      >
        Delete
      </button>
    </div>
  );
}
