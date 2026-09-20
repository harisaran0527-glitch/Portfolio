import React from 'react';
import { 
  Activity, 
  Network, 
  Layout, 
  Gamepad2, 
  Cpu, 
  Users, 
  CheckSquare, 
  Gauge, 
  ShieldAlert,
  Zap
} from 'lucide-react';

interface ProjectVisualCanvasProps {
  type: string;
  title: string;
}

export const ProjectVisualCanvas: React.FC<ProjectVisualCanvasProps> = ({ type }) => {
  switch (type) {
    case 'analytics':
      return (
        <div className="relative w-full h-full min-h-[300px] bg-gradient-to-br from-indigo-950/40 via-slate-900 to-black p-6 flex flex-col justify-between overflow-hidden group">
          {/* Background Grid & Radar lines */}
          <div className="absolute inset-0 grid-background-pattern opacity-30" />
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all duration-700" />
          
          {/* HUD Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
              <span className="text-xs font-mono text-blue-300 tracking-wider uppercase">Analytics Engine v2.4</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">REAL-TIME</span>
          </div>

          {/* Visual Bars / Graph mockup */}
          <div className="relative z-10 my-6 grid grid-cols-6 gap-3 items-end h-32 px-4">
            {[45, 78, 62, 95, 84, 100].map((height, i) => (
              <div key={i} className="flex flex-col items-center gap-2 h-full justify-end">
                <div 
                  className="w-full bg-gradient-to-t from-blue-600 via-indigo-500 to-cyan-400 rounded-t-sm transition-all duration-700 ease-out group-hover:brightness-125"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[9px] font-mono text-slate-500">M0{i+1}</span>
              </div>
            ))}
          </div>

          {/* Metrics Strip */}
          <div className="relative z-10 grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
            <div className="bg-white/5 p-2 rounded border border-white/5">
              <div className="text-[10px] text-slate-400 font-mono">INDEX</div>
              <div className="text-sm font-semibold text-white font-mono">98.4%</div>
            </div>
            <div className="bg-white/5 p-2 rounded border border-white/5">
              <div className="text-[10px] text-slate-400 font-mono">ANALYTICS</div>
              <div className="text-sm font-semibold text-indigo-400 font-mono">ACTIVE</div>
            </div>
            <div className="bg-white/5 p-2 rounded border border-white/5">
              <div className="text-[10px] text-slate-400 font-mono">RANK</div>
              <div className="text-sm font-semibold text-cyan-400 font-mono">TIER 1</div>
            </div>
          </div>
        </div>
      );

    case 'network':
      return (
        <div className="relative w-full h-full min-h-[300px] bg-gradient-to-br from-violet-950/40 via-slate-900 to-black p-6 flex flex-col justify-between overflow-hidden group">
          <div className="absolute inset-0 grid-background-pattern opacity-30" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl group-hover:bg-violet-500/20 transition-all duration-700" />
          
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-mono text-violet-300 tracking-wider uppercase">Peer Exchange Mesh</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-violet-950/60 px-2 py-0.5 rounded border border-violet-800/40">SOCKET.IO CONNECTED</span>
          </div>

          {/* Node Connections Visual */}
          <div className="relative z-10 my-4 flex items-center justify-center h-32">
            <div className="relative w-48 h-28 flex items-center justify-center">
              {/* Center node */}
              <div className="w-12 h-12 rounded-full bg-violet-600/30 border border-violet-400 flex items-center justify-center shadow-lg shadow-violet-500/20 z-10 animate-pulse">
                <Users className="w-6 h-6 text-violet-200" />
              </div>
              {/* Satellite nodes */}
              <div className="absolute top-0 left-2 w-8 h-8 rounded-full bg-indigo-900/60 border border-indigo-400/60 flex items-center justify-center text-[10px] font-mono text-indigo-200">
                PY
              </div>
              <div className="absolute bottom-0 right-2 w-8 h-8 rounded-full bg-cyan-900/60 border border-cyan-400/60 flex items-center justify-center text-[10px] font-mono text-cyan-200">
                JS
              </div>
              <div className="absolute top-2 right-4 w-8 h-8 rounded-full bg-purple-900/60 border border-purple-400/60 flex items-center justify-center text-[10px] font-mono text-purple-200">
                AI
              </div>
              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full stroke-violet-500/40 stroke-dasharray-2 pointer-events-none">
                <line x1="20" y1="20" x2="96" y2="56" strokeWidth="1.5" />
                <line x1="170" y1="90" x2="96" y2="56" strokeWidth="1.5" />
                <line x1="160" y1="24" x2="96" y2="56" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 font-mono pt-3 border-t border-white/10">
            <span>Skill Match Rate: 99.2%</span>
            <span className="text-violet-400">P2P Encrypted</span>
          </div>
        </div>
      );

    case 'dashboard':
      return (
        <div className="relative w-full h-full min-h-[300px] bg-gradient-to-br from-slate-900 via-indigo-950/30 to-black p-6 flex flex-col justify-between overflow-hidden group">
          <div className="absolute inset-0 grid-background-pattern opacity-30" />
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Layout className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-cyan-300 tracking-wider uppercase">Student360 Workflow</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">SYSTEM READY</span>
          </div>

          <div className="relative z-10 my-4 space-y-2">
            <div className="p-2.5 rounded bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-slate-200">Daily Attendance Rate</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-semibold">96.8%</span>
            </div>
            <div className="p-2.5 rounded bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-xs font-medium text-slate-200">OD & Permission Requests</span>
              </div>
              <span className="text-xs font-mono text-blue-400 font-semibold">Verified</span>
            </div>
            <div className="p-2.5 rounded bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                <span className="text-xs font-medium text-slate-200">Academic Status Stream</span>
              </div>
              <span className="text-xs font-mono text-purple-400 font-semibold">Synced</span>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 font-mono pt-3 border-t border-white/10">
            <span>Fast SQLite Log engine</span>
            <span className="text-cyan-400">360° Tracking</span>
          </div>
        </div>
      );

    case 'game-3d':
      return (
        <div className="relative w-full h-full min-h-[300px] bg-gradient-to-br from-amber-950/30 via-slate-900 to-black p-6 flex flex-col justify-between overflow-hidden group">
          <div className="absolute inset-0 grid-background-pattern opacity-20" />
          <div className="absolute right-0 bottom-0 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl group-hover:bg-amber-500/20 transition-all duration-700" />
          
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono text-amber-300 tracking-wider uppercase">Unity 3D Engine Instance</span>
            </div>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">60 FPS · CINEMACHINE</span>
          </div>

          {/* 3D Wireframe Wire Engine Simulation */}
          <div className="relative z-10 my-4 flex items-center justify-center h-32">
            <div className="relative w-40 h-28 border border-amber-500/30 rounded-lg p-3 bg-black/40 backdrop-blur-sm flex flex-col justify-between transform rotate-1 group-hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between text-[10px] font-mono text-amber-400">
                <span>QUEST_WORLD_01</span>
                <span>C# PHYSICS</span>
              </div>
              <div className="flex items-center justify-center py-2">
                <div className="w-10 h-10 border-2 border-dashed border-amber-400/80 rounded transform rotate-45 flex items-center justify-center animate-spin" style={{ animationDuration: '15s' }}>
                  <Zap className="w-5 h-5 text-amber-300 -rotate-45" />
                </div>
              </div>
              <div className="text-[9px] font-mono text-slate-400 text-center">
                Shader Graph: Fantasy Atmosphere
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 font-mono pt-3 border-t border-white/10">
            <span>Camera: Smooth Spring Chase</span>
            <span className="text-amber-400">Interactive 3D</span>
          </div>
        </div>
      );

    case 'ai-mesh':
      return (
        <div className="relative w-full h-full min-h-[300px] bg-gradient-to-br from-blue-950/40 via-slate-900 to-black p-6 flex flex-col justify-between overflow-hidden group">
          <div className="absolute inset-0 grid-background-pattern opacity-30" />
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-mono text-blue-300 tracking-wider uppercase">AI Directory & Discovery</span>
            </div>
            <span className="text-[10px] font-mono text-blue-300 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">LAZY HYDRATION</span>
          </div>

          <div className="relative z-10 my-4 grid grid-cols-4 gap-2">
            {['Chatbots', 'Coding', 'Vision', 'Voice', 'Research', 'Design', 'Video', 'Apps'].map((cat, idx) => (
              <div key={idx} className="p-2 rounded bg-white/5 border border-white/10 hover:border-blue-400/40 text-center transition-colors">
                <div className="text-[10px] font-mono text-blue-300 font-medium">{cat}</div>
                <div className="text-[9px] text-slate-500 mt-0.5">Ready</div>
              </div>
            ))}
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 font-mono pt-3 border-t border-white/10">
            <span>Optimized Dynamic Launcher</span>
            <span className="text-blue-400">Zero DOM Bloat</span>
          </div>
        </div>
      );

    case 'team-node':
      return (
        <div className="relative w-full h-full min-h-[300px] bg-gradient-to-br from-indigo-950/30 via-slate-900 to-black p-6 flex flex-col justify-between overflow-hidden group">
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-mono text-indigo-300 tracking-wider uppercase">Team Head Portal</span>
            </div>
            <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">CAPACITY CONTROL</span>
          </div>

          <div className="relative z-10 my-4 space-y-2">
            <div className="p-2.5 rounded bg-white/5 border border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-200">LeetCode Contest Ranks</span>
              <span className="text-xs font-mono text-indigo-400 font-semibold">Tracked</span>
            </div>
            <div className="p-2.5 rounded bg-white/5 border border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-200">NPTEL Certifications</span>
              <span className="text-xs font-mono text-indigo-400 font-semibold">Verified</span>
            </div>
            <div className="p-2.5 rounded bg-white/5 border border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-200">Team Head Spotlights</span>
              <span className="text-xs font-mono text-emerald-400 font-semibold">Active</span>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 font-mono pt-3 border-t border-white/10">
            <span>Capacity Enforcement</span>
            <span className="text-indigo-400">PostgreSQL</span>
          </div>
        </div>
      );

    case 'attendance':
      return (
        <div className="relative w-full h-full min-h-[300px] bg-gradient-to-br from-emerald-950/30 via-slate-900 to-black p-6 flex flex-col justify-between overflow-hidden group">
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-emerald-300 tracking-wider uppercase">Admission & Attendance</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">SUBJECT-WISE</span>
          </div>

          <div className="relative z-10 my-4 grid grid-cols-5 gap-1 text-center font-mono text-[10px]">
            <div className="p-2 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">PRESENT</div>
            <div className="p-2 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300">ABSENT</div>
            <div className="p-2 rounded bg-blue-500/20 border border-blue-500/40 text-blue-300">OD</div>
            <div className="p-2 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300">MEDICAL</div>
            <div className="p-2 rounded bg-purple-500/20 border border-purple-500/40 text-purple-300">LONG ABS</div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 font-mono pt-3 border-t border-white/10">
            <span>Eligibility Calculations</span>
            <span className="text-emerald-400">Instant Metrics</span>
          </div>
        </div>
      );

    case 'telemetry':
      return (
        <div className="relative w-full h-full min-h-[300px] bg-gradient-to-br from-orange-950/30 via-slate-900 to-black p-6 flex flex-col justify-between overflow-hidden group">
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-mono text-orange-300 tracking-wider uppercase">Dustline Physics HUD</span>
            </div>
            <span className="text-[10px] font-mono text-orange-300 bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800/40">UNITY TELEMETRY</span>
          </div>

          <div className="relative z-10 my-4 flex items-center justify-around">
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-orange-400">142</div>
              <div className="text-[9px] font-mono text-slate-400 uppercase">KM/H VELOCITY</div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-amber-400">0.84g</div>
              <div className="text-[9px] font-mono text-slate-400 uppercase">LATERAL FRICTION</div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 font-mono pt-3 border-t border-white/10">
            <span>Dynamic Smoke Particle Density</span>
            <span className="text-orange-400">Raycast Physics</span>
          </div>
        </div>
      );

    case 'safety':
    default:
      return (
        <div className="relative w-full h-full min-h-[300px] bg-gradient-to-br from-red-950/30 via-slate-900 to-black p-6 flex flex-col justify-between overflow-hidden group">
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-xs font-mono text-red-300 tracking-wider uppercase">MineGuard Safety AI</span>
            </div>
            <span className="text-[10px] font-mono text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/40">HACKATHON CONCEPT</span>
          </div>

          <div className="relative z-10 my-3 space-y-1.5 font-mono text-[10px]">
            <div className="p-2 rounded bg-red-900/20 border border-red-800/40 text-red-300 flex items-center justify-between">
              <span>SENSORS → EDGE COLLECTION</span>
              <span className="text-emerald-400">ONLINE</span>
            </div>
            <div className="p-2 rounded bg-amber-900/20 border border-amber-800/40 text-amber-300 flex items-center justify-between">
              <span>AI HAZARD ANALYSIS</span>
              <span className="text-amber-400">MONITORING</span>
            </div>
            <div className="p-2 rounded bg-blue-900/20 border border-blue-800/40 text-blue-300 flex items-center justify-between">
              <span>RESCUE COORDINATION</span>
              <span className="text-blue-400">READY</span>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 font-mono pt-3 border-t border-white/10">
            <span>Underground Hazard Detection</span>
            <span className="text-red-400">Safety Tech</span>
          </div>
        </div>
      );
  }
};
