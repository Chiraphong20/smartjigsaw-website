import { Link } from 'react-router-dom'
import { Calendar, ChevronRight, MapPin } from 'lucide-react'
import { EVENTS, safeUrl, thaiDate } from '../site'
import { t } from '../i18n'

// รายการกิจกรรม/สัมมนา: การ์ดแนวนอน ภาพสลับซ้าย-ขวา · limit = แสดงกี่รายการแรก (ไม่ใส่ = ทั้งหมด)
export default function EventList({ limit }: { limit?: number }) {
  return (
    <div className="ev-list">
      {EVENTS.slice(0, limit).map((e, i) => {
        const img = safeUrl(e.image)
        const href = safeUrl(e.url)
        return (
          <article key={i} data-edit={`EVENTS:${i}`} className="ev">
            <div className="ev-img">
              {img
                ? <img src={img} alt={e.title} loading="lazy" />
                : <div role="img" aria-label={e.title} style={{ background: `linear-gradient(125deg, ${e.color}, color-mix(in srgb, ${e.color} 55%, #0f1f3d))` }} />}
            </div>
            <div className="ev-body">
              <h3>{e.title}</h3>
              <span className="ev-bar" aria-hidden="true" />
              <div className="ev-meta">
                {e.date && <span><Calendar size={18} aria-hidden="true" />{thaiDate(e.date)}</span>}
                {e.place && <span><MapPin size={18} aria-hidden="true" />{e.place}</span>}
              </div>
              {e.text && <p>{e.text}</p>}
              {href && (/^\//.test(href)
                ? <Link to={href} className="ev-btn">{t('ดูรายละเอียด')} <ChevronRight size={16} /></Link>
                : <a href={href} target="_blank" rel="noopener noreferrer" className="ev-btn">{t('ดูรายละเอียด')} <ChevronRight size={16} /></a>)}
            </div>
          </article>
        )
      })}
    </div>
  )
}
