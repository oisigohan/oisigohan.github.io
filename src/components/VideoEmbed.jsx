// vimeoId / youtubeId はどちらも文字列の配列。
// Vimeo は "ID" または "ID/HASH"（非公開リンクのハッシュ）形式をサポート。

function SingleEmbed({ vimeoId, youtubeId }) {
  let src, allow

  if (vimeoId) {
    const [id, hash] = vimeoId.split('/')
    const query = new URLSearchParams({ title: 0, byline: 0, portrait: 0 })
    if (hash) query.set('h', hash)
    src = `https://player.vimeo.com/video/${id}?${query}`
    allow = 'autoplay; fullscreen; picture-in-picture'
  } else {
    src = `https://www.youtube-nocookie.com/embed/${youtubeId}`
    allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
  }

  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={src}
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allow={allow}
        allowFullScreen
        title="Video"
      />
    </div>
  )
}

export default function VideoEmbed({ vimeoId = [], youtubeId = [] }) {
  const entries = [
    ...vimeoId.map((id) => ({ vimeoId: id })),
    ...youtubeId.map((id) => ({ youtubeId: id })),
  ]

  if (entries.length === 0) return null

  return (
    <div className="flex flex-col gap-6">
      {entries.map((entry, i) => (
        <SingleEmbed key={i} {...entry} />
      ))}
    </div>
  )
}