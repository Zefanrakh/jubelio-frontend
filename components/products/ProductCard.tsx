import { ReadProductDto } from "@/types/product/ReadProductDto";
import styles from "@/styles/products/ProductCard.module.scss";
import { useRouter } from "next/navigation";
import ProductAction from "./ProductAction";

export default function ProductCard({ product }: { product: ReadProductDto }) {
  const router = useRouter();

  /* ----------------------------- FUNCTION -------------------------------- */

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  /* ----------------------------- RENDER -------------------------------- */

  return (
    <div
      key={product.id}
      className={styles.productCard}
      onClick={handleCardClick}
    >
      <div className="flex flex-col gap-4 justify-between h-full">
        {/* Content */}
        <div className="">
          <img
            src={product.image || "/no_image.png"}
            alt={product.title}
            className="w-full h-32 object-cover mb-2"
          />
          <h2 className="font-bold text-lg">{product.title}</h2>
          <p className="text-gray-500">SKU: {product.sku}</p>
          <p className="text-gray-500">Price: ${product.price}</p>
        </div>
        {/* Action */}
        <ProductAction product={product} />
      </div>
    </div>
  );
}
