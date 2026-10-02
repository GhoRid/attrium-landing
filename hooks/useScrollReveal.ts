import { useEffect, useRef, useState } from 'react'

// Default threshold is intentionally low: a section taller than ~2x the
// viewport (common on mobile for image-heavy sections) can never reach 0.5
// intersection ratio no matter how far you scroll, which permanently blocks
// the reveal. A low threshold triggers as soon as a sliver enters view.
export function useScrollReveal<T extends HTMLElement>(threshold = 0.15) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}
