import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Hero from '../components/Hero'
import VideoSection from '../components/VideoSection'
import AdBanner from '../components/AdBanner'
import { BRAND, COMPANY, PRODUCTS, CUSTOMERS, EVENTS, HOME, NEWS, safeUrl, thaiDate } from '../site'

// ภาพประกอบ: ถ้ามีไฟล์ใน public/ ให้ใส่ path ที่ image ใน site.ts, ไม่มีจะใช้พื้นสีไล่เฉดแทน
function Cover({ image, color, alt }: { image?: string; color: string; alt: string }) {
  const src = safeUrl(image)
  return src
    ? <img className="cover" src={src} alt={alt} width={640} height={360} loading="lazy" />
    : <div className="cover" role="img" aria-label={alt} style={{ background: `linear-gradient(125deg, ${color}, color-mix(in srgb, ${color} 55%, #0f1f3d))` }} />
}

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section" id="programs">
        <div className="wrap">
          <h2 className="programs-title" data-edit="HOME">{HOME.programsTitle}</h2>
          <div className="programs">
            {PRODUCTS.slice(0, 4).map((p, n) => (
              <Link key={p.slug} to={`/products/${p.slug}`} className="program" data-edit={`PRODUCTS:${n}`}
                style={{ background: `linear-gradient(135deg, ${p.color}, color-mix(in srgb, ${p.color} 70%, #fff))` }}>
                <p.icon size={30} aria-hidden="true" />
                <strong>{p.name}</strong>
                <span>{p.short}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="works">
        <div className="wrap">
          <div className="section-head">
            <div data-edit="HOME"><h2>{HOME.videosTitle}</h2><p>{HOME.videosText}</p></div>
          </div>
          <VideoSection />
        </div>
      </section>

      <section className="section alt">
        <div className="wrap"><AdBanner /></div>
      </section>

      <section className="section" id="company" data-edit="COMPANY">
        <div className="wrap two">
          <div>
            <span className="tag">{HOME.companyTag}</span>
            <h2 style={{ fontSize: 'calc(clamp(1.4rem, 3vw, 2rem) * var(--head-scale, 1))', marginTop: 12 }}>{COMPANY.heading}</h2>
            <div className="prose" style={{ marginTop: 14 }}>{COMPANY.text.map((t, i) => <p key={i}>{t}</p>)}</div>
            <Link to="/about" className="link-more" style={{ marginTop: 18 }}>รู้จักเราเพิ่มเติม <ArrowRight size={16} /></Link>
          </div>
          <div>
            <Cover image={COMPANY.image} color="#1369D5" alt="ทีมงานของเรา" />
            <div className="stats" style={{ marginTop: 20 }}>
              {COMPANY.stats.map((s, i) => <div key={i} className="stat"><b>{s.n}</b><span>{s.label}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      {CUSTOMERS.length > 0 && <section className="section alt" id="customers">
        <div className="wrap">
          <div className="section-head">
            <div data-edit="HOME"><h2>{HOME.customersTitle}</h2><p>{HOME.customersText}</p></div>
            <Link to="/customers" className="link-more">ดูร้านลูกค้าทั้งหมด →</Link>
          </div>
          <ul className="logos">
            {CUSTOMERS.map((c, i) => <li key={i} data-edit={`CUSTOMERS:${i}`}>{safeUrl(c.logo) ? <img src={safeUrl(c.logo)} alt={c.name} loading="lazy" /> : c.name}</li>)}
          </ul>
        </div>
      </section>}

      {EVENTS.length > 0 && <section className="section" id="events">
        <div className="wrap">
          <div className="section-head">
            <div data-edit="HOME"><h2>{HOME.eventsTitle}</h2><p>{HOME.eventsText}</p></div>
          </div>
          <div className="grid c3">
            {EVENTS.map((e, i) => (
              <article key={i} data-edit={`EVENTS:${i}`} className="card media">
                <Cover image={e.image} color={e.color} alt={e.title} />
                <div className="media-body">
                  <div className="meta"><Calendar size={15} />{thaiDate(e.date)}<span>·</span><MapPin size={15} />{e.place}</div>
                  <h3>{e.title}</h3>
                  <p>{e.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>}

      {NEWS.length > 0 && <section className="section alt" id="news">
        <div className="wrap">
          <div className="section-head">
            <div data-edit="HOME"><h2>{HOME.newsTitle}</h2><p>{HOME.newsText}</p></div>
            <Link to="/knowledge" className="link-more">ดูบทความทั้งหมด <ArrowRight size={16} /></Link>
          </div>
          <div className="grid c3">
            {NEWS.map((n, i) => (
              <article key={i} data-edit={`NEWS:${i}`} className="card media">
                <Cover image={n.image} color={n.color} alt={n.title} />
                <div className="media-body">
                  <div className="meta"><span className="tag">{n.outlet}</span>{thaiDate(n.date)}</div>
                  <h3>{n.title}</h3>
                  <p>{n.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>}

      <section className="section" id="contact">
        <div className="wrap">
          <div className="band" data-edit="BRAND">
            <div>
              <h2>{HOME.contactTitle}</h2>
              <p>{HOME.contactText}</p>
              <ul className="contact-list">
                <li><Phone size={16} />{BRAND.salesPhone}</li>
                {BRAND.line && <li><MessageCircle size={16} />LINE {BRAND.line}</li>}
                {BRAND.email && <li><Mail size={16} />{BRAND.email}</li>}
                <li><MapPin size={16} />{BRAND.address}</li>
              </ul>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn accent">ขอคำปรึกษา</Link>
              <a href={`tel:${BRAND.salesPhone.replace(/-/g, '')}`} className="btn ghost" style={{ background: 'rgba(255,255,255,.14)', color: '#fff', borderColor: 'rgba(255,255,255,.35)' }}>โทร {BRAND.salesPhone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
