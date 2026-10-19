import { ChevronLeft, ChevronRight } from 'lucide-react'

// ตัวแบ่งหน้า (ก่อนหน้า · จุด · ถัดไป) ใช้ร่วมกันในส่วนวิดีโอและโฆษณา
export default function Pager({ page, pages, onChange, label }: { page: number; pages: number; onChange: (p: number) => void; label: string }) {
  if (pages < 2) return null
  return (
    <div className="pager" role="group" aria-label={label}>
      <button className="icon-btn" aria-label="ก่อนหน้า" onClick={() => onChange((page - 1 + pages) % pages)}><ChevronLeft size={18} /></button>
      <div className="pager-dots">
        {Array.from({ length: pages }, (_, i) => (
          <button key={i} aria-label={`หน้า ${i + 1} จาก ${pages}`} aria-current={i === page} onClick={() => onChange(i)} />
        ))}
      </div>
      <button className="icon-btn" aria-label="ถัดไป" onClick={() => onChange((page + 1) % pages)}><ChevronRight size={18} /></button>
    </div>
  )
}
