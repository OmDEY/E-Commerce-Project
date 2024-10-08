import axios from 'axios';

const uploadHomePageBannerCarouselImages = async (formData) => {
    const response = await axios.post('http://localhost:4000/api/homePageCategoryDataUploads/upload/HomePageBannerImages', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response;
}

const adminUpdateProduct = async (formData, productId) => {
    const response = await axios.put(`http://localhost:4000/api/products/updateProduct/${productId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response;
}

const adminAddProduct = async (formData) => {
    const response = await axios.post('http://localhost:4000/api/products/addProduct', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response;
}

const adminDeleteProduct = async (productId) => {
    const response = await axios.delete(`http://localhost:4000/api/products/deleteProduct/${productId}`);

    return response;
}

const fetchAllUsers = async () => {
    const response = await axios.get('http://localhost:4000/api/users/fetchAllUsers')

    return response;
}

const fetchHomePageBannerCarouselImages = async () => {
    const response = await axios.get('http://localhost:4000/api/homePageCategoryDataUploads/fetch/HomePageBannerImages');

    return response;
}

const fetchUserById = async (userId) => {
    const response = await axios.get(`http://localhost:4000/api/users/getUserById/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })

    return response;
}

const removeItemFromCart = async (id) => {
    const response = await axios.delete(`http://localhost:4000/api/cart/deleteCartItem/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })

    return response;
}

const updateCartItem = async (id, newQuantity) => {
    const response = await axios.put(`http://localhost:4000/api/cart/updateCartItem`, { productId: id, quantity: newQuantity }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })

    return response;
}

const fetchCart = async () => {
    const response = await axios.get('http://localhost:4000/api/cart/getCart', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })

    return response;
}

const addToCart = async (productId, quantity) => {
    const response = await axios.post('http://localhost:4000/api/cart/addToCart',
        { productId, quantity: quantity },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    )


    return response;
}

const fetchProductsFiltered = async (searchTerm, page, limit) => {
    const response = await axios.get(`http://localhost:4000/api/products/fetchProductsFiltered?searchTerm=${searchTerm}&page=${page}&limit=${limit}`)

    return response;
}

const fetchAllProducts = async (page, limit) => {
    const response = await axios.get('http://localhost:4000/api/products/getProducts?page=' + page + '&limit=' + limit)

    return response;
}

const fetchProductById = async (productId) => {
    const response = await axios.get(`http://localhost:4000/api/products/getProductById/${productId}`)  // Use URL param
    return response;
}

const submitProductReview = async (userId, review, rating, productId) => {
    const response = await axios.post(`http://localhost:4000/api/products/submitProductReview`, { userId: userId, review: review, productId: productId, rating: rating })
    return response;
}

const captureUserData = async (userData) => {
    const response = await axios.post('http://localhost:4000/api/users/auth/captureUserData', userData)
    return response;
}

export {
    fetchUserById,
    fetchHomePageBannerCarouselImages,
    adminUpdateProduct,
    adminAddProduct,
    adminDeleteProduct,
    fetchAllUsers,
    uploadHomePageBannerCarouselImages,
    removeItemFromCart,
    updateCartItem,
    fetchCart,
    addToCart,
    fetchProductsFiltered,
    fetchAllProducts,
    fetchProductById,
    submitProductReview,
    captureUserData
};