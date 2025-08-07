const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition : {

  openapi: '3.0.0',
  info: {
    title: 'Swagger Testing',
    version: '1.0.0',
    description: 'API Documentation with Swagger',
  },
  servers: [
    {
      url: 'http://localhost:5000/api',
    },
  ],
},
apis: [],
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
