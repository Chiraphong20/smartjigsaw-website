import { useEffect, useReducer } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import App from '../App'
import { API_BASE, applyOverride, applyTheme } from '../site'
import { IS_PREVIEW } from '../previewFlag'
import { contentChanged, onLangChange } from '../i18n'

// หมวดที่แก้ → หน้าที่ต้องเปิดดู (ใช้ตอนแอดมินส่ง sj-view)
const ROUTE: Record<string, string> = { HERO: '/', PROGRAMS: '/', VIDEOS: '/', TEAM: '/about', SOCIAL_POSTS: '/', ADS: '/', COMPANY: '/', CUSTOMERS: '/', EVENTS: '/', NEWS: '/', HOME: '/', PRODUCTS: '/products', ARTICLES: '/knowledge', SERVICES: '/services', COURSES: '/training' }

// โหมดตัวอย่าง: หน้าเว็บนี้ถูกฝังใน iframe ของหน้าแอดมิน (?sj-preview=1) — รับ "ร่าง" ที่ผู้ดูแลกำลังพิมพ์มาแสดงทันที
// และเมื่อคลิกส่วนที่มี data-edit จะบอกหน้าแอดมินให้เปิดฟอร์มของส่วนนั้น
// รับข้อความเฉพาะจากโดเมนแอดมิน (โดเมนของ VITE_API_URL) เท่านั้น
const ADMIN_ORIGIN = (() => { try { return API_BASE ? new URL(API_BASE).origin : '' } catch { return '' } })()

export default function PreviewBridge() {
  const [, rerender] = useReducer((n: number) => n + 1, 0)
  const loc = useLocation()
  const navigate = useNavigate()
  const active = IS_PREVIEW && !!ADMIN_ORIGIN
  useEffect(() => onLangChange(rerender), [])

  useEffect(() => {
    if (!active) return
    document.body.classList.add('sj-preview')
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== ADMIN_ORIGIN || e.source !== window.parent) return
      const d = e.data
      if (!d || typeof d !== 'object') return
      if (d.type === 'sj-preview' && typeof d.key === 'string' && d.value && typeof d.value === 'object') { applyOverride(d.key, d.value); contentChanged(d.key); if (d.key === 'THEME') applyTheme(); rerender() }
      else if (d.type === 'sj-view' && typeof d.key === 'string') {
        // ล็อกตัวอย่างไปที่ส่วนที่กำลังแก้: เปิดหน้าที่เกี่ยวข้อง สลับสไลด์ที่แก้อยู่ แล้วเลื่อนไปที่ส่วนนั้น (เลื่อนเฉพาะในกรอบตัวอย่าง)
        const route = ROUTE[d.key]
        const idx = typeof d.index === 'number' ? d.index : null
        if (route && window.location.pathname !== route) navigate(route)
        if (d.key === 'HERO' && idx !== null) window.dispatchEvent(new CustomEvent('sj-hero-goto', { detail: idx }))
        if (d.key === 'ADS' && idx !== null) window.dispatchEvent(new CustomEvent('sj-ad-goto', { detail: idx }))
        if (d.key === 'SOCIAL_POSTS' && idx !== null) window.dispatchEvent(new CustomEvent('sj-social-goto', { detail: idx }))
        if (d.key === 'VIDEOS' && idx !== null) window.dispatchEvent(new CustomEvent('sj-video-goto', { detail: idx }))
        let tries = 0
        const timer = window.setInterval(() => {
          tries += 1
          const el = document.querySelector(`[data-edit="${d.key}${idx !== null ? ':' + idx : ''}"]`) ?? document.querySelector(`[data-edit^="${d.key}"]`)
          if (el) {
            window.clearInterval(timer)
            const r = el.getBoundingClientRect()
            const top = r.top + window.scrollY - Math.max(0, (window.innerHeight - r.height) / 2)
            window.scrollTo({ top: d.key === 'HERO' ? 0 : Math.max(0, top), behavior: 'smooth' })
          } else if (tries > 20) window.clearInterval(timer)
        }, 100)
      }
      else if (d.type === 'sj-goto' && typeof d.path === 'string' && d.path.startsWith('/') && !d.path.startsWith('//')) navigate(d.path)
    }
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.('[data-edit]')
      if (!el) return
      e.preventDefault(); e.stopPropagation()
      const [key, idx] = String(el.getAttribute('data-edit')).split(':')
      window.parent.postMessage({ type: 'sj-focus', key, index: idx === undefined ? null : Number(idx) }, ADMIN_ORIGIN)
    }
    window.addEventListener('message', onMessage)
    document.addEventListener('click', onClick, true)
    window.parent.postMessage({ type: 'sj-ready' }, ADMIN_ORIGIN)
    return () => { window.removeEventListener('message', onMessage); document.removeEventListener('click', onClick, true); document.body.classList.remove('sj-preview') }
  }, [active, navigate])

  useEffect(() => { if (active) window.parent.postMessage({ type: 'sj-path', path: loc.pathname }, ADMIN_ORIGIN) }, [active, loc.pathname])

  return <App />
}
