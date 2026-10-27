import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { API_BASE, BRAND, COMPANY, COURSES, PRODUCTS, SERVICES, HOME, TEAM, safeUrl } from '../site'
import { PageHead } from './Products'

export function NotFound() {
  return (
    <section className="section"><div className="wrap" style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem' }}>ไม่พบหน้าที่ต้องการ</h1>
      <p style={{ margin: '10px 0 22px', color: 'var(--ink-2)' }}>ลิงก์อาจผิดหรือหน้านี้ถูกย้ายแล้ว</p>
      <Link to="/" className="btn primary">กลับหน้าแรก</Link>
    </div></section>
  )
}

export function Services() {
  return (
    <>
      <PageHead title="วิธีทำงานของเรา" lead="ค่านิยม 4 ข้อที่เรายึดถือในการทำงานกับลูกค้า" crumbs={[{ label: 'วิธีทำงาน' }]} />
      <section className="section"><div className="wrap grid c2">
        {SERVICES.map((s, n) => <div key={s.title} data-edit={`SERVICES:${n}`} className="card"><h3>{s.title}</h3><p>{s.text}</p></div>)}
      </div></section>
      <section className="section alt"><div className="wrap">
        <div className="band"><div><h2>อยากคุยกับทีมงาน?</h2><p>โทร {BRAND.servicePhone}{BRAND.line ? ` · ไลน์ ${BRAND.line}` : ''}{BRAND.hours ? ` · ${BRAND.hours}` : ''}</p></div>
          <Link to="/contact" className="btn accent">ติดต่อเรา</Link></div>
      </div></section>
    </>
  )
}

export function Training() {
  return (
    <>
      <PageHead title="หลักสูตรอบรม" lead="เรียนรู้การใช้งานระบบกับวิทยากรที่ใช้งานจริง ทั้งห้องเรียนและ e-Learning" crumbs={[{ label: 'อบรม' }]} />
      <section className="section"><div className="wrap grid c2">
        {COURSES.length === 0 && <p>กำลังจัดทำหลักสูตร — ติดตามได้เร็วๆ นี้ หรือ<Link to="/contact" className="link-more">ติดต่อทีมงาน</Link></p>}
        {COURSES.map((c, n) => (
          <div key={c.id} data-edit={`COURSES:${n}`} className="card">
            <div className="meta"><span className="tag">{c.level}</span>{c.hours} ชั่วโมง · {c.price}</div>
            <h3>{c.title}</h3>
            <ul className="check" style={{ marginTop: 12 }}>{c.topics.map(t => <li key={t}><span>• {t}</span></li>)}</ul>
            <Link to="/contact" className="btn ghost" style={{ marginTop: 16 }}>สอบถามรอบอบรม</Link>
          </div>
        ))}
      </div></section>
    </>
  )
}

