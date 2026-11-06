import { useEffect, useState } from 'react';
import { listarInscricoes, excluirInscricao } from '../services/api';

export default function Inscritos() {
  const [inscricoes, setInscricoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [excluindoId, setExcluindoId] = useState(null);
  const [itemParaExcluir, setItemParaExcluir] = useState(null);

  async function carregarInscricoes() {
    setCarregando(true);
    setErro('');
    try {
      const dados = await listarInscricoes();
      setInscricoes(dados);
    } catch (err) {
      setErro(err.message || 'Erro ao carregar lista de inscritos.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarInscricoes();
  }, []);

  async function executarExclusao(id) {
    setExcluindoId(id);
    try {
      await excluirInscricao(id);
      setInscricoes((prev) => prev.filter((item) => item.id !== id));
      setItemParaExcluir(null);
    } catch (err) {
      alert(err.message || 'Erro ao excluir inscrição.');
    } finally {
      setExcluindoId(null);
    }
  }

  function handleExcluir(id, nome) {
    // Chamada nativa window.confirm conforme especificação
    const confirmacao = window.confirm(
      `Deseja realmente remover a inscrição de "${nome}"?`
    );

    if (confirmacao) {
      executarExclusao(id);
    } else {
      // Fallback inteligente: se o navegador/webview bloquear pop-ups nativos, abre confirmação na tela
      setItemParaExcluir({ id, nome });
    }
  }

  return (
    <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden">
      {/* Detalhe estético no topo */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-cyan-400 px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/30">
              PAINEL DE CREDENCIAMENTO
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Total: {inscricoes.length} {inscricoes.length === 1 ? 'vaga' : 'vagas'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Participantes Inscritos
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Gestão de credenciais confirmadas para o WebDev Summit 2027.
          </p>
        </div>
        <button
          onClick={carregarInscricoes}
          className="self-start sm:self-auto text-xs font-semibold text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/60 bg-cyan-950/40 px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.1)]"
        >
          ↻ Atualizar lista
        </button>
      </div>

      {/* Modal de Confirmação visual (Garante funcionamento em webviews e IDEs) */}
      {itemParaExcluir && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-sm text-red-200">
            <span className="font-bold">Confirmação:</span> Deseja realmente remover a inscrição de{' '}
            <strong className="text-white font-mono">"{itemParaExcluir.nome}"</strong>?
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setItemParaExcluir(null)}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => executarExclusao(itemParaExcluir.id)}
              disabled={excluindoId === itemParaExcluir.id}
              className="text-xs px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors disabled:opacity-50"
            >
              {excluindoId === itemParaExcluir.id ? 'Removendo...' : 'Sim, Excluir'}
            </button>
          </div>
        </div>
      )}

      {/* Estado de Carregamento */}
      {carregando && (
        <div className="text-center py-16 text-slate-400 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
          <p className="text-sm font-mono">Sincronizando inscrições com o servidor...</p>
        </div>
      )}

      {/* Estado de Erro de Rede */}
      {!carregando && erro && (
        <div className="p-5 bg-red-950/40 border border-red-500/40 text-red-300 rounded-xl text-sm">
          <p className="font-semibold text-red-200">Não foi possível carregar os inscritos:</p>
          <p className="mt-1">{erro}</p>
          <button
            onClick={carregarInscricoes}
            className="mt-3 text-xs font-bold text-cyan-400 hover:text-cyan-300 underline"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* Estado de Lista Vazia */}
      {!carregando && !erro && inscricoes.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-950/40">
          <p className="text-slate-400 text-sm">
            Nenhuma inscrição registrada até o momento.
          </p>
          <p className="text-slate-500 text-xs mt-1">
            Seja o primeiro a garantir sua vaga no evento!
          </p>
        </div>
      )}

      {/* Tabela de Inscritos Tecnológica */}
      {!carregando && !erro && inscricoes.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-mono text-xs uppercase tracking-wider">
                <th className="py-3.5 px-4">Participante</th>
                <th className="py-3.5 px-4">E-mail</th>
                <th className="py-3.5 px-4">WhatsApp / Tel</th>
                <th className="py-3.5 px-4">Modalidade</th>
                <th className="py-3.5 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {inscricoes.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">
                    {item.nome}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-mono text-xs">
                    {item.email}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 text-xs">
                    {item.telefone || '-'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                        item.tipoIngresso === 'estudante'
                          ? 'bg-purple-950/80 text-purple-300 border border-purple-500/40'
                          : 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40'
                      }`}
                    >
                      {item.tipoIngresso}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleExcluir(item.id, item.nome)}
                      disabled={excluindoId === item.id}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold px-2.5 py-1 rounded-lg hover:bg-red-950/50 border border-red-500/20 hover:border-red-500/40 transition-all disabled:opacity-50"
                    >
                      {excluindoId === item.id ? 'Excluindo...' : 'Excluir'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
