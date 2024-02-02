import { Router } from "express";
import ProductDao from "../daos/dbManager/product.dao.js";

const router = Router();

router.get("/", (req, res) => {res.render("login.hbs");});
router.get("/realtimeproducts", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/users/login");
    }res.render("products.hbs");})
router.get("/chat",(req,res)=>{
    if (!req.session.user) {
        return res.redirect("/users/login");
    }res.render("chat.hbs");});

router.get("/products", async (req,res) => {

    if (!req.session.user) {
        return res.redirect("/users/login");
      }
    const { limit, page, query, sort } = req.query;
    const products = await ProductDao.findProducts(limit, page, query, sort);

    const userData = req.session.user;
    const welcomeMessage = 'Welcome to my store';

    res.render("products.hbs", { products, user: userData, welcomeMessage }, (err, html) => {
        if (err) {
            throw err
        }
        res.send(html)
    })
})

export default router;