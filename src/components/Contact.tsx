import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Phone, Send, CheckCircle, Map } from "lucide-react";
import { container } from "../lib/layout";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "" });
      setTimeout(() => setIsSubmitted(false), 7000);
    }, 1400);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Watermark มุมขวาล่าง */}
      <div className="absolute bottom-0 right-0 pointer-events-none select-none" style={{ width: "75%", opacity:10 }}>
        <img src="/images/Watermark%20background.png" alt="" className="w-full h-auto" draggable={false} />
      </div>

      <div className={`${container} relative z-10`}>

        {/* Heading */}
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4"
          >
            ติดต่อเรา
          </motion.h2>
          <div className="w-14 h-1 bg-brand-blue mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8"
            style={{ backgroundColor: "#0B1E36" }}
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-white/100 uppercase tracking-widest">
                      ชื่อ-สกุล
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="กรอกชื่อ-นามสกุลของคุณ"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 focus:border-brand-blue rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-brand-blue/30 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-white/100 uppercase tracking-widest">
                      อีเมล
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="yourname@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 focus:border-brand-blue rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-brand-blue/30 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-white/100 uppercase tracking-widest">
                      หมายเลขโทรศัพท์
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="0XX-XXX-XXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 focus:border-brand-blue rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-brand-blue/30 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>ส่งข้อความ</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark">ส่งข้อความเรียบร้อย!</h3>
                  <p className="text-slate-500 text-xs max-w-sm">
                    ทีมงาน Smart Jigsaw จะติดต่อกลับหาคุณโดยเร็วที่สุด
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-brand-blue font-bold hover:underline"
                  >
                    ส่งข้อความใหม่
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact info + map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Info cards */}
            <div className="rounded-3xl p-6 space-y-5" style={{ backgroundColor: "#0B1E36" }}>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider block mb-1">
                    ที่อยู่
                  </span>
                  <p className="text-sm font-semibold text-white leading-relaxed">
                    92/1 ถ.ปักธงชัย ต.ในเมือง อ.เมือง<br />
                    จ.นครราชสีมา 30000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider block mb-1">
                    โทร
                  </span>
                  <a
                    href="tel:0639722228"
                    className="text-sm font-bold text-white hover:underline"
                  >
                    063-972-2228
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div
              className="rounded-3xl flex-1 flex flex-col"
              style={{ backgroundColor: "#0B1E36", padding: 12, gap: 10 }}
            >
              <div className="flex items-center gap-2 px-1">
                <Map className="w-4 h-4 text-brand-blue" />
                <span className="text-white font-bold text-sm">ที่ตั้ง</span>
              </div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=14.9950915,102.1068360"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block group flex-1 min-h-[200px]"
                style={{ borderRadius: 16, overflow: "hidden" }}
              >
                <iframe
                  title="Smartjigsaw Location"
                  src="https://maps.google.com/maps?q=14.9950915,102.1068360&t=m&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 200, pointerEvents: "none", borderRadius: 16 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-brand-blue/5 transition-colors" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
