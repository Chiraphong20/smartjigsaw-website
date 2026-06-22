import { ArrowUp } from "lucide-react";
import { container } from "../lib/layout";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { href: "#hero", label: "หน้าแรก" },
    { href: "#services", label: "บริการของเรา" },
    { href: "#works", label: "ผลงาน" },
    { href: "#about", label: "เกี่ยวกับ" },
    { href: "#contact", label: "ติดต่อเรา" },
  ];

  return (
    <footer className="bg-brand-dark border-t border-slate-800/60 text-slate-400 py-10">
      <div className={container}>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl border-2 border-white bg-white flex items-center justify-center">
              <img src="/images/logo.png" alt="Smartjigsaw" className="h-12 w-auto object-contain" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight">
                <span style={{ color: "#ffffff" }}>Smart</span>
                <span style={{ color: "#1369D5" }}>jigsaw</span>
              </span>
              <p className="text-[10px] text-zinc-500">Intelligent Software Provider</p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-7 gap-y-2 text-xs justify-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-3 rounded-full bg-slate-800 border border-slate-700 hover:border-brand-blue hover:text-white transition-all group"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className="pt-8 text-center text-[11px] text-zinc-600">
          &copy; {new Date().getFullYear()} SmartJigsaw All rights reserved.
        </div>

      </div>
    </footer>
  );
}
