import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { HERO, THEME, cssUrl, safeUrl } from '../site'

// เนื้อหาสไลด์มาจาก HERO ใน site.ts (แอดมินแก้ได้) — เลื่อนอัตโนมัติ 6 วิ (หยุดเมื่อเมาส์ชี้/ผู้ใช้ปิดแอนิเมชัน)
function Cta({ to, className, label, tabIndex }: { to: string; className: string; label: string; tabIndex: number }) {
  const href = safeUrl(to)
  if (!href) return null
  const inner = <>{label} {className.includes('accent') && <ArrowRight size={17} />}</>
  return /^\//.test(href)
    ? <Link className={className} to={href} tabIndex={tabIndex}>{inner}</Link>
    : <a className={className} href={href} tabIndex={tabIndex}>{inner}</a>
}

export default function Hero() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = HERO.length
  const poster = THEME.heroStyle === 'poster' // แบบโปสเตอร์: แสดงภาพแบนเนอร์เต็มกว้าง (ข้อความอยู่ในภาพ) ไม่ครอป
  const banner = THEME.heroStyle === 'banner' // แบบแบนเนอร์: ภาพของสไลด์เป็นพื้นหลังเต็มจอ (ไม่ใช้กล่องภาพด้านขวา)
  useEffect(() => {
    if (paused || count < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI(n => (n + 1) % count), 6000)
    return () => clearInterval(t)
  }, [paused, count])
  if (!count) return null

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="สินค้าเด่น" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {HERO.map((s, idx) => {
        const img = cssUrl(s.image)
        const on = idx === i % count
        if (poster && safeUrl(s.image)) {
          // โปสเตอร์: ภาพทั้งใบเป็นแบนเนอร์ (กดไปลิงก์ของปุ่มหลักได้) · หัวข้อ/คำอธิบายใส่ไว้แบบซ่อนเพื่อโปรแกรมอ่านหน้าจอและ SEO
          const href = safeUrl(s.primaryTo)
          const pic = (
            <picture>
              {safeUrl(s.imageMobile) && <source media="(max-width: 920px)" srcSet={safeUrl(s.imageMobile)} />}
              <img src={safeUrl(s.image)} alt={s.title} loading={idx === 0 ? 'eager' : 'lazy'} />
            </picture>
          )
          return (
            <div key={idx} data-edit={`HERO:${idx}`} className={`slide poster${on ? ' on' : ''}`} aria-hidden={!on}>
              {href ? (/^\//.test(href) ? <Link to={href} tabIndex={on ? 0 : -1} aria-label={`${s.title} — ${s.primaryLabel || 'ดูรายละเอียด'}`}>{pic}</Link> : <a href={href} tabIndex={on ? 0 : -1} aria-label={s.title}>{pic}</a>) : pic}
              <h1 className="sr-only">{s.title}</h1>
              <p className="sr-only">{s.lead}</p>
            </div>
          )
        }
        return (
          <div key={idx} data-edit={`HERO:${idx}`} className={`slide${idx === i % count ? ' on' : ''}${s.shade === 'off' ? ' no-shade' : ''}`} aria-hidden={idx !== i % count}
            style={{ background: banner && img
              ? `${img} 70% center / cover no-repeat, linear-gradient(125deg, ${s.color}, color-mix(in srgb, ${s.color} 55%, #0f1f3d))`
              : `linear-gradient(125deg, ${s.color}, color-mix(in srgb, ${s.color} 55%, #0f1f3d))` }}>
            <div className="wrap">
              <div>
                {s.tag && <span className="tag" style={{ background: 'rgba(255,255,255,.18)', color: '#fff' }}>{s.tag}</span>}
                <h1 style={{ marginTop: 14 }}>{s.title}</h1>
                <p className="lead">{s.lead}</p>
                <div className="actions">
                  {s.primaryLabel && <Cta className="btn accent" to={s.primaryTo} label={s.primaryLabel} tabIndex={idx === i % count ? 0 : -1} />}
                  {s.secondaryLabel && <Cta className="btn ghost" to={s.secondaryTo} label={s.secondaryLabel} tabIndex={idx === i % count ? 0 : -1} />}
                </div>
              </div>
              <div className="art" aria-hidden style={img ? { backgroundImage: img } : undefined} data-image={img ? '1' : undefined}>
                {!img && <Sparkles />}
                {s.chip1 && <span className="chip" style={{ top: '14%', left: '-4%' }}>{s.chip1}</span>}
                {s.chip2 && <span className="chip" style={{ bottom: '14%', right: '-4%' }}>{s.chip2}</span>}
              </div>
            </div>
          </div>
        )
      })}
      {count > 1 && <>
        <button className="hero-arrow prev" aria-label="สไลด์ก่อนหน้า" onClick={() => setI(n => (n - 1 + count) % count)}><ChevronLeft size={22} /></button>
        <button className="hero-arrow next" aria-label="สไลด์ถัดไป" onClick={() => setI(n => (n + 1) % count)}><ChevronRight size={22} /></button>
      </>}
      <div className="dots">
        {HERO.map((_, idx) => <button key={idx} aria-label={`สไลด์ ${idx + 1}`} aria-current={idx === i % count} onClick={() => setI(idx)} />)}
      </div>
    </section>
  )
}
