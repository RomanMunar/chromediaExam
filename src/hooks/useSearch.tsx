import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { offset } from '../constants'
import { getAnimes } from '../fetchers'
import { Anime } from '../models/anime'
import { useQuery } from '../utils'

export const useSearch = () => {
  const location = useLocation()
  const query = useQuery()
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [resultsCount, setResultsCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [animes, setAnimes] = useState<Anime[]>()

  useEffect(() => {
    const onSearchFilter = async () => {
      setLoading(true)
      const offset = page === 1 ? 0 : page * 10
      let queryParams = '?'
      if (location.search) {
        setSearchKeyword(query.get('filter[text]')!.toString())
        const text = query
          .toString()
          .split('filter%5Btext%5D=')[1]
          .toLowerCase()
        queryParams += `filter[text]=${text}`
      }
      if (page) {
        queryParams += `&page%5Blimit%5D=10&page%5Boffset%5D=${offset}`
      }
      const animeResults = await getAnimes(queryParams)
      if (animeResults) {
        if (animes) {
          const newAnimes = [...animes, ...animeResults.data]
          setResultsCount(newAnimes.length)
          setAnimes(newAnimes)
        } else {
          setResultsCount(animeResults.data.length)
          setAnimes(animeResults.data)
        }
        setTotalCount(animeResults.meta.count)
      }
      setLoading(false)
    }

    onSearchFilter()
    //eslint-disable-next-line
  }, [location, page])

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
    loading,
    animes,
    page,
    setPage,
    searchKeyword,
    totalCount,
    resultsCount,
    incrementPage,
    decrementPage,
  ] as [
    boolean,
    Anime[] | undefined,
    number,
    Dispatch<SetStateAction<number>>,
    string,
    number,
    number,
    () => void,
    () => void
  ]
}
