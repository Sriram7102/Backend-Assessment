const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
"Customer ID":{
    type: String,
    required: true
},
"Customer Name":{
 type: String,
    required: true
},
"Customer Email":{
 type: String,
    required: true
},
"Customer Address":{
 type: String,
    required: true
},

})

module.exports = mongoose.Schema("Users", userSchema);
