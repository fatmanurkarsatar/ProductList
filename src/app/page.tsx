"use client";

import { useState } from "react";
import React from "react";
import FilterSection from "./FilterSection";
import ProductSection from "./ProductSection";

export default function Page() {
  const [filter, setFilter] = useState({
    sort: "none",
  });
  console.log(filter);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 col-12 container">
     
          <button
            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
          >
            {/* <Filter className="h-5 w-5"/> */}
          </button>
       
    
      <div className="row col-12">
        <div className="col-4">
          <FilterSection />
        </div>
        <div className="col-8">
            <ProductSection />
          </div>
      </div>
    </main>
  );
}
