const express = require('express');
const server = express();
const apiRouter = require('./router/api-router');
server.use(express.json());
const router = express.Router();
server.use('/', apiRouter);


const port = 4000;





server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
