import React, { useState } from "react";
import ProductCard from "./ProductCard";

interface DataProps {
  data?: any;
}
const ProductList: React.FC<DataProps> = ({ data }) => {
  //console.log(data.category, data.category_id);
  return (
    <>
      {Array.isArray(data) &&
        data.map((item: any, index: any) => (
          <ProductCard item={item} key={index} />
        ))}
    </>
  );
};

export default ProductList;
