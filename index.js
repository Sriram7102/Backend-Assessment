const express = require('express');
const cors = require('cors');
const app = express();
const cronjob = require('cronjob')
require('dotenv').config();
const {createOrders, revenueDetails, topNProducts, customerAnalysis, successMetrics} = require('./controllers/ordersControllers.js')
const connectDB = require('./db.js');
const getDataFromCSV = require('./utils/util.js')
app.use(cors());
app.use(express.json())

app.post('/health',async(req, res) =>{
    console.log('System Up')
    res.status(200).json({message:"System is up"});
});

app.post('/create', createOrders);
app.get('/revenueDetails/:id', revenueDetails);
app.get('/topn/:id', topNProducts);
app.get('/customerAnalysis/:id', customerAnalysis);
app.get('/successMetrics/:id', successMetrics);

cronjob.run("0 0 * *",async()=>{
    const data = await getDataFromCSV();
    /* Need to write logics to update DB */
    console.log("Database Updated Once A Day")
})

async function startServer(){
    try{
   const db = await connectDB();
    }catch(err){
        console.error(error)
        process.exit(1)
    }
}
startServer();
app.listen(process.env.PORT || "5000",()=>{console.log("server started")});
