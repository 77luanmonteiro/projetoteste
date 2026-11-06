import { Link } from 'react-router-dom';

const palestrantes = [
  {
    nome: 'João Mendes',
    tag: 'Frontend Architecture',
    tema: 'Componentes React escaláveis sem perder a simplicidade',
    bio: 'Líder técnica especialista em design systems resilientes e arquitetura modular de larga escala.',
    imagem: '/images/palestrante_carla.jpg',
    borda: 'border-cyan-500/30'
  },
  {
    nome: 'Rafael Duarte',
    tag: 'Backend & Resilience',
    tema: 'APIs REST com Express: validação, erros e organização',
    bio: 'Arquiteto de soluções focado em microsserviços de alto tráfego e contratos de dados à prova de falhas.',
    imagem: '/images/palestrante_rafael.jpg',
    borda: 'border-purple-500/30'
  },
  {
    nome: 'Juliana Torres',
    tag: 'Performance & Web Vitals',
    tema: 'Performance na web: o que medir e o que realmente importa',
    bio: 'Especialista em otimização de runtime no navegador, profiling de render e métricas essenciais de UX.',
    imagem: '/images/palestrante_juliana.jpg',
    borda: 'border-emerald-500/30'
  },
  {
    nome: 'Lucas Ferreira',
    tag: 'Modern UI Engineering',
    tema: 'CSS moderno e layouts responsivos sem frameworks pesados',
    bio: 'Autoridade em especificações CSS modernas, layouts dinâmicos e performance de renderização em telas móveis.',
    imagem: '/images/palestrante_lucas.svg',
    borda: 'border-amber-500/30'
  }
];

const infoEvento = [
  { icone: '📅', cor: 'text-cyan-400', texto: '13 de Março de 2027 • 09h às 18h' },
  { icone: '📍', cor: 'text-cyan-400', texto: 'Centro de Convenções Atlântico • Concórdia - SC' },
  { icone: '🎟️', cor: 'text-emerald-400', texto: 'Estudante ou Profissional' }
];

const metricas = [
  { valor: '500+', rotulo: 'Devs e Tech Leads', cor: 'text-cyan-400' },
  { valor: '8 Horas', rotulo: 'Imersão Presencial', cor: 'text-blue-400' },
  { valor: '4 Keynotes', rotulo: 'Especialistas Renomados', cor: 'text-purple-400' },
  { valor: '100%', rotulo: 'Prático & Aplicável', cor: 'text-emerald-400' }
];

