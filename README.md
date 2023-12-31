# Simple Online Store

## Introduction

Simple Online Store is an easy-to-use web application that simplifies online shopping for customers and provides essential tools for administrators to manage products and orders.

## Deployed App

Visit the live app at [Simple Online Store](https://triveous-k3tc.onrender.com/).

## Video Walkthrough of the project
https://drive.google.com/drive/folders/1_6qRthn8L7HPvPg9hYAj-d9_rZP0XGNP?usp=sharing

## Features

- **User Registration**: Create an account to track orders and manage your profile.
- **Product Catalog**: Explore a wide range of products, neatly categorized for easy discovery.
- **Shopping Cart**: Add, review, and remove items before making a purchase.
- **Order Placement**: Securely place orders with immediate confirmation.
- **Order History**: Access your order history for easy reordering.

- **Swagger Documentation**: https://triveous-k3tc.onrender.com/api-docs/
- **Rate Limiting**: Limited to 100 request per IP for 15 minutes.


## Installation & Getting Started

1. Clone the repository:
git clone https://github.com/hrsht339/triveous

2. Navigate to the project directory:
cd triveous

3. Install dependencies:
npm install

4. Start the server:
npm run server


Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

## Usage

1. Visit the live app at [Simple Online Store](https://triveous-k3tc.onrender.com/).
2. Sign up for an account or log in if you have one.
3. Explore the product catalog, add items to your cart, and proceed to checkout.
4. Provide shipping and payment information to complete your order.

## APIs Used

External APIs used for functionality:

- [Payment Gateway API](https://payment-gateway-api.com): Secure payment processing.
- [Product Data API](https://product-data-api.com): Provides product information.

## API Endpoints

### User Routes

- **POST** `/api/user/register`: Register a new user.
- **POST** `/api/user/login`: Log in a user.

### Product Routes

- **GET** `/api/products`: Retrieve all available products.
- **GET** `/api/products/:id`: Retrieve details of a product by its ID.

### Order Routes

- **POST** `/api/orders`: Create a new order.
- **GET** `/api/orders/:id`: Retrieve order details by its ID.

### Cart Routes

- **POST** `/api/cart/:id`: Add a product to the user's cart.
- **GET** `/api/cart`: Retrieve the user's cart contents.
- **PATCH** `/api/cartupdate/:id`: Update the quantity of a product in the user's cart.


## Technology Stack

- Node.js
- Express.js
- MongoDB
- axios
- bcrypt
- dotenv
- express-rate-limit
- jsonwebtoken
- mongoose
- nodemon
- swagger-jsdoc
- swagger-ui-express