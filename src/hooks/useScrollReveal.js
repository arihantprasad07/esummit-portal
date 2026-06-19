import { useEffect, useRef } from 'react'

const defaultOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px',
}

export default function useScrollReveal(options = defaultOptions) {
  const elementsRef = useRef([])

  useEffect(() => {
    const elements = elementsRef.current.filter(Boolean)

    if (!elements.length) return undefined

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, options)

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [options])

  return (index) => (element) => {
    if (element) {
      elementsRef.current[index] = element
    }
  }
}
