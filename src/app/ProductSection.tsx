"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import convertStringToQueriesObject from "./FilterSection";

function isAvailable(arr1?: string[], arr2?: string[]): boolean {
  if (!arr1 || !arr2) {
    return true;
  }
  return arr1.some((item) => arr2.includes(item));
}

const ProductSection = (props:any) => {
  //console.log(props.products)
  const searchParams = useSearchParams();
  const paramsObj = convertStringToQueriesObject();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fetch("http://localhost:8000/shoes")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setProducts(data);
    //   });

    setProducts(props?.products)
  }, [props]);


  // let filteredProducts = products.filter((product) => {
  //   const hasCategories = isAvailable(product.types, paramsObj?.type);
  //   const hasColors = isAvailable(product.color, paramsObj?.color);
  //   const hasSize = isAvailable(product.size, paramsObj?.sizes);
  //   return hasSize && hasColors && hasCategories;
  // });

  // if (paramsObj?.sort?.length > 0) {
  //   filteredProducts = filteredProducts.sort((p1, p2) => {
  //     switch (paramsObj.sort[0]) {
  //       case 'Price: Low to High':
  //         return p1.price - p2.price;
  //       case 'Price: High to Low':
  //         return p2.price - p1.price;
  //       default:
  //         return 0;
  //     }
  //   });

  // }
  // if (Object.keys(paramsObj).length === 0) {
  //   filteredProducts = products;
  // }
  // if (filteredProducts.length === 0) {
  //   return <p className='text-center text-slate-700'>No products available</p>;
  // }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {products?.map((product) => (
        <div key={product.id}>
          <Image
            loader={() => product.image_url}
            src={product.image_url}
            alt={product.brand}
            unoptimized={true}
            width={300}
            height={300}
            className="rounded-md shadow-sm aspect-[4/5] object-cover object-top w-full h-auto"
            style={{ objectFit: "contain" }}
          />
          <div className="space-y-1">
            <div>
              <p className="mt-4 font-medium truncate">{product.brand}</p>
            </div>
            <p className="line-clamp-2 text-slate-500 text-sm">
              {product.color}
            </p>
            <div className="flex justify-between items-center">
              <p className="font-semibold">Price: {product.price}</p>
              <p className="flex gap-2 items-center mt-2"></p>
            </div>
          </div>
          <button
            type="button"
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5"
          >
            Sepet Ekle
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductSection;
