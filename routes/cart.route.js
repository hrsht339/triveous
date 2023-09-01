const express = require("express")
const axios = require('axios');
const { userModel } = require("../models/user.model")
const cartRouter = express.Router()

/**
 * @swagger
 * /cart/{id}:
 *   post:
 *     summary: Add a product to the cart
 *     description: Add a product to the user's cart.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to add to the cart.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The user's ID.
 *             example:
 *               id: user123
 *     responses:
 *       201:
 *         description: Product added to the cart.
 *         content:
 *           application/json:
 *             example:
 *               msg: Product added to the cart.
 *               user: {user_object}
 *       400:
 *         description: Error adding product to the cart.
 *         content:
 *           application/json:
 *             example:
 *               msg: Could not add to cart.
 *               err: {error_message}
 */
cartRouter.post("/cart/:id", async (req, res) => {
    const id = req.params.id
    const userid = req.body.id
    const user = await userModel.findById(userid)

    try {
        if (user) {
            const result = await axios.get(`https://fakestoreapi.com/products/${id}`)
            result.data.qty = 1
            user.cart.push(result.data)
            await userModel.findByIdAndUpdate(userid, user)
            res.status(201).send({
                "msg": "product added to cart",
                user
            })
        }
        else {
            res.status(400).send({
                "msg": "login again"
            })
        }
    }
    catch (err) {
        res.status(400).send({
            "msg": "could not add to cart",
            err
        })
    }
})

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get the user's cart
 *     description: Retrieve the user's cart contents.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the user to fetch the cart for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart products retrieved.
 *         content:
 *           application/json:
 *             example:
 *               msg: Cart products down below.
 *               cart: [{product_object}]
 *       400:
 *         description: Error fetching the cart.
 *         content:
 *           application/json:
 *             example:
 *               msg: Could not fetch the cart.
 *               err: {error_message}
 */
cartRouter.get("/cart", async (req, res) => {
    const userid = req.body.id
    try {
        const user = await userModel.findById(userid)
        if (user) {
            res.status(200).send({
                "msg": "cart products down below",
                "cart": user.cart
            })
        }
        else {
            res.status(400).send({
                "msg": "login again",
                err
            })
        }
    }
    catch (err) {
        res.status(400).send({
            "msg": "could fetch the cart",
            err
        })
    }
})

/**
 * @swagger
 * /cartupdate/{id}:
 *   patch:
 *     summary: Update a product quantity in the cart
 *     description: Update the quantity of a product in the user's cart.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update in the cart.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The user's ID.
 *             example:
 *               id: user123
 *     responses:
 *       200:
 *         description: Cart updated.
 *         content:
 *           application/json:
 *             example:
 *               msg: Cart updated.
 *               user: {user_object}
 *       400:
 *         description: Error updating the cart.
 *         content:
 *           application/json:
 *             example:
 *               msg: Could not update the cart.
 *               err: {error_message}
 */
cartRouter.patch("/cartupdate/:id",async(req,res)=>{
    const id = req.params.id
    const userid = req.body.id
    const user = await userModel.findById(userid)

    try {
        if (user) {
            for(let i=0;i<user.cart.length;i++){
                if(user.cart[i].id==id){
                    user.cart[i].qty++
                    break;
                }
            }
            await userModel.findByIdAndUpdate(userid, user)
            res.status(200).send({
                "msg": "cart updated",
                user
            })
        }
        else {
            res.status(400).send({
                "msg": "login again"
            })
        }
    }
    catch (err) {
        res.status(400).send({
            "msg": "could update the cart",
            err
        })
    }
})

/**
 * @swagger
 * /cartremove/{id}:
 *   patch:
 *     summary: Remove a product from the cart
 *     description: Remove a product from the user's cart or decrease its quantity.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to remove from the cart.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The user's ID.
 *             example:
 *               id: user123
 *     responses:
 *       200:
 *         description: Cart updated.
 *         content:
 *           application/json:
 *             example:
 *               msg: Cart updated.
 *               user: {user_object}
 *       400:
 *         description: Error updating the cart.
 *         content:
 *           application/json:
 *             example:
 *               msg: Could not update the cart.
 *               err: {error_message}
 */
