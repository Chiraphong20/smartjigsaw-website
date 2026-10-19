import { motion } from "motion/react";
import { container } from "../lib/layout";

const services = [
  {
    title: "ที่ปรึกษาด้านธุรกิจ",
    desc: "วางแผนกลยุทธ์และโครงสร้างระบบธุรกิจ เพื่อการเปลี่ยนผ่านสู่ยุคดิจิทัล",
    icon: "/images/icon/ที่ปรึกษาธุรกิจ.png",
  },
  {
    title: "พัฒนาระบบ ERP & POS",
    desc: "ระบบบริหารธุรกิจที่ออกแบบเฉพาะสำหรับแต่ละองค์กร พร้อมระบบขายหน้าร้าน",
    icon: "/images/icon/ERP.png",
  },
  {
    title: "AI Agent & Automation",
    desc: "นำ AI มาช่วยเพิ่มประสิทธิภาพการทำงาน ลดต้นทุน และเพิ่มความเร็ว",
    icon: "/images/icon/AI Agent.png",
  },
  {
    title: "พัฒนาซอฟต์แวร์เฉพาะทาง",
    desc: "สร้างระบบเฉพาะที่ตอบโจทย์กระบวนการเฉพาะของแต่ละองค์กร",
    icon: "/images/icon/Software.png",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-brand-dark py-20 relative overflow-hidden border-t border-white/10">
      <div className={`${container} relative z-10`}>
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            บริการของเรา
          </motion.h2>
          <div className="w-14 h-1 bg-brand-blue mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ minHeight: 330, borderRadius: 15 }}
              className="bg-white p-8 flex flex-col items-center text-center gap-5 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full"
            >
              {/* Icon image */}
              <div
                className="rounded-full flex items-center justify-center overflow-hidden shrink-0"
                style={{ width: 134, height: 134, backgroundColor: "#0B1E36" }}
              >
                <img
                  src={service.icon}
                  alt={service.title}
                  style={{ width: 90, height: 90 }}
                  className="object-contain"
                />
              </div>
              <h3 className="text-sm font-bold text-brand-dark leading-snug">
                {service.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
