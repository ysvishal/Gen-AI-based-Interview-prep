import React from "react";
import { Outlet } from "react-router-dom";
import {
  UserCircle,
  Sparkles,
  LayoutGrid,
  FileText,
  BrainCircuit,
  User,
} from "lucide-react";
import { motion } from "motion/react";

// 1. Paste your TopAppBar component here
const TopAppBar = () => {
  return (
          <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[#131313]/60 backdrop-blur-xl border-none">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full overflow-hidden bg-[#353534] flex items-center justify-center">
            <UserCircle className="text-[#c0c1ff] w-6 h-6" />
          </div>
          <span className="font-['Manrope'] font-extrabold text-[#c0c1ff] tracking-tighter text-xl">
            Atelier AI
          </span>
        </div>
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <Sparkles className="text-[#c0c1ff] w-6 h-6 cursor-pointer" />
          </motion.div>
        </div>
      </nav>
  );
};

// 2. Paste your BottomNavBar component here
const BottomNavBar = () => {
  const navItems = [
    { icon: <LayoutGrid />, label: "Analysis", active: true },
    { icon: <FileText />, label: "Builder", active: false },
    { icon: <BrainCircuit />, label: "Strategy", active: false },
    { icon: <User />, label: "Profile", active: false },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#131313]/90 backdrop-blur-2xl flex justify-around items-center px-6 py-4 pb-safe z-50 border-t border-indigo-500/10 shadow-[0px_-4px_24px_rgba(0,0,0,0.3)] rounded-t-[32px]">
      {navItems.map((item) => (
        <motion.div
          key={item.label}
          whileTap={{ scale: 0.9 }}
          className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-300 p-2 rounded-2xl ${
            item.active
              ? "bg-[#c0c1ff]/10 text-[#c0c1ff] px-4"
              : "text-[#c7c4d7]/60 hover:text-[#e5e2e1]"
          }`}
        >
          {React.cloneElement(item.icon, { size: 22 })}
          <span className="text-[10px] font-['Inter'] font-bold uppercase tracking-[0.1em] mt-1.5">
            {item.label}
          </span>
          {item.active && (
            <motion.div
              layoutId="activeTab"
              className="w-1 h-1 bg-[#c0c1ff] rounded-full mt-1"
            />
          )}
        </motion.div>
      ))}
    </nav>
  );
};

// 3. Create the Main Layout Wrapper
export default function Layout() {
  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] overflow-x-hidden selection:bg-[#c0c1ff]/30">
      <TopAppBar />

      <div className="pt-24 pb-32">
        <Outlet />{" "}
        {/* This is where your page content will magically appear! */}
      </div>

      <BottomNavBar />

      {/* Put your decorative background mesh here so it applies to the whole app */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(192,193,255,0.08)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(128,131,255,0.08)_0%,_transparent_50%)]"></div>
      </div>
    </div>
  );
}
