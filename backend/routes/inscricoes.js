const express = require('express');
const router = express.Router();

let inscricoes = [];
let proximoId = 1;

// GET /inscricoes - Lista todas as inscrições
router.get('/', (req, res) => {
  return res.status(200).json(inscricoes);
});

// POST /inscricoes - Cria nova inscrição com validações
router.post('/', (req, res) => {
  const { nome, email, telefone, tipoIngresso } = req.body || {};

  // Validação enxuta de campos obrigatórios não vazios
  const camposObrigatorios = { nome, email, tipoIngresso };
  for (const [campo, valor] of Object.entries(camposObrigatorios)) {
    if (!valor || typeof valor !== 'string' || !valor.trim()) {
      return res.status(400).json({ erro: `O campo "${campo}" é obrigatório.` });
    }
  }

  // Validação do tipo de ingresso
  const tipoTratado = tipoIngresso.trim().toLowerCase();
  if (tipoTratado !== 'estudante' && tipoTratado !== 'profissional') {
    return res.status(400).json({ erro: 'O "tipoIngresso" deve ser "estudante" ou "profissional".' });
  }

  // Validação de e-mail (presença de "@" único e domínio válido com ".")
  const emailTratado = email.trim();
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@.]+$/.test(emailTratado);
  if (!emailValido) {
    return res.status(400).json({ erro: 'Formato de e-mail inválido.' });
  }

  // Validação de e-mail duplicado (case-insensitive)
  const emailExistente = inscricoes.some(
    (item) => item.email.toLowerCase() === emailTratado.toLowerCase()
  );
  if (emailExistente) {
    return res.status(400).json({ erro: 'Este e-mail já está inscrito.' });
  }

  const novaInscricao = {
    id: proximoId++,
    nome: nome.trim(),
    email: emailTratado,
    telefone: telefone ? String(telefone).trim() : '',
    tipoIngresso: tipoTratado
  };

  inscricoes.push(novaInscricao);
  return res.status(201).json(novaInscricao);
});

// DELETE /inscricoes/:id - Remove inscrição por ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = inscricoes.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Inscrição não encontrada.' });
  }

  inscricoes.splice(index, 1);
  return res.status(204).send();
});

module.exports = router;
