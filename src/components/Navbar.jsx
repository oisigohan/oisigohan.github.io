import { Link } from 'react-router-dom'
import { siteName } from '../data/about.json'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-100">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="text-sm tracking-widest uppercase font-bold text-neutral-900 hover:text-neutral-500 transition-colors duration-200"
        >
          {siteName}
        </Link>
      </div>
    </header>
  )
}
