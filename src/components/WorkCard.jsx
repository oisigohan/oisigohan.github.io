import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

function WorkThumbnail({ title, vimeoId, imageSrc }) {
  const [vimeoThumbnail, setVimeoThumbnail] = useState(null)

  useEffect(() => {
    if (!vimeoId) return

    const controller = new AbortController()
    const videoUrl = `https://vimeo.com/${vimeoId}`
    const endpoint = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(videoUrl)}`

    fetch(endpoint, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data?.thumbnail_url) setVimeoThumbnail(data.thumbnail_url)
      })
      .catch(() => null)

    return () => controller.abort()
  }, [vimeoId])

  return (
    <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
      {(vimeoThumbnail || imageSrc) && (
        <img
          src={vimeoThumbnail || imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
      )}
    </div>
  )
}

export default function WorkCard({ work }) {
  const { id, link, title, year, tags, thumbnail } = work
  const vimeoId = Array.isArray(work.vimeoId) ? work.vimeoId[0] : work.vimeoId
  const folder = id
  const imgSrc = thumbnail ? `/works/${folder}/${thumbnail}` : null

  const inner = (
    <>
      {(thumbnail || vimeoId) && (
        <WorkThumbnail
          title={title}
          vimeoId={vimeoId}
          imageSrc={imgSrc}
        />
      )}
      <div className="pt-4 pb-2">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-base font-medium text-neutral-900 group-hover:text-neutral-500 transition-colors duration-200 flex items-center gap-1.5">
            {title}
            {link && <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3 text-neutral-400" />}
          </h2>
          <span className="text-sm text-neutral-400 shrink-0">{year}</span>
        </div>
        {tags?.length > 0 && (
          <p className="mt-1 text-xs text-neutral-400 tracking-wide">
            {tags.join(' · ')}
          </p>
        )}
      </div>
    </>
  )

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden"
      >
        {inner}
      </a>
    )
  }

  return (
    <Link
      to={`/works/${id}`}
      className="group block overflow-hidden"
    >
      {inner}
    </Link>
  )
}
