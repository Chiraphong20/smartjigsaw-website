import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { container } from "../lib/layout";

export default function Hero() {
  const handleLearnMore = () => {
    const el = document.getElementById("services");
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-brand-dark min-h-[280px] sm:min-h-[380px] lg:min-h-[420px]"
      style={{
        marginTop: "90px",
        paddingTop: 80,
        backgroundImage: "url('/images/Banner.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* ── Content ── */}
      <div className="relative z-10 py-10 sm:py-14">
        <div className={`${container} w-full grid grid-cols-5 items-center`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-start space-y-5 col-span-3"
        >
          {/* Heading */}
          <div className="space-y-2">
            <h1 className="font-bold leading-none tracking-tight">
              <span style={{ fontSize: "clamp(3rem, 7vw, 5rem)", color: "#1369D5" }}>S</span>
              <span style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#0B1E36" }}>MART </span>
              <span style={{ fontSize: "clamp(3rem, 7vw, 5rem)", color: "#1369D5" }}>J</span>
              <span style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: "#0B1E36" }}>IGSAW</span>
            </h1>
            <h2
              style={{
                fontFamily: "'Kanit', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(16px, 4vw, 32px)",
                lineHeight: 1.4,
                letterSpacing: 0.02,
                color: "#0B1E36",
                textShadow: "0px 4px 4px #00000040",
                display: "block",
              }}
            >
              โซลูชันอัจฉริยะ เพื่ออนาคตที่ชาญฉลาดกว่า
            </h2>
          </div>

          {/* CTA button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={handleLearnMore}
            className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue/85 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-brand-blue/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            เรียนรู้เพิ่มเติม
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
