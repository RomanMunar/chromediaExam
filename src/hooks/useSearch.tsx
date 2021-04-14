import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { getAnimes } from '../fetchers'
import { Anime } from '../models/anime'
import { useQuery } from '../utils'

export const useSearch = (filter: string) => {
  const location = useLocation()
  const query = useQuery()
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [resultsCount, setResultsCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [fetchedAnimes, setFetchedAnimes] = useState<Anime[]>()
  const [animes, setAnimes] = useState<Anime[]>()

  useEffect(() => {
    const onSearchFilter = async () => {
      setLoading(true)
      const offset = page ? page * 10 : 0
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
      const animes = await getAnimes(queryParams)
      if (animes) {
        setResultsCount(animes.data.length)
        setAnimes(animes.data)
        setFetchedAnimes(animes.data)
        setTotalCount(animes.meta.count)
      }
      setLoading(false)
    }

    onSearchFilter()
  }, [location, page])

  useEffect(() => {
    if (filter === 'none') {
      // set animes to the previous fetched ones
      setAnimes(fetchedAnimes)
    }
    //eslint-disable-next-line
  }, [filter])

  return {
    loading,
    searchKeyword,
    resultsCount,
    animes,
    page,
    totalCount,
    setAnimes,
    setResultsCount,
    setPage,
    incrementPage: () => setPage((p) => (p += 1)),
    decrementPage: () => setPage((p) => (p -= 1)),
    resetPage: () => setPage(0),
  }
  // eslint-disable-next-line
}
