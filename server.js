const express = require('express');
const accountsRouter = require('./routes/accountsRouter.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Web DB I Challenge</h2>`);
});


module.exports = server;