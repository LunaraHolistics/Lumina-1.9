import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  LayoutGrid,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Clock,
  Edit3,
  Zap,
  User,
  History,
  LogOut,
  X,
  Brain,
  Loader2,
  ArrowRightLeft,
  MoveDiagonal,
  Heart,
  Stars,
  ChevronDown,
  Eye,
  Maximize2,
  Minimize2,
  Save,
  Download,
  Book,
  Trash2,
  GraduationCap,
  Plus,
  Crosshair,
  Grid3x3,
  Home,
  Camera,
  Printer,
  Ban,
  FileText,
  PanelRightClose,
  PanelRightOpen,
  Lightbulb,
  ZoomIn,
  ZoomOut,
  Triangle,
  Briefcase,
  Coins,
  Smartphone,
} from "lucide-react";
// @ts-ignore
import html2canvas from "https://esm.sh/html2canvas@1.4.1";
// @ts-ignore
import { jsPDF } from "https://esm.sh/jspdf@2.5.1";
// @ts-ignore
import ReactMarkdown from "https://esm.sh/react-markdown@9";
import {
  LENORMAND_CARDS,
  LENORMAND_HOUSES,
  AFRODITE_HOUSES,
  FUNDAMENTALS_DATA,
  STUDY_BALLOONS,
  PIRAMIDE_HOUSES,
} from "./constants";
import {
  Polarity,
  LenormandHouse,
  SpreadType,
  StudyLevel,
  ReadingTheme,
  StudyModeState,
  StudyBalloon,
  GeometryFilter,
} from "./types";
import { getDetailedCardAnalysis } from "./geminiService";
import * as Geometry from "./geometryService";
import { CARD_IMAGES, FALLBACK_IMAGE, BASE64_FALLBACK } from "./cardImages";
import { StudyGuidePDF } from "./src/components/features/StudyGuidePDF";

// v2.0: apenas dois estados válidos para o painel do Mentor.
// O estado legado "closed" foi abolido (migração no initializer abaixo).
type SidebarState = "expanded" | "minimized";

// ===============================
// Componentes de Interface
// ===============================
const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
  disabled?: boolean;
}> = ({ icon, label, active, collapsed, onClick, disabled }) => (
  <button
    onClick={disabled ? undefined : onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? "bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]" : disabled ? "text-slate-300 cursor-not-allowed" : "text-slate-900 hover:bg-slate-200 hover:text-indigo-950 font-bold"} ${collapsed ? "justify-center px-0" : ""}`}
    title={collapsed ? label : ""}
    disabled={disabled}
  >
    <div
      className={`flex items-center justify-center shrink-0 w-6 h-6 ${collapsed ? "scale-110" : ""}`}
    >
      {React.isValidElement(icon)
        ? React.cloneElement(icon as React.ReactElement<any>, {
            strokeWidth: 2.5,
            className: "w-full h-full",
          })
        : icon}
    </div>
    {!collapsed && (
      <span className="font-medium text-[10px] uppercase font-bold tracking-widest whitespace-nowrap overflow-hidden">
        {label}
      </span>
    )}
  </button>
);

const Balloon: React.FC<{ balloon: StudyBalloon; onDismiss: () => void }> = ({
  balloon,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-[100] w-full max-sm:px-4 max-w-sm p-4 rounded-2xl shadow-2xl border animate-in slide-in-from-bottom-4 duration-500 bg-white border-indigo-200 text-slate-900 shadow-indigo-500/20`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400 shrink-0">
          <Lightbulb size={18} />
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest mb-1 text-indigo-600">
            {balloon.title}
          </h4>
          <p className="text-[13px] leading-relaxed">{balloon.text}</p>
        </div>
        <button
          onClick={onDismiss}
          className="ml-auto text-slate-500 hover:text-slate-900 transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

const CardVisual: React.FC<{
  card: any;
  houseId: number;
  onClick: () => void;
  isSelected: boolean;
  isThemeCard: boolean;
  themeColor?: string;
  highlightType?: string | null;
  isManualMode?: boolean;
  spreadType?: SpreadType;
  offsetX?: string;
  offsetY?: string;
  studyModeActive?: boolean;
  isAnimating?: boolean;
}> = ({
  card,
  houseId,
  onClick,
  isSelected,
  isThemeCard,
  themeColor,
  highlightType,
  isManualMode,
  spreadType = "mesa-real",
  offsetX = "0px",
  offsetY = "0px",
  studyModeActive = false,
  isAnimating = false,
}) => {
  const highlightStyles: Record<string, string> = {
    mirror: "ring-4 ring-cyan-500/60 border-cyan-400 scale-105 z-10",
    knight: "ring-4 ring-fuchsia-500/60 border-fuchsia-400 scale-105 z-10",
    frame: "border-amber-500/80 ring-2 ring-amber-500/40 animate-pulse",
    axis: "ring-4 ring-indigo-500/60 border-indigo-400 scale-105 z-10",
    bridge: "ring-4 ring-amber-400/80 border-amber-400 scale-110 z-30",
    veredito: "ring-4 ring-emerald-500/60 border-emerald-400 scale-105 z-10",
    "diag-up": "ring-4 ring-orange-500/60 border-orange-400 scale-105 z-10",
    "diag-down": "ring-4 ring-indigo-500/60 border-indigo-400 scale-105 z-10",
    center: "ring-4 ring-amber-400 border-amber-400 scale-110 z-30",
    cruz: "ring-4 ring-purple-500/60 border-purple-400 scale-105 z-20",
    "flow-up": "ring-4 ring-amber-400/80 border-amber-400 scale-110 z-30",
    theme: "ring-[6px] ring-white/40 border-white scale-110 z-40",
  };

  const animationClass = isAnimating
    ? spreadType === "mesa-real"
      ? "animate-mesa-card"
      : "animate-clock-card"
    : "";
  const animationDelay = `${(houseId % 36) * 0.04}s`;

  const styleObj: any = {
    ...(isThemeCard
      ? { boxShadow: `0 0 30px ${themeColor}, inset 0 0 15px ${themeColor}` }
      : {}),
    ...(isSelected
      ? {
          boxShadow: `0 0 50px rgba(79, 70, 229, 0.7), inset 0 0 20px rgba(79, 70, 229, 0.4)`,
        }
      : {}),
    animationDelay,
    "--offset-x": offsetX,
    "--offset-y": offsetY,
  };

  return (
    <div
      onClick={onClick}
      className={`relative group aspect-[3/4.2] rounded-xl border-2 cursor-pointer transition-all duration-500 overflow-visible shadow-xl
        ${
          isSelected
            ? "border-indigo-600 ring-[6px] ring-indigo-600/30 scale-110 z-50"
            : isThemeCard
              ? "border-transparent scale-105 z-20"
              : highlightType
                ? `${highlightStyles[highlightType]}`
                : "border-slate-300 hover:border-slate-400 bg-slate-50"
        } 
        ${animationClass} ${studyModeActive && !highlightType ? "opacity-30 scale-95" : ""}`}
      style={styleObj}
    >
      {isSelected && (
        <div className="absolute -inset-4 border-[4px] border-dashed border-indigo-500/70 rounded-[1.4rem] animate-[spin_12s_linear_infinite] pointer-events-none" />
      )}

      <div className="card-visual-inner">
        <div className="card-face-front">
          {card && (
            <div className="absolute inset-0 z-0 rounded-xl overflow-hidden">
              <img
                src={CARD_IMAGES[card.id] || FALLBACK_IMAGE}
                className={`w-full h-full object-cover opacity-40 transition-opacity`}
                alt=""
              />
            </div>
          )}
          {!card && isManualMode && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Plus size={16} className={`opacity-30 text-slate-700`} />
            </div>
          )}

          <div className="absolute top-1 left-1 z-20 flex items-center gap-1.5">
            <span
              className={`text-[7px] md:text-[8px] font-black uppercase bg-black/40 px-1 rounded-sm backdrop-blur-sm text-white`}
            >
              CASA {houseId}
            </span>
            {isSelected && (
              <div className="p-1 bg-indigo-600 rounded-full text-white shadow-xl scale-110 animate-pulse">
                <Crosshair size={10} strokeWidth={3} />
              </div>
            )}
          </div>

          {card && (
            <div className="absolute inset-0 z-30 flex flex-col p-2 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent rounded-xl">
              <div className="flex-grow flex flex-col items-center justify-center text-center mt-2">
                <span className="text-[7px] md:text-[10px] font-cinzel font-bold text-white uppercase leading-tight tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {card.name}
                </span>
              </div>
              <div className="mt-auto flex justify-between items-center bg-black/30 -mx-2 -mb-2 px-2 py-1 rounded-b-xl">
                <span className="text-[12px] font-black text-white leading-none">
                  {card.id}
                </span>
                <div
                  className={`w-1.5 h-1.5 rounded-full ${card.polarity === Polarity.POSITIVE ? "bg-emerald-500" : card.polarity === Polarity.NEGATIVE ? "bg-rose-500" : "bg-slate-400"}`}
                />
              </div>
            </div>
          )}
        </div>
        <div className="card-face-back"></div>
      </div>
    </div>
  );
};

