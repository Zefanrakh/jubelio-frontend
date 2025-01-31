import style from "@/styles/Input.module.scss";
import { useAdjustmentStore } from "@/stores/adjustmentStore";
import { UpdateAdjustmentDto } from "@/types/adjustment/UpdateAdjustmentDto";
import { CreateAdjustmentDto } from "@/types/adjustment/CreateAdjustmentDto";
import { useEffect, useState } from "react";
import { ReadAdjustmentDto } from "@/types/adjustment/ReadAdjustmentDto";
import { useProductStore } from "@/stores/productStore";
import { ReadProductDto } from "@/types/product/ReadProductDto";

export default function AdjustmentForm({
  adjustment,
  onClose,
  selectedProduct,
  noCancel,
}: {
  adjustment?: ReadAdjustmentDto;
  selectedProduct?: ReadProductDto;
  onClose?: () => void;
  noCancel?: boolean;
}) {
  const createAdjustment = useAdjustmentStore(
    (state) => state.createAdjustment
  );
  const updateAdjustment = useAdjustmentStore(
    (state) => state.updateAdjustment
  );
  const fetchProductsNoPagination = useProductStore(
    (state) => state.fetchProductsNoPagination
  );
  const products = useProductStore((state) => state.allProducts);
  const getProduct = useProductStore((state) => state.getProduct);

  const [formData, setFormData] = useState<
    UpdateAdjustmentDto | CreateAdjustmentDto
  >({
    sku: adjustment?.sku || "",
    qty: adjustment?.qty || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (adjustment) {
      await updateAdjustment({ id: adjustment.id, ...formData });
    } else {
      await createAdjustment(formData as CreateAdjustmentDto);
      if (selectedProduct) {
        await getProduct(selectedProduct.id);
      }
    }
    setFormData((prev) => ({ ...prev, qty: 0 }));
    onClose?.();
  };

  useEffect(() => {
    fetchProductsNoPagination();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({ ...prev, sku: selectedProduct.sku }));
    }
  }, [selectedProduct]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        {!adjustment && !selectedProduct && (
          <div className={style.inputCustom}>
            <fieldset>
              <select
                name="sku"
                value={(formData as CreateAdjustmentDto).sku}
                onChange={handleChange}
              >
                <option value="">SKU</option>
                {products.map((product) => (
                  <option key={product.sku} value={product.sku}>
                    {product.sku} - {product.title}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>
        )}

        <div className={style.inputCustom}>
          <fieldset>
            <input
              name="qty"
              placeholder="qty"
              type="number"
              value={formData.qty}
              onChange={handleChange}
            />
            <legend data-label="Quantity"></legend>
            <label className="replacer">Quantity</label>
          </fieldset>
        </div>

        <div className="flex justify-end">
          {!noCancel && (
            <button
              type="button"
              className="text-white px-4 py-2 rounded mr-2"
              style={{
                background: "var(--coral)",
              }}
              onClick={() => onClose?.()}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-white px-4 py-2 rounded font-bold"
            style={{ color: "var(--teal_300)" }}
          >
            {adjustment ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </form>
  );
}
