import { useModalStore } from "@/stores/modalStore";
import { useProductStore } from "@/stores/productStore";
import style from "@/styles/products/AddProductButton.module.scss";

export default function CreateProductButton() {
  const setModalOpen = useModalStore((state) => state.setModalOpen);
  const setSelectedProduct = useProductStore(
    (state) => state.setSelectedProductUpdate
  );

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setModalOpen("product");
  };

  return (
    <button className={style.addProduct} onClick={handleAddProduct}>
      Create Product
    </button>
  );
}
