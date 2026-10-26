import { useEffect, useState } from 'react'
import { Play } from 'lucide-react'
import Pager from './Pager'
import { PRODUCTS, VIDEOS, safeUrl } from '../site'

const PER_PAGE = 3

export default function VideoSection() {
  const [page, setPage] = useState(0)
  const [playing, setPlaying] = useState<number | null>(null)
  // โหมดตัวอย่าง: แอดมินสั่งให้เปิดหน้าที่มีวิดีโอที่กำลังแก้อยู่
  useEffect(() => {
    const go = (e: Event) => setPage(Math.floor((e as CustomEvent<number>).detail / PER_PAGE))
    window.addEventListener('sj-video-goto', go)
    return () => window.removeEventListener('sj-video-goto', go)
  }, [])
  const pages = Math.ceil(VIDEOS.length / PER_PAGE)
  const items = VIDEOS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  return (
    <>
      <div className="grid c3">
        {items.map((v, n) => {
          const id = page * PER_PAGE + n
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
                  <button className="play" aria-label={`เล่นวิดีโอ ${v.title}`} onClick={() => setPlaying(id)}><Play size={26} /></button>
                ) : (
                  <span className="soon">เร็วๆ นี้</span>
                )}
                {v.duration && !file && <span className="duration">{v.duration}</span>}
              </div>
              <div className="meta" style={{ marginTop: 14 }}><span className="tag">{product?.name ?? 'ทั่วไป'}</span></div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </article>
          )
        })}
      </div>
      <Pager page={page} pages={pages} onChange={p => { setPage(p); setPlaying(null) }} label="เลื่อนดูวิดีโอ" />
    </>
  )
}
