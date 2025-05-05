export interface Orders {
    _id: string;
    customer: {
      _id: string;
      name: string;
      email: string;
    };
    total: number;
    products: {
      product: string;
      quantity: number;
      supplier: string;
    }[];
    createdAt: string;
  }