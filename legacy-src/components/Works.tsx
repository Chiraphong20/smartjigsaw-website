import { motion } from "motion/react";
import { Boxes, BarChart3, Layers, Truck, CheckCircle2 } from "lucide-react";
import { container } from "../lib/layout";

/* ─── แสดงรูป 2 ใบซ้อนกัน (web + pad) ─── */
function DualImg({ img1, img2, alt }: { img1: string; img2: string; alt: string }) {
  return (
    <div className="relative w-full" style={{ paddingBottom: "68%" }}>
      {/* จอคอม — หลัก */}
      <img
        src={img1}
        alt={alt}
        className="absolute left-0 top-0 w-[82%] object-contain drop-shadow-lg"
      />
      {/* Tablet — ซ้อนมุมล่างขวา */}
      <img
        src={img2}
        alt={alt + " tablet"}
        className="absolute right-0 w-[44%] object-contain drop-shadow-xl z-10"
        style={{ bottom: "20%" }}
      />
    </div>
  );
}

const capabilities = [
  {
    id: "units",
    title: "แบ่งหน่วยของสินค้าได้",
    desc: "หมดปัญหาเรื่องการคำนวณสินค้าหลายขนาด รองรับการตั้งค่าหน่วยย่อย (เช่น ซื้อเป็นลัง ขายแยกชิ้น) ช่วยให้การตัดสต็อกและคำนวณต้นทุน/กำไรทำได้อย่างแม่นยำ 100%",
    icon: Boxes,
    reverse: false,
    img1: "/images/unit/Home Growstore Pc 1.2.png",
    img2: "/images/unit/Unit Pad 2.2.png",
  },
  {
    id: "analytics",
    title: "Dashboard ที่เข้าใจง่าย",
    desc: "ติดตามยอดขาย รายจ่าย ต้นทุน และยอดสุทธิของแต่ละวันได้เรียลไทม์ ผ่านกราฟและหน้าสรุปตัวเลขที่ชัดเจน รองรับการเข้าถึงผ่านมือถือทุกรุ่น",
    icon: BarChart3,
    reverse: true,
    img1: "/images/dashboard/Dashbaord web 1.2.png",
    img2: "/images/dashboard/Dashboard pad 2.2.png",
  },
  {
    id: "inventory",
    title: "จัดการคลังครุภัณฑ์และวัสดุ",
    desc: "ตรวจสอบและควบคุมสถานะการเบิกจ่ายเรียลไทม์ บันทึกผู้ใช้และประวัติการยืมอย่างละเอียด ช่วยป้องกันทรัพยากรสูญหาย และร่นเวลาทำสต็อกประจำปีเหลือไม่กี่นาที",
    icon: Layers,
    reverse: false,
    img1: "/images/ครุภัณ/ครุภัณ web 2.2.png",
    img2: "/images/ครุภัณ/ครุภัณ pad 1.2.png",
  },
  {
    id: "logistics",
    title: "ติดตามการจัดส่งได้ทุกขั้นตอน",
    desc: "อัปเดตสถานะคิวการจัดส่งเรียลไทม์ วางแผนเส้นทางอัตโนมัติ ช่วยหลีกเลี่ยงเส้นทางติดขัด และส่งงานลูกค้าได้รวดเร็วตามเวลาที่นัดไว้",
    icon: Truck,
    reverse: true,
    img1: "/images/shipping/shipping web 1.2.png",
    img2: "/images/shipping/shipping web 2.2.png",
  },
];

export default function Works() {
  return (
    <section id="works" className="bg-white py-24">
      <div className={container}>

        {/* ── ผลงานที่ผ่านมา ── */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4"
          >
            ผลงานที่ผ่านมา
          </motion.h2>
          <div className="w-14 h-1 bg-brand-blue mx-auto rounded-full" />
        </div>

        {/* Growstore showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden"
          >
            <img
              src="/images/Home Growstore.png"
              alt="Growstore Dashboard"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            <h3 className="text-brand-blue text-2xl font-black tracking-tight">Growstore</h3>
            <p className="text-lg font-semibold text-brand-dark">
              ระบบ POS ที่ออกแบบมาเพื่อธุรกิจของคุณ
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              AI เข้าช่วยเพิ่มยอดขาย ผ่านการวิเคราะห์ข้อมูลและนำเสนอแนวทางการขายอย่างชาญฉลาด
              จัดการรับออเดอร์และคุมสต็อกได้ในระบบเดียวกัน ครบจบในระบบเดียว
            </p>
            <div className="space-y-2.5">
              {[
                "ความปลอดภัยสูง ตรวจจับรหัสการปลอมสต็อก",
                "รองรับ Cashless Payment และ QR Promptpay 100%",
                "ส่งออกรายงานภาษีและบัญชีอัตโนมัติ",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── ความสามารถของระบบ ── */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4"
          >
            ความสามารถของระบบ
          </motion.h2>
          <div className="w-14 h-1 bg-brand-blue mx-auto rounded-full" />
        </div>

        {/* Alternating sections */}
        <div className="space-y-24">
          {capabilities.map((cap) => {
            const Icon = cap.icon;

            const textBlock = (
              <motion.div
                initial={{ opacity: 0, x: cap.reverse ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-center space-y-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-brand-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark">{cap.title}</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed max-w-md">{cap.desc}</p>
              </motion.div>
            );

            const imgBlock = (
              <motion.div
                initial={{ opacity: 0, x: cap.reverse ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <DualImg img1={cap.img1} img2={cap.img2} alt={cap.title} />
              </motion.div>
            );

            return (
              <div key={cap.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {cap.reverse ? (
                  <>
                    <div className="order-2 lg:order-1">{imgBlock}</div>
                    <div className="order-1 lg:order-2">{textBlock}</div>
                  </>
                ) : (
                  <>{textBlock}{imgBlock}</>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
