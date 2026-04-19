import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { siteName } from '../data/about.json'
import about from '../data/about.json'
import works from '../data/works.json'
import VideoEmbed from '../components/VideoEmbed'

export default function WorkPage() {
  const { id } = useParams()
  const work = works.find((w) => w.id === id)
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  if (!work) return <Navigate to="/" replace />

  const { title, year, tags, description, images, thumbnail, vimeoId, youtubeId, links } = work

  const slides = (images ?? []).map((img) => ({
    src: `/works/${id}/${img}`,
  }))

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 w-full">
      <Helmet>
        <title>{`${title} | ${siteName}`}</title>
        <meta name="description" content={description || ''} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={`${title} | ${siteName}`} />
        <meta property="og:description" content={description || ''} />
        <meta property="og:url" content={`${about.siteUrl}/works/${id}`} />
        <meta property="og:image" content={`${about.siteUrl}/works/${id}/${thumbnail}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | ${siteName}`} />
        <meta name="twitter:description" content={description || ''} />
        <meta name="twitter:image" content={`${about.siteUrl}/works/${id}/${thumbnail}`} />
      </Helmet>

      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-900 transition-colors duration-200 mb-12"
      >
        ← Back to the List
      </Link>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-baseline gap-4 mb-3">
          <h1 className="text-3xl font-medium text-neutral-900">{title}</h1>
          <span className="text-neutral-400 text-sm">{year}</span>
        </div>
        {tags?.length > 0 && (
          <p className="text-xs text-neutral-400 tracking-wide mb-4">
            {tags.join(' · ')}
          </p>
        )}
        {description && (
          <p className="text-neutral-600 leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>

      {/* Video embed (Vimeo or YouTube) */}
      {(vimeoId?.length > 0 || youtubeId?.length > 0) && (
        <div className="mb-12">
          <VideoEmbed vimeoId={vimeoId ?? []} youtubeId={youtubeId ?? []} />
        </div>
      )}

      {/* External links */}
      {links?.length > 0 && (
        <div className="mb-12 flex flex-wrap gap-3">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neutral-900 border border-neutral-200 px-4 py-2 hover:bg-neutral-50 transition-colors duration-200"
            >
              {link.label}
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3 text-neutral-400" />
            </a>
          ))}
        </div>
      )}

      {/* Image grid */}
      {images?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setLightboxIndex(i)}
              className="block overflow-hidden bg-neutral-100 aspect-[4/3] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
            >
              <img
                src={`/works/${id}/${img}`}
                alt={`${title} – image ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        controller={{ closeOnBackdropClick: true }}
      />
    </main>
  )
}
