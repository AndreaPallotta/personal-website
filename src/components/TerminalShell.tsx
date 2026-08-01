import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, Trash2 } from 'lucide-react';
import { whoami, experience, projects, skills } from '../content';

export type TerminalTheme = 'cyber' | 'matrix' | 'amber' | 'dark' | 'light';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'banner' | 'system';
  text: string;
  isHtml?: boolean;
}

interface TerminalShellProps {
  onNavigateTab?: (tab: 'shell' | 'stats' | 'experience' | 'projects' | 'education' | 'resume') => void;
  isDark?: boolean;
}

const COMMANDS_LIST = ['help', 'whoami', 'exp', 'projects', 'stats', 'subroutine', 'resume', 'skills', 'theme', 'clear', 'ping'];

export const TerminalShell: React.FC<TerminalShellProps> = ({ onNavigateTab, isDark = true }) => {
  const [inputVal, setInputVal] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [termTheme, setTermTheme] = useState<TerminalTheme>('cyber');
  
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Initialize Terminal with Cyber ASCII Banner
  useEffect(() => {
    const bannerLines: TerminalLine[] = [
      {
        id: 'banner_1',
        type: 'banner',
        text: `
 █████╗ ██████╗       ██████╗ ███████╗██╗   ██╗
██╔══██╗██╔══██╗      ██╔══██╗██╔════╝██║   ██║
███████║██████╔╝█████╗██║  ██║█████╗  ██║   ██║
██╔══██║██╔═══╝ ╚════╝██║  ██║██╔══╝  ╚██╗ ██╔╝
██║  ██║██║           ██████╔╝███████╗ ╚████╔╝ 
╚═╝  ╚═╝╚═╝           ╚═════╝ ╚══════╝  ╚═══╝  
`
      },
      {
        id: 'banner_2',
        type: 'system',
        text: `SYSTEM OVERVIEW // APDEV OS v2.6.0 (x86_64-linux-gnu)`
      },
      {
        id: 'banner_3',
        type: 'system',
        text: `Type 'help' to see available shell commands, or click quick shortcut buttons below.`
      }
    ];
    setLines(bannerLines);
  }, []);

  // Auto-scroll to bottom on line added
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const addLine = (text: string, type: 'input' | 'output' | 'error' | 'system' = 'output') => {
    setLines(prev => [...prev, { id: Math.random().toString(), type, text }]);
  };

  const handleExecuteCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    // Save to command history
    setHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Render Input Prompt line
    addLine(`$ ${trimmed}`, 'input');

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg1 = parts[1] ? parts[1].toLowerCase() : '';

    switch (mainCmd) {
      case 'help':
        addLine(`
COMMAND DIRECTORY:
----------------------------------------------------------------------------------
[COMMAND]                  [DESCRIPTION]
----------------------------------------------------------------------------------
CORE:
  whoami                   Professional summary & current engineering status
  exp, work                Susquehanna & Council Rock career history log
  projects, ls             Open-source & flagship software projects
  skills                   Full technical stack matrix
  resume                   View/download latest PDF résumé

TELEMETRY & SITES:
  stats                    Open live NPM/PyPI telemetry & GitHub commit stream
  subroutine               View Subroutine CS flagship interactive blog details
  ping [host]              Simulate low-latency ICMP network ping

TERMINAL UTILITIES:
  theme <name>             Set theme: 'cyber', 'matrix', 'amber', 'dark', 'light'
  clear                    Clear terminal screen buffer
----------------------------------------------------------------------------------
Tip: Press [Tab] to auto-complete commands, or use [↑] / [↓] for command history.`, 'system');
        break;

      case 'whoami':
        addLine(`
NAME:       ${whoami.name}
ROLE:       ${whoami.roleTitle} @ ${whoami.company}
LOCATION:   ${whoami.location}
EDUCATION:  ${whoami.education}
TAGLINE:    ${whoami.tagline}
RESUME:     ${whoami.resumeUrl}
`, 'output');
        break;

      case 'exp':
      case 'work':
        let expOutput = `CAREER LOGS:\n----------------------------------------------------------------------\n`;
        experience.forEach(e => {
          expOutput += `[ROLE] ${e.role} @ ${e.company} (${e.when})\n`;
          e.bullets.forEach(b => {
            expOutput += `  • ${b}\n`;
          });
          expOutput += `\n`;
        });
        addLine(expOutput, 'output');
        break;

      case 'projects':
      case 'ls':
        let projOutput = `SOFTWARE PROJECTS:\n----------------------------------------------------------------------\n`;
        projects.forEach(p => {
          projOutput += `• ${p.title.toUpperCase()} [${p.tags.join(', ')}]\n  Summary: ${p.summary}\n  Link: ${p.links[0]?.url || 'N/A'}\n\n`;
        });
        addLine(projOutput, 'output');
        break;

      case 'stats':
        addLine(`[TELEMETRY] Navigating to Live Telemetry & GitHub Activity Stream...`, 'system');
        if (onNavigateTab) onNavigateTab('stats');
        break;

      case 'subroutine':
        addLine(`
SUBROUTINE CS (subroutine-cs.cc):
----------------------------------------------------------------------
Flagship interactive educational blog covering algorithms, C++, low-level
systems optimization, and neural networks with audio-visual simulations.
URL: https://subroutine-cs.cc
GitHub: https://github.com/AndreaPallotta/subroutine
`, 'output');
        break;

      case 'skills':
        addLine(`
TECHNICAL STACK MATRIX:
----------------------------------------------------------------------
Languages:      ${skills.languages.join(', ')}
Backend:        ${skills.backend.join(', ')}
Systems:        ${skills.systems.join(', ')}
Practices:      ${skills.practices.join(', ')}
`, 'output');
        break;

      case 'resume':
        addLine(`Opening PDF Résumé: ${whoami.resumeUrl}...`, 'system');
        if (typeof window !== 'undefined') window.open(whoami.resumeUrl, '_blank');
        break;

      case 'theme':
        if (['cyber', 'matrix', 'amber', 'dark', 'light'].includes(arg1)) {
          setTermTheme(arg1 as TerminalTheme);
          addLine(`Terminal theme changed to: '${arg1}'`, 'system');
        } else {
          addLine(`Usage: theme [cyber | matrix | amber | dark | light]`, 'error');
        }
        break;

      case 'ping':
        const host = arg1 || 'subroutine-cs.cc';
        addLine(`PING ${host} (185.199.108.153): 56 data bytes`, 'system');
        setTimeout(() => addLine(`64 bytes from ${host}: icmp_seq=1 ttl=64 time=1.42 ms`, 'output'), 150);
        setTimeout(() => addLine(`64 bytes from ${host}: icmp_seq=2 ttl=64 time=1.18 ms`, 'output'), 300);
        setTimeout(() => addLine(`--- ${host} ping statistics --- 2 packets transmitted, 0% packet loss, time 1.30ms`, 'system'), 450);
        break;

      case 'clear':
        setLines([]);
        break;

      default:
        addLine(`Command not found: '${mainCmd}'. Type 'help' to see list of valid commands.`, 'error');
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleExecuteCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= history.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(nextIdx);
          setInputVal(history[nextIdx] || '');
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMANDS_LIST.find(c => c.startsWith(inputVal.toLowerCase().trim()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  // Color Theme Palettes
  const themeStyles = {
    cyber: {
      bg: isDark ? 'bg-[#090d16]' : 'bg-[#0f172a]',
      card: isDark ? 'bg-[#0f172a]/95 border-blue-500/30' : 'bg-slate-900 border-slate-700',
      text: 'text-cyan-300',
      prompt: 'text-blue-400',
      system: 'text-indigo-300',
      error: 'text-rose-400',
      accent: 'bg-blue-600 hover:bg-blue-500 text-white',
    },
    matrix: {
      bg: 'bg-black',
      card: 'bg-black border-emerald-500/40 shadow-emerald-500/10',
      text: 'text-emerald-400 font-mono',
      prompt: 'text-emerald-500 font-bold',
      system: 'text-emerald-500',
      error: 'text-rose-500',
      accent: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    },
    amber: {
      bg: 'bg-[#120a02]',
      card: 'bg-[#1c0f04] border-amber-500/40 shadow-amber-500/10',
      text: 'text-amber-300 font-mono',
      prompt: 'text-amber-400 font-bold',
      system: 'text-amber-400',
      error: 'text-rose-400',
      accent: 'bg-amber-600 hover:bg-amber-500 text-white',
    },
    dark: {
      bg: 'bg-slate-950',
      card: 'bg-slate-900 border-slate-800',
      text: 'text-slate-200',
      prompt: 'text-indigo-400',
      system: 'text-slate-400',
      error: 'text-red-400',
      accent: 'bg-indigo-600 hover:bg-indigo-500 text-white',
    },
    light: {
      bg: 'bg-slate-900',
      card: 'bg-slate-900 border-slate-700',
      text: 'text-slate-100',
      prompt: 'text-cyan-400',
      system: 'text-slate-400',
      error: 'text-rose-400',
      accent: 'bg-cyan-600 hover:bg-cyan-500 text-white',
    }
  }[termTheme];

  return (
    <div className="w-full h-[calc(100vh-64px)] px-2 md:px-4 pt-2 pb-24 font-mono text-xs flex flex-col space-y-2 select-text">
      
      {/* Quick Action Shortcut Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-slate-500 font-bold mr-1">Shortcuts:</span>
          {['help', 'whoami', 'exp', 'projects', 'stats', 'subroutine', 'resume'].map(cmd => (
            <button
              key={cmd}
              onClick={() => handleExecuteCommand(cmd)}
              className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-all text-[11px]"
            >
              ${cmd}
            </button>
          ))}
        </div>

        {/* Theme Selector Pill */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-900 rounded-lg border border-slate-800 text-[10px]">
          {(['cyber', 'matrix', 'amber', 'dark'] as TerminalTheme[]).map(t => (
            <button
              key={t}
              onClick={() => setTermTheme(t)}
              className={`px-2 py-0.5 rounded capitalize transition-all ${
                termTheme === t ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Full-Screen Edge-to-Edge Terminal Glass Container */}
      <div 
        onClick={() => {
          const sel = window.getSelection();
          if (!sel || sel.toString().length === 0) {
            inputRef.current?.focus();
          }
        }}
        className={`flex-1 w-full rounded-2xl border shadow-2xl p-3 md:p-5 flex flex-col justify-between overflow-hidden backdrop-blur-xl ${themeStyles.card}`}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span className="ml-2 font-bold text-slate-300 text-xs flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>apdev@linux:~</span>
            </span>
          </div>

          <button
            onClick={() => setLines([])}
            className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
            title="Clear Terminal Buffer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Terminal Scroll Output Buffer (Selection Enabled) */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-2 leading-relaxed select-text selection:bg-blue-500/40 selection:text-white">
          {lines.map((l) => {
            if (l.type === 'banner') {
              return (
                <pre key={l.id} className="text-cyan-400 font-extrabold text-[10px] md:text-xs leading-none overflow-x-auto py-1 select-text">
                  {l.text}
                </pre>
              );
            }
            if (l.type === 'input') {
              return (
                <div key={l.id} className="font-bold text-cyan-300 flex items-center gap-2 select-text">
                  <span>{l.text}</span>
                </div>
              );
            }
            if (l.type === 'error') {
              return (
                <pre key={l.id} className={`${themeStyles.error} whitespace-pre-wrap font-mono text-xs select-text`}>
                  {l.text}
                </pre>
              );
            }
            if (l.type === 'system') {
              return (
                <pre key={l.id} className={`${themeStyles.system} whitespace-pre-wrap font-mono text-xs select-text`}>
                  {l.text}
                </pre>
              );
            }
            return (
              <pre key={l.id} className={`${themeStyles.text} whitespace-pre-wrap font-mono text-xs select-text`}>
                {l.text}
              </pre>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Prompt Bar (Positioned safely above bottom nav dock) */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 shrink-0">
          <span className={`${themeStyles.prompt} font-bold text-sm shrink-0`}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command ('help', 'exp', 'stats', 'subroutine', 'projects')..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none font-mono text-xs"
            autoFocus
          />
          <button
            onClick={() => { handleExecuteCommand(inputVal); setInputVal(''); }}
            className={`p-1.5 rounded-lg transition-all ${themeStyles.accent}`}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
