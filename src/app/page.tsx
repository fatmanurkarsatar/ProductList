"use client";

import { useState } from "react";
import React from "react";
import FilterSection from "./FilterSection";
import ProductSection from "./ProductSection";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowDownWideNarrow } from "lucide-react";
import { FunnelIcon } from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Page() {
  const [filter, setFilter] = useState({
    sort: "none",
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  console.log(filter);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 col-12 container">
      <button className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
        {/* <Filter className="h-5 w-5"/> */}
      </button>

      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Shoes
        </h1>

        <div className="flex items-center">
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              <ArrowDownWideNarrow
                aria-hidden="true"
                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              />
            </MenuButton>

            <Menu.Items
              transition
              className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                {sortOptions.map((option) => (
                  <MenuItem key={option.name}>
                    <a
                      href={option.href}
                      className={classNames(
                        option.current
                          ? "font-medium text-gray-900"
                          : "text-gray-500",
                        "block px-4 py-2 text-sm hover:bg-gray-100"
                      )}
                    >
                      {option.name}
                    </a>
                  </MenuItem>
                ))}
              </div>
            </Menu.Items>
          </Menu>

          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
          >
            <span className="sr-only">Filters</span>
            <FunnelIcon aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row bg-white overflow-hidden">
            <div className="md:w-1/4 p-4">
              <FilterSection />
            </div>
            <div className="md:w-3/4 p-4">
              <ProductSection />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
