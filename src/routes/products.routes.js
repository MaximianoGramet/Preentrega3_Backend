import { Router } from "express";
import ProductDao from "../daos/dbManager/product.dao.js";

const ROUTER = Router();



ROUTER.get("/",async (req,res)=>{

    try{
        const { limit, page, query, sort } = req.query;
        const products = await ProductDao.findProduct(limit, page, query, sort);
        res.json({
          data: products,
          message: "Products List"
        });
      }catch(error){
        console.log(error);
        res.json({
          error,
          message: "error",
        });
      }
})

ROUTER.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await ProductDao.getProductById(id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json({
        product,
        message: "Product found",
      });
    } catch (error) {
      console.log(error);
      res.json({
        error,
        message: "Error",
      });
    }
  });


ROUTER.delete("/:id", async (req,res)=>{
    const {id} = req.params
    try{
        await ProductDao.deleteProduct(id)
        return res.status(200).json({ message: 'Product deleted successfully' })

    }catch(error){
        return res.status(404).json({error:error.message})
    }
})

ROUTER.post("/", async (req,res)=>{
    try { 
        const product = await ProductDao.createProduct(req.body);
        res.json({
            product,
            message: "Product created"
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            error,
            message: "error"
        });
    }
})

ROUTER.put("/:pid",async (req,res)=>{
    try {
        const { id } = req.params;
        const product = await ProductDao.updateProduct(id, req.body);

        res.json({
            product,
            message: "Product updated"
        });
    }
    catch (error){
        console.log(error);
        res.json({
            error,
            message: "error"
        });
    }
})


export default ROUTER