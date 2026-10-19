// ข้อมูลทั้งเว็บอยู่ที่ไฟล์นี้ — เปลี่ยนชื่อแบรนด์ เบอร์โทร สินค้า ข่าว ได้ที่นี่ที่เดียว
// (ข้อความทั้งหมดเป็นตัวอย่างที่เขียนใหม่ ไม่ได้คัดลอกจากเว็บใด ให้แทนด้วยข้อมูลจริงของธุรกิจ)
import { Calculator, Users, ShoppingCart, Truck, Smartphone, type LucideIcon } from 'lucide-react'

export const BRAND = {
  name: 'SoftBridge',
  tagline: 'ซอฟต์แวร์ที่อยู่เบื้องหลังความสำเร็จของธุรกิจคุณ',
  company: 'บริษัท ซอฟต์บริดจ์ จำกัด',
  address: '123 อาคารตัวอย่าง ชั้น 5 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110',
  taxId: '0-1055-00000-00-0',
  salesPhone: '02-123-4567',
  servicePhone: '02-123-4568',
  email: 'hello@softbridge.example',
  line: '@softbridge',
  hours: 'จันทร์–ศุกร์ 08:30–17:30 น.',
}

// เมนู: to ว่าง = หัวข้อที่กดไม่ได้ (เปิดเมนูย่อยอย่างเดียว) · to ขึ้นต้น https:// = ลิงก์ออกไปเว็บอื่น (เปิดแท็บใหม่)
// children ซ้อนได้ 2 ชั้น (ชั้นที่ 2 แสดงเป็นเมนูแตกออกด้านข้าง)
export interface NavLeaf { label: string; to: string }
export interface NavChild extends NavLeaf { children?: NavLeaf[] }
export interface NavItem extends NavLeaf { children?: NavChild[] }

export interface Product {
  slug: string; name: string; short: string; summary: string; icon: LucideIcon; color: string
  features: string[]; modules: { title: string; text: string }[]; forWho: string
}

