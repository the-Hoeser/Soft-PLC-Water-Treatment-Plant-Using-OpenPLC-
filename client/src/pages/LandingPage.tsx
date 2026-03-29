import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Droplets, Factory, Monitor, Bell, ArrowRight,
  ChevronDown, Gauge, Activity, Shield,
  GraduationCap, BarChart3, Construction,
} from 'lucide-react';

/* ─── Static data ───────────────────────────────── */

const features = [
  {
    icon: Monitor,
    title: 'Interactive HMI',
    desc: 'Full-fidelity SVG process graphics with real-time animation, click-to-select equipment, and inline control panels.',
  },
  {
    icon: Bell,
    title: 'Alarm Management',
    desc: 'Four-tier priority alarms (LL/L/H/HH) with audible alerts, acknowledgment workflow, and persistent history.',
  },
  {
    icon: BarChart3,
    title: 'Process Trends',
    desc: '24-hour historian with 17 process tags. Overlay multiple trends and drag-select time ranges for analysis.',
  },
  {
    icon: GraduationCap,
    title: 'Guided Training',
    desc: 'Seven scenarios from routine operations to emergency response, plus step-by-step tutorials for new operators.',
  },
];

const stats = [
  { value: '10', label: 'HMI Screens', icon: Monitor },
  { value: '12', label: 'Process Alarms', icon: Bell },
  { value: '7', label: 'Scenarios', icon: Activity },
  { value: '17', label: 'Monitored Tags', icon: Gauge },
];

const dwStages = [
  { name: 'Intake', desc: 'Pumps & screening' },
  { name: 'Coag/Flocc', desc: 'Chemical dosing' },
  { name: 'Sedimentation', desc: 'Gravity settling' },
  { name: 'Filtration', desc: 'Turbidity removal' },
  { name: 'Disinfection', desc: 'Chlorination & pH' },
];

const wwStages = [
  { name: 'Headworks', desc: 'Screening & grit' },
  { name: 'Primary', desc: 'Sludge settling' },
  { name: 'Aeration', desc: 'Biological treatment' },
  { name: 'Secondary', desc: 'Final clarification' },
  { name: 'Disinfection', desc: 'UV & chlorine' },
];

