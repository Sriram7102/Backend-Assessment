const mongoose = require('mongoose');

const connectDB = asyn(()=>{
    try{
    const mongo = mongoose.connect(process.env.MONGO_URI);
    console.log('connected')
    }catch(error){
        return error
    }
})