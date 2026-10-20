import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ARTICLES, thaiDate } from '../site'
import { PageHead } from './Products'
import { NotFound } from './Others'

const CATS = ['ทั้งหมด', 'ERP', 'POS', 'ข่าวสาร'] as const

export function Knowledge() {
  const [params] = useSearchParams()
  const q = (params.get('q') ?? '').trim().toLowerCase()
  const [cat, setCat] = useState<(typeof CATS)[number]>('ทั้งหมด')
  const list = useMemo(() => ARTICLES.filter(a =>
    (cat === 'ทั้งหมด' || a.category === cat) &&
    (!q || (a.title + a.excerpt + a.body.join(' ')).toLowerCase().includes(q))), [cat, q])
  return (
    <>
      <PageHead title="ศูนย์ความรู้" lead="บทความ เทคนิค และข่าวสารจากทีมงาน" crumbs={[{ label: 'ศูนย์ความรู้' }]} />
      <section className="section">
        <div className="wrap">
          <div className="tabs" role="group" aria-label="หมวดบทความ">
            {CATS.map(c => <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}
          </div>
          {q && <p className="note" style={{ marginBottom: 16 }}>ผลการค้นหา “{params.get('q')}” — {list.length} รายการ</p>}
          {list.length === 0 ? <p>ไม่พบบทความที่ตรงกับเงื่อนไข ลองเปลี่ยนหมวดหรือคำค้นหา</p> : (
            <div className="grid c3">
              {list.map(a => (
                <Link key={a.slug} to={`/knowledge/${a.slug}`} className="card" data-edit={`ARTICLES:${ARTICLES.indexOf(a)}`}>
                  <div className="meta"><span className="tag">{a.category}</span>{thaiDate(a.date)}</div>
                  <h3>{a.title}</h3><p style={{ marginTop: 8 }}>{a.excerpt}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export function ArticlePage() {
  const { slug } = useParams()
  const a = ARTICLES.find(x => x.slug === slug)
  if (!a) return <NotFound />
  const more = ARTICLES.filter(x => x.slug !== a.slug).slice(0, 3)
  return (
    <>
      <PageHead title={a.title} crumbs={[{ label: 'ศูนย์ความรู้', to: '/knowledge' }, { label: a.category }]} />
      <section className="section">
        <div className="wrap two">
          <article className="prose" data-edit={`ARTICLES:${ARTICLES.indexOf(a)}`}>
            <div className="meta"><span className="tag">{a.category}</span>{thaiDate(a.date)}</div>
            {a.body.map((p, i) => <p key={i}>{p}</p>)}
            <p><Link to="/contact" className="link-more">ปรึกษาทีมงานเรื่องนี้ →</Link></p>
          </article>
          <aside className="side card">
            <h3>บทความอื่น</h3>
            <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
              {more.map(m => <Link key={m.slug} to={`/knowledge/${m.slug}`} className="link-more" style={{ fontWeight: 500 }}>{m.title}</Link>)}
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
