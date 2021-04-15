import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FilterId, getHeartedAnimes, getStarredAnimes } from '../localStorage'
import { Anime } from '../models/anime'
import { chunk } from 'lodash'
import { offset } from '../constants'

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

  const incrementPage = () => {
    const isLastPage = page === totalCount / offset
    if (isLastPage) {
      return
    }
    setPage(page + 1)
  }
  const decrementPage = () => {
    if (page === 1) {
      return
    }
    setPage(page - 1)
  }

  return [
    results,
    page,
    setPage,
    totalCount,
    resultsCount,
    incrementPage,
    decrementPage,
  ] as [
    Anime[],
    number,
    Dispatch<SetStateAction<number>>,
    number,
    number,
    () => void,
    () => void
  ]
}
