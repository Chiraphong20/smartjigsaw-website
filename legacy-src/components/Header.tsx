import { useState, useEffect } from "react";
import { Puzzle, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { container } from "../lib/layout";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "หน้าแรก" },
    { id: "services", label: "บริการของเรา" },
    { id: "works", label: "ผลงาน" },
    { id: "about", label: "เกี่ยวกับ" },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      id="header-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-white/80 backdrop-blur-sm py-5"
      }`}
    >
      <div className={container}>
        <div className="flex items-center">

          {/* ── ซ้าย: Logo ── */}
          <div
            className="flex items-center gap-2 cursor-pointer group flex-none"
            onClick={() => handleNavClick("hero")}
          >
            <img
              src="/images/logo.png"
              alt="Smartjigsaw"
              className="h-10 md:h-16 w-auto object-contain group-hover:scale-105 transition-transform"
            />
            <span className="text-xl font-bold tracking-tight">
              <span style={{ color: "#0B1E36" }}>Smart</span>
              <span style={{ color: "#1369D5" }}>jigsaw</span>
            </span>
          </div>

          {/* ── กลาง: Nav tabs ── */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-1 py-2 text-sm font-medium transition-colors text-slate-600 hover:text-brand-blue ${
                  activeSection === item.id ? "text-brand-blue font-semibold" : ""
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* ── ขวา: ปุ่มติดต่อเรา + mobile toggle ── */}
          <div className="flex items-center justify-end flex-none ml-auto md:ml-0">
            <button
              onClick={() => handleNavClick("contact")}
              className="hidden md:block bg-brand-blue hover:bg-brand-blue/90 text-white font-medium text-sm px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              ติดต่อเรา
            </button>
            {/* Mobile toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-brand-blue hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-100 bg-white"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-brand-blue/5 text-brand-blue font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-brand-blue"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 px-4">
                <button
                  onClick={() => handleNavClick("contact")}
                  className="w-full text-center bg-brand-blue hover:bg-brand-blue/90 text-white font-medium py-3 rounded-xl shadow-md transition-all duration-200"
                >
                  ติดต่อเรา
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
