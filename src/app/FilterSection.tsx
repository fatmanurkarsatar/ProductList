'use client'

import { useState } from 'react'
import {
  Dialog,
  Disclosure,
  DialogBackdrop,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { ArrowDownWideNarrow } from 'lucide-react'
import Image from 'next/image'
import { ReadonlyURLSearchParams } from 'next/navigation'

const sortOptions = [
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

const filters = [
  {
    id: 'gender',
    name: 'Gender',
    options: [
      { value: 'men', label: 'Men', checked: false },
      { value: 'women', label: 'Women', checked: false },
      { value: 'kids', label: 'Kids', checked: false },
    ],
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'black', label: 'Black', checked: false },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'red', label: 'Red', checked: false },
      { value: 'blue', label: 'Blue', checked: false },
      { value: 'grey', label: 'Grey', checked: false },
      { value: 'pink', label: 'Pink', checked: false },
      { value: 'yellow', label: 'Yellow', checked: false },
    ],
  },
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { value: 'nike', label: 'Nike', checked: false },
      { value: 'adidas', label: 'Adidas', checked: false },
      { value: 'puma', label: 'Puma', checked: false },
      { value: 'new balance', label: 'New Balance', checked: false },
      { value: 'crocs', label: 'Crocs', checked: false },
      { value: 'ugg', label: 'UGG', checked: false },
      { value: 'under armour', label: 'Under Armour', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '30', label: '30', checked: false },
      { value: '31', label: '31', checked: false },
      { value: '32', label: '32', checked: false },
      { value: '33', label: '33', checked: false },
      { value: '34', label: '34', checked: false },
      { value: '35', label: '35', checked: false },
      { value: '36', label: '36', checked: false },
      { value: '37', label: '37', checked: false },
      { value: '38', label: '38', checked: false },
      { value: '39', label: '39', checked: false },
      { value: '40', label: '40', checked: false },
      { value: '41', label: '41', checked: false },
      { value: '42', label: '42', checked: false },
      { value: '43', label: '43', checked: false },
      { value: '44', label: '44', checked: false },
      { value: '45', label: '45', checked: false },
    ],
  },
  {
    id: 'type',
    name: 'Type',
    options: [
      { value: 'running', label: 'Running', checked: false },
      { value: 'soccer', label: 'Soccer', checked: false },
      { value: 'tennis', label: 'Tennis', checked: false },
      { value: 'basketball', label: 'Basketball', checked: false },
      { value: 'golf', label: 'Golf', checked: false },
      { value: 'business', label: 'Business', checked: false },
      { value: 'hiking', label: 'Hiking', checked: false },
      { value: 'casual', label: 'Casual', checked: false },
    ],
  },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export function convertStringToQueriesObject(searchParams: ReadonlyURLSearchParams) {
  let selectedQueries: Record<string, string[]> = {}
  searchParams.forEach((values, key) => {
    const queries = values.split(',')
    selectedQueries[key] = selectedQueries[key] ? [...selectedQueries[key], ...queries] : queries
  })
  return selectedQueries
}

export default function ProductSection() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear"
          />

          <div className="fixed inset-0 z-40 flex">
            <Dialog.Panel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                          <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                        </span>

                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
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
            </Dialog.Panel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Shoes</h1>

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
                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                            'block px-4 py-2 text-sm hover:bg-gray-100'
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

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="flex flex-col lg:flex-row lg:space-x-8">
              {/* Filters */}
              <form className="hidden lg:block lg:w-1/4">
                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                          <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
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
          </section>
        </main>
      </div>
    </div>
  )
}
