"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faXmark, faGrip, faList, faChevronDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Category } from "@/features/Categories/Types/Categories.types";
import { Brand } from "@/features/Brands/Types/brands.types";
import { getProducts } from "@/features/Products/Server/Products.action";
import ProductCard from "@/features/Products/Components/ProductCard";
import { useSearchParams } from "next/navigation";
;

    interface SearchPageProps {
    categories: Category[];
    brands: Brand[]
}

export default function SearchPage({categories, brands}:SearchPageProps) {
    const [categoriesOpen, setCategoriesOpen] = useState(true);
    const [brandsOpen, setBrandsOpen] = useState(true);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(10000);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState<string | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [view, setView] = useState<"grid" | "list">("grid");

    const searchParams = useSearchParams()
    const queryFromNavbar = searchParams.get('query')

    useEffect(() => {
    if (queryFromNavbar) {
        setSearchTerm(queryFromNavbar);
        }
    }, [queryFromNavbar]);

    useEffect(()=>{
        const brandFromQuery = searchParams.get('brand')
        if(brandFromQuery) {
            setSelectedCategories([])
            setSelectedBrands([brandFromQuery])
            setMinPrice(0)
            setMaxPrice(10000)
            setSearchTerm('')
        }
    }, [searchParams])
    useEffect(()=>{
        const CategoryFromQuery = searchParams.get('category')
        if(CategoryFromQuery) {
            setSelectedCategories([CategoryFromQuery])
            setSelectedBrands([])
            setMinPrice(0)
            setMaxPrice(10000)
            setSearchTerm('')
        }
    }, [searchParams])

    useEffect(() => {
    const fetchAllProducts = async () => {
        try {
        const data = await getProducts();
        setFilteredProducts(data.data);
        } catch (error) {
        console.error(error);
        }
    };

    fetchAllProducts();
    }, []);

    const clearAllFilters = async () => {
    try {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setMinPrice(0);
        setMaxPrice(10000);
        setSearchTerm("");

        const data = await getProducts();
        setFilteredProducts(data.data);
    } catch (error) {
        console.error(error);
    }
    };

    const activeFilters = [
    ...selectedBrands.map(id => ({
        type: "brand",
        id,
        label: brands.find(b => b._id === id)?.name
    })),
    ...selectedCategories.map(id => ({
        type: "category",
        id,
        label: categories.find(c => c._id === id)?.name
    })),
    ...(minPrice !== 0 || maxPrice !== 10000
        ? [{
            type: "price",
            id: "price",
            label: `${minPrice} - ${maxPrice} EGP`
        }]
        : []),
        ...(searchTerm.trim() !== "" 
        ? [{
            type: "search",
            id: "search",
            label: searchTerm
        }] 
        : []
    )
    ];

    const removeFilter = async (filter: any) => {
    let updatedBrands = selectedBrands;
    let updatedCategories = selectedCategories;
    let updatedMinPrice = minPrice;
    let updatedMaxPrice = maxPrice;

    if (filter.type === "brand") {
        updatedBrands = selectedBrands.filter(id => id !== filter.id);
        setSelectedBrands(updatedBrands);
    }

    if (filter.type === "category") {
        updatedCategories = selectedCategories.filter(id => id !== filter.id);
        setSelectedCategories(updatedCategories);
    }

    if (filter.type === "price") {
        updatedMinPrice = 0;
        updatedMaxPrice = 10000;
        setMinPrice(0);
        setMaxPrice(10000);
    }
    if (filter.type === "search") {
        setSearchTerm("");
    }

    try {
        const data = await getProducts({
        category: updatedCategories,
        brand: updatedBrands,
        minPrice: updatedMinPrice === 0 ? undefined : updatedMinPrice,
        maxPrice: updatedMaxPrice === 10000 ? undefined : updatedMaxPrice,
        });

        setFilteredProducts(data.data);
    } catch (error) {
        console.error(error);
    }
};

    const applyFilters = async () => {
    try {
        const data = await getProducts({
        category: selectedCategories,
        brand: selectedBrands,
        minPrice: minPrice === 0 ? undefined : minPrice,
        maxPrice: maxPrice === 10000 ? undefined : maxPrice,
        sort: sortOption
        });

        setFilteredProducts(data.data);
    } catch (error) {
        console.error(error);
    }
    };
    useEffect(() => {
    applyFilters();
    }, [selectedBrands, selectedCategories, minPrice, maxPrice, sortOption]);

    const displayedProducts = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

return (
        <div className="min-h-screen bg-gray-50">
        {/* 🔎 Top Search Bar */}
        <div className="bg-white border-b">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
            <div className="relative">
                <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products..."
                className="w-full h-14 rounded-xl border border-gray-200 pl-5 pr-12 text-sm focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
                />
            </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-60 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 h-fit">
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Filters</h2>
                <FontAwesomeIcon icon={faSliders} className="text-gray-400" />
            </div>

            {/* Categories */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => setCategoriesOpen(!categoriesOpen)}>
                    <h3 className="text-sm font-medium text-gray-700">Categories</h3>
                    <FontAwesomeIcon 
                        icon={faChevronDown} 
                        className={`transition-transform duration-200 text-sm text-gray-600 ${categoriesOpen ? 'rotate-180' : 'rotate-0'}`} 
                    />
                </div>

                {categoriesOpen && (
                    <div>
                        {categories.map((cat) => (
                            <label
                                key={cat._id}
                                className="flex items-center gap-2 mb-2 text-sm text-gray-600 cursor-pointer"
                            >
                                <input
                                type="checkbox"
                                className="accent-gray-300"
                                checked={selectedCategories.includes(cat._id)}
                                onChange={() => {
                                    setSelectedCategories(prev =>
                                    prev.includes(cat._id)
                                        ? prev.filter(id => id !== cat._id)
                                        : [...prev, cat._id]
                                    );
                                }}
                                />
                                {cat.name}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Brands */}
            <div className="mb-6">
            <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => setBrandsOpen(!brandsOpen)}>
                <h3 className="text-sm font-medium text-gray-700">Brands</h3>
                <FontAwesomeIcon icon={faChevronDown} className={`text-sm text-gray-600 transition-transform duration-200 ${brandsOpen ? 'rotate-180' : 'rotate-0'}`} />
            </div>

            {brandsOpen && (
                <div>
                {brands.map(brand => (
                    <label key={brand._id} className="flex items-center gap-2 mb-2 text-sm text-gray-600 cursor-pointer">
                    <input
                    type="checkbox"
                    className="accent-gray-300"
                    checked={selectedBrands.includes(brand._id)}
                    onChange={() => {
                        setSelectedBrands(prev =>
                        prev.includes(brand._id)
                            ? prev.filter(id => id !== brand._id)
                            : [...prev, brand._id]
                        );
                    }}
                    />
                    {brand.name}
                    </label>
                ))}
                </div>
            )}
            </div>

            {/* Price */}
            <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-5 tracking-wide">
                Price Range
            </h3>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-5">

                {/* Min / Max Row */}
                <div className="flex items-center gap-2">

                {/* Min */}
                <div className="flex-1 w-full">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Min Price
                    </label>
                    <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    </span>
                    <input
                        type="number"
                        placeholder="0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : 0)}
                        className="w-full pl-6 pr-4 py-3 text-xs bg-white border border-gray-300 
                                rounded-full shadow-sm focus:ring-2 focus:ring-green-400 
                                focus:border-green-400 outline-none transition-all duration-200 hover:shadow-md"
                    />
                    </div>
                </div>

                {/* Divider */}
                <div className="w-1 bg-gray-300 rounded-full h-10 flex-shrink-0"></div>

                {/* Max */}
                <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Max Price
                    </label>
                    <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    </span>
                    <input
                        type="number"
                        placeholder="10000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : 10000)}
                        className="w-full pl-3 pr-4 py-3 text-xs bg-white border border-gray-300 
                                rounded-full shadow-sm focus:ring-2 focus:ring-green-400 
                                focus:border-green-400 outline-none transition-all duration-200 hover:shadow-md"
                    />
                    </div>
                </div>

                </div>

                {/* Soft Separator */}
                <div className="border-t border-dashed border-gray-200"></div>

                {/* Apply Button */}
                <button
                onClick={applyFilters}
                className="w-full py-3 rounded-xl text-sm font-semibold 
                bg-green-500 text-white 
                hover:bg-green-600 active:scale-[0.98] 
                transition-all duration-200 shadow-sm hover:shadow-md"
                >
                Apply Filter
                </button>

            </div>
            </div>
            {/* Clear All */}
            <button
            onClick={clearAllFilters}
            className="w-full py-2 text-sm font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition">
                Clear All Filters
            </button>
            </aside>

            {/* 🛍 Products Section */}
            <div className="flex-1">

            {/* Active Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-sm font-medium text-gray-600">Active:</span>

                {activeFilters.map((filter, index) => (
                <div
                    key={index}
                    className="flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium"
                >
                    {filter.label}
                    <button onClick={() => removeFilter(filter)}>
                    <FontAwesomeIcon icon={faXmark} className="text-xs" />
                    </button>
                </div>
                ))}

                <button onClick={clearAllFilters} className="text-xs text-gray-500 hover:text-red-500 underline ml-2">
                Clear All
                </button>
            </div>

            {/* Sort + View */}
            <div className="flex items-center justify-between mb-6">
                <div className="relative w-64 flex items-center">
            <label className=" text-sm font-semibold text-gray-500 mb-2 tracking-wide ">
                Sort By:
            </label>

            <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value || undefined)}
                className="
                w-full appearance-none
                bg-white/80 backdrop-blur-md
                border border-gray-200
                rounded-2xl
                px-5 py-3 pr-10
                text-sm font-medium text-gray-700
                shadow-sm hover:shadow-md
                focus:ring-2 focus:ring-green-500 focus:border-green-500
                transition-all duration-200
                cursor-pointer focus:outline-0"
            >
                <option value="">Default</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="-ratingsAverage">Highest Rated</option>
            </select>

            {/* Custom Arrow */}
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xs" />
            </div>
        </div>

                <div className="hidden sm:flex gap-3">
                <button
                    onClick={() => setView("grid")}
                    className={`p-2 rounded-lg border ${
                    view === "grid"
                        ? "bg-green-500 text-white"
                        : "bg-white text-gray-500"
                    }`}
                >
                    <FontAwesomeIcon icon={faGrip} />
                </button>
                <button
                    onClick={() => setView("list")}
                    className={`p-2 rounded-lg border ${
                    view === "list"
                        ? "bg-green-500 text-white"
                        : "bg-white text-gray-500"
                    }`}
                >
                    <FontAwesomeIcon icon={faList} />
                </button>
                </div>
            </div>

            {/* Products Grid */}
            <div
                className={`grid gap-4 sm:gap-6  ${
                view === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
            >
                {displayedProducts.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-5 ">
                    <div className="flex flex-col items-center text-center space-y-6 animate-fadeIn">
                    
                    {/* Icon */}
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="text-7xl text-gray-300 animate-pulse"
                    />

                    {/* Heading */}
                    <h2 className="text-3xl font-bold text-gray-800">
                        Oops! Nothing Here
                    </h2>

                    {/* Subtext */}
                    <p className="text-gray-500 max-w-xs">
                        We couldn't find any products matching your search or filters.
                        Try adjusting your criteria.
                    </p>

                    {/* Reset Filters Button */}
                    <button
                        onClick={clearAllFilters}
                        className="bg-white border border-gray-200 text-gray-700 hover:bg-green-50 hover:text-green-600 font-semibold px-6 py-2 rounded-full shadow transition-all duration-200 hover:shadow-lg active:scale-95"
                    >
                        Reset Filters
                    </button>

                    </div>
                </div>
                ) : (
                displayedProducts.map((product) => (
                    <ProductCard key={product._id} info={product} />
                ))
                )}
            </div>
            </div>
        </div>
        </div>
    );
}