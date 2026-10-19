import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import { ProductDetail, Products } from './pages/Products'
import { ArticlePage, Knowledge } from './pages/Knowledge'
import { About, Account, Contact, NotFound, Services, Training } from './pages/Others'

// หน้าแอดมินโหลดแยก (lazy) เพื่อไม่ให้หนักหน้าเว็บของผู้เยี่ยมชม
const Admin = lazy(() => import('./admin/Admin'))

export default function App() {
  return (
    <Routes>
      <Route path="admin" element={<Suspense fallback={null}><Admin /></Suspense>} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:slug" element={<ProductDetail />} />
        <Route path="knowledge" element={<Knowledge />} />
        <Route path="knowledge/:slug" element={<ArticlePage />} />
        <Route path="services" element={<Services />} />
        <Route path="training" element={<Training />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="account" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