export function About() {
  return (
    <>
      <PageHead title="เกี่ยวกับเรา" lead={BRAND.tagline} crumbs={[{ label: 'เกี่ยวกับเรา' }]} />
      <section className="section"><div className="wrap two">
        <div className="prose" data-edit="COMPANY">
          <p>{COMPANY.text[0]}</p>
          <p>{COMPANY.text[1]}</p>
          <p>ค่านิยมของเรา: ความเรียบง่าย · ความจริงใจ · การลงมือทำจริง · ความยั่งยืน</p>
        </div>
        <div className="card stats" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {COMPANY.stats.map((s, i) => <div key={i} className="stat"><b>{s.n}</b><span>{s.label}</span></div>)}
        </div>
      </div></section>
      {TEAM.length > 0 && (
        <section className="section alt" id="team">
          <div className="wrap">
            <div className="section-head"><div data-edit="HOME"><h2>{HOME.teamTitle}</h2><p>{HOME.teamText}</p></div></div>
            <ul className="team">
              {TEAM.map((m, i) => (
                <li key={i} data-edit={`TEAM:${i}`} className="card">
                  {safeUrl(m.photo)
                    ? <img className="team-photo" src={safeUrl(m.photo)} alt={m.name} loading="lazy" />
                    : <div className="team-photo" style={{ background: m.color || 'var(--primary)' }} aria-hidden="true">{m.name.trim().slice(0, 1)}</div>}
                  <h3>{m.name}</h3>
                  <span className="tag">{m.role}</span>
                  {m.text && <p>{m.text}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}

export function Contact() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setState('sending')
    try {
      const r = await fetch(`${API_BASE}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(f)) })
      setState(r.ok ? 'sent' : 'error')
    } catch { setState('error') }
  }
  return (
    <>
      <PageHead title="ติดต่อเรา" lead="บอกความต้องการของคุณ ทีมงานจะติดต่อกลับโดยเร็วที่สุด" crumbs={[{ label: 'ติดต่อ' }]} />
      <section className="section"><div className="wrap two">
        <form className="card form" onSubmit={submit}>
          <div className="row2">
            <label>ชื่อ-นามสกุล<input name="name" required maxLength={120} placeholder="สมชาย ใจดี" /></label>
            <label>บริษัท<input name="company" maxLength={160} placeholder="ชื่อบริษัท/ร้านค้า" /></label>
          </div>
          <div className="row2">
            <label>เบอร์โทร<input name="phone" required type="tel" maxLength={40} placeholder="08x-xxx-xxxx" /></label>
            <label>อีเมล<input name="email" type="email" maxLength={160} placeholder="name@company.com" /></label>
          </div>
          <label>สนใจบริการ
            <select name="interest" defaultValue=""><option value="" disabled>เลือกบริการ</option>{PRODUCTS.map(p => <option key={p.slug}>{p.name}</option>)}<option>ยังไม่แน่ใจ ขอคำแนะนำ</option></select>
          </label>
          <label>รายละเอียด<textarea name="message" rows={4} maxLength={3000} placeholder="ประเภทธุรกิจ จำนวนสาขา/พนักงาน และสิ่งที่อยากแก้" /></label>
          {state === 'sent' ? <div className="ok" role="status">รับข้อมูลแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด</div>
            : <>
              {state === 'error' && <div className="note" role="alert" style={{ color: '#b42318' }}>ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่ หรือโทร {BRAND.salesPhone}</div>}
              <button className="btn primary" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'กำลังส่ง…' : 'ส่งข้อมูล'}</button>
            </>}
        </form>
        <aside className="card" data-edit="BRAND" style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'flex', gap: 12 }}><Phone size={19} /><div><b>โทร</b><br />{BRAND.salesPhone}{BRAND.servicePhone && BRAND.servicePhone !== BRAND.salesPhone && <><br /><span className="note">ฝ่ายบริการ {BRAND.servicePhone}</span></>}</div></div>
          {BRAND.email && <div style={{ display: 'flex', gap: 12 }}><Mail size={19} /><div><b>อีเมล</b><br />{BRAND.email}</div></div>}
          {BRAND.line && <div style={{ display: 'flex', gap: 12 }}><MessageCircle size={19} /><div><b>ไลน์</b><br />{BRAND.line}</div></div>}
          {BRAND.hours && <div style={{ display: 'flex', gap: 12 }}><Clock size={19} /><div><b>เวลาทำการ</b><br />{BRAND.hours}</div></div>}
          <div style={{ display: 'flex', gap: 12 }}><MapPin size={19} /><div><b>ที่อยู่</b><br />{BRAND.address}</div></div>
        </aside>
      </div></section>
    </>
  )
}

export function Account() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [done, setDone] = useState(false)
  const submit = (e: FormEvent) => { e.preventDefault(); setDone(true) } // ตัวอย่าง: ยังไม่มีระบบสมาชิกจริง — ต้องต่อ backend
  return (
    <>
      <PageHead title={mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'} crumbs={[{ label: 'สมาชิก' }]} />
      <section className="section"><div className="wrap" style={{ maxWidth: 520 }}>
        <div className="tabs" role="group" aria-label="โหมด">
          <button aria-pressed={mode === 'login'} onClick={() => { setMode('login'); setDone(false) }}>เข้าสู่ระบบ</button>
          <button aria-pressed={mode === 'register'} onClick={() => { setMode('register'); setDone(false) }}>สมัครสมาชิก</button>
        </div>
        <form className="card form" onSubmit={submit}>
          {mode === 'register' && <label>ชื่อ-นามสกุล<input required /></label>}
          <label>อีเมล<input required type="email" autoComplete="email" /></label>
          <label>รหัสผ่าน<input required type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={8} /></label>
          {done ? <div className="ok" role="status">หน้าตัวอย่าง — ยังไม่มีระบบสมาชิกเบื้องหลัง ต้องต่อ backend ก่อนใช้งานจริง</div>
            : <button className="btn primary" type="submit">{mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}</button>}
          <p className="note">ลืมรหัสผ่าน? ติดต่อฝ่ายบริการ {BRAND.servicePhone}</p>
        </form>
      </div></section>
    </>
  )
}
