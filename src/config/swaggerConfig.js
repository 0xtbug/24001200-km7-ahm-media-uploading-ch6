const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Media Uploading API',
      version: '1.0.0',
      description: 'API documentation for the Media Uploading service',
    },
    servers: [
      {
        url: `${process.env.SERVER_URL}`,
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec; 