import { Router } from "express";
import userModel from "../models/user.model.js"
import { createHash, isValidPas } from "../utils.js";
import passport from "passport";

const router = Router()

router.get("/github", passport.authenticate('github', { scope: ['user:email'] }), 
async (req, res) => {
    { }
})
router.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/github/error' }), 
async (req, res) => {
    const user = req.user;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;
    res.redirect("/users");
})
router.post('/register', passport.authenticate("register", {
  failureRedirect: "api/session/fail-register"
}), async (req,res)=>{res.send({status:"success", msg:"User created"})})

router.post('/login', passport.authenticate("login", {
  failureRedirect: "api/session/fail-login"
}), async (req,res) => {
  const user = req.user;
  const rol = "user"
  req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      rol: rol
  }
  res.send({status:'success', payload: req.session.user, message:'Log successful'})
})

router.get('/logout',  (req,res)=>{
    req.session.destroy(err =>{
        if(!err) return res.status(200).send("Loged Out succesfuly")
        else res.send("Fail to log out")
    })
})

router.get("/current", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).send({ user: req.user });
  } else {
    res.status(401).send({ error: "User not authenticated" });
  }
});
router.get("/fail-register", (req, res) => {
  res.status(401).send({error: "failed to process register"});
})

router.get("/fail-login", (req, res) => {
  res.status(401).send({error: "failed to process login"});
})
export default router;