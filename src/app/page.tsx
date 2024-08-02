"use client";

import React, { useState, useEffect } from "react";
import ProductSection from "./ProductSection";
import {
  Dialog,
  Disclosure,
  DialogBackdrop,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
} from "@headlessui/react";
import { ArrowDownWideNarrow } from "lucide-react";
import { FunnelIcon, ShoppingBagIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { HeartIcon } from "@heroicons/react/24/outline";

interface ActiveFilter {
  filterLabel: string;
  sectionId: string;
}

interface Filter {
  id: string;
  name: string;
  options: { value: string; label: string; checked: boolean }[];
}

interface Product {
  [key: string]: any;
}

const sortOptions = [
  { name: "Price: Low to High", href: "#", current: false, type:'toHigh' },
  { name: "Price: High to Low", href: "#", current: false, type:'toLow' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Page() {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState<number[]>([]);
  const [favoriteCount, setFavoriteCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Arama alanı için state

  useEffect(() => { //json server dan datalar alınır
    fetch("http://localhost:8000/filters")
      .then((response) => response.json())
      .then((data) => setFilters(data));

    fetch("http://localhost:8000/shoes")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  useEffect(() => {
    filterProductList(activeFilter, searchQuery); // Arama sorgusu değiştiğinde filtreleme
  }, [searchQuery]);

  function handleChange(filterLabel: string, sectionId: string) {
    const newFilter = { filterLabel, sectionId };
    const isIncluded = activeFilter.some(
      (item) => item.filterLabel === filterLabel
    );

    let updatedFilters: ActiveFilter[];
    if (isIncluded) {
      updatedFilters = activeFilter.filter(
        (item) => item.filterLabel !== filterLabel
      );
    } else {
      updatedFilters = [...activeFilter, newFilter];
    }
    setActiveFilter(updatedFilters);
    filterProductList(updatedFilters, searchQuery);
  }

  const filterProductList = (activeFilter: ActiveFilter[], query: string) => {
    let filtered = products;

    if (activeFilter.length > 0) {
      filtered = filtered.filter((product) =>
        activeFilter.every(
          (acfilter) => product[acfilter.sectionId] === acfilter.filterLabel
        )
      );
    }

    if (query) {
      filtered = filtered.filter((product) =>
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.color.toLowerCase().includes(query.toLowerCase()) ||
        product.price.toLowerCase().includes(query.toLowerCase()) ||
        product.type.toLowerCase().includes(query.toLowerCase()) ||
        product.gender.toLowerCase().includes(query.toLowerCase()) 
      )
    };
    

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (productId: number) => {
    setAddedToCart((prev) => [...prev, productId]);
  };

  const handleFavoritesChange = (count: number) => {
    setFavoriteCount(count);
  };

  const sortByPrice = (sortType: any) =>{
    if(sortType === 'toLow'){
      const sorted = [...filteredProducts].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      setFilteredProducts(sorted);
    }else{
      const sorted = [...filteredProducts].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      setFilteredProducts(sorted);    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 col-12 container">
      <div className="flex items-center justify-between border-b border-gray-200 pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Shoes</h1>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search products..."
            className="p-2 border border-gray-300 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="-m-2 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
          >
            <span className="sr-only">Filters</span>
            <FunnelIcon aria-hidden="true" className="h-5 w-5" />
          </button>

          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              <ArrowDownWideNarrow
                aria-hidden="true"
                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              />
            </MenuButton>

            <Menu.Items
              className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none"
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
                      onClick={() => sortByPrice(option.type)}
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
            className="relative p-2 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Cart</span>
            <ShoppingBagIcon className="h-6 w-6" />
            {addedToCart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full px-2 py-1">
                {addedToCart.length}
              </span>
            )}
          </button>

          <button
            type="button"
            className="relative p-2 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Favorites</span>
            <HeartIcon className="h-6 w-6" />
            {favoriteCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full px-2 py-1">
                {favoriteCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row bg-white overflow-hidden">
            <div className="md:w-1/4 p-4">
              <div className="bg-white">
                <div>
                  <Dialog
                    open={mobileFiltersOpen}
                    onClose={() => setMobileFiltersOpen(false)}
                    className="relative z-40 lg:hidden"
                  >
                    <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear" />

                    <div className="fixed inset-0 z-40 flex">
                      <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out">
                        <div className="flex items-center justify-between px-4">
                          <h2 className="text-lg font-medium text-gray-900">
                            Filters
                          </h2>
                          <button
                            type="button"
                            onClick={() => setMobileFiltersOpen(false)}
                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                          >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                          </button>
                        </div>

                        <form className="mt-4 border-t border-gray-200">
                          {filters.map((section) => (
                            <Disclosure
                              key={section.id}
                              as="div"
                              className="border-t border-gray-200 px-4 py-6"
                            >
                              <h3 className="-mx-2 -my-3 flow-root">
                                <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    <PlusIcon
                                      aria-hidden="true"
                                      className="h-5 w-5 group-data-[open]:hidden"
                                    />
                                    <MinusIcon
                                      aria-hidden="true"
                                      className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                                    />
                                  </span>
                                </DisclosureButton>
                              </h3>
                              <DisclosurePanel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map(
                                    (option, optionIdx) => (
                                      <div
                                        key={option.value}
                                        className="flex items-center"
                                      >
                                        <input
                                          value={option.value}
                                          defaultChecked={option.checked}
                                          id={`filter-mobile-${section.id}-${optionIdx}`}
                                          name={`${section.id}[]`}
                                          type="checkbox"
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                          onChange={() =>
                                            handleChange(
                                              option.label,
                                              section.id
                                            )
                                          }
                                        />
                                        <label
                                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                          className="ml-3 text-sm font-medium text-gray-900"
                                        >
                                          {option.label}
                                        </label>
                                      </div>
                                    )
                                  )}
                                </div>
                              </DisclosurePanel>
                            </Disclosure>
                          ))}
                        </form>
                      </Dialog.Panel>
                    </div>
                  </Dialog>

                  <div className="hidden lg:block">
                    <form className="space-y-4 border-t border-gray-200">
                      {filters.map((section) => (
                        <Disclosure
                          key={section.id}
                          as="div"
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          <h3 className="-mx-2 -my-3 flow-root">
                            <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                <PlusIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 group-data-[open]:hidden"
                                />
                                <MinusIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                                />
                              </span>
                            </DisclosureButton>
                          </h3>
                          <DisclosurePanel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    value={option.value}
                                    defaultChecked={option.checked}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    onChange={() =>
                                      handleChange(option.label, section.id)
                                    }
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm font-medium text-gray-900"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </DisclosurePanel>
                        </Disclosure>
                      ))}
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-3/4 p-4">
              <ProductSection
                products={filteredProducts}
                onAddToCart={handleAddToCart}
                onFavoritesChange={handleFavoritesChange}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
