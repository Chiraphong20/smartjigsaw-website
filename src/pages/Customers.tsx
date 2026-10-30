import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { CUSTOMERS, HOME, PROGRAMS, safeUrl } from '../site'
import { t } from '../i18n'

// ลูกค้าที่มีรายละเอียด/ภาพ = แถวใหญ่ (เลขลำดับ · ภาพ · ข้อมูล + ระบบที่ใช้) · ลูกค้าที่มีแต่ชื่อ/โลโก้ = แถบโลโก้ด้านล่าง
export function Customers() {
  const featured = CUSTOMERS.filter(c => c.text || c.image)
  const others = CUSTOMERS.filter(c => !(c.text || c.image))
  return (
    <>
      <header className="cust-head">
        <div className="wrap">
          <h1>{t('ลูกค้าของเรา')}</h1>
          <p>{HOME.customersText}</p>
        </div>
      </header>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          {CUSTOMERS.length === 0 && <p>{t('กำลังรวบรวมรายชื่อลูกค้า — ติดตามได้เร็วๆ นี้')}</p>}
          <ul className="cust-list">
            {featured.map((c, i) => {
              const url = safeUrl(c.url)
              const systems = (c.systems ?? '').split(',').map(x => x.trim()).filter(Boolean)
              return (
                <li key={i} data-edit={`CUSTOMERS:${CUSTOMERS.indexOf(c)}`} className="cust-row">
                  <span className="cust-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div className="cust-img">
                    {safeUrl(c.image)
                      ? <img src={safeUrl(c.image)} alt={c.name} loading="lazy" />
                      : <div style={{ background: c.color }} aria-hidden="true">{c.name}</div>}
                  </div>
                  <div className="cust-info">
                    <h2>{c.name}{c.place ? ` ${c.place}` : ''}</h2>
                    {c.text && <p>{c.text}</p>}
                    {url && <a href={url} target="_blank" rel="noopener noreferrer" className="cust-link">{t('เยี่ยมชมเว็บไซต์ของร้าน')} <ExternalLink size={16} aria-hidden="true" /></a>}
                    <div><Link to="/contact" className="btn accent">{t('ขอใบเสนอราคา')} <ArrowRight size={18} /></Link></div>
                    {systems.length > 0 && (
                      <ul className="cust-sys">
                        {systems.map(x => {
                          const prog = PROGRAMS.find(p => p.name.toLowerCase() === x.toLowerCase())
                          return (
                            <li key={x} style={{ borderTopColor: prog?.color }}>
                              <b>{x}</b>
                              {prog?.tagline && <span>{prog.tagline}</span>}
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
          {others.length > 0 && (
            <ul className="logos" style={{ marginTop: 40 }}>
              {others.map((c, i) => <li key={i}>{safeUrl(c.url) ? <a href={safeUrl(c.url)} target="_blank" rel="noopener noreferrer">{safeUrl(c.logo) ? <img src={safeUrl(c.logo)} alt={c.name} loading="lazy" /> : c.name}</a> : safeUrl(c.logo) ? <img src={safeUrl(c.logo)} alt={c.name} loading="lazy" /> : c.name}</li>)}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
