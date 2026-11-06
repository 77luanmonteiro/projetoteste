import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Inscricao from './pages/Inscricao';
import Inscritos from './pages/Inscritos';

export default function App() {
  const location = useLocation();

  function getNavLinkClass(path) {
    const isActive = location.pathname === path;
    return `text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
    }`;
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Background ambient light effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[400px] bg-indigo-600/5 blur-[140px] pointer-events-none -z-10" />

      {/* Barra de Navegação Tecnológica */}
      <header className="sticky top-0 z-50 bg-[#0b0f19]/85 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-black text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] transition-all">
              W
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
              WebDev <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Summit</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 font-mono">2027</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1.5 sm:gap-2">
            <Link to="/" className={getNavLinkClass('/')}>
              Início
            </Link>
            <Link to="/inscricao" className={getNavLinkClass('/inscricao')}>
              Garantir Ingresso
            </Link>
            <Link to="/inscritos" className={getNavLinkClass('/inscritos')}>
              Participantes
            </Link>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inscricao" element={<Inscricao />} />
          <Route path="/inscritos" element={<Inscritos />} />
        </Routes>
      </main>

      {/* Rodapé Moderno */}
      <footer className="border-t border-slate-800/80 bg-[#070a11] py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>WebDev Summit 2027 • 13 de Março de 2027 • Centro de Convenções Atlântico</span>
          </div>
          <p className="text-slate-500">
            © 2027 WebDev Summit. O ponto de encontro de quem constrói o futuro da web.
          </p>
        </div>
      </footer>
    </div>
  );
}
