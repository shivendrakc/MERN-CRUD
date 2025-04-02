import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },   
}, {
    timestamps: true //createdAt, UpdatedAt
});

const Product = mongoose.model('Product', productSchema);

export default Product;