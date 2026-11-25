const orderSchema = require('../schema/orderSchema.js');
const userSchema = require('../schema/userSchema.js');
const users = require('./userSchema.js');

exports.createOrders(async(req, res)=>{
    try{
    const order = orderSchema.Create(req.body);
    if(!order){
        res.status(402).json({message:"Invalid Request"})
    }
    res.status(201).json({message:"Order Created"})
}catch(error){
    console.error(error)
    res.status(500).json({message:"Internal Server Error"})
}   
});

exports.revenueDetails(async(req, res)=>{
    try{
        const startDate = req.params.startDate;
        const endDate = req.params.endDate;
        const product = req.params.product;
        const region = req.params.region;
        const category = req.params.category;

        if(!startDate || !endDate || !product || !region || !category){
            res.status(500).json({message: "Internal Server Issue"});
        }

        const revenueRegion = await orderSchema.find(region).skip(startDate).limit(endDate);
        
        const revenueCategory = await orderSchema.find(category);

        const revenueProduct = await orderSchema.find(product);

        if(!revenueCategory || !revenueProduct || !revenueRegion){
            res.status(401).json({message: "Invalid Request"});
        }
        res.status(200).json({message : "Revenue Details", data:[revenueCategory, revenueProduct, revenueRegion]});

    }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal Server Error"});
    }
});


exports.topNProducts(async(req, res)=>{
    try{
        const startDate = req.params.startDate;
        const endDate = req.params.endDate;
        const product = req.params.product;
        const region = req.params.region;
        const category = req.params.category;

        const regions = await orderSchema.aggregate({$find : ["Quantity Sold", region]}).skip(startDate).limit(endDate);
        const categories = await orderSchema.aggregate({$find : ["Quantity Sold", category]}).skip(startDate).limit(endDate);

        if(!regions || !categories){
            res.status(401).json({message: "Bad Request"});
        }
        res.status(200).json({message:"Successful", data:[regions, categories]});
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal Server Error"})
    }
});

exports.customerAnalysis(async(req, res)=>{
    try{
        const startDate = req.params.startDate;
        const endDate = req.params.endDate;
        const totalCustomers = await userSchema.aggregate({$total:"Customer ID"}).skip(startDate).limit(endDate);
        const totalOrders = await orderSchema.aggregate({$all:"Order ID"}).skip(startDate).limit(endDate);
        const unitPrice = await orderSchema.find("Unit Price").skip(startDate).limit(endDate);
        const avgOrderValue = unitPrice / totalOrders;
        if(!totalCustomers || !totalOrders || !avgOrder){
            res.status(401).json({message: "Bad Request"});
        }
        res.status(200).json({message:"Successful", data:[totalCustomers, totalOrders, avgOrderValue]});

    }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal Server Error"});
    }
})


exports.successMetrics(async(req, res)=>{
    try{
 const startDate = req.params.startDate;
        const endDate = req.params.endDate;
        res.status(200).json({message: "Coming soon"});
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal Server Error"});
    }
})