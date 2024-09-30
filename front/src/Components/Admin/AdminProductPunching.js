import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaPlusCircle, FaTrashAlt, FaUpload } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners'; // Add a loader, e.g., from react-spinners


const AdminProductPunching = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [mainImages, setMainImages] = useState([]);
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [colors, setColors] = useState([]);
    const [colorInput, setColorInput] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState([]);
    const [variants, setVariants] = useState([]);
    const [variantName, setVariantName] = useState('');
    const [variantValue, setVariantValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAddColor = () => {
        if (colorInput && !colors.includes(colorInput)) {
            setColors([...colors, colorInput]);
            setColorInput('');
        }
    };

    const handleRemoveColor = (index) => {
        setColors(colors.filter((_, i) => i !== index));
    };

    const handleAddVariant = () => {
        if (variantName && variantValue) {
            setVariants([...variants, { variantName, variantValue }]);
            setVariantName('');
            setVariantValue('');
        }
    };

    const handleRemoveVariant = (index) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const handleMainImageUpload = (event) => {
        const files = event.target.files;
        setMainImages(Array.from(files));
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
        setIsLoading(true);
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('category', category);
        formData.append('stock', data.stock);
        formData.append('brand', brand);
        formData.append('colors', JSON.stringify(colors));

        variants.forEach((variant, index) => {
            formData.append(`variants[${index}][variantName]`, variant.variantName);
            formData.append(`variants[${index}][variantValue]`, variant.variantValue);
        });

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
            await axios.post('http://localhost:4000/api/products/addProduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                toast.success(response?.data?.message);
                reset();
                setMainImages([]);
                setCategory('');
                setAdditionalInfo([]);
                setIsLoading(false);
            }).catch((error) => {
                setIsLoading(false);
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
            transition={{ duration: 0.2 }}
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

                            {/* Brand */}
                            <div>
                                <label className="block text-gray-300 font-semibold">Brand</label>
                                <input
                                    type="text"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter product brand"
                                />
                            </div>

                            {/* Colors */}
                            <div>
                                <label className="block text-gray-300 font-semibold">Colors</label>
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        value={colorInput}
                                        onChange={(e) => setColorInput(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter a color"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddColor}
                                        className="ml-2 bg-blue-500 text-white rounded-lg px-4 hover:bg-blue-600 transition"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="mt-2 flex flex-wrap">
                                    {colors.map((color, index) => (
                                        <span key={index} className="bg-gray-600 text-white px-3 py-1 rounded-full mr-2 flex items-center">
                                            {color}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveColor(index)}
                                                className="ml-2 text-red-500 hover:text-red-700"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </span>
                                    ))}
                                </div>
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
                                    <option value="Jwellery">Jwellery</option>
                                    {/* Add more categories as needed */}
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

                            {/* Variants */}
                            <div>
                                <label className="block text-gray-300 font-semibold">Variants</label>
                                <div className="flex space-x-2 items-center">
                                    <input
                                        type="text"
                                        value={variantName}
                                        onChange={(e) => setVariantName(e.target.value)}
                                        className="w-1/2 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Variant Name"
                                    />
                                    <input
                                        type="text"
                                        value={variantValue}
                                        onChange={(e) => setVariantValue(e.target.value)}
                                        className="w-1/2 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Variant Value"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddVariant}
                                        className="ml-2 bg-blue-500 text-white rounded-lg px-4 hover:bg-blue-600 transition"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="mt-2 flex flex-wrap">
                                    {variants.map((variant, index) => (
                                        <span key={index} className="bg-gray-600 text-white px-3 py-1 rounded-full mr-2 flex items-center">
                                            {`${variant.variantName}: ${variant.variantValue}`}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveVariant(index)}
                                                className="ml-2 text-red-500 hover:text-red-700"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </span>
                                    ))}
                                </div>
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
                                <button onClick={() => handleRemoveAdditionalInfo(index)} className="text-red-500 hover:underline mb-2">
                                    Remove Additional Info
                                </button>
                                <div>
                                    <label className="block text-gray-300 font-semibold">Description</label>
                                    <textarea
                                        value={info.description}
                                        onChange={(e) => handleDescriptionChange(e, index)}
                                        className="w-full px-4 py-2 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                        placeholder="Enter additional description"
                                    ></textarea>
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
                            onClick={handleAddAdditionalInfo}
                            type="button"
                            className="mt-4 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            <FaPlusCircle className="mr-2" /> Add Additional Info
                        </button>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full mt-6 flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ClipLoader size={20} color="#fff" loading={isLoading} />
                            ) : (
                                'Add Product'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default AdminProductPunching;