export const PRODUCTS: Product[] = [
  {
    slug: 'erp', name: 'ERP & บัญชี', short: 'บัญชี ซื้อ-ขาย สต็อก ในระบบเดียว', icon: Calculator, color: '#0E7C86',
    summary: 'ระบบบริหารธุรกิจที่เชื่อมงานขาย ซื้อ คลังสินค้า และบัญชีเข้าด้วยกัน ตัวเลขตรงกันทุกแผนก ปิดงบได้เร็วขึ้น',
    forWho: 'ธุรกิจค้าปลีก ค้าส่ง และผลิตขนาดเล็ก–กลาง ที่ต้องการเลิกกรอกข้อมูลซ้ำหลายระบบ',
    features: ['ออกใบเสนอราคา ใบสั่งขาย ใบกำกับภาษี ครบในที่เดียว', 'ควบคุมสต็อกหลายคลัง ตรวจนับและโอนย้ายได้', 'บัญชีแยกประเภท ภาษีซื้อ-ขาย และงบการเงินอัตโนมัติ', 'รายงานผู้บริหารดูผ่านมือถือได้'],
    modules: [{ title: 'ขาย', text: 'ใบเสนอราคา ใบสั่งขาย ใบแจ้งหนี้ รับชำระ ติดตามลูกหนี้' }, { title: 'ซื้อ', text: 'ใบสั่งซื้อ รับสินค้า เจ้าหนี้ ตรวจสอบราคาตามสัญญา' }, { title: 'คลังสินค้า', text: 'สต็อกหลายคลัง ล็อต/ซีเรียล จุดสั่งซื้อซ้ำ' }, { title: 'บัญชี', text: 'สมุดรายวัน งบทดลอง ภาษีมูลค่าเพิ่ม ภ.ง.ด. สินทรัพย์ถาวร' }],
  },
  {
    slug: 'hrm-payroll', name: 'HRM & เงินเดือน', short: 'คำนวณเงินเดือน ประกันสังคม ภาษี', icon: Users, color: '#2F5DD0',
    summary: 'จัดการข้อมูลพนักงาน เวลาทำงาน การลา และคำนวณเงินเดือนตามกฎหมายแรงงาน ส่งออกแบบฟอร์มราชการได้ทันที',
    forWho: 'ฝ่ายบุคคลที่ต้องดูแลพนักงานหลายสาขา และอยากลดเวลาปิดเงินเดือนจากหลายวันเหลือไม่กี่ชั่วโมง',
    features: ['คำนวณเงินเดือน OT โบนัส และหักภาษี ณ ที่จ่าย', 'ส่งออกแบบฟอร์มประกันสังคมและ ภ.ง.ด.1', 'เชื่อมเครื่องสแกนเวลาและแอปเช็คอิน', 'สลิปเงินเดือนออนไลน์ พนักงานดูได้เอง'],
    modules: [{ title: 'ข้อมูลพนักงาน', text: 'ประวัติ สัญญา เอกสาร และโครงสร้างองค์กร' }, { title: 'เวลาและการลา', text: 'กะทำงาน ลา OT เชื่อมเครื่องสแกน' }, { title: 'เงินเดือน', text: 'รายได้ รายหัก ภาษี ประกันสังคม กองทุน' }, { title: 'สลิปและรายงาน', text: 'สลิปออนไลน์ รายงานต้นทุนบุคลากร' }],
  },
  {
    slug: 'pos', name: 'POS หน้าร้าน', short: 'ขายหน้าร้านเร็ว ตัดสต็อกทันที', icon: ShoppingCart, color: '#E0641F',
    summary: 'ระบบขายหน้าร้านที่ใช้งานง่ายสำหรับแคชเชียร์ รองรับบาร์โค้ด โปรโมชัน สมาชิก และปิดรอบขายพร้อมสรุปยอด',
    forWho: 'ร้านค้าปลีก ร้านอาหาร และร้านที่มีหลายสาขาที่ต้องการดูยอดรวมแบบเรียลไทม์',
    features: ['หน้าจอขายใช้ได้ทั้งแท็บเล็ตและคอมพิวเตอร์', 'โปรโมชันและแต้มสะสมสมาชิก', 'ใบกำกับภาษีอย่างย่อและเครื่องพิมพ์ใบเสร็จ', 'ซิงก์ยอดขายเข้าระบบบัญชีอัตโนมัติ'],
    modules: [{ title: 'หน้าจอขาย', text: 'สแกนบาร์โค้ด ส่วนลด หลายช่องทางชำระเงิน' }, { title: 'สมาชิกและโปรโมชัน', text: 'สะสมแต้ม คูปอง ราคาตามระดับสมาชิก' }, { title: 'ปิดรอบ', text: 'สรุปเงินสด/โอน/บัตร ตรวจส่วนต่าง' }, { title: 'หลายสาขา', text: 'สต็อกและยอดขายรวมศูนย์' }],
  },
  {
    slug: 'van-sales', name: 'ขายหน้ารถ (Van Sales)', short: 'ขายนอกสถานที่ ผ่านมือถือ', icon: Truck, color: '#7A4DCB',
    summary: 'ให้พนักงานขายออกบิล เก็บเงิน และเช็คสต็อกบนรถผ่านมือถือ ข้อมูลซิงก์กลับสำนักงานเมื่อมีสัญญาณ',
    forWho: 'ธุรกิจจัดจำหน่ายที่มีรถขายสินค้าเดินสายและต้องการควบคุมสต็อกบนรถ',
    features: ['ใช้งานออฟไลน์ได้ ซิงก์เมื่อมีสัญญาณ', 'ออกบิลและพิมพ์ใบเสร็จบนเครื่องพิมพ์พกพา', 'เส้นทางขายและเช็คอินหน้าร้านค้า', 'เบิก-คืนสินค้าขึ้นรถและปิดยอดรายวัน'],
    modules: [{ title: 'เส้นทางขาย', text: 'จัดลำดับร้านค้าและบันทึกการเยี่ยม' }, { title: 'ออกบิลบนมือถือ', text: 'ขายเงินสด/เครดิต พิมพ์ใบเสร็จทันที' }, { title: 'สต็อกบนรถ', text: 'เบิกขึ้นรถ ตรวจนับ คืนสินค้า' }, { title: 'สรุปรายวัน', text: 'ปิดยอดเงินสดและส่งข้อมูลเข้าสำนักงาน' }],
  },
  {
    slug: 'e-hrm', name: 'e-HRM แอปพนักงาน', short: 'เช็คอิน ลา สลิปเงินเดือน ผ่านมือถือ', icon: Smartphone, color: '#0F8F4F',
    summary: 'แอปสำหรับพนักงานทุกคน ลงเวลา ยื่นลา ขอเอกสาร และดูสลิปเงินเดือนผ่านมือถือ หัวหน้าอนุมัติได้ทุกที่',
    forWho: 'องค์กรที่มีพนักงานหน้างานหรือหลายสาขา และต้องการลดงานเอกสารของฝ่ายบุคคล',
    features: ['เช็คอินด้วยพิกัด GPS หรือ QR', 'ยื่นลา/OT พร้อมลำดับอนุมัติหลายขั้น', 'แจ้งเตือนผ่านไลน์', 'ขอหนังสือรับรองและดูสลิปออนไลน์'],
    modules: [{ title: 'ลงเวลา', text: 'GPS QR และกำหนดรัศมีสาขา' }, { title: 'ลา/OT', text: 'ยื่น อนุมัติ ติดตามสถานะ' }, { title: 'เอกสาร', text: 'ขอหนังสือรับรอง ดูสลิป' }, { title: 'แจ้งเตือน', text: 'ข่าวสารองค์กรและแจ้งเตือนอนุมัติ' }],
  },
]

