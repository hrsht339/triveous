const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation for Your API',
    },
  },
  // Specify the path to your API route files
  apis: ['./routes/cart.route.js', './routes/user.route.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