export default function Home() {
  return (
    <div className="space-y-20 pb-8">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative text-center pt-4 sm:pt-10">
        {/* Badge de Urgência / Marketing */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-xs font-semibold text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.15)] mb-6 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>1º LOTE DISPONÍVEL • VAGAS LIMITADAS PARA A EDIÇÃO PRESENCIAL</span>
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          O Ponto de Encontro de Quem Constrói a{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Web Moderna
          </span>
        </h1>

        {/* Subtítulo Comercial */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Um dia intensivo com os maiores especialistas em <span className="text-white font-medium">React</span>, <span className="text-white font-medium">Node.js</span>, performance e arquitetura de software para transformar o padrão das suas entregas.
        </p>

        {/* Badges de Informações do Evento */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300">
          {infoEvento.map((info) => (
            <div key={info.texto} className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-800">
              <span className={info.cor}>{info.icone}</span>
              <span>{info.texto}</span>
            </div>
          ))}
        </div>

        {/* Call to Action Principal */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/inscricao"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:shadow-[0_0_40px_rgba(6,182,212,0.55)] transition-all duration-300 flex items-center justify-center gap-2 text-base group"
          >
            <span>Garantir Meu Ingresso Agora</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <a
            href="#lineup"
            className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-slate-300 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all text-base"
          >
            Conhecer os Keynotes
          </a>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          ⚡ Confirmação instantânea de vaga • Sem taxas adicionais
        </p>
      </section>

      {/* ===================== NÚMEROS / IMPACTO ===================== */}
      <section className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {metricas.map((m) => (
            <div key={m.rotulo}>
              <div className={`text-3xl sm:text-4xl font-extrabold ${m.cor} font-mono`}>{m.valor}</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">{m.rotulo}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== LINEUP DE PALESTRANTES (MISTERIOSOS / TEASER) ===================== */}
      <section id="lineup" className="scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest px-3 py-1 bg-cyan-950/60 rounded-full border border-cyan-500/30">
            LINEUP OFICIAL 2027
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Grandes Nomes. <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Identidades Reveladas no Palco.</span>
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Profissionais influentes do cenário nacional reunidos para compartilhar decisões de engenharia reais. Conheça as mentes por trás dos temas que definem a web em 2027.
          </p>
        </div>

        {/* Grid de Palestrantes com Fotos Enigmáticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {palestrantes.map((palestrante, index) => (
            <div
              key={index}
              className={`bg-slate-900/60 border ${palestrante.borda} rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col group backdrop-blur-md`}
            >
              {/* Imagem Teaser / Sem Rosto */}
              <div className="relative aspect-video sm:aspect-[16/10] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={palestrante.imagem}
                  alt={`Palestrante ${palestrante.nome}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />

                {/* Overlay gradiente escuro */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                {/* Badge de Teaser de Identidade */}
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 px-2.5 py-1 rounded-full text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>KEYNOTE CONFIRMADO</span>
                </div>

                {/* Badge da Área Técnica */}
                <div className="absolute bottom-3 left-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-900/90 border border-slate-700 text-slate-200">
                    {palestrante.tag}
                  </span>
                </div>
              </div>

              {/* Informações da Palestra */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {palestrante.nome}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-cyan-400 leading-snug">
                    "{palestrante.tema}"
                  </p>
                  <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                    {palestrante.bio}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs text-slate-500">
                  <span className="font-mono">Edição Presencial 2027</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* ===================== TIPOS DE INGRESSO (CARDS COMERCIAIS) ===================== */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
            PASSE DE ACESSO
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
            Escolha a Modalidade do Seu Ingresso
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Ambas as categorias garantem entrada total a todas as palestras e credenciamento oficial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Card Estudante */}
          <div className="bg-slate-900/60 border border-purple-500/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-purple-500/50 transition-all">
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-950/80 text-purple-300 border border-purple-500/30">
                Acesso Educacional
              </span>
              <h3 className="text-xl font-bold text-white mt-4">Ingresso Estudante</h3>
              <p className="text-xs text-slate-400 mt-1">
                Destinado a estudantes de graduação, pós-graduação e cursos técnicos.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Acesso completo a todas as palestras
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Certificado digital de 8 horas
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Coffee breaks e kit de credenciamento
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Participação no networking aberto
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <Link
                to="/inscricao?tipo=estudante"
                className="w-full inline-block text-center py-3 rounded-lg font-bold text-sm bg-purple-600 hover:bg-purple-500 text-white transition-colors"
              >
                Inscrever-se como Estudante
              </Link>
            </div>
          </div>

          {/* Card Profissional (Destaque) */}
          <div className="bg-slate-900/90 border-2 border-cyan-500/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_30px_rgba(6,182,212,0.15)] relative">
            <div className="absolute -top-3 right-6 bg-cyan-400 text-black text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
              Mais Escolhido
            </div>

            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                Profissionais & Líderes
              </span>
              <h3 className="text-xl font-bold text-white mt-4">Ingresso Profissional</h3>
              <p className="text-xs text-slate-400 mt-1">
                Para desenvolvedores, engenheiros de software, consultores e líderes técnicos.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span> Acesso total à programação do evento
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span> Certificado profissional de participação
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span> Coffee break premium & Happy hour exclusivo
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span> Acesso à rede de recrutamento de empresas parceiras
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <Link
                to="/inscricao?tipo=profissional"
                className="w-full inline-block text-center py-3 rounded-lg font-bold text-sm bg-cyan-400 hover:bg-cyan-300 text-black transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                Inscrever-se como Profissional
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== BANNER FINAL DE CONVERSÃO ===================== */}
      <section className="text-center bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-slate-900/60 border border-cyan-500/30 rounded-2xl p-8 sm:p-12 shadow-[0_0_40px_rgba(6,182,212,0.1)]">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
          Pronto para Acelerar sua Carreira na Web?
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          As vagas para a edição presencial são limitadas à capacidade do Centro de Convenções Atlântico. Garanta sua vaga hoje mesmo.
        </p>
        <div className="mt-6">
          <Link
            to="/inscricao"
            className="inline-block px-8 py-3.5 rounded-xl font-bold text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all"
          >
            Fazer Inscrição Agora
          </Link>
        </div>
      </section>
    </div>
  );
}
