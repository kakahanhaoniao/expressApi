let mongoose = require('../mongoConfig');
let Schema = mongoose.Schema;

let ProductSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    stock: Number,
    creat_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now},
    is_delete: Boolean
});

let Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
