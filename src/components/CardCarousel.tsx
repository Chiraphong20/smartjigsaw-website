import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { t } from '../i18n'

// แถวการ์ดที่เลื่อนได้: ‹ การ์ด การ์ด การ์ด › — แสดง 3 ใบบนจอกว้าง (2 / 1 ใบตามขนาดจอ)
// มีรายการไม่เกินที่แสดงได้ = ไม่มีปุ่ม · ปัดนิ้วบนมือถือได้ · gotoEvent: ให้โหมดตัวอย่างของแอดมินเลื่อนไปยังรายการที่กำลังแก้
export default function CardCarousel({ children, tag = 'div', className = '', label, gotoEvent, top }: {
  children: ReactNode; tag?: 'div' | 'ul'; className?: string; label: string; gotoEvent?: string; top?: boolean
}) {
  const track = useRef<HTMLDivElement & HTMLUListElement>(null)
  const [can, setCan] = useState({ prev: false, next: false })
  const items = Children.toArray(children)

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCan(c => {
      const n = { prev: el.scrollLeft > 2, next: el.scrollLeft < max - 2 }
      return c.prev === n.prev && c.next === n.next ? c : n
    })
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

  const move = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * (el.clientWidth + gap), behavior: smooth ? 'smooth' : 'auto' })
  }
  const Tag = tag
  const scrollable = can.prev || can.next

  return (
    <div className={`cc${scrollable ? ' on' : ''}${top ? ' top' : ''}`} role="group" aria-roledescription="carousel" aria-label={label}>
      {scrollable && <button className="icon-btn cc-btn" aria-label={t('ก่อนหน้า')} disabled={!can.prev} onClick={() => move(-1)}><ChevronLeft size={20} /></button>}
      <Tag ref={track} className={`cc-track ${className}`} onScroll={measure}>{items}</Tag>
      {scrollable && <button className="icon-btn cc-btn" aria-label={t('ถัดไป')} disabled={!can.next} onClick={() => move(1)}><ChevronRight size={20} /></button>}
    </div>
  )
}
