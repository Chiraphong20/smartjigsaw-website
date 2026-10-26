import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Pager from './Pager'
import { ADS, cssUrl, safeUrl } from '../site'
import { IS_PREVIEW } from '../previewFlag'

// พื้นที่โฆษณา/โปรโมชัน — เลื่อนอัตโนมัติ 7 วิ (หยุดเมื่อเมาส์ชี้หรือผู้ใช้ปิดแอนิเมชัน)
export default function AdBanner() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused || IS_PREVIEW || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI(n => (n + 1) % ADS.length), 7000)
    return () => clearInterval(t)
  }, [paused])
  useEffect(() => {
    const go = (e: Event) => setI((e as CustomEvent<number>).detail)
    window.addEventListener('sj-ad-goto', go)
    return () => window.removeEventListener('sj-ad-goto', go)
  }, [])
  if (!ADS.length) return null
  const ad = ADS[i % ADS.length]
  const bg = cssUrl(ad.image)
  const to = safeUrl(ad.to)

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carousel" aria-label="โปรโมชัน">
      <div className="ad" data-edit={`ADS:${i % ADS.length}`} style={{ background: bg ? `center / cover ${bg}` : `linear-gradient(120deg, ${ad.color}, color-mix(in srgb, ${ad.color} 50%, #0f1f3d))` }}>
        <div className="ad-body">
          <span className="tag" style={{ background: 'rgba(255,255,255,.18)', color: '#fff' }}>โปรโมชัน</span>
          <h2>{ad.title}</h2>
          <p>{ad.text}</p>
          {to && (/^\//.test(to) ? <Link className="btn accent" to={to}>{ad.cta} <ArrowRight size={17} /></Link> : <a className="btn accent" href={to}>{ad.cta} <ArrowRight size={17} /></a>)}
        </div>
      </div>
      <Pager page={i % ADS.length} pages={ADS.length} onChange={setI} label="เลื่อนดูโปรโมชัน" />
    </div>
  )
}
