import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaPlusCircle, FaTrashAlt, FaUpload } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminProductPunching = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [mainImages, setMainImages] = useState([]);
    const [category, setCategory] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState([]);

    const handleMainImageUpload = (event) => {
        const files = event.target.files;
        setMainImages(Array.from(files)); // Store actual image files
    };

    const handleAdditionalImageUpload = (event, index) => {
        const files = event.target.files;
        setAdditionalInfo(prevInfo =>
            prevInfo.map((info, i) =>
                i === index ? { ...info, images: Array.from(files) } : info
            )
        );
    };

    const removeMainImage = (index) => {
        setMainImages(prevImages => prevImages.filter((_, idx) => idx !== index));
    };

    const removeAdditionalImage = (infoIndex, imageIndex) => {
        setAdditionalInfo(prevInfo =>
            prevInfo.map((info, i) =>
                i === infoIndex
                    ? { ...info, images: info.images.filter((_, idx) => idx !== imageIndex) }
                    : info
            )
        );
    };

    const handleAddAdditionalInfo = () => {
        setAdditionalInfo([...additionalInfo, { description: '', images: [] }]);
    };

    const handleRemoveAdditionalInfo = (index) => {
        setAdditionalInfo(additionalInfo.filter((_, i) => i !== index));
    };

    const handleDescriptionChange = (e, index) => {
        const value = e.target.value;
        setAdditionalInfo(prevInfo =>
            prevInfo.map((info, i) =>
                i === index ? { ...info, description: value } : info
            )
        );
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('category', category);
        formData.append('stock', data.stock);
    
        mainImages.forEach(image => {
            formData.append('mainImages', image);
        });
    
        additionalInfo.forEach((info, index) => {
            formData.append(`additionalInfo[${index}][description]`, info.description);
            info.images.forEach(image => {
                formData.append(`additionalInfo[${index}][images]`, image);
            });
        });
    
        try {
            await axios.post('/api/products/addProduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                toast.success(response?.data?.message);
                reset();
                setMainImages([]);
                setCategory('');
                setAdditionalInfo([]);
            }).catch((error) => {
                toast.error(error?.response?.data?.message);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.2 }} // Adjust duration if needed
            className="p-8 bg-gray-900 min-h-40"
        >
            <div className="max-w-6xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8 mb-0">
                <h1 className="text-3xl text-center text-white font-bold mb-6">Add New Product</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                        {/* Left Side: Title, Description, Stock */}
                        <div className="space-y-4">
                            {/* Product Title */}
                            <div>
                                <label className="block text-gray-300 font-semibold">Product Title</label>
                                <input
                                    type="text"
                                    {...register('title', { required: 'Product title is required' })}
                                    className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : ''
                                        }`}
                                    placeholder="Enter product title"
                                />
                                {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                            </div>

                            {/* Product Description */}
                            <div>
                                <label className="block text-gray-300 font-semibold">Product Description</label>
                                <textarea
                                    {...register('description', { required: 'Description is required' })}
                                    className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : ''
                                        }`}
                                    rows="5"
                                    placeholder="Enter product description"
                                ></textarea>
                                {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                            </div>
                        </div>

                        {/* Right Side: Price, Category, Image Upload */}
                        <div className="space-y-4">
                            {/* Price */}
                            <div>
                                <label className="block text-gray-300 font-semibold">Price ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register('price', { required: 'Price is required' })}
                                    className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? 'border-red-500' : ''
                                        }`}
                                    placeholder="Enter price"
                                />
                                {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                            </div>

                            {/* Categories Dropdown */}
                            <div>
                                <label className="block text-gray-300 font-semibold">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select a category</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="clothing">Clothing</option>
                                    <option value="furniture">Furniture</option>
                                </select>
                            </div>

                            {/* Stock Amount */}
                            <div>
                                <label className="block text-gray-300 font-semibold">Stock Amount</label>
                                <input
                                    type="number"
                                    {...register('stock', { required: 'Stock amount is required' })}
                                    className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.stock ? 'border-red-500' : ''
                                        }`}
                                    placeholder="Enter stock amount"
                                />
                                {errors.stock && <span className="text-red-500 text-sm">{errors.stock.message}</span>}
                            </div>

                            {/* Main Image Upload */}
                            <div>
                                <label className="block text-gray-300 font-semibold mb-2">Product Images</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleMainImageUpload}
                                    className="hidden"
                                    id="upload-main-images"
                                />
                                <label
                                    htmlFor="upload-main-images"
                                    className="cursor-pointer flex items-center justify-center border border-dashed border-blue-500 rounded-lg py-4 bg-gray-700 hover:bg-gray-600 text-white transition"
                                >
                                    <FaUpload className="mr-2" /> Upload Main Images
                                </label>
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    {mainImages.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img src={URL.createObjectURL(image)} alt="preview" className="rounded-lg h-32 w-full object-cover" />
                                            <button
                                                onClick={() => removeMainImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 p-1 rounded-full text-white hover:bg-red-700"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information Section */}
                    <div>
                        <h2 className="text-lg text-gray-300 font-semibold mb-4">Additional Information</h2>
                        {additionalInfo.map((info, index) => (
                            <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-700">
                                <button onClick={() => handleRemoveAdditionalInfo(index)} className="ml-2 text-red-500 hover:text-red-700">
                                    {/* <FaTrashAlt />  */}
                                    Remove Info
                                </button>
                                <div className="mt-4 flex justify-between items-center mb-2">
                                    <textarea
                                        value={info.description}
                                        onChange={(e) => handleDescriptionChange(e, index)}
                                        placeholder="Enter additional description"
                                        className="flex-1 px-4 py-2 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 font-semibold mb-2">Additional Images</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => handleAdditionalImageUpload(e, index)}
                                        className="hidden"
                                        id={`upload-additional-images-${index}`}
                                    />
                                    <label
                                        htmlFor={`upload-additional-images-${index}`}
                                        className="cursor-pointer flex items-center justify-center border border-dashed border-blue-500 rounded-lg py-4 bg-gray-600 hover:bg-gray-500 text-white transition"
                                    >
                                        <FaUpload className="mr-2" /> Upload Additional Images
                                    </label>
                                    <div className="grid grid-cols-3 gap-4 mt-4">
                                        {info.images.map((image, imgIndex) => (
                                            <div key={imgIndex} className="relative">
                                                <img src={URL.createObjectURL(image)} alt="preview" className="rounded-lg h-32 w-full object-cover" />
                                                <button
                                                    onClick={() => removeAdditionalImage(index, imgIndex)}
                                                    className="absolute top-1 right-1 bg-red-500 p-1 rounded-full text-white hover:bg-red-700"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddAdditionalInfo}
                            className="mt-4 flex items-center justify-center p-2 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                        >
                            <FaPlusCircle className="mr-2" /> Add Additional Information
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default AdminProductPunching;
