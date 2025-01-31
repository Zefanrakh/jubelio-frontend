import { useAdjustmentStore } from "@/stores/adjustmentStore";
import { useModalStore } from "@/stores/modalStore";
import style from "@/styles/products/AddProductButton.module.scss";

export default function CreateAdjustmentButton() {
  /* ----------------------------- STATE HOOK -------------------------------- */

  const setModalOpen = useModalStore((state) => state.setModalOpen);
  const setSelectedAdjustment = useAdjustmentStore(
    (state) => state.setSelectedAdjustmentUpdate
  );

  /* ----------------------------- FUNCTION -------------------------------- */

  const handleAddAdjustment = () => {
    setSelectedAdjustment(null);
    setModalOpen("adjustment");
  };

  /* ----------------------------- RENDER -------------------------------- */

  return (
    <button className={style.addProduct} onClick={handleAddAdjustment}>
      Create Adjustment
    </button>
  );
}
