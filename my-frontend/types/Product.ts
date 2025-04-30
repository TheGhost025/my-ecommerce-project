export interface Productt {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    supplier : {
        _id: string;
        firstName: string;
        lastName: string;
      };
}