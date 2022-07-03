const express= require('express');
const cors=require('cors');
const ScrapService=require('./services/scrap.services');
const service= new ScrapService();
const app=express();
const port= 4000;
app.use(express.json());
app.use(cors());
app.get('/slides-scrap',async (req,res)=>{
    try {
        const result=await service.Scrap();
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
});
app.listen(port,()=>{console.log(`Listening on Port ${port}`)});
