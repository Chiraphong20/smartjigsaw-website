import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronRight, ExternalLink, LogIn, Mail, MapPin, Menu, Phone, Search, X } from 'lucide-react'
import { BRAND, NAV, PRODUCTS, SOCIAL, safeUrl } from '../site'
import { t, getLang, setLang, type Lang } from '../i18n'

// ธงชาติเป็น SVG ในไฟล์ (ธงอีโมจิแสดงไม่ได้บน Windows) — ไทย / อังกฤษ (สหราชอาณาจักร)
function Flag({ lang }: { lang: Lang }) {
  return lang === 'th' ? (
    <svg className="flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#A51931" /><rect y="3.33" width="30" height="13.34" fill="#F4F5F8" /><rect y="6.67" width="30" height="6.66" fill="#2D2A4A" /></svg>
  ) : (
    <svg className="flag" viewBox="0 0 60 30" aria-hidden="true"><clipPath id="flag-s"><path d="M0,0 v30 h60 v-30 z" /></clipPath><clipPath id="flag-t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath><g clipPath="url(#flag-s)"><path d="M0,0 v30 h60 v-30 z" fill="#012169" /><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" /><path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#flag-t)" stroke="#C8102E" strokeWidth="4" /><path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" /><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" /></g></svg>
  )
}
const LANGS: { code: Lang; label: string; name: string }[] = [{ code: 'th', label: 'TH', name: 'ไทย' }, { code: 'en', label: 'EN', name: 'English' }]

// ลิงก์เมนู: https:// = เว็บอื่น (แท็บใหม่) · ว่าง = หัวข้อที่กดไม่ได้ · นอกนั้นเป็นลิงก์ภายใน (รองรับ #หัวข้อ)
function NavAnchor({ to, className, children }: { to: string; className?: string; children: ReactNode }) {
  const href = safeUrl(to)
  if (!href) return <span className={className} tabIndex={0} role="button" aria-haspopup="true">{children}</span>
  if (/^https?:\/\//.test(href)) return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<ExternalLink size={12} aria-label={t('เว็บไซต์อื่น')} /></a>
  if (/^(tel|mailto):/.test(href)) return <a className={className} href={href}>{children}</a>
  return <Link className={className} to={href}>{children}</Link>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
  const [q, setQ] = useState('')
  const lang = getLang()
  const loc = useLocation()
  const nav = useNavigate()
  useEffect(() => {
    setOpen(false); setSearch(false)
    const el = loc.hash ? document.getElementById(decodeURIComponent(loc.hash.slice(1))) : null
    if (el) el.scrollIntoView(); else window.scrollTo(0, 0)
  }, [loc.pathname, loc.hash])

  return (
    <>
      <div className="topbar" data-edit="BRAND">
        <div className="wrap">
          <div className="row">
            {SOCIAL.some(s => safeUrl(s.href)) && <>
              <span className="social-label">{t('ติดตามเรา')}</span>
              <ul className="social" aria-label={t('ช่องทางโซเชียล')}>
                {SOCIAL.filter(s => safeUrl(s.href)).map(s => <li key={s.label}><a href={safeUrl(s.href)} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}
              </ul>
            </>}
          </div>
          <div className="row">
            <span>{BRAND.servicePhone && BRAND.servicePhone !== BRAND.salesPhone ? t('ฝ่ายขาย') : t('โทร')} <a href={`tel:${BRAND.salesPhone.replace(/-/g, '')}`}>{BRAND.salesPhone}</a></span>
            {BRAND.servicePhone && BRAND.servicePhone !== BRAND.salesPhone && <span className="hide-sm">{t('ฝ่ายบริการ')} <a href={`tel:${BRAND.servicePhone.replace(/-/g, '')}`}>{BRAND.servicePhone}</a></span>}
            <div className="lang" role="group" aria-label={t('เลือกภาษา')}>
              {LANGS.map(l => <button key={l.code} aria-pressed={lang === l.code} lang={l.code} aria-label={l.name} title={l.name} onClick={() => setLang(l.code)}><Flag lang={l.code} />{l.label}</button>)}
            </div>
            <Link to="/account" className="top-login"><LogIn size={14} />{t('เข้าสู่ระบบ')}</Link>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="wrap">
          <Link to="/" className="logo" aria-label={`${BRAND.name} ${t('หน้าแรก')}`}>
            <img className="logo-img" src="/images/logo.png" alt="" width={36} height={34} />{BRAND.name}
          </Link>
          <nav className={`nav${open ? ' open' : ''}`} aria-label={t('เมนูหลัก')} data-edit="NAV">
            {NAV.map((item, n) => (
              <div key={n} className="nav-item">
                <NavAnchor to={item.to} className="top">
                  {item.label}{item.children?.length ? <ChevronDown size={14} /> : null}
                </NavAnchor>
                {item.children?.length ? (
                  <div className="dropdown">
                    {item.children.map((c, m) => (
                      <div key={m} className={c.children?.length ? 'has-sub' : undefined}>
                        <NavAnchor to={c.to}>{c.label}{c.children?.length ? <ChevronRight size={14} /> : null}</NavAnchor>
                        {c.children?.length ? <div className="sub dropdown">{c.children.map((g, k) => <NavAnchor key={k} to={g.to}>{g.label}</NavAnchor>)}</div> : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
          <div className="header-tools">
            <button className="icon-btn" aria-label={t('ค้นหา')} aria-expanded={search} onClick={() => setSearch(s => !s)}><Search size={18} /></button>
            <Link to="/contact" className="btn accent demo-btn">{t('ขอเดโม')}</Link>
            <button className="icon-btn burger" aria-label={open ? t('ปิดเมนู') : t('เปิดเมนู')} aria-expanded={open} onClick={() => setOpen(o => !o)}>{open ? <X size={19} /> : <Menu size={19} />}</button>
          </div>
        </div>
        {search && (
          <div className="searchbar">
            <div className="wrap">
              <form onSubmit={e => { e.preventDefault(); nav(`/knowledge?q=${encodeURIComponent(q)}`) }}>
                <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder={t('ค้นหาบทความ เช่น ปิดงบ สต็อก โปรโมชัน')} aria-label={t('ค้นหา')} />
                <button className="btn primary" type="submit">{t('ค้นหา')}</button>
              </form>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

function Footer() {
  const [cookie, setCookie] = useState(() => { try { return localStorage.getItem('cookie-ok') !== '1' } catch { return true } })
  return (
    <>
      <footer className="footer" data-edit="BRAND">
        <div className="wrap">
          <div className="cols">
            <div>
              <div className="logo" style={{ color: '#fff' }}><img className="logo-img" src="/images/logo.png" alt="" width={36} height={34} />{BRAND.name}</div>
              <p style={{ marginTop: 12, maxWidth: '34ch' }}>{BRAND.tagline}</p>
              {BRAND.taxId && <p style={{ marginTop: 12, fontSize: '0.85rem' }}>{BRAND.company}<br />{t('เลขประจำตัวผู้เสียภาษี')} {BRAND.taxId}</p>}
            </div>
            <div>
              <h4>{t('บริการ')}</h4>
              <ul>{PRODUCTS.map(p => <li key={p.slug}><Link to={`/products/${p.slug}`}>{p.name}</Link></li>)}</ul>
            </div>
            <div>
              <h4>{t('บริการและความรู้')}</h4>
              <ul>
                <li><Link to="/knowledge">{t('ศูนย์ความรู้')}</Link></li>
                <li><Link to="/services">{t('วิธีทำงานของเรา')}</Link></li>
                <li><Link to="/about">{t('เกี่ยวกับเรา')}</Link></li>
                <li><Link to="/contact">{t('ติดต่อเรา')}</Link></li>
              </ul>
            </div>
            <div>
              <h4>{t('ติดต่อ')}</h4>
              <ul>
                <li style={{ display: 'flex', gap: 8 }}><MapPin size={16} style={{ flex: 'none', marginTop: 4 }} />{BRAND.address}</li>
                <li style={{ display: 'flex', gap: 8 }}><Phone size={16} />{BRAND.salesPhone}</li>
                {BRAND.email && <li style={{ display: 'flex', gap: 8 }}><Mail size={16} />{BRAND.email}</li>}
              </ul>
              <div className="map"><iframe title={t('แผนที่ที่ตั้ง Smart Jigsaw')} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=14.956087081730265,102.05299126664758&t=m&z=17&ie=UTF8&iwloc=&output=embed" /></div>
            </div>
          </div>
          <div className="legal">
            <span>© {getLang() === 'en' ? 2026 : 2569} {BRAND.company} {t('สงวนลิขสิทธิ์')}</span>
          </div>
        </div>
      </footer>
      {cookie && (
        <div className="cookie" role="dialog" aria-label={t('คุกกี้')}>
          <span>{t('เว็บไซต์นี้ใช้คุกกี้เพื่อพัฒนาประสบการณ์ใช้งาน ดูรายละเอียดได้ในนโยบายความเป็นส่วนตัว')}</span>
          <button className="btn primary" onClick={() => { try { localStorage.setItem('cookie-ok', '1') } catch { /* ignore */ } setCookie(false) }}>{t('ยอมรับ')}</button>
        </div>
      )}
    </>
  )
}

export default function Layout() {
  return (
    <>
      <Header />
      <main><Outlet /></main>
      <Footer />
    </>
  )
}
