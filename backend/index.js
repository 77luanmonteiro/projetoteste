const express = require('express');
const inscricoesRouter = require('./routes/inscricoes');

const app = express();
const PORT = 3001;

app.use(express.json());

app.use('/inscricoes', inscricoesRouter);

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
