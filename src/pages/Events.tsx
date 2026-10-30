import { Link } from 'react-router-dom'
import EventList from '../components/EventList'
import { PageHead } from './Products'
import { EVENTS, HOME } from '../site'
import { t } from '../i18n'

// หน้ากิจกรรมและงานสัมมนาทั้งหมด (หน้าแรกแสดงเฉพาะรายการล่าสุด)
export default function Events() {
  return (
    <>
      <PageHead title={HOME.eventsTitle} lead={HOME.eventsText} crumbs={[{ label: HOME.eventsTitle }]} />
      <section className="section"><div className="wrap">
        {EVENTS.length === 0
          ? <p>{t('ยังไม่มีกิจกรรมในขณะนี้ — ติดตามได้เร็วๆ นี้ หรือ')}<Link to="/contact" className="link-more">{t('ติดต่อทีมงาน')}</Link></p>
          : <EventList />}
      </div></section>
    </>
  )
}
