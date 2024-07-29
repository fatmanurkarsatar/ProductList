import { useSearchParams } from 'next/navigation';
import React from 'react';
import { convertStringToQueriesObject } from './FilterSection';
import { products } from './products';

function isAvailable(arr1?: string[], arr2?: string[]): boolean {
  if (!arr1 || !arr2) {
    return true;
  }
  return arr1.some((item) => arr2.includes(item));
}

const ProductSection = () => {
  return <div>ProductSection</div>
}

export default ProductSection;
