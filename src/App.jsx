import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'

export default function App() {
  return (
    <HelmetProvider>
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white text-neutral-800 font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/works/:id" element={<WorkPage />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
    </HelmetProvider>
  )
}
