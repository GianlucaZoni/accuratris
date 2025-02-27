// Inspired by "Defender of the Favicon" by Mathieu 'p01' Henri
// https://www.p01.org/defender_of_the_favicon/

export function setFaviconWithChar(emoji: string) {

  const link = document.querySelector("link[rel*='icon']") || document.createElement("link")
  link.setAttribute("type", "image/x-icon")
  link.setAttribute("rel", "shortcut icon")
  link.setAttribute("href", `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`)
  document.head.appendChild(link)
}
