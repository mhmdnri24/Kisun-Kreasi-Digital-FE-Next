export interface Product {
  id: number;
  user_id: number;
  name: string;
  price: number;
  unit: string;
  category: string;
  stock: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductPageProps {
  params: {
    id: string;
  };
}