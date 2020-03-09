const express = require('express');
const server = express();
server.use(express.json());
const dados = ['Juliano', 'Monteiro', 'Desenv'];

server.get('/dados', (req, res) => {
    return res.json(dados);
});

server.get('/dados/:index', checkDadosInArray, (req, res) => {
    return res.json(req.data);
});

server.post('/dados', checkDadosExists, (req, res) => {
    const {name} = req.body;
    dados.push(name);
    return res.json(dados);
});

server.put('/dados/:index', checkDadosInArray, checkDadosExists, (req, res) => {
    const {index} = req.params;
    const {name} = req.body;

    dados[index] = name;

    return res.json(dados);
});

server.delete('/dados/:index', (req, res) => {
    const {index} = req.params;

    dados.splice(index, 1);

    return res.send();
});

function checkDadosInArray(req, res, next) {
    const data = dados[req.params.index];

    if (!data) {
        return res.status(400).json({error: "Data does not exists"});
    }

    req.data = data;

    return next();
}

function checkDadosExists(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({error: "Data name is required"});
    }

    return next();
}


server.listen(3000);