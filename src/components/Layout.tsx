import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronRight, ExternalLink, LogIn, Mail, MapPin, Menu, Phone, Search, X } from 'lucide-react'
import { BRAND, NAV, PRODUCTS, SOCIAL, safeUrl } from '../site'

const LANGS = ['TH', 'EN', '中文', '日本語']

// ลิงก์เมนู: https:// = เว็บอื่น (แท็บใหม่) · ว่าง = หัวข้อที่กดไม่ได้ · นอกนั้นเป็นลิงก์ภายใน (รองรับ #หัวข้อ)
function NavAnchor({ to, className, children }: { to: string; className?: string; children: ReactNode }) {
  const href = safeUrl(to)
  if (!href) return <span className={className} tabIndex={0} role="button" aria-haspopup="true">{children}</span>
  if (/^https?:\/\//.test(href)) return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<ExternalLink size={12} aria-label="เว็บไซต์อื่น" /></a>
  if (/^(tel|mailto):/.test(href)) return <a className={className} href={href}>{children}</a>
  return <Link className={className} to={href}>{children}</Link>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState(false)
  const [q, setQ] = useState('')
  const [lang, setLang] = useState('TH')
  const loc = useLocation()
  const nav = useNavigate()
  useEffect(() => {
    setOpen(false); setSearch(false)
    const el = loc.hash ? document.getElementById(decodeURIComponent(loc.hash.slice(1))) : null
    if (el) el.scrollIntoView(); else window.scrollTo(0, 0)
  }, [loc.pathname, loc.hash])

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <div className="row">
            {SOCIAL.some(s => safeUrl(s.href)) && <>
              <span className="social-label">ติดตามเรา</span>
              <ul className="social" aria-label="ช่องทางโซเชียล">
                {SOCIAL.filter(s => safeUrl(s.href)).map(s => <li key={s.label}><a href={safeUrl(s.href)} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}
              </ul>
            </>}
          </div>
          <div className="row">
            <span>{BRAND.servicePhone && BRAND.servicePhone !== BRAND.salesPhone ? 'ฝ่ายขาย' : 'โทร'} <a href={`tel:${BRAND.salesPhone.replace(/-/g, '')}`}>{BRAND.salesPhone}</a></span>
            {BRAND.servicePhone && BRAND.servicePhone !== BRAND.salesPhone && <span className="hide-sm">ฝ่ายบริการ <a href={`tel:${BRAND.servicePhone.replace(/-/g, '')}`}>{BRAND.servicePhone}</a></span>}
            <div className="lang" role="group" aria-label="เลือกภาษา (ตัวอย่าง)">
              {LANGS.map(l => <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>{l}</button>)}
            </div>
            <Link to="/account" className="top-login"><LogIn size={14} />เข้าสู่ระบบ</Link>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="wrap">
          <Link to="/" className="logo" aria-label={`${BRAND.name} หน้าแรก`}>
            <img className="logo-img" src="/images/logo.png" alt="" width={36} height={34} />{BRAND.name}
          </Link>
          <nav className={`nav${open ? ' open' : ''}`} aria-label="เมนูหลัก">
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
            <button className="icon-btn" aria-label="ค้นหา" aria-expanded={search} onClick={() => setSearch(s => !s)}><Search size={18} /></button>
            <Link to="/contact" className="btn accent demo-btn">ขอเดโม</Link>
            <button className="icon-btn burger" aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'} aria-expanded={open} onClick={() => setOpen(o => !o)}>{open ? <X size={19} /> : <Menu size={19} />}</button>
          </div>
        </div>
        {search && (
          <div className="searchbar">
            <div className="wrap">
              <form onSubmit={e => { e.preventDefault(); nav(`/knowledge?q=${encodeURIComponent(q)}`) }}>
                <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="ค้นหาบทความ เช่น ปิดงบ สต็อก โปรโมชัน" aria-label="ค้นหา" />
                <button className="btn primary" type="submit">ค้นหา</button>
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
      <footer className="footer">
        <div className="wrap">
          <div className="cols">
            <div>
              <div className="logo" style={{ color: '#fff' }}><img className="logo-img" src="/images/logo.png" alt="" width={36} height={34} />{BRAND.name}</div>
              <p style={{ marginTop: 12, maxWidth: '34ch' }}>{BRAND.tagline}</p>
              {BRAND.taxId && <p style={{ marginTop: 12, fontSize: '0.85rem' }}>{BRAND.company}<br />เลขประจำตัวผู้เสียภาษี {BRAND.taxId}</p>}
            </div>
            <div>
              <h4>บริการ</h4>
              <ul>{PRODUCTS.map(p => <li key={p.slug}><Link to={`/products/${p.slug}`}>{p.name}</Link></li>)}</ul>
            </div>
            <div>
              <h4>บริการและความรู้</h4>
              <ul>
                <li><Link to="/knowledge">ศูนย์ความรู้</Link></li>
                <li><Link to="/services">วิธีทำงานของเรา</Link></li>
                <li><Link to="/about">เกี่ยวกับเรา</Link></li>
                <li><Link to="/contact">ติดต่อเรา</Link></li>
              </ul>
            </div>
            <div>
              <h4>ติดต่อ</h4>
              <ul>
                <li style={{ display: 'flex', gap: 8 }}><MapPin size={16} style={{ flex: 'none', marginTop: 4 }} />{BRAND.address}</li>
                <li style={{ display: 'flex', gap: 8 }}><Phone size={16} />{BRAND.salesPhone}</li>
                {BRAND.email && <li style={{ display: 'flex', gap: 8 }}><Mail size={16} />{BRAND.email}</li>}
              </ul>
              <div className="map"><iframe title="แผนที่ที่ตั้ง Smart Jigsaw" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=14.956087081730265,102.05299126664758&t=m&z=17&ie=UTF8&iwloc=&output=embed" /></div>
            </div>
          </div>
          <div className="legal">
            <span>© 2569 {BRAND.company} สงวนลิขสิทธิ์</span>
          </div>
        </div>
      </footer>
      {cookie && (
        <div className="cookie" role="dialog" aria-label="คุกกี้">
          <span>เว็บไซต์นี้ใช้คุกกี้เพื่อพัฒนาประสบการณ์ใช้งาน ดูรายละเอียดได้ในนโยบายความเป็นส่วนตัว</span>
          <button className="btn primary" onClick={() => { try { localStorage.setItem('cookie-ok', '1') } catch { /* ignore */ } setCookie(false) }}>ยอมรับ</button>
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