export interface Article { slug: string; title: string; category: 'ERP' | 'POS' | 'HRM' | 'ข่าวสาร'; date: string; excerpt: string; body: string[] }

export const ARTICLES: Article[] = [
  { slug: 'month-end-close-checklist', title: 'เช็กลิสต์ปิดงบสิ้นเดือนให้เสร็จใน 3 วัน', category: 'ERP', date: '2569-10-10', excerpt: 'ลำดับงานที่ฝ่ายบัญชีควรทำก่อน-หลัง เพื่อไม่ต้องย้อนแก้ตัวเลขตอนใกล้ส่ง', body: ['การปิดงบที่ช้ามักไม่ได้เกิดจากจำนวนรายการ แต่เกิดจากข้อมูลต้นทางที่ยังไม่นิ่ง เช่น ใบส่งของที่ยังไม่ออกบิล หรือสต็อกที่ยังไม่ตรวจนับ', 'เริ่มจากล็อกช่วงบัญชีฝั่งขายและซื้อก่อน แล้วจึงกระทบยอดธนาคาร ตามด้วยปรับปรุงรายการค้างรับค้างจ่าย และตรวจรายงานงบทดลองอีกรอบ', 'ระบบ ERP ที่ผูกงานขาย ซื้อ และคลังเข้ากับบัญชีโดยตรง ช่วยตัดขั้นตอนคีย์ซ้ำ และทำให้ตัวเลขที่ผู้บริหารเห็นตรงกับที่บัญชีปิด'] },
  { slug: 'pos-promotion-tips', title: '5 วิธีตั้งโปรโมชันหน้าร้านโดยไม่ขาดทุน', category: 'POS', date: '2569-10-05', excerpt: 'ตั้งส่วนลดอย่างไรให้ยอดขายเพิ่มแต่ยังรักษากำไรขั้นต้น', body: ['โปรโมชันที่ดีควรเริ่มจากต้นทุนจริงของสินค้า ไม่ใช่ราคาป้าย ตรวจกำไรขั้นต้นหลังหักส่วนลดก่อนเปิดใช้เสมอ', 'ใช้ระบบสมาชิกเพื่อให้ส่วนลดเฉพาะกลุ่ม แทนการลดทั้งร้าน และกำหนดวันหมดอายุของโปรโมชันทุกครั้ง', 'ดูรายงานยอดขายตามโปรโมชันรายสัปดาห์ แล้วยกเลิกรายการที่ไม่ทำให้ปริมาณขายเพิ่มจริง'] },
  { slug: 'payroll-law-update', title: 'สรุปสิ่งที่ฝ่ายบุคคลต้องเช็กก่อนปิดเงินเดือนปลายปี', category: 'HRM', date: '2569-09-28', excerpt: 'รายการค่าลดหย่อน ภาษี และประกันสังคมที่มักตกหล่นเมื่อใกล้สิ้นปี', body: ['ปลายปีเป็นช่วงที่ข้อมูลพนักงานเปลี่ยนมากที่สุด ทั้งการปรับเงินเดือน โบนัส และการลาออก ควรตรวจฐานข้อมูลให้เป็นปัจจุบันก่อนคำนวณรอบสุดท้าย', 'ตรวจว่าฐานเงินสมทบประกันสังคมและภาษีหัก ณ ที่จ่ายสอดคล้องกับประกาศล่าสุด และเก็บหลักฐานการเปลี่ยนแปลงไว้ทุกครั้ง', 'หากใช้ระบบเงินเดือนที่ส่งออกแบบฟอร์มราชการได้โดยตรง จะลดความเสี่ยงจากการกรอกตัวเลขซ้ำ'] },
  { slug: 'new-mobile-release', title: 'อัปเดตแอปขายหน้ารถ: ใช้งานออฟไลน์ได้เสถียรขึ้น', category: 'ข่าวสาร', date: '2569-09-20', excerpt: 'ปรับปรุงการซิงก์ข้อมูลเมื่อกลับมามีสัญญาณ และเพิ่มการพิมพ์ใบเสร็จผ่านบลูทูธ', body: ['เวอร์ชันล่าสุดปรับกลไกซิงก์ให้ส่งข้อมูลเป็นชุดเล็กๆ ลดโอกาสค้างเมื่อสัญญาณไม่เสถียร', 'เพิ่มรองรับเครื่องพิมพ์ใบเสร็จพกพาเพิ่มอีกหลายรุ่น และปรับหน้าจอสรุปยอดรายวันให้เห็นเงินสดและเครดิตแยกกัน', 'ลูกค้าที่ใช้งานอยู่สามารถอัปเดตได้ฟรีตามสัญญาบริการ'] },
  { slug: 'stock-count-tips', title: 'ตรวจนับสต็อกอย่างไรไม่ให้ร้านหยุดขาย', category: 'ERP', date: '2569-09-12', excerpt: 'แบ่งโซนนับ-นับสลับรอบ และใช้ส่วนต่างเป็นสัญญาณหาจุดรั่ว', body: ['การนับทั้งคลังพร้อมกันทำให้ต้องปิดร้าน ลองแบ่งเป็นโซนและนับต่อเนื่องตามรอบสัปดาห์ แทนการนับใหญ่ปีละครั้ง', 'เมื่อพบส่วนต่าง อย่าปรับยอดทันที ให้ย้อนดูเอกสารรับ-จ่ายของสินค้านั้นก่อน เพราะส่วนใหญ่มาจากการคีย์ผิดหน่วย', 'ระบบที่บันทึกผู้ทำรายการและเวลาจะช่วยไล่หาต้นเหตุได้เร็วขึ้นมาก'] },
]

