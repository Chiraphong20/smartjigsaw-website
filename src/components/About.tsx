import { motion } from "motion/react";
import { Lightbulb, Heart, Target, ShieldCheck } from "lucide-react";
import { container } from "../lib/layout";

const coreValues = [
  {
    title: "ความเรียบง่าย",
    eng: "Simplicity",
    desc: "คิดค้นและออกแบบโครงสร้างระบบให้เข้าใจง่าย ใช้งานง่าย ไม่สลับซับซ้อน เพื่อให้ทีมงานหน้างานเริ่มใช้ได้ทันที",
    icon: Lightbulb,
  },
  {
    title: "ความจริงใจ",
    eng: "Sincerity",
    desc: "แนะนำโซลูชันที่ต้องการใช้งานจริงอย่างเปิดเผย ตรงไปตรงมา ปราศจากโปรแกรมที่ไม่จำเป็น เพื่อประหยัดงบและรักษาความไว้วางใจ",
    icon: Heart,
  },
  {
    title: "การลงมือทำจริง",
    eng: "Action-Oriented",
    desc: "ลงมือทดสอบระบบหน้างานจริงร่วมกับบุคลากร ช่วยแก้ไขประเด็นติดขัด และดูแลอย่างเป็นกันเองเสมอ",
    icon: Target,
  },
  {
    title: "ความยั่งยืน",
    eng: "Sustainability",
    desc: "เขียนโปรแกรมบนมาตรฐานสากล มุ่งเน้นระบบโมดูลาร์ที่ขยายได้ เพื่อรองรับการสเกลอัปหรือต่อยอดในอนาคตอย่างราบรื่น",
    icon: ShieldCheck,
  },
];

export default function About() {
  return (
    <section id="about" className="bg-brand-dark py-24 relative overflow-hidden">
<div className={`${container} relative z-10`}>

        {/* Heading */}
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            เกี่ยวกับเรา
          </motion.h2>
          <div className="w-14 h-1 bg-brand-blue mx-auto rounded-full" />
        </div>

        {/* Body text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-20 space-y-4 text-slate-300 text-sm leading-relaxed"
        >
          <p>
            <span className="text-white font-bold">Smart Jigsaw</span> คือบริษัทที่ปรึกษาด้านเทคโนโลยีดิจิทัลที่ก่อตั้งขึ้นบนความเชื่อมั่นอย่างแน่วแน่ว่า
          </p>
          <p className="text-white italic text-base font-medium">
            "เทคโนโลยีไม่ใช่เพียงเครื่องมือ แต่คือชิ้นส่วนจิ๊กซอว์ที่ทรงพลัง ซึ่งสามารถเปลี่ยนแปลงและขับเคลื่อนธุรกิจสู่ยุคดิจิทัลได้อย่างยั่งยืน"
          </p>
          <p>
            เราไม่ได้พัฒนาระบบลอยๆ แต่ทำงานผสมผสาน <span className="text-white font-semibold">คน กระบวนการ และเทคโนโลยี</span> ออกแบบฟังก์ชันที่หยิบจับง่าย เข้าใจพฤติกรรมจริงของผู้ใช้งาน เพื่อให้ทุกชิ้นส่วนทางธุรกิจประกบเข้าหากันได้อย่างสวยงาม
          </p>
          <p className="text-slate-400 text-xs">
            Core Values: ความเรียบง่าย · ความจริงใจ · การลงมือทำจริง · ความยั่งยืน
          </p>
        </motion.div>

        {/* Core Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, i) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-slate-900/60 border border-white/5 rounded-3xl p-6 hover:border-brand-blue/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-brand-blue transition-all duration-300">
                  <Icon className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-white font-bold text-sm mb-0.5">{val.title}</h4>
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block mb-3">
                  {val.eng}
                </span>
                <p className="text-slate-400 text-xs leading-relaxed">{val.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
