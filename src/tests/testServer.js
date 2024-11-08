const app = require('../../app');

let server;

const startServer = () => {
  server = app.listen(0);
  return server;
};

const stopServer = async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
};

module.exports = { startServer, stopServer }; 