export const SERVICES = [
  { title: 'ติดตั้งและตั้งค่าระบบ', text: 'ทีมงานเข้าติดตั้ง วางผังบัญชีและโครงสร้างองค์กร ย้ายข้อมูลเดิมเข้าระบบใหม่' },
  { title: 'ดูแลหลังการขาย', text: 'ศูนย์รับแจ้งปัญหา เปิดตั๋วติดตามสถานะ และช่องทางไลน์สำหรับถามด่วน' },
  { title: 'ปรับแต่งรายงาน/แบบฟอร์ม', text: 'ออกแบบใบกำกับภาษี ใบเสนอราคา และรายงานเฉพาะธุรกิจของคุณ' },
  { title: 'เชื่อมต่อระบบอื่น', text: 'เชื่อมเครื่องสแกนเวลา ช่องทางขายออนไลน์ และธนาคาร ผ่าน API' },
]

export const COURSES = [
  { id: 'erp-basic', title: 'ERP & บัญชี สำหรับผู้เริ่มต้น', level: 'พื้นฐาน', hours: 6, price: 'ฟรีสำหรับลูกค้า', topics: ['ภาพรวมระบบและการตั้งค่า', 'ขาย-ซื้อ-สต็อก', 'งบทดลองเบื้องต้น'] },
  { id: 'erp-advanced', title: 'ปิดงบและภาษีด้วยระบบบัญชี', level: 'ต่อยอด', hours: 8, price: '2,500 บาท', topics: ['กระทบยอดธนาคาร', 'ภาษีมูลค่าเพิ่ม', 'ปิดงวดและงบการเงิน'] },
  { id: 'hrm-payroll', title: 'HRM & เงินเดือน ฉบับฝ่ายบุคคล', level: 'พื้นฐาน', hours: 6, price: 'ฟรีสำหรับลูกค้า', topics: ['ข้อมูลพนักงาน', 'คำนวณเงินเดือนและ OT', 'แบบฟอร์มประกันสังคม/ภาษี'] },
  { id: 'e-learning', title: 'e-Learning ระบบ POS สำหรับแคชเชียร์', level: 'ออนไลน์', hours: 2, price: 'ฟรี', topics: ['ขายและรับชำระ', 'ปิดรอบ', 'แก้ปัญหาเบื้องต้น'] },
]

