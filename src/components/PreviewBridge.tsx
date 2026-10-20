import { useEffect, useReducer } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import App from '../App'
import { API_BASE, applyOverride } from '../site'

// โหมดตัวอย่าง: หน้าเว็บนี้ถูกฝังใน iframe ของหน้าแอดมิน (?sj-preview=1) — รับ "ร่าง" ที่ผู้ดูแลกำลังพิมพ์มาแสดงทันที
// และเมื่อคลิกส่วนที่มี data-edit จะบอกหน้าแอดมินให้เปิดฟอร์มของส่วนนั้น
// รับข้อความเฉพาะจากโดเมนแอดมิน (โดเมนของ VITE_API_URL) เท่านั้น
const IS_PREVIEW = typeof window !== 'undefined' && window.parent !== window && new URLSearchParams(window.location.search).has('sj-preview')
const ADMIN_ORIGIN = (() => { try { return API_BASE ? new URL(API_BASE).origin : '' } catch { return '' } })()

export default function PreviewBridge() {
  const [, rerender] = useReducer((n: number) => n + 1, 0)
  const loc = useLocation()
  const navigate = useNavigate()
  const active = IS_PREVIEW && !!ADMIN_ORIGIN

  useEffect(() => {
    if (!active) return
    document.body.classList.add('sj-preview')
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== ADMIN_ORIGIN || e.source !== window.parent) return
      const d = e.data
      if (!d || typeof d !== 'object') return
      if (d.type === 'sj-preview' && typeof d.key === 'string' && d.value && typeof d.value === 'object') { applyOverride(d.key, d.value); rerender() }
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
