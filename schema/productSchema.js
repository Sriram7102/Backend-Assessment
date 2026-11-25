const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
"Product ID":{
    type: String,
    required: true
},
"Product Name":{
    type: String,
    required: true
},
"Category":{
    type: String,
    required: true
},
"Region":{
    type: String,
    required: true
},
"Date of Sale":{
    type: Date,
    required: true
},
"Quantity Sold":{
    type: Number,
    required: true
},
"Unit Price":{
    type: Number,
    required: true
},
"Discount":{
    type: Number,
    required: true
},
"Shipping Cost":{
    type: Number,
    required: true
}
})

module.exports = mongoose.Schema("Products", productSchema);