// ธุรกิจในเครือเป็นเว็บไซต์แยก — ใส่ลิงก์จริงที่หน้าแอดมิน (เมนู) แทนลิงก์ตัวอย่างนี้
export const NAV: NavItem[] = [
  { label: 'ธุรกิจในเครือ', to: '', children: [
    { label: 'GrowStore', to: 'https://growstore.example' },
    { label: 'Yoonai', to: 'https://yoonai.example' },
    { label: 'Weajer', to: 'https://weajer.example' },
    { label: 'Workpath', to: 'https://workpath.example' },
  ] },
  { label: 'สินค้า', to: '/products', children: PRODUCTS.map(p => ({ label: p.name, to: `/products/${p.slug}` })) },
  { label: 'บริการ', to: '', children: [{ label: 'ติดตั้งและดูแลหลังการขาย', to: '/services' }, { label: 'หลักสูตรอบรม', to: '/training' }] },
  { label: 'ประชาสัมพันธ์', to: '', children: [
    { label: 'เกี่ยวกับเรา', to: '/about' }, { label: 'ลูกค้าของเรา', to: '/customers' },
    { label: 'กิจกรรมและสัมมนา', to: '/#events' }, { label: 'ข่าวและสื่อ', to: '/#news' }, { label: 'ศูนย์ความรู้', to: '/knowledge' },
  ] },
  { label: 'ติดต่อเรา', to: '', children: [{ label: 'ติดต่อฝ่ายต่างๆ', to: '/contact' }, { label: 'ขอเดโม/ทดลองใช้', to: '/contact' }, { label: 'ร่วมงานกับเรา', to: '/contact' }] },
]

// ช่องทางโซเชียลบน topbar — ใส่ลิงก์จริงที่ href
export const SOCIAL = [
  { label: 'Facebook', href: 'https://facebook.com/' },
  { label: 'YouTube', href: 'https://youtube.com/' },
  { label: 'LINE', href: 'https://line.me/' },
  { label: 'Instagram', href: 'https://instagram.com/' },
]

// วิดีโอแนะนำระบบ — ใส่ youtubeId (ส่วนท้ายของลิงก์ YouTube) เพื่อให้กดเล่นได้ ถ้าเว้นว่างจะแสดงป้าย "เร็วๆ นี้"
export interface Video { title: string; text: string; duration: string; product: string; youtubeId: string; file?: string; thumb?: string }
export const VIDEOS: Video[] = [
  { title: 'ภาพรวม ERP & บัญชี ใน 5 นาที', text: 'ดูการไหลของข้อมูลจากใบเสนอราคาถึงงบการเงิน', duration: '5:12', product: 'erp', youtubeId: '' },
  { title: 'ปิดเงินเดือนด้วย HRM', text: 'ตั้งค่าเงินเดือน OT และส่งออกแบบฟอร์มประกันสังคม', duration: '7:40', product: 'hrm-payroll', youtubeId: '' },
  { title: 'POS: เปิดรอบขายถึงปิดรอบ', text: 'ขั้นตอนที่แคชเชียร์ต้องรู้ ตั้งแต่เปิดกะถึงสรุปยอด', duration: '4:30', product: 'pos', youtubeId: '' },
  { title: 'Van Sales: ขายหน้ารถแบบออฟไลน์', text: 'ออกบิลและซิงก์ข้อมูลกลับสำนักงานเมื่อมีสัญญาณ', duration: '6:05', product: 'van-sales', youtubeId: '' },
  { title: 'e-HRM: เช็คอินและยื่นลาผ่านมือถือ', text: 'ประสบการณ์ใช้งานของพนักงานและหัวหน้า', duration: '3:48', product: 'e-hrm', youtubeId: '' },
  { title: 'ย้ายข้อมูลจากระบบเดิม', text: 'ขั้นตอนนำเข้าข้อมูลลูกค้า สินค้า และยอดยกมา', duration: '8:20', product: 'erp', youtubeId: '' },
]

