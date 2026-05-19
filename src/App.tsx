import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogOut, 
  CheckCircle2, 
  ChevronRight, 
  Users as UsersIcon, 
  BarChart3, 
  Vote, 
  UserCircle2,
  Lock,
  ArrowLeft,
  XCircle,
  Trophy
} from 'lucide-react';
import { USERS, CANDIDATES, type Candidate } from './data';

type View = 'login' | 'polls' | 'voting' | 'results';

interface VoteData {
  [username: string]: string[] | undefined;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [view, setView] = useState<View>('login');
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [allVotes, setAllVotes] = useState<VoteData>({});

  // Caricamento dati iniziali
  useEffect(() => {
    const savedVotes = localStorage.getItem('sondaggi_barcaccia_voti');
    if (savedVotes) {
      setAllVotes(JSON.parse(savedVotes));
    }
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!loginName) {
      setError('Seleziona il tuo nome');
      return;
    }
    if (password !== loginName) {
      setError('Password errata (deve essere uguale al nome)');
      return;
    }
    setCurrentUser(loginName);
    setView('polls');
    setError('');
    
    // Se l'utente ha già votato, pre-carichiamo le sue scelte nel sondaggio
    const userVotes = allVotes[loginName] || [];
    setSelectedIds(userVotes);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('login');
    setLoginName('');
    setPassword('');
  };

