import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { HERO, cssUrl, safeUrl } from '../site'

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
        return (
          <div key={idx} className={`slide${idx === i % count ? ' on' : ''}`} aria-hidden={idx !== i % count}
            style={{ background: `linear-gradient(125deg, ${s.color}, color-mix(in srgb, ${s.color} 55%, #0f1f3d))` }}>
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
      <div className="dots">
        {HERO.map((_, idx) => <button key={idx} aria-label={`สไลด์ ${idx + 1}`} aria-current={idx === i % count} onClick={() => setI(idx)} />)}
      </div>
    </section>
  )
}
