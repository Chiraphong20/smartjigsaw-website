import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { t } from '../i18n'

// แถวการ์ดที่เลื่อนได้ — แสดง 3 ใบบนจอกว้าง (2 / 1 ใบตามขนาดจอ) · ปัดนิ้วบนมือถือได้
// variant "side" (ค่าเริ่มต้น): ‹ การ์ด การ์ด การ์ด › ปุ่มอยู่ข้างการ์ด · มีรายการไม่เกินที่แสดงได้ = ไม่มีปุ่ม
// variant "top": หัวข้อ (head) ซ้าย ปุ่มก่อนหน้า/ถัดไปขวาบน การ์ดอยู่ใต้หัวข้อ และมีจุดบอกหน้าด้านล่าง
// gotoEvent: ให้โหมดตัวอย่างของแอดมินเลื่อนไปยังรายการที่กำลังแก้
export default function CardCarousel({ children, tag = 'div', className = '', label, gotoEvent, variant = 'side', head }: {
  children: ReactNode; tag?: 'div' | 'ul'; className?: string; label: string; gotoEvent?: string; variant?: 'side' | 'top'; head?: ReactNode
}) {
  const track = useRef<HTMLDivElement & HTMLUListElement>(null)
  const [can, setCan] = useState({ prev: false, next: false })
  const [pg, setPg] = useState({ page: 0, pages: 1 })
  const items = Children.toArray(children)

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCan(c => {
      const n = { prev: el.scrollLeft > 2, next: el.scrollLeft < max - 2 }
      return c.prev === n.prev && c.next === n.next ? c : n
    })
    const first = el.children[0] as HTMLElement | undefined
    if (first) {
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0
      const perPage = Math.max(1, Math.floor((el.clientWidth + gap) / (first.offsetWidth + gap)))
      const pages = Math.max(1, Math.ceil(el.children.length / perPage))
      const page = Math.min(pages - 1, Math.round(el.scrollLeft / ((first.offsetWidth + gap) * perPage)))
      setPg(p => (p.page === page && p.pages === pages ? p : { page, pages }))
    }
  }, [])
  useEffect(() => {
    const el = track.current
    if (!el) return
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure, items.length])
  useEffect(() => {
    if (!gotoEvent) return
    const go = (e: Event) => {
      const el = track.current
      const child = el?.children[(e as CustomEvent<number>).detail] as HTMLElement | undefined
      if (el && child) el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: 'auto' })
    }
    window.addEventListener(gotoEvent, go)
    return () => window.removeEventListener(gotoEvent, go)
  }, [gotoEvent])

  const behavior = () => (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth') as ScrollBehavior
  const move = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({ left: dir * (el.clientWidth + gap), behavior: behavior() })
  }
  const toPage = (p: number) => {
    const el = track.current
    if (!el) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollTo({ left: p * (el.clientWidth + gap), behavior: behavior() })
  }
  const Tag = tag
  const scrollable = can.prev || can.next
  const prev = <button className="icon-btn cc-btn" aria-label={t('ก่อนหน้า')} disabled={!can.prev} onClick={() => move(-1)}><ChevronLeft size={20} /></button>
  const next = <button className="icon-btn cc-btn next" aria-label={t('ถัดไป')} disabled={!can.next} onClick={() => move(1)}><ChevronRight size={20} /></button>
  const list = <Tag ref={track} className={`cc-track ${className}`} onScroll={measure}>{items}</Tag>

  if (variant === 'top') {
    return (
      <div className="cc-top" role="group" aria-roledescription="carousel" aria-label={label}>
        <div className="cc-top-head">
          <div>{head}</div>
          {scrollable && <div className="cc-top-nav">{prev}{next}</div>}
        </div>
        {list}
        {pg.pages > 1 && (
          <div className="cc-dots">
            {Array.from({ length: pg.pages }, (_, i) => <button key={i} aria-label={`${t('หน้า')} ${i + 1} ${t('จาก')} ${pg.pages}`} aria-current={i === pg.page} onClick={() => toPage(i)} />)}
          </div>
        )}
      </div>
    )
  }
  return (
    <div className={`cc${scrollable ? ' on' : ''}`} role="group" aria-roledescription="carousel" aria-label={label}>
      {scrollable && prev}
      {list}
      {scrollable && next}
    </div>
  )
}
