const express = require("express")
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const rateLimit = require('express-rate-limit');
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.route")
const { cartRouter } = require("./routes/cart.route")
const { authentication } = require("./middlewares/authentication")
const app = express()
app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);

app.get("/", (req, res) => {
    res.send("welcome to my website")
})

app.use("/", userRouter)
app.use(authentication)
app.use("/", cartRouter)

app.listen(4500, async () => {
    try {
        await connection
        console.log("server connected")
    }
    catch (err) {
        console.log(err)
    }
    console.log("db connected")
})
