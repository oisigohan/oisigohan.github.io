import { Helmet } from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faVimeoV,
  faXTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import about from '../data/about.json'
import works from '../data/works.json'
import WorkCard from '../components/WorkCard'

const ICONS = { faVimeoV, faXTwitter, faInstagram, faEnvelope }
const { siteName, siteUrl, description, ogImage } = about

const AboutSection = () => (
  <section className="text-center max-w-xl mx-auto mb-24">
    {about.avatarUrl && (
      <img
        src={about.avatarUrl}
        alt={about.name}
        className="w-20 h-20 rounded-full object-cover bg-neutral-100 mx-auto mb-6"
      />
    )}
    <h1 className="text-2xl font-medium text-neutral-900 mb-3">{about.name}</h1>
    <p className="text-neutral-500 leading-relaxed text-sm mb-6">{about.bio}</p>
    {about.links?.length > 0 && (
      <ul className="flex flex-wrap justify-center gap-3">
        {about.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neutral-900 border border-neutral-200 px-4 py-2 hover:bg-neutral-50 transition-colors duration-200"
            >
              {link.icon && ICONS[link.icon] && (
                <FontAwesomeIcon icon={ICONS[link.icon]} className="w-4 h-4" />
              )}
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    )}
  </section>
)

// Group works by category, preserving first-appearance order.
// Returns [{name, items}]. Works without a category use name ''.
function groupWorks(works) {
  const map = new Map()
  for (const work of works) {
    const key = work.category ?? ''
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(work)
  }
  return Array.from(map, ([name, items]) => ({ name, items }))
}

const WorkGrid = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
    {items.map((work) => (
      <WorkCard key={work.id} work={work} />
    ))}
  </div>
)

export default function HomePage() {
  const visibleWorks = works.filter((w) => !w.hidden)
  const hasCategories = visibleWorks.some((w) => w.category)

  if (!hasCategories) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-16 w-full">
        <Helmet>
          <title>{siteName}</title>
          <meta property="og:title" content={siteName} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={siteUrl} />
          <meta property="og:image" content={`${siteUrl}${ogImage}`} />
          <meta name="twitter:title" content={siteName} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
        </Helmet>
        <AboutSection />
        <WorkGrid items={visibleWorks} />
      </main>
    )
  }

  const groups = groupWorks(visibleWorks)

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 w-full">
      <Helmet>
        <title>{siteName}</title>
        <meta property="og:title" content={siteName} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}${ogImage}`} />
        <meta name="twitter:title" content={siteName} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      </Helmet>
      <AboutSection />
      <div className="space-y-20">
        {groups.map(({ name, items }) => (
          <section key={name}>
            {name && (
              <h2 className="text-xs font-medium tracking-widest uppercase text-neutral-400 mb-10 pb-4 border-b border-neutral-100">
                {name}
              </h2>
            )}
            <WorkGrid items={items} />
          </section>
        ))}
      </div>
    </main>
  )
}
