const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    default: '',
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    default: '',
    // required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  shippingAddress: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  billingAddress: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    }
  ],
  cart: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      }
    }
  ],
  orderHistory: [
    {
      orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
      orderDate: Date,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
