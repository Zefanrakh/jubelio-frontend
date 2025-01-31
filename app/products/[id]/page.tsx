"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useProductStore } from "@/stores/productStore";
import AdjustmentForm from "@/components/adjustments/AdjustmentForm";
import style from "@/styles/Modal.module.scss";
import ProductAction from "@/components/products/ProductAction";
import Modal from "@/components/layout/Modal";
import { useModalStore } from "@/stores/modalStore";
import LoadingSpinnerContainer from "@/components/layout/LoadingSpinnerContainer";

export default function ProductDetail() {
  /* ----------------------------- STATE HOOK -------------------------------- */

  const getProduct = useProductStore((state) => state.getProduct);
  const product = useProductStore((state) => state.selectedProductDetail);
  const modalOpen = useModalStore((state) => state.open);

  /* ----------------------------- HOOK -------------------------------- */

  const { id } = useParams();
  useEffect(() => {
    getProduct(id as string);
  }, [id]);

  /* ----------------------------- RENDER -------------------------------- */

  if (!product) {
    return <LoadingSpinnerContainer />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start gap-5">
      <div className="bg-white mt-3 shadow-lg rounded-lg overflow-hidden w-3/4 md:w-1/2">
        <div className="relative">
          <img
            src={product.image || "/no_image.png"}
            alt={product.title}
            className="w-full h-64 object-cover"
          />
          {product.stock === 0 && (
            <div className="absolute top-0 left-0 bg-red-600 text-white px-3 py-1 text-sm font-bold">
              Out of Stock
            </div>
          )}
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-500 text-sm">SKU: {product.sku}</p>
          <p className="text-lg font-bold text-blue-600 mt-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <div className="flex items-center mt-6">
            <span
              className={`px-4 py-2 rounded-full text-sm font-bold ${
                product.stock > 0
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>
        </div>
      </div>
      <div className={style.modalWrapper + " " + "!w-3/4 md:!w-1/2"}>
        <h2
          className="text-xl font-bold mb-4"
          style={{
            color: "var(--teal_900_01)",
          }}
        >
          Create Adjustment
        </h2>
        <AdjustmentForm noCancel selectedProduct={product} />
      </div>
      <ProductAction product={product} afterDeleteRedirection="/products" />
      {modalOpen && <Modal />}
    </div>
  );
}
