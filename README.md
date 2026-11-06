# WebDev Summit 2027 - Sistema de Divulgação e Inscrições

Projeto full stack mínimo para divulgação do evento de tecnologia **WebDev Summit 2027** e gestão de inscrições de participantes.

---

## Estrutura do Projeto

```text
projeto/
├── backend/
│   ├── index.js
│   ├── package.json
│   └── routes/
│       └── inscricoes.js
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Inscricao.jsx
│       │   └── Inscritos.jsx
│       └── services/
│           └── api.js
└── README.md
```

---

## Pré-requisitos

- **Node.js** (versão 18 ou superior recomendada)
- **npm** (incluso com o Node.js)

---

## Ordem de Execução

> **Importante:** Inicie sempre o **backend primeiro** para que o servidor da API esteja ativo na porta `3001` antes de interagir com o frontend.

---

## Como Instalar e Rodar

### 1. Backend

Abra um terminal na pasta do backend:

```bash
cd backend
npm install
npm run dev
```

O servidor backend estará disponível em `http://localhost:3001`.

### 2. Frontend

Abra outro terminal na pasta do frontend:

```bash
cd frontend
npm install
npm run dev
```

Acesse o frontend no navegador pelo endereço indicado pelo Vite (normalmente `http://localhost:3000`). O Vite está configurado com proxy para repassar requisições `/inscricoes` diretamente para o backend na porta 3001, dispensando configuração de CORS.

---

## Descrição das Rotas

### Frontend (React Router)

| Rota | Descrição |
| :--- | :--- |
| `/` | **Tela principal**: Apresenta as informações do evento (data, local, descrição) e cards com os palestrantes e temas, além do botão de atalho para inscrição. |
| `/inscricao` | **Tela de inscrição**: Formulário com validação imediata no cliente e integração com o backend para registrar participantes (nome, e-mail, telefone opcional e tipo de ingresso). |
| `/inscritos` | **Tela de participantes**: Lista todos os participantes cadastrados, permitindo remover cadastros com confirmação prévia e atualização instantânea da interface. |

### Backend (Express API)

| Método | Endpoint | Status | Descrição |
| :--- | :--- | :--- | :--- |
| `GET` | `/inscricoes` | `200 OK` | Retorna a lista completa de inscrições em memória. |
| `POST` | `/inscricoes` | `201 Created` / `400 Bad Request` | Cria uma nova inscrição após validar campos obrigatórios, regras de tipo de ingresso ("estudante" ou "profissional"), formato do e-mail e duplicidade (case-insensitive). |
| `DELETE` | `/inscricoes/:id` | `204 No Content` / `404 Not Found` | Remove uma inscrição pelo ID sequencial. |
