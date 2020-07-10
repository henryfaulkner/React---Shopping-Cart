const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
    {
        Apples: { type: Number, required: true },
        Peaches: { type: Number, required: true },
        Corn: { type: Number, required: true },
        Black_Beans: { type: Number, required: true },
        Pork: { type: Number, required: true },
        Chicken: { type: Number, required: true },
        Bread_Loaf: { type: Number, required: true },
        Rice: { type: Number, required: true },
    }
);

module.exports = mongoose.model('Orders', Order);