"use client";

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline"; // Import HeartIcon

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  brand: string;
  color: string;
  // Diğer ürün özellikleri
}

interface ProductSectionProps {
  products: Product[];
  onAddToCart: (productId: number) => void;
  onFavoritesChange: (count: number) => void; // Yeni prop
}

const ProductSection: React.FC<ProductSectionProps> = ({ products, onAddToCart, onFavoritesChange }) => {
  const [addedToCart, setAddedToCart] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    onFavoritesChange(favorites.length); // Favoriler değiştiğinde güncelle
  }, [favorites, onFavoritesChange]);

  const handleAddToCart = (productId: number) => {
    setAddedToCart((prev) => [...prev, productId]);
    onAddToCart(productId);
  };

  const handleToggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {products.map((product) => (
        <div key={product.id} className="relative">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              loader={() => product.image_url}
              src={product.image_url}
              alt={product.brand}
              unoptimized={true}
              width={300}
              height={300}
              className="rounded-md shadow-sm aspect-[4/5] object-cover object-top w-full h-auto"
              style={{ objectFit: "contain", borderRadius: "20px", borderWidth: "4px", backgroundColor: "white", padding: "10px" }}
            />
          </div>
          <div className="space-y-1">
            <div>
              <p className="mt-4 font-medium truncate">{product.brand}</p>
            </div>
            <p className="line-clamp-2 text-slate-500 text-sm">
              {product.color}
            </p>
            <div className="flex justify-between items-center">
              <p className="font-semibold">Price: {product.price}$</p>
            </div>
            {addedToCart.includes(product.id) ? (
              <p className="text-green-600 mt-2">Sepete Eklendi</p>
            ) : (
              <button
                type="button"
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 bg-slate-300 hover:bg-primary-dark text-black shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => handleAddToCart(product.id)}
              >
                Sepete Ekle
              </button>
            )}
          </div>
          <button
            type="button"
            className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-md hover:bg-gray-100"
            onClick={() => handleToggleFavorite(product.id)}
          >
            <HeartIcon
              className={`h-6 w-6 ${favorites.includes(product.id) ? "text-red-500" : "text-gray-400"}`}
              aria-hidden="true"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductSection;