/* ─── Component ─────────────────────────────────── */

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(56,189,248,0.07) 0%, transparent 70%),
            repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(56,189,248,0.035) 59px, rgba(56,189,248,0.035) 60px),
            repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(56,189,248,0.035) 59px, rgba(56,189,248,0.035) 60px),
            #050a14
          `,
        }}
      >
        {/* Floating ambient particles */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 rounded-full bg-sky-400/20"
              style={{
                left: `${10 + i * 11}%`,
                bottom: '-4px',
                animation: `landing-float ${10 + i * 3}s linear infinite`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Decorative flow line */}
        <svg className="absolute bottom-28 left-0 w-full h-[2px] opacity-15" aria-hidden="true">
          <line x1="0" y1="1" x2="100%" y2="1" stroke="#38bdf8" strokeWidth="1" strokeDasharray="8 6" className="animate-flow" />
        </svg>

        {/* Logo */}
        <div className="landing-logo-animate mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="80" height="80">
            <rect width="64" height="64" rx="14" fill="#0f172a" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5"/>
            <path d="M32 10 C32 10 16 28 16 38 a16 16 0 0 0 32 0 C48 28 32 10 32 10Z" fill="#38bdf8" opacity="0.85"/>
            <ellipse cx="26" cy="34" rx="3.5" ry="5.5" fill="white" opacity="0.18" transform="rotate(-20 26 34)"/>
            <path d="M44 20 a18 18 0 0 1 0 24" stroke="#60a5fa" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6"/>
            <path d="M48 16 a24 24 0 0 1 0 32" stroke="#60a5fa" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.35"/>
            <path d="M52 12 a30 30 0 0 1 0 40" stroke="#60a5fa" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.15"/>
          </svg>
        </div>

        {/* Title */}
        <h1 className="landing-animate text-center mb-1" style={{ animationDelay: '0.2s' }}>
          <span className="block text-5xl md:text-7xl lg:text-8xl tracking-[0.06em] text-white landing-heading">
            WATER SIMULATION LAB
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="landing-animate text-3xl md:text-4xl tracking-[0.1em] text-sky-400 landing-heading mt-2 mb-1"
          style={{ animationDelay: '0.3s' }}
        >
          SCADA TRAINING
        </p>

        {/* Animated divider */}
        <div className="landing-divider h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent my-6" />

        {/* Tagline */}
        <p
          className="landing-animate text-base md:text-lg text-slate-400 max-w-xl text-center mb-12 font-light leading-relaxed"
          style={{ animationDelay: '0.4s' }}
        >
          Water treatment plant simulation for operator training and certification preparation
        </p>

        {/* CTA Button */}
        <div className="landing-animate" style={{ animationDelay: '0.55s' }}>
          <a
            href="#select-simulator"
            className="group flex items-center gap-3 px-10 py-4 bg-sky-500/15 border border-sky-500/30 rounded-lg text-sky-200 hover:bg-sky-500/25 hover:border-sky-400/50 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.1)] hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]"
          >
            <span className="font-semibold tracking-wide text-sm">LAUNCH SIMULATOR</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 landing-scroll-hint">
          <ChevronDown size={24} className="text-slate-600" />
        </div>
      </section>

      {/* ═══ STATS ══════════════════════════════════ */}
      <section className="border-y border-slate-700/20 bg-[#060b16]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-700/20">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-4 px-6 py-6 bg-[#060b16]">
                <Icon size={20} className="text-sky-400/50 shrink-0" />
                <div>
                  <div className="text-2xl font-bold text-white landing-heading tracking-wide">{stat.value}</div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ ABOUT ══════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#050a14]">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-[11px] uppercase tracking-[0.25em] text-sky-400/60 font-semibold mb-5 border border-sky-500/15 px-4 py-1.5 rounded-full">
            About the Simulator
          </span>
          <h2 className="text-4xl md:text-5xl text-white mb-8 landing-heading tracking-wide">
            MASTER THE CONTROL ROOM
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            A browser-based SCADA training environment covering the complete water treatment
            process — from raw water intake through final disinfection and distribution. Control
            pumps, valves, and chemical feed systems. Respond to process alarms. Analyze historical
            trends. No installation required.
          </p>
        </div>
      </section>

      {/* ═══ FEATURES ═══════════════════════════════ */}
      <section className="pb-28 px-6 bg-[#050a14]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-[11px] uppercase tracking-[0.25em] text-sky-400/60 font-semibold mb-5 border border-sky-500/15 px-4 py-1.5 rounded-full">
              Capabilities
            </span>
            <h2 className="text-4xl md:text-5xl text-white landing-heading tracking-wide">
              EVERYTHING AN OPERATOR NEEDS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group p-6 rounded-xl bg-slate-900/40 border border-slate-700/40 hover:border-sky-500/25 transition-all duration-500"
                >
                  <div className="w-11 h-11 rounded-lg bg-sky-500/10 flex items-center justify-center mb-5 group-hover:bg-sky-500/15 transition-colors duration-500">
                    <Icon size={20} className="text-sky-400" />
                  </div>
                  <h3 className="text-white font-semibold text-[15px] mb-2">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS FLOW ═══════════════════════════ */}
      <section className="py-28 px-6 border-y border-slate-700/20 bg-[#060b16]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-[11px] uppercase tracking-[0.25em] text-sky-400/60 font-semibold mb-5 border border-sky-500/15 px-4 py-1.5 rounded-full">
              Treatment Process
            </span>
            <h2 className="text-4xl md:text-5xl text-white landing-heading tracking-wide">
              COMPLETE PLANT SIMULATION
            </h2>
          </div>

          {/* Drinking Water */}
          <div className="mb-14">
            <div className="flex items-center gap-2.5 mb-6">
              <Droplets size={16} className="text-sky-400" />
              <span className="text-xs text-sky-300/80 uppercase tracking-[0.2em] font-semibold">Drinking Water</span>
              <div className="flex-1 h-px bg-sky-500/10 ml-2" />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {dwStages.map((stage, i) => (
                <Fragment key={stage.name}>
                  <div className="px-5 py-3.5 rounded-lg bg-sky-500/[0.07] border border-sky-500/15 hover:border-sky-400/30 transition-colors duration-300">
                    <div className="text-white font-medium text-sm">{stage.name}</div>
                    <div className="text-sky-400/50 text-xs mt-0.5">{stage.desc}</div>
                  </div>
                  {i < dwStages.length - 1 && (
                    <ArrowRight size={14} className="text-sky-500/30 shrink-0 hidden sm:block" />
                  )}
                </Fragment>
              ))}
            </div>
          </div>

          {/* Wastewater */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <Factory size={16} className="text-emerald-400" />
              <span className="text-xs text-emerald-300/80 uppercase tracking-[0.2em] font-semibold">Wastewater</span>
              <div className="flex-1 h-px bg-emerald-500/10 ml-2" />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {wwStages.map((stage, i) => (
                <Fragment key={stage.name}>
                  <div className="px-5 py-3.5 rounded-lg bg-emerald-500/[0.07] border border-emerald-500/15 hover:border-emerald-400/30 transition-colors duration-300">
                    <div className="text-white font-medium text-sm">{stage.name}</div>
                    <div className="text-emerald-400/50 text-xs mt-0.5">{stage.desc}</div>
                  </div>
                  {i < wwStages.length - 1 && (
                    <ArrowRight size={14} className="text-emerald-500/30 shrink-0 hidden sm:block" />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SIMULATOR CARDS ════════════════════════ */}
      <section id="select-simulator" className="py-28 px-6 bg-[#050a14] scroll-mt-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-[11px] uppercase tracking-[0.25em] text-sky-400/60 font-semibold mb-5 border border-sky-500/15 px-4 py-1.5 rounded-full">
              Get Started
            </span>
            <h2 className="text-4xl md:text-5xl text-white landing-heading tracking-wide">
              SELECT YOUR SIMULATOR
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Drinking Water */}
            <button
              onClick={() => navigate('/dw/intake')}
              className="group text-left p-8 rounded-2xl bg-slate-900/50 border border-sky-500/20 hover:border-sky-400/50 transition-all duration-500 shadow-[0_0_30px_rgba(56,189,248,0.06)] hover:shadow-[0_0_60px_rgba(56,189,248,0.12)] cursor-pointer"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-sky-500/10 flex items-center justify-center group-hover:bg-sky-500/15 transition-colors duration-500">
                  <Droplets size={26} className="text-sky-400" />
                </div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-green-500/10 text-green-400/80 border border-green-500/15 tracking-wider">
                  OPERATIONAL
                </span>
              </div>
              <h3 className="text-2xl text-white mb-3 landing-heading tracking-wide">
                DRINKING WATER TREATMENT
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Operate a complete surface water treatment facility. Control pumps, valves, and
                chemical feed systems across five treatment stages from raw water intake to
                distribution.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-8">
                {['Intake', 'Coagulation', 'Sedimentation', 'Filtration', 'Disinfection'].map(s => (
                  <span key={s} className="text-[11px] px-2.5 py-1 rounded bg-sky-500/[0.07] text-sky-300/70 border border-sky-500/10">{s}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-300 text-sm font-semibold w-fit group-hover:bg-sky-500/20 group-hover:border-sky-400/30 transition-all duration-300">
                <span>Launch Simulator</span>
                <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </button>

            {/* Wastewater */}
            <button
              onClick={() => navigate('/ww/headworks')}
              className="group text-left p-8 rounded-2xl bg-slate-900/50 border border-slate-700/40 hover:border-emerald-400/40 transition-all duration-500 hover:shadow-[0_0_60px_rgba(52,211,153,0.08)] cursor-pointer"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/15 transition-colors duration-500">
                  <Factory size={26} className="text-emerald-400" />
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-400/80 border border-amber-500/15 tracking-wider">
                  <Construction size={10} />
                  BETA
                </span>
              </div>
              <h3 className="text-2xl text-white mb-3 landing-heading tracking-wide">
                WASTEWATER TREATMENT
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Manage a municipal wastewater treatment plant. Monitor biological processes,
                clarifier operations, and effluent quality through complete secondary treatment.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-8">
                {['Headworks', 'Primary', 'Aeration', 'Secondary', 'Disinfection'].map(s => (
                  <span key={s} className="text-[11px] px-2.5 py-1 rounded bg-emerald-500/[0.07] text-emerald-300/70 border border-emerald-500/10">{s}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-emerald-400/70 text-sm font-medium">
                <span>Launch Beta</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═════════════════════════════════ */}
      <footer className="border-t border-slate-700/20 py-14 px-6 bg-[#040810]">
        <div className="max-w-4xl mx-auto text-center">
          {/* <div className="flex items-center justify-center gap-2 mb-5">
            <Shield size={14} className="text-sky-400/50" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-slate-500 font-semibold">Built to Industry Standards</span>
          </div>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed max-w-2xl mx-auto">
            All alarm thresholds and process constants verified against EPA Safe Water Treatment
            Rules (40&nbsp;CFR&nbsp;141), AWWA Standards, and Ten States Standards (2022).
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600/80">
            <span>EPA SWTR</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span>AWWA</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span>Ten States Standards</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span>LT2ESWTR</span>
          </div> */}
          <div className="mt-10 pt-8 border-t border-slate-700/20">
            <p className="text-slate-600 text-xs leading-relaxed max-w-xl mx-auto">
              This simulator is intended for educational and training purposes only. It is not designed for, and must not be used to operate, monitor, or control actual water or wastewater treatment systems.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
