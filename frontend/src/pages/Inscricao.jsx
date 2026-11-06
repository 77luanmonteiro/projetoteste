import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { criarInscricao } from '../services/api';

const INPUT_CLASS =
  'w-full px-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-slate-500 text-sm transition-all';

const CONFIG_ABAS = {
  estudante: {
    icone: '🎓',
    tituloAba: 'Ingresso Estudante',
    corAtiva: 'bg-slate-900 text-purple-300 border-purple-500/50 border-b-slate-900 shadow-[0_-5px_15px_rgba(168,85,247,0.15)] relative z-10',
    corPonto: 'bg-purple-400',
    bannerBox: 'bg-purple-950/30 border-purple-500/30',
    bannerTag: 'bg-purple-900/60 text-purple-300 border-purple-500/40',
    bannerTagTexto: 'Benefício Acadêmico',
    bannerDescCor: 'text-purple-200/90',
    bannerDesc: 'Acesso total a todas as palestras, certificado oficial de 8h e kit de credenciamento.',
    bannerBadgeCor: 'text-purple-400 bg-purple-950/80 border-purple-500/20',
    bannerBadgeTexto: 'Apresentar comprovante',
    labelEmail: 'Acadêmico ou Pessoal',
    botaoSubmitCor: 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)]',
    botaoSubmitTexto: '🎓 Confirmar Inscrição como Estudante'
  },
  profissional: {
    icone: '💼',
    tituloAba: 'Ingresso Profissional',
    corAtiva: 'bg-slate-900 text-cyan-300 border-cyan-500/50 border-b-slate-900 shadow-[0_-5px_15px_rgba(6,182,212,0.15)] relative z-10',
    corPonto: 'bg-cyan-400',
    bannerBox: 'bg-cyan-950/30 border-cyan-500/30',
    bannerTag: 'bg-cyan-900/60 text-cyan-300 border-cyan-500/40',
    bannerTagTexto: 'Acesso Corporativo Completo',
    bannerDescCor: 'text-cyan-200/90',
    bannerDesc: 'Programação integral, certificado executivo, coffee break premium & Happy hour exclusivo.',
    bannerBadgeCor: 'text-cyan-400 bg-cyan-950/80 border-cyan-500/20',
    bannerBadgeTexto: 'Credencial VIP',
    labelEmail: 'Corporativo ou Pessoal',
    botaoSubmitCor: 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.35)]',
    botaoSubmitTexto: '💼 Confirmar Inscrição como Profissional'
  }
};

