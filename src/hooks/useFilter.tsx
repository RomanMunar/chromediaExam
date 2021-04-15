import { useEffect, useState } from 'react'
import { FilterId, getHeartedAnimes, getStarredAnimes } from '../localStorage'
import { Anime } from '../models/anime'
import { chunk } from 'lodash'

export const useFilter = (filter: string, filterId: FilterId) => {
  const [results, setResults] = useState<Anime[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [resultsCount, setResultsCount] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (filter === 'none') return

    if (filter === 'star') {
      const results = getStarredAnimes()
      const pages = chunk(results, 10)
      const currentPage = pages[page - 1]
      if (currentPage) {
        setResults(currentPage)
        setTotalCount(results.length)
        setResultsCount(currentPage.length)
      } else {
        setResults([])
        setTotalCount(0)
        setResultsCount(0)
      }
    }

    if (filter === 'heart') {
      const results = getHeartedAnimes()
      const pages = chunk(results, 10)
      const currentPage = pages[page - 1]
      if (currentPage) {
        setResults(currentPage)
        setTotalCount(results.length)
        setResultsCount(currentPage.length)
      } else {
        setResults([])
        setTotalCount(0)
        setResultsCount(0)
      }
    }
    //eslint-disable-next-line
  }, [filter, page])

  return [results, page, setPage, totalCount, resultsCount] as [
    Anime[],
    number,
    (page?: number) => void,
    number,
    number
  ]
}
