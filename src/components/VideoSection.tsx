import { useState } from 'react'
import { Play } from 'lucide-react'
import CardCarousel from './CardCarousel'
import { PRODUCTS, VIDEOS, safeUrl } from '../site'
import { t } from '../i18n'

export default function VideoSection() {
  const [playing, setPlaying] = useState<number | null>(null)

  return (
      <CardCarousel label={t('เลื่อนดูวิดีโอ')} gotoEvent="sj-video-goto">
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
            </article>
          )
        })}
      </CardCarousel>
  )
}
