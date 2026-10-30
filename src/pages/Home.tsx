import { Link } from 'react-router-dom'
import { ArrowRight, Award, ChevronRight, ExternalLink, Handshake, Leaf, Mail, MapPin, MessageCircle, Phone, Sparkles, TrendingUp } from 'lucide-react'
import CardCarousel from '../components/CardCarousel'
import EventList from '../components/EventList'
import Hero from '../components/Hero'
import VideoSection from '../components/VideoSection'
import SocialFeed from '../components/SocialFeed'
import AdBanner from '../components/AdBanner'
import { BRAND, COMPANY, PROGRAMS, EVENTS, HOME, NEWS, AWARDS, SOCIAL_POSTS, safeUrl, thaiDate } from '../site'
import { t, getLang } from '../i18n'

// ไอคอนค่านิยมในส่วนแนะนำบริษัท (เรียงตาม COMPANY.stats)
const CO_ICONS = [Sparkles, Handshake, TrendingUp, Leaf]

const EVENTS_HOME = 3 // หน้าแรกแสดงกิจกรรมล่าสุดกี่รายการ (ที่เหลืออยู่หน้า /events)

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
          <div className={`programs${PROGRAMS.some(p => safeUrl(p.image)) ? ' has-img' : ''}`}>
            {PROGRAMS.map((p, n) => {
              const href = safeUrl(p.to) ?? '/contact'
              const external = /^https?:\/\//.test(href)
              const body = safeUrl(p.image) ? (
                <img className="program-banner" src={safeUrl(p.image)} alt={`${p.name} — ${p.tagline}`} loading="lazy" />
              ) : (
                <>
                  {safeUrl(p.logo) ? <img className="program-logo" src={safeUrl(p.logo)} alt={p.name} loading="lazy" /> : <strong>{p.name}</strong>}
                  <span>{p.tagline}</span>
                </>
              )
              const style = safeUrl(p.image) ? undefined : { background: `linear-gradient(135deg, ${p.color}, ${p.color2})` }
              return external
                ? <a key={n} href={href} target="_blank" rel="noopener noreferrer" className={`program${safeUrl(p.image) ? ' banner' : ''}`} data-edit={`PROGRAMS:${n}`} style={style}>{body}</a>
                : <Link key={n} to={href} className={`program${safeUrl(p.image) ? ' banner' : ''}`} data-edit={`PROGRAMS:${n}`} style={style}>{body}</Link>
            })}
          </div>
        </div>
      </section>

      <section className="section works-sec" id="works">
        <div className="wrap"><VideoSection /></div>
      </section>

      {SOCIAL_POSTS.length > 0 && (
        <section className="section alt" id="social">
          <div className="wrap">
            <div className="section-head">
              <div data-edit="HOME"><h2>{HOME.socialTitle}</h2><p>{HOME.socialText}</p></div>
            </div>
            <SocialFeed />
          </div>
        </section>
      )}

      <section className="section alt">
        <div className="wrap"><AdBanner /></div>
      </section>

      <section className="section co-sec" id="company" data-edit="COMPANY">
        <div className="wrap">
          <div className="co-panel">
            <div className="co-text">
              <span className="co-eyebrow">{HOME.companyTag}</span>
              <h2>{COMPANY.heading}</h2>
              <div className="prose">{COMPANY.text.map((t, i) => <p key={i}>{t}</p>)}</div>
              <div><Link to="/about" className="btn primary">{t('รู้จักเราเพิ่มเติม')} <ArrowRight size={18} /></Link></div>
              <ul className="co-values">
                {COMPANY.stats.map((s, i) => {
                  const Icon = CO_ICONS[i % CO_ICONS.length]
                  return <li key={i}><span className="co-ico" aria-hidden="true"><Icon size={26} strokeWidth={1.7} /></span><div><b>{s.n}</b><small>{s.label}</small></div></li>
                })}
              </ul>
            </div>
            <div className="co-art"><Cover image={COMPANY.image} color="#1369D5" alt={t('ทีมงานของเรา')} /></div>
          </div>
        </div>
      </section>

      {AWARDS.length > 0 && (
        <section className="section" id="awards">
          <div className="wrap">
            <div className="section-head"><div data-edit="HOME"><h2>{HOME.awardsTitle}</h2><p>{HOME.awardsText}</p></div></div>
            <CardCarousel tag="ul" className="awards" label={HOME.awardsTitle}>
              {AWARDS.map((a, i) => {
                const href = safeUrl(a.url)
                const body = (
                  <>
                    <div className="award-badge">{safeUrl(a.image) ? <img src={safeUrl(a.image)} alt="" loading="lazy" /> : <Award size={34} aria-hidden="true" />}</div>
                    <h3>{a.title}</h3>
                    {(a.issuer || a.year) && <span className="tag">{[a.issuer, a.year].filter(Boolean).join(' · ')}</span>}
                    {a.text && <p>{a.text}</p>}
                    {href && <span className="link-more">{t('ดูโพสต์/รายละเอียดเพิ่มเติม')} <ExternalLink size={15} aria-hidden="true" /></span>}
                  </>
                )
                return (
                  <li key={i} data-edit={`AWARDS:${i}`} className="card">
                    {href ? <a href={href} target="_blank" rel="noopener noreferrer" className="award-link">{body}</a> : body}
                  </li>
                )
              })}
            </CardCarousel>
          </div>
        </section>
      )}

      {EVENTS.length > 0 && <section className="section" id="events">
        <div className="wrap">
          <div className="ev-head">
            <div data-edit="HOME"><h2>{HOME.eventsTitle}</h2><p className="ev-sub">{HOME.eventsText}</p></div>
            {EVENTS.length > EVENTS_HOME && <Link to="/events" className="ev-btn" style={{ marginTop: 0 }}>{t('ดูทั้งหมด')} <ChevronRight size={16} /></Link>}
          </div>
          <EventList limit={EVENTS_HOME} />
        </div>
      </section>}

      {NEWS.length > 0 && <section className="section alt" id="news">
        <div className="wrap">
          <div className="section-head">
            <div data-edit="HOME"><h2>{HOME.newsTitle}</h2><p>{HOME.newsText}</p></div>
            <Link to="/knowledge" className="link-more">{t('ดูบทความทั้งหมด')} <ArrowRight size={16} /></Link>
          </div>
          <CardCarousel label={HOME.newsTitle}>
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
          </CardCarousel>
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
              <Link to="/contact" className="btn accent">{t('ขอคำปรึกษา')}</Link>
              <a href={`tel:${BRAND.salesPhone.replace(/-/g, '')}`} className="btn ghost" style={{ background: 'rgba(255,255,255,.14)', color: '#fff', borderColor: 'rgba(255,255,255,.35)' }}>{t('โทร')} {BRAND.salesPhone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
