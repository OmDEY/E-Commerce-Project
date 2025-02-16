const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
    variantName: { type: String, required: true },
    variantValue: { type: String, required: true }
});

const AdditionalInfoSchema = new mongoose.Schema({
    description: { type: String, required: true },
    images: [{ type: String }] // Array of image URLs
});

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    brand: { type: String, required: true },
    colors: [{ type: String }],
    categoryDetails: { type: mongoose.Schema.Types.Mixed }, // Dynamic object for category-specific details
    variants: [VariantSchema],
    mainImages: [{ type: String }], // Array of image URLs
    additionalInfo: [AdditionalInfoSchema]
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
