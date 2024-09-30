import React from 'react';

// Dummy data for categories and products
const categoriesData = [
    {
        category: 'Electronics',
        products: [
            { id: 1, name: 'Smartphone', image: 'https://via.placeholder.com/150x150', rating: 4.5, price: '$499' },
            { id: 2, name: 'Laptop', image: 'https://via.placeholder.com/150x150', rating: 4.7, price: '$999' },
        ],
    },
    {
        category: 'Fashion',
        products: [
            { id: 3, name: 'Jacket', image: 'https://via.placeholder.com/150x150', rating: 4.3, price: '$79' },
            { id: 4, name: 'Sneakers', image: 'https://via.placeholder.com/150x150', rating: 4.6, price: '$129' },
        ],
    },
    {
        category: 'Home Appliances',
        products: [
            { id: 5, name: 'Blender', image: 'https://via.placeholder.com/150x150', rating: 4.2, price: '$89' },
            { id: 6, name: 'Vacuum Cleaner', image: 'https://via.placeholder.com/150x150', rating: 4.5, price: '$199' },
        ],
    },
    {
        category: 'Books',
        products: [
            { id: 7, name: 'Novel', image: 'https://via.placeholder.com/150x150', rating: 4.8, price: '$14' },
            { id: 8, name: 'Cookbook', image: 'https://via.placeholder.com/150x150', rating: 4.4, price: '$22' },
        ],
    },
];

const CategoryProducts = () => {
    return (
        <div className="my-12 px-4 lg:px-8 mt-48">
            {/* <h2 className="text-3xl font-semibold mb-8 text-center">Products by Category</h2> */}
            <div className="flex overflow-x-auto space-x-6">
                {categoriesData.map((category) => (
                    <div key={category.category} className="flex-shrink-0 w-80">
                        <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                        <div className="space-y-6">
                            {category.products.map((product) => (
                                <div key={product.id} className="flex items-center bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                                    {/* Product Image */}
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    {/* Product Details */}
                                    <div className="ml-4 flex-1">
                                        <h4 className="text-lg font-bold mb-1">{product.name}</h4>
                                        <div className="flex items-center mb-1">
                                            <span className="text-yellow-500">
                                                {'★'.repeat(Math.round(product.rating))}
                                                {'☆'.repeat(5 - Math.round(product.rating))}
                                            </span>
                                            <span className="ml-2 text-gray-500">({product.rating})</span>
                                        </div>
                                        <p className="text-lg font-semibold">{product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryProducts;
