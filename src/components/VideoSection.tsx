import { useState } from 'react'
import { ChevronRight, Play } from 'lucide-react'
import CardCarousel from './CardCarousel'
import { HOME, PRODUCTS, VIDEOS, safeUrl } from '../site'
import { t } from '../i18n'

// หัวข้อสองสี: ตัดที่คำว่า "และ" / " and " ตัวแรก ส่วนหลังใช้สีเน้น (ไม่พบ = สีเดียว)
function splitAccent(s: string): [string, string] {
  const m = s.match(/^(.+?)(\s*(?:และ| and ).+)$/)
  return m ? [m[1], m[2]] : [s, '']
}

export default function VideoSection() {
  const [playing, setPlaying] = useState<number | null>(null)
  const [main, accent] = splitAccent(HOME.videosTitle)

  const head = (
    <div data-edit="HOME" className="works-head">
      <h2>{main}{accent && <span>{accent}</span>}</h2>
      <p>{HOME.videosText}</p>
    </div>
  )

  return (
    <CardCarousel variant="top" head={head} label={t('เลื่อนดูวิดีโอ')} gotoEvent="sj-video-goto">
      {VIDEOS.map((v, id) => {
        const file = safeUrl(v.file)
        const yt = /^[\w-]{6,20}$/.test(v.youtubeId || '') ? v.youtubeId : ''
        const product = PRODUCTS.find(p => p.slug === v.product)
        const color = product?.color ?? 'var(--ink)'
        const on = playing === id
        return (
          <article key={id} data-edit={`VIDEOS:${id}`} className="video card">
            <div className="video-frame" style={{ background: `linear-gradient(125deg, ${color}, color-mix(in srgb, ${color} 55%, #0f1f3d))` }}>
              {file ? (
                <video src={file} controls preload="metadata" poster={safeUrl(v.thumb)} />
              ) : on && yt ? (
                <iframe src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1`} title={v.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
              ) : yt ? (
                <button className="play" aria-label={`${t('เล่นวิดีโอ')} ${v.title}`} onClick={() => setPlaying(id)}><Play size={26} /></button>
              ) : (
                <span className="soon">{t('เร็วๆ นี้')}</span>
              )}
              {v.duration && !file && <span className="duration">{v.duration}</span>}
            </div>
            <div className="meta" style={{ marginTop: 14 }}><span className="tag">{product?.name ?? t('ทั่วไป')}</span></div>
            <h3>{v.title}</h3>
            <p>{v.text}</p>
            {yt && !file && !on && <button className="works-btn" onClick={() => setPlaying(id)}>{t('ดูตัวอย่าง')} <ChevronRight size={16} /></button>}
          </article>
        )
      })}
    </CardCarousel>
  )
}
