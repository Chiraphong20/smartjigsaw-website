import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { BRAND, PRODUCTS } from '../site'
import { NotFound } from './Others'
import { t, getLang } from '../i18n'

export function PageHead({ title, lead, crumbs }: { title: string; lead?: string; crumbs?: { label: string; to?: string }[] }) {
  return (
    <div className="page-head">
      <div className="wrap">
        <div className="crumbs"><Link to="/">{t('หน้าแรก')}</Link>{crumbs?.map(c => <span key={c.label}>/ {c.to ? <Link to={c.to}>{c.label}</Link> : c.label}</span>)}</div>
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
      </div>
    </div>
  )
}

export function Products() {
  return (
    <>
      <PageHead title={t('บริการและโซลูชัน')} lead={t('บริการ 4 ด้านของ Smart Jigsaw เลือกใช้แยกกันได้ หรือรวมกันให้ทำงานเชื่อมกันทั้งองค์กร')} />
      <section className="section">
        <div className="wrap grid c2">
          {PRODUCTS.map(p => {
            const Icon = p.icon
            return (
              <Link key={p.slug} to={`/products/${p.slug}`} className="card" data-edit={`PRODUCTS:${PRODUCTS.indexOf(p)}`} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 18 }}>
                <div className="ic" style={{ background: p.color, marginBottom: 0 }}><Icon size={24} /></div>
                <div>
                  <h3>{p.name}</h3>
                  <p style={{ marginTop: 4 }}>{p.summary}</p>
                  <span className="link-more" style={{ marginTop: 12 }}>{t('ดูรายละเอียด')} <ArrowRight size={15} /></span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}

export function ProductDetail() {
  const { slug } = useParams()
  const p = PRODUCTS.find(x => x.slug === slug)
  if (!p) return <NotFound />
  const Icon = p.icon
  const others = PRODUCTS.filter(x => x.slug !== p.slug)
  return (
    <>
      <PageHead title={p.name} lead={p.short} crumbs={[{ label: t('บริการ'), to: '/products' }, { label: p.name }]} />
      <section className="section">
        <div className="wrap two" data-edit={`PRODUCTS:${PRODUCTS.indexOf(p)}`}>
          <div>
            <div className="ic" style={{ background: p.color, width: 56, height: 56 }}><Icon size={28} /></div>
            <p className="prose" style={{ fontSize: '1.08rem' }}>{p.summary}</p>
            <h2 style={{ fontSize: '1.3rem', margin: '30px 0 14px' }}>{t('จุดเด่น')}</h2>
            <ul className="check">{p.features.map(f => <li key={f}><Check size={18} /><span>{f}</span></li>)}</ul>
            <h2 style={{ fontSize: '1.3rem', margin: '34px 0 14px' }}>{t('ขอบเขตงาน')}</h2>
            <div className="grid c2">
              {p.modules.map(m => <div key={m.title} className="card"><h3 style={{ fontSize: '1rem' }}>{m.title}</h3><p>{m.text}</p></div>)}
            </div>
          </div>
          <aside className="side card">
            <h3>{t('เหมาะกับใคร')}</h3>
            <p style={{ margin: '8px 0 18px' }}>{p.forWho}</p>
            <Link to="/contact" className="btn primary" style={{ width: '100%' }}>{t('ขอคำปรึกษา')}</Link>
            <Link to="/#works" className="btn ghost" style={{ width: '100%', marginTop: 10 }}>{t('ดูตัวอย่างผลงาน')}</Link>
            <p className="note" style={{ marginTop: 14 }}>{t('โทรสอบถาม')} {BRAND.salesPhone}</p>
          </aside>
        </div>
      </section>
      <section className="section alt">
        <div className="wrap">
          <div className="section-head"><h2>{t('บริการอื่นของเรา')}</h2></div>
          <div className="grid c4">
            {others.map(o => { const I = o.icon; return (
              <Link key={o.slug} to={`/products/${o.slug}`} className="card">
                <div className="ic" style={{ background: o.color }}><I size={22} /></div><h3 style={{ fontSize: '1rem' }}>{o.name}</h3><p>{o.short}</p>
              </Link>
            ) })}
          </div>
        </div>
      </section>
    </>
  )
}
