import { useModalStore } from "@/stores/modalStore";
import { useProductStore } from "@/stores/productStore";
import ProductForm from "../products/ProductForm";
import style from "@/styles/Modal.module.scss";
import { useAdjustmentStore } from "@/stores/adjustmentStore";
import AdjustmentForm from "../adjustments/AdjustmentForm";

export default function Modal() {
  const selectedProduct = useProductStore((state) => state.selectedProductUpdate);
  const selectedAdjustment = useAdjustmentStore(
    (state) => state.selectedAdjustmentUpdate
  );
  const setModalOpen = useModalStore((state) => state.setModalOpen);
  const modalType = useModalStore((state) => state.modalType);

  return (
    <div className={style.overlay} onClick={() => setModalOpen()}>
      <div className={style.modalWrapper} onClick={(e) => e.stopPropagation()}>
        {modalType === "product" ? (
          <>
            <h2
              className="text-2xl font-bold mb-4"
              style={{
                color: "var(--teal_900_01)",
              }}
            >
              {selectedProduct ? "Update Product" : "Create Product"}
            </h2>
            <ProductForm product={selectedProduct} onClose={setModalOpen} />
          </>
        ) : (
          <>
            <h2
              className="text-2xl font-bold mb-4"
              style={{
                color: "var(--teal_900_01)",
              }}
            >
              {selectedAdjustment ? "Update Adjustment" : "Create Adjustment"}
            </h2>
            <AdjustmentForm
              adjustment={selectedAdjustment}
              onClose={setModalOpen}
            />
          </>
        )}
        <button className={style.closeButton} onClick={() => setModalOpen()}>
          <img src="/close.png" alt="" />
        </button>
      </div>
    </div>
  );
}
