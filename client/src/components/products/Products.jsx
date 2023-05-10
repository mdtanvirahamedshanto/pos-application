import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products/get-products"
        );
        const data = await res.json();
        if (data.status === "success") {
          setProducts(data.data);
        }
        //console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      {products.map((item) => (
        <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none">
          <div className="product-image">
            <img
              src={item.img}
              alt={item.name}
              className="h-28 object-cover w-full border-b"
            />
          </div>
          <div className="product-info flex flex-col p-3">
            <span className="font-bold">{item.title}</span>
            <span>{item.price} ₺</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
