import React, { useState } from 'react';

// Dummy data for products
const productData = {
    'All': [
        { id: 1, name: 'Chocolate Cake', description: 'Delicious chocolate cake.', image: 'https://www.labonelfinebaking.shop/wp-content/uploads/2021/02/CLASSIC-CHOCOLATE-CAKE.jpg', category: 'Cakes', rating: 4.5, brand: 'Sweet Treats', price: '$10' },
        { id: 2, name: 'Vanilla Milk', description: 'Fresh vanilla milk.', image: 'https://via.placeholder.com/150', category: 'Dairies', rating: 4.0, brand: 'Dairy Farm', price: '$5' },
        { id: 3, name: 'Strawberry Milk', description: 'Fresh strawberry milk.', image: 'https://via.placeholder.com/150', category: 'Dairies', rating: 4.0, brand: 'Dairy Farm', price: '$5' },
        // Add more products as needed
    ],
    'Milk & Dairies': [
        { id: 1, name: 'Vanilla Milk', description: 'Fresh vanilla milk.', image: 'https://via.placeholder.com/150', category: 'Dairies', rating: 4.0, brand: 'Dairy Farm', price: '$5' },
        { id: 2, name: 'Strawberry Milk', description: 'Fresh strawberry milk.', image: 'https://via.placeholder.com/150', category: 'Dairies', rating: 4.0, brand: 'Dairy Farm', price: '$5' },
        // Add more products as needed
    ],
    'Coffee & Tea': [
        { id: 1, name: 'Espresso', description: 'Strong and aromatic espresso.', image: 'https://via.placeholder.com/150', category: 'Coffee', rating: 4.7, brand: 'Coffee House', price: '$7' },
        { id: 2, name: 'Green Tea', description: 'Fresh green tea.', image: 'https://via.placeholder.com/150', category: 'Tea', rating: 4.6, brand: 'Tea Garden', price: '$6' },
        // Add more products as needed
    ],
    'Pet Foods': [
        { id: 1, name: 'Dog Food', description: 'Nutritious dog food.', image: 'https://via.placeholder.com/150', category: 'Pet Food', rating: 4.3, brand: 'Pet Care', price: '$12' },
        { id: 3, name: 'Cat Food', description: 'Delicious cat food.', image: 'https://via.placeholder.com/150', category: 'Pet Food', rating: 4.3, brand: 'Pet Care', price: '$12' },
        // Add more products as needed
    ],
    'Meats': [
        { id: 1, name: 'Chicken Breast', description: 'Lean and tender chicken breast.', image: 'https://via.placeholder.com/150', category: 'Meat', rating: 4.6, brand: 'Meat Mart', price: '$15' },
        { id: 2, name: 'Beef Steak', description: 'Juicy and flavorful beef steak.', image: 'https://via.placeholder.com/150', category: 'Meat', rating: 4.6, brand: 'Meat Mart', price: '$15' },
        // Add more products as needed
    ],
    'Vegetables': [
        { id: 1, name: 'Broccoli', description: 'Fresh green broccoli.', image: 'https://via.placeholder.com/150', category: 'Vegetable', rating: 4.8, brand: 'Green Farms', price: '$3' },
        { id: 2, name: 'Carrot', description: 'Fresh green carrot.', image: 'https://via.placeholder.com/150', category: 'Vegetable', rating: 4.8, brand: 'Green Farms', price: '$3' },
        // Add more products as needed
    ],
    'Fruits': [
        { id: 1, name: 'Apple', description: 'Juicy and crisp apple.', image: 'https://via.placeholder.com/150', category: 'Fruit', rating: 4.9, brand: 'Fruit Stand', price: '$2' },
        { id: 2, name: 'Banana', description: 'Fresh green banana.', image: 'https://via.placeholder.com/150', category: 'Fruit', rating: 4.9, brand: 'Fruit Stand', price: '$2' },
        // Add more products as needed
    ]
};

const PopularProduct = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    // Function to handle tab click
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    return (
        <div className="container mx-auto my-12">
            {/* Title and Horizontal Tabs in one line */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-left text-3xl mr-12 font-semibold">Popular Products</h2>

                {/* Horizontal Tabs */}
                <div className="flex mt-3 space-x-8">
                    {Object.keys(productData).map((category) => (
                        <span
                            key={category}
                            className={`cursor-pointer text-sm transition-colors duration-300 ${
                                activeCategory === category ? 'text-blue-500 font-semibold' : 'text-gray-600 hover:text-blue-500'
                            }`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </span>
                    ))}
                </div>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8">
                {productData[activeCategory].map((product) => (
                    <div key={product.id} className="relative bg-white p-4 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                        <div className="relative">
                            <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-lg" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                                <div className="flex space-x-2">
                                    <button className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800">
                                        <i className="fas fa-heart"></i>
                                    </button>
                                    <button className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800">
                                        <i className="fas fa-random"></i>
                                    </button>
                                    <button className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800">
                                        <i className="fas fa-eye"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs text-gray-500">{product.category}</p>
                            <h3 className="text-lg font-bold mt-1">{product.name}</h3>
                            <p className="text-sm text-gray-700 mt-2">{product.description}</p>
                            <div className="flex items-center mt-2">
                                <span className="text-yellow-500">
                                    {'★'.repeat(Math.round(product.rating))}
                                    {'☆'.repeat(5 - Math.round(product.rating))}
                                </span>
                                <span className="ml-2 text-gray-500">({product.rating})</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{product.brand}</p>
                            <p className="text-lg font-semibold mt-2">{product.price}</p>
                            <div className="mt-4 flex space-x-2">
                                <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">
                                    Add to Cart
                                </button>
                                <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularProduct;
