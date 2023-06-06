import express from "express"
import { ProductManager } from "./productManager.js";

const productHandler = new ProductManager();

const app =  express();
app.get('/products',async(req,res)=>{
    const limit = req.query.limit
    const data = await productHandler.getProducts()
    if (!limit) return res.send(data)
    else return res.send(data.slice(0,limit))
    

    
})
app.get('/products/:pid',async (req,res)=>{
    let id = parseInt(req.params.pid)

    const data = await productHandler.getProductById(id)

    if (!data) return res.send({error:"producto no encontrado"})

   else return res.send(data)

})
app.listen(8080,()=>console.log("server Up"))


