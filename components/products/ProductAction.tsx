import { useAdjustmentStore } from "@/stores/adjustmentStore";
import { useModalStore } from "@/stores/modalStore";
import { useProductStore } from "@/stores/productStore";
import { ReadProductDto } from "@/types/product/ReadProductDto";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import LoadingSpinner from "../layout/LoadingSpinner";
import EditButton from "../utils/EditButton";
import DeleteButton from "../utils/DeleteButton";

export default function ProductAction({
  product,
  afterDeleteRedirection,
}: {
  product: ReadProductDto;
  afterDeleteRedirection?: string;
}) {
  const router = useRouter();

  /* ----------------------------- STATE HOOK -------------------------------- */

  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const setSelectedProduct = useProductStore(
    (state) => state.setSelectedProductUpdate
  );
  const setModalOpen = useModalStore((state) => state.setModalOpen);
  const isLoadingProduct = useProductStore((state) => state.isLoading);
  const isLoadingAdjustment = useAdjustmentStore((state) => state.isLoading);

  /* ----------------------------- FUNCTION -------------------------------- */

  const handleEditProduct: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if (isLoadingProduct || isLoadingAdjustment) {
      return;
    }
    setSelectedProduct(product);
    setModalOpen("product");
  };

  const handleDeleteProduct: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.stopPropagation();
    if (isLoadingProduct || isLoadingAdjustment) {
      return;
    }
    await deleteProduct(product.id);
    if (afterDeleteRedirection) {
      router.push(afterDeleteRedirection);
    }
  };

  /* ----------------------------- RENDER -------------------------------- */

  return (
    <div className="flex justify-between flex-wrap gap-3">
      <EditButton handleEdit={handleEditProduct} />
      <DeleteButton handleDelete={handleDeleteProduct} />
    </div>
  );
}
