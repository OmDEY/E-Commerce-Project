import React, { useState } from 'react';

// Dummy data for categories
const categoryData = {
    'Cake & Milk': [
            { id: 1, name: 'Chocolate Cake', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj3ksu9r6e4E7p5vKm7LejNwUsqs9CIjGozQ&s' },
            { id: 2, name: 'Vanilla Milk', image: 'https://icon2.cleanpng.com/20180227/fte/avhxxgzem.webp' },
            { id: 3, name: 'Strawberry Milk', image: 'https://e7.pngegg.com/pngimages/890/493/png-clipart-milkshake-smoothie-strawberry-juice-chocolate-milk-free-buckle-material-of-strawberry-juice-free-logo-design-template-strawberries.png' },
            { id: 4, name: 'Blueberry Milk', image: 'https://via.placeholder.com/150' },
            { id: 5, name: 'Lemon Milk', image: 'https://via.placeholder.com/150' },
            { id: 6, name: 'Mango Milk', image: 'https://via.placeholder.com/150' },
            { id: 7, name: 'Pineapple Milk', image: 'https://via.placeholder.com/150' },
            { id: 8, name: 'Watermelon Milk', image: 'https://via.placeholder.com/150' },
            { id: 9, name: 'Grape Milk', image: 'https://via.placeholder.com/150' },
            { id: 10, name: 'Orange Milk', image: 'https://via.placeholder.com/150' },
            { id: 11, name: 'Lime Milk', image: 'https://via.placeholder.com/150' },
            { id: 12, name: 'Lemon Milk', image: 'https://via.placeholder.com/150' },
        // Add more products as needed
    ],
    'Coffee & Tea': [
        { id: 1, name: 'Espresso', image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Green Tea', image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Black Tea', image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Lemon Tea', image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Mango Tea', image: 'https://via.placeholder.com/150' },
        { id: 6, name: 'Pineapple Tea', image: 'https://via.placeholder.com/150' },
        { id: 7, name: 'Watermelon Tea', image: 'https://via.placeholder.com/150' },
        { id: 8, name: 'Grape Tea', image: 'https://via.placeholder.com/150' },
        { id: 9, name: 'Orange Tea', image: 'https://via.placeholder.com/150' },
        { id: 10, name: 'Lime Tea', image: 'https://via.placeholder.com/150' },
        { id: 11, name: 'Lemon Tea', image: 'https://via.placeholder.com/150' },
        // Add more products as needed
    ],
    'Pet Foods': [
        { id: 1, name: 'Dog Food', image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Cat Food', image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Bird Food', image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Fish Food', image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Rabbit Food', image: 'https://via.placeholder.com/150' },
        { id: 6, name: 'Hamster Food', image: 'https://via.placeholder.com/150' },
        { id: 7, name: 'Guinea Pig Food', image: 'https://via.placeholder.com/150' },
        { id: 8, name: 'Mouse Food', image: 'https://via.placeholder.com/150' },
        { id: 9, name: 'Rat Food', image: 'https://via.placeholder.com/150' },
        { id: 10, name: 'Snake Food', image: 'https://via.placeholder.com/150' },
        // Add more products as needed
    ],
    'Vegetables': [
        { id: 1, name: 'Broccoli', image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Carrot', image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Tomato', image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Potato', image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Onion', image: 'https://via.placeholder.com/150' },
        { id: 6, name: 'Garlic', image: 'https://via.placeholder.com/150' },
        { id: 7, name: 'Lettuce', image: 'https://via.placeholder.com/150' },
        { id: 8, name: 'Cucumber', image: 'https://via.placeholder.com/150' },
        { id: 9, name: 'Bell Pepper', image: 'https://via.placeholder.com/150' },
        { id: 10, name: 'Zucchini', image: 'https://via.placeholder.com/150' },
        // Add more products as needed
    ]
};

// Array of background colors
const cardColors = ['bg-blue-100', 'bg-yellow-100', 'bg-green-100', 'bg-pink-100', 'bg-purple-100'];

const FeaturedCategories = () => {
    const [activeCategory, setActiveCategory] = useState('Cake & Milk');
    const [startIndex, setStartIndex] = useState(0);
    const cardsPerView = 8; // Number of cards visible at a time

    // Function to handle tab click
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        setStartIndex(0); // Reset to the first card when changing category
    };

    // Handle sliding the cards
    const slideLeft = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const slideRight = () => {
        if (startIndex < categoryData[activeCategory].length - cardsPerView) {
            setStartIndex(startIndex + 1);
        }
    };

    return (
        <div className="container mx-auto my-12 lg:px-8">
            {/* Title and Horizontal Tabs in one line */}
            <div className="flex space-x-4 items-center mb-8">
                <h2 className="text-left text-3xl mr-12 font-semibold">Featured Categories</h2>

                {/* Horizontal Tabs */}
                <div className="flex mt-3 space-x-8">
                    {Object.keys(categoryData).map((category) => (
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

            {/* Product Cards with Arrows */}
            <div className="relative">
                {/* Left Arrow */}
                <button 
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 z-10"
                    onClick={slideLeft}
                    disabled={startIndex === 0}
                    style={{ marginLeft: '2rem' }} // Add margin to move the left arrow further from the cards
                >
                    &#9664;
                </button>

                {/* Product Cards */}
                <div className="flex justify-center space-x-4 overflow-hidden px-8">
                    {categoryData[activeCategory].slice(startIndex, startIndex + cardsPerView).map((product, index) => (
                        <div 
                            key={product.id} 
                            className={`relative ${cardColors[index % cardColors.length]} p-2 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 w-32 h-32 flex flex-col items-center justify-center`}
                        >
                            {/* PNG Image */}
                            <img src={product.image} alt={product.name} className="w-12 h-12 object-contain mb-2" />

                            {/* Text below the image */}
                            <h3 className="text-gray-800 font-bold text-sm">{product.name}</h3>
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button 
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 z-10"
                    onClick={slideRight}
                    disabled={startIndex >= categoryData[activeCategory].length - cardsPerView}
                    style={{ marginRight: '2rem' }} // Add margin to move the right arrow further from the cards
                >
                    &#9654;
                </button>
            </div>
        </div>
    );
};

export default FeaturedCategories;
