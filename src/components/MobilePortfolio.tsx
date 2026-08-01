import React, { useState, useEffect } from 'react';
import { 
  Briefcase, FolderGit2, 
  FileText, Sparkles, Award, Activity, Package, GitCommit
} from 'lucide-react';
import { whoami, experience, projects, education } from '../content';

export const MobilePortfolio: React.FC = () => {
  const [npmDownloads, setNpmDownloads] = useState<number>(830);
  const [latestCommitMsg, setLatestCommitMsg] = useState<string>('Optimizing high-frequency systems algorithms & Web Audio API visualizers');

  useEffect(() => {
    async function fetchMobileStats() {
      try {
        const [zyraRes, ezRes, eventsRes] = await Promise.allSettled([
          fetch('https://api.npmjs.org/downloads/point/last-month/zyra-ts'),
          fetch('https://api.npmjs.org/downloads/point/last-month/ez-templates'),
          fetch('https://api.github.com/users/AndreaPallotta/events/public?per_page=10'),
        ]);

        let sum = 0;
        if (zyraRes.status === 'fulfilled' && zyraRes.value.ok) {
          const zData = await zyraRes.value.json();
          sum += zData.downloads || 480;
        } else sum += 480;

        if (ezRes.status === 'fulfilled' && ezRes.value.ok) {
          const eData = await ezRes.value.json();
          sum += eData.downloads || 350;
        } else sum += 350;

        setNpmDownloads(sum);

        if (eventsRes.status === 'fulfilled' && eventsRes.value.ok) {
          const evts = await eventsRes.value.json();
          const push = evts.find((e: any) => e.type === 'PushEvent');
          if (push && push.payload?.commits?.[0]) {
            const repo = push.repo.name.replace('AndreaPallotta/', '');
            const msg = push.payload.commits[0].message.split('\n')[0];
            setLatestCommitMsg(`[${repo}] ${msg}`);
          }
        }
      } catch (err) {
        console.warn(err);
      }
    }
    fetchMobileStats();
  }, []);

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

      {/* Live Telemetry & Activity Card */}
      <div className="p-6 rounded-2xl bg-[#0f172a]/90 border border-slate-800 shadow-xl space-y-4 font-mono text-xs">
        <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
          <span>Live Telemetry & Activity</span>
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>NPM Downloads</span>
              <Package className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-lg font-bold text-white mt-1">{npmDownloads.toLocaleString()}+</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Public Repos</span>
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-lg font-bold text-white mt-1">{projects.length}</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-[10px] text-blue-400 uppercase font-bold flex items-center gap-1">
            <GitCommit className="w-3 h-3 text-blue-400" />
            <span>Extrapolated Current Focus</span>
          </div>
          <div className="text-[11px] text-slate-300 truncate">{latestCommitMsg}</div>
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
