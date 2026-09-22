import { useEffect } from 'react'

// Lightweight per-route SEO: sets <title>, meta description and theme-color.
export function useSEO({ title, description, themeColor }) {
  useEffect(() => {
    if (title) document.title = title

    const setMeta = (selector, attr, value) => {
      if (!value) return
      let el = document.head.querySelector(selector)
      if (el) el.setAttribute(attr === 'name' ? 'content' : attr, value)
    }

    if (description) {
      const desc = document.head.querySelector('meta[name="description"]')
      if (desc) desc.setAttribute('content', description)
      const ogDesc = document.head.querySelector('meta[property="og:description"]')
      if (ogDesc) ogDesc.setAttribute('content', description)
    }
    if (title) {
      const ogTitle = document.head.querySelector('meta[property="og:title"]')
      if (ogTitle) ogTitle.setAttribute('content', title)
    }
    if (themeColor) {
      const tc = document.head.querySelector('meta[name="theme-color"]')
      if (tc) tc.setAttribute('content', themeColor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, themeColor])
}
