import { useAdjustmentStore } from "@/stores/adjustmentStore";
import { useModalStore } from "@/stores/modalStore";
import style from "@/styles/products/AddProductButton.module.scss";

export default function CreateAdjustmentButton() {
  const setModalOpen = useModalStore((state) => state.setModalOpen);
  const setSelectedAdjustment = useAdjustmentStore(
    (state) => state.setSelectedAdjustmentUpdate
  );

  const handleAddAdjustment = () => {
    setSelectedAdjustment(null);
    setModalOpen("adjustment");
  };

  return (
    <button className={style.addProduct} onClick={handleAddAdjustment}>
      Create Adjustment
    </button>
  );
}