const ConceptAccordion: React.FC<{
  concept: {
    title: string;
    text: string;
    example?: string;
    details?: string;
    practiceTarget?: SpreadType;
    id?: string;
  };
  isOpen: boolean;
  onToggle: () => void;
  onPractice?: () => void;
}> = ({ concept, isOpen, onToggle, onPractice }) => {
  return (
    <div
      className={`bg-white border-slate-200 shadow-sm border rounded-2xl overflow-hidden transition-all duration-300`}
    >
      <div
        onClick={onToggle}
        className={`p-6 cursor-pointer hover:bg-slate-800/10 flex flex-col`}
      >
        <div className="flex items-center justify-between mb-2">
          <h4
            className={`text-xs font-bold uppercase tracking-widest text-indigo-800`}
          >
            {concept.title}
          </h4>
          <div
            className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          >
            <ChevronDown size={16} />
          </div>
        </div>
        <p className={`text-sm leading-relaxed mb-2 text-slate-700`}>
          {concept.text}
        </p>
        {concept.example && (
          <p className="text-xs text-slate-500 italic">Ex: {concept.example}</p>
        )}
      </div>

      {isOpen && (
        <div
          className={`px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50 animate-in fade-in duration-300`}
        >
          <div
            className={`text-[13px] leading-relaxed whitespace-pre-wrap mb-6 text-slate-600`}
          >
            {concept.details}
          </div>
          {onPractice && concept.practiceTarget && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPractice();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg"
            >
              <Eye size={14} /> Ver na Prática
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// ===============================
// App Principal
// ===============================
const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  // v2.0: painel do Mentor nasce MINIMIZADO (ou aberto, se foi assim que
  // ficou na última sessão). O estado legado "closed" é migrado aqui.
  const [mentorSidebarState, setMentorSidebarState] = useState<SidebarState>(
    () => {
      try {
        const saved = localStorage.getItem("lumina_mentor_sidebar");
        if (saved === "expanded") return "expanded";
        if (saved === "closed") {
          localStorage.setItem("lumina_mentor_sidebar", "minimized");
        }
      } catch {}
      return "minimized";
    },
  );

  useEffect(() => {
    try {
      localStorage.setItem("lumina_mentor_sidebar", mentorSidebarState);
    } catch {}
  }, [mentorSidebarState]);

  const mentorPanelOpen = mentorSidebarState === "expanded";

  // v2.1: largura manual do painel Mentor (desktop), persistida
  const [mentorWidth, setMentorWidth] = useState<number>(() => {
    try {
      const saved = parseInt(
        localStorage.getItem("lumina_mentor_width") || "",
        10,
      );
      if (saved >= 320 && saved <= 980) return saved;
    } catch {}
    return 480;
  });
  const mentorWidthRef = useRef(mentorWidth);
  useEffect(() => {
    mentorWidthRef.current = mentorWidth;
  }, [mentorWidth]);

  const [isDraggingWidth, setIsDraggingWidth] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const clampMentorWidth = (w: number) =>
    Math.min(
      Math.max(w, 320),
      Math.min(980, Math.round(window.innerWidth * 0.7)),
    );

  const startWidthDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingWidth(true);
    document.body.style.userSelect = "none";
    const onMove = (ev: MouseEvent) =>
      setMentorWidth(clampMentorWidth(window.innerWidth - ev.clientX));
    const onUp = () => {
      setIsDraggingWidth(false);
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      try {
        localStorage.setItem(
          "lumina_mentor_width",
          String(mentorWidthRef.current),
        );
      } catch {}
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const resetMentorWidth = () => {
    setMentorWidth(480);
    try {
      localStorage.setItem("lumina_mentor_width", "480");
    } catch {}
  };

  const [view, setView] = useState<
    "home" | "board" | "fundamentals" | "glossary" | "profile" | "study"
  >("home");
  const [spreadType, setSpreadType] = useState<SpreadType>("mesa-real");
  const [isManualMode, setIsManualMode] = useState(false);
  const [difficultyLevel, setDifficultyLevel] =
    useState<StudyLevel>("Iniciante");
  const [readingTheme, setReadingTheme] = useState<ReadingTheme>("Geral");

  const [board, setBoard] = useState<(number | null)[]>([]);
  const [firstDrawBoard, setFirstDrawBoard] = useState<
    (number | null)[] | null
  >(null);
  const [secondDrawBoard, setSecondDrawBoard] = useState<
    (number | null)[] | null
  >(null);
  const [isViewingFirstDraw, setIsViewingFirstDraw] = useState(false);
  const [isHistoryView, setIsHistoryView] = useState(false);

  const [selectedHouse, setSelectedHouse] = useState<number | null>(null);
  const [geometryFilters, setGeometryFilters] = useState<Set<GeometryFilter>>(
    new Set(["todas"]),
  );
  const [showCardPicker, setShowCardPicker] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [cardAnalysis, setCardAnalysis] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // References for Drag to Scroll
  const boardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Drag State
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const dragDistance = useRef(0);

  const studyGuideRef = useRef<HTMLDivElement>(null);

  const [zoomLevel, setZoomLevel] = useState(0.68);
  const [zoomMenuOpen, setZoomMenuOpen] = useState(false);
  const [unscaledHeight, setUnscaledHeight] = useState(800);

  // Landscape Detection
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  // --- DRAG TO SCROLL LOGIC ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!boardRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - boardRef.current.offsetLeft);
    setScrollLeftState(boardRef.current.scrollLeft);
    dragDistance.current = 0;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !boardRef.current) return;
    e.preventDefault();
    const x = e.pageX - boardRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    boardRef.current.scrollLeft = scrollLeftState - walk;
    dragDistance.current += Math.abs(e.movementX);
  };

  // --- CLEAR BOARD LOGIC ---
  const handleClearBoard = () => {
    if (
      window.confirm(
        "Deseja remover todas as cartas da mesa? Esta ação limpa o tabuleiro atual.",
      )
    ) {
      setBoard(new Array(36).fill(null));
      setSelectedHouse(null);
      setCardAnalysis(null);
      setShowCardPicker(false);
    }
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.4));

  const handleResetZoom = useCallback(() => {
    if (boardRef.current && contentRef.current) {
      const container = boardRef.current;
      const content = contentRef.current;

      const originalTransform = content.style.transform;
      content.style.transform = "none";

      const styles = window.getComputedStyle(container);
      const paddingRight = parseFloat(styles.paddingRight) || 0;
      const paddingLeft = parseFloat(styles.paddingLeft) || 0;
      const paddingTop = parseFloat(styles.paddingTop) || 0;
      const paddingBottom = parseFloat(styles.paddingBottom) || 0;

      const containerWidth = container.clientWidth - paddingRight - paddingLeft;
      const containerHeight =
        container.clientHeight - paddingTop - paddingBottom;

      const contentWidth = content.scrollWidth;
      const contentHeight = content.scrollHeight;

      setUnscaledHeight(contentHeight);
      content.style.transform = originalTransform;

      const extraPaddingX =
        spreadType === "relogio" ||
        spreadType === "templo-afrodite" ||
        spreadType === "piramide"
          ? 40
          : 80;
      const extraPaddingY = 40;

      const scaleW = (containerWidth - extraPaddingX) / contentWidth;
      const scaleH = (containerHeight - extraPaddingY) / contentHeight;

      let fitScale = Math.min(scaleW, scaleH);

      const isMobile = window.innerWidth < 768;

      if (spreadType === "relogio") {
        fitScale = Math.min(fitScale, 1.15);
      } else if (spreadType === "piramide") {
        fitScale = Math.min(fitScale, 1.1);
      } else {
        fitScale = Math.min(fitScale, 0.85);
      }

      if (isMobile) {
        fitScale = (containerWidth / contentWidth) * 0.9;
      }

      fitScale = Math.max(0.3, fitScale);

      setZoomLevel(fitScale);
      setZoomMenuOpen(false);
    } else {
      setZoomLevel(0.68);
      setZoomMenuOpen(false);
    }
  }, [spreadType, view, mentorPanelOpen]);

  useEffect(() => {
    if (view === "board") {
      const timer = setTimeout(handleResetZoom, 500);
      return () => clearTimeout(timer);
    }
  }, [view, spreadType, sidebarCollapsed, mentorSidebarState, handleResetZoom]);

  const [userName, setUserName] = useState(
    () => localStorage.getItem("lumina_user_name") || "Estudante Lumina",
  );
  const [userPhoto, setUserPhoto] = useState<string | null>(
    () => localStorage.getItem("lumina_user_photo") || null,
  );
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempName, setTempName] = useState("");
  const [isExcludingReadings, setIsExcludingReadings] = useState(false);

  const [savedReadings, setSavedReadings] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem("lumina_saved_readings");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const handleProfileNameSave = () => {
    if (tempName.trim()) {
      setUserName(tempName);
      localStorage.setItem("lumina_user_name", tempName);
    }
    setIsEditingProfile(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      alert("A imagem selecionada é muito grande (Máx: 1MB).");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      try {
        localStorage.setItem("lumina_user_photo", result);
        setUserPhoto(result);
      } catch (err) {
        alert("Erro ao salvar a foto: Espaço de armazenamento local excedido.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteReading = (id: number) => {
    const updated = savedReadings.filter((r) => r.id !== id);
    setSavedReadings(updated);
    localStorage.setItem("lumina_saved_readings", JSON.stringify(updated));
  };

  const handleSaveReading = () => {
    if (board.every((id) => id === null)) {
      alert("O tabuleiro está vazio. Realize uma tiragem antes de salvar.");
      return;
    }
    const newReading = {
      id: Date.now(),
      title: `Leitura ${spreadType === "mesa-real" ? "Mesa Real" : spreadType === "relogio" ? "Relógio" : spreadType === "templo-afrodite" ? "Templo de Afrodite" : spreadType === "mesa-9" ? "Mesa de 9" : "Pirâmide"}`,
      date:
        new Date().toLocaleDateString("pt-BR") +
        " às " +
        new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      type: spreadType,
      board: board,
      firstDrawBoard: firstDrawBoard,
      secondDrawBoard: secondDrawBoard,
      cardAnalysis: cardAnalysis,
      selectedHouse: selectedHouse,
      geometryFilters: Array.from(geometryFilters),
      isManualMode: isManualMode,
    };
    const updated = [newReading, ...savedReadings];
    setSavedReadings(updated);
    localStorage.setItem("lumina_saved_readings", JSON.stringify(updated));
    alert("Leitura salva com sucesso!");
  };

  const handleLoadReading = (reading: any) => {
    setSpreadType(reading.type);
    setBoard(reading.board);
    setFirstDrawBoard(reading.firstDrawBoard || null);
    setSecondDrawBoard(reading.secondDrawBoard || null);
    setCardAnalysis(reading.cardAnalysis || null);
    setSelectedHouse(reading.selectedHouse);
    setGeometryFilters(new Set(reading.geometryFilters || ["todas"]));
    setIsManualMode(!!reading.isManualMode);
    setIsHistoryView(true);
    setView("board");
  };

  const [studyMode, setStudyMode] = useState<StudyModeState>({
    active: false,
    topicId: null,
    practiceTarget: null,
    splitView: false,
  });
  const [activeBalloons, setActiveBalloons] = useState<StudyBalloon[]>([]);
  const [openConceptId, setOpenConceptId] = useState<string | null>(null);

  useEffect(() => {
    if (isManualMode && !isHistoryView) setBoard(new Array(36).fill(null));
    else if (!isHistoryView) handleShuffle();
    setSelectedHouse(null);
    setCardAnalysis(null);
  }, [spreadType, isManualMode]);

  const generateShuffledArray = (size: number, excludeIds: number[] = []) => {
    const ids = Array.from({ length: 36 }, (_, i) => i + 1).filter(
      (id) => !excludeIds.includes(id),
    );
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    return ids.slice(0, size);
  };

  const handleShuffle = () => {
    if (isHistoryView) return;
    setIsAnimating(true);
    let size = 36;
    if (spreadType === "relogio") size = 13;
    else if (spreadType === "mesa-9") size = 9;
    else if (spreadType === "templo-afrodite") size = 7;
    else if (spreadType === "piramide") size = 6;
    const finalBoard = new Array(36).fill(null);
    const shuffledIds = generateShuffledArray(size);
    shuffledIds.forEach((id, idx) => (finalBoard[idx] = id));
    setBoard(finalBoard);
    setFirstDrawBoard(null);
    setSecondDrawBoard(null);
    setIsViewingFirstDraw(false);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleSecondDraw = () => {
    if (spreadType !== "relogio" || isHistoryView) return;
    setIsAnimating(true);
    const currentDraw = board.slice(0, 13);
    setFirstDrawBoard([...currentDraw]);
    const usedIds = currentDraw.filter((id) => id !== null) as number[];
    const nextDraw = generateShuffledArray(13, usedIds);
    const updatedBoard = [...nextDraw, ...new Array(23).fill(null)];
    setBoard(updatedBoard);
    setSecondDrawBoard(updatedBoard);
    setIsViewingFirstDraw(false);
    setSelectedHouse(null);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleClearSpread = () => {
    setBoard(new Array(36).fill(null));
    setFirstDrawBoard(null);
    setSecondDrawBoard(null);
    setIsViewingFirstDraw(false);
    setIsHistoryView(false);
    setCardAnalysis(null);
  };

  const handleToggleDraws = () => {
    if (!firstDrawBoard || !secondDrawBoard || isHistoryView) return;
    setIsAnimating(true);
    if (isViewingFirstDraw) {
      setBoard([...secondDrawBoard]);
      setIsViewingFirstDraw(false);
    } else {
      const restored = [...firstDrawBoard, ...new Array(23).fill(null)];
      setBoard(restored);
      setIsViewingFirstDraw(true);
    }
    setSelectedHouse(null);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const selectedCard = useMemo(
    () =>
      selectedHouse !== null && board[selectedHouse]
        ? LENORMAND_CARDS.find((c) => c.id === board[selectedHouse])
        : null,
    [selectedHouse, board],
  );

  const currentHouse = useMemo(() => {
    if (selectedHouse === null) return null;
    if (spreadType === "relogio") {
      if (selectedHouse === 12)
        return {
          id: 113,
          name: "Tom da Leitura",
          theme: "Síntese Anual",
          technicalDescription:
            "A energia central que regula todo o ciclo anual de 12 meses.",
        } as LenormandHouse;
      return LENORMAND_HOUSES.find((h) => h.id === 101 + selectedHouse);
    } else if (spreadType === "templo-afrodite") {
      return AFRODITE_HOUSES[selectedHouse];
    } else if (spreadType === "piramide") {
      return PIRAMIDE_HOUSES[selectedHouse];
    }
    return LENORMAND_HOUSES[selectedHouse];
  }, [selectedHouse, spreadType]);

  const toggleFilter = (f: GeometryFilter) => {
    setGeometryFilters((prev) => {
      const next = new Set(prev);
      if (f === "nenhuma") {
        next.clear();
        next.add("nenhuma");
      } else if (f === "todas") {
        next.clear();
        next.add("todas");
      } else {
        next.delete("nenhuma");
        next.delete("todas");
        if (next.has(f)) next.delete(f);
        else next.add(f);
        if (next.size === 0) next.add("nenhuma");
      }
      return next;
    });
  };

  const handleHouseSelection = (index: number) => {
    if (dragDistance.current > 5) return;
    setSelectedHouse(index);
    setMentorSidebarState("expanded");
    if (isManualMode && !isHistoryView) setShowCardPicker(true);
  };

  const handlePracticeMode = (topicId: string, target: SpreadType) => {
    setStudyMode({
      active: true,
      topicId,
      practiceTarget: target,
      splitView: false,
    });
    setSpreadType(target);
    setView("board");
    const isGlobal =
      topicId.includes("frame") ||
      topicId.includes("moldura") ||
      topicId.includes("veredict") ||
      topicId.includes("veredito") ||
      topicId.includes("clock") ||
      topicId.includes("relogio");
    if (isGlobal) {
      setSelectedHouse(null);
    } else if (selectedHouse === null) {
      const occupiedIdx = board.findIndex((id) => id !== null);
      if (occupiedIdx !== -1) setSelectedHouse(occupiedIdx);
    }
    const balloons = STUDY_BALLOONS[target];
    const matchingBalloon = balloons?.find((b) => topicId.includes(b.target));
    if (matchingBalloon) setActiveBalloons([matchingBalloon]);
  };

  const showDicas = () => {
    const balloons = STUDY_BALLOONS[spreadType];
    if (balloons && balloons.length > 0) {
      const randomBalloon =
        balloons[Math.floor(Math.random() * balloons.length)];
      setActiveBalloons([randomBalloon]);
    }
  };

  const handleExportStudyGuide = useCallback(async () => {
    if (!studyGuideRef.current) return;
    if (!cardAnalysis && !selectedHouse) {
      alert(
        "Para exportar um guia útil, selecione uma carta e peça uma análise ao Mentor primeiro.",
      );
      return;
    }
    try {
      const element = studyGuideRef.current;
      const canvas = await html2canvas(element, {
        scale: 3,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF("l", "mm", "a4");
      const width = doc.internal.pageSize.getWidth();
      const height = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, width, height);
      doc.save(
        `Lumina_Guia_Estudo_${new Date().toISOString().split("T")[0]}.pdf`,
      );
    } catch (error) {
      console.error("Erro ao gerar Guia de Estudo:", error);
      alert("Não foi possível gerar o PDF. Tente novamente.");
    }
  }, [cardAnalysis, selectedHouse]);

  const exportToPDF = useCallback(async () => {
    if (!contentRef.current) return;
    try {
      const doc = new jsPDF("l", "mm", "a4");
      const pageWidth = 297;
      const pageHeight = 210;
      const headerSpace = 40;
      const safetyMargin = 15;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(30, 27, 75);

      const titleMap: Record<string, string> = {
        "mesa-real": "Mesa Real (36 Casas)",
        "mesa-9": "Tiragem de 9 Cartas",
        relogio: "Tiragem do Relógio (12 Casas)",
        "templo-afrodite": "Templo de Afrodite",
        piramide: "Pirâmide da Síntese",
      };
      const title = titleMap[spreadType] || "Leitura Lumina";

      doc.text(title.toUpperCase(), pageWidth / 2, 15, { align: "center" });
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100);

      const dateStr = new Date().toLocaleDateString("pt-BR");
      const timeStr = new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      doc.text(
        `Consulente: ${userName} | Data: ${dateStr} às ${timeStr}`,
        pageWidth / 2,
        22,
        { align: "center" },
      );

      doc.setDrawColor(200);
      doc.line(safetyMargin, 28, pageWidth - safetyMargin, 28);

      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        "Lumina 1.9 – sistema de estudo de baralho cigano",
        safetyMargin,
        27,
      );
      doc.text(
        "Um produto de Lunara Terapias – Araraquara/SP",
        pageWidth - safetyMargin,
        27,
        { align: "right" },
      );

      const element = contentRef.current;
      const originalTransform = element.style.transform;
      element.style.transform = "none";

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
      });

      element.style.transform = originalTransform;

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const availableWidth = pageWidth - safetyMargin * 2;
      const availableHeight = pageHeight - headerSpace - safetyMargin;

      const ratioW = availableWidth / imgWidth;
      const ratioH = availableHeight / imgHeight;
      const safetyFactor = 0.95;
      const scale = Math.min(ratioW, ratioH) * safetyFactor;

      const finalWidth = imgWidth * scale;
      const finalHeight = imgHeight * scale;

      const x = (pageWidth - finalWidth) / 2;
      const y = headerSpace + (availableHeight - finalHeight) / 2;

      doc.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);
      doc.save(`Lumina-Leitura-${spreadType}-${Date.now()}.pdf`);
    } catch (err) {
      console.error("Erro ao exportar PDF:", err);
    }
  }, [spreadType, userName]);

  const getGeometryHighlight = (idx: number) => {
    if (!geometryFilters.has("nenhuma")) {
      const showAll = geometryFilters.has("todas");

      if (spreadType === "mesa-9") {
        if ((showAll || geometryFilters.has("centro")) && Geometry.isCenter9Cards(idx)) return "center";
        if ((showAll || geometryFilters.has("cruz")) && Geometry.getFixedCross9().includes(idx)) return "cruz";
        if ((showAll || geometryFilters.has("diagonais")) && Geometry.getFixedDiagonals9().includes(idx)) return "diag-up";
        return null;
      }

      if (spreadType === "mesa-real") {
        if ((showAll || geometryFilters.has("moldura")) && Geometry.getMoldura().includes(idx)) return "frame";
        if ((showAll || geometryFilters.has("veredito")) && idx >= 32) return "veredito";
        if (selectedHouse !== null) {
          if (showAll || geometryFilters.has("ponte")) {
            const targetId = selectedHouse + 1;
            const targetIdx = board.findIndex((id) => id === targetId);
            if (idx === targetIdx) return "bridge";
          }
          if (showAll || geometryFilters.has("cavalo"))
            if (Geometry.getCavalo(selectedHouse).includes(idx)) return "knight";
          if (showAll || geometryFilters.has("diagonais")) {
            if (Geometry.getDiagonaisSuperiores(selectedHouse).includes(idx)) return "diag-up";
            if (Geometry.getDiagonaisInferiores(selectedHouse).includes(idx)) return "diag-down";
          }
        }
      }

      if (spreadType === "piramide") {
        if (selectedHouse === 5) {
          if ([3, 4].includes(idx)) return "flow-up";
        } else if ([3, 4].includes(selectedHouse || -1)) {
          if ([0, 1, 2].includes(idx)) return "flow-up";
        }
      }
    }

    if (studyMode.active && studyMode.topicId) {
      const topicId = studyMode.topicId;

      // ----- MESA REAL -----
      if (spreadType === "mesa-real") {
        if ((topicId.includes("frame") || topicId.includes("moldura")) && Geometry.getMoldura().includes(idx)) return "frame";
        if ((topicId.includes("veredict") || topicId.includes("veredito")) && idx >= 32) return "veredito";

        if (selectedHouse !== null) {
          if (topicId.includes("ponte")) {
            const targetId = selectedHouse + 1;
            const targetIdx = board.findIndex((id) => id === targetId);
            if (idx === targetIdx) return "bridge";
          }
          if (topicId.includes("knight") || topicId.includes("cavalo"))
            if (Geometry.getCavalo(selectedHouse).includes(idx)) return "knight";
          if (topicId.includes("mirror") || topicId.includes("espelho"))
            if (Geometry.getEspelhamentos(selectedHouse).includes(idx)) return "mirror";
          if (topicId.includes("diagonal-superior"))
            if (Geometry.getDiagonaisSuperiores(selectedHouse).includes(idx)) return "diag-up";
          if (topicId.includes("diagonal-inferior"))
            if (Geometry.getDiagonaisInferiores(selectedHouse).includes(idx)) return "diag-down";
          if (topicId.includes("diagonal") && !topicId.includes("-")) {
            if (Geometry.getDiagonaisSuperiores(selectedHouse).includes(idx)) return "diag-up";
            if (Geometry.getDiagonaisInferiores(selectedHouse).includes(idx)) return "diag-down";
          }
          // Linhas & Colunas: ambiente (linha) x tempo (coluna)
          if (topicId.includes("mesa-linhas") && idx < 32 && selectedHouse < 32) {
            const lin = Math.floor(selectedHouse / 8);
            const col = selectedHouse % 8;
            if (idx === selectedHouse) return "center";
            if (Math.floor(idx / 8) === lin && idx % 8 === col) return "center";
            if (Math.floor(idx / 8) === lin) return "bridge";
            if (idx % 8 === col) return "axis";
          }
        }
      }

      // ----- RELÓGIO -----
      if (spreadType === "relogio") {
        if (topicId.includes("center") || topicId.includes("centro"))
          if (idx === 12) return "center";
        if (topicId.includes("house") || topicId.includes("casa")) return "axis";
        if (topicId.includes("oposicao") || topicId.includes("opposition"))
          if (selectedHouse !== null && idx === Geometry.getOposicaoRelogio(selectedHouse)) return "axis";
        // Dinâmica do Tempo: anterior = passado, seguinte = futuro, centro = filtro
        if ((topicId.includes("tempo") || topicId.includes("ciclo")) && selectedHouse !== null && selectedHouse < 12) {
          if (idx === selectedHouse) return "center";
          if (idx === (selectedHouse + 11) % 12) return "diag-down";
          if (idx === (selectedHouse + 1) % 12) return "diag-up";
          if (idx === 12) return "bridge";
        }
      }

      // ----- MESA DE 9 -----
      if (spreadType === "mesa-9") {
        if (topicId.includes("center") || topicId.includes("centro"))
          if (Geometry.isCenter9Cards(idx)) return "center";
        if ((topicId.includes("diagonals") || topicId.includes("diagonal")) && Geometry.getFixedDiagonals9().includes(idx)) return "diag-up";
        if ((topicId.includes("cross") || topicId.includes("cruz")) && Geometry.getFixedCross9().includes(idx)) return "cruz";
        if (selectedHouse !== null) {
          if ((topicId.includes("coluna") || topicId.includes("column")) && idx % 3 === selectedHouse % 3) return "axis";
          if (topicId.includes("linha") && !topicId.includes("diagonal") && Math.floor(idx / 3) === Math.floor(selectedHouse / 3)) return "bridge";
        }
        if ((topicId.includes("moldura") || topicId.includes("cantos")) && [0, 2, 6, 8].includes(idx)) return "frame";
      }

      // ----- TEMPLO DE AFRODITE -----
      if (spreadType === "templo-afrodite") {
        if (topicId.includes("sintese")) {
          if (idx === 6) return "center";
        } else if (topicId.includes("par") || topicId.includes("espelho")) {
          if (selectedHouse !== null && selectedHouse < 6) {
            const par = selectedHouse < 3 ? selectedHouse + 3 : selectedHouse - 3;
            if (idx === selectedHouse) return "center";
            if (idx === par) return "mirror";
          }
          if (idx === 6) return "bridge";
        } else if (topicId.includes("polo") || topicId.includes("compar")) {
          if (idx === 6) return "center";
          if (selectedHouse !== null && selectedHouse < 6) {
            const poloSel = selectedHouse < 3 ? 0 : 3;
            const poloOutro = poloSel === 0 ? 3 : 0;
            if (idx >= poloSel && idx <= poloSel + 2) return "axis";
            if (idx >= poloOutro && idx <= poloOutro + 2) return "frame";
          }
        }
      }

      // ----- PIRÂMIDE -----
      if (spreadType === "piramide") {
        if (topicId.includes("fluxo")) {
          if (selectedHouse !== null) {
            const origens: Record<number, number[]> = { 3: [0, 1], 4: [1, 2], 5: [3, 4] };
            const alvos: Record<number, number[]> = { 0: [3], 1: [3, 4], 2: [4], 3: [5], 4: [5] };
            if (idx === selectedHouse) return "center";
            if ((origens[selectedHouse] || []).includes(idx)) return "flow-up";
            if ((alvos[selectedHouse] || []).includes(idx)) return "bridge";
          }
        } else if (topicId.includes("camada")) {
          if (selectedHouse !== null) {
            const camada = selectedHouse < 3 ? [0, 1, 2] : selectedHouse < 5 ? [3, 4] : [5];
            if (camada.includes(idx)) return idx === selectedHouse ? "center" : "axis";
          }
        } else if (topicId.includes("base")) {
          if (idx === 5) return "center";
          if (selectedHouse !== null && [3, 4].includes(selectedHouse) && idx === selectedHouse) return "bridge";
        }
      }
    }

    if (spreadType === "relogio" && !studyMode.active) {
      if (idx === 12) return "center";
      if (selectedHouse !== null && idx === Geometry.getOposicaoRelogio(selectedHouse)) return "axis";
    }

    return null;
  };

  const bridgeData = useMemo(() => {
    if (selectedHouse === null || spreadType !== "mesa-real") return null;
    const targetIdx = board.findIndex((id) => id === selectedHouse + 1);
    return targetIdx !== -1
      ? {
          card: LENORMAND_CARDS.find((c) => c.id === board[targetIdx]),
          house: LENORMAND_HOUSES[targetIdx],
          houseId: targetIdx + 1,
        }
      : null;
  }, [selectedHouse, board, spreadType]);

  const knightData = useMemo(() => {
    if (selectedHouse === null || spreadType !== "mesa-real") return [];
    return Geometry.getCavalo(selectedHouse)
      .map((idx) => ({
        card: board[idx]
          ? LENORMAND_CARDS.find((c) => c.id === board[idx])
          : null,
        house: LENORMAND_HOUSES[idx],
        houseId: idx + 1,
      }))
      .filter((i) => i.card);
  }, [selectedHouse, board, spreadType]);

  const runMentorAnalysis = useCallback(async () => {
    if (selectedHouse === null) return;
    const cardId = board[selectedHouse];
    if (cardId === null) {
      if (studyMode.active) {
        setCardAnalysis(
          "Professor: Coloque uma carta nesta casa para que eu possa analisar a sintaxe da sua tiragem.",
        );
      }
      return;
    }
    setIsAiLoading(true);
    setCardAnalysis(null);
    try {
      const result = await getDetailedCardAnalysis(
        board,
        selectedHouse,
        readingTheme,
        spreadType,
        difficultyLevel,
        studyMode.active,
        "full",
      );
      setCardAnalysis(result);
    } catch (error) {
      setCardAnalysis("Erro de conexão com o Mentor.");
    } finally {
      setIsAiLoading(false);
    }
  }, [
    board,
    selectedHouse,
    readingTheme,
    spreadType,
    difficultyLevel,
    studyMode.active,
  ]);

  const footerActions = [
    {
      label: "Salvar",
      icon: <Save size={18} strokeWidth={2.5} className="w-full h-full" />,
      onClick: handleSaveReading,
    },
    {
      label: "Exportar",
      icon: <Download size={18} strokeWidth={2.5} className="w-full h-full" />,
      onClick: exportToPDF,
    },
    {
      label: "Perfil",
      icon: <User size={18} strokeWidth={2.5} className="w-full h-full" />,
      onClick: () => setView("profile"),
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900 transition-colors overflow-hidden font-inter`}
    >
      {/* v2.1: contenção de overflow do painel do Mentor */}
      <style>{`
        .mentor-prose { max-width: 100%; overflow-wrap: anywhere; word-break: break-word; }
        .mentor-prose pre {
          overflow-x: auto; max-width: 100%;
          font-size: 10px; line-height: 1.45;
          background: #f8fafc; border: 1px solid #e2e8f0;
          border-radius: 8px; padding: 8px;
        }
        .mentor-prose code { overflow-wrap: anywhere; }
        .mentor-prose table { display: block; overflow-x: auto; max-width: 100%; }
        .mentor-prose img { max-width: 100%; height: auto; }
      `}</style>

      <div className="absolute top-0 left-0 -z-50 opacity-0 pointer-events-none w-[297mm] h-[210mm] overflow-hidden">
        <StudyGuidePDF
          ref={studyGuideRef}
          board={board}
          spreadType={spreadType}
          selectedHouse={selectedHouse}
          cardAnalysis={cardAnalysis}
          userName={userName}
        />
      </div>

      {/* Landscape Suggestion Banner (Mobile & Portrait Only) */}
      {isPortrait && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-widest text-center py-2 px-4 border-b border-amber-200 animate-pulse">
          <Smartphone size={12} className="inline mr-2" />✨ Para melhor
          experiência, gire seu celular
        </div>
      )}

      {/* Mobile Backdrop for Sidebars (v2.0: minimiza o Mentor, nunca fecha) */}
      <div
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[55] transition-opacity duration-300 md:hidden ${!sidebarCollapsed || mentorSidebarState === "expanded" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => {
          setSidebarCollapsed(true);
          setMentorSidebarState("minimized");
        }}
      />

      <aside
        className={`fixed top-0 inset-y-0 left-0 flex flex-col border-r border-slate-200 bg-white shadow-xl transition-all duration-300 z-[60] h-screen ${sidebarCollapsed ? "w-16 translate-x-0" : "w-[85%] max-w-[320px] md:w-64 translate-x-0"} md:sticky overflow-y-auto overflow-x-hidden custom-scrollbar overscroll-contain pb-20`}
      >
        <div className="p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <img
              src="https://kehebufapvrmuzaovnzh.supabase.co/storage/v1/object/public/lenormand-cards/LOGO.png"
              alt="L"
              className={`object-contain transition-all ${sidebarCollapsed ? "w-8 h-8 mx-auto" : "w-5 h-5"} landscape:w-5 landscape:h-5`}
            />
            {!sidebarCollapsed && (
              <h1
                className={`text-xs font-bold font-cinzel text-indigo-950 landscape:text-[10px]`}
              >
                LUMINA
              </h1>
            )}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`p-2 rounded-lg text-slate-500 hover:text-slate-900`}
          >
            {sidebarCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>

        <nav className="px-2 space-y-2 shrink-0">
          <NavItem
            icon={<Home size={18} />}
            label="Início"
            active={view === "home"}
            collapsed={sidebarCollapsed}
            onClick={() => {
              setView("home");
              setStudyMode((prev) => ({ ...prev, active: false }));
            }}
          />
          <NavItem
            icon={<LayoutGrid size={18} />}
            label="Mesa Real"
            active={
              view === "board" &&
              spreadType === "mesa-real" &&
              !studyMode.active
            }
            collapsed={sidebarCollapsed}
            onClick={() => {
              setView("board");
              setSpreadType("mesa-real");
              setIsManualMode(false);
              setStudyMode((prev) => ({ ...prev, active: false }));
            }}
          />
          <NavItem
            icon={<Heart size={18} />}
            label="Afrodite"
            active={
              view === "board" &&
              spreadType === "templo-afrodite" &&
              !studyMode.active
            }
            collapsed={sidebarCollapsed}
            onClick={() => {
              setView("board");
              setSpreadType("templo-afrodite");
              setIsManualMode(false);
              setStudyMode((prev) => ({ ...prev, active: false }));
            }}
          />
          <NavItem
            icon={<Grid3x3 size={18} />}
            label="Mesa de 9"
            active={
              view === "board" && spreadType === "mesa-9" && !studyMode.active
            }
            collapsed={sidebarCollapsed}
            onClick={() => {
              setView("board");
              setSpreadType("mesa-9");
              setIsManualMode(false);
              setStudyMode((prev) => ({ ...prev, active: false }));
            }}
          />
          <NavItem
            icon={<Clock size={18} />}
            label="Relógio"
            active={
              view === "board" && spreadType === "relogio" && !studyMode.active
            }
            collapsed={sidebarCollapsed}
            onClick={() => {
              setView("board");
              setSpreadType("relogio");
              setIsManualMode(false);
              setStudyMode((prev) => ({ ...prev, active: false }));
            }}
          />
          <NavItem
            icon={<Triangle size={18} />}
            label="Pirâmide"
            active={
              view === "board" && spreadType === "piramide" && !studyMode.active
            }
            collapsed={sidebarCollapsed}
            onClick={() => {
              setView("board");
              setSpreadType("piramide");
              setIsManualMode(false);
              setStudyMode((prev) => ({ ...prev, active: false }));
            }}
          />
          <NavItem
            icon={<Book size={18} />}
            label="Glossário"
            active={view === "glossary"}
            collapsed={sidebarCollapsed}
            onClick={() => {
              setView("glossary");
              setStudyMode((prev) => ({ ...prev, active: false }));
            }}
          />
          <NavItem
            icon={<BookOpen size={18} />}
            label="Fundamentos"
            active={view === "fundamentals"}
            collapsed={sidebarCollapsed}
            onClick={() => {
              setView("fundamentals");
              setStudyMode((prev) => ({ ...prev, active: false }));
            }}
          />
          <NavItem
            icon={<Edit3 size={18} />}
            label="Personalizada"
            active={view === "board" && isManualMode}
            collapsed={sidebarCollapsed}
            onClick={() => {
              setView("board");
              setIsManualMode(true);
              setStudyMode((prev) => ({ ...prev, active: false }));
            }}
          />
          <NavItem
            icon={<GraduationCap size={18} />}
            label="📘 Modo Estudo"
            active={view === "study" || (view === "board" && studyMode.active)}
            collapsed={sidebarCollapsed}
            onClick={() => {
              setView("study");
              setStudyMode((prev) => ({ ...prev, active: true }));
            }}
          />
        </nav>

        {!sidebarCollapsed && (
          <div className="flex-grow flex flex-col items-center justify-center p-6 select-none pointer-events-none opacity-40 landscape:hidden shrink-0">
            <img
              src="https://kehebufapvrmuzaovnzh.supabase.co/storage/v1/object/public/lenormand-cards/LOGO.png"
              alt="LUMINA"
              className="w-32 h-32 object-contain"
            />
            <div
              className={`mt-4 text-[10px] font-cinzel font-black tracking-[0.4em] text-indigo-900`}
            >
              LUMINA
            </div>
          </div>
        )}

        <div className={`p-4 border-t border-slate-200 space-y-2 shrink-0`}>
          {footerActions.map((action, idx) => (
            <div key={idx} className="relative w-full">
              <button
                onClick={action.onClick}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold transition-all text-indigo-950 bg-indigo-100 border border-indigo-300 hover:bg-indigo-600 hover:text-white ${sidebarCollapsed ? "justify-center px-0" : ""}`}
              >
                <div
                  className={`flex items-center justify-center shrink-0 w-5 h-5`}
                >
                  {action.icon}
                </div>
                {!sidebarCollapsed && (
                  <span className="text-[10px] uppercase tracking-widest">
                    {action.label}
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-grow flex flex-col h-screen overflow-hidden overflow-x-hidden relative">
        <header
          className={`h-16 flex items-center justify-between px-10 border-b sticky top-0 z-20 backdrop-blur-md transition-colors bg-white/95 border-slate-200 shadow-sm shrink-0`}
        >
          <h2
            className={`font-cinzel text-sm font-black tracking-widest uppercase text-slate-900`}
          >
            {view === "home"
              ? "Bem-vindo ao Lumina"
              : view === "board"
                ? studyMode.active
                  ? "Estudo Prático"
                  : isHistoryView
                    ? "Visualizando Histórico"
                    : isManualMode
                      ? "Mesa Personalizada"
                      : spreadType === "mesa-real"
                        ? "Mesa Real"
                        : spreadType === "templo-afrodite"
                          ? "Templo de Afrodite"
                          : spreadType === "mesa-9"
                            ? "Quadrado de 9"
                            : spreadType === "piramide"
                              ? "Pirâmide da Síntese"
                              : "Relógio"
                : view === "glossary"
                  ? "Glossário"
                  : view === "fundamentals"
                    ? "Fundamentos"
                    : view === "profile"
                      ? "Perfil do Usuário"
                      : view === "study"
                        ? "Modo Estudo"
                        : "Estudo"}
          </h2>

          {view === "board" && (
            <div className="flex items-center gap-2 ml-auto">
              {studyMode.active && (
                <>
                  <div
                    className={`mr-4 px-4 py-1.5 rounded-full border flex items-center gap-3 bg-indigo-50 border-indigo-200 text-indigo-700`}
                  >
                    <Brain size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Destaque: {studyMode.topicId?.split("-").join(" ")}
                    </span>
                    <button
                      onClick={() =>
                        setStudyMode((prev) => ({
                          ...prev,
                          active: false,
                          topicId: null,
                        }))
                      }
                      className="hover:text-rose-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <button
                    onClick={handleExportStudyGuide}
                    disabled={!cardAnalysis}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-sm bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-600 hover:text-white"
                    title="Gerar PDF de Estudo"
                  >
                    <Printer size={14} /> Gerar Guia
                  </button>
                </>
              )}

              {isHistoryView && (
                <div
                  className={`mr-4 px-4 py-1.5 rounded-full border flex items-center gap-3 bg-amber-50 border-amber-200 text-amber-700`}
                >
                  <History size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    MODO HISTÓRICO (LEITURA)
                  </span>
                </div>
              )}

              <button
                onClick={showDicas}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-600 hover:text-white animate-pulse`}
              >
                <Lightbulb size={14} /> DICAS
              </button>

              {!studyMode.active && (
                <div
                  className={`flex p-1 rounded-xl border bg-white border-slate-200 shadow-sm`}
                >
                  {(
                    [
                      "nenhuma",
                      "ponte",
                      "cavalo",
                      "moldura",
                      "veredito",
                      "diagonais",
                      "centro",
                      "cruz",
                      "todas",
                    ] as any[]
                  ).map((f) => {
                    if (
                      spreadType === "mesa-9" &&
                      ![
                        "nenhuma",
                        "todas",
                        "centro",
                        "cruz",
                        "diagonais",
                      ].includes(f)
                    )
                      return null;
                    if (
                      spreadType === "mesa-real" &&
                      ["centro", "cruz"].includes(f)
                    )
                      return null;
                    if (
                      (spreadType === "relogio" ||
                        spreadType === "templo-afrodite" ||
                        spreadType === "piramide") &&
                      !["nenhuma", "todas"].includes(f)
                    )
                      return null;
                    const isActive = geometryFilters.has(f as GeometryFilter);
                    const showAll = geometryFilters.has("todas");
                    const activeStyle =
                      isActive || (showAll && f !== "nenhuma" && f !== "todas")
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 hover:bg-slate-100";
                    return (
                      <button
                        key={f}
                        onClick={() => toggleFilter(f as GeometryFilter)}
                        className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase transition-all border border-transparent ${activeStyle}`}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={handleClearSpread}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 transition-all bg-slate-200 hover:bg-slate-300 text-slate-700`}
                  title={
                    isHistoryView
                      ? "Sair do Histórico"
                      : "Limpar todo o tabuleiro"
                  }
                >
                  {isHistoryView ? <LogOut size={14} /> : <Trash2 size={14} />}
                  {isHistoryView ? "SAIR DO HISTÓRICO" : "LIMPAR"}
                </button>

                {!isHistoryView &&
                  spreadType === "relogio" &&
                  firstDrawBoard &&
                  secondDrawBoard && (
                    <button
                      onClick={handleToggleDraws}
                      className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 shadow-xl"
                    >
                      {isViewingFirstDraw ? (
                        <Stars size={14} />
                      ) : (
                        <RotateCcw size={14} />
                      )}
                      {isViewingFirstDraw
                        ? "VOLTAR PARA 2ª TIRAGEM"
                        : "REVER 1ª TIRAGEM"}
                    </button>
                  )}

                {!isHistoryView &&
                  spreadType === "relogio" &&
                  !firstDrawBoard &&
                  board.some((id) => id !== null) && (
                    <button
                      onClick={handleSecondDraw}
                      className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 shadow-xl"
                    >
                      <Stars size={14} /> SEGUNDA TIRAGEM
                    </button>
                  )}

                {!isHistoryView && (
                  <button
                    onClick={handleShuffle}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 shadow-xl"
                  >
                    <RotateCcw size={14} />{" "}
                    {spreadType === "relogio" ? "NOVA TIRAGEM" : "EMBARALHAR"}
                  </button>
                )}
              </div>
            </div>
          )}
        </header>

        <div className="p-4 md:p-10 flex-grow flex flex-col min-h-0 relative overflow-hidden">
          {activeBalloons.map((b, i) => (
            <Balloon
              key={i}
              balloon={b}
              onDismiss={() =>
                setActiveBalloons((prev) => prev.filter((x) => x !== b))
              }
            />
          ))}

          {view === "home" && (
            <div className="overflow-y-auto custom-scrollbar h-full">
              <div className="max-w-6xl mx-auto w-full flex flex-col items-center justify-center py-10 animate-in fade-in duration-700">
                <div className="text-center mb-16 space-y-4">
                  <img
                    src="https://kehebufapvrmuzaovnzh.supabase.co/storage/v1/object/public/lenormand-cards/LOGO.png"
                    alt="LUMINA"
                    className="w-32 h-32 mx-auto mb-6 object-contain"
                  />
                  <h1 className="text-4xl md:text-5xl font-cinzel font-black text-slate-900">
                    LUMINA
                  </h1>
                  <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed">
                    Selecione uma modalidade de tiragem abaixo para iniciar sua
                    jornada de autoconhecimento através das cartas.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl px-4 transition-all duration-500">
                  <div
                    onClick={() => {
                      setView("board");
                      setSpreadType("mesa-real");
                      setIsManualMode(false);
                    }}
                    className="group relative bg-white border border-slate-200 rounded-[2rem] p-8 hover:border-indigo-500 transition-all cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1 overflow-hidden w-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                        <LayoutGrid size={28} />
                      </div>
                      <h3 className="text-xl font-cinzel font-bold text-slate-900 mb-2">
                        Mesa Real
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-6">
                        A leitura completa de 36 casas. Ideal para panoramas
                        gerais e previsões detalhadas.
                      </p>
                      <div className="mt-auto flex items-center text-indigo-600 text-xs font-black uppercase tracking-widest group-hover:gap-2 transition-all">
                        Iniciar <ArrowRightLeft size={14} className="ml-2" />
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setView("board");
                      setSpreadType("templo-afrodite");
                      setIsManualMode(false);
                    }}
                    className="group relative bg-white border border-rose-200 rounded-[2rem] p-8 hover:border-rose-500 transition-all cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-rose-500/20 hover:-translate-y-1 overflow-hidden w-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 mb-6 group-hover:scale-110 transition-transform">
                        <Heart size={28} />
                      </div>
                      <h3 className="text-xl font-cinzel font-bold text-slate-900 mb-2">
                        Afrodite
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-6">
                        7 Cartas. Análise profunda de relacionamentos e conexões
                        afetivas.
                      </p>
                      <div className="mt-auto flex items-center text-rose-600 text-xs font-black uppercase tracking-widest group-hover:gap-2 transition-all">
                        Iniciar <ArrowRightLeft size={14} className="ml-2" />
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setView("board");
                      setSpreadType("mesa-9");
                      setIsManualMode(false);
                    }}
                    className="group relative bg-white border border-slate-200 rounded-[2rem] p-8 hover:border-purple-500 transition-all cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 overflow-hidden w-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                        <Grid3x3 size={28} />
                      </div>
                      <h3 className="text-xl font-cinzel font-bold text-slate-900 mb-2">
                        Quadrado de 9
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-6">
                        Leitura objetiva e focal. Perfeita para perguntas
                        específicas e respostas diretas.
                      </p>
                      <div className="mt-auto flex items-center text-purple-600 text-xs font-black uppercase tracking-widest group-hover:gap-2 transition-all">
                        Iniciar <ArrowRightLeft size={14} className="ml-2" />
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setView("board");
                      setSpreadType("relogio");
                      setIsManualMode(false);
                    }}
                    className="group relative bg-white border border-slate-200 rounded-[2rem] p-8 hover:border-amber-500 transition-all cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-1 overflow-hidden w-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
                        <Clock size={28} />
                      </div>
                      <h3 className="text-xl font-cinzel font-bold text-slate-900 mb-2">
                        Relógio Cigano
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-6">
                        Jornada cíclica de 12 meses. Explore tendências mensais
                        e evolução temporal.
                      </p>
                      <div className="mt-auto flex items-center text-amber-600 text-xs font-black uppercase tracking-widest group-hover:gap-2 transition-all">
                        Iniciar <ArrowRightLeft size={14} className="ml-2" />
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setView("board");
                      setSpreadType("piramide");
                      setIsManualMode(false);
                    }}
                    className="group relative bg-white border border-orange-200 rounded-[2rem] p-8 hover:border-orange-500 transition-all cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-1 overflow-hidden w-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                        <Triangle size={28} />
                      </div>
                      <h3 className="text-xl font-cinzel font-bold text-slate-900 mb-2">
                        Pirâmide da Síntese
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-6">
                        6 Cartas. Ideal para afunilar opções e encontrar uma
                        resolução baseada em um tema central.
                      </p>
                      <div className="mt-auto flex items-center text-orange-600 text-xs font-black uppercase tracking-widest group-hover:gap-2 transition-all">
                        Iniciar <ArrowRightLeft size={14} className="ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === "board" && (
            <>
              {/* Board Zoom Controls & Area */}
              <div className="absolute bottom-10 right-10 flex flex-col items-end gap-3 z-50">
                <div
                  className={`flex flex-col gap-3 transition-all duration-300 transform origin-bottom ${zoomMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
                >
                  <button
                    onClick={handleZoomIn}
                    className={`p-3 rounded-full border shadow-2xl transition-all hover:scale-110 active:scale-95 bg-white border-slate-200 text-indigo-700 hover:bg-indigo-600 hover:text-white`}
                  >
                    <ZoomIn size={22} />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className={`p-3 rounded-full border shadow-2xl transition-all hover:scale-110 active:scale-95 bg-white border-slate-200 text-indigo-700 hover:bg-indigo-600 hover:text-white`}
                  >
                    <ZoomOut size={22} />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className={`p-3 rounded-full border shadow-2xl transition-all hover:scale-110 active:scale-95 bg-white border-slate-200 text-indigo-700 hover:bg-indigo-600 hover:text-white`}
                  >
                    <Maximize2 size={22} />
                  </button>
                  <div
                    className={`mt-2 text-center text-[10px] font-black uppercase tracking-widest text-slate-400`}
                  >
                    {Math.round(zoomLevel * 100)}%
                  </div>
                </div>
                <button
                  onClick={() => setZoomMenuOpen(!zoomMenuOpen)}
                  className={`p-4 rounded-full border shadow-2xl transition-all hover:scale-105 active:scale-95 ${zoomMenuOpen ? "bg-rose-600 border-rose-500" : "bg-indigo-600 border-indigo-500"} text-white`}
                >
                  {zoomMenuOpen ? <X size={24} /> : <ZoomIn size={24} />}
                </button>
              </div>

              <div
                ref={boardRef}
                className={`flex-grow flex flex-col items-center justify-start min-h-0 w-full py-10 overflow-x-auto overflow-y-auto custom-scrollbar scroll-smooth transition-all duration-300
                  ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}
                  ${isDraggingWidth ? "transition-none" : ""}
                  p-2 md:p-10
                `}
                style={{
                  paddingRight:
                    mentorPanelOpen && isDesktop ? mentorWidth + 12 : undefined,
                }}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                <div
                  className="flex flex-col items-center w-full transition-all duration-500"
                  style={{ minHeight: `${unscaledHeight * zoomLevel}px` }}
                >
                  {spreadType === "mesa-real" ? (
                    <div
                      ref={contentRef}
                      className="max-w-6xl w-full grid grid-cols-8 gap-2 md:gap-4 mx-auto transition-all duration-300 flex-grow-0"
                      style={{
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: "top center",
                      }}
                    >
                      {board.slice(0, 32).map((id, i) => (
                        <CardVisual
                          key={`real-${i}-${id}`}
                          card={
                            id ? LENORMAND_CARDS.find((c) => c.id === id) : null
                          }
                          houseId={i + 1}
                          isSelected={selectedHouse === i}
                          isThemeCard={false}
                          highlightType={getGeometryHighlight(i)}
                          onClick={() => handleHouseSelection(i)}
                          isManualMode={isManualMode}
                          spreadType="mesa-real"
                          studyModeActive={studyMode.active}
                          isAnimating={isAnimating}
                        />
                      ))}
                      <div className="col-span-8 flex justify-center py-2 md:py-4">
                        <span className="text-[9px] md:text-[11px] font-cinzel font-black tracking-[0.6em] text-slate-500 uppercase opacity-60">
                          VEREDITO
                        </span>
                      </div>
                      <div className="col-span-2"></div>
                      {board.slice(32, 36).map((id, i) => (
                        <CardVisual
                          key={`real-${i + 32}-${id}`}
                          card={
                            id ? LENORMAND_CARDS.find((c) => c.id === id) : null
                          }
                          houseId={i + 33}
                          isSelected={selectedHouse === i + 32}
                          isThemeCard={false}
                          highlightType={getGeometryHighlight(i + 32)}
                          onClick={() => handleHouseSelection(i + 32)}
                          isManualMode={isManualMode}
                          spreadType="mesa-real"
                          studyModeActive={studyMode.active}
                          isAnimating={isAnimating}
                        />
                      ))}
                    </div>
                  ) : spreadType === "relogio" ? (
                    <div
                      ref={contentRef}
                      className="relative w-[600px] h-[600px] md:w-[700px] md:h-[700px] mx-auto scale-90 md:scale-100 transition-all duration-300 flex-grow-0"
                      style={{
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: "top center",
                      }}
                    >
                      {board.slice(0, 12).map((id, i) => {
                        const radius = 280;
                        const rad = (i * 30 - 60) * (Math.PI / 180);
                        const x = Math.cos(rad) * radius;
                        const y = Math.sin(rad) * radius;
                        return (
                          <div
                            key={i}
                            className="absolute"
                            style={{
                              left: `calc(50% + ${x}px)`,
                              top: `calc(50% + ${y}px)`,
                              transform: "translate(-50%, -50%)",
                              width: "90px",
                            }}
                          >
                            <CardVisual
                              card={
                                id
                                  ? LENORMAND_CARDS.find((c) => c.id === id)
                                  : null
                              }
                              houseId={i + 1}
                              isSelected={selectedHouse === i}
                              isThemeCard={false}
                              highlightType={getGeometryHighlight(i)}
                              onClick={() => handleHouseSelection(i)}
                              isManualMode={isManualMode}
                              spreadType="relogio"
                              studyModeActive={studyMode.active}
                              isAnimating={isAnimating}
                            />
                          </div>
                        );
                      })}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110px]">
                        <CardVisual
                          card={
                            board[12]
                              ? LENORMAND_CARDS.find((c) => c.id === board[12])
                              : null
                          }
                          houseId={13}
                          isSelected={selectedHouse === 12}
                          isThemeCard={true}
                          themeColor="#fbbf24"
                          highlightType={getGeometryHighlight(12)}
                          onClick={() => handleHouseSelection(12)}
                          isManualMode={isManualMode}
                          spreadType="relogio"
                          studyModeActive={studyMode.active}
                          isAnimating={isAnimating}
                        />
                      </div>
                    </div>
                  ) : spreadType === "templo-afrodite" ? (
                    <div
                      ref={contentRef}
                      className="max-w-4xl w-full flex flex-col items-center gap-8 mx-auto py-10 transition-all duration-300 flex-grow-0"
                      style={{
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: "top center",
                      }}
                    >
                      <div className="flex justify-between w-full max-w-2xl px-10">
                        <div className="flex flex-col gap-4">
                          <span className="text-center font-cinzel font-bold text-indigo-800 mb-2">
                            CONSULENTE
                          </span>
                          {[0, 1, 2].map((i) => (
                            <div key={i} className="w-28">
                              <CardVisual
                                card={
                                  board[i]
                                    ? LENORMAND_CARDS.find(
                                        (c) => c.id === board[i],
                                      )
                                    : null
                                }
                                houseId={i + 1}
                                isSelected={selectedHouse === i}
                                isThemeCard={false}
                                highlightType={getGeometryHighlight(i)}
                                onClick={() => handleHouseSelection(i)}
                                isManualMode={isManualMode}
                                spreadType="templo-afrodite"
                                studyModeActive={studyMode.active}
                                isAnimating={isAnimating}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col justify-center">
                          <div className="w-32">
                            <CardVisual
                              card={
                                board[6]
                                  ? LENORMAND_CARDS.find(
                                      (c) => c.id === board[6],
                                    )
                                  : null
                              }
                              houseId={7}
                              isSelected={selectedHouse === 6}
                              isThemeCard={true}
                              themeColor="#f43f5e"
                              highlightType={getGeometryHighlight(6)}
                              onClick={() => handleHouseSelection(6)}
                              isManualMode={isManualMode}
                              spreadType="templo-afrodite"
                              studyModeActive={studyMode.active}
                              isAnimating={isAnimating}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-4">
                          <span className="text-center font-cinzel font-bold text-rose-800 mb-2">
                            PARCEIRO(A)
                          </span>
                          {[3, 4, 5].map((i) => (
                            <div key={i} className="w-28">
                              <CardVisual
                                card={
                                  board[i]
                                    ? LENORMAND_CARDS.find(
                                        (c) => c.id === board[i],
                                      )
                                    : null
                                }
                                houseId={i + 1}
                                isSelected={selectedHouse === i}
                                isThemeCard={false}
                                highlightType={getGeometryHighlight(i)}
                                onClick={() => handleHouseSelection(i)}
                                isManualMode={isManualMode}
                                spreadType="templo-afrodite"
                                studyModeActive={studyMode.active}
                                isAnimating={isAnimating}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : spreadType === "piramide" ? (
                    <div
                      ref={contentRef}
                      className="max-w-3xl w-full flex flex-col items-center gap-6 mx-auto py-10 transition-all duration-300 flex-grow-0"
                      style={{
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: "top center",
                      }}
                    >
                      {/* Linha 1: Topo (3 Cartas) */}
                      <div className="flex justify-center gap-6">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="w-28">
                            <CardVisual
                              card={
                                board[i]
                                  ? LENORMAND_CARDS.find(
                                      (c) => c.id === board[i],
                                    )
                                  : null
                              }
                              houseId={i + 1}
                              isSelected={selectedHouse === i}
                              isThemeCard={false}
                              highlightType={getGeometryHighlight(i)}
                              onClick={() => handleHouseSelection(i)}
                              isManualMode={isManualMode}
                              spreadType="piramide"
                              studyModeActive={studyMode.active}
                              isAnimating={isAnimating}
                            />
                          </div>
                        ))}
                      </div>
                      {/* Linha 2: Meio (2 Cartas) */}
                      <div className="flex justify-center gap-6">
                        {[3, 4].map((i) => (
                          <div key={i} className="w-28">
                            <CardVisual
                              card={
                                board[i]
                                  ? LENORMAND_CARDS.find(
                                      (c) => c.id === board[i],
                                    )
                                  : null
                              }
                              houseId={i + 1}
                              isSelected={selectedHouse === i}
                              isThemeCard={false}
                              highlightType={getGeometryHighlight(i)}
                              onClick={() => handleHouseSelection(i)}
                              isManualMode={isManualMode}
                              spreadType="piramide"
                              studyModeActive={studyMode.active}
                              isAnimating={isAnimating}
                            />
                          </div>
                        ))}
                      </div>
                      {/* Linha 3: Base (1 Carta - Foco/Síntese) */}
                      <div className="flex justify-center gap-6">
                        <div className="w-32 scale-110">
                          <CardVisual
                            card={
                              board[5]
                                ? LENORMAND_CARDS.find((c) => c.id === board[5])
                                : null
                            }
                            houseId={6}
                            isSelected={selectedHouse === 5}
                            isThemeCard={true}
                            themeColor="#f59e0b"
                            highlightType={getGeometryHighlight(5)}
                            onClick={() => handleHouseSelection(5)}
                            isManualMode={isManualMode}
                            spreadType="piramide"
                            studyModeActive={studyMode.active}
                            isAnimating={isAnimating}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      ref={contentRef}
                      className="max-w-xl w-full grid grid-cols-3 gap-4 mx-auto py-10 transition-all duration-300 flex-grow-0"
                      style={{
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: "top center",
                      }}
                    >
                      {board.slice(0, 9).map((id, i) => (
                        <CardVisual
                          key={`m9-${i}-${id}`}
                          card={
                            id ? LENORMAND_CARDS.find((c) => c.id === id) : null
                          }
                          houseId={i + 1}
                          isSelected={selectedHouse === i}
                          isThemeCard={i === 4}
                          themeColor={i === 4 ? "#8b5cf6" : undefined}
                          highlightType={getGeometryHighlight(i)}
                          onClick={() => handleHouseSelection(i)}
                          isManualMode={isManualMode}
                          spreadType="mesa-9"
                          studyModeActive={studyMode.active}
                          isAnimating={isAnimating}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Fundamentals & Glossary views */}
          {view === "fundamentals" && (
            <div className="max-w-4xl mx-auto w-full py-10 space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-24 overflow-y-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-cinzel font-black text-slate-900 mb-4">
                  Fundamentos do Sistema
                </h2>
                <p className="text-slate-500">
                  Explore a teoria por trás das tiragens e geometria.
                </p>
              </div>
              {FUNDAMENTALS_DATA.map((module) => (
                <div
                  key={module.id}
                  className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {module.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {module.description}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {module.concepts.map((concept, idx) => (
                      <ConceptAccordion
                        key={idx}
                        concept={concept}
                        isOpen={openConceptId === `${module.id}-${idx}`}
                        onToggle={() =>
                          setOpenConceptId(
                            openConceptId === `${module.id}-${idx}`
                              ? null
                              : `${module.id}-${idx}`,
                          )
                        }
                        onPractice={() =>
                          handlePracticeMode(
                            concept.id || "",
                            concept.practiceTarget || "mesa-real",
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {view === "glossary" && (
            <div className="max-w-6xl mx-auto w-full py-10 animate-in slide-in-from-bottom-4 duration-500 pb-24 overflow-y-auto">
              <h2 className="text-3xl font-cinzel font-black text-center mb-10 text-slate-900">
                Glossário de Cartas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LENORMAND_CARDS.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 hover:border-indigo-400 hover:shadow-lg transition-all relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          <img
                            src={CARD_IMAGES[card.id] || FALLBACK_IMAGE}
                            className="w-full h-full object-cover"
                            alt={`Carta ${card.id}`}
                            onError={(e) => {
                              e.currentTarget.src = BASE64_FALLBACK;
                            }}
                          />
                        </div>
                        <div>
                          <span className="text-xl font-black text-slate-300">
                            #{card.id.toString().padStart(2, "0")}
                          </span>
                          <h3 className="font-bold text-slate-900">
                            {card.name}
                          </h3>
                        </div>
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full ${card.polarity === "Positiva" ? "bg-emerald-500" : card.polarity === "Negativa" ? "bg-rose-500" : "bg-slate-400"}`}
                      />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {card.briefInterpretation}
                    </p>
                    <div className="relative mt-4 pt-4 border-t border-slate-100 space-y-2">
                      <div className="space-y-2">
                        <p className="text-[10px]">
                          <strong className="text-indigo-600 uppercase">
                            Amor:
                          </strong>{" "}
                          {card.amor ||
                            "Interpretação detalhada disponível no sistema."}
                        </p>
                        <p className="text-[10px]">
                          <strong className="text-emerald-600 uppercase">
                            Dinheiro:
                          </strong>{" "}
                          {card.dinheiro ||
                            "Interpretação detalhada disponível no sistema."}
                        </p>
                        <p className="text-[10px]">
                          <strong className="text-amber-600 uppercase">
                            Trabalho:
                          </strong>{" "}
                          {card.trabalho ||
                            "Interpretação detalhada disponível no sistema."}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto pt-4">
                      {card.keywords.slice(0, 3).map((kw) => (
                        <span
                          key={kw}
                          className="px-2 py-1 bg-slate-100 rounded-md text-[10px] text-slate-500 font-medium uppercase"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "profile" && (
            <div className="max-w-2xl mx-auto w-full py-10 animate-in slide-in-from-bottom-4 duration-500 pb-24 overflow-y-auto">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                <div className="bg-slate-900 h-32 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-slate-900 opacity-50" />
                </div>
                <div className="px-8 pb-8">
                  <div className="relative -mt-12 mb-6 flex justify-between items-end">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                        <img
                          src={
                            userPhoto ||
                            "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                          }
                          alt="User"
                          className="w-full h-full rounded-xl object-cover bg-slate-100"
                        />
                      </div>
                      {isEditingProfile && (
                        <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoUpload}
                          />
                          <Camera className="text-white" size={20} />
                        </label>
                      )}
                    </div>
                    {!isEditingProfile ? (
                      <button
                        onClick={() => {
                          setTempName(userName);
                          setIsEditingProfile(true);
                        }}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
                      >
                        Editar Perfil
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsEditingProfile(false)}
                          className="px-4 py-2 bg-rose-100 text-rose-700 rounded-xl text-xs font-bold uppercase"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleProfileNameSave}
                          className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold uppercase"
                        >
                          Salvar
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="mb-8">
                    {isEditingProfile ? (
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="text-2xl font-bold text-slate-900 border-b-2 border-indigo-500 outline-none w-full bg-transparent"
                        autoFocus
                      />
                    ) : (
                      <h2 className="text-2xl font-bold text-slate-900">
                        {userName}
                      </h2>
                    )}
                    <p className="text-slate-500 text-sm">Acesso Completo</p>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">
                      Minhas Leituras Salvas
                    </h3>
                    {savedReadings.length === 0 ? (
                      <div className="text-center py-8 text-slate-400 text-sm">
                        Nenhuma leitura salva ainda.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-end mb-2">
                          <button
                            onClick={() =>
                              setIsExcludingReadings(!isExcludingReadings)
                            }
                            className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${isExcludingReadings ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                          >
                            {isExcludingReadings
                              ? "Concluir Edição"
                              : "Gerenciar Lista"}
                          </button>
                        </div>
                        {savedReadings.map((reading) => (
                          <div
                            key={reading.id}
                            className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors group"
                          >
                            <div
                              onClick={() => handleLoadReading(reading)}
                              className="flex-grow cursor-pointer"
                            >
                              <h4 className="font-bold text-slate-800 text-sm">
                                {reading.title}
                              </h4>
                              <p className="text-xs text-slate-500">
                                {reading.date} • {reading.type}
                              </p>
                            </div>
                            {isExcludingReadings ? (
                              <button
                                onClick={() => handleDeleteReading(reading.id)}
                                className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                              >
                                <Trash2 size={16} />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleLoadReading(reading)}
                                className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                              >
                                <ChevronRight size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === "study" && (
            <div className="max-w-4xl mx-auto w-full py-10 animate-in slide-in-from-bottom-4 duration-500 pb-24 overflow-y-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-cinzel font-black text-slate-900 mb-4">
                  Modo de Estudo Prático
                </h2>
                <p className="text-slate-500">
                  Selecione um tópico para praticar diretamente no tabuleiro
                  interativo.
                </p>
              </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all shadow-sm group">
                  <div className="flex items-center gap-3 mb-4 text-indigo-600">
                    <LayoutGrid size={24} />
                    <h3 className="font-bold text-lg text-slate-900">Mesa Real</h3>
                  </div>
                  <ul className="space-y-2">
                    <li onClick={() => handlePracticeMode("frame", "mesa-real")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-indigo-700 transition-colors"><span>A Moldura (Frame)</span> <ChevronRight size={14} /></li>
                    <li onClick={() => handlePracticeMode("veredict", "mesa-real")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-indigo-700 transition-colors"><span>Veredito Final (4 Últimas)</span> <ChevronRight size={14} /></li>
                    <li onClick={() => handlePracticeMode("knight", "mesa-real")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-indigo-700 transition-colors"><span>Movimento do Cavalo</span> <ChevronRight size={14} /></li>
                    <li onClick={() => handlePracticeMode("mirror", "mesa-real")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-indigo-700 transition-colors"><span>Espelhamentos</span> <ChevronRight size={14} /></li>
                    <li onClick={() => handlePracticeMode("diagonals", "mesa-real")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-indigo-700 transition-colors"><span>Diagonais</span> <ChevronRight size={14} /></li>
                    <li onClick={() => handlePracticeMode("ponte", "mesa-real")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-indigo-700 transition-colors"><span>Ponte do Significador</span> <ChevronRight size={14} /></li>
                    <li onClick={() => handlePracticeMode("mesa-linhas", "mesa-real")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-indigo-700 transition-colors"><span>Linhas & Colunas (Tempo e Ambiente)</span> <ChevronRight size={14} /></li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-amber-300 transition-all shadow-sm group">
                  <div className="flex items-center gap-3 mb-4 text-amber-600">
                    <Clock size={24} />
                    <h3 className="font-bold text-lg text-slate-900">Relógio Cigano</h3>
                  </div>
                  <ul className="space-y-2">
                    <li onClick={() => handlePracticeMode("center", "relogio")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-amber-700 transition-colors"><span>Carta Central (Tema)</span> <ChevronRight size={14} /></li>
                    <li onClick={() => handlePracticeMode("house", "relogio")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-amber-700 transition-colors"><span>As 12 Casas</span> <ChevronRight size={14} /></li>
                    <li onClick={() => handlePracticeMode("opposition", "relogio")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-amber-700 transition-colors"><span>Eixos de Oposição</span> <ChevronRight size={14} /></li>
                    <li onClick={() => handlePracticeMode("relogio-tempo", "relogio")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-amber-700 transition-colors"><span>Dinâmica do Tempo (Ciclo)</span> <ChevronRight size={14} /></li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-purple-300 transition-all shadow-sm group">
                  <div className="flex items-center gap-3 mb-4 text-purple-600">
                    <Grid3x3 size={24} />
                    <h3 className="font-bold text-lg text-slate-900">Mesa de 9</h3>
                  </div>
                  <ul className="space-y-2">
                    <li onClick={() => handlePracticeMode("center", "mesa-9")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-purple-700 transition-colors"><span>Carta Central (Foco)</span> <ChevronRight size={14} /></li>
                    <li onClick={() => handlePracticeMode("cross", "mesa-9")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-purple-700 transition-colors"><span>A Cruz (Vertical/Horizontal)</span> <ChevronRight size={14} /></li>
                    <li onClick={() => handlePracticeMode("diagonals", "mesa-9")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-purple-700 transition-colors"><span>Diagonais (X)</span> <ChevronRight size={14} /></li>
                    <li onClick={() => handlePracticeMode("m9-colunas", "mesa-9")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-purple-700 transition-colors"><span>Colunas de Tempo</span> <ChevronRight size={14} /></li>
                    <li onClick={() => handlePracticeMode("m9-linhas", "mesa-9")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-purple-700 transition-colors"><span>Linhas de Plano</span> <ChevronRight size={14} /></li>
                    <li onClick={() => handlePracticeMode("m9-moldura", "mesa-9")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-purple-700 transition-colors"><span>Moldura & Cantos</span> <ChevronRight size={14} /></li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-rose-200 hover:border-rose-300 transition-all shadow-sm group">
                  <div className="flex items-center gap-3 mb-4 text-rose-600">
                    <Heart size={24} />
                    <h3 className="font-bold text-lg text-slate-900">Templo de Afrodite</h3>
                  </div>
                  <ul className="space-y-2">
                    <li onClick={() => handlePracticeMode("afrodite-par", "templo-afrodite")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-rose-700 transition-colors"><span>Planos Espelhados (Par Eu–Tu)</span> <ChevronRight size={14} /></li>
                    <li onClick={() => handlePracticeMode("afrodite-polos", "templo-afrodite")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-rose-700 transition-colors"><span>Polos em Comparação</span> <ChevronRight size={14} /></li>
                    <li onClick={() => handlePracticeMode("afrodite-sintese", "templo-afrodite")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-rose-700 transition-colors"><span>A Síntese do Vínculo</span> <ChevronRight size={14} /></li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-orange-200 hover:border-orange-300 transition-all shadow-sm group">
                  <div className="flex items-center gap-3 mb-4 text-orange-600">
                    <Triangle size={24} />
                    <h3 className="font-bold text-lg text-slate-900">Pirâmide da Síntese</h3>
                  </div>
                  <ul className="space-y-2">
                    <li onClick={() => handlePracticeMode("piramide-fluxo", "piramide")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-orange-700 transition-colors"><span>Fluxo de Influência (Topo→Base)</span> <ChevronRight size={14} /></li>
                    <li onClick={() => handlePracticeMode("piramide-camadas", "piramide")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-orange-700 transition-colors"><span>Camadas (Mental / Ação / Síntese)</span> <ChevronRight size={14} /></li>
                    <li onClick={() => handlePracticeMode("piramide-base", "piramide")} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer flex justify-between items-center text-sm text-slate-600 hover:text-orange-700 transition-colors"><span>A Base como Síntese</span> <ChevronRight size={14} /></li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ============ PAINEL MENTOR (v2.0: só minimizado/aberto) ============ */}
        <div
          className={`fixed inset-y-0 right-0 h-full bg-white shadow-2xl z-[70] transform ease-in-out border-l border-slate-200 flex flex-col ${
            isDraggingWidth ? "transition-none" : "transition-all duration-300"
          } ${
            mentorSidebarState === "expanded"
              ? "w-[92%] max-w-[420px] md:max-w-none translate-x-0"
              : "w-14 translate-x-0"
          }`}
          style={
            mentorSidebarState === "expanded" && isDesktop
              ? { width: mentorWidth }
              : undefined
          }
        >
          {/* Alça de redimensionamento (somente desktop) */}
          <div
            onMouseDown={startWidthDrag}
            onDoubleClick={resetMentorWidth}
            className={`hidden md:block absolute left-0 top-0 h-full w-2 cursor-col-resize z-20 transition-colors ${
              isDraggingWidth
                ? "bg-indigo-400/70"
                : "bg-transparent hover:bg-indigo-300/50"
            }`}
            title="Arraste para redimensionar · duplo clique restaura"
          />
          <div
            className={`p-4 border-b border-slate-100 flex items-center ${mentorSidebarState === "minimized" ? "justify-center flex-col gap-4" : "justify-between"} bg-slate-50/50 transition-all`}
          >
            {mentorSidebarState === "expanded" ? (
              <div className="flex items-center gap-3 animate-in fade-in">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                  <Brain size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 whitespace-nowrap">
                    Mentor Lumina
                  </h3>
                  <p className="text-xs text-slate-500 whitespace-nowrap">
                    Análise Inteligente
                  </p>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setMentorSidebarState("expanded")}
                className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm cursor-pointer hover:bg-indigo-200 transition-colors"
                title="Expandir Mentor"
              >
                <Brain size={20} />
              </div>
            )}

            <div
              className={`flex ${mentorSidebarState === "minimized" ? "flex-col" : "flex-row"} gap-2`}
            >
              <button
                onClick={() =>
                  setMentorSidebarState((prev) =>
                    prev === "expanded" ? "minimized" : "expanded",
                  )
                }
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
                title={
                  mentorSidebarState === "expanded" ? "Minimizar" : "Expandir"
                }
              >
                {mentorSidebarState === "expanded" ? (
                  <PanelRightClose size={20} />
                ) : (
                  <PanelRightOpen size={20} />
                )}
              </button>
              {/* v2.0: botão X (fechar) REMOVIDO — só minimizar/expandir */}
            </div>
          </div>

          <div
            className={`flex-grow overflow-y-auto overflow-x-hidden min-w-0 custom-scrollbar transition-opacity duration-300 ${mentorSidebarState === "expanded" ? "opacity-100 p-4 md:p-6" : "opacity-0 pointer-events-none p-0"}`}
          >
            {selectedHouse !== null && (
              <>
                <div className="flex gap-4 mb-8">
                  <div className="w-1/3 shrink-0">
                    <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-lg border-2 border-slate-200 relative bg-slate-100">
                      {board[selectedHouse] &&
                      LENORMAND_CARDS.find(
                        (c) => c.id === board[selectedHouse],
                      ) ? (
                        <img
                          src={
                            CARD_IMAGES[board[selectedHouse]!] || FALLBACK_IMAGE
                          }
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                          <LayoutGrid size={32} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1">
                      {spreadType === "relogio"
                        ? selectedHouse === 12
                          ? "SÍNTESE"
                          : `CASA ${selectedHouse + 1}`
                        : spreadType === "templo-afrodite"
                          ? `POSIÇÃO ${selectedHouse + 1}`
                          : spreadType === "piramide"
                            ? `NÍVEL ${selectedHouse < 3 ? "MENTAL" : selectedHouse < 5 ? "AÇÃO" : "SÍNTESE"}`
                            : `CASA ${selectedHouse + 1}`}
                    </div>
                    <h4 className="text-xl font-black font-cinzel text-slate-900 mb-2">
                      {currentHouse?.name}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {currentHouse?.theme}
                    </p>
                    {board[selectedHouse] &&
                      LENORMAND_CARDS.find(
                        (c) => c.id === board[selectedHouse],
                      ) && (
                        <div className="inline-block px-3 py-1 rounded-lg bg-slate-100 text-[10px] font-bold uppercase text-slate-700">
                          {
                            LENORMAND_CARDS.find(
                              (c) => c.id === board[selectedHouse],
                            )?.name
                          }
                        </div>
                      )}
                  </div>
                </div>

                {selectedCard && (
                  <div className="space-y-4 my-6 border-t border-slate-100 pt-6">
                    <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                      <span className="text-[10px] font-black uppercase text-indigo-600 mb-2 block tracking-widest">
                        Mensagem Essencial
                      </span>
                      <p className="text-sm text-slate-900 font-medium leading-relaxed">
                        "{selectedCard.briefInterpretation}"
                      </p>
                    </div>

                    <div className="space-y-3 mt-4 relative">
                      <div className="bg-white p-3 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2 mb-2 text-rose-500">
                          <Heart size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            Amor & Afeto
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {selectedCard.amor || "Interpretação não disponível."}
                        </p>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2 mb-2 text-blue-500">
                          <Briefcase size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            Trabalho & Carreira
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {selectedCard.trabalho ||
                            "Interpretação não disponível."}
                        </p>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2 mb-2 text-emerald-500">
                          <Coins size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            Dinheiro & Recursos
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {selectedCard.dinheiro ||
                            "Interpretação não disponível."}
                        </p>
                      </div>
                    </div>

                    {selectedCard.conselhos && (
                      <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200">
                        <div className="flex items-center gap-2 mb-2 text-amber-700 font-black uppercase text-[10px] tracking-widest">
                          <Lightbulb size={14} /> Conselho
                        </div>
                        <p className="text-xs text-slate-800 leading-relaxed italic">
                          "{selectedCard.conselhos}"
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* GEOMETRIA (HELPER INLINE) */}
                {(() => {
                  if (spreadType !== "mesa-real" || selectedHouse === null)
                    return null;

                  const renderConnectionItem = (
                    label: string,
                    targetIdx: number,
                    icon: React.ReactNode,
                  ) => {
                    const targetCardId = board[targetIdx];
                    if (!targetCardId) return null;
                    const targetCard = LENORMAND_CARDS.find(
                      (c) => c.id === targetCardId,
                    );
                    if (!targetCard) return null;

                    return (
                      <div
                        key={`${label}-${targetIdx}`}
                        className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm mb-2 flex gap-3 items-start group hover:border-indigo-200 transition-colors"
                      >
                        <div className="w-8 h-11 shrink-0 rounded bg-slate-100 border border-slate-200 overflow-hidden">
                          <img
                            src={CARD_IMAGES[targetCard.id] || FALLBACK_IMAGE}
                            className="w-full h-full object-cover"
                            alt={targetCard.name}
                          />
                        </div>

                        <div className="flex-grow min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold text-slate-800 uppercase truncate pr-2">
                              {targetCard.name}
                            </span>
                            <div className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded text-[8px] font-black uppercase text-indigo-600 tracking-wider whitespace-nowrap">
                              {icon} <span>{label}</span>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-600 leading-relaxed italic">
                            "{targetCard.briefInterpretation}"
                          </p>
                        </div>
                      </div>
                    );
                  };

                  const mirrors = Geometry.getEspelhamentos(selectedHouse);
                  const knights = Geometry.getCavalo(selectedHouse);
                  const diagonals = [
                    ...Geometry.getDiagonaisSuperiores(selectedHouse),
                    ...Geometry.getDiagonaisInferiores(selectedHouse),
                  ];

                  if (
                    mirrors.length === 0 &&
                    knights.length === 0 &&
                    diagonals.length === 0
                  )
                    return null;

                  return (
                    <div className="mt-6 border-t border-slate-100 pt-6">
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                        <ArrowRightLeft size={12} /> Conexões Geométricas
                      </h5>
                      <div className="space-y-1">
                        {mirrors.map((h) =>
                          renderConnectionItem(
                            "Espelho",
                            h,
                            <ArrowRightLeft size={10} />,
                          ),
                        )}
                        {knights.map((h) =>
                          renderConnectionItem(
                            "Cavalo",
                            h,
                            <MoveDiagonal size={10} />,
                          ),
                        )}
                        {diagonals.map((h) =>
                          renderConnectionItem(
                            "Diagonal",
                            h,
                            <Crosshair size={10} />,
                          ),
                        )}
                      </div>
                    </div>
                  );
                })()}

                {isManualMode && showCardPicker && (
                  <div className="mb-8 animate-in slide-in-from-right-4">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="font-bold text-sm text-slate-900">
                        Selecionar Carta
                      </h5>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const newBoard = [...board];
                            newBoard[selectedHouse] = null;
                            setBoard(newBoard);
                          }}
                          className="text-[10px] text-slate-400 font-bold uppercase hover:text-indigo-600 transition-colors"
                        >
                          Limpar Casa
                        </button>
                        <button
                          onClick={handleClearBoard}
                          className="text-[10px] text-rose-500 font-bold uppercase hover:text-rose-700 flex items-center gap-1 transition-colors border-l border-slate-200 pl-2 ml-2"
                          title="Remove todas as cartas da mesa atual"
                        >
                          <Trash2 size={12} /> Limpar Mesa
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto custom-scrollbar p-1">
                      {LENORMAND_CARDS.map((card) => {
                        const isUsed =
                          board.includes(card.id) &&
                          board.indexOf(card.id) !== selectedHouse;
                        const isSelected = board[selectedHouse] === card.id;

                        return (
                          <button
                            key={card.id}
                            onClick={() => {
                              if (isUsed) {
                                alert(
                                  "Esta carta já está na mesa. Escolha outra ou remova a existente da outra posição.",
                                );
                                return;
                              }
                              const newBoard = [...board];
                              newBoard[selectedHouse] = card.id;
                              setBoard(newBoard);
                              setShowCardPicker(false);
                              setCardAnalysis(null);
                            }}
                            className={`p-2 rounded-lg border text-[10px] font-bold flex flex-col items-center gap-1 transition-all relative ${isSelected ? "bg-indigo-600 text-white border-indigo-600" : isUsed ? "bg-slate-100 border-slate-100 text-slate-400 cursor-not-allowed opacity-60" : "bg-white border-slate-200 text-slate-600 hover:bg-indigo-50 hover:border-indigo-200"}`}
                          >
                            <span>{card.id}</span>
                            <span className="truncate w-full text-center">
                              {card.name}
                            </span>
                            {isUsed && (
                              <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                                <Ban size={16} className="text-rose-500" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  {!cardAnalysis ? (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-500 mb-2">
                        Para ver a interpretação detalhada desta combinação
                        (Carta + Casa + Geometria), utilize a análise do Mentor.
                      </p>

                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <select
                          value={readingTheme}
                          onChange={(e) =>
                            setReadingTheme(e.target.value as ReadingTheme)
                          }
                          className="col-span-2 text-xs p-2 rounded-lg border border-slate-200 bg-white"
                        >
                          <option value="Geral">Contexto Geral</option>
                          <option value="Amor & Relacionamentos">
                            Amor e Relacionamentos
                          </option>
                          <option value="Trabalho & Finanças">
                            Trabalho e Dinheiro
                          </option>
                          <option value="Espiritualidade & Caminho de Vida">
                            Espiritualidade
                          </option>
                        </select>
                        {studyMode.active && (
                          <select
                            value={difficultyLevel}
                            onChange={(e) =>
                              setDifficultyLevel(e.target.value as StudyLevel)
                            }
                            className="col-span-2 text-xs p-2 rounded-lg border border-slate-200 bg-white"
                          >
                            <option value="Iniciante">Nível Iniciante</option>
                            <option value="Intermediário">
                              Nível Intermediário
                            </option>
                            <option value="Avançado">Nível Avançado</option>
                          </select>
                        )}
                      </div>

                      <button
                        onClick={runMentorAnalysis}
                        disabled={isAiLoading || !board[selectedHouse]}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                      >
                        {isAiLoading ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Sparkles size={16} />
                        )}
                        {studyMode.active
                          ? "Explicar Tecnicamente"
                          : "Interpretar Carta"}
                      </button>
                    </div>
                  ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-2">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="font-bold text-sm text-indigo-900 flex items-center gap-2">
                          <Sparkles size={14} className="text-indigo-500" />
                          {studyMode.active
                            ? "Explicação Técnica"
                            : "Interpretação"}
                        </h5>
                        <button
                          onClick={() => setCardAnalysis(null)}
                          className="text-[10px] text-slate-400 hover:text-indigo-600 font-bold uppercase"
                        >
                          Nova Análise
                        </button>
                      </div>
                      <div className="mentor-prose prose prose-sm prose-indigo text-xs leading-relaxed text-slate-600 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 max-w-full">
                        <ReactMarkdown>{cardAnalysis}</ReactMarkdown>
                      </div>

                      <div className="mt-4 pt-4 border-t border-indigo-100">
                        <button
                          onClick={handleExportStudyGuide}
                          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg font-bold text-xs uppercase tracking-widest shadow-md transition-all bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                        >
                          <FileText size={16} />
                          Salvar Guia de Estudo (.pdf)
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {spreadType === "relogio" && selectedHouse < 12 && (
                  <div className="border-t border-slate-100 pt-6 mt-4">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                      Detalhes da Casa Astrológica
                    </h5>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                        <span className="block text-[9px] font-bold text-amber-500 uppercase mb-1">
                          Mês Correspondente
                        </span>
                        <span className="font-medium text-slate-800">
                          {currentHouse?.month}
                        </span>
                      </div>
                      <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                        <span className="block text-[9px] font-bold text-indigo-500 uppercase mb-1">
                          Signo / Energia
                        </span>
                        <span className="font-medium text-slate-800">
                          {currentHouse?.zodiac}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase mb-1">
                        Regra Pedagógica
                      </span>
                      <p className="text-xs text-slate-600 italic">
                        {currentHouse?.pedagogicalRule}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
