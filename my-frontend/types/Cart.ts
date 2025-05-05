export type CartItem = {
    product: {
      _id: string;
      name: string;
      description: string;
      price: number;
      image: string;
      category: string;
      stock: number;
      supplier: string
    };
    quamtity: number;
  };
  
  export type CartData = {
    _id: string;
    user: string;
    items: CartItem[];
  };