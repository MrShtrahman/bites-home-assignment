import { Product, ProductCategory } from "../../_shared/types";

export const mockProduct: Product = {
  id: 'product-1',
  title: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  imageUrl: 'https://example.com/image.jpg',
  category: ProductCategory.ELECTRONICS,
  rating: 4.5,
  reviewCount: 100,
  stock: 10,
  createdAt: new Date().toISOString()
};