// พื้นที่โฆษณา/โปรโมชัน — ใส่ image (ไฟล์ใน public/ เช่น '/img/ad1.jpg') เพื่อใช้ภาพจริง; ไม่ใส่จะใช้สีไล่เฉด
export interface Ad { title: string; text: string; cta: string; to: string; color: string; image?: string }
export const ADS: Ad[] = [
  { title: 'ทดลองใช้ ERP ฟรี 30 วัน', text: 'พร้อมทีมช่วยตั้งค่าเริ่มต้นให้ ไม่ต้องใช้บัตรเครดิต', cta: 'ขอทดลองใช้', to: '/contact', color: '#0E7C86' },
  { title: 'อบรมฟรีสำหรับลูกค้าใหม่', text: 'หลักสูตรพื้นฐาน ERP และ HRM สำหรับทีมบัญชีและฝ่ายบุคคล', cta: 'ดูหลักสูตร', to: '/training', color: '#2F5DD0' },
  { title: 'แพ็กเกจ POS + สต็อก สำหรับร้านหลายสาขา', text: 'รวมอุปกรณ์และการติดตั้ง สอบถามราคาพิเศษประจำไตรมาส', cta: 'ขอใบเสนอราคา', to: '/contact', color: '#E0641F' },
]

export const COMPANY = {
  heading: 'เราช่วยธุรกิจไทยทำงานด้วยข้อมูลชุดเดียว',
  text: ['เราพัฒนาซอฟต์แวร์บริหารธุรกิจสำหรับงานบัญชี การขาย และบุคคล โดยเน้นให้ใช้งานง่ายและเชื่อมข้อมูลกันตั้งแต่หน้าร้านถึงงบการเงิน', 'ทีมของเรามีทั้งผู้พัฒนาและที่ปรึกษาที่เคยทำงานจริงในธุรกิจค้าปลีก จัดจำหน่าย และบริการ จึงเข้าใจปัญหาหน้างานของลูกค้า'],
  stats: [{ n: '15+', label: 'ปีที่ให้บริการ' }, { n: '2,000+', label: 'ธุรกิจที่ไว้วางใจ' }, { n: '60+', label: 'ทีมงานและที่ปรึกษา' }, { n: '24 ชม.', label: 'ตอบรับแจ้งปัญหา' }],
  image: undefined as string | undefined,
}

export interface Customer { name: string; logo?: string; place?: string; text?: string; image?: string; color?: string }
// ข้อมูลตัวอย่าง — แทนด้วยลูกค้าจริงที่อนุญาตให้เผยแพร่ (ใส่ image/place/text เพื่อให้แสดงในหน้า "ลูกค้าของเรา")
const CUSTOMER_SEED: [string, string, string, string][] = [
  ['ร้านสยามมาร์ท', 'จ.นครปฐม', 'ร้านค้าปลีกที่ใช้ POS และระบบสต็อกควบคุมสินค้าหลายคลัง', '#0E7C86'],
  ['บจก. นอร์ทฟู้ดส์', 'จ.เชียงใหม่', 'ผู้จัดจำหน่ายอาหารที่ใช้ ERP และขายหน้ารถ', '#E0641F'],
  ['ตะวันออกกลุ่มค้าปลีก', 'จ.ชลบุรี', 'ร้านค้าส่งหลายสาขาที่ดูยอดขายรวมแบบเรียลไทม์', '#2F5DD0'],
  ['ศรีสุขเวชภัณฑ์', 'จ.ขอนแก่น', 'ร้านเวชภัณฑ์ที่คุมสต็อกและวันหมดอายุสินค้า', '#0F8F4F'],
  ['พรีเมียร์โลจิสติกส์', 'กรุงเทพฯ', 'ผู้ให้บริการขนส่งที่ใช้ ERP และ HRM ร่วมกัน', '#7A4DCB'],
  ['บ้านสวนกาแฟ', 'จ.เชียงราย', 'ร้านกาแฟหลายสาขาที่ใช้ POS และแต้มสมาชิก', '#0F1F3D'],
]
export const CUSTOMERS: Customer[] = [
  ...CUSTOMER_SEED.map(([name, place, text, color]) => ({ name, place, text, color })),
  ...['ไทยเทรดดิ้ง', 'เมโทรออโต้พาร์ท', 'ลานนาฟาร์มา', 'ใต้ฟ้าเบเกอรี่', 'กรีนวัลเลย์', 'อินดัสเทรียลซัพพลาย'].map(name => ({ name })),
]

// กิจกรรม/งานสัมมนา — image เหมือน ADS
export interface EventItem { title: string; date: string; place: string; text: string; image?: string; color: string }
export const EVENTS: EventItem[] = [
  { title: 'สัมมนา: ปิดงบไว ไม่ต้องอยู่ดึก', date: '2569-11-14', place: 'โรงแรมตัวอย่าง กรุงเทพฯ', text: 'เทคนิคจัดลำดับงานปิดงบสำหรับทีมบัญชี พร้อมสาธิตระบบจริง', color: '#0E7C86' },
  { title: 'Workshop: ตั้งโปรโมชัน POS ให้กำไรดี', date: '2569-11-28', place: 'ออนไลน์ (Zoom)', text: 'ลงมือตั้งโปรโมชันและดูรายงานผลร่วมกับวิทยากร', color: '#E0641F' },
  { title: 'เปิดตัว e-HRM เวอร์ชันใหม่', date: '2569-12-05', place: 'สำนักงานใหญ่ กรุงเทพฯ', text: 'แนะนำฟีเจอร์ลำดับอนุมัติหลายขั้นและแจ้งเตือนผ่านไลน์', color: '#0F8F4F' },
]

