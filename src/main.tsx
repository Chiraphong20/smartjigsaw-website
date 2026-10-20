import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { API_BASE, applyOverrides } from './site'
import './styles.css'

// โหลดเนื้อหาที่แอดมินแก้จาก backend มาทับค่าเริ่มต้นก่อนแสดงผล — ถ้า backend ไม่ตอบ ใช้ค่าเริ่มต้นใน site.ts
async function loadContent() {
  const ctl = new AbortController()
  const timer = setTimeout(() => ctl.abort(), 4000)
  try {
    const r = await fetch(`${API_BASE}/api/content`, { signal: ctl.signal })
    const ct = r.headers.get('content-type') || ''
    if (r.ok && ct.includes('application/json')) applyOverrides(await r.json())
  } catch { /* ใช้ค่าเริ่มต้น */ } finally { clearTimeout(timer) }
}

loadContent().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  )
})
