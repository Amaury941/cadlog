const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");


const app = express();
app.use(cors())

const port = 3000;

// Middleware para parsear o corpo das requisições como JSON
app.use(bodyParser.json());

// Simulação de um banco de dados temporário
const users = [];

// Rota para cadastrar um novo usuário
app.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;

    // Simples validação
    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Por favor, preencha todos os campos.' });
    }

    // Verifica se o email já está cadastrado
    if (users.some(user => user.email === email)) {
        return res.status(400).json({ mensagem: 'Este email já está cadastrado.' });
    }

    // Adiciona o usuário à lista (simulação de persistência)
    users.push({ nome, email, senha });

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
});

// Rota para login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    // Simples validação
    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Por favor, forneça o email e a senha.' });
    }

    // Verifica se o usuário existe
    const user = users.find(user => user.email === email && user.senha === senha);

    if (!user) {
        return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    res.status(200).json({ mensagem: 'Login bem-sucedido!' });
});

// Rota básica para o método GET na raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo ao sistema de cadastro!');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
