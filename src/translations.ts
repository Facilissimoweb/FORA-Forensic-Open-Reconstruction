export type Language = 'it' | 'en' | 'es';

export interface TranslationSet {
  nav: {
    vision: string;
    pipeline: string;
    demo: string;
    market: string;
    faq: string;
    cta: string;
  };
  hero: {
    badge: string;
    title1: string;
    titleHighlight: string;
    description: string;
    ctaDemo: string;
    ctaPipeline: string;
    grid1_title: string;
    grid1_val: string;
    grid2_title: string;
    grid2_val: string;
    grid3_title: string;
    grid3_val: string;
    grid4_title: string;
    grid4_val: string;
  };
  vision: {
    badge: string;
    title: string;
    description: string;
    feat1_title: string;
    feat1_desc: string;
    feat2_title: string;
    feat2_desc: string;
    feat3_title: string;
    feat3_desc: string;
  };
  pipeline: {
    badge: string;
    title: string;
    description: string;
    step1_title: string;
    step1_sub: string;
    step1_desc: string;
    step1_out: string;
    step2_title: string;
    step2_sub: string;
    step2_desc: string;
    step2_out: string;
    step3_title: string;
    step3_sub: string;
    step3_desc: string;
    step3_out: string;
  };
  table: {
    badge: string;
    title: string;
    description: string;
    col_factor: string;
    col_prop: string;
    col_fora: string;
    row1_title: string;
    row1_prop: string;
    row1_fora: string;
    row1_fora_sub: string;
    row2_title: string;
    row2_prop: string;
    row2_fora: string;
    row2_fora_sub: string;
    row3_title: string;
    row3_prop: string;
    row3_fora: string;
    row3_fora_sub: string;
    row4_title: string;
    row4_prop: string;
    row4_fora: string;
    row4_fora_sub: string;
    row5_title: string;
    row5_prop: string;
    row5_fora: string;
  };
  faqSection: {
    badge: string;
    title: string;
    description: string;
    questions: Array<{ q: string; a: string }>;
  };
  contact: {
    badge: string;
    title: string;
    description: string;
    info_title: string;
    info_loc: string;
    info_email: string;
    form_success_title: string;
    form_success_desc: string;
    form_success_btn: string;
    form_title: string;
    label_name: string;
    label_email: string;
    label_phone: string;
    label_agency: string;
    label_message: string;
    placeholder_name: string;
    placeholder_email: string;
    placeholder_phone: string;
    placeholder_agency: string;
    placeholder_message: string;
    btn_submit: string;
  };
  workspace: {
    badge: string;
    title: string;
    description: string;
    scan_active: string;
    reset_btn: string;
    instruction_title: string;
    instruction_orbit: string;
    instruction_pan: string;
    instruction_zoom: string;
    instruction_click: string;
    
    tab_markers: string;
    tab_trajectory: string;
    tab_case: string;
    
    markers_title: string;
    markers_desc: string;
    markers_select_type: string;
    markers_empty: string;
    markers_btn_dist: string;
    markers_dist_result: string;
    
    traj_title: string;
    traj_desc: string;
    traj_btn: string;
    traj_empty: string;
    traj_azimuth: string;
    traj_elevation: string;
    traj_confidence: string;
    
    case_title: string;
    case_desc: string;
    case_id: string;
    case_name: string;
    case_date: string;
    case_operator: string;
    case_loc: string;
    case_notes: string;
    
    btn_export_json: string;
    btn_export_report: string;
    
    toast_marker_inserted: string;
    toast_scanner_on: string;
    toast_scanner_off: string;
    toast_traj_generated: string;
    toast_reset: string;
    toast_empty_dossier: string;
    toast_json_success: string;
    toast_report_empty: string;
    toast_report_success: string;
    toast_report_popup_error: string;
  };
  chat: {
    title: string;
    subtitle: string;
    placeholder: string;
    send_btn: string;
    empty_messages: string;
    context_badge: string;
    typing: string;
  };
}