export default function Inscricao() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramTipo = searchParams.get('tipo');
  const [abaAtiva, setAbaAtiva] = useState(
    paramTipo === 'profissional' ? 'profissional' : 'estudante'
  );

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Sincroniza a aba com a URL se o usuário navegar diretamente com parâmetro
  useEffect(() => {
    const tipo = searchParams.get('tipo');
    if (tipo === 'estudante' || tipo === 'profissional') {
      setAbaAtiva(tipo);
    }
  }, [searchParams]);

  // Altera a aba ativa na mesma janela (Single-Window)
  function handleTrocarAba(tipo) {
    setAbaAtiva(tipo);
    setSearchParams({ tipo });
    setErro('');
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setSucesso('');

    // Validação básica no cliente para feedback imediato
    if (!formData.nome.trim()) {
      setErro('Por favor, informe o seu nome completo.');
      return;
    }

    if (!formData.email.trim()) {
      setErro('Por favor, informe o seu e-mail.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErro('Por favor, insira um formato de e-mail válido com "@" e domínio.');
      return;
    }

    setCarregando(true);

    try {
      await criarInscricao({
        ...formData,
        tipoIngresso: abaAtiva
      });

      setSucesso(
        `Inscrição confirmada com sucesso como ${
          abaAtiva === 'estudante' ? 'Estudante' : 'Profissional'
        }! Seu lugar no WebDev Summit 2027 está garantido.`
      );

      setFormData({
        nome: '',
        email: '',
        telefone: ''
      });
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  const configAtual = CONFIG_ABAS[abaAtiva];

  return (
    <div className="max-w-2xl mx-auto">
      {/* ============================================================== */}
      {/* ARQUITETURA DE JANELA ÚNICA COM ABAS NO TOPO (SINGLE-WINDOW)    */}
      {/* ============================================================== */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden relative">
        
        {/* Barra Superior / Abas no Topo da Janela */}
        <div className="bg-slate-950/90 border-b border-slate-800/90 pt-4 px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                SISTEMA DE INSCRIÇÕES • ED. 2027
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                Credenciamento de Participantes
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-slate-400 font-mono">1º Lote Ativo</span>
            </div>
          </div>

          {/* Abas no Topo (Tab-based Navigation) */}
          <div className="flex gap-2 -mb-px">
            {Object.entries(CONFIG_ABAS).map(([tipo, cfg]) => {
              const ativa = abaAtiva === tipo;
              return (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => handleTrocarAba(tipo)}
                  className={`flex-1 py-3.5 px-4 text-xs sm:text-sm font-bold rounded-t-xl transition-all duration-200 flex items-center justify-center gap-2 border-t border-x ${
                    ativa
                      ? cfg.corAtiva
                      : 'bg-slate-950/60 text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/40 border-b-slate-800'
                  }`}
                >
                  <span>{cfg.icone}</span>
                  <span>{cfg.tituloAba}</span>
                  {ativa && <span className={`w-1.5 h-1.5 rounded-full ${cfg.corPonto} ml-1`}></span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Corpo da Janela Única */}
        <div className="p-6 sm:p-10">
          {/* Banner Contextual da Aba Ativa */}
          <div className={`mb-8 p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${configAtual.bannerBox}`}>
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${configAtual.bannerTag}`}>
                {configAtual.bannerTagTexto}
              </span>
              <p className={`text-xs mt-1.5 leading-relaxed ${configAtual.bannerDescCor}`}>
                {configAtual.bannerDesc}
              </p>
            </div>
            <span className={`text-[11px] font-mono shrink-0 px-2.5 py-1 rounded-md border ${configAtual.bannerBadgeCor}`}>
              {configAtual.bannerBadgeTexto}
            </span>
          </div>

          {/* Mensagens de feedback */}
          {erro && (
            <div className="mb-6 p-4 bg-red-950/40 border border-red-500/40 text-red-300 text-sm rounded-xl flex items-start gap-3">
              <span className="text-red-400 text-lg">⚠️</span>
              <div>
                <p className="font-semibold text-red-200">Não foi possível concluir:</p>
                <p>{erro}</p>
              </div>
            </div>
          )}

          {sucesso && (
            <div className="mb-6 p-4 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-sm rounded-xl flex items-start gap-3">
              <span className="text-emerald-400 text-lg">✅</span>
              <div>
                <p className="font-semibold text-emerald-200">Confirmado!</p>
                <p>{sucesso}</p>
              </div>
            </div>
          )}

          {/* Formulário Central na Janela Única */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="nome" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Nome Completo *
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Ex: Maria Silva"
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                E-mail {configAtual.labelEmail} *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ex: maria@email.com"
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label htmlFor="telefone" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                WhatsApp / Telefone <span className="text-slate-500 font-normal">(opcional)</span>
              </label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="Ex: (11) 99999-9999"
                className={INPUT_CLASS}
              />
            </div>

            {/* Botão de Envio Adaptado à Aba Ativa */}
            <button
              type="submit"
              disabled={carregando}
              className={`w-full mt-6 py-4 px-6 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 ${configAtual.botaoSubmitCor}`}
            >
              {carregando ? (
                <span>Processando inscrição...</span>
              ) : (
                <span>{configAtual.botaoSubmitTexto}</span>
              )}
            </button>

            <div className="pt-2 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
              <span>🔒</span>
              <span>Ambiente seguro • Os dados serão vinculados à credencial selecionada na aba superior.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
