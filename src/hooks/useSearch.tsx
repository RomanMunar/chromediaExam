import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
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
  const [previousAnimes, setFetchedAnimes] = useState<Anime[]>()
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
      const animes = await getAnimes(queryParams)
      if (animes) {
        setResultsCount(animes.data.length)
        setTotalCount(animes.meta.count)
        setAnimes(animes.data)
        setFetchedAnimes(animes.data)
      }
      setLoading(false)
    }

    onSearchFilter()
    //eslint-disable-next-line
  }, [location, page])

  return [
    loading,
    animes,
    previousAnimes,
    page,
    setPage,
    searchKeyword,
    totalCount,
    resultsCount,
  ] as [
    boolean,
    Anime[] | undefined,
    Anime[] | undefined,
    number,
    (page?: number) => void,
    string,
    number,
    number
  ]
}