  const toggleCandidate = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : [...prev, id]
    );
  };

  const confirmVotes = () => {
    if (!currentUser) return;
    
    const updatedVotes: VoteData = {
      ...allVotes,
      [currentUser]: selectedIds
    };
    
    setAllVotes(updatedVotes);
    localStorage.setItem('sondaggi_barcaccia_voti', JSON.stringify(updatedVotes));
    setView('results');
  };

  // Calcolo statistiche
  const getCandidateVotes = (id: string) => {
    return Object.values(allVotes).filter((votes): votes is string[] => 
      Array.isArray(votes) && votes.includes(id)
    ).length;
  };

  const sortedCandidates = [...CANDIDATES].sort((a, b) => getCandidateVotes(b.id) - getCandidateVotes(a.id));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-black selection:text-white flex flex-col">
      {/* App Header */}
      {currentUser && (
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white rounded flex items-center justify-center font-bold text-xl">B</div>
            <h1 className="text-xl font-black tracking-tighter uppercase hidden sm:block">Sondaggi Barcaccia</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Sessione Attiva</p>
              <p className="text-sm font-black uppercase">{currentUser}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all border border-slate-200"
              title="Esci"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>
      )}

      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {view === 'login' && (
            <motion.div 
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-center min-h-screen p-4 bg-slate-50"
            >
              <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-200">
                <div className="bg-black p-10 text-center">
                  <div className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center font-black text-3xl mx-auto mb-6 shadow-xl">B</div>
                  <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Barcaccia</h1>
                  <p className="text-slate-500 text-[10px] mt-2 font-black tracking-[0.3em] uppercase">Private Access Only</p>
                </div>
                
                <form onSubmit={handleLogin} className="p-10 space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Membro</label>
                    <div className="relative">
                      <select 
                        title="Select User"
                        value={loginName}
                        onChange={(e) => setLoginName(e.target.value)}
                        className="w-full h-14 px-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-black transition-all appearance-none outline-none font-bold text-slate-700"
                      >
                        <option value="">Chi sei?</option>
                        {USERS.map(user => <option key={user} value={user}>{user}</option>)}
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <UserCircle2 className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Chiave</label>
                    <div className="relative">
                      <input 
                        type="password"
                        placeholder="Nome Utente (es. Simo)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-14 px-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-black transition-all outline-none font-bold"
                      />
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Lock className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs font-black uppercase tracking-tight text-center bg-red-50 py-3 rounded-xl border border-red-100">
                      {error}
                    </motion.div>
                  )}

                  <button 
                    type="submit"
                    className="w-full h-16 bg-black text-white font-black rounded-2xl hover:bg-slate-800 active:scale-95 transition-all shadow-xl shadow-slate-300 uppercase tracking-widest text-sm"
                  >
                    Entra nel Club
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {view === 'polls' && (
            <motion.div 
              key="polls"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 md:p-12 max-w-5xl mx-auto w-full"
            >
              <div className="mb-12">
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Workspace</h2>
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Dashboard</h1>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                  whileHover={{ y: -8, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  onClick={() => setView('voting')}
                  className="group bg-white p-10 rounded-[3rem] border border-slate-200 cursor-pointer transition-all shadow-sm flex flex-col justify-between min-h-[300px]"
                >
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <div className="p-5 bg-slate-900 text-white rounded-3xl shadow-lg ring-8 ring-slate-100 group-hover:scale-110 transition-transform">
                        <Vote className="w-8 h-8" />
                      </div>
                      <span className="px-4 py-1.5 bg-slate-100 text-black text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-200">Sessione Aperta</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4 leading-tight tracking-tighter">Chi bisogna cacciare dalla Juventus?</h3>
                    <p className="text-slate-500 font-medium text-sm">Epurazione totale dei rami secchi. Vota per la rivoluzione.</p>
                  </div>
                  <div className="mt-8 flex items-center text-xs font-black text-black group-hover:translate-x-2 transition-transform">
                    VOTA ORA <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -8, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  onClick={() => setView('results')}
                  className="group bg-white p-10 rounded-[3rem] border border-slate-200 cursor-pointer transition-all shadow-sm flex flex-col justify-between min-h-[300px]"
                >
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <div className="p-5 bg-white border-2 border-slate-100 rounded-3xl shadow-sm group-hover:border-black transition-colors">
                        <BarChart3 className="w-8 h-8 text-slate-400 group-hover:text-black transition-colors" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4 leading-tight tracking-tighter">Risultati Live</h3>
                    <p className="text-slate-500 font-medium text-sm">Analisi delle preferenze dei membri e conteggi finali.</p>
                  </div>
                  <div className="mt-8 flex items-center text-xs font-black text-slate-400 group-hover:text-black transition-colors group-hover:translate-x-2 transition-transform">
                    CONSULTA <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {view === 'voting' && (
            <motion.div 
              key="voting"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 md:p-12 max-w-6xl mx-auto w-full pb-40"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-10 mb-12">
                <div>
                  <button onClick={() => setView('polls')} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest mb-6 hover:text-black transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Indietro
                  </button>
                  <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4 leading-none uppercase">Votazione</h1>
                  <p className="text-slate-500 font-medium">Seleziona tutti i profili che ritieni debbano lasciare il club.</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-16">
                {(['Dirigente', 'Giocatore'] as const).map(category => (
                  <div key={category} className="space-y-8">
                    <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
                      <h3 className="text-xl font-black uppercase tracking-tighter italic">
                        {category === 'Dirigente' ? 'Area Dirigenziale' : 'Area Tecnica'}
                      </h3>
                      <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
                        {CANDIDATES.filter(c => c.category === category).length} Profili
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {CANDIDATES.filter(c => c.category === category).map(c => (
                        <div 
                          key={c.id}
                          onClick={() => toggleCandidate(c.id)}
                          className={`flex items-center gap-4 p-4 border-2 rounded-2xl transition-all cursor-pointer group ${
                            selectedIds.includes(c.id) 
                              ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200' 
                              : 'bg-white border-slate-100 hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-all ${
                            selectedIds.includes(c.id) ? 'bg-white border-white text-black' : 'border-slate-200 bg-slate-50'
                          }`}>
                            {selectedIds.includes(c.id) && <CheckCircle2 className="w-4 h-4" />}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-black truncate">{c.name}</span>
                            <span className={`text-[10px] uppercase font-bold truncate ${selectedIds.includes(c.id) ? 'text-slate-400' : 'text-slate-400'}`}>
                              {c.role}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="fixed bottom-0 left-0 right-0 p-8 bg-slate-50/80 backdrop-blur-3xl border-t border-slate-200 flex justify-center z-50">
                <button 
                  onClick={confirmVotes}
                  className="w-full max-w-2xl h-16 bg-black text-white font-black text-lg rounded-full shadow-2xl shadow-slate-400 active:scale-95 transition-all flex items-center justify-center gap-4 uppercase tracking-widest"
                >
                  Conferma Voti ({selectedIds.length})
                  <CheckCircle2 className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          )}

          {view === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 md:p-12 max-w-6xl mx-auto w-full pb-24"
            >
              <div className="flex justify-between items-center mb-12">
                <button onClick={() => setView('polls')} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-black transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Dashboard
                </button>
                <div className="text-right">
                  <h1 className="text-4xl font-black tracking-tighter uppercase italic">Risultati Live</h1>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Aggiornati in tempo reale</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-10">
                {/* Panel di Sinistra: Leaderboard */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-16 -translate-y-16 -z-1" />
                    <h2 className="text-2xl font-black mb-8 flex items-center gap-4 tracking-tight">
                      <Trophy className="w-8 h-8 text-black" /> I PIÙ VOTATI
                    </h2>
                    
                    <div className="space-y-6">
                      {sortedCandidates.slice(0, 8).map((c, index) => {
                        const votes = getCandidateVotes(c.id);
                        const percentage = (votes / USERS.length) * 100;
                        if (votes === 0) return null;

                        return (
                          <div key={c.id} className="relative group">
                            <div className="flex justify-between items-end mb-3">
                              <div className="flex items-center gap-5">
                                <span className="text-slate-200 font-black text-4xl italic group-hover:text-black transition-colors">0{index + 1}</span>
                                <div>
                                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{c.role}</div>
                                  <div className="text-xl font-black tracking-tight">{c.name}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-3xl font-black italic tabular-nums leading-none">{votes}</div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">VOTI</div>
                              </div>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                className="h-full bg-black rounded-full"
                              />
                            </div>
                          </div>
                        );
                      })}
                      {sortedCandidates.filter(c => getCandidateVotes(c.id) > 0).length === 0 && (
                        <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                          <p className="text-slate-400 font-black italic uppercase tracking-widest">Nessun voto registrato ancora</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Panel di Destra: Activity */}
                <div className="space-y-6">
                  <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl shadow-slate-400">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-8 border-b border-white/10 pb-4">Attività Membri</h3>
                    <div className="space-y-8">
                      {USERS.map(user => {
                        const userVotes = allVotes[user] || [];
                        return (
                          <div key={user} className="relative pl-6 border-l-2 border-white/10">
                            <div className="flex justify-between items-center mb-3">
                              <span className="font-black italic text-lg">{user}</span>
                              <span className="h-2 w-2 bg-green-500 rounded-full shadow-[0_0_10px_rgb(34,197,94)]" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {userVotes.length > 0 ? (
                                userVotes.map(id => {
                                  const c = CANDIDATES.find(kan => kan.id === id);
                                  return (
                                    <span key={id} className="text-[10px] font-black px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-300">
                                      {c?.name}
                                    </span>
                                  );
                                })
                              ) : (
                                <span className="text-[10px] font-bold text-slate-600 italic uppercase">In attesa di voto...</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Status Bar */}
      <footer className="bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-auto">
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>DB: Sincronizzato</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-slate-900 rounded-full" />
            <span>Membri: {Object.keys(allVotes).length}/{USERS.length}</span>
          </div>
        </div>
        <div className="hidden sm:block">
          Sondaggi Barcaccia v1.2.0 • 2026 Edition
        </div>
      </footer>
    </div>
  );
}
