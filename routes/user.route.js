const express = require("express")
const bcrypt = require("bcrypt")
const axios = require('axios');
const jwt = require("jsonwebtoken")
const { userModel } = require("../models/user.model")
const userRouter = express.Router()

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with an email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             example:
 *               email: example@example.com
 *               password: mypassword
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             example:
 *               msg: User registered.
 *               user: {user_object}
 *       400:
 *         description: Error registering the user.
 *         content:
 *           application/json:
 *             example:
 *               msg: Could not register the user.
 *               err: {error_message}
 */
userRouter.post("/register", async (req, res) => {
    const { email, password } = req.body
    try {
        bcrypt.hash(password, 3, async (err, hashed) => {
            if (hashed && password && email) {
                const user = new userModel({
                    email,
                    password: hashed,
                    order: [],
                    cart: []
                })
                await user.save()
                res.status(201).send({
                    "msg": "user registered",
                    user
                })
            }
            else{
                res.status(400).send({
                    "msg": "user could not register",
                    err
                })
            }
        })
    }
    catch (err) {
        res.status(400).send({
            "msg": "user could not register",
            err
        })
    }
})

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Log in a user with an email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             example:
 *               email: example@example.com
 *               password: mypassword
 *     responses:
 *       201:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             example:
 *               msg: User logged in.
 *               token: {jwt_token}
 *       400:
 *         description: Error logging in the user.
 *         content:
 *           application/json:
 *             example:
 *               msg: Could not log in the user.
 *               err: {error_message}
 */
userRouter.post("/login",async (req,res)=>{
    const {email,password} = req.body
    try{
        const user = await userModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token = jwt.sign({id:user._id},"secret")
                    res.status(201).send({
                        "msg": "user loggedin",
                        token
                    }) 
                }
                else{
                    res.status(400).send({
                        "msg": "password incorrect",
                        err
                    })
                }
            })
        }
        else if(!email || !password){
            res.status(400).send({
                "msg": "user could not login",
                err
            })
        }
        else{
            res.status(400).send({
                "msg": "user not found",
                err
            })
        }
    }
    catch(err){
        res.status(400).send({
            "msg": "user could not login",
            err
        })
    }
})

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get product categories
 *     description: Retrieve available product categories.
 *     responses:
 *       200:
 *         description: Categories retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               msg: Available categories down below.
 *               category: [{category_name}]
 *       400:
 *         description: Error fetching categories.
 *         content:
 *           application/json:
 *             example:
 *               msg: Could not fetch categories.
 *               err: {error_message}
 */
userRouter.get("/category",async (req,res)=>{
    axios.get("https://fakestoreapi.com/products/categories")
    .then((result)=>{
        res.status(200).send({
            "msg":"available categories down below",
            "category":result.data
        })
    }).catch((err)=>{
        res.status(400).send({
            "msg":"could not fetch data",
            err
        })
    })
})

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get products
 *     description: Retrieve available products.
 *     responses:
 *       200:
 *         description: Products retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               msg: Available products down below.
 *               products: [{product_object}]
 *       400:
 *         description: Error fetching products.
 *         content:
 *           application/json:
 *             example:
 *               msg: Could not fetch products.
 *               err: {error_message}
 */
userRouter.get("/product",async (req,res)=>{
    axios.get("https://fakestoreapi.com/products")
    .then((result)=>{
        res.status(200).send({
            "msg":"available products down below",
            "products":result.data
        })
    }).catch((err)=>{
        res.status(400).send({
            "msg":"could not fetch data",
            err
        })
    })
})

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve details of a product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               msg: Product details retrieved.
 *               product: {product_object}
 *       400:
 *         description: Error fetching the product.
 *         content:
 *           application/json:
 *             example:
 *               msg: Could not fetch the product.
 *               err: {error_message}
 */
userRouter.get("/product/:id",async (req,res)=>{
    const id = req.params.id
    axios.get(`https://fakestoreapi.com/products/${id}`)
    .then((result)=>{
        res.status(200).send({
            "msg":"product down below",
            "products":result.data
        })
    }).catch((err)=>{
        res.status(400).send({
            "msg":"could not fetch data",
            err
        })
    })
})

module.exports = {
    userRouter
}