// ข่าวและสื่อ — ข่าวประชาสัมพันธ์/การลงสื่อ
export interface NewsItem { title: string; outlet: string; date: string; text: string; image?: string; color: string }
export const NEWS: NewsItem[] = [
  { title: 'ซอฟต์บริดจ์ขยายทีมที่ปรึกษา รองรับลูกค้า SME ทั่วประเทศ', outlet: 'ข่าวประชาสัมพันธ์', date: '2569-10-08', text: 'เพิ่มทีมที่ปรึกษาประจำภูมิภาค ลดเวลารอเข้าติดตั้งเหลือไม่เกิน 7 วันทำการ', color: '#0F1F3D' },
  { title: 'ผู้บริหารให้สัมภาษณ์: ทำไม SME ควรเลิกใช้สเปรดชีตทำบัญชี', outlet: 'สื่อธุรกิจ (ตัวอย่าง)', date: '2569-09-22', text: 'มุมมองต่อความเสี่ยงของการกรอกข้อมูลซ้ำ และแนวทางย้ายขึ้นระบบอย่างค่อยเป็นค่อยไป', color: '#2F5DD0' },
  { title: 'รับรางวัลบริการหลังการขายยอดเยี่ยมประจำปี', outlet: 'ข่าวประชาสัมพันธ์', date: '2569-08-30', text: 'จากคะแนนความพึงพอใจของลูกค้าด้านความเร็วในการตอบรับและแก้ปัญหา', color: '#7A4DCB' },
]


// สไลด์ Hero หน้าแรก — image (ไม่บังคับ) จะแสดงเป็นภาพพื้นหลัง/ภาพประกอบแทนไอคอน
export interface HeroSlide {
  tag: string; title: string; lead: string; color: string; image?: string
  primaryLabel: string; primaryTo: string; secondaryLabel: string; secondaryTo: string
  chip1: string; chip2: string
}
export const HERO: HeroSlide[] = [
  { tag: 'ERP & บัญชี', title: 'ปิดบัญชีไวขึ้น เพราะทุกแผนกใช้ตัวเลขชุดเดียวกัน', lead: 'ERP ที่เชื่อมงานขาย ซื้อ คลัง และบัญชีไว้ด้วยกัน', color: '#0E7C86', primaryLabel: 'ดูรายละเอียด', primaryTo: '/products/erp', secondaryLabel: 'ขอใบเสนอราคา', secondaryTo: '/contact', chip1: 'ใบกำกับภาษี', chip2: 'สต็อกหลายคลัง' },
  { tag: 'HRM & เงินเดือน', title: 'ปิดเงินเดือนจากหลายวัน เหลือไม่กี่ชั่วโมง', lead: 'คำนวณ OT ภาษี และประกันสังคม พร้อมส่งออกแบบฟอร์มราชการ', color: '#2F5DD0', primaryLabel: 'ดูรายละเอียด', primaryTo: '/products/hrm-payroll', secondaryLabel: 'ขอใบเสนอราคา', secondaryTo: '/contact', chip1: 'สลิปออนไลน์', chip2: 'ภ.ง.ด.1' },
  { tag: 'POS หน้าร้าน', title: 'ขายหน้าร้านลื่น แคชเชียร์เรียนรู้ได้ในวันเดียว', lead: 'POS ที่ตัดสต็อกทันทีและสรุปยอดทุกสาขาแบบเรียลไทม์', color: '#E0641F', primaryLabel: 'ดูรายละเอียด', primaryTo: '/products/pos', secondaryLabel: 'ขอใบเสนอราคา', secondaryTo: '/contact', chip1: 'โปรโมชัน', chip2: 'แต้มสมาชิก' },
  { tag: 'ขายหน้ารถ (Van Sales)', title: 'ขายหน้ารถได้แม้ไม่มีสัญญาณ', lead: 'ออกบิลบนมือถือ ซิงก์กลับสำนักงานอัตโนมัติ ควบคุมสต็อกบนรถ', color: '#7A4DCB', primaryLabel: 'ดูรายละเอียด', primaryTo: '/products/van-sales', secondaryLabel: 'ขอใบเสนอราคา', secondaryTo: '/contact', chip1: 'ออฟไลน์', chip2: 'พิมพ์ใบเสร็จ' },
]

