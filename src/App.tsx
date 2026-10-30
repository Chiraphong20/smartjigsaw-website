import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import { ProductDetail, Products } from './pages/Products'
import { ArticlePage, Knowledge } from './pages/Knowledge'
import { Customers } from './pages/Customers'
import Events from './pages/Events'
import { About, Account, Contact, NotFound, Services, Training } from './pages/Others'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:slug" element={<ProductDetail />} />
        <Route path="knowledge" element={<Knowledge />} />
        <Route path="knowledge/:slug" element={<ArticlePage />} />
        <Route path="customers" element={<Customers />} />
        <Route path="events" element={<Events />} />
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
