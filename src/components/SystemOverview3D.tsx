import React, { useState, useEffect, useRef } from 'react';
import { 
  Briefcase, FolderGit2, FileText, Award, ExternalLink, 
  X, Download, Orbit, Sun, Moon
} from 'lucide-react';
import { whoami, experience, projects, education, skills } from '../content';

interface Node3DData {
  id: string;
  title: string;
  category: string;
  colorDark: string;
  colorLight: string;
  angle: number;
  detailsType: 'experience' | 'projects' | 'education' | 'skills' | 'resume';
}

export const SystemOverview3D: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'projects' | 'education' | 'resume'>('overview');
  const [selectedNode, setSelectedNode] = useState<Node3DData | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [showPdfEmbed, setShowPdfEmbed] = useState(false);

  // Initialize theme from system preference or saved localStorage
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ap_portfolio_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);
  const dragDistanceRef = useRef(0);

  // Sync theme with HTML root class & localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('ap_portfolio_theme', theme);
  }, [theme]);

  // Listen for system theme changes if not overridden
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('ap_portfolio_theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 5 High-Level Orbiting 3D Nodes (Cobalt Blue, Sapphire, Amber, Emerald, Indigo)
  const nodes3D: Node3DData[] = [
    {
      id: 'exp_node',
      title: 'Work Experience',
      category: 'CAREER HISTORY',
      colorDark: '#3b82f6', // Cobalt Blue
      colorLight: '#2563eb',
      angle: 0,
      detailsType: 'experience',
    },
    {
      id: 'projects_node',
      title: 'Featured Projects',
      category: 'SOFTWARE & TOOLS',
      colorDark: '#0284c7', // Sapphire Blue
      colorLight: '#0369a1',
      angle: (Math.PI * 2) / 5,
      detailsType: 'projects',
    },
    {
      id: 'edu_node',
      title: 'Education & Honors',
      category: 'ACADEMIC BACKGROUND',
      colorDark: '#f59e0b', // Amber Gold
      colorLight: '#d97706',
      angle: (Math.PI * 2 * 2) / 5,
      detailsType: 'education',
    },
    {
      id: 'skills_node',
      title: 'Technical Stack',
      category: 'SYSTEMS & AUTOMATION',
      colorDark: '#10b981', // Emerald
      colorLight: '#059669',
      angle: (Math.PI * 2 * 3) / 5,
      detailsType: 'skills',
    },
    {
      id: 'resume_node',
      title: 'Résumé',
      category: 'PDF DOCUMENT',
      colorDark: '#6366f1', // Indigo Blue
      colorLight: '#4f46e5',
      angle: (Math.PI * 2 * 4) / 5,
      detailsType: 'resume',
    },
  ];

  // Get exact canvas coordinates scaling for DPI/CSS mismatches
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { mx: 0, my: 0, canvas: null };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;
    return { mx, my, canvas };
  };

  // 60FPS 3D Orbit Ring Rendering Loop
  useEffect(() => {
    if (activeTab !== 'overview') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = Math.max(650, window.innerHeight - 140);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radiusX = Math.min(360, canvas.width * 0.35);
      const radiusY = 110;

      const isDark = theme === 'dark';

      // Auto-rotation if not dragging
      if (!isDraggingRef.current) {
        rotationRef.current += 0.003;
      }

      // 1. Draw 3D Orbiting Ring Line
      ctx.beginPath();
      ctx.ellipse(cx, cy, radiusX, radiusY, 0, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? 'rgba(59, 130, 246, 0.25)' : 'rgba(37, 99, 235, 0.25)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Draw 3D Central Core Sphere (ANDREA PALLOTTA)
      const corePulse = Math.sin(Date.now() * 0.003) * 4;
      ctx.shadowColor = isDark ? '#3b82f6' : '#2563eb';
      ctx.shadowBlur = 24 + corePulse;

      ctx.beginPath();
      ctx.arc(cx, cy, 38 + corePulse, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#0f172a' : '#ffffff';
      ctx.strokeStyle = isDark ? '#3b82f6' : '#2563eb';
      ctx.lineWidth = 3;
      ctx.fill();
      ctx.stroke();

      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
      ctx.textAlign = 'center';
      ctx.fillText('ANDREA PALLOTTA', cx, cy - 3);

      ctx.font = '9px Fira Code, monospace';
      ctx.fillStyle = isDark ? '#60a5fa' : '#2563eb';
      ctx.fillText('ENGINEER', cx, cy + 10);
      ctx.shadowBlur = 0;

      // 3. Compute 3D Positions & Sort Depth Z
      const projectedNodes = nodes3D.map(node => {
        const currentAngle = node.angle + rotationRef.current;
        const x = cx + Math.cos(currentAngle) * radiusX;
        const y = cy + Math.sin(currentAngle) * radiusY;
        const z = Math.sin(currentAngle); // Scale & Depth (-1 to 1)
        const scale = 0.75 + (z + 1) * 0.25; // Scale from 0.75 to 1.25

        return { ...node, px: x, py: y, scale, z };
      });

      // Sort Nodes by Z (back to front)
      projectedNodes.sort((a, b) => a.z - b.z);

      // 4. Render 3D Orbiting Topic Cards
      projectedNodes.forEach(node => {
        const isSelected = selectedNode?.id === node.id;
        const isHovered = hoveredNodeId === node.id;
        const active = isSelected || isHovered;
        const nodeColor = isDark ? node.colorDark : node.colorLight;

        const cardW = 150 * node.scale;
        const cardH = 80 * node.scale;

        // Connecting Beam to Core
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(node.px, node.py);
        ctx.strokeStyle = active ? nodeColor : (isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(203, 213, 225, 0.6)');
        ctx.lineWidth = active ? 2 : 1;
        ctx.stroke();

        // 3D Glass Card Body
        ctx.shadowColor = nodeColor;
        ctx.shadowBlur = active ? 28 : 8 * node.scale;

        ctx.fillStyle = active 
          ? (isDark ? '#1e293b' : '#dbeafe') 
          : (isDark ? '#0f172a' : '#ffffff');
        ctx.strokeStyle = active ? (isDark ? '#ffffff' : '#1e3a8a') : nodeColor;
        ctx.lineWidth = active ? 3 : 2;

        ctx.beginPath();
        ctx.roundRect(node.px - cardW / 2, node.py - cardH / 2, cardW, cardH, 12 * node.scale);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Topic Title
        ctx.font = `bold ${Math.max(10, Math.round((active ? 13 : 12) * node.scale))}px Inter, sans-serif`;
        ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
        ctx.textAlign = 'center';
        ctx.fillText(node.title, node.px, node.py - 4 * node.scale);

        // Category Tag
        ctx.font = `${Math.max(8, Math.round(9 * node.scale))}px Fira Code, monospace`;
        ctx.fillStyle = active ? (isDark ? '#ffffff' : '#1e3a8a') : nodeColor;
        ctx.fillText(node.category, node.px, node.py + 14 * node.scale);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [activeTab, selectedNode, hoveredNodeId, theme]);

  // Drag Controls for 3D Ring Rotation
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMouseXRef.current = e.clientX;
    dragDistanceRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDraggingRef.current) {
      const deltaX = e.clientX - lastMouseXRef.current;
      rotationRef.current += deltaX * 0.005;
      dragDistanceRef.current += Math.abs(deltaX);
      lastMouseXRef.current = e.clientX;
    }

    // Hover Hit Test with exact Canvas scaling
    const { mx, my, canvas } = getCanvasCoords(e);
    if (!canvas) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radiusX = Math.min(360, canvas.width * 0.35);
    const radiusY = 110;

    const projected = nodes3D.map(node => {
      const currentAngle = node.angle + rotationRef.current;
      const x = cx + Math.cos(currentAngle) * radiusX;
      const y = cy + Math.sin(currentAngle) * radiusY;
      const z = Math.sin(currentAngle);
      const scale = 0.75 + (z + 1) * 0.25;
      const cardW = 150 * scale;
      const cardH = 80 * scale;
      return { ...node, px: x, py: y, cardW, cardH, z };
    });

    projected.sort((a, b) => b.z - a.z);

    const hovered = projected.find(n => 
      Math.abs(mx - n.px) <= n.cardW / 2 && Math.abs(my - n.py) <= n.cardH / 2
    );

    setHoveredNodeId(hovered ? hovered.id : null);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Click Node on 3D Canvas
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (dragDistanceRef.current > 5) return;

    const { mx, my, canvas } = getCanvasCoords(e);
    if (!canvas) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radiusX = Math.min(360, canvas.width * 0.35);
    const radiusY = 110;

    const projected = nodes3D.map(node => {
      const currentAngle = node.angle + rotationRef.current;
      const x = cx + Math.cos(currentAngle) * radiusX;
      const y = cy + Math.sin(currentAngle) * radiusY;
      const z = Math.sin(currentAngle);
      const scale = 0.75 + (z + 1) * 0.25;
      const cardW = 150 * scale;
      const cardH = 80 * scale;
      return { ...node, px: x, py: y, cardW, cardH, z };
    });

    projected.sort((a, b) => b.z - a.z);

    const clicked = projected.find(n => 
      Math.abs(mx - n.px) <= n.cardW / 2 && Math.abs(my - n.py) <= n.cardH / 2
    );

    if (clicked) {
      setSelectedNode(clicked);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-blue-500 selection:text-white relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#090d16] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      
      {/* Top Header */}
      <header className={`h-16 border-b px-6 md:px-12 flex items-center justify-between backdrop-blur-md sticky top-0 z-40 transition-colors duration-300 ${
        isDark ? 'bg-[#0f172a]/90 border-slate-800/80' : 'bg-white/90 border-slate-200/80 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          {/* Top Left Cybernetic Terminal Icon */}
          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shadow-sm ${
            isDark ? 'bg-blue-600/20 border-blue-500/40 text-blue-400 shadow-blue-500/30' : 'bg-blue-50 border-blue-300 text-blue-600'
          }`}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </div>
          <div>
            <h1 className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{whoami.name}</h1>
            <p className={`text-[11px] font-mono font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{whoami.roleTitle} @ Susquehanna</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Light / Dark Mode Theme Toggle */}
          <button
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-mono font-bold ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title="Toggle Light/Dark Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
          </button>

          <a
            href={whoami.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30"
          >
            <Download className="w-4 h-4" />
            <span>Résumé PDF</span>
          </a>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 relative flex">
        
        {/* VIEW 1: OVERVIEW — 3D Orbiting Topic Nodes */}
        {activeTab === 'overview' && (
          <div className="flex-1 relative overflow-hidden">
            
            {/* Onscreen Hint */}
            <div className="absolute top-4 left-6 z-10 pointer-events-none">
              <span className={`px-3.5 py-1.5 rounded-full border text-xs font-mono backdrop-blur-md flex items-center gap-2 ${
                isDark ? 'bg-[#0f172a]/90 border-slate-800 text-blue-300' : 'bg-white/90 border-slate-200 text-blue-700 shadow-sm'
              }`}>
                <Orbit className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <span>Drag mouse to spin 3D node ring or click any topic card to inspect</span>
              </span>
            </div>

            {/* 3D Canvas */}
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onClick={handleCanvasClick}
              className={`w-full h-full ${hoveredNodeId ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'}`}
            />

            {/* Selected Topic Inspection Drawer */}
            {selectedNode && (
              <aside className={`absolute right-6 top-6 bottom-6 w-96 max-w-full border rounded-2xl shadow-2xl p-6 flex flex-col justify-between backdrop-blur-xl z-30 animate-in slide-in-from-right-4 duration-200 ${
                isDark ? 'bg-[#0f172a]/95 border-slate-800' : 'bg-white/95 border-slate-200 text-slate-900'
              }`}>
                <div className="space-y-4 overflow-y-auto pr-1">
                  <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                    <span
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider"
                      style={{ 
                        backgroundColor: (isDark ? selectedNode.colorDark : selectedNode.colorLight) + '20', 
                        color: isDark ? selectedNode.colorDark : selectedNode.colorLight, 
                        borderColor: (isDark ? selectedNode.colorDark : selectedNode.colorLight) + '40' 
                      }}
                    >
                      {selectedNode.category}
                    </span>
                    <button
                      onClick={() => setSelectedNode(null)}
                      className={`p-1 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedNode.title}</h2>
                  </div>

                  {/* Dynamic Content Details Based on Topic Type */}
                  {selectedNode.detailsType === 'experience' && (
                    <div className="space-y-3 text-xs">
                      <p className={`leading-relaxed p-3 rounded-xl border ${
                        isDark ? 'bg-[#090d16]/80 text-slate-300 border-slate-800' : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}>
                        Production Engineer @ Susquehanna on the Equities & Futures desk, architecting Python APIs, internal tools, and system automation.
                      </p>
                      {experience.map((exp, idx) => (
                        <div key={idx} className={`p-3 rounded-xl border space-y-1 ${
                          isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
                        }`}>
                          <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{exp.role}</div>
                          <div className={`font-mono text-[11px] ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{exp.company} • {exp.when}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedNode.detailsType === 'projects' && (
                    <div className="space-y-2 text-xs">
                      {projects.map(p => (
                        <div key={p.id} className={`p-3 rounded-xl border space-y-1 ${
                          isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
                        }`}>
                          <div className={`font-bold font-mono flex items-center justify-between ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            <span>{p.title}</span>
                            <a href={p.links[0]?.url} target="_blank" rel="noopener noreferrer" className={isDark ? 'text-blue-400' : 'text-blue-600'}>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <div className={`text-[11px] leading-snug ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{p.summary}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedNode.detailsType === 'education' && (
                    <div className="space-y-3 text-xs">
                      <div className={`p-4 rounded-xl border space-y-1 ${
                        isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
                      }`}>
                        <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{education.school}</div>
                        <div className={isDark ? 'text-slate-300' : 'text-slate-700'}>{education.degree} (Minor in {education.minor})</div>
                        <div className="text-amber-500 font-semibold pt-1">Honors: {education.honors} (GPA: {education.gpa})</div>
                      </div>
                    </div>
                  )}

                  {selectedNode.detailsType === 'skills' && (
                    <div className="space-y-3 text-xs">
                      <div>
                        <span className={`font-mono text-[11px] block mb-1 uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Languages</span>
                        <div className="flex flex-wrap gap-1">
                          {skills.languages.map(l => (
                            <span key={l} className={`px-2 py-0.5 rounded font-mono text-[11px] border ${
                              isDark ? 'bg-blue-950/60 text-blue-300 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200'
                            }`}>{l}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className={`font-mono text-[11px] block mb-1 uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Backend & Systems</span>
                        <div className="flex flex-wrap gap-1">
                          {skills.backend.map(b => (
                            <span key={b} className={`px-2 py-0.5 rounded font-mono text-[11px] border ${
                              isDark ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}>{b}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedNode.detailsType === 'resume' && (
                    <div className="space-y-3 text-xs">
                      <p className={`leading-relaxed p-3 rounded-xl border ${
                        isDark ? 'bg-[#090d16]/80 text-slate-300 border-slate-800' : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}>
                        View or download the latest 2026 PDF Résumé for Andrea Pallotta.
                      </p>
                      <a
                        href={whoami.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-2 transition-colors shadow-md"
                      >
                        <Download className="w-4 h-4" />
                        <span>Open Résumé PDF</span>
                      </a>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    if (selectedNode.detailsType !== 'skills') {
                      setActiveTab(selectedNode.detailsType as any);
                    }
                    setSelectedNode(null);
                  }}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border mt-4 ${
                    isDark 
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  }`}
                >
                  <span>Open Full {selectedNode.title} Tab →</span>
                </button>
              </aside>
            )}
          </div>
        )}

        {/* VIEW 2: CAREER EXPERIENCE TIMELINE */}
        {activeTab === 'experience' && (
          <div className="max-w-4xl w-full mx-auto p-6 md:p-12 space-y-8 overflow-y-auto max-h-[calc(100vh-140px)] animate-in fade-in duration-200">
            <div>
              <h2 className={`text-2xl font-extrabold tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Briefcase className="w-6 h-6 text-blue-500" />
                <span>Career Experience</span>
              </h2>
              <p className={`text-xs font-mono mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Susquehanna & Council Rock</p>
            </div>

            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className={`p-6 md:p-8 rounded-2xl border shadow-xl space-y-4 ${
                  isDark ? 'bg-[#0f172a]/90 border-slate-800' : 'bg-white border-slate-200 shadow-slate-100'
                }`}>
                  <div className={`flex flex-wrap items-baseline justify-between gap-2 border-b pb-3 ${isDark ? 'border-slate-800/80' : 'border-slate-100'}`}>
                    <div>
                      <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{exp.role}</h3>
                      <p className={`text-xs font-mono font-bold mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                        {exp.company} <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>| {exp.location}</span>
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full border text-xs font-mono font-bold ${
                      isDark ? 'bg-blue-950 text-blue-300 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {exp.when}
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className={`text-xs md:text-sm leading-relaxed flex items-start gap-2.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <span className="text-blue-500 font-bold mt-1">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: FEATURED PROJECTS MATRIX */}
        {activeTab === 'projects' && (
          <div className="max-w-6xl w-full mx-auto p-6 md:p-12 space-y-8 overflow-y-auto max-h-[calc(100vh-140px)] animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className={`text-2xl font-extrabold tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <FolderGit2 className="w-6 h-6 text-blue-500" />
                  <span>Featured Software Projects ({projects.length})</span>
                </h2>
                <p className={`text-xs font-mono mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Full-stack software, CLI utilities, and CS platforms</p>
              </div>

              <a
                href="https://github.com/AndreaPallotta?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono font-bold text-xs border transition-all shadow-md ${
                  isDark 
                    ? 'bg-slate-800 hover:bg-slate-700 text-blue-400 border-slate-700 hover:border-blue-500/50' 
                    : 'bg-white hover:bg-slate-50 text-blue-600 border-slate-200 hover:border-blue-300 shadow-slate-100'
                }`}
              >
                <span>View All Repositories on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(proj => (
                <div key={proj.id} className={`p-6 rounded-2xl border shadow-xl flex flex-col justify-between space-y-4 transition-all group ${
                  isDark 
                    ? 'bg-[#0f172a]/90 border-slate-800 hover:border-blue-500/50' 
                    : 'bg-white border-slate-200 shadow-slate-100 hover:border-blue-300'
                }`}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-base font-bold font-mono transition-colors ${
                        isDark ? 'text-white group-hover:text-blue-300' : 'text-slate-900 group-hover:text-blue-600'
                      }`}>
                        {proj.title}
                      </h3>
                      {proj.id === 'subroutine' && (
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                          isDark ? 'bg-blue-950 text-blue-300 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          Flagship
                        </span>
                      )}
                    </div>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{proj.summary}</p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.tags.map(t => (
                        <span key={t} className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono border ${
                          isDark ? 'bg-slate-900 text-slate-400 border-slate-800' : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`pt-4 border-t flex items-center gap-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                    {proj.links.map(l => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 text-xs font-mono font-bold ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                      >
                        <span>{l.label}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: DEDICATED EDUCATION TAB */}
        {activeTab === 'education' && (
          <div className="max-w-4xl w-full mx-auto p-6 md:p-12 space-y-8 overflow-y-auto max-h-[calc(100vh-140px)] animate-in fade-in duration-200">
            <div>
              <h2 className={`text-2xl font-extrabold tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Award className="w-6 h-6 text-amber-500" />
                <span>Education & Academic Background</span>
              </h2>
              <p className={`text-xs font-mono mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Rochester Institute of Technology (RIT)</p>
            </div>

            <div className={`p-8 rounded-2xl border shadow-xl space-y-6 ${
              isDark ? 'bg-[#0f172a]/90 border-slate-800' : 'bg-white border-slate-200 shadow-slate-100'
            }`}>
              <div className={`flex flex-wrap items-baseline justify-between gap-2 border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <div>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{education.school}</h3>
                  <p className={`text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{education.degree}</p>
                  <p className={`text-xs font-mono mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Minor in {education.minor}</p>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
                  Graduated {education.graduated}
                </span>
              </div>

              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-amber-50/50 border-amber-200/60'
              }`}>
                <span className="text-sm font-bold text-amber-600 dark:text-amber-300">Honors: {education.honors}</span>
                <span className={`text-xs font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Cumulative GPA: {education.gpa}</span>
              </div>

              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Graduated with highest academic honors (*Summa Cum Laude*) from Rochester Institute of Technology. Coursework emphasized software engineering, web architecture, Linux systems, networking protocols, and cyber security principles.
              </p>
            </div>
          </div>
        )}

        {/* VIEW 5: HIGH-READABILITY RÉSUMÈ TAB */}
        {activeTab === 'resume' && (
          <div className="max-w-4xl w-full mx-auto p-6 md:p-12 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] animate-in fade-in duration-200">
            {/* Header & Quick Action Buttons */}
            <div className={`flex flex-wrap items-center justify-between gap-4 border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <div>
                <h2 className={`text-2xl font-extrabold tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <FileText className="w-6 h-6 text-blue-500" />
                  <span>Résumé</span>
                </h2>
                <p className={`text-xs font-mono mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Production & Software Engineer — Philadelphia, PA</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowPdfEmbed(prev => !prev)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold border transition-colors ${
                    isDark 
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' 
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-sm'
                  }`}
                >
                  {showPdfEmbed ? 'Hide PDF Embed' : 'View PDF Embed'}
                </button>

                <a
                  href={whoami.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-blue-600/30"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>

            {/* Optional Embedded PDF Viewer Accordion */}
            {showPdfEmbed && (
              <div className={`w-full h-[700px] rounded-2xl overflow-hidden border shadow-2xl animate-in fade-in duration-200 ${
                isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <iframe
                  src={whoami.resumeUrl}
                  className="w-full h-full"
                  title="Andrea Pallotta Resume PDF"
                />
              </div>
            )}

            {/* High-Readability Interactive HTML Resume Card */}
            <div className={`p-8 md:p-12 rounded-3xl border shadow-2xl space-y-8 font-sans ${
              isDark ? 'bg-[#0f172a]/95 border-slate-800' : 'bg-white border-slate-200 shadow-slate-100'
            }`}>
              
              {/* Single Horizontal Line Contact Info Header */}
              <div className={`text-center space-y-3 border-b pb-6 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <h1 className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>ANDREA PALLOTTA</h1>
                <div className={`flex flex-wrap items-center justify-center gap-2 text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span className="whitespace-nowrap">Philadelphia, PA</span>
                  <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>•</span>
                  <span className="whitespace-nowrap">(585) 981-8202</span>
                  <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>•</span>
                  <a href={`mailto:${whoami.email}`} className={`hover:underline whitespace-nowrap ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{whoami.email}</a>
                  <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>•</span>
                  <a href="https://dot.cards/apdev" target="_blank" rel="noopener noreferrer" className={`hover:underline whitespace-nowrap ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>dot.cards/apdev</a>
                  <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>•</span>
                  <a href="https://subroutine-cs.cc" target="_blank" rel="noopener noreferrer" className={`hover:underline whitespace-nowrap ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>subroutine-cs.cc</a>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold text-blue-500 uppercase tracking-wider">Professional Summary</h3>
                <p className={`text-xs leading-relaxed p-4 rounded-xl border ${
                  isDark ? 'bg-[#090d16]/80 text-slate-300 border-slate-800' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}>
                  {whoami.tagline} Proven track record of building reliable software, internal customer-facing dashboards, RESTful APIs, and observability tooling for enterprise trading infrastructure. Pragmatic problem solver dedicated to system health, release automation, and clean architecture.
                </p>
              </div>

              {/* Technical Skills */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-blue-500 uppercase tracking-wider">Technical Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className={`font-mono font-semibold block mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Languages & Core:</span>
                    <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{skills.languages.join(', ')}</span>
                  </div>
                  <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className={`font-mono font-semibold block mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Backend & Services:</span>
                    <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{skills.backend.join(', ')}</span>
                  </div>
                  <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className={`font-mono font-semibold block mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Systems & Performance:</span>
                    <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{skills.systems.join(', ')}</span>
                  </div>
                  <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className={`font-mono font-semibold block mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>DevOps & Automation:</span>
                    <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{skills.practices.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-wider">Work Experience</h3>
                <div className="space-y-6">
                  {experience.map((exp, idx) => (
                    <div key={idx} className={`space-y-2 border-l-2 pl-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{exp.role}</h4>
                        <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{exp.when}</span>
                      </div>
                      <div className={`text-xs font-mono font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{exp.company} | {exp.location}</div>
                      <ul className="space-y-1.5 pt-1">
                        {exp.bullets.map((b, i) => (
                          <li key={i} className={`text-xs leading-relaxed flex items-start gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            <span className="text-blue-500 font-bold mt-0.5">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className={`space-y-3 pt-2 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <h3 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">Education</h3>
                <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-2 ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div>
                    <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{education.school}</h4>
                    <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{education.degree} (Minor in {education.minor})</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-300 font-semibold text-xs border border-amber-500/30">
                      {education.honors} (GPA: {education.gpa})
                    </span>
                    <p className={`text-xs font-mono mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{education.graduated}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Floating Glass Navigation Dock (5 Tabs) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <nav className={`flex items-center gap-2 p-2 rounded-2xl border shadow-2xl backdrop-blur-xl font-mono text-xs ${
          isDark ? 'bg-[#0f172a]/95 border-slate-800/80 text-slate-300' : 'bg-white/95 border-slate-200 text-slate-700 shadow-slate-200/50'
        }`}>
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
              activeTab === 'overview' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
            }`}
          >
            <Orbit className="w-4 h-4" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
              activeTab === 'experience' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Experience</span>
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
              activeTab === 'projects' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Projects</span>
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
              activeTab === 'education' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Education</span>
          </button>
          <button
            onClick={() => setActiveTab('resume')}
            className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
              activeTab === 'resume' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Résumé</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
