import React, { useState, useContext, useEffect } from 'react';
import { FaHeadphones, FaUser, FaHeart, FaSyncAlt, FaShoppingCart, FaSearch, FaBars, FaMapMarkerAlt } from 'react-icons/fa';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../../Context/ContextProvider';
import axios from 'axios';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const { setSearchResults } = useContext(SearchContext);

    // useEffect(() => {
    //     if (searchTerm) {
    //         axios.get(`http://localhost:4000/api/products/fetchProductsFiltered?searchTerm=${searchTerm}`)
    //             .then(response => {
    //                 setSearchResults(response.data);
    //                 // Update the state with the fetched products
    //             })
    //             .catch(error => {
    //                 setSearchResults([]);
    //                 console.error(error);
    //             });
    //     }
    // }, [searchTerm]);

    const navigate = useNavigate(); // Initialize navigate

    // Toggle the dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleProductSearch = () => {
        if (searchTerm) {
            axios.get(`http://localhost:4000/api/products/fetchProductsFiltered?searchTerm=${searchTerm}`)
                .then(response => {
                    setSearchResults(response.data);
                    // Update the state with the fetched products
                    if (window.location.pathname !== '/products') {
                        navigate(`/products`);
                    }
                })
                .catch(error => {
                    setSearchResults([]);
                    console.error(error);
                });
        }
    }

    return (
        <div>
            {/* First section */}
            <div className="navbar relative text-white p-2 h-7 overflow-hidden">
                <div className="container mx-auto flex justify-between items-center relative z-10">
                    <div className="flex space-x-4">
                        <span className='text-sm cursor-pointer hover:underline'>About Us</span>
                        <span className='text-sm'>|</span>
                        <span className='text-sm cursor-pointer hover:underline'>My Account</span>
                        <span className='text-sm'>|</span>
                        <span className='text-sm cursor-pointer hover:underline'>Wishlist</span>
                        <span className='text-sm'>|</span>
                        <span className='text-sm cursor-pointer hover:underline'>Order Tracking</span>
                    </div>
                    <span className='text-sm'>100% Genuine Products & Secure Delivery</span>
                    <div className="flex space-x-4">
                        <span className='text-sm cursor-pointer hover:underline'>Need Help? Call us</span>
                        <span className='text-sm'>|</span>
                        <span className='text-sm cursor-pointer hover:underline'>Language</span>
                        <span className='text-sm'>|</span>
                        <span className='text-sm cursor-pointer hover:underline'>Currency</span>
                    </div>
                </div>
            </div>

            {/* Second section */}
            <div className="bg-white shadow p-4">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-3xl font-bold text-gray-800">ShopEase</div>

                    {/* Search bar */}
                    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out w-full md:w-1/2 lg:w-1/3">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-600"
                            placeholder="Search products"
                        />
                        <button onClick={handleProductSearch} className="flex items-center justify-center bg-pink-500 text-white p-3 transition-all duration-300 hover:bg-pink-600 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-600">
                            <FaSearch className="text-xl" />
                        </button>
                    </div>

                    {/* Icons */}
                    <div className="flex space-x-3 text-gray-600">
                        <span className="flex items-center">
                            <FaMapMarkerAlt className="mr-1 text-xl text-blue-600" />
                            <span className='text-sm cursor-pointer hover:underline'>Your Location</span>
                        </span>
                        <FaSyncAlt className="cursor-pointer text-xl hover:text-pink-600 transition-colors duration-300" />
                        <span className='text-sm cursor-pointer hover:underline'>Compare</span>
                        <FaHeart className="cursor-pointer text-xl hover:text-pink-600 transition-colors duration-300" />
                        <span className='text-sm cursor-pointer hover:underline'>Wishlist</span>
                        <FaUser className="cursor-pointer text-xl hover:text-pink-600 transition-colors duration-300" />
                        <span className='text-sm cursor-pointer hover:underline'>My Account</span>
                        <FaShoppingCart className="cursor-pointer text-xl hover:text-pink-600 transition-colors duration-300" />
                        <span className='text-sm cursor-pointer hover:underline'>Cart</span>
                    </div>
                </div>
            </div>

            {/* Third section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                <div className="container mx-auto flex justify-between items-center relative">
                    {/* Dropdowns */}
                    <div className="flex space-x-6">
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="cursor-pointer flex items-center space-x-1 text-white hover:underline"
                            >
                                <FaBars className="text-white" /> <span>All Categories</span>
                            </button>
                            {/* Dropdown content */}
                            {isDropdownOpen && (
                                <div className="absolute left-0 top-full mt-2 bg-white text-black shadow-lg transition-all duration-300 w-screen z-10">
                                    <div className="p-4 grid grid-cols-5 gap-4">
                                        <div>
                                            <span className='block py-2 hover:bg-gray-100 rounded-lg px-4'>Electronics</span>
                                            <span className='block py-2 hover:bg-gray-100 rounded-lg px-4'>Fashion</span>
                                            <span className='block py-2 hover:bg-gray-100 rounded-lg px-4'>Home & Kitchen</span>
                                        </div>
                                        <div>
                                            <span className='block py-2 hover:bg-gray-100 rounded-lg px-4'>Beauty & Health</span>
                                            <span className='block py-2 hover:bg-gray-100 rounded-lg px-4'>Sports</span>
                                            <span className='block py-2 hover:bg-gray-100 rounded-lg px-4'>Toys & Games</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='flex space-x-10'>
                            <span className="cursor-pointer hover:underline">Deals</span>
                            <span className="cursor-pointer hover:underline">Home</span>
                            <span className="cursor-pointer hover:underline">About</span>
                            <span className="cursor-pointer hover:underline">Shop</span>
                            <span className="cursor-pointer hover:underline">Vendors</span>
                            <span className="cursor-pointer hover:underline">Mega Menu</span>
                            <span className="cursor-pointer hover:underline">Blog</span>
                            <span className="cursor-pointer hover:underline">Pages</span>
                            <span className="cursor-pointer hover:underline">Contact</span>
                        </div>
                    </div>

                    {/* Support Center */}
                    <div className="flex items-center space-x-2">
                        <FaHeadphones className='text-3xl text-white' />
                        <div className="flex flex-col">
                            <span className='font-semibold text-white text-sm'>24/7 Support Center</span>
                            <span className="text-white font-bold text-sm">+123-456-789</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
