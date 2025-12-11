import { Product, ProductCategory } from './types';

const categories = Object.values(ProductCategory);

const randomIsoFromLastSixMonths = (): string => {
  const now = Date.now();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const start = sixMonthsAgo.getTime();
  const end = now;

  const randomTime = start + Math.random() * (end - start);
  return new Date(randomTime).toISOString();
}

const generateProduct = (id: number): Product => {
  const category = categories[id % categories.length];
  const price = Math.ceil(Math.random() * 100);
  const stock = Math.random() < 0.1 ? 0 : Math.floor(Math.random() * 100);

  return {
    id: `product-${id}`,
    title: `Product ${id}`,
    description: `Description for product ${id}`,
    price,
    imageUrl: `https://picsum.photos/seed/${id}/400/400`,
    category,
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    reviewCount: Math.floor(Math.random() * 500),
    stock,
    createdAt: randomIsoFromLastSixMonths()
  };
};

export const MOCK_PRODUCTS = Array.from({ length: 200 }, (_, i) =>
  generateProduct(i + 1)
);
