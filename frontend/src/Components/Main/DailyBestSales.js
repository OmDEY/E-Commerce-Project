import React, { useState } from 'react';

// Dummy data for products
const productData = {
    featured: [
        { id: 1, name: 'Product 1', image: 'https://via.placeholder.com/300', price: '$99.99' },
        { id: 2, name: 'Product 2', image: 'https://via.placeholder.com/300', price: '$199.99' },
        { id: 3, name: 'Product 3', image: 'https://via.placeholder.com/300', price: '$299.99' },
    ],
    popular: [
        { id: 4, name: 'Product 4', image: 'https://via.placeholder.com/300', price: '$149.99' },
        { id: 5, name: 'Product 5', image: 'https://via.placeholder.com/300', price: '$249.99' },
        { id: 6, name: 'Product 6', image: 'https://via.placeholder.com/300', price: '$349.99' },
    ],
    newlyAdded: [
        { id: 7, name: 'Product 7', image: 'https://via.placeholder.com/300', price: '$129.99' },
        { id: 8, name: 'Product 8', image: 'https://via.placeholder.com/300', price: '$229.99' },
        { id: 9, name: 'Product 9', image: 'https://via.placeholder.com/300', price: '$329.99' },
    ]
};

const DailyBestSales = () => {
    const [activeCategory, setActiveCategory] = useState('featured'); // Initialize to a valid category

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    return (
        <div className="container mx-auto my-12">
            {/* Title and Horizontal Tabs */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-semibold">Daily Best Sales</h2>

                {/* Horizontal Tabs */}
                <div className="flex space-x-8">
                    {Object.keys(productData).map((category) => (
                        <span
                            key={category}
                            className={`cursor-pointer text-sm transition-colors duration-300 ${activeCategory === category ? 'text-blue-500 font-semibold' : 'text-gray-600 hover:text-blue-500'}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </span>
                    ))}
                </div>
            </div>

            {/* Banner Card */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 mb-8">
                <div className="relative h-80 col-span-2 lg:col-span-1 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                    {/* Background Image */}
                    <img src="https://via.placeholder.com/300" alt="banner" className="absolute inset-0 w-full h-full object-cover" />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex flex-col justify-center items-start p-6 text-white">
                        <h2 className="text-3xl font-bold mb-4">Daily Best Sales</h2>
                        <p className="text-base mb-6">Discover our best daily deals and save big on your favorite products!</p>
                        <button className="bg-yellow-500 text-white py-2 px-6 rounded-full transition-transform transform hover:scale-110">Shop Now</button>
                    </div>
                </div>

                {/* Product Cards */}
                {productData[activeCategory]?.map((product) => (
                    <div key={product.id} className="relative bg-white p-4 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                        {/* Product Image */}
                        <div className="relative">
                            <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-lg" />
                            {/* Hover Buttons */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                                <div className="flex space-x-2">
                                    <button className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"><i className="fas fa-heart"></i></button>
                                    <button className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"><i className="fas fa-random"></i></button>
                                    <button className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"><i className="fas fa-eye"></i></button>
                                </div>
                            </div>
                        </div>
                        {/* Product Details */}
                        <div className="mt-4">
                            <h3 className="text-lg font-bold">{product.name}</h3>
                            <p className="text-sm text-gray-700 mt-2">{product.price}</p>
                            <div className="mt-4 flex space-x-2">
                                <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">Add to Cart</button>
                                <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600">Buy Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyBestSales;
