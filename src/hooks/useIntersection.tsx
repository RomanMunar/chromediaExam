// https://streamich.github.io/react-use/?path=/story/sensors-useintersection--docs
import { RefObject, useEffect, useState } from 'react'

const useIntersection = (
  ref: RefObject<HTMLElement>,
  options?: IntersectionObserverInit
): IntersectionObserverEntry | null => {
  const newOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 1,
    ...options,
  }
  const [
    intersectionObserverEntry,
    setIntersectionObserverEntry,
  ] = useState<IntersectionObserverEntry | null>(null)

  useEffect(() => {
    if (ref.current && typeof IntersectionObserver === 'function') {
      const handler = (entries: IntersectionObserverEntry[]) => {
        setIntersectionObserverEntry(entries[0])
      }

      const observer = new IntersectionObserver(handler, newOptions)
      observer.observe(ref.current)

      return () => {
        setIntersectionObserverEntry(null)
        observer.disconnect()
      }
    }
    return () => {}
    //eslint-disable-next-line
  }, [
    ref.current,
    newOptions.threshold,
    newOptions.root,
    newOptions.rootMargin,
  ])

  return intersectionObserverEntry
}

export default useIntersection
