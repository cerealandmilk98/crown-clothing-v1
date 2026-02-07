import { createContext, useState, useEffect } from "react";
import SHOP_DATA from "../shop-data"; // or wherever yours lives

export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(SHOP_DATA);
  }, []);

  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
