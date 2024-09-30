// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    images: {
        type: [String], // Array of image URLs
        default: [],
    },
    rating: {
        type: Number,
        default: 0,
    },
    brand: {
        type: String,
        // required: true,
    },
    colors: {
        type: [String],
        default: [],
    },
    variants: [
        {
            variantName: {
                type: String,
                default: '',
                // required: true,
            },
            variantValue: {
                type: String,
                default: '',
                // required: true,
            },
        }
    ],
    additionalInfo: [
        {
            description: {
                type: String,
                default: '',
                // required: true,
            },
            images: {
                type: [String], // Array of additional image URLs
                default: [],
            },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
