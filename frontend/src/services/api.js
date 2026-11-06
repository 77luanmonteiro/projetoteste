// Centralização das chamadas HTTP da aplicação

async function requisicao(url, opcoes = {}, mensagemErroPadrao) {
  const resposta = await fetch(url, opcoes);
  const dados = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    throw new Error(dados.erro || mensagemErroPadrao);
  }

  return dados;
}

export function listarInscricoes() {
  return requisicao('/inscricoes', {}, 'Falha ao buscar as inscrições.');
}

export function criarInscricao(dadosInscricao) {
  return requisicao(
    '/inscricoes',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosInscricao)
    },
    'Falha ao criar inscrição.'
  );
}

export async function excluirInscricao(id) {
  await requisicao(`/inscricoes/${id}`, { method: 'DELETE' }, 'Falha ao excluir inscrição.');
  return true;
}
