const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth & Task API',
      version: '1.0.0',
      description: 'API Documentation for the internship assignment',
    },
    servers: [
      {
        url: process.env.BACKEND_URL || 'http://localhost:5000/api/v1',
        description: 'Current Server',
      },
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = swaggerDocs;
