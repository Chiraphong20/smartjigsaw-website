import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BRAND, HOME, TEAM, safeUrl } from '../site'
import { t } from '../i18n'

// ทีมผู้พัฒนา: การ์ดกลางจอ เห็นขอบการ์ดข้างเคียง ปุ่มก่อนหน้า/ถัดไปมุมขวาบน และจุดบอกตำแหน่งด้านล่าง
// ทุกคนพอดีจอ = ไม่มีปุ่ม/จุด จัดการ์ดกึ่งกลาง · ปัดนิ้วบนมือถือได้
export default function TeamSection() {
  const track = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)
  const [fits, setFits] = useState(false)

  const measure = useCallback(() => {
    const el = track.current
    if (!el || !el.children.length) return
    const kids = Array.from(el.children) as HTMLElement[]
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const total = kids.reduce((n, k) => n + k.offsetWidth, 0) + gap * (kids.length - 1)
    setFits(total <= el.clientWidth - 8)
    const mid = el.scrollLeft + el.clientWidth / 2
    let best = 0, dist = Infinity
    kids.forEach((k, i) => { const d = Math.abs(k.offsetLeft + k.offsetWidth / 2 - mid); if (d < dist) { dist = d; best = i } })
    setActive(best)
  }, [])
  useEffect(() => {
    const el = track.current
    if (!el) return
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure, TEAM.length])

  const go = (i: number) => {
    const el = track.current
    const kid = el?.children[Math.max(0, Math.min(TEAM.length - 1, i))] as HTMLElement | undefined
    if (!el || !kid) return
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left: kid.offsetLeft + kid.offsetWidth / 2 - el.clientWidth / 2, behavior: smooth ? 'smooth' : 'auto' })
  }

  if (!TEAM.length) return null
  return (
    <section className="section team-sec" id="team">
      <div className="wrap">
        <div className="team-head" data-edit="HOME">
          <span className="team-eyebrow">{BRAND.name} <i>/</i> <b>{HOME.teamTag}</b></span>
          <h2>{HOME.teamTitle}</h2>
          <p>{HOME.teamText}</p>
          {!fits && (
            <div className="team-nav">
              <button className="team-btn" aria-label={t('ก่อนหน้า')} disabled={active === 0} onClick={() => go(active - 1)}><ChevronLeft size={22} /></button>
              <button className="team-btn next" aria-label={t('ถัดไป')} disabled={active === TEAM.length - 1} onClick={() => go(active + 1)}><ChevronRight size={22} /></button>
            </div>
          )}
        </div>
      </div>
      <ul ref={track} className={`team-track${fits ? ' fits' : ''}`} aria-label={HOME.teamTitle} onScroll={measure}>
        {TEAM.map((m, i) => (
          <li key={i} data-edit={`TEAM:${i}`} className={`team-card${i === active ? ' on' : ''}`}>
            <div className="team-avatar" style={{ color: m.color || undefined }}>
              {safeUrl(m.photo)
                ? <img src={safeUrl(m.photo)} alt={m.name} loading="lazy" />
                : <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="38" r="17" /><path d="M16 94c0-20 15-33 34-33s34 13 34 33z" /></svg>}
            </div>
            <span className="team-bar" aria-hidden="true" />
            <h3>{m.name}</h3>
            <span className="team-role">{m.role}</span>
            {m.text && <p>{m.text}</p>}
          </li>
        ))}
      </ul>
      {!fits && (
        <div className="team-dots" role="group" aria-label={t('เลื่อนดูทีมผู้พัฒนา')}>
          {TEAM.map((m, i) => <button key={i} aria-label={m.name} aria-current={i === active} onClick={() => go(i)} />)}
        </div>
      )}
    </section>
  )
}
