export interface CreateProductDto {
  title: string;
  sku: string;
  price: number;
  description?: string;
  image?: string;
}
