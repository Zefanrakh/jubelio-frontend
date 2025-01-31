"use client";

import Modal from "@/components/layout/Modal";
import ProductCard from "@/components/products/ProductCard";
import { useModalStore } from "@/stores/modalStore";
import { useProductStore } from "@/stores/productStore";
import { useEffect, useRef } from "react";
import styles from "@/styles/products/ProductTable.module.scss";
import CreateProductButton from "@/components/products/CreateProductButton";
import LoadingSpinnerContainer from "@/components/layout/LoadingSpinnerContainer";
import LoadingSpinner from "@/components/layout/LoadingSpinner";

export default function Product() {
  /* ----------------------------- STATE HOOK -------------------------------- */

  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const hasMore = useProductStore((state) => state.hasMore);
  const modalOpen = useModalStore((state) => state.open);
  const observerRef = useRef<HTMLDivElement | null>(null);

  /* ----------------------------- HOOK -------------------------------- */

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchProducts();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore]);

  /* ----------------------------- RENDER -------------------------------- */

  return (
    <>
      {!products.length ? (
        <LoadingSpinnerContainer />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-green-900">Products</h1>
            <CreateProductButton />
          </div>

          <div className={styles.productTable}>
            {products.map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </div>

          {modalOpen && <Modal />}
          {hasMore && (
            <div ref={observerRef} className="text-center text-gray-500 py-4">
              <LoadingSpinner className="!w-[30px] !h-[30px]" />
            </div>
          )}
        </>
      )}
    </>
  );
}
