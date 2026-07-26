import React from 'react';
import { 
  Briefcase, FolderGit2, ExternalLink, 
  FileText, Sparkles, Award 
} from 'lucide-react';
import { whoami, experience, projects, skills, education } from '../content';

export const MobilePortfolio: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 p-4 space-y-6 font-sans selection:bg-violet-500 selection:text-white pb-12">
      {/* Mobile Top Header */}
      <div className="p-6 rounded-2xl bg-[#0f172a]/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-violet-950 text-violet-300 border border-violet-500/30">
            {whoami.roleTitle}
          </span>
          <a
            href={whoami.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-mono text-cyan-400 font-bold"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Résumé</span>
          </a>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">{whoami.name}</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">Susquehanna</p>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-[#0b0f19]/60 p-3.5 rounded-xl border border-slate-800">
          {whoami.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
          <a
            href="https://github.com/AndreaPallotta"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 font-bold"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>GitHub</span>
          </a>
          <a
            href="https://subroutine-cs.cc"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Subroutine</span>
          </a>
          <a
            href="https://dot.cards/apdev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 font-bold"
          >
            <span>Dot Card</span>
          </a>
        </div>
      </div>

      {/* Experience History */}
      <div className="p-6 rounded-2xl bg-[#0f172a]/90 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-violet-400" />
          <span>Work Experience</span>
        </h2>

        <div className="space-y-6">
          {experience.map((exp, idx) => (
            <div key={idx} className="space-y-2 border-b border-slate-800/80 pb-4 last:border-none last:pb-0">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-bold text-white">{exp.role}</h3>
                <span className="text-[10px] font-mono text-slate-400">{exp.when}</span>
              </div>
              <div className="text-xs font-mono text-cyan-400 font-bold">{exp.company}</div>
              <ul className="space-y-1.5 pt-1">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="text-xs text-slate-300 leading-relaxed flex items-start gap-1.5">
                    <span className="text-violet-400 font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <div className="p-6 rounded-2xl bg-[#0f172a]/90 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-cyan-400" />
          <span>Featured Projects ({projects.length})</span>
        </h2>

        <div className="space-y-4">
          {projects.map(proj => (
            <div key={proj.id} className="p-4 rounded-xl bg-[#0b0f19]/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white font-mono">{proj.title}</h3>
                {proj.id === 'subroutine' && (
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    Flagship
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{proj.summary}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {proj.tags.slice(0, 4).map(t => (
                  <span key={t} className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] font-mono border border-slate-800">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-800/60 font-mono text-xs">
                {proj.links.map(l => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-cyan-400 font-semibold"
                  >
                    <span>{l.label}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dedicated Education Section */}
      <div className="p-6 rounded-2xl bg-[#0f172a]/90 border border-slate-800 shadow-xl space-y-3">
        <h2 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Education & Academic Background</span>
        </h2>
        <div className="text-xs text-slate-200 space-y-1">
          <div className="font-bold text-white text-sm">{education.school}</div>
          <div className="text-slate-300">{education.degree} (Minor in {education.minor})</div>
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold mt-2">
            Honors: {education.honors} (GPA: {education.gpa})
          </div>
        </div>
      </div>
    </div>
  );
};
