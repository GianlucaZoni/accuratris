// Inspired by "Defender of the Favicon" by Mathieu 'p01' Henri
// https://www.p01.org/defender_of_the_favicon/

export function setFaviconWithChar(emoji: string) {
  const canvas = document.createElement("canvas")
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext("2d")
  if (ctx) {
    ctx.font = "24px sans-serif"
    ctx.fillText(emoji, 4, 24)
  }
  const link = document.querySelector("link[rel*='icon']") || document.createElement("link")
  link.setAttribute("type", "image/x-icon")
  link.setAttribute("rel", "shortcut icon")
  link.setAttribute("href", canvas.toDataURL())
  document.head.appendChild(link)
}
