import React, { useState, useEffect } from 'react';
import { 
  Briefcase, FolderGit2, FileText, Award, ExternalLink, 
  Download, Terminal, Activity, Sun, Moon
} from 'lucide-react';
import { whoami, experience, projects, education, skills } from '../content';
import { TerminalShell } from './TerminalShell';
import { StatsPage } from './StatsPage';

export const SystemOverview3D: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shell' | 'stats' | 'experience' | 'projects' | 'education' | 'resume'>('shell');
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

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-blue-500 selection:text-white relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#090d16] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      
      {/* Top Header Bar */}
      <header className={`h-16 border-b px-6 md:px-12 flex items-center justify-between backdrop-blur-md sticky top-0 z-40 transition-colors duration-300 ${
        isDark ? 'bg-[#0f172a]/90 border-slate-800/80' : 'bg-white/90 border-slate-200/80 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          {/* Top Left Cybernetic Terminal Icon */}
          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shadow-sm ${
            isDark ? 'bg-blue-600/20 border-blue-500/40 text-blue-400 shadow-blue-500/30' : 'bg-blue-50 border-blue-300 text-blue-600'
          }`}>
            <Terminal className="w-5 h-5" />
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
      <main className="flex-1 relative flex w-full">
        
        {/* VIEW 1: OVERVIEW — FULL SITE INTERACTIVE CLI SHELL */}
        {activeTab === 'shell' && (
          <div className="flex-1 w-full flex flex-col animate-in fade-in duration-200">
            <TerminalShell onNavigateTab={(t) => setActiveTab(t)} isDark={isDark} />
          </div>
        )}

        {/* VIEW 2: CAREER EXPERIENCE TIMELINE */}
        {activeTab === 'experience' && (
          <div className="max-w-4xl w-full mx-auto p-6 md:p-12 space-y-8 overflow-y-auto max-h-[calc(100vh-140px)] animate-in fade-in duration-200 pb-28">
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
          <div className="max-w-6xl w-full mx-auto p-6 md:p-12 space-y-8 overflow-y-auto max-h-[calc(100vh-140px)] animate-in fade-in duration-200 pb-28">
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
          <div className="max-w-4xl w-full mx-auto p-6 md:p-12 space-y-8 overflow-y-auto max-h-[calc(100vh-140px)] animate-in fade-in duration-200 pb-28">
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
          <div className="max-w-4xl w-full mx-auto p-6 md:p-12 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] animate-in fade-in duration-200 pb-28">
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

        {/* VIEW 6: LIVE TELEMETRY & COMMIT STATS */}
        {activeTab === 'stats' && (
          <div className="flex-1 w-full flex flex-col animate-in fade-in duration-200">
            <StatsPage isDark={isDark} />
          </div>
        )}
      </main>

      {/* Floating Glass Navigation Dock (6 Tabs - Stats at the end) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <nav className={`flex items-center gap-1.5 p-2 rounded-2xl border shadow-2xl backdrop-blur-xl font-mono text-xs ${
          isDark ? 'bg-[#0f172a]/95 border-slate-800/80 text-slate-300' : 'bg-white/95 border-slate-200 text-slate-700 shadow-slate-200/50'
        }`}>
          <button
            onClick={() => setActiveTab('shell')}
            className={`px-3.5 py-2.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'shell' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
            }`}
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`px-3.5 py-2.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'experience' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
            }`}
          >
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span>Experience</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3.5 py-2.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'projects' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
            }`}
          >
            <FolderGit2 className="w-4 h-4 text-emerald-400" />
            <span>Projects</span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`px-3.5 py-2.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'education' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
            }`}
          >
            <Award className="w-4 h-4 text-purple-400" />
            <span>Education</span>
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            className={`px-3.5 py-2.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'resume' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Résumé</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`px-3.5 py-2.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'stats' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
            }`}
          >
            <Activity className="w-4 h-4 text-blue-400" />
            <span>Stats</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
