import { useProductStore } from "@/stores/productStore";
import { CreateProductDto } from "@/types/product/CreateProductDto";
import { ReadProductDto } from "@/types/product/ReadProductDto";
import { UpdateProductDto } from "@/types/product/UpdateProductDto";
import { useState } from "react";
import style from "@/styles/Input.module.scss";
import FormSubmitButton from "../utils/FormSubmitButton";
import { FormCancelButton } from "../utils/FormCancelButton";

export default function ProductForm({
  product,
  onClose,
}: {
  product: ReadProductDto;
  onClose: () => void;
}) {
  /* ----------------------------- STATE HOOK -------------------------------- */

  const { createProduct, updateProduct } = useProductStore();
  const [formData, setFormData] = useState<UpdateProductDto | CreateProductDto>(
    {
      title: product?.title || "",
      sku: product?.sku || "",
      image: product?.image || "",
      price: product?.price || 0,
      description: product?.description || "",
    }
  );

  /* ----------------------------- FUNCTION -------------------------------- */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (product) {
      await updateProduct({ id: product.id, ...formData });
    } else {
      await createProduct(formData as CreateProductDto);
    }

    onClose();
  };

  /* ----------------------------- RENDER -------------------------------- */

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <div className={style.inputCustom}>
          <fieldset>
            <input
              name="title"
              placeholder="Title"
              type="text"
              value={formData.title}
              onChange={handleChange}
            />
            <legend data-label="Title"></legend>
            <label className="replacer">Title</label>
          </fieldset>
        </div>

        <div className={style.inputCustom}>
          <fieldset>
            <input
              name="sku"
              placeholder="SKU"
              type="text"
              value={formData.sku}
              onChange={handleChange}
            />
            <legend data-label="SKU"></legend>
            <label className="replacer">SKU</label>
          </fieldset>
        </div>

        <div className={style.inputCustom}>
          <fieldset>
            <input
              name="image"
              placeholder="image"
              type="text"
              value={formData.image}
              onChange={handleChange}
            />
            <legend data-label="Image Url"></legend>
            <label className="replacer">Image Url</label>
          </fieldset>
        </div>

        <div className={style.inputCustom}>
          <fieldset>
            <input
              name="price"
              placeholder="5"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
            <legend data-label="Price"></legend>
            <label className="replacer">Price</label>
          </fieldset>
        </div>

        <div className={style.inputCustom}>
          <fieldset>
            <textarea
              name="description"
              placeholder="Add something..."
              value={formData.description}
              onChange={handleChange}
            />
            <legend data-label="Description"></legend>
            <label className="replacer">Description</label>
          </fieldset>
        </div>
        <div className="flex justify-end">
          <FormCancelButton onClick={onClose} />
          <FormSubmitButton label={product ? "Update" : "Create"} />
        </div>
      </div>
    </form>
  );
}
