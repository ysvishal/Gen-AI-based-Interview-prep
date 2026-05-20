import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Terminal, 
  ChevronDown, 
  CheckCircle2, 
  Circle, 
  User,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Sub-components (No NavBars here anymore!) ---

const MatchScore = ({ score }) => {
  const percentage = score || 0;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-10 py-4">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <div className='h-full w-full flex items-center justify-center'>
            <svg className="rotate-[-90deg] w-full h-full">
          <circle className="text-[#2a2a2a]" cx="96" cy="96" fill="transparent" r={radius} stroke="currentColor" strokeWidth="8" />
          <motion.circle
            className="text-[#c0c1ff]"
            cx="96"
            cy="96"
            fill="transparent"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 8px rgba(192, 193, 255, 0.6))' }}
          />
        </svg>
        </div>
        
        <div className="absolute right-14 bottom-15 flex flex-col items-center justify-center">
            <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-5xl font-['Manrope'] font-black text-[#c0c1ff] tracking-tighter"
            >
                {percentage}%
            </motion.span>
            <span className="text-[10px] font-['Inter'] uppercase tracking-[0.2em] text-[#c7c4d7] font-bold">Match Score</span>
        </div>
      </div>
      <div className="flex-1 text-center md:text-left space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-['Manrope'] font-extrabold tracking-tight text-[#e5e2e1] leading-tight"
        >
          Interview Analysis <br />
          <span className="text-[#c0c1ff] text-3xl md:text-4xl">Complete</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#c7c4d7] text-lg max-w-2xl leading-relaxed"
        >
          We've mapped your professional DNA. Review your critical skill gaps, master the interview simulator, and execute your personalized 5-day preparation plan below.
        </motion.p>
      </div>
    </section>
  );
};

