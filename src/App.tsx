import React, { useState } from 'react';
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
  MessageSquare
} from 'lucide-react';
import { EvidenceMarker, Trajectory } from './types';
import Forensic3DWorkspace from './components/Forensic3DWorkspace';

export default function App() {
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.name || !formFields.email) return;
    setFormSubmitted(true);
  };

  // FAQ mock database
  const faqs = [
    {
      q: "Le ricostruzioni 3D e AR di FORA sono legalmente ammissibili in un tribunale italiano?",
      a: "Sì, l'art. 397/2000 del codice di procedura penale inerente alle indagini difensive e la giurisprudenza corrente ammettono la presentazione di prove digitali, animazioni e rilievi geometrici in aula. Il fattore determinante di FORA è la totale trasparenza scientifica: l'uso di algoritmi open-source verificabili consente ai periti delle controparti di controllare le formule matematiche usate, evitando contestazioni su scatole nere proprietarie."
    },
    {
      q: "In che modo viene garantita la precisione metrica delle scansioni?",
      a: "La precisione millimetrica 1:1 viene stabilita tramite l'introduzione nella fotorilevazione di un oggetto a dimensione nota (es. barra di calibrazione metallica o marker certificati). Durante la pipeline di calibrazione spaziale in Blender, gli assi geometrici vengono riscalati secondo questa proporzione aurea, certificando che ogni misurazione lineare, volumetrica o angolare corrisponda rigorosamente allo spazio reale."
    },
    {
      q: "L'applicazione supporta i rilievi effettuati tramite sensori LiDAR degli smartphone?",
      a: "Assolutamente. FORA adotta una flessibilità di pipeline agnostica. È possibile importare ed allineare nuvole di punti (.PLY, .OBJ) ottenute direttamente dai sensori LiDAR nativi di smartphone e tablet (es. iPad Pro, iPhone Pro) o da laser scanner industriali fissi, offrendo un'eccellente precisione sul campo senza richiedere attrezzatura ingombrante."
    },
    {
      q: "Qual è il vantaggio di usare la combinazione Meshroom - Blender - Godot?",
      a: "Questa pipeline fonde il top dei tre mondi: Meshroom esegue una fotogrammetria automatica, affidabile e open-source sui pixel fotografici. Blender ottimizza e calibra la mesh con precisione millimetrica. Godot Engine (FORA Core) consente un'esplorazione 3D e un rendering interattivo a frame rate elevatissimo sul web o in visori AR portatili, fornendo l'ideale per i giudici per camminare virtualmente nella scena."
    },
    {
      q: "Come vengono protetti i dati sensibili delle indagini?",
      a: "La privacy è una priorità assoluta per le indagini penali. Per questo motivo, la suite software FORA è progettata per girare interamente On-Premise. I dati fotogrammetrici, le informazioni sui casi e i modelli 3D vengono elaborati localmente sulle macchine dell'ufficio peritale o della procura, senza inviare dati sensibili a server cloud esterni o di terze parti."
    }
  ];

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
            <a href="#vision" className="hover:text-emerald-400 transition-colors">Visione</a>
            <a href="#pipeline" className="hover:text-emerald-400 transition-colors">La Pipeline</a>
            <a href="#demo" className="text-emerald-400 flex items-center space-x-1 font-extrabold hover:text-emerald-300 transition-all">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Laboratorio 3D
            </a>
            <a href="#market" className="hover:text-emerald-400 transition-colors">Vantaggi & Mercato</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
          </nav>

          {/* Fast interactive CTA */}
          <div className="flex items-center space-x-3">
            <a 
              href="#demo" 
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase transition-all shadow-lg shadow-emerald-500/20 hover:scale-102 flex items-center space-x-1"
            >
              <span>Avvia Demo</span>
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
            La Suite Scientifica Trasparente per l'Ingegneria Forense
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            Ricostruisci la scena del crimine<br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">in 3D e Realtà Aumentata</span>
          </h1>

          <p className="max-w-3xl mx-auto text-sm sm:text-lg text-slate-400 mb-10 leading-relaxed font-sans">
            FORA è l'ecosistema enterprise chiavi in mano che converte fotorilevazioni bidimensionali in modelli tridimensionali matematicamente inoppugnabili. Offriamo a procure, periti, investigatori e tribunali la massima usabilità unita alla totale trasparenza scientifica dei nostri algoritmi core open-source.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
            <a 
              href="#demo" 
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center space-x-2 border border-emerald-400/20 hover:scale-102"
            >
              <Cpu className="h-4.5 w-4.5" />
              <span>Simulatore Interattivo</span>
            </a>
            <a 
              href="#pipeline" 
              className="w-full sm:w-auto border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-300 px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
            >
              <GitBranch className="h-4.5 w-4.5 text-slate-500" />
              <span>Scopri il Workflow</span>
            </a>
          </div>

          {/* Quick telemetry indicators below buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-8 border-t border-slate-900/60 text-left">
            <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Integrità Scientifica</span>
              <span className="text-xs font-bold text-white block">100% Open Algorithms</span>
            </div>
            <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Risoluzione Spaziale</span>
              <span className="text-xs font-bold text-white block">Calibrazione Metrica 1:1</span>
            </div>
            <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Codice Procedura Penale</span>
              <span className="text-xs font-bold text-white block">Conforme L. 397/2000</span>
            </div>
            <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Architettura Sicura</span>
              <span className="text-xs font-bold text-white block">Elaborazione On-Premise</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. VISION SECTION */}
      <section id="vision" className="py-24 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">Un Nuovo Standard Legale</span>
            <h2 className="text-3xl font-black text-white mt-2 leading-tight">La rivoluzione digitale nei tribunali</h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
              La conservazione e l'analisi della scena del crimine sono passaggi critici e irreversibili. FORA supera la frammentazione delle classiche relazioni periziali cartacee, offrendo una replica spaziale fissa, navigabile e misurabile all'infinito.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/60 p-8 rounded-2xl relative hover:border-emerald-500/20 transition-all group">
              <div className="h-10 w-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-extrabold text-white mb-3 group-hover:text-emerald-400 transition-colors">Da Foto Statiche a Mesh 3D</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Gli algoritmi avanzati estraggono le coordinate spaziali da normali fotografie digitali effettuate con qualsiasi smartphone o fotocamera reflex, riposizionando i pixel in un volume tridimensionale accurato.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/60 p-8 rounded-2xl relative hover:border-emerald-500/20 transition-all group">
              <div className="h-10 w-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-extrabold text-white mb-3 group-hover:text-emerald-400 transition-colors">Precisione Millimetrica 1:1</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Attraverso l'uso di marker metrici sul campo, la scena virtuale viene agganciata a valori spaziali reali. È possibile calcolare distanze reciproche, altezze dei punti d'impatto e volumi dei corpi.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/60 p-8 rounded-2xl relative hover:border-emerald-500/20 transition-all group">
              <div className="h-10 w-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-extrabold text-white mb-3 group-hover:text-emerald-400 transition-colors">Ispezione Immersiva AR</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Permette a giudici, pubblici ministeri e avvocati di immergersi direttamente nella scena del crimine proiettandola in AR su un tavolo o navigandola tramite visori VR, valutando le visuali esatte dei testimoni.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. THE PIPELINE SECTION */}
      <section id="pipeline" className="py-24 bg-slate-900/30 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">Integrazione Tecnologica Sinergica</span>
            <h2 className="text-3xl font-black text-white mt-2">La Catena di Elaborazione Forense</h2>
            <p className="mt-4 text-slate-400 text-sm">
              FORA non costringe il perito ad abbandonare gli strumenti scientifici consolidati. Ha integrato e ottimizzato un flusso operativo trasparente per convertire i dati grezzi in prove inoppugnabili.
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
                  <h3 className="text-lg font-extrabold text-white">Meshroom</h3>
                  <span className="text-xs font-mono text-slate-500">AliceVision core</span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  Il software open-source leader per la fotogrammetria. Analizza la correlazione geometrica tra i pixel delle fotorilevazioni aeree o terrestri ed elabora la nuvola di punti della scena (Point Cloud) estraendo le mesh strutturali del terreno e delle pareti (.OBJ, .PLY).
                </p>
              </div>
              <div className="pt-4 border-t border-slate-900/60 flex items-center space-x-2 text-[11px] font-mono text-slate-500">
                <Clock className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
                <span>Output: Nuvola di Punti 3D Georeferenziata</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between relative">
              <div className="absolute -top-4 left-6 bg-slate-900 text-emerald-400 border border-slate-800 px-3 py-1 text-xs font-black font-mono rounded-md">
                FASE 02
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-extrabold text-white">Blender</h3>
                  <span className="text-xs font-mono text-slate-500">Calibrazione Metrica</span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  Importa le mesh grezze per la rifinitura strutturale. L'operatore identifica i marker metrici posizionati sul campo e imposta il fattore di scala reale 1:1. Rimuove elementi poligonali di disturbo e ottimizza i materiali fotografici (Texture mapping) per un'analisi fluida.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-900/60 flex items-center space-x-2 text-[11px] font-mono text-slate-500">
                <Database className="h-3.5 w-3.5 text-emerald-500" />
                <span>Output: Scena 3D Calibrata Metrico-Sensibile</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between relative">
              <div className="absolute -top-4 left-6 bg-slate-900 text-emerald-400 border border-slate-800 px-3 py-1 text-xs font-black font-mono rounded-md">
                FASE 03
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-extrabold text-white">Godot Engine</h3>
                  <span className="text-xs font-mono text-slate-500">FORA Core SDK</span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  La scena finale viene caricata all'interno del motore di runtime interattivo FORA. In questa fase l'utente può navigare la scena col mouse o in AR, inserire e catalogare i reperti, disegnare traiettorie balistiche ed esportare il report asseverato per la stampa.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-900/60 flex items-center space-x-2 text-[11px] font-mono text-slate-500">
                <Smartphone className="h-3.5 w-3.5 text-emerald-500" />
                <span>Output: Ispezione Interattiva ed Export Report</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE DEMO (THE 3D WORKSPACE) */}
      <section id="demo" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">Laboratorio Digitale</span>
            <h2 className="text-3xl font-black text-white mt-2 leading-tight">Simulatore di Rilievo 3D Forense</h2>
            <p className="mt-4 text-slate-400 text-sm">
              Prova la potenza e l'usabilità di FORA direttamente dal tuo browser. Ruota la telecamera, fai clic sui mobili o sul pavimento per posizionare i marker di reperto numerati, calcola le distanze metriche ed esporta la relazione giudiziaria ufficiale.
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
          />

        </div>
      </section>

      {/* 6. COMPETITOR & ADVANTAGES SECTION */}
      <section id="market" className="py-24 bg-slate-900/30 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">Analisi Comparativa</span>
            <h2 className="text-3xl font-black text-white mt-2">Perché FORA ridefinisce gli standard</h2>
            <p className="mt-4 text-slate-400 text-sm">
              La fragilità dei software proprietari risiede nella natura chiusa (\"black-box\") dei loro calcoli. In sede dibattimentale penale, l'avversario può invalidare una perizia se la ricostruzione software è coperta da segreto industriale. FORA garantisce assoluta trasparenza matematica.
            </p>
          </div>

          {/* Table container */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">Fattore Tecnico / Legale</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">Software Proprietari Classici</th>
                  <th className="p-5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/5 font-mono">Suite FORA (Ingegneria Trasparente)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-xs sm:text-sm">
                
                <tr>
                  <td className="p-5 font-bold text-white">Admissibilità in Aula (Giudiziaria)</td>
                  <td className="p-5 text-slate-400">
                    <span className="text-rose-400 font-semibold block mb-1">Debole in Controinterrogatorio</span>
                    La controparte può contestare l'opacità dei calcoli volumetrici non verificabili o coperti da brevetto.
                  </td>
                  <td className="p-5 text-emerald-300 bg-emerald-500/5 font-semibold">
                    <span className="text-emerald-400 font-black block mb-1">Inattaccabile dal 2000</span>
                    Gli algoritmi core sono matematicamente trasparenti, pubblici e riproducibili da qualsiasi consulente tecnico d'ufficio.
                  </td>
                </tr>

                <tr>
                  <td className="p-5 font-bold text-white">Costi di Accesso Hardware e Licenze</td>
                  <td className="p-5 text-slate-400">
                    <span className="text-rose-400 font-semibold block mb-1">Costi Proibitivi (&gt; 15.000€)</span>
                    Necessita di scanner laser proprietari marchiati e costosi canoni software ricorsivi annuali.
                  </td>
                  <td className="p-5 text-emerald-300 bg-emerald-500/5 font-semibold">
                    <span className="text-emerald-400 font-black block mb-1">Hardware Agnostico</span>
                    Rilievo eseguibile con comuni fotocamere reflex o smartphone LiDAR. Modello B2B accessibile.
                  </td>
                </tr>

                <tr>
                  <td className="p-5 font-bold text-white">Curva di Apprendimento</td>
                  <td className="p-5 text-slate-400">
                    <span className="text-rose-400 font-semibold block mb-1">Complessa e Specialistica</span>
                    Richiede settimane di corsi per padroneggiare nuvole di punti in CAD industriali complessi.
                  </td>
                  <td className="p-5 text-emerald-300 bg-emerald-500/5 font-semibold">
                    <span className="text-emerald-400 font-black block mb-1">Interfaccia Point &amp; Click</span>
                    L'ispezione della scena si controlla con movimenti mouse intuitivi e menu forensi guidati.
                  </td>
                </tr>

                <tr>
                  <td className="p-5 font-bold text-white">Portabilità e Condivisione (AR/Web)</td>
                  <td className="p-5 text-slate-400">
                    <span className="text-rose-400 font-semibold block mb-1">Scarsa ed Estremamente Pesante</span>
                    I file sono pesanti e visualizzabili solo su workstation fisse con software proprietari dedicati installati.
                  </td>
                  <td className="p-5 text-emerald-300 bg-emerald-500/5 font-semibold">
                    <span className="text-emerald-400 font-black block mb-1">Web-Nativa e Realtà Aumentata</span>
                    Condivisione istantanea protetta tramite link web o visore AR portatile direttamente sul tavolo dell'aula.
                  </td>
                </tr>

                <tr>
                  <td className="p-5 font-bold text-white">Trattamento Dati Giudiziari</td>
                  <td className="p-5 text-slate-400">
                    <span className="text-rose-400 font-semibold block">Dipendente da Cloud</span>
                    Molti sistemi caricano le fotorilevazioni su server esteri ignoti per l'elaborazione fotogrammetrica.
                  </td>
                  <td className="p-5 text-emerald-300 bg-emerald-500/5 font-semibold">
                    <span className="text-emerald-400 font-black block">100% On-Premise</span>
                    Tutti i dati e le immagini sensibili restano confinati sulle macchine locali degli investigatori per massima riservatezza.
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
            <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">Q&amp;A Forense</span>
            <h2 className="text-3xl font-black text-white mt-2">Domande Frequenti</h2>
            <p className="mt-4 text-slate-400 text-sm">
              Tutte le risposte legali e metodologiche relative all'uso di FORA nelle aule giudiziarie italiane.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-slate-900/40 border border-slate-850 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex justify-between items-center space-x-4 focus:outline-none"
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
              <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">Unisciti all'Innovazione Scientifica</span>
              <h2 className="text-3xl font-black text-white leading-tight">Richiedi una licenza di test o una demo per la tua Procura</h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                FORA collabora regolarmente con periti iscritti all'albo, studi legali di indagini difensive e uffici giudiziari su tutto il territorio nazionale. Contattaci oggi per ottenere l'accesso completo alla suite desktop On-Premise, materiale informativo dettagliato e supporto nella prima calibrazione 1:1.
              </p>
              
              <div className="space-y-4 pt-4 border-t border-slate-900">
                <div className="flex items-center space-x-3 text-xs text-slate-400">
                  <MapPin className="h-4 w-4 text-emerald-500" />
                  <span>Divisione Forense • Sezione R&D • Roma, Italia</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-400">
                  <Mail className="h-4 w-4 text-emerald-500" />
                  <span>supporto@fora-forensics.it</span>
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
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Richiesta Ricevuta con Successo</h3>
                  <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                    Grazie per l'interesse. Il nostro ufficio d'Ingegneria Forense ha registrato i tuoi dati e ti contatterà all'indirizzo <strong className="text-white">{formFields.email}</strong> entro 24 ore lavorative.
                  </p>
                  <button 
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormFields({ name: '', email: '', agency: '', phone: '', message: '' });
                    }}
                    className="mt-6 text-xs text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
                  >
                    Invia un'altra richiesta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2 mb-2">
                    <Scale className="h-4.5 w-4.5 text-emerald-500" />
                    <span>Modulo Contatto Ufficiale</span>
                  </h3>
                  
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Nome e Cognome *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                      <input 
                        type="text" 
                        required
                        value={formFields.name}
                        onChange={e => setFormFields(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-300"
                        placeholder="Dott. Ing. Marco Rossi"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Email Istituzionale *</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                        <input 
                          type="email" 
                          required
                          value={formFields.email}
                          onChange={e => setFormFields(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-300"
                          placeholder="m.rossi@periti-tribunale.it"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Telefono</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                        <input 
                          type="tel" 
                          value={formFields.phone}
                          onChange={e => setFormFields(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-300"
                          placeholder="+39 333 1234567"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Ordine / Procura / Ente di Appartenenza</label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                      <input 
                        type="text" 
                        value={formFields.agency}
                        onChange={e => setFormFields(prev => ({ ...prev, agency: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-300"
                        placeholder="Albo Periti Tribunale di Roma"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Descrizione Esigenze perizie</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                      <textarea 
                        rows={3}
                        value={formFields.message}
                        onChange={e => setFormFields(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-300"
                        placeholder="Inserisci dettagli utili, es. analisi balistiche d'indagine difensiva, acquisizione LiDAR..."
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20"
                  >
                    Invia Richiesta di Licenza Demo
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
              <a href="#vision" className="hover:text-emerald-400 transition-colors">Visione</a>
              <a href="#pipeline" className="hover:text-emerald-400 transition-colors">La Pipeline</a>
              <a href="#demo" className="hover:text-emerald-400 transition-colors">Laboratorio 3D</a>
              <a href="#market" className="hover:text-emerald-400 transition-colors">Vantaggi</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 font-mono">
            <p>&copy; 2026 FORA System Inc. Tutti i diritti riservati. Soluzione Enterprise per la Ricostruzione Forense.</p>
            <p className="mt-2 sm:mt-0">Sviluppato in Italia con rigore scientifico e trasparenza tecnologica.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
