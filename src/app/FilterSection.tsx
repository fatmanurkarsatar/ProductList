"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { ReadonlyURLSearchParams, useSearchParams, useRouter } from 'next/navigation';

// Filter options
const categories = ["Men", "Women", "Kids"];
const colors = ["Black", "White", "Brown", "Red", "Blue", "Grey", "Pink", "Yellow"];
const brands = ["Nike", "Adidas", "Puma", "New Balance", "Crocs", "UGG", "Under Armour"];
const sizes = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
const activities = ["Running", "Soccer", "Tennis", "Basketball", "Golf", "Business", "Hiking", "Casual"];

const filterOptions = [
    { id: "categories", title: "Categories", options: categories, type: "checkbox" },
    { id: "colors", title: "Colors", options: colors, type: "checkbox" },
    { id: "brands", title: "Brands", options: brands, type: "checkbox" },
    { id: "size", title: "Size", options: sizes, type: "checkbox" },
    { id: "activity", title: "Activity", options: activities, type: "checkbox" },
];

// Utility functions
function checkValidQuery(queries: string[]) {
    return queries.some(query => query !== "");
}

export function convertStringToQueriesObject(searchParams: ReadonlyURLSearchParams) {
    let selectedQueries: Record<string, string[]> = {};
    searchParams.forEach((values, key) => {
        const queries = values.split(",");
        selectedQueries[key] = selectedQueries[key] ? [...selectedQueries[key], ...queries] : queries;
    });
    return selectedQueries;
}

function convertValidStringQueries(queries: Record<string, string[]>) {
    return Object.entries(queries)
        .map(([key, value]) => `${key}=${value.join(",")}`)
        .join("&");
}

// Main component
const FilterSection = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedQueries, setSelectedFilterQueries] = useState<Record<string, string[]>>({});

    useEffect(() => {
        const paramsObj = convertStringToQueriesObject(searchParams);
        setSelectedFilterQueries(paramsObj);
    }, [searchParams]);

    function handleSelectFilterOptions(e: ChangeEvent<HTMLInputElement>) {
        const { name, value, type } = e.target;
        let updatedQueries = { ...selectedQueries };

        if (updatedQueries[name]) {
            if (type === "radio") {
                updatedQueries[name] = [value];
            } else if (updatedQueries[name].includes(value)) {
                updatedQueries[name] = updatedQueries[name].filter(query => query !== value);
                if (!checkValidQuery(updatedQueries[name])) delete updatedQueries[name];
            } else {
                updatedQueries[name].push(value);
            }
        } else {
            updatedQueries[name] = [value];
        }

        setSelectedFilterQueries(updatedQueries);
        router.push(`/?${convertValidStringQueries(updatedQueries)}`, { scroll: false });
    }

    function isChecked(id: string, option: string | number) {
        // option'un türünü kontrol edin ve 'string' ise toLowerCase kullanın, değilse number'ı string'e çevirin
        const value = typeof option === 'string' ? option.toLowerCase() : option.toString().toLowerCase();
        return selectedQueries[id]?.includes(value) || false;
    }

    return (
        <div className="col-span-2 space-y-6 sticky top-12 h-fit">
            {filterOptions.map(({ id, title, type, options }) => (
                <div className="border-b pb-4" key={id}>
                    <p className="font-medium mb-4">{title}</p>
                    <div className="space-y-2">
                        {options.map(value => (
                            <CheckboxAndRadioGroup key={value}>
                                <CheckboxAndRadioItem
                                    type={type}
                                    name={id}
                                    id={value.toString().toLowerCase().trim()}
                                    label={value.toString()}
                                    value={value.toString().toLowerCase().trim()}
                                    checked={isChecked(id, value)}
                                    onChange={handleSelectFilterOptions}
                                />
                            </CheckboxAndRadioGroup>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

// Helper components
interface ICheckboxAndRadioGroup {
    children: React.ReactNode;
}

function CheckboxAndRadioGroup({ children }: ICheckboxAndRadioGroup) {
    return <div className="flex items-center gap-4">{children}</div>;
}

interface CheckboxAndRadioItem extends React.ComponentPropsWithoutRef<"input"> {
    label: string;
}

function CheckboxAndRadioItem({ id, label, ...props }: CheckboxAndRadioItem) {
    return (
        <>
            <input id={id} className="w-4 h-4 shrink-0" {...props} />
            <label htmlFor={id} className="text-sm">
                {label}
            </label>
        </>
    );
}

export default FilterSection;
