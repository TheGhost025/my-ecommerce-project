export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    supplier: {
        _id: string;
        name: string;
      };
    orderCount?: number;
}