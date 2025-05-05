export interface Order {
    _id: string;
    customer: string;
    total: number;
    products: {
      product: string;
      quantity: number;
      supplier: string;
    }[];
    createdAt: string;
  }