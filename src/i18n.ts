// ภาษาอังกฤษของเว็บ — พจนานุกรม "ข้อความไทยเดิม → อังกฤษ" ใช้ทั้งกับข้อความในหน้า (ผ่าน t()) และเนื้อหาใน site.ts (แปลทับในที่เดิมตอนสลับภาษา)
// ข้อความที่แอดมินแก้เป็นประโยคใหม่แล้วไม่มีในพจนานุกรม จะแสดงเป็นภาษาไทยเดิม — เพิ่มคำแปลได้ที่แอดมิน หมวด "คำแปลภาษาอังกฤษ"
import { EDITABLE, TRANSLATIONS } from './site'

export type Lang = 'th' | 'en'
const KEY = 'sj-lang'
let current: Lang = 'th'

const EN: Record<string, string> = {
  // ----- ข้อความในหน้า (UI) -----
  'หน้าแรก': 'Home',
  'ลูกค้าของเรา': 'Our Customers',
  'กำลังรวบรวมรายชื่อลูกค้า — ติดตามได้เร็วๆ นี้': 'We are compiling our customer list — coming soon.',
  'เยี่ยมชมเว็บไซต์ของร้าน →': 'Visit the store website →',
  'ขอใบเสนอราคา': 'Request a Quote',
  'รู้จักเราเพิ่มเติม': 'Learn more about us',
  'ทีมงานของเรา': 'Our team',
  'ดูร้านลูกค้าทั้งหมด →': 'View all customers →',
  'ดูบทความทั้งหมด': 'View all articles',
  'ขอคำปรึกษา': 'Get a Consultation',
  'โทร': 'Call',
  'ทั้งหมด': 'All',
  'ข่าวสาร': 'News',
  'ศูนย์ความรู้': 'Knowledge Center',
  'บทความ เทคนิค และข่าวสารจากทีมงาน': 'Articles, tips and news from our team',
  'หมวดบทความ': 'Article categories',
  'ผลการค้นหา': 'Search results for',
  'รายการ': 'results',
  'ไม่พบบทความที่ตรงกับเงื่อนไข ลองเปลี่ยนหมวดหรือคำค้นหา': 'No articles match your filters. Try another category or search term.',
  'ปรึกษาทีมงานเรื่องนี้ →': 'Talk to our team about this →',
  'บทความอื่น': 'More articles',
  'ไม่พบหน้าที่ต้องการ': 'Page not found',
  'ลิงก์อาจผิดหรือหน้านี้ถูกย้ายแล้ว': 'The link may be wrong or the page has moved.',
  'กลับหน้าแรก': 'Back to Home',
  'วิธีทำงานของเรา': 'How We Work',
  'วิธีทำงาน': 'How We Work',
  'ค่านิยม 4 ข้อที่เรายึดถือในการทำงานกับลูกค้า': 'The four values we hold to when working with our customers',
  'อยากคุยกับทีมงาน?': 'Want to talk to our team?',
  'ไลน์': 'LINE',
  'ติดต่อเรา': 'Contact Us',
  'ติดต่อ': 'Contact',
  'หลักสูตรอบรม': 'Training Courses',
  'อบรม': 'Training',
  'เรียนรู้การใช้งานระบบกับวิทยากรที่ใช้งานจริง ทั้งห้องเรียนและ e-Learning': 'Learn to use our systems from instructors who use them in real work — in the classroom and via e-Learning',
  'กำลังจัดทำหลักสูตร — ติดตามได้เร็วๆ นี้ หรือ': 'Courses are being prepared — coming soon, or ',
  'ติดต่อทีมงาน': 'contact our team',
  'ชั่วโมง': 'hours',
  'สอบถามรอบอบรม': 'Ask about training dates',
  'เกี่ยวกับเรา': 'About Us',
  'ค่านิยมของเรา: ความเรียบง่าย · ความจริงใจ · การลงมือทำจริง · ความยั่งยืน': 'Our values: Simplicity · Sincerity · Action-Oriented · Sustainability',
  'บอกความต้องการของคุณ ทีมงานจะติดต่อกลับโดยเร็วที่สุด': 'Tell us what you need and our team will get back to you as soon as possible.',
  'ชื่อ-นามสกุล': 'Full name',
  'สมชาย ใจดี': 'John Smith',
  'บริษัท': 'Company',
  'ชื่อบริษัท/ร้านค้า': 'Company / store name',
  'เบอร์โทร': 'Phone',
  'อีเมล': 'Email',
  'สนใจบริการ': 'Service of interest',
  'เลือกบริการ': 'Select a service',
  'ยังไม่แน่ใจ ขอคำแนะนำ': 'Not sure yet — I need advice',
  'รายละเอียด': 'Details',
  'ประเภทธุรกิจ จำนวนสาขา/พนักงาน และสิ่งที่อยากแก้': 'Type of business, number of branches/staff, and what you want to improve',
  'รับข้อมูลแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด': 'Received. Our team will contact you as soon as possible.',
  'ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่ หรือโทร': 'Could not send your message. Please try again or call',
  'กำลังส่ง…': 'Sending…',
  'ส่งข้อมูล': 'Send',
  'ฝ่ายบริการ': 'Customer service',
  'ฝ่ายขาย': 'Sales',
  'เวลาทำการ': 'Opening hours',
  'ที่อยู่': 'Address',
  'เข้าสู่ระบบ': 'Log in',
  'สมัครสมาชิก': 'Sign up',
  'สมาชิก': 'Members',
  'โหมด': 'Mode',
  'รหัสผ่าน': 'Password',
  'หน้าตัวอย่าง — ยังไม่มีระบบสมาชิกเบื้องหลัง ต้องต่อ backend ก่อนใช้งานจริง': 'Demo page — there is no member system behind it yet.',
  'ลืมรหัสผ่าน? ติดต่อฝ่ายบริการ': 'Forgot your password? Contact customer service',
  'บริการและโซลูชัน': 'Services & Solutions',
  'บริการ 4 ด้านของ Smart Jigsaw เลือกใช้แยกกันได้ หรือรวมกันให้ทำงานเชื่อมกันทั้งองค์กร': "Smart Jigsaw's four services — use them separately, or combine them to work together across your organization",
  'ดูรายละเอียด': 'View details',
  'บริการ': 'Services',
  'จุดเด่น': 'Highlights',
  'ขอบเขตงาน': 'Scope of work',
  'เหมาะกับใคร': 'Who is it for?',
  'ดูตัวอย่างผลงาน': 'View sample work',
  'โทรสอบถาม': 'Call us on',
  'บริการอื่นของเรา': 'Our other services',
  'โปรโมชัน': 'Promotions',
  'เลื่อนดูโปรโมชัน': 'Browse promotions',
  'สินค้าเด่น': 'Featured',
  'สไลด์ก่อนหน้า': 'Previous slide',
  'สไลด์ถัดไป': 'Next slide',
  'สไลด์': 'Slide',
  'เว็บไซต์อื่น': 'External website',
  'ติดตามเรา': 'Follow us',
  'ช่องทางโซเชียล': 'Social channels',
  'เลือกภาษา': 'Language',
  'เมนูหลัก': 'Main menu',
  'ค้นหา': 'Search',
  'ขอเดโม': 'Request a Demo',
  'ปิดเมนู': 'Close menu',
  'เปิดเมนู': 'Open menu',
  'ค้นหาบทความ เช่น ปิดงบ สต็อก โปรโมชัน': 'Search articles, e.g. closing books, stock, promotions',
  'เลขประจำตัวผู้เสียภาษี': 'Tax ID',
  'บริการและความรู้': 'Services & Knowledge',
  'แผนที่ที่ตั้ง Smart Jigsaw': 'Smart Jigsaw location map',
  'สงวนลิขสิทธิ์': 'All rights reserved.',
  'คุกกี้': 'Cookies',
  'เว็บไซต์นี้ใช้คุกกี้เพื่อพัฒนาประสบการณ์ใช้งาน ดูรายละเอียดได้ในนโยบายความเป็นส่วนตัว': 'This website uses cookies to improve your experience. See our privacy policy for details.',
  'ยอมรับ': 'Accept',
  'ก่อนหน้า': 'Previous',
  'ถัดไป': 'Next',
  'หน้า': 'Page',
  'จาก': 'of',
  'โซเชียล': 'Social',
  'ดูโพสต์': 'View post',
  'กดเพื่อโหลดจาก': 'Click to load from',
  '(จะมีการเชื่อมต่อกับแพลตฟอร์มนั้น)': '(this connects to that platform)',
  'เปิดโพสต์ต้นฉบับบน': 'Open the original post on',
  'ดูโพสต์/รายละเอียดเพิ่มเติม': 'View the post / read more',
  'โพสต์จาก': 'Post from',
  'เลื่อนดูคอนเทนต์โซเชียล': 'Browse social content',
  'เล่นวิดีโอ': 'Play video',
  'เร็วๆ นี้': 'Coming soon',
  'ทั่วไป': 'General',
  'เลื่อนดูวิดีโอ': 'Browse videos',

  // ----- เนื้อหา (site.ts) -----
  'ระบบ POS ที่ออกแบบมาเพื่อธุรกิจของคุณ': 'A POS system designed for your business',
  'จัดการรับออเดอร์และคุมสต็อกได้ในระบบเดียวกัน ครบจบในระบบเดียว': 'Take orders and control stock in one system — everything in one place',
  'ดู AI Agent': 'See AI Agent',
  'AI เข้าช่วยเพิ่มยอดขาย': 'AI that helps grow your sales',
  'วิเคราะห์ข้อมูลและนำเสนอแนวทางการขายอย่างชาญฉลาด': 'Analyze your data and get smart suggestions for selling',
  'ติดตามการจัดส่งได้ทุกขั้นตอน': 'Track deliveries at every step',
  'อัปเดตสถานะคิวจัดส่งเรียลไทม์ วางแผนเส้นทางอัตโนมัติ': 'Real-time delivery status updates and automatic route planning',
  'ปรึกษาทีมงาน': 'Talk to our team',
  '5 วิธีตั้งโปรโมชันหน้าร้านโดยไม่ขาดทุน': '5 ways to run in-store promotions without losing money',
  'ตั้งส่วนลดอย่างไรให้ยอดขายเพิ่มแต่ยังรักษากำไรขั้นต้น': 'How to set discounts that grow sales while protecting gross margin',
  'โปรโมชันที่ดีควรเริ่มจากต้นทุนจริงของสินค้า ไม่ใช่ราคาป้าย ตรวจกำไรขั้นต้นหลังหักส่วนลดก่อนเปิดใช้เสมอ': 'A good promotion starts from the real cost of the product, not the price tag. Always check the gross margin after the discount before launching.',
  'ใช้ระบบสมาชิกเพื่อให้ส่วนลดเฉพาะกลุ่ม แทนการลดทั้งร้าน และกำหนดวันหมดอายุของโปรโมชันทุกครั้ง': 'Use a membership system to give discounts to specific groups instead of discounting the whole store, and always set an expiry date on every promotion.',
  'ดูรายงานยอดขายตามโปรโมชันรายสัปดาห์ แล้วยกเลิกรายการที่ไม่ทำให้ปริมาณขายเพิ่มจริง': 'Review sales reports by promotion every week, and cancel the ones that do not really increase sales volume.',
  'ตรวจนับสต็อกอย่างไรไม่ให้ร้านหยุดขาย': 'How to count stock without closing the store',
  'แบ่งโซนนับ-นับสลับรอบ และใช้ส่วนต่างเป็นสัญญาณหาจุดรั่ว': 'Count by zone in rotation, and use variances as a signal to find leaks',
  'การนับทั้งคลังพร้อมกันทำให้ต้องปิดร้าน ลองแบ่งเป็นโซนและนับต่อเนื่องตามรอบสัปดาห์ แทนการนับใหญ่ปีละครั้ง': 'Counting the whole warehouse at once forces you to close. Try dividing it into zones and counting continuously through the week instead of one big count a year.',
  'เมื่อพบส่วนต่าง อย่าปรับยอดทันที ให้ย้อนดูเอกสารรับ-จ่ายของสินค้านั้นก่อน เพราะส่วนใหญ่มาจากการคีย์ผิดหน่วย': 'When you find a variance, do not adjust the figure right away. Check the receiving and issuing documents for that item first — most variances come from entering the wrong unit.',
  'ระบบที่บันทึกผู้ทำรายการและเวลาจะช่วยไล่หาต้นเหตุได้เร็วขึ้นมาก': 'A system that records who made each transaction and when helps you trace the cause much faster.',
  'เช็กลิสต์ปิดงบสิ้นเดือนให้เสร็จใน 3 วัน': 'A checklist to close the month-end books in 3 days',
  'ลำดับงานที่ฝ่ายบัญชีควรทำก่อน-หลัง เพื่อไม่ต้องย้อนแก้ตัวเลขตอนใกล้ส่ง': 'The order in which accounting should work, so you do not have to fix figures near the deadline',
  'การปิดงบที่ช้ามักไม่ได้เกิดจากจำนวนรายการ แต่เกิดจากข้อมูลต้นทางที่ยังไม่นิ่ง เช่น ใบส่งของที่ยังไม่ออกบิล หรือสต็อกที่ยังไม่ตรวจนับ': 'Slow closing is rarely caused by the number of entries. It usually comes from source data that is not settled yet, such as delivery notes not yet invoiced or stock not yet counted.',
  'เริ่มจากล็อกช่วงบัญชีฝั่งขายและซื้อก่อน แล้วจึงกระทบยอดธนาคาร ตามด้วยปรับปรุงรายการค้างรับค้างจ่าย และตรวจรายงานงบทดลองอีกรอบ': 'Start by locking the sales and purchase periods, then reconcile the bank, then adjust accruals, and review the trial balance once more.',
  'ระบบ ERP ที่ผูกงานขาย ซื้อ และคลังเข้ากับบัญชีโดยตรง ช่วยตัดขั้นตอนคีย์ซ้ำ และทำให้ตัวเลขที่ผู้บริหารเห็นตรงกับที่บัญชีปิด': 'An ERP that links sales, purchasing and inventory directly to accounting removes duplicate data entry and makes the figures management sees match what accounting closes.',
  'โซลูชันอัจฉริยะ เพื่ออนาคตที่ชาญฉลาดกว่า': 'Intelligent solutions for a smarter future',
  '92/1 ถ.ปักธงชัย ต.ในเมือง อ.เมือง จ.นครราชสีมา 30000': '92/1 Pakthongchai Rd., Nai Mueang, Mueang District, Nakhon Ratchasima 30000, Thailand',
  'เทคโนโลยีคือชิ้นส่วนจิ๊กซอว์ที่ทรงพลัง': 'Technology is a powerful piece of the jigsaw',
  'Smart Jigsaw คือบริษัทที่ปรึกษาด้านเทคโนโลยีดิจิทัล ก่อตั้งขึ้นบนความเชื่อว่าเทคโนโลยีไม่ใช่เพียงเครื่องมือ แต่คือชิ้นส่วนจิ๊กซอว์ที่ช่วยขับเคลื่อนธุรกิจสู่ยุคดิจิทัลอย่างยั่งยืน': 'Smart Jigsaw is a digital technology consultancy founded on the belief that technology is not just a tool, but a piece of the jigsaw that drives business into the digital age sustainably.',
  'เราไม่ได้พัฒนาระบบลอยๆ แต่ทำงานผสมผสานคน กระบวนการ และเทคโนโลยี ออกแบบฟังก์ชันที่หยิบจับง่าย เข้าใจพฤติกรรมจริงของผู้ใช้งาน เพื่อให้ทุกชิ้นส่วนทางธุรกิจประกบเข้าหากันได้อย่างสวยงาม': 'We do not build systems in isolation. We blend people, process and technology, designing easy-to-use features based on how users really behave, so every piece of your business fits together beautifully.',
  'เรียบง่าย': 'Simple',
  'จริงใจ': 'Sincere',
  'ลงมือทำจริง': 'Hands-on',
  'ยั่งยืน': 'Sustainable',
  'โกดังวงษ์หิรัญค้าส่ง': 'Wonghiran Wholesale Warehouse',
  'ร้านค้าส่งที่ใช้ระบบ GrowStore บริหารการขายหน้าร้าน และ Yoonai บริหารงานบุคคลของทีมงาน': 'A wholesaler using GrowStore to manage in-store sales and Yoonai to manage its team’s HR.',
  'ระบบขายหน้าร้านสำหรับร้านปลีก (POS)': 'Point-of-sale system for retail stores',
  'ระบบเช็กชื่อ ลางาน และ HR ผ่าน LINE': 'Attendance, leave and HR via LINE',
  'ระบบบริหารงานหน่วยรถและติดตาม GPS': 'Fleet management and GPS tracking',
  'ระบบบริหารโปรเจกต์ งาน และเอกสารทีม': 'Project, task and document management for teams',
  'บริการของเรา': 'Our Services',
  'ที่ปรึกษาด้านธุรกิจ': 'Business Consulting',
  'พัฒนาระบบ ERP & POS': 'ERP & POS Development',
  'พัฒนาซอฟต์แวร์เฉพาะทาง': 'Custom Software Development',
  'ผลงาน': 'Our Work',
  'เกี่ยวกับ': 'About',
  'เปลี่ยนผ่านสู่ยุคดิจิทัลอย่างมั่นใจ ด้วยแผนที่เหมาะกับธุรกิจคุณ': 'Move into the digital age with confidence, with a plan that fits your business',
  'วางแผนกลยุทธ์และโครงสร้างระบบธุรกิจ ผสมผสานคน กระบวนการ และเทคโนโลยี': 'Strategic planning and business system architecture that blends people, process and technology',
  'เรียนรู้เพิ่มเติม': 'Learn more',
  'กลยุทธ์': 'Strategy',
  'โครงสร้างระบบ': 'System architecture',
  'ขายหน้าร้านและคุมสต็อกได้ในระบบเดียว': 'Sell in store and control stock in one system',
  'ระบบบริหารธุรกิจที่ออกแบบเฉพาะสำหรับแต่ละองค์กร พร้อมระบบขายหน้าร้าน': 'A business management system designed for each organization, with a point-of-sale built in',
  'ให้ AI ช่วยเพิ่มประสิทธิภาพ ลดต้นทุน และเพิ่มความเร็ว': 'Let AI improve efficiency, cut costs and speed up work',
  'นำ AI มาช่วยงานซ้ำๆ และวิเคราะห์ข้อมูลเพื่อเสนอแนวทางการขาย': 'Use AI for repetitive work and to analyze data for sales suggestions',
  'ซอฟต์แวร์เฉพาะทาง': 'Custom software',
  'ระบบที่สร้างตามกระบวนการของคุณโดยเฉพาะ': 'A system built around your own processes',
  'พัฒนาบนมาตรฐานสากล เน้นระบบโมดูลาร์ที่ขยายต่อได้': 'Built on international standards, with an extensible modular design',
  'โมดูลาร์': 'Modular',
  'มาตรฐานสากล': 'International standards',
  'โปรแกรมสำเร็จรูปของ Smart Jigsaw': 'Smart Jigsaw Ready-made Software',
  'ตัวอย่างผลงานและการใช้งานระบบ': 'Sample Work and System Usage',
  'ฟังก์ชันที่ใช้งานจริงในระบบของเรา': 'Features used in real work in our systems',
  'ติดตามเราบนโซเชียล': 'Follow Us on Social Media',
  'คลิปและโพสต์ล่าสุดจากช่องทางของเรา': 'Latest clips and posts from our channels',
  'ทีมผู้พัฒนา': 'Development Team',
  'คนเบื้องหลังระบบที่ใช้งานจริงในธุรกิจของลูกค้า': 'The people behind systems used in our customers’ real businesses',
  'ธุรกิจที่ไว้วางใจให้เราดูแลระบบ': 'Businesses that trust us with their systems',
  'กิจกรรมและงานสัมมนา': 'Events & Seminars',
  'เข้าร่วมเพื่อเรียนรู้การใช้ระบบและพบทีมงานของเรา': 'Join us to learn the systems and meet our team',
  'ข่าวและสื่อ': 'News & Media',
  'ข่าวประชาสัมพันธ์และบทสัมภาษณ์ล่าสุด': 'Latest press releases and interviews',
  'คุยกับทีมงานของเรา': 'Talk to Our Team',
  'บอกโจทย์ธุรกิจของคุณ แล้วเราจะแนะนำโซลูชันที่เหมาะสม': 'Tell us about your business challenge and we will recommend the right solution',
  'จัดการรับออเดอร์และคุมสต็อกได้ในระบบเดียวกัน': 'Take orders and control stock in the same system',
  'แบ่งหน่วยของสินค้าได้': 'Split products into units',
  'ซื้อเป็นลัง ขายแยกชิ้น ตัดสต็อกและคำนวณต้นทุนแม่นยำ': 'Buy by the case, sell by the piece, with stock deduction and accurate cost calculation',
  'Dashboard ที่เข้าใจง่าย': 'An easy-to-read dashboard',
  'ติดตามยอดขาย รายจ่าย ต้นทุน และยอดสุทธิรายวันผ่านมือถือ': 'Track sales, expenses, cost and daily net revenue on your phone',
  'จัดการคลังครุภัณฑ์และวัสดุ': 'Manage asset and supply inventory',
  'ควบคุมการเบิกจ่าย ประวัติผู้ยืม และร่นเวลาทำสต็อกประจำปี': 'Control requisitions and borrowing history, and shorten the annual stock take',
  'วางแผนกลยุทธ์และโครงสร้างระบบธุรกิจ': 'Strategic planning and business system architecture',
  'วางแผนกลยุทธ์และโครงสร้างระบบธุรกิจ เพื่อการเปลี่ยนผ่านสู่ยุคดิจิทัล โดยทำงานผสมผสานคน กระบวนการ และเทคโนโลยีเข้าด้วยกัน': 'Strategic planning and business system architecture for the move into the digital age, blending people, process and technology.',
  'องค์กรที่กำลังจะย้ายงานขึ้นระบบดิจิทัล และอยากได้คำแนะนำที่ตรงไปตรงมาก่อนตัดสินใจลงทุน': 'Organizations moving their work onto digital systems that want straightforward advice before investing.',
  'ออกแบบให้เข้ากับคน กระบวนการ และเทคโนโลยีขององค์กร': 'Designed to fit your people, processes and technology',
  'แนะนำเฉพาะโซลูชันที่ต้องใช้จริง ไม่เสนอโปรแกรมที่ไม่จำเป็น': 'We recommend only the solutions you really need — no unnecessary software',
  'วางโครงสร้างให้ขยายต่อได้ในอนาคต': 'Structured to be extended in the future',
  'ทำความเข้าใจธุรกิจ': 'Understand your business',
  'ดูกระบวนการทำงานและพฤติกรรมจริงของผู้ใช้งาน': 'Study the working processes and real user behavior',
  'วางแผนกลยุทธ์': 'Plan the strategy',
  'กำหนดเป้าหมายและลำดับการเปลี่ยนผ่านสู่ดิจิทัล': 'Set goals and the order of your digital transition',
  'ออกแบบโครงสร้างระบบ': 'Design the system architecture',
  'วางผังระบบให้เรียบง่าย ใช้งานง่าย': 'Lay out the system to be simple and easy to use',
  'ลงมือทดสอบหน้างาน': 'Test on site',
  'ทดสอบร่วมกับบุคลากร แก้ประเด็นติดขัดและดูแลต่อเนื่อง': 'Test together with your staff, fix issues and keep supporting',
  'ระบบบริหารธุรกิจ พร้อมระบบขายหน้าร้าน': 'Business management system with point-of-sale',
  'ระบบบริหารธุรกิจที่ออกแบบเฉพาะสำหรับแต่ละองค์กร พร้อมระบบขายหน้าร้าน จัดการรับออเดอร์และคุมสต็อกได้ในระบบเดียวกัน': 'A business management system designed for each organization, with a point-of-sale — take orders and control stock in the same system.',
  'ธุรกิจค้าปลีกและองค์กรที่ต้องการให้ยอดขาย สต็อก และการเบิกจ่าย อยู่ในระบบเดียว': 'Retailers and organizations that want sales, stock and requisitions in one system.',
  'แบ่งหน่วยของสินค้าได้ เช่น ซื้อเป็นลัง ขายแยกชิ้น ตัดสต็อกและคำนวณต้นทุนแม่นยำ': 'Split products into units — e.g. buy by the case, sell by the piece — with stock deduction and accurate cost calculation',
  'Dashboard ติดตามยอดขาย รายจ่าย ต้นทุน และยอดสุทธิแบบเรียลไทม์ ผ่านมือถือ': 'A dashboard tracking sales, expenses, cost and net revenue in real time on your phone',
  'รองรับ Cashless Payment และ QR PromptPay': 'Supports cashless payment and QR PromptPay',
  'ส่งออกรายงานภาษีและบัญชีอัตโนมัติ': 'Export tax and accounting reports automatically',
  'ขายหน้าร้าน (POS)': 'In-store sales (POS)',
  'รับออเดอร์ รับชำระ และคุมสต็อกในระบบเดียว': 'Take orders, accept payment and control stock in one system',
  'แบ่งหน่วยสินค้า': 'Product units',
  'ตั้งหน่วยย่อยเพื่อคำนวณสต็อกและกำไรได้แม่นยำ': 'Set sub-units to calculate stock and profit accurately',
  'คลังครุภัณฑ์และวัสดุ': 'Asset and supply inventory',
  'ควบคุมสถานะการเบิกจ่าย ประวัติผู้ยืม และตรวจสต็อกประจำปี': 'Control requisition status and borrowing history, and run the annual stock check',
  'ติดตามการจัดส่ง': 'Delivery tracking',
  'อัปเดตสถานะคิวจัดส่งเรียลไทม์และวางแผนเส้นทาง': 'Real-time delivery status updates and route planning',
  'นำ AI มาเพิ่มประสิทธิภาพการทำงาน': 'Use AI to improve how you work',
  'นำ AI มาช่วยเพิ่มประสิทธิภาพการทำงาน ลดต้นทุน และเพิ่มความเร็ว รวมถึงช่วยวิเคราะห์ข้อมูลเพื่อเสนอแนวทางการขาย': 'Use AI to improve efficiency, cut costs and speed up work, including analyzing data to suggest sales approaches.',
  'องค์กรที่มีงานซ้ำๆ หรือมีข้อมูลสะสมมาก และอยากให้ AI ช่วยลดภาระทีมงาน': 'Organizations with repetitive work or lots of accumulated data that want AI to lighten the team’s load.',
  'AI วิเคราะห์ข้อมูลและนำเสนอแนวทางการขายอย่างชาญฉลาด': 'AI analyzes data and suggests smart sales approaches',
  'ระบบอัตโนมัติลดงานซ้ำและลดต้นทุน': 'Automation reduces repetitive work and cost',
  'เพิ่มความเร็วในการทำงานของทีม': 'Speeds up your team’s work',
  'ออกแบบให้เชื่อมกับระบบที่องค์กรใช้อยู่': 'Designed to connect with the systems you already use',
  'ผู้ช่วยอัจฉริยะที่ทำงานตามโจทย์เฉพาะขององค์กร': 'Intelligent assistants that work on your organization’s specific tasks',
  'ลำดับงานอัตโนมัติแทนงานทำมือซ้ำๆ': 'Automated workflows replacing repetitive manual work',
  'วิเคราะห์ข้อมูล': 'Data analysis',
  'สรุปข้อมูลเพื่อช่วยตัดสินใจ': 'Summarize data to support decisions',
  'เชื่อมต่อระบบ': 'System integration',
  'ทำงานร่วมกับ ERP & POS และระบบอื่น': 'Works with ERP & POS and other systems',
  'สร้างระบบที่ตอบโจทย์เฉพาะขององค์กร': 'Build systems that fit your organization’s needs',
  'สร้างระบบเฉพาะที่ตอบโจทย์กระบวนการเฉพาะของแต่ละองค์กร เขียนบนมาตรฐานสากล เน้นระบบโมดูลาร์ที่ขยายได้': 'Build custom systems for each organization’s specific processes, written on international standards with an extensible modular design.',
  'องค์กรที่โปรแกรมสำเร็จรูปไม่ตอบโจทย์ และต้องการระบบที่ออกแบบตามกระบวนการของตัวเอง': 'Organizations that ready-made software does not fit and that need a system built around their own processes.',
  'ออกแบบตามกระบวนการเฉพาะขององค์กร': 'Designed around your organization’s specific processes',
  'เขียนโปรแกรมบนมาตรฐานสากล': 'Programmed on international standards',
  'โครงสร้างโมดูลาร์ รองรับการสเกลอัปในอนาคต': 'Modular structure that supports scaling up in the future',
  'ใช้งานง่าย ทีมหน้างานเริ่มใช้ได้ทันที': 'Easy to use — frontline teams can start right away',
  'วิเคราะห์ความต้องการ': 'Analyze requirements',
  'ทำความเข้าใจกระบวนการและผู้ใช้งานจริง': 'Understand the processes and real users',
  'ออกแบบและพัฒนา': 'Design and develop',
  'สร้างระบบตามโจทย์ด้วยมาตรฐานสากล': 'Build the system to your brief using international standards',
  'ทดสอบหน้างาน': 'On-site testing',
  'ทดสอบร่วมกับบุคลากรและปรับแก้': 'Test with your staff and adjust',
  'ต่อยอดระบบ': 'Extend the system',
  'ขยายโมดูลเพิ่มได้เมื่อธุรกิจเติบโต': 'Add more modules as your business grows',
  'ความเรียบง่าย (Simplicity)': 'Simplicity',
  'คิดค้นและออกแบบโครงสร้างระบบให้เข้าใจง่าย ใช้งานง่าย ไม่สลับซับซ้อน เพื่อให้ทีมงานหน้างานเริ่มใช้ได้ทันที': 'We design system structures to be easy to understand and use, never complicated, so frontline teams can start right away.',
  'ความจริงใจ (Sincerity)': 'Sincerity',
  'แนะนำโซลูชันที่ต้องการใช้งานจริงอย่างเปิดเผย ตรงไปตรงมา ปราศจากโปรแกรมที่ไม่จำเป็น เพื่อประหยัดงบและรักษาความไว้วางใจ': 'We openly and honestly recommend only the solutions you actually need, with no unnecessary software, to save your budget and keep your trust.',
  'การลงมือทำจริง (Action-Oriented)': 'Action-Oriented',
  'ลงมือทดสอบระบบหน้างานจริงร่วมกับบุคลากร ช่วยแก้ไขประเด็นติดขัด และดูแลอย่างเป็นกันเองเสมอ': 'We test the system on site with your staff, help resolve issues, and always support you in a friendly way.',
  'ความยั่งยืน (Sustainability)': 'Sustainability',
  'เขียนโปรแกรมบนมาตรฐานสากล มุ่งเน้นระบบโมดูลาร์ที่ขยายได้ เพื่อรองรับการสเกลอัปหรือต่อยอดในอนาคตอย่างราบรื่น': 'We program on international standards with extensible modular systems, so scaling up or building on them later is smooth.',
  'จิรพงศ์ ศรีอำไพ': 'Chiraphong Sri-amphai',
  'โพสต์ใหม่': 'New post',
  'รางวัลและการรับรอง': 'Awards & Certifications',
  'ความน่าเชื่อถือที่ได้รับจากหน่วยงานและสถาบัน': 'Recognition we have received from organizations and institutions',
  'นักพัฒนาซอฟต์แวร์': 'Software Developer',
  'ผู้ก่อตั้ง': 'Founder',
  'นักออกแบบ': 'Designer',
}