export const translations: Record<Language, TranslationSet> = {
  it: {
    nav: {
      vision: "Visione",
      pipeline: "La Pipeline",
      demo: "Laboratorio 3D",
      market: "Vantaggi & Mercato",
      faq: "FAQ",
      cta: "Avvia Demo"
    },
    hero: {
      badge: "La Suite Scientifica Trasparente per l'Ingegneria Forense",
      title1: "Ricostruisci la scena del crimine",
      titleHighlight: "in 3D e Realtà Aumentata",
      description: "FORA è l'ecosistema enterprise chiavi in mano che converte fotorilevazioni bidimensionali in modelli tridimensionali matematicamente inoppugnabili. Offriamo a procure, periti, investigatori e tribunali la massima usabilità unita alla totale trasparenza scientifica dei nostri algoritmi core open-source.",
      ctaDemo: "Simulatore Interattivo",
      ctaPipeline: "Scopri il Workflow",
      grid1_title: "Integrità Scientifica",
      grid1_val: "100% Open Algorithms",
      grid2_title: "Risoluzione Spaziale",
      grid2_val: "Calibrazione Metrica 1:1",
      grid3_title: "Codice Procedura Penale",
      grid3_val: "Conforme L. 397/2000",
      grid4_title: "Architettura Sicura",
      grid4_val: "Elaborazione On-Premise"
    },
    vision: {
      badge: "Un Nuovo Standard Legale",
      title: "La rivoluzione digitale nei tribunali",
      description: "La conservazione e l'analisi della scena del crimine sono passaggi critici e irreversibili. FORA supera la frammentazione delle classiche relazioni periziali cartacee, offrendo una replica spaziale fissa, navigabile e misurabile all'infinito.",
      feat1_title: "Da Foto Statiche a Mesh 3D",
      feat1_desc: "Gli algoritmi avanzati estraggono le coordinate spaziali da normali fotografie digitali effettuate con qualsiasi smartphone o fotocamera reflex, riposizionando i pixel in un volume tridimensionale accurato.",
      feat2_title: "Precisione Millimetrica 1:1",
      feat2_desc: "Attraverso l'uso di marker metrici sul campo, la scena virtuale viene agganciata a valori spaziali reali. È possibile calcolare distanze reciproche, altezze dei punti d'impatto e volumi dei corpi.",
      feat3_title: "Ispezione Immersiva AR",
      feat3_desc: "Permette a giudici, pubblici ministeri e avvocati di immergersi direttamente nella scena del crimine proiettandola in AR su un tavolo o navigandola tramite visori VR, valutando le visuali esatte dei testimoni."
    },
    pipeline: {
      badge: "Integrazione Tecnologica Sinergica",
      title: "La Catena di Elaborazione Forense",
      description: "FORA non costringe il perito ad abbandonare gli strumenti scientifici consolidati. Ha integrato e ottimizzato un flusso operativo trasparente per convertire i dati grezzi in prove inoppugnabili.",
      step1_title: "Meshroom",
      step1_sub: "AliceVision core",
      step1_desc: "Il software open-source leader per la fotogrammetria. Analizza la correlazione geometrica tra i pixel delle fotorilevazioni aeree o terrestri ed elabora la nuvola di punti della scena (Point Cloud) estraendo le mesh strutturali del terreno e delle pareti (.OBJ, .PLY).",
      step1_out: "Output: Nuvola di Punti 3D Georeferenziata",
      step2_title: "Blender",
      step2_sub: "Calibrazione Metrica",
      step2_desc: "Importa le mesh grezze per la rifinitura strutturale. L'operatore identifica i marker metrici posizionati sul campo e imposta il fattore di scala reale 1:1. Rimuove elementi poligonali di disturbo e ottimizza i materiali fotografici (Texture mapping) per un'analisi fluida.",
      step2_out: "Output: Scena 3D Calibrata Metrico-Sensibile",
      step3_title: "Godot Engine",
      step3_sub: "FORA Core SDK",
      step3_desc: "La scena finale viene caricata all'interno del motore di runtime interattivo FORA. In questa fase l'utente può navigare la scena col mouse o in AR, inserire e catalogare i reperti, disegnare traiettorie balistiche ed esportare il report asseverato per la stampa.",
      step3_out: "Output: Ispezione Interattiva ed Export Report"
    },
    table: {
      badge: "Analisi Comparativa",
      title: "Perché FORA ridefinisce gli standard",
      description: "La fragilità dei software proprietari risiede nella natura chiusa (\"black-box\") dei loro calcoli. In sede dibattimentale penale, l'avversario può invalidare una perizia se la ricostruzione software è coperta da segreto industriale. FORA garantisce assoluta trasparenza matematica.",
      col_factor: "Fattore Tecnico / Legale",
      col_prop: "Software Proprietari Classici",
      col_fora: "Suite FORA (Ingegneria Trasparente)",
      row1_title: "Admissibilità in Aula (Giudiziaria)",
      row1_prop: "Debole in Controinterrogatorio. La controparte può contestare l'opacità dei calcoli volumetrici non verificabili o coperti da brevetto.",
      row1_fora: "Inattaccabile dal 2000",
      row1_fora_sub: "Gli algoritmi core sono matematicamente trasparenti, pubblici e riproducibili da qualsiasi consulente tecnico d'ufficio.",
      row2_title: "Costi di Accesso Hardware e Licenze",
      row2_prop: "Costi Proibitivi (> 15.000€). Necessita di scanner laser proprietari marchiati e costosi canoni software ricorsivi annuali.",
      row2_fora: "Hardware Agnostico",
      row2_fora_sub: "Rilievo eseguibile con comuni fotocamere reflex o smartphone LiDAR. Modello B2B accessibile.",
      row3_title: "Curva di Apprendimento",
      row3_prop: "Complessa e Specialistica. Richiede settimane di corsi per padroneggiare nuvole di punti in CAD industriali complessi.",
      row3_fora: "Interfaccia Point & Click",
      row3_fora_sub: "L'ispezione della scena si controlla con movimenti mouse intuitivi e menu forensi guidati.",
      row4_title: "Portabilità e Condivisione (AR/Web)",
      row4_prop: "Scarsa ed Estremamente Pesante. I file sono pesanti e visualizzabili solo su workstation fisse con software proprietari dedicati installati.",
      row4_fora: "Web-Nativa e Realtà Aumentata",
      row4_fora_sub: "Condivisione istantanea protetta tramite link web o visore AR portatile direttamente sul tavolo dell'aula.",
      row5_title: "Trattamento Dati Giudiziari",
      row5_prop: "Dipendente da Cloud. Molti sistemi caricano le fotorilevazioni su server esteri ignoti per l'elaborazione fotogrammetrica.",
      row5_fora: "100% On-Premise. Tutti i dati e le immagini sensibili restano confinati sulle macchine locali degli investigatori per massima riservatezza."
    },
    faqSection: {
      badge: "Q&A Forense",
      title: "Domande Frequenti",
      description: "Tutte le risposte legali e metodologiche relative all'uso di FORA nelle aule giudiziarie italiane.",
      questions: [
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
      ]
    },
    contact: {
      badge: "Unisciti all'Innovazione Scientifica",
      title: "Richiedi una licenza di test o una demo per la tua Procura",
      description: "FORA collabora regolarmente con periti iscritti all'albo, studi legali di indagini difensive e uffici giudiziari su tutto il territorio nazionale. Contattaci oggi per ottenere l'accesso completo alla suite desktop On-Premise, materiale informativo dettagliato e supporto nella prima calibrazione 1:1.",
      info_title: "Divisione Forense • Sezione R&D • Roma, Italia",
      info_loc: "Roma, Italia",
      info_email: "supporto@fora-forensics.it",
      form_success_title: "Richiesta Ricevuta con Successo",
      form_success_desc: "Grazie per l'interesse. Il nostro ufficio d'Ingegneria Forense ha registrato i tuoi dati e ti contatterà all'indirizzo email fornito entro 24 ore lavorative.",
      form_success_btn: "Invia un'altra richiesta",
      form_title: "Modulo Contatto Ufficiale",
      label_name: "Nome e Cognome *",
      label_email: "Email Istituzionale *",
      label_phone: "Telefono",
      label_agency: "Ordine / Procura / Ente di Appartenenza",
      label_message: "Descrizione Esigenze perizie",
      placeholder_name: "Dott. Ing. Marco Rossi",
      placeholder_email: "m.rossi@periti-tribunale.it",
      placeholder_phone: "+39 333 1234567",
      placeholder_agency: "Albo Periti Tribunale di Roma",
      placeholder_message: "Inserisci dettagli utili, es. analisi balistiche d'indagine difensiva, acquisizione LiDAR...",
      btn_submit: "Invia Richiesta di Licenza Demo"
    },
    workspace: {
      badge: "RESA 3D REAL-TIME • METRIC: 1:1",
      title: "Simulatore di Rilievo 3D Forense",
      description: "Prova la potenza e l'usabilità di FORA direttamente dal tuo browser. Ruota la telecamera, fai clic sui mobili o sul pavimento per posizionare i marker di reperto numerati, calcola le distanze metriche ed esporta la relazione giudiziaria ufficiale.",
      scan_active: "SCANNER LASER ATTIVO",
      reset_btn: "Ripristina",
      instruction_title: "Interazione Spaziale 3D:",
      instruction_orbit: "ORBITA: Trascina con Tasto Sinistro del mouse",
      instruction_pan: "PAN: Trascina con Shift + Tasto Destro / Rotellina",
      instruction_zoom: "ZOOM: Usa la Rotellina del mouse",
      instruction_click: "REPERTI: Fai clic sulle superfici per posizionare il tag selezionato",
      
      tab_markers: "Reperti",
      tab_trajectory: "Traiettorie",
      tab_case: "Dossier Caso",
      
      markers_title: "Punti di Reperto",
      markers_desc: "Fai clic sul modello 3D per georeferenziare i reperti con etichette calibrate.",
      markers_select_type: "Seleziona Categoria Evidenza:",
      markers_empty: "Nessun reperto registrato. Fai clic nella scena 3D per piazzare il primo reperto.",
      markers_btn_dist: "Calcola Distanza Metrica",
      markers_dist_result: "Distanza Calcolata:",
      
      traj_title: "Simulatore Balistico",
      traj_desc: "Calcola e proietta i vettori balistici d'impatto e le traiettorie di colpo 3D.",
      traj_btn: "Genera Traiettoria Casuale",
      traj_empty: "Nessun vettore balistico inserito nel dossier.",
      traj_azimuth: "Azimuth",
      traj_elevation: "Elevazione",
      traj_confidence: "Attendibilità",
      
      case_title: "Informazioni Caso",
      case_desc: "Modifica i metadati del caso per la relazione giudiziaria ufficiale.",
      case_id: "Numero Protocollo",
      case_name: "Titolo dell'Indagine",
      case_date: "Data dei Rilievi",
      case_operator: "Operatore Responsabile",
      case_loc: "Località Scena",
      case_notes: "Sintesi dei Fatti / Note",
      
      btn_export_json: "Esporta Dossier JSON",
      btn_export_report: "Genera Relazione di Tribunale",
      
      toast_marker_inserted: "Inserito {name} alla quota Y: {y}m",
      toast_scanner_on: "Scanner laser calibrato e attivo",
      toast_scanner_off: "Scanner laser spento",
      toast_traj_generated: "Calcolo balistico completato: Angolo {elevation}°",
      toast_reset: "Simulatore resettato allo stato di default",
      toast_empty_dossier: "Dossier vuoto. Inserisci reperti prima di esportare.",
      toast_json_success: "Dati telemetrici JSON esportati con successo!",
      toast_report_empty: "Registra almeno un reperto prima di generare il report.",
      toast_report_success: "Report giudiziario aperto in una nuova scheda pronto per la stampa!",
      toast_report_popup_error: "Impossibile aprire la nuova finestra. Controlla il blocco popup."
    },
    chat: {
      title: "Assistente Forense AI",
      subtitle: "Consulente scientifico integrato",
      placeholder: "Fai una domanda sulle prove o sul caso...",
      send_btn: "Invia",
      empty_messages: "Sono l'Assistente AI di FORA. Posso aiutarti ad analizzare le prove del caso corrente, calcolare traiettorie balistiche o darti chiarimenti sul valore legale delle perizie 3D ai sensi della L. 397/2000.",
      context_badge: "CONTESTO CASO ATTIVO",
      typing: "L'Assistente sta analizzando le prove..."
    }
  },
  en: {
    nav: {
      vision: "Vision",
      pipeline: "The Pipeline",
      demo: "3D Lab",
      market: "Value & Market",
      faq: "FAQ",
      cta: "Launch Demo"
    },
    hero: {
      badge: "The Scientifically Transparent Suite for Forensic Engineering",
      title1: "Reconstruct the crime scene",
      titleHighlight: "in 3D and Augmented Reality",
      description: "FORA is the turnkey enterprise ecosystem that converts two-dimensional photographic surveys into mathematically indisputable three-dimensional models. We offer prosecutors, experts, investigators, and courts maximum usability combined with the total scientific transparency of our open-source core algorithms.",
      ctaDemo: "Interactive Simulator",
      ctaPipeline: "Explore Workflow",
      grid1_title: "Scientific Integrity",
      grid1_val: "100% Open Algorithms",
      grid2_title: "Spatial Resolution",
      grid2_val: "1:1 Metric Calibration",
      grid3_title: "Criminal Procedure Code",
      grid3_val: "L. 397/2000 Compliant",
      grid4_title: "Secure Architecture",
      grid4_val: "On-Premise Processing"
    },
    vision: {
      badge: "A New Legal Standard",
      title: "The digital revolution in courts",
      description: "The preservation and analysis of a crime scene are critical and irreversible steps. FORA overcomes the fragmentation of classic paper forensic reports, offering an infinite, navigable, and measurable 3D spatial replica.",
      feat1_title: "From Static Photos to 3D Mesh",
      feat1_desc: "Advanced algorithms extract spatial coordinates from standard digital photographs taken with any smartphone or DSLR camera, repositioning pixels in an accurate 3D volume.",
      feat2_title: "1:1 Millimetric Precision",
      feat2_desc: "Through the use of physical metric markers on the field, the virtual scene is locked to real-world spatial values. You can calculate mutual distances, impact heights, and body volumes.",
      feat3_title: "Immersive AR Inspection",
      feat3_desc: "Allows judges, prosecutors, and defense lawyers to immerse themselves directly in the crime scene, projecting it in AR on a table or navigating it via VR headsets, evaluating witness sightlines."
    },
    pipeline: {
      badge: "Synergistic Technological Integration",
      title: "The Forensic Processing Chain",
      description: "FORA does not force the expert to abandon consolidated scientific tools. It has integrated and optimized a transparent operational workflow to convert raw data into indisputable evidence.",
      step1_title: "Meshroom",
      step1_sub: "AliceVision core",
      step1_desc: "The leading open-source software for photogrammetry. It analyzes the geometric correlation between pixels of aerial or terrestrial photographs and processes the point cloud of the scene, extracting structural meshes of the ground and walls (.OBJ, .PLY).",
      step1_out: "Output: Georeferenced 3D Point Cloud",
      step2_title: "Blender",
      step2_sub: "Metric Calibration",
      step2_desc: "Imports raw meshes for structural refinement. The operator identifies physical metric markers placed on-field and sets the 1:1 real scale factor. It removes disturbing polygon elements and optimizes textures for a smooth analysis.",
      step2_out: "Output: Metric-Sensitive Calibrated 3D Scene",
      step3_title: "Godot Engine",
      step3_sub: "FORA Core SDK",
      step3_desc: "The final scene is loaded into the FORA interactive runtime engine. Here, the user can navigate the scene using a mouse or AR, insert and categorize markers, draw ballistic trajectories, and export certified reports for printing.",
      step3_out: "Output: Interactive Inspection & Report Export"
    },
    table: {
      badge: "Comparative Analysis",
      title: "Why FORA Redefines Standards",
      description: "The fragility of classical proprietary software lies in the closed ('black-box') nature of their calculations. In criminal court, the opposing party can invalidate a reconstruction if the software algorithms are covered by trade secrets. FORA guarantees absolute mathematical transparency.",
      col_factor: "Technical / Legal Factor",
      col_prop: "Classic Proprietary Software",
      col_fora: "FORA Suite (Transparent Engineering)",
      row1_title: "Court Admissibility (Legal)",
      row1_prop: "Weak in cross-examination. Opposing counsel can contest opaque volumetric calculations that are unverified or covered by patents.",
      row1_fora: "Unassailable Legal Status",
      row1_fora_sub: "Core algorithms are mathematically transparent, public, and reproducible by any court-appointed expert.",
      row2_title: "Access Costs (Hardware & Licensing)",
      row2_prop: "Prohibitive costs (> €15,000). Requires branded proprietary laser scanners and expensive annual software subscription fees.",
      row2_fora: "Hardware Agnostic",
      row2_fora_sub: "Surveys can be executed with common DSLR cameras or LiDAR smartphones. Accessible B2B pricing model.",
      row3_title: "Learning Curve",
      row3_prop: "Complex and highly specialized. Requires weeks of dedicated training to master point clouds in complex industrial CAD systems.",
      row3_fora: "Point & Click Interface",
      row3_fora_sub: "Scene inspection is controlled with intuitive mouse movements and guided forensic menus.",
      row4_title: "Portability & Sharing (AR/Web)",
      row4_prop: "Poor and extremely heavy files. Files can only be viewed on local high-end workstations with dedicated proprietary software installed.",
      row4_fora: "Web-Native & Augmented Reality",
      row4_fora_sub: "Protected instant sharing via web link or portable AR headset directly onto the courtroom table.",
      row5_title: "Data Treatment & Privacy",
      row5_prop: "Cloud dependent. Many systems upload sensitive crime scene photographs to foreign servers for photogrammetry processing.",
      row5_fora: "100% On-Premise. All sensitive data and images remain confined to local investigator machines for absolute confidentiality."
    },
    faqSection: {
      badge: "Forensic Q&A",
      title: "Frequently Asked Questions",
      description: "All legal and methodological answers regarding the use of FORA in courtroom proceedings.",
      questions: [
        {
          q: "Are FORA's 3D and AR reconstructions legally admissible in court?",
          a: "Yes. Article 397 of the Italian Code of Criminal Procedure concerning defensive investigations and current jurisprudence admit the presentation of digital evidence, animations, and geometric surveys in court. FORA's key differentiator is total scientific transparency: the use of verifiable open-source algorithms allows opposing experts to check the mathematical formulas used, preventing proprietary black-box disputes."
        },
        {
          q: "How is the metric accuracy of the scans guaranteed?",
          a: "Millimetric 1:1 precision is established by introducing a known-size object (e.g., a metallic calibration bar or certified markers) into the photogrammetry set. During the spatial calibration pipeline in Blender, the geometric axes are rescaled according to this ratio, certifying that every linear, volumetric, or angular measurement corresponds rigorously to real space."
        },
        {
          q: "Does the application support surveys made via smartphone LiDAR sensors?",
          a: "Absolutely. FORA adopts an agnostic pipeline flexibility. You can import and align point clouds (.PLY, .OBJ) obtained directly from the native LiDAR sensors of modern smartphones and tablets (e.g., iPad Pro, iPhone Pro) or fixed industrial laser scanners, offering excellent on-field precision without requiring bulky equipment."
        },
        {
          q: "What is the advantage of using Meshroom - Blender - Godot?",
          a: "This pipeline merges the best of three worlds: Meshroom executes automatic, reliable, and open-source photogrammetry on photographic pixels. Blender optimizes and calibrates the mesh with millimetric precision. Godot Engine (FORA Core) enables interactive 3D exploration and high-frame-rate rendering on the web or portable AR headsets, providing the perfect medium for judges to walk through the scene virtually."
        },
        {
          q: "How are sensitive case data protected?",
          a: "Privacy is an absolute priority in criminal investigations. For this reason, the FORA software suite is designed to run entirely On-Premise. Photogrammetry data, case files, and 3D models are processed locally on the expert's or prosecutor's machines, without transmitting any sensitive data to external or third-party cloud servers."
        }
      ]
    },
    contact: {
      badge: "Join Scientific Innovation",
      title: "Request a test license or a demo for your Prosecutor Office",
      description: "FORA regularly collaborates with certified court experts, defensive investigation law firms, and judicial offices nationwide. Contact us today to get full access to the On-Premise desktop suite, detailed brochures, and support in your first 1:1 metric calibration.",
      info_title: "Forensic Division • R&D Section • Rome, Italy",
      info_loc: "Rome, Italy",
      info_email: "supporto@fora-forensics.it",
      form_success_title: "Request Received Successfully",
      form_success_desc: "Thank you for your interest. Our Forensic Engineering office has registered your details and will contact you at the provided email within 24 working hours.",
      form_success_btn: "Send another request",
      form_title: "Official Contact Form",
      label_name: "Full Name *",
      label_email: "Institutional Email *",
      label_phone: "Phone Number",
      label_agency: "Bar / Court / Organization of Belonging",
      label_message: "Survey Requirements Description",
      placeholder_name: "Dr. Eng. Marco Rossi",
      placeholder_email: "m.rossi@periti-tribunale.it",
      placeholder_phone: "+39 333 1234567",
      placeholder_agency: "Rome Court Experts Registry",
      placeholder_message: "Insert useful details, e.g., defense ballistic analyses, LiDAR acquisition...",
      btn_submit: "Send Demo License Request"
    },
    workspace: {
      badge: "REAL-TIME 3D RENDERING • METRIC: 1:1",
      title: "Forensic 3D Survey Simulator",
      description: "Experience the power and usability of FORA directly from your browser. Rotate the camera, click on furniture or the floor to place numbered evidence tents, calculate metric distances, and export the official judicial report.",
      scan_active: "LASER SCANNER ACTIVE",
      reset_btn: "Reset",
      instruction_title: "3D Spatial Interaction:",
      instruction_orbit: "ORBIT: Drag with Left Mouse Button",
      instruction_pan: "PAN: Drag with Shift + Right Mouse Button / Wheel",
      instruction_zoom: "ZOOM: Use Mouse Wheel",
      instruction_click: "EVIDENCE: Click on surfaces to place the selected tag",
      
      tab_markers: "Evidence",
      tab_trajectory: "Trajectories",
      tab_case: "Case File",
      
      markers_title: "Evidence Markers",
      markers_desc: "Click on the 3D model to georeference evidence items with calibrated labels.",
      markers_select_type: "Select Evidence Category:",
      markers_empty: "No evidence markers registered. Click in the 3D scene to place the first marker.",
      markers_btn_dist: "Calculate Metric Distance",
      markers_dist_result: "Calculated Distance:",
      
      traj_title: "Ballistic Simulator",
      traj_desc: "Calculate and project impact ballistic vectors and 3D bullet trajectories.",
      traj_btn: "Generate Random Trajectory",
      traj_empty: "No ballistic vectors inserted in the dossier.",
      traj_azimuth: "Azimuth",
      traj_elevation: "Elevation",
      traj_confidence: "Confidence",
      
      case_title: "Case Metadata",
      case_desc: "Modify case details to populate the official judicial report.",
      case_id: "Protocol Number",
      case_name: "Investigation Title",
      case_date: "Survey Date",
      case_operator: "Responsible Operator",
      case_loc: "Scene Location",
      case_notes: "Facts Summary / Notes",
      
      btn_export_json: "Export JSON Dossier",
      btn_export_report: "Generate Court Report",
      
      toast_marker_inserted: "Placed {name} at height Y: {y}m",
      toast_scanner_on: "Laser scanner calibrated and active",
      toast_scanner_off: "Laser scanner turned off",
      toast_traj_generated: "Ballistic calculation complete: Angle {elevation}°",
      toast_reset: "Simulator reset to default state",
      toast_empty_dossier: "Empty dossier. Insert evidence markers before exporting.",
      toast_json_success: "JSON telemetry data exported successfully!",
      toast_report_empty: "Register at least one evidence marker before generating the report.",
      toast_report_success: "Judicial report opened in a new tab ready for printing!",
      toast_report_popup_error: "Could not open new window. Please check your popup blocker."
    },
    chat: {
      title: "AI Forensic Assistant",
      subtitle: "Integrated scientific consultant",
      placeholder: "Ask a question about the evidence or the case...",
      send_btn: "Send",
      empty_messages: "I am FORA's AI Assistant. I can help you analyze current case evidence, calculate ballistic trajectories, or clarify the legal validity of 3D reconstructions in court under Law 397/2000.",
      context_badge: "ACTIVE CASE CONTEXT",
      typing: "Assistant is analyzing evidence..."
    }
  },
  es: {
    nav: {
      vision: "Visión",
      pipeline: "La Flujo",
      demo: "Lab 3D",
      market: "Ventajas & Mercado",
      faq: "Preguntas",
      cta: "Iniciar Demo"
    },
    hero: {
      badge: "La suite científica transparente para ingeniería forense",
      title1: "Reconstruye la escena del crimen",
      titleHighlight: "en 3D y Realidad Aumentada",
      description: "FORA es el ecosistema empresarial llave en mano que convierte estudios fotográficos bidimensionales en modelos tridimensionales matemáticamente indiscutibles. Ofrecemos a fiscales, peritos, investigadores y tribunales la máxima usabilidad combinada con la total transparencia científica de nuestros algoritmos de código abierto.",
      ctaDemo: "Simulador Interactivo",
      ctaPipeline: "Descubre el Workflow",
      grid1_title: "Integridad Científica",
      grid1_val: "100% Algoritmos Abiertos",
      grid2_title: "Resolución Espacial",
      grid2_val: "Calibración Métrica 1:1",
      grid3_title: "Código Procesal Penal",
      grid3_val: "Conforme L. 397/2000",
      grid4_title: "Arquitectura Segura",
      grid4_val: "Procesamiento On-Premise"
    },
    vision: {
      badge: "Un Nuevo Estándar Legal",
      title: "La revolución digital en los tribunales",
      description: "La conservación y el análisis de la escena del crimen son pasos críticos e irreversibles. FORA supera la fragmentación de los informes periciales tradicionales en papel, ofreciendo una réplica espacial tridimensional fija, navegable y medible infinitamente.",
      feat1_title: "De Fotos Estáticas a Malla 3D",
      feat1_desc: "Algoritmos avanzados extraen coordenadas espaciales de fotografías digitales estándar tomadas con cualquier smartphone o cámara DSLR, reposicionando los píxeles en un volumen 3D preciso.",
      feat2_title: "Precisión Milimétrica 1:1",
      feat2_desc: "Mediante el uso de marcadores métricos físicos en el campo, la escena virtual se vincula con valores reales de espacio. Se pueden calcular distancias mutuas, alturas de impacto y volúmenes corporales.",
      feat3_title: "Inspección Inmersiva AR",
      feat3_desc: "Permite a jueces, fiscales y abogados defensores sumergirse directamente en la escena del crimen, proyectándola en realidad aumentada sobre una mesa o navegando mediante visores de realidad virtual."
    },
    pipeline: {
      badge: "Integración Tecnológica Sinérgica",
      title: "La Cadena de Procesamiento Forense",
      description: "FORA no obliga al perito a abandonar las herramientas científicas consolidadas. Integra y optimiza un flujo operativo transparente para convertir datos brutos en pruebas indiscutibles.",
      step1_title: "Meshroom",
      step1_sub: "Núcleo AliceVision",
      step1_desc: "Software de código abierto líder en fotogrametría. Analiza la correlación geométrica entre píxeles de fotografías aéreas o terrestres y procesa la nube de puntos de la escena, extrayendo mallas estructurales de suelo y paredes (.OBJ, .PLY).",
      step1_out: "Salida: Nube de Puntos 3D Georeferenciada",
      step2_title: "Blender",
      step2_sub: "Calibración Métrica",
      step2_desc: "Importa mallas brutas para el refinamiento estructural. El operador identifica marcadores métricos colocados en campo y establece el factor de escala real 1:1. Elimina polígonos innecesarios y optimiza texturas.",
      step2_out: "Salida: Escena 3D Calibrada Sensible a Métrica",
      step3_title: "Godot Engine",
      step3_sub: "FORA Core SDK",
      step3_desc: "La escena final se carga en el motor de ejecución interactiva FORA. El usuario puede navegar la escena, añadir y clasificar evidencias, simular trayectorias balísticas y exportar informes certificados.",
      step3_out: "Salida: Inspección Interactiva y Exportación de Informe"
    },
    table: {
      badge: "Análisis Comparativo",
      title: "Por Qué FORA Redefine los Estándares",
      description: "La debilidad de los sistemas propietarios clásicos radica en la naturaleza de caja negra de sus cálculos. En juicios penales, la contraparte puede invalidar la pericia si la reconstrucción depende de algoritmos protegidos por secretos comerciales. FORA garantiza absoluta transparencia.",
      col_factor: "Factor Técnico / Legal",
      col_prop: "Software Propietario Clásico",
      col_fora: "Suite FORA (Ingeniería Transparente)",
      row1_title: "Admisibilidad en Juicios",
      row1_prop: "Débil en contrainterrogatorios. La contraparte puede refutar la opacidad de los cálculos volumétricos no verificables.",
      row1_fora: "Inatacable Legalmente",
      row1_fora_sub: "Los algoritmos núcleo son matemáticamente públicos, transparentes y reproducibles por cualquier perito judicial.",
      row2_title: "Costes de Acceso y Licencia",
      row2_prop: "Costes prohibitivos (> 15.000€). Requiere costosos escáneres láser de marca y tarifas de suscripción anual obligatorias.",
      row2_fora: "Hardware Agnóstico",
      row2_fora_sub: "Reconstrucción ejecutable con cámaras DSLR estándar o sensores LiDAR de smartphones comunes.",
      row3_title: "Curva de Aprendizaje",
      row3_prop: "Compleja y muy especializada. Requiere semanas de formación técnica avanzada para dominar las nubes de puntos en software CAD industrial.",
      row3_fora: "Interfaz Point & Click",
      row3_fora_sub: "La exploración de la escena se realiza mediante gestos de ratón intuitivos y menús forenses guiados.",
      row4_title: "Portabilidad y Compartición (AR/Web)",
      row4_prop: "Baja portabilidad. Archivos extremadamente pesados que solo pueden abrirse en estaciones de trabajo fijas con licencias propietarias.",
      row4_fora: "Nativo Web y Realidad Aumentada",
      row4_fora_sub: "Compartición segura instantánea mediante enlaces web o visualización en AR directamente en la mesa del juzgado.",
      row5_title: "Tratamiento de Datos",
      row5_prop: "Dependiente de la nube. Muchos programas suben las fotografías de la escena a servidores extranjeros desconocidos para su procesamiento.",
      row5_fora: "100% Local (On-Premise). Todas las fotos y datos sensibles permanecen estrictamente en los ordenadores de los peritos forenses."
    },
    faqSection: {
      badge: "Preguntas Forenses",
      title: "Preguntas Frecuentes",
      description: "Todas las respuestas jurídicas y metodológicas sobre el uso de FORA en procesos penales.",
      questions: [
        {
          q: "¿Son las reconstrucciones 3D y AR de FORA legalmente admisibles en juicios?",
          a: "Sí. Las normas procesales sobre investigaciones defensivas y la jurisprudencia actual admiten la presentación de pruebas digitales y reconstrucciones métricas. La ventaja de FORA es la total transparencia científica: el uso de algoritmos abiertos verificables permite que los peritos de ambas partes revisen las fórmulas matemáticas aplicadas, evitando disputas sobre cajas negras de software propietario."
        },
        {
          q: "¿Cómo se garantiza la precisión de las mediciones?",
          a: "La precisión milimétrica 1:1 se establece introduciendo en la fotogrametría un objeto de dimensiones físicas conocidas (como barras de escala calibradas o marcadores certificados). En la calibración espacial en Blender, los ejes geométricos se reescalan conforme a esta proporción exacta."
        },
        {
          q: "¿Soporta la suite relieves obtenidos mediante sensores LiDAR de teléfonos móviles?",
          a: "Totalmente. FORA adopta un flujo flexible y agnóstico. Es posible importar y alinear nubes de puntos (.PLY, .OBJ) capturadas directamente desde sensores LiDAR nativos de dispositivos móviles (como iPhone Pro o iPad Pro) o escáneres industriales fijos."
        },
        {
          q: "¿Cuál es la ventaja de la pipeline Meshroom - Blender - Godot?",
          a: "Este flujo combina lo mejor de tres campos: Meshroom realiza fotogrametría automática y confiable sobre píxeles. Blender optimiza y calibra la geometría 1:1. Godot Engine (FORA Core) facilita la navegación interactiva y rendering 3D fluido en la web y dispositivos AR."
        },
        {
          q: "¿Cómo se protegen los datos confidenciales de las causas penales?",
          a: "La privacidad es fundamental en investigaciones criminales. Por ello, la suite de software FORA está diseñada para ejecutarse On-Premise (localmente). Todos los datos, fotos y modelos de la escena del crimen se procesan sin conexión, sin cargarse jamás en nubes externas."
        }
      ]
    },
    contact: {
      badge: "Únete a la Innovación Científica",
      title: "Solicita una licencia de pruebas o una demo para tu Fiscalía",
      description: "FORA colabora habitualmente con peritos forenses, bufetes de abogados penales y oficinas de investigación en todo el territorio nacional. Contáctanos hoy mismo para obtener acceso a la suite de escritorio local, manuales detallados y soporte para tu primer relieve calibrado.",
      info_title: "División Forense • Sección I+D • Roma, Italia",
      info_loc: "Roma, Italia",
      info_email: "supporto@fora-forensics.it",
      form_success_title: "Solicitud Recibida Correctamente",
      form_success_desc: "Gracias por su interés. Nuestra oficina de Ingeniería Forense ha registrado sus datos y le responderá al correo electrónico facilitado en un plazo de 24 horas laborables.",
      form_success_btn: "Enviar otra solicitud",
      form_title: "Formulario de Contacto Oficial",
      label_name: "Nombre y Apellidos *",
      label_email: "Correo Electrónico Institucional *",
      label_phone: "Teléfono",
      label_agency: "Colegio / Fiscalía / Organismo de Pertenencia",
      label_message: "Descripción de Requisitos Periciales",
      placeholder_name: "Dr. Ing. Marco Rossi",
      placeholder_email: "m.rossi@periti-tribunale.it",
      placeholder_phone: "+39 333 1234567",
      placeholder_agency: "Registro de Peritos Judiciales de Roma",
      placeholder_message: "Escribe detalles de tus peritajes, ej. análisis balísticos de defensa, adquisición LiDAR...",
      btn_submit: "Enviar Solicitud de Licencia Demo"
    },
    workspace: {
      badge: "RENDERING 3D EN TIEMPO REAL • MÉTRICA: 1:1",
      title: "Simulador de Relieve Forense 3D",
      description: "Experimenta la potencia y usabilidad de FORA directamente desde tu navegador. Gira la cámara, haz clic en superficies para situar testigos numerados, mide distancias tridimensionales y exporta el informe pericial oficial.",
      scan_active: "ESCÁNER LÁSER ACTIVO",
      reset_btn: "Restaurar",
      instruction_title: "Interacción Espacial 3D:",
      instruction_orbit: "ÓRBITA: Arrastra con el Botón Izquierdo del ratón",
      instruction_pan: "PAN: Shift + Arrastrar Botón Derecho / Rueda del ratón",
      instruction_zoom: "ZOOM: Gira la Rueda del ratón",
      instruction_click: "EVIDENCIAS: Haz clic en cualquier superficie para colocar el marcador seleccionado",
      
      tab_markers: "Evidencias",
      tab_trajectory: "Trayectorias",
      tab_case: "Expediente",
      
      markers_title: "Testigos de Reperto",
      markers_desc: "Haz clic en la escena 3D para georreferenciar las evidencias físicas con etiquetas calibradas.",
      markers_select_type: "Categoría de Evidencia:",
      markers_empty: "No hay evidencias registradas en este caso. Haz clic en la escena 3D para colocar la primera.",
      markers_btn_dist: "Medir Distancia Métrica",
      markers_dist_result: "Distancia Calculada:",
      
      traj_title: "Simulador Balístico",
      traj_desc: "Calcula y proyecta los vectores balísticos de impacto y trayectorias tridimensionales del proyectil.",
      traj_btn: "Generar Trayectoria Aleatoria",
      traj_empty: "No se han trazado vectores de trayectoria balística.",
      traj_azimuth: "Azimuth",
      traj_elevation: "Elevación",
      traj_confidence: "Fiabilidad",
      
      case_title: "Datos del Expediente",
      case_desc: "Modifica los metadatos de la causa para poblar automáticamente el informe pericial final.",
      case_id: "Número de Protocolo",
      case_name: "Título de la Causa",
      case_date: "Fecha del Relieve",
      case_operator: "Perito Responsable",
      case_loc: "Ubicación de la Escena",
      case_notes: "Resumen de los Hechos / Notas",
      
      btn_export_json: "Esportar Expediente JSON",
      btn_export_report: "Generar Informe Judicial",
      
      toast_marker_inserted: "Colocado {name} a altura Y: {y}m",
      toast_scanner_on: "Escáner láser calibrado y activo",
      toast_scanner_off: "Escáner láser desactivado",
      toast_traj_generated: "Simulación balística completa: Ángulo {elevation}°",
      toast_reset: "Simulador restaurado a estado inicial",
      toast_empty_dossier: "Expediente vacío. Coloca testigos antes de exportar.",
      toast_json_success: "¡Expediente de telemetría JSON exportado con éxito!",
      toast_report_empty: "Registra al menos una evidencia antes de generar el informe.",
      toast_report_success: "¡Informe judicial abierto en una nueva pestaña listo para imprimir!",
      toast_report_popup_error: "No se pudo abrir la ventana. Por favor, desactiva el bloqueador de ventanas emergentes."
    },
    chat: {
      title: "Asistente Forense AI",
      subtitle: "Consultor científico integrado",
      placeholder: "Haz una pregunta sobre las evidencias o el caso...",
      send_btn: "Enviar",
      empty_messages: "Soy el Asistente de IA de FORA. Puedo ayudarte a analizar las pruebas georreferenciadas, resolver trayectorias de tiro u orientarte sobre el marco jurídico de la prueba 3D bajo normativas europeas.",
      context_badge: "CONTEXTO CASO ACTIVO",
      typing: "El asistente científico está analizando las pruebas..."
    }
  }
};
