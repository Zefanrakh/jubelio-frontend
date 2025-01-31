import { useModalStore } from "@/stores/modalStore";
import { useProductStore } from "@/stores/productStore";
import { ReadProductDto } from "@/types/product/ReadProductDto";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

export default function ProductAction({
  product,
  afterDeleteRedirection,
}: {
  product: ReadProductDto;
  afterDeleteRedirection?: string;
}) {
  const router = useRouter();
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const setSelectedProduct = useProductStore(
    (state) => state.setSelectedProductUpdate
  );
  const setModalOpen = useModalStore((state) => state.setModalOpen);

  const handleEditProduct: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    setSelectedProduct(product);
    setModalOpen("product");
  };

  const handleDeleteProduct: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.stopPropagation();
    await deleteProduct(product.id);
    if (afterDeleteRedirection) {
      router.push(afterDeleteRedirection);
    }
  };

  return (
    <div className="flex justify-between flex-wrap gap-3">
      <button
        className="bg-yellow-500 text-white px-3 py-1 rounded"
        onClick={handleEditProduct}
      >
        Edit
      </button>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded"
        onClick={handleDeleteProduct}
      >
        Delete
      </button>
    </div>
  );
}