const getExtra = (): Record<string, string> => {
  const m: Record<string, string> = {}
  for (const r of TRANSLATIONS) if (r && typeof r.th === 'string' && typeof r.en === 'string' && r.en.trim()) m[r.th.trim()] = r.en.trim()
  return m
}
let extra: Record<string, string> = {}

export const getLang = (): Lang => current
export const t = (s: string): string => (current === 'en' ? (extra[s] ?? EN[s] ?? s) : s)

// เนื้อหาไทยเดิมของแต่ละหมวด (ก่อนแปล) — เก็บไว้สลับกลับไทย
const original = new Map<string, unknown>()
const SKIP = new Set(['THEME', 'TRANSLATIONS'])

// คัดลอกลึกเฉพาะอาร์เรย์/ออบเจ็กต์ธรรมดา — ค่าอื่น (เช่น คอมโพเนนต์ไอคอนของสินค้า) ใช้ตัวเดิม
const isPlain = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && Object.getPrototypeOf(v) === Object.prototype && !('$$typeof' in (v as object))
const clone = <T,>(v: T): T => (Array.isArray(v) ? (v.map(clone) as unknown as T) : isPlain(v) ? (Object.fromEntries(Object.entries(v).map(([k, x]) => [k, clone(x)])) as T) : v)

