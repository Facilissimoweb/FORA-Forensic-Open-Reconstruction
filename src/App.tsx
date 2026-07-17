import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  ChevronRight, 
  ChevronDown, 
  Cpu, 
  Search, 
  Layers, 
  GitBranch, 
  HelpCircle, 
  MapPin, 
  CornerRightDown, 
  Scale, 
  Clock, 
  CheckCircle, 
  ArrowUpRight,
  Database,
  Smartphone,
  Check,
  X,
  Mail,
  User,
  Building,
  Phone,
  MessageSquare,
  Sparkles,
  Send,
  Trash2
} from 'lucide-react';
import { EvidenceMarker, Trajectory } from './types';
import Forensic3DWorkspace from './components/Forensic3DWorkspace';
import { translations, Language } from './translations';

export default function App() {
  const [language, setLanguage] = useState<Language>('it');
  const t = translations[language];

  // Pre-loaded realistic sandbox case data
  const [markers, setMarkers] = useState<EvidenceMarker[]>([
    {
      id: 1,
      name: "Reperto #01",
      x: -1.8,
      y: 0.06,
      z: 1.4,
      tag: "Arma",
      description: "Arma semiautomatica calibro 9mm rinvenuta sul pavimento d'ingresso."
    },
    {
      id: 2,
      name: "Reperto #02",
      x: -0.8,
      y: 3.1,
      z: -4.38,
      tag: "Danno da Impatto",
      description: "Foro d'ingresso balistico rilevato sulla parete divisoria di fondo."
    },
    {
      id: 3,
      name: "Reperto #03",
      x: 0.2,
      y: 0.95,
      z: -0.3,
      tag: "DNA",
      description: "Traccia biologica salivare isolata su bicchiere di vetro sul tavolo."
    }
  ]);

  const [trajectories, setTrajectories] = useState<Trajectory[]>([
    {
      id: 1,
      startX: 1.2,
      startY: 1.8,
      startZ: 3.5,
      endX: -0.8,
      endY: 3.1,
      endZ: -4.38,
      angleAzimuth: -15.4,
      angleElevation: 18.2,
      confidence: 98.2,
      type: "Balistica"
    }
  ]);

  const [caseInfo, setCaseInfo] = useState({
    id: "982-F",
    title: "Ricostruzione Dinamica Interno Stanza",
    date: "2026-07-17",
    location: "Scena del Crimine - Sezione Rilievi",
    operator: "M. T. Rogani (Perito Forense)",
    description: "Rilievi metrici controllati e simulazione balistica inerenti all'esplosione di un colpo d'arma da fuoco in ambiente confinato. Analisi eseguita per verifica compatibilità posizioni testimoni."
  });

  // State for FAQ Accordions
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Contact form submission simulator
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    agency: '',
    phone: '',
    message: ''
  });

  // AI Forensic Chat States
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.name || !formFields.email) return;
    setFormSubmitted(true);
  };

  // Predefined Chat Questions
  const suggestedQuestions = {
    it: [
      "Che valore ha questa perizia in tribunale ai sensi della L. 397/2000?",
      "Analizza i reperti correnti in questo dossier forense.",
      "Come posso posizionare un reperto nel simulatore 3D?",
      "Spiega come interpretare l'elevazione e l'azimuth della traiettoria balistica."
    ],
    en: [
      "What is the court admissibility of this 3D scan under Italian law?",
      "Analyze the current evidence markers in this forensic file.",
      "How can I place an evidence marker in the 3D simulator?",
      "Explain how to interpret the elevation and azimuth of the ballistic trajectory."
    ],
    es: [
      "¿Qué admisibilidad judicial tiene esta pericia 3D según la ley?",
      "Analiza las evidencias actuales registradas en este expediente.",
      "¿Cómo puedo colocar un testigo de evidencia en el simulador 3D?",
      "Explica cómo interpretar la elevación y azimuth de la trayectoria balística."
    ]
  };

  const handleSendChatMessage = async (customText?: string) => {
    const textToSend = customText || chatInput;
    if (!textToSend.trim() || chatLoading) return;

    const userText = textToSend.trim();
    if (!customText) setChatInput('');

    const newMessages = [...chatMessages, { role: 'user' as const, content: userText }];
    setChatMessages(newMessages);
    setChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
          activeLanguage: language,
          contextData: {
            caseInfo,
            markers,
            trajectories
          }
        })
      });

      if (!response.ok) {
        throw new Error('Chat request failed');
      }

      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'assistant' as const, content: data.text }]);
    } catch (error) {
      console.error(error);
      const errMsg = language === 'it' 
        ? 'Errore di connessione con il consulente scientifico AI. Riprova più tardi.' 
        : language === 'es'
        ? 'Error de conexión con el asistente científico de IA. Inténtelo más tarde.'
        : 'Connection error with the AI scientific assistant. Please try again later.';
      setChatMessages(prev => [...prev, { role: 'assistant' as const, content: errMsg }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Auto-scroll chat history
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, chatLoading, chatOpen]);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-emerald-500 selection:text-slate-950 scroll-smooth">
      
      {/* 1. TOP STICKY NAVBAR */}
      <header className="fixed top-0 left-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-900 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo brand info */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-emerald-500 to-teal-600 text-slate-950 p-2 rounded-xl font-bold flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-black tracking-wider bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">FORA</span>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-500/20 font-mono">V1.4.2</span>
              </div>
              <span className="text-[10px] block text-slate-400 font-mono tracking-tighter">Forensic Open Reconstruction & Analysis</span>
            </div>
          </div>

          {/* Navigation Anchors */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-wider text-slate-400">
            <a href="#vision" className="hover:text-emerald-400 transition-colors">{t.nav.vision}</a>
            <a href="#pipeline" className="hover:text-emerald-400 transition-colors">{t.nav.pipeline}</a>
            <a href="#demo" className="text-emerald-400 flex items-center space-x-1 font-extrabold hover:text-emerald-300 transition-all">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {t.nav.demo}
            </a>
            <a href="#market" className="hover:text-emerald-400 transition-colors">{t.nav.market}</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">{t.nav.faq}</a>
          </nav>

          {/* Fast interactive CTA & Language Switcher */}
          <div className="flex items-center space-x-3">
            
            {/* Elegant Language Switcher */}
            <div className="flex items-center bg-slate-900 border border-slate-850 rounded-lg p-0.5 text-[10px] font-mono shadow-inner mr-1">
              {(['it', 'en', 'es'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-1.5 py-0.5 rounded uppercase font-black transition-all cursor-pointer ${
                    language === lang 
                      ? 'bg-emerald-500 text-slate-950 font-extrabold' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <a 
              href="#demo" 
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase transition-all shadow-lg shadow-emerald-500/20 hover:scale-102 flex items-center space-x-1"
            >
              <span>{t.nav.cta}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>

        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        {/* Ambient grids and futuristic circles */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/20 via-slate-950 to-slate-950 -z-10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          
          {/* Tag badge info */}
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-8 uppercase tracking-widest">
            <Scale className="h-3.5 w-3.5 mr-1.5 text-emerald-500" />
            {t.hero.badge}
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            {t.hero.title1}<br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">{t.hero.titleHighlight}</span>
          </h1>

          <p className="max-w-3xl mx-auto text-sm sm:text-lg text-slate-400 mb-10 leading-relaxed font-sans">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
            <a 
              href="#demo" 
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center space-x-2 border border-emerald-400/20 hover:scale-102"
            >
              <Cpu className="h-4.5 w-4.5" />
              <span>{t.hero.ctaDemo}</span>
            </a>
            <a 
              href="#pipeline" 
              className="w-full sm:w-auto border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-300 px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
            >
              <GitBranch className="h-4.5 w-4.5 text-slate-500" />
              <span>{t.hero.ctaPipeline}</span>
            </a>
          </div>

          {/* Quick telemetry indicators below buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-8 border-t border-slate-900/60 text-left">
            <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{t.hero.grid1_title}</span>
              <span className="text-xs font-bold text-white block">{t.hero.grid1_val}</span>
            </div>
            <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{t.hero.grid2_title}</span>
              <span className="text-xs font-bold text-white block">{t.hero.grid2_val}</span>
            </div>
            <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{t.hero.grid3_title}</span>
              <span className="text-xs font-bold text-white block">{t.hero.grid3_val}</span>
            </div>
            <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{t.hero.grid4_title}</span>
              <span className="text-xs font-bold text-white block">{t.hero.grid4_val}</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. VISION SECTION */}
      <section id="vision" className="py-24 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">{t.vision.badge}</span>
            <h2 className="text-3xl font-black text-white mt-2 leading-tight">{t.vision.title}</h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
              {t.vision.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/60 p-8 rounded-2xl relative hover:border-emerald-500/20 transition-all group">
              <div className="h-10 w-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-extrabold text-white mb-3 group-hover:text-emerald-400 transition-colors">{t.vision.feat1_title}</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {t.vision.feat1_desc}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/60 p-8 rounded-2xl relative hover:border-emerald-500/20 transition-all group">
              <div className="h-10 w-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-extrabold text-white mb-3 group-hover:text-emerald-400 transition-colors">{t.vision.feat2_title}</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {t.vision.feat2_desc}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/60 p-8 rounded-2xl relative hover:border-emerald-500/20 transition-all group">
              <div className="h-10 w-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-extrabold text-white mb-3 group-hover:text-emerald-400 transition-colors">{t.vision.feat3_title}</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {t.vision.feat3_desc}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. THE PIPELINE SECTION */}
      <section id="pipeline" className="py-24 bg-slate-900/30 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">{t.pipeline.badge}</span>
            <h2 className="text-3xl font-black text-white mt-2">{t.pipeline.title}</h2>
            <p className="mt-4 text-slate-400 text-sm">
              {t.pipeline.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between relative">
              <div className="absolute -top-4 left-6 bg-slate-900 text-emerald-400 border border-slate-800 px-3 py-1 text-xs font-black font-mono rounded-md">
                FASE 01
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-extrabold text-white">{t.pipeline.step1_title}</h3>
                  <span className="text-xs font-mono text-slate-500">{t.pipeline.step1_sub}</span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {t.pipeline.step1_desc}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-900/60 flex items-center space-x-2 text-[11px] font-mono text-slate-500">
                <Clock className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
                <span>{t.pipeline.step1_out}</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between relative">
              <div className="absolute -top-4 left-6 bg-slate-900 text-emerald-400 border border-slate-800 px-3 py-1 text-xs font-black font-mono rounded-md">
                FASE 02
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-extrabold text-white">{t.pipeline.step2_title}</h3>
                  <span className="text-xs font-mono text-slate-500">{t.pipeline.step2_sub}</span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {t.pipeline.step2_desc}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-900/60 flex items-center space-x-2 text-[11px] font-mono text-slate-500">
                <Database className="h-3.5 w-3.5 text-emerald-500" />
                <span>{t.pipeline.step2_out}</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between relative">
              <div className="absolute -top-4 left-6 bg-slate-900 text-emerald-400 border border-slate-800 px-3 py-1 text-xs font-black font-mono rounded-md">
                FASE 03
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-extrabold text-white">{t.pipeline.step3_title}</h3>
                  <span className="text-xs font-mono text-slate-500">{t.pipeline.step3_sub}</span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {t.pipeline.step3_desc}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-900/60 flex items-center space-x-2 text-[11px] font-mono text-slate-500">
                <Smartphone className="h-3.5 w-3.5 text-emerald-500" />
                <span>{t.pipeline.step3_out}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE DEMO (THE 3D WORKSPACE) */}
      <section id="demo" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">{t.workspace.badge}</span>
            <h2 className="text-3xl font-black text-white mt-2 leading-tight">{t.workspace.title}</h2>
            <p className="mt-4 text-slate-400 text-sm">
              {t.workspace.description}
            </p>
          </div>

          {/* Embedded workspace */}
          <Forensic3DWorkspace 
            markers={markers}
            setMarkers={setMarkers}
            trajectories={trajectories}
            setTrajectories={setTrajectories}
            caseInfo={caseInfo}
            setCaseInfo={setCaseInfo}
            activeLanguage={language}
          />

        </div>
      </section>

      {/* 6. COMPETITOR & ADVANTAGES SECTION */}
      <section id="market" className="py-24 bg-slate-900/30 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">{t.table.badge}</span>
            <h2 className="text-3xl font-black text-white mt-2">{t.table.title}</h2>
            <p className="mt-4 text-slate-400 text-sm">
              {t.table.description}
            </p>
          </div>

          {/* Table container */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">{t.table.col_factor}</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">{t.table.col_prop}</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/5 font-mono">{t.table.col_fora}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-xs sm:text-sm">
                
                <tr>
                  <td className="p-5 font-bold text-white">{t.table.row1_title}</td>
                  <td className="p-5 text-slate-400">
                    <span className="text-rose-400 font-semibold block mb-1">{language === 'it' ? 'Debole in Controinterrogatorio' : language === 'es' ? 'Débil en contrainterrogatorios' : 'Weak in cross-examination'}</span>
                    {t.table.row1_prop}
                  </td>
                  <td className="p-5 text-emerald-300 bg-emerald-500/5 font-semibold">
                    <span className="text-emerald-400 font-black block mb-1">{t.table.row1_fora}</span>
                    {t.table.row1_fora_sub}
                  </td>
                </tr>

                <tr>
                  <td className="p-5 font-bold text-white">{t.table.row2_title}</td>
                  <td className="p-5 text-slate-400">
                    <span className="text-rose-400 font-semibold block mb-1">{language === 'it' ? 'Costi Proibitivi (> 15.000€)' : language === 'es' ? 'Costes prohibitivos (> 15.000€)' : 'Prohibitive costs (> €15,000)'}</span>
                    {t.table.row2_prop}
                  </td>
                  <td className="p-5 text-emerald-300 bg-emerald-500/5 font-semibold">
                    <span className="text-emerald-400 font-black block mb-1">{t.table.row2_fora}</span>
                    {t.table.row2_fora_sub}
                  </td>
                </tr>

                <tr>
                  <td className="p-5 font-bold text-white">{t.table.row3_title}</td>
                  <td className="p-5 text-slate-400">
                    <span className="text-rose-400 font-semibold block mb-1">{language === 'it' ? 'Complessa e Specialistica' : language === 'es' ? 'Compleja y muy especializada' : 'Complex and highly specialized'}</span>
                    {t.table.row3_prop}
                  </td>
                  <td className="p-5 text-emerald-300 bg-emerald-500/5 font-semibold">
                    <span className="text-emerald-400 font-black block mb-1">{t.table.row3_fora}</span>
                    {t.table.row3_fora_sub}
                  </td>
                </tr>

                <tr>
                  <td className="p-5 font-bold text-white">{t.table.row4_title}</td>
                  <td className="p-5 text-slate-400">
                    <span className="text-rose-400 font-semibold block mb-1">{language === 'it' ? 'Scarsa ed Estremamente Pesante' : language === 'es' ? 'Baja portabilidad' : 'Poor and extremely heavy files'}</span>
                    {t.table.row4_prop}
                  </td>
                  <td className="p-5 text-emerald-300 bg-emerald-500/5 font-semibold">
                    <span className="text-emerald-400 font-black block mb-1">{t.table.row4_fora}</span>
                    {t.table.row4_fora_sub}
                  </td>
                </tr>

                <tr>
                  <td className="p-5 font-bold text-white">{t.table.row5_title}</td>
                  <td className="p-5 text-slate-400">
                    <span className="text-rose-400 font-semibold block mb-1">{language === 'it' ? 'Dipendente da Cloud' : language === 'es' ? 'Dependiente de la nube' : 'Cloud dependent'}</span>
                    {t.table.row5_prop}
                  </td>
                  <td className="p-5 text-emerald-300 bg-emerald-500/5 font-semibold">
                    {t.table.row5_fora}
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 7. FAQ ACCORDION SECTION */}
      <section id="faq" className="py-24 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">{t.faqSection.badge}</span>
            <h2 className="text-3xl font-black text-white mt-2">{t.faqSection.title}</h2>
            <p className="mt-4 text-slate-400 text-sm">
              {t.faqSection.description}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {t.faqSection.questions.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-slate-900/40 border border-slate-850 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex justify-between items-center space-x-4 focus:outline-none cursor-pointer"
                  >
                    <span className="font-bold text-white text-sm sm:text-base">{faq.q}</span>
                    <span className="shrink-0 p-1 bg-slate-950 border border-slate-800 rounded-lg text-slate-400">
                      {isOpen ? <ChevronDown className="h-4 w-4 rotate-180 transition-transform" /> : <ChevronDown className="h-4 w-4 transition-transform" />}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 border-t border-slate-900/60">
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. INTERACTIVE CONTACT FORM SECTION */}
      <section className="py-24 bg-slate-900/20 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Context/Brand Info column */}
            <div className="space-y-6">
              <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">{t.contact.badge}</span>
              <h2 className="text-3xl font-black text-white leading-tight">{t.contact.title}</h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {t.contact.description}
              </p>
              
              <div className="space-y-4 pt-4 border-t border-slate-900">
                <div className="flex items-center space-x-3 text-xs text-slate-400">
                  <MapPin className="h-4 w-4 text-emerald-500" />
                  <span>{t.contact.info_title}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-400">
                  <Mail className="h-4 w-4 text-emerald-500" />
                  <span>{t.contact.info_email}</span>
                </div>
              </div>
            </div>

            {/* Interactive Form column */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-emerald-400 animate-bounce" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">{t.contact.form_success_title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                    {t.contact.form_success_desc} <strong className="text-white">{formFields.email}</strong>
                  </p>
                  <button 
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormFields({ name: '', email: '', agency: '', phone: '', message: '' });
                    }}
                    className="mt-6 text-xs text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
                  >
                    {t.contact.form_success_btn}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2 mb-2">
                    <Scale className="h-4.5 w-4.5 text-emerald-500" />
                    <span>{t.contact.form_title}</span>
                  </h3>
                  
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{t.contact.label_name}</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                      <input 
                        type="text" 
                        required
                        value={formFields.name}
                        onChange={e => setFormFields(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-300"
                        placeholder={t.contact.placeholder_name}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{t.contact.label_email}</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                        <input 
                          type="email" 
                          required
                          value={formFields.email}
                          onChange={e => setFormFields(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-300"
                          placeholder={t.contact.placeholder_email}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{t.contact.label_phone}</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                        <input 
                          type="tel" 
                          value={formFields.phone}
                          onChange={e => setFormFields(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-300"
                          placeholder={t.contact.placeholder_phone}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{t.contact.label_agency}</label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                      <input 
                        type="text" 
                        value={formFields.agency}
                        onChange={e => setFormFields(prev => ({ ...prev, agency: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-300"
                        placeholder={t.contact.placeholder_agency}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{t.contact.label_message}</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                      <textarea 
                        rows={3}
                        value={formFields.message}
                        onChange={e => setFormFields(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-300"
                        placeholder={t.contact.placeholder_message}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    {t.contact.btn_submit}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 9. THE FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-center pb-8 border-b border-slate-900/60 mb-8">
            <div className="flex items-center space-x-3 mb-6 sm:mb-0">
              <div className="bg-emerald-500 text-slate-950 p-2 rounded-xl font-bold">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-white">FORA Suite</span>
                <span className="text-xs block text-slate-500 font-mono">Open-Source Digital Forensic Science</span>
              </div>
            </div>
            
            <div className="flex space-x-6 text-xs text-slate-400 uppercase tracking-wider font-bold">
              <a href="#vision" className="hover:text-emerald-400 transition-colors">{t.nav.vision}</a>
              <a href="#pipeline" className="hover:text-emerald-400 transition-colors">{t.nav.pipeline}</a>
              <a href="#demo" className="hover:text-emerald-400 transition-colors">{t.nav.demo}</a>
              <a href="#market" className="hover:text-emerald-400 transition-colors">{t.nav.market}</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 font-mono">
            <p>&copy; 2026 FORA System Inc. {language === 'it' ? 'Tutti i diritti riservati. Soluzione Enterprise per la Ricostruzione Forense.' : language === 'es' ? 'Todos los derechos reservados. Solución Enterprise para la Reconstrucción Forense.' : 'All rights reserved. Enterprise Solution for Forensic Reconstruction.'}</p>
            <p className="mt-2 sm:mt-0">{language === 'it' ? 'Sviluppato in Italia con rigore scientifico e trasparenza tecnologica.' : language === 'es' ? 'Desarrollado en Italia con rigor científico y transparencia tecnológica.' : 'Developed in Italy with scientific rigor and technological transparency.'}</p>
          </div>

        </div>
      </footer>

      {/* ======================================================= */}
      {/* 10. FLOATING AI FORENSIC ASSISTANT CHAT PANEL */}
      {/* ======================================================= */}
      
      {/* Chat toggle FAB */}
      <button 
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 hover:bg-emerald-400 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border border-emerald-300/30 cursor-pointer"
        title="Apri Assistente AI Forense"
      >
        {chatOpen ? <X className="h-6 w-6" /> : (
          <div className="relative">
            <MessageSquare className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-300"></span>
            </span>
          </div>
        )}
      </button>

      {/* Floating Chat Drawer/Card */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-[400px] max-w-[calc(100vw-2rem)] h-[580px] max-h-[80vh] bg-slate-950/95 border border-slate-800 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden backdrop-blur-md animate-fade-in-up">
          
          {/* Drawer Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-1.5 rounded-lg">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center">
                  {t.chat.title}
                  <span className="h-2 w-2 rounded-full bg-emerald-500 ml-2 animate-pulse" />
                </h4>
                <p className="text-[10px] text-slate-400 font-mono tracking-wide">{t.chat.subtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-[8px] bg-slate-800 text-emerald-400 border border-slate-700 px-1.5 py-0.5 rounded font-bold font-mono tracking-tighter">
                {t.chat.context_badge}
              </span>
              <button 
                onClick={() => setChatMessages([])} 
                className="p-1 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Cancella conversazione"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.length === 0 ? (
              <div className="h-full flex flex-col justify-center space-y-4 py-4 text-center">
                <div className="h-12 w-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6" />
                </div>
                <p className="text-xs text-slate-300 max-w-[280px] mx-auto leading-relaxed whitespace-pre-line">
                  {t.chat.empty_messages}
                </p>
                
                {/* Rapid-fire Questions chips */}
                <div className="space-y-2 pt-2 text-left max-w-[340px] mx-auto">
                  {suggestedQuestions[language].map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendChatMessage(q)}
                      className="w-full text-left bg-slate-900 hover:bg-slate-850 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-300 border border-slate-800 rounded-xl p-2.5 text-[11px] leading-snug transition-all cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {chatMessages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-start space-x-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role !== 'user' && (
                      <div className="bg-emerald-500 text-slate-950 p-1.5 rounded-lg shrink-0 mt-0.5 shadow shadow-emerald-500/10">
                        <Shield className="h-3.5 w-3.5" />
                      </div>
                    )}
                    <div className={`p-3 rounded-2xl text-xs max-w-[80%] leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-emerald-500 text-slate-950 font-semibold rounded-tr-none' 
                        : 'bg-slate-900 text-slate-200 border border-slate-850 rounded-tl-none whitespace-pre-line'
                    }`}>
                      {msg.content}
                    </div>
                    {msg.role === 'user' && (
                      <div className="bg-slate-800 text-slate-300 p-1.5 rounded-lg shrink-0 mt-0.5 shadow">
                        <User className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>
                ))}
                
                {chatLoading && (
                  <div className="flex items-start space-x-2.5 justify-start">
                    <div className="bg-emerald-500 text-slate-950 p-1.5 rounded-lg shrink-0 mt-0.5">
                      <Shield className="h-3.5 w-3.5 animate-pulse" />
                    </div>
                    <div className="bg-slate-900 border border-slate-850 p-3 rounded-2xl rounded-tl-none text-xs text-slate-400 italic">
                      {t.chat.typing}
                      <span className="inline-flex space-x-1 ml-2">
                        <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce delay-100"></span>
                        <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce delay-200"></span>
                        <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce delay-300"></span>
                      </span>
                    </div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </>
            )}
          </div>

          {/* Form Input Area */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendChatMessage(); }}
            className="p-3 bg-slate-900 border-t border-slate-850 flex items-center space-x-2"
          >
            <input 
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={t.chat.placeholder}
              disabled={chatLoading}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={!chatInput.trim() || chatLoading}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-2.5 rounded-xl transition-all shadow-md shadow-emerald-500/10 hover:scale-105 disabled:opacity-50 disabled:scale-100 cursor-pointer flex items-center justify-center shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
