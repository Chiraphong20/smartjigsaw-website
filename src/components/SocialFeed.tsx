import { useState } from 'react'
import { ExternalLink, Play } from 'lucide-react'
import CardCarousel from './CardCarousel'
import { SOCIAL_POSTS, cssUrl, safeUrl, thaiDate } from '../site'
import { t } from '../i18n'

const PLATFORM: Record<string, string> = { facebook: 'Facebook', instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube', other: 'โซเชียล' }

// แปลงลิงก์โพสต์เป็นลิงก์ฝัง (iframe) ของแพลตฟอร์มนั้น — ไม่โหลดสคริปต์ภายนอก, รับเฉพาะโดเมนที่ระบุ, ไม่รู้จัก = null (แสดงเป็นการ์ดเปิดต้นฉบับแทน)
function embedOf(platform: string, raw: string): { src: string; ratio: string } | null {
  let u: URL
  try { u = new URL(raw) } catch { return null }
  if (u.protocol !== 'https:') return null
  const host = u.hostname.replace(/^(www|m|web)\./, '')
  const path = u.pathname
  if (platform === 'youtube' && (host === 'youtube.com' || host === 'youtu.be')) {
    const id = host === 'youtu.be' ? path.slice(1) : u.searchParams.get('v') ?? path.match(/^\/(?:shorts|embed|live)\/([\w-]+)/)?.[1] ?? ''
    return /^[\w-]{6,20}$/.test(id) ? { src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`, ratio: path.startsWith('/shorts') ? '9 / 16' : '16 / 9' } : null
  }
  // Facebook ไม่ฝัง (ปลั๊กอินมักขึ้น "ไม่พร้อมใช้งาน" และหน้าตาไม่คงที่) — แสดงเป็นการ์ดที่ลิงก์ไปโพสต์จริง
  if (platform === 'instagram' && host === 'instagram.com') {
    const m = path.match(/^\/(p|reel|tv)\/([\w-]+)/)
    return m ? { src: `https://www.instagram.com/${m[1]}/${m[2]}/embed`, ratio: '4 / 5.4' } : null
  }
  if (platform === 'tiktok' && host === 'tiktok.com') {
    const id = path.match(/\/video\/(\d{8,25})/)?.[1]
    return id ? { src: `https://www.tiktok.com/embed/v2/${id}`, ratio: '9 / 16' } : null
  }
  return null
}

export default function SocialFeed() {
  const [loaded, setLoaded] = useState<number | null>(null)

  return (
      <CardCarousel className="start" label={t('เลื่อนดูคอนเทนต์โซเชียล')} gotoEvent="sj-social-goto">
        {SOCIAL_POSTS.map((p, id) => {
          const href = safeUrl(p.url)
          const emb = href && p.show !== 'card' ? embedOf(p.platform, href) : null
          const name = p.platform === 'other' || !PLATFORM[p.platform] ? t('โซเชียล') : PLATFORM[p.platform]
          const cover = cssUrl(p.cover)
          return (
            <article key={id} data-edit={`SOCIAL_POSTS:${id}`} className="feed card">
              <div className="feed-frame" style={{ aspectRatio: emb ? emb.ratio : '16 / 9', background: cover ? `${cover} center / cover` : 'linear-gradient(125deg, var(--ink), var(--primary))' }}>
                {emb && loaded === id ? (
                  <iframe src={emb.src} title={p.title || `${t('โพสต์จาก')} ${name}`} loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; clipboard-write" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
                ) : emb ? (
                  <button className="feed-load" onClick={() => setLoaded(id)}>
                    <span className="play"><Play size={22} /></span>
                    <b>{t('ดูโพสต์')} {name}</b>
                    <small>{t('กดเพื่อโหลดจาก')} {name} {t('(จะมีการเชื่อมต่อกับแพลตฟอร์มนั้น)')}</small>
                  </button>
                ) : (
                  <span className="feed-badge">{name}</span>
                )}
              </div>
              <div className="meta" style={{ marginTop: 14 }}>
                <span className="tag">{name}</span>{p.date && <span>{thaiDate(p.date)}</span>}
              </div>
              {p.title && <h3>{p.title}</h3>}
              {p.text && <p>{p.text}</p>}
              {href && <a href={href} target="_blank" rel="noopener noreferrer" className="link-more">{t('เปิดโพสต์ต้นฉบับบน')} {name} <ExternalLink size={15} /></a>}
            </article>
          )
        })}
      </CardCarousel>
  )
}