function translateIn(v: unknown): void {
  if (Array.isArray(v)) v.forEach((x, i) => { if (typeof x === 'string') { const r = t(x); if (r !== x) v[i] = r } else translateIn(x) })
  else if (isPlain(v)) {
    const o = v
    for (const k of Object.keys(o)) { const x = o[k]; if (typeof x === 'string') { const r = t(x); if (r !== x) o[k] = r } else translateIn(x) }
  }
}
function restoreIn(target: unknown, snap: unknown): void {
  if (Array.isArray(target) && Array.isArray(snap)) target.splice(0, target.length, ...clone(snap))
  else if (target && snap && typeof target === 'object' && typeof snap === 'object') Object.assign(target, clone(snap))
}

export function applyLang(lang: Lang) {
  extra = getExtra()
  if (lang === 'th') {
    current = 'th'
    for (const [k, snap] of original) restoreIn(EDITABLE[k], snap)
    original.clear()
  } else {
    for (const [k, v] of Object.entries(EDITABLE)) if (!SKIP.has(k) && !original.has(k)) original.set(k, clone(v))
    current = 'en'
    for (const [k, v] of Object.entries(EDITABLE)) if (!SKIP.has(k)) translateIn(v)
  }
  try { localStorage.setItem(KEY, lang) } catch { /* ignore */ }
  if (typeof document !== 'undefined') document.documentElement.lang = lang
}

// แอดมินส่งร่างเนื้อหาใหม่เข้ามา (โหมดตัวอย่าง) — ข้อมูลหมวดนั้นกลายเป็นไทยใหม่ ต้องจำเป็นต้นฉบับแล้วแปลซ้ำ
export function contentChanged(key: string) {
  if (current !== 'en' || SKIP.has(key)) return
  original.set(key, clone(EDITABLE[key]))
  translateIn(EDITABLE[key])
}

const listeners = new Set<() => void>()
export const onLangChange = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn) } }
// สลับภาษาจากปุ่มบนหน้าเว็บ — แปลเนื้อหาแล้วแจ้งให้ทั้งหน้าวาดใหม่
export function setLang(lang: Lang) { applyLang(lang); listeners.forEach(f => f()) }

export function initialLang(): Lang {
  try {
    const q = new URLSearchParams(window.location.search).get('lang')
    if (q === 'en' || q === 'th') return q
    const s = localStorage.getItem(KEY)
    if (s === 'en' || s === 'th') return s
  } catch { /* ignore */ }
  return 'th'
}
