// หน้าเว็บถูกฝังใน iframe ของหน้าแอดมินในโหมดตัวอย่าง (?sj-preview=1) หรือไม่ — อ่านครั้งเดียวตอนโหลด
// ในโหมดตัวอย่าง สไลด์/แบนเนอร์จะไม่เลื่อนเอง เพื่อให้ผู้ดูแลแก้ไขส่วนที่กำลังเห็นอยู่ได้โดยไม่เปลี่ยนไปเอง
export const IS_PREVIEW = typeof window !== 'undefined' && window.parent !== window && new URLSearchParams(window.location.search).has('sj-preview')
