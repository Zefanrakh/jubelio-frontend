export interface ReadProductDto {
  id: number;
  title: string;
  sku: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  created_at: Date;
  updated_at: Date;
}