cartRouter.patch("/cartremove/:id",async(req,res)=>{
    const id = req.params.id
    const userid = req.body.id
    const user = await userModel.findById(userid)

    try {
        if (user) {
            for(let i=0;i<user.cart.length;i++){
                if(user.cart[i].id==id){
                    if(user.cart[i].qty==1){
                        user.cart.splice(i,1)
                    }
                    else{
                         user.cart[i].qty--
                    }
                    break;
                }
            }
            await userModel.findByIdAndUpdate(userid, user)
            res.status(200).send({
                "msg": "cart updated",
                user
            })
        }
        else {
            res.status(400).send({
                "msg": "login again"
            })
        }
    }
    catch (err) {
        res.status(400).send({
            "msg": "could not update the cart",
            err
        })
    }
})

/**
 * @swagger
 * /placeorder:
 *   post:
 *     summary: Place an order
 *     description: Place an order using the products in the user's cart.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the user placing the order.
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Order placed successfully.
 *         content:
 *           application/json:
 *             example:
 *               msg: Order placed.
 *               user: {user_object}
 *       400:
 *         description: Error placing the order.
 *         content:
 *           application/json:
 *             example:
 *               msg: Could not place the order.
 *               err: {error_message}
 */
cartRouter.post("/placeorder",async(req,res)=>{
    const userid = req.body.id
    const user = await userModel.findById(userid)
    try {
        if (user) {
            user.orders.push(user.cart)
            user.cart=[]

            await userModel.findByIdAndUpdate(userid, user)
            res.status(201).send({
                "msg": "order placed",
                user
            })
        }
        else {
            res.status(400).send({
                "msg": "login again"
            })
        }
    }
    catch (err) {
        res.status(400).send({
            "msg": "could not place order",
            err
        })
    }
})

/**
 * @swagger
 * /history:
 *   get:
 *     summary: Get order history
 *     description: Retrieve the order history of a user.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the user to fetch the order history for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order history retrieved.
 *         content:
 *           application/json:
 *             example:
 *               msg: Order history retrieved.
 *               orders: [{order_object}]
 *       400:
 *         description: Error fetching the order history.
 *         content:
 *           application/json:
 *             example:
 *               msg: Could not fetch the order history.
 *               err: {error_message}
 */
cartRouter.get("/history",async(req,res)=>{
    const userid = req.body.id
    const user = await userModel.findById(userid)
    try {
        if (user) {
            res.status(200).send({
                "msg": "order placed",
                "orders":user.orders
            })
        }
        else {
            res.status(400).send({
                "msg": "login again"
            })
        }
    }
    catch (err) {
        res.status(400).send({
            "msg": "could not fetch orders",
            err
        })
    }
})

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Get a specific order
 *     description: Retrieve details of a specific order by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order details retrieved.
 *         content:
 *           application/json:
 *             example:
 *               msg: Order details retrieved.
 *               order: {order_object}
 *       400:
 *         description: Error fetching the order.
 *         content:
 *           application/json:
 *             example:
 *               msg: Could not fetch the order.
 *               err: {error_message}
 */
cartRouter.get("/order/:id",async(req,res)=>{
    const id = req.params.id
    const userid = req.body.id
    const user = await userModel.findById(userid)
    try {
        if (user) {
            if(user.orders>0 && user.orders.length<=id){
                res.status(200).send({
                    "msg": "order placed",
                    "orders":user.orders[id-1]
                })
            }
            else{
                res.status(400).send({
                    "msg": "order does not exist"
                })
            }
        }
        else {
            res.status(400).send({
                "msg": "login again"
            })
        }
    }
    catch (err) {
        res.status(400).send({
            "msg": "could not fetch order",
            err
        })
    }
})

module.exports = {
    cartRouter
}