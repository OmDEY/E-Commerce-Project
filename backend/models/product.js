const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
    variantName: { type: String, required: true },
    variantValue: { type: String, required: true },
    priceAdjustment: { type: Number, default: 0 } // Optional price adjustment for variants
});

const AdditionalInfoSchema = new mongoose.Schema({
    description: { type: String, required: true },
    images: [{ type: String }] // Array of image URLs
});

const CategorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true, unique: true },
    fields: [{
        name: { type: String, required: true },
        type: { type: String, enum: ["text", "number", "date", "checkbox", "radio", "select", "multi-select"], required: true },
        options: { type: [String], default: undefined } // Ensures "select" and "multi-select" have options
    }]
});

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true, index: true },
    stock: { type: Number, required: true },
    brand: { type: String, required: true, index: true },
    colors: [{ type: String }],
    categoryDetails: { type: mongoose.Schema.Types.Mixed }, // Dynamic object for category-specific details
    variants: { type: [VariantSchema], default: [] },
    mainImages: [{ type: String }], // Array of image URLs
    additionalInfo: AdditionalInfoSchema // Embedded object instead of an array
}, { timestamps: true });

module.exports = {
    Product: mongoose.model('Product', ProductSchema),
    Category: mongoose.model('Category', CategorySchema)
};
