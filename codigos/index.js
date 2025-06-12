const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Importa a conexão e o model Cliente
const { sequelize, Cliente } = require('../models');



// Create
app.post('/clientes', async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
app.put('/clientes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cliente = await Cliente.findByPk(id);
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });

    await cliente.update(req.body);
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete
app.delete('/clientes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    } else {
      await cliente.destroy();
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inicia servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
