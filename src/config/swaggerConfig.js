const swaggerDocument = require('./swagger.json');

swaggerDocument.servers = [
  {
    url: `${process.env.SERVER_URL}`,
  },
];

module.exports = swaggerDocument; 