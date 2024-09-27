import React, { useState } from 'react';
import { Range } from 'react-range';
import BigCard from '../../Components/Main/Common/BigCard';

// Dummy product data
const products = [
    { id: 1, name: 'Product 1', image: 'https://via.placeholder.com/400x300', rating: 4.5, description: 'Product 1 description.', branch: 'Brand A', price: 100 },
    { id: 2, name: 'Product 2', image: 'https://via.placeholder.com/400x300', rating: 4.7, description: 'Product 2 description.', branch: 'Brand B', price: 150 },
    { id: 3, name: 'Product 3', image: 'https://via.placeholder.com/400x300', rating: 4.3, description: 'Product 3 description.', branch: 'Brand C', price: 200 },
    { id: 4, name: 'Product 4', image: 'https://via.placeholder.com/400x300', rating: 4.8, description: 'Product 4 description.', branch: 'Brand D', price: 250 },
];

// Dummy filter data
const filters = [
    { id: 1, label: 'Category', options: ['Category 1', 'Category 2', 'Category 3'] },
    { id: 2, label: 'Brand', options: ['Brand A', 'Brand B', 'Brand C'] },
    { id: 3, label: 'Rating', options: ['4 stars & up', '3 stars & up', '2 stars & up'] },
];

const STEP = 10;
const MIN = 0;
const MAX = 200;

const ProductListingPage = () => {
    const [values, setValues] = useState([0, 150]);

    return (
        <div className="bg-gray-100 w-full">
            <div className="px-4 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Filters Section */}
                    <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">Filters</h2>

                        {/* Category Filter */}
                        {filters.map((filter) => (
                            <div key={filter.id} className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">{filter.label}</h3>
                                <ul>
                                    {filter.options.map((option, idx) => (
                                        <li key={idx}>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="form-checkbox" />
                                                <span>{option}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Price Range Filter */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                            <Range
                                step={STEP}
                                min={MIN}
                                max={MAX}
                                values={values}
                                onChange={(values) => setValues(values)}
                                renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        className="h-2 bg-gray-300 rounded-full"
                                        style={{
                                            ...props.style,
                                            background: `linear-gradient(to right, #4F46E5 ${100 * (values[0] / MAX)}%, #22C55E ${100 * (values[1] / MAX)}%)`,
                                        }}
                                    >
                                        {children}
                                    </div>
                                )}
                                renderThumb={({ props }) => (
                                    <div
                                        {...props}
                                        className="h-4 w-4 bg-blue-500 rounded-full"
                                    />
                                )}
                            />
                            <div className="mt-2 flex justify-between text-sm text-gray-700">
                                <span>${values[0]}</span>
                                <span>${values[1]}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Product Listing Section */}
                    <div className="col-span-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                                        <p className="text-sm text-gray-700 mb-2">{product.description}</p>
                                        <p className="text-xs text-gray-500 mb-2">{product.branch}</p>
                                        <div className="flex items-center mb-4">
                                            <span className="text-yellow-500">
                                                {'★'.repeat(Math.round(product.rating))}
                                                {'☆'.repeat(5 - Math.round(product.rating))}
                                            </span>
                                            <span className="ml-2 text-gray-500">({product.rating})</span>
                                        </div>
                                        <span className="ml-2 text-gray-500">${product.price}</span>
                                        <div className="mt-4 flex justify-between">
                                            <button className="bg-green-500 w-full text-white py-2 px-2 rounded-md hover:bg-green-600 transition-transform transform hover:scale-105">
                                                Add to Cart
                                            </button>
                                            {/* <button className="bg-green-500 text-white py-2 px-2 rounded-md hover:bg-green-600 transition-transform transform hover:scale-105">
                                                Buy Now
                                            </button> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <BigCard />
        </div>
    );
};

export default ProductListingPage;
