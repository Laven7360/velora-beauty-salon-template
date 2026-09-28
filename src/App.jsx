import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Team from './pages/Team'
import Gallery from './pages/Gallery'
import Book from './pages/Book'
import PageHero from './components/PageHero'

export function SiteRoutes() {
  return <Routes><Route element={<MainLayout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="services" element={<Services />} />
    <Route path="team" element={<Team />} />
    <Route path="gallery" element={<Gallery />} />
    <Route path="book" element={<Book />} />
    <Route path="*" element={<PageHero />} />
  </Route></Routes>
}


export default function App() { return <BrowserRouter><SiteRoutes /></BrowserRouter> }