// หัวข้อและคำอธิบายของแต่ละส่วนในหน้าแรก
export const HOME = {
  programsTitle: 'โปรแกรมบริหารสำเร็จรูป SoftBridge',
  videosTitle: 'วิดีโอแนะนำระบบ', videosText: 'ดูการใช้งานจริงของแต่ละระบบ ก่อนตัดสินใจ',
  companyTag: 'Our Company',
  customersTitle: 'ลูกค้าของเรา', customersText: 'ธุรกิจหลากหลายประเภทที่ไว้วางใจให้เราดูแลระบบ',
  eventsTitle: 'กิจกรรมและงานสัมมนา', eventsText: 'เข้าร่วมเพื่อเรียนรู้การใช้ระบบและพบทีมงานของเรา',
  newsTitle: 'ข่าวและสื่อ', newsText: 'ข่าวประชาสัมพันธ์และบทสัมภาษณ์ล่าสุด',
  contactTitle: 'คุยกับทีมงานของเรา', contactText: 'บอกประเภทธุรกิจและจำนวนสาขา เราจะแนะนำชุดระบบและราคาที่เหมาะสมภายใน 1 วันทำการ',
}

// ---- ระบบแอดมิน: ค่าที่แอดมินแก้ไขได้ เก็บที่ server และถูกนำมาทับค่าเริ่มต้นข้างบนตอนเปิดเว็บ ----
// แก้ค่าใน object/array เดิมโดยตรง (ไม่สร้างใหม่) เพื่อให้ทุกหน้าที่ import อยู่แล้วเห็นค่าใหม่
export const EDITABLE: Record<string, unknown> = { NAV, BRAND, SOCIAL, HERO, HOME, VIDEOS, ADS, COMPANY, CUSTOMERS, EVENTS, NEWS, PRODUCTS, ARTICLES, SERVICES, COURSES }

let navCustom = false
export function applyOverride(key: string, value: unknown) {
  if (key === 'NAV') navCustom = true
  const target = EDITABLE[key]
  if (target === undefined) return
  if (key === 'PRODUCTS' && Array.isArray(value)) {
    // สินค้าจับคู่ด้วย slug และคงไอคอนเดิมไว้ (ไอคอนเป็นคอมโพเนนต์ เก็บเป็น JSON ไม่ได้)
    for (const v of value as Partial<Product>[]) {
      const p = PRODUCTS.find(x => x.slug === v.slug)
      if (p) Object.assign(p, { ...v, icon: p.icon, slug: p.slug })
    }
  } else if (Array.isArray(target) && Array.isArray(value)) {
    target.splice(0, target.length, ...value)
  } else if (target && typeof target === 'object' && value && typeof value === 'object' && !Array.isArray(value)) {
    Object.assign(target, value)
  }
  if (key === 'PRODUCTS' && !navCustom) {
    const nav = NAV.find(n => n.to === '/products')
    if (nav) nav.children = PRODUCTS.map(p => ({ label: p.name, to: `/products/${p.slug}` }))
  }
}

export function applyOverrides(all: Record<string, unknown>) {
  navCustom = 'NAV' in all
  // NAV ใช้ทีหลังสุด เพื่อให้เมนูที่แอดมินจัดเองไม่ถูกสร้างทับจากรายชื่อสินค้า
  for (const [k, v] of Object.entries(all)) if (k !== 'NAV') applyOverride(k, v)
  if ('NAV' in all) applyOverride('NAV', all.NAV)
}

// กันลิงก์/รูปที่แอดมินกรอกมาไม่ปลอดภัย (javascript: ฯลฯ) — ใช้กับทุก href และ url ที่มาจากข้อมูล
export const safeUrl = (u?: string) => (u && /^(\/(?!\/)|https?:\/\/|tel:|mailto:)/.test(u) ? u : undefined)
export const cssUrl = (u?: string) => { const s = safeUrl(u); return s ? `url("${encodeURI(s).replace(/"/g, '%22')}")` : undefined }

export const thaiDate =(iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  const M = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
  return `${d} ${M[m - 1]} ${y}`
}