const SkillGaps = ({ gaps }) => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] font-['Inter'] uppercase tracking-[0.2em] text-[#c7c4d7] font-bold flex items-center gap-2">
          <AlertTriangle size={14} className="text-orange-400" />
          Critical Findings & Skill Gaps
        </h2>
        <div className="h-px flex-1 bg-[#464554]/20 mx-6"></div>
      </div>
      <div className="flex flex-wrap gap-4">
        {gaps.map((gap, index) => {
          const isCritical = gap.severity.toLowerCase() === 'high';
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`px-5 py-3 rounded-full flex items-center gap-3 border ${
                isCritical 
                  ? 'bg-red-900/20 border-red-500/20' 
                  : 'bg-orange-900/10 border-orange-500/20'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${
                isCritical ? 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)] animate-pulse' : 'bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.6)]'
              }`} />
              <span className={`font-['Inter'] font-semibold ${
                isCritical ? 'text-red-300' : 'text-orange-200'
              }`}>
                {gap.skill}
              </span>
              <span className={`text-[10px] font-bold uppercase opacity-60 ${
                isCritical ? 'text-red-300' : 'text-orange-200'
              }`}>
                {gap.severity}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

const InterviewSimulator = ({ techQs, behavQs }) => {
  const [activeTab, setActiveTab] = useState('Technical');
  const [expanded, setExpanded] = useState(0); 

  const activeQuestions = activeTab === 'Technical' ? techQs : behavQs;

  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-['Manrope'] font-bold">Interview Simulator</h2>
          <p className="text-[#c7c4d7] font-['Inter']">Predicted high-probability questions and AI-crafted strategies.</p>
        </div>
        <div className="flex p-1 bg-[#1c1b1b] rounded-xl">
          {['Technical', 'Behavioral'].map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setExpanded(null); 
              }}
              className={`px-6 py-2 rounded-lg font-['Inter'] text-sm font-bold transition-all ${
                activeTab === tab 
                  ? 'bg-[#8083ff] text-[#0d0096] shadow-lg' 
                  : 'text-[#c7c4d7] hover:text-[#e5e2e1]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {activeQuestions.map((q, idx) => {
          const isExpanded = expanded === idx;
          const isDimmed = expanded !== null && !isExpanded;

          return (
            <div 
              key={idx}
              className={`bg-[#1c1b1b]/60 backdrop-blur-3xl rounded-3xl overflow-hidden border border-white/5 transition-opacity duration-300 ${isDimmed ? 'opacity-40' : 'opacity-100'}`}
            >
              <div 
                className="p-6 cursor-pointer flex items-center justify-between group"
                onClick={() => setExpanded(isExpanded ? null : idx)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDimmed ? 'bg-[#353534]' : 'bg-[#c0c1ff]/10'}`}>
                    {activeTab === 'Technical' ? <Terminal className="text-[#c0c1ff] w-5 h-5" /> : <User className="text-[#c0c1ff] w-5 h-5" />}
                  </div>
                  <h3 className="font-['Manrope'] font-bold text-lg leading-tight md:pr-8">{q.question}</h3>
                </div>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                  <ChevronDown className="text-[#c7c4d7] group-hover:text-[#c0c1ff] transition-colors" />
                </motion.div>
              </div>

              <AnimatePresence>
                {isExpanded && q.intention && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="px-6 pb-6 pt-2 space-y-6">
                      <div className="space-y-3">
                        <span className="text-[10px] font-['Inter'] font-bold uppercase tracking-[0.2em] text-[#c0c1ff]/70">Why they are asking this</span>
                        <p className="text-[#c7c4d7] leading-relaxed text-sm">{q.intention}</p>
                      </div>
                      <div className="relative pl-6 py-2">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c0c1ff] rounded-full shadow-[0_0_8px_rgba(192,193,255,0.4)]"></div>
                        <span className="text-[10px] font-['Inter'] font-bold uppercase tracking-[0.2em] text-[#c7c4d7] mb-3 block">How to answer</span>
                        <blockquote className="italic text-[#e5e2e1] text-lg leading-relaxed font-['Inter']">
                          {q.answer}
                        </blockquote>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  );
};

const ActionPlan = ({ plan }) => {
  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-['Manrope'] font-bold">5-Day Action Plan</h2>
      <div className="relative space-y-8">
        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#c0c1ff] via-[#8083ff]/30 to-transparent" />

        {plan.map((step, sIdx) => {
          const isActive = sIdx === 0;

          return (
            <div key={sIdx} className="relative pl-24 group">
              <motion.div 
                 initial={{ scale: 0 }}
                 whileInView={{ scale: 1 }}
                 viewport={{ once: true }}
                 className={`absolute left-6 top-8 w-5 h-5 rounded-full ring-4 ring-[#131313] z-10 ${
                   isActive ? 'bg-[#c0c1ff] shadow-[0_0_12px_rgba(192,193,255,0.8)]' : 'bg-[#2a2a2a] border-2 border-[#c0c1ff]/40'
                 }`} 
              />
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`${isActive ? 'bg-[#1c1b1b]/60 backdrop-blur-3xl' : 'bg-[#1c1b1b]/40'} p-8 rounded-[32px] border border-white/5 space-y-5`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-[10px] font-['Inter'] font-bold uppercase tracking-[0.2em] ${isActive ? 'text-[#c0c1ff]' : 'text-[#c7c4d7]'}`}>
                      Day 0{step.day}
                    </span>
                    <h3 className={`text-2xl font-['Manrope'] font-bold mt-1 ${!isActive && 'opacity-60'}`}>{step.focus}</h3>
                  </div>
                </div>
                <ul className="space-y-4">
                  {step.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-4 text-[#c7c4d7]">
                      {isActive ? (
                        <CheckCircle2 className="text-[#c0c1ff] w-5 h-5 shrink-0" fill="currentColor" fillOpacity={0.15} />
                      ) : (
                        <Circle className="text-[#c7c4d7]/40 w-5 h-5 shrink-0" />
                      )}
                      <span className={`text-[15px] leading-relaxed font-['Inter'] ${isActive ? 'text-[#e5e2e1] font-medium' : 'text-[#c7c4d7]/70'}`}>
                        {task}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  );
};

// --- Main App Component ---

export default function InterviewResponse() {
  const location = useLocation();
  const reportData = location.state?.reportData;

  if (!reportData) {
    return (
      <div className="flex flex-col items-center justify-center text-white space-y-6 pt-20">
        <AlertTriangle size={48} className="text-[#c0c1ff]" />
        <h2 className="text-3xl font-bold font-['Manrope']">No Analysis Found</h2>
        <p className="text-[#c7c4d7]">Please return to the Engine to generate a new report.</p>
        <Link 
          to="/" 
          className="bg-[#c0c1ff] text-[#131313] hover:bg-[#a6a8ff] px-6 py-3 rounded-xl font-bold transition-colors"
        >
          Return to Engine
        </Link>
      </div>
    );
  }

  const { matchScore, skillGaps, technicalQuestions, behavioralQuestions, preparationPlan } = reportData;

  // NOTICE: No min-h-screen, no pt-24/pb-32, no navbars! Just the <main> content.
  return (
    <main className="max-w-5xl mx-auto px-6 space-y-20">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <MatchScore score={matchScore} />
      </motion.div>
      
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <SkillGaps gaps={skillGaps} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <InterviewSimulator techQs={technicalQuestions} behavQs={behavioralQuestions} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <ActionPlan plan={preparationPlan} />
      </motion.div>
    </main>
  );
}