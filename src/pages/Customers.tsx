import { Link } from 'react-router-dom'
import { CUSTOMERS, HOME, safeUrl } from '../site'
import { PageHead } from './Products'

export function Customers() {
  const featured = CUSTOMERS.filter(c => c.text || c.image)
  const others = CUSTOMERS.filter(c => !(c.text || c.image))
  return (
    <>
      <PageHead title="ลูกค้าของเรา" lead={HOME.customersText} crumbs={[{ label: 'ลูกค้าของเรา' }]} />
      <section className="section">
        <div className="wrap">
          {CUSTOMERS.length === 0 && <p>กำลังรวบรวมรายชื่อลูกค้า — ติดตามได้เร็วๆ นี้</p>}
          <ul className="showcase">
            {featured.map((c, i) => (
              <li key={i} data-edit={`CUSTOMERS:${CUSTOMERS.indexOf(c)}`}>
                {safeUrl(c.image)
                  ? <img className="showcase-thumb" src={safeUrl(c.image)} alt={c.name} loading="lazy" />
                  : <div className="showcase-thumb" style={{ background: c.color }} aria-hidden="true">{c.name}</div>}
                <div>
                  <h3>{c.name}{c.place ? ` ${c.place}` : ''}</h3>
                  {c.text && <p>{c.text}</p>}
                </div>
              </li>
            ))}
          </ul>
          {others.length > 0 && (
            <ul className="logos" style={{ marginTop: 40 }}>
              {others.map((c, i) => <li key={i}>{safeUrl(c.logo) ? <img src={safeUrl(c.logo)} alt={c.name} loading="lazy" /> : c.name}</li>)}
            </ul>
          )}
          <p style={{ marginTop: 32 }}><Link to="/contact" className="btn primary">ขอใบเสนอราคา</Link></p>
        </div>
      </section>
    </>
  )
}
