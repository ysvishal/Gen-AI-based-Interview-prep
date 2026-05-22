import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  UserCircle,
  Sparkles,
  LayoutGrid,
  FileText,
  BrainCircuit,
  User,
  Sun,
  Moon,
} from "lucide-react";
import { motion } from "motion/react";

const TopAppBar = ({ theme, toggleTheme }) => {
  return (
    <nav
      style={{ backgroundColor: "var(--surface-strong-alpha)" }}
      className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 backdrop-blur-xl border-none"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: "var(--surface-strong)" }}
        >
          <UserCircle className="text-(--primary-color) w-6 h-6" />
        </div>
        <span className="font-['Manrope'] font-extrabold tracking-tighter text-xl text-(--primary-color)">
          Atelier AI
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex items-center gap-2 rounded-full border px-3 py-2 transition hover:bg-(--surface-muted)"
          style={{
            borderColor: "var(--surface-border)",
            color: "var(--on-surface)",
          }}
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
          <span className="text-sm font-medium text-(--on-surface)">
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </span>
        </button>

        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <Sparkles className="text-(--primary-color) w-6 h-6 cursor-pointer" />
        </motion.div>
      </div>
    </nav>
  );
};

const BottomNavBar = () => {
  const navItems = [
    { icon: <LayoutGrid />, label: "Analysis", active: true },
    { icon: <FileText />, label: "Builder", active: false },
    { icon: <BrainCircuit />, label: "Strategy", active: false },
    { icon: <User />, label: "Profile", active: false },
  ];

  return (
    <nav
      style={{
        backgroundColor: "var(--surface-strong-alpha)",
        borderColor: "var(--surface-border)",
      }}
      className="fixed bottom-0 left-0 w-full backdrop-blur-2xl flex justify-around items-center px-6 py-4 pb-safe z-50 border-t rounded-t-4xl"
      style={{
        backgroundColor: "var(--surface-strong-alpha)",
        borderColor: "var(--surface-border)",
        boxShadow: "0px -4px 24px var(--shadow)",
      }}
    >
      {navItems.map((item) => (
        <motion.div
          key={item.label}
          whileTap={{ scale: 0.9 }}
          className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-300 p-2 rounded-2xl ${
            item.active ? "px-4" : ""
          }`}
          style={{
            color: item.active
              ? "var(--primary-color)"
              : "var(--on-surface-muted)",
            backgroundColor: item.active
              ? "rgba(var(--primary-rgb), 0.12)"
              : "transparent",
          }}
        >
          {React.cloneElement(item.icon, { size: 22 })}
          <span className="text-[10px] font-['Inter'] font-bold uppercase tracking-widest mt-1.5">
            {item.label}
          </span>
          {item.active && (
            <motion.div
              layoutId="activeTab"
              className="w-1 h-1 bg-(--primary-color) rounded-full mt-1"
            />
          )}
        </motion.div>
      ))}
    </nav>
  );
};

export default function Layout() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const defaultTheme =
      storedTheme ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark");
    setTheme(defaultTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-(--primary-color)/30 app-shell">
      <TopAppBar theme={theme} toggleTheme={toggleTheme} />

      <div className="pt-24 pb-32">
        <Outlet />
      </div>

      <BottomNavBar />

      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(192,193,255,0.08)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(128,131,255,0.08)_0%,transparent_50%)]"></div>
      </div>
    </div>
  );
}
