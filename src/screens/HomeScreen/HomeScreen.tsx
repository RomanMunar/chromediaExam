import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { AnimeCard } from '../../components/anime'
import { Reset } from '../../components/icons'
import Layout from '../../components/layout'
import { getAnimes } from '../../fetchers'
import { getHeartedAnimes, getStarredAnimes } from '../../localStorage'
import { Anime } from '../../models/anime'
import { useQuery } from '../../utils'
import Filter from './Filter'
import SearchBar from './SearchBar'

export type FilterType = 'star' | 'heart' | 'none'

const HomeScreen = () => {
  const [displayedAnimes, setDisplayedAnimes] = useState<Anime[]>()
  const [fetchedAnimes, setFetchedAnimes] = useState<Anime[]>()
  const [filter, setFilter] = useState<FilterType>('none')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [resultsCount, setResultsCount] = useState(0)
  const location = useLocation()
  const query = useQuery()

  const onStarFilterClick = () => {
    if (filter === 'star') return setFilter('none') //toggle filter
    setFilter('star')
    setDisplayedAnimes(getStarredAnimes())
  }

  const onHeartFilterClick = () => {
    if (filter === 'heart') return setFilter('none') //toggle filter
    setFilter('heart')
    setDisplayedAnimes(getHeartedAnimes())
  }

  const incrementPage = () => setPage((p) => (p += 1))
  const decrementPage = () => setPage((p) => (p -= 1))

  useEffect(() => {
    if (filter === 'none') {
      setDisplayedAnimes(fetchedAnimes) // cached animes from initial fetch
    }

    if (filter === 'star') {
      const starredAnimes = getStarredAnimes()
      setResultsCount(starredAnimes.length)
      setDisplayedAnimes(starredAnimes)
    }
    if (filter === 'heart') {
      const heartedAnimes = getHeartedAnimes()
      setResultsCount(heartedAnimes.length)
      setDisplayedAnimes(heartedAnimes)
    }
    // eslint-disable-next-line
  }, [filter])

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
        setDisplayedAnimes(animes.data)
        setFetchedAnimes(animes.data)
      }
      setLoading(false)
    }
    onSearchFilter()
    // eslint-disable-next-line
  }, [location, page])

  return (
    <Layout>
      <div className='sticky top-0 z-50 flex-none bg-blue-50'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex items-center justify-between p-4 space-x-6'>
            <Filter
              onResetFilterClick={() => setFilter('none')}
              onStarFilterClick={onStarFilterClick}
              onHeartFilterClick={onHeartFilterClick}
              filter={filter}
            />
            <div className='flex-grow hidden w-full max-w-lg mx-auto md:block'>
              <SearchBar />
            </div>
            <div className='font-medium'>
              <span className='font-bold'>{resultsCount}</span> Results
            </div>
          </div>
          <div className='flex-grow w-full max-w-lg p-4 mx-auto md:hidden'>
            <SearchBar />
          </div>
        </div>
      </div>
      <div className='flex-grow pb-40 bg-blue-100 shadow-inner'>
        <div className='bg-blue-100 shadow-inner'>
          <div className='w-full max-w-6xl m-auto'>
            <div className='flex items-center w-full p-4'>
              {searchKeyword && (
                <div>
                  Search Results for:{' '}
                  <h3 className='inline font-bold capitalize whitespace-nowrap text-md'>
                    {searchKeyword}
                  </h3>
                </div>
              )}
              <div className='flex items-center ml-auto'>
                <button
                  onClick={decrementPage}
                  className='flex px-3 py-1.5 mx-auto text-blue-900 border border-blue-600 rounded-md rounded-r-none'
                >
                  Prev
                </button>
                <button
                  onClick={incrementPage}
                  className='flex px-3 py-1.5 mx-auto text-white bg-blue-600 border border-blue-600 rounded-md rounded-l-none shadow-2xl'
                >
                  Next
                </button>
              </div>
            </div>
            <div className='grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
              {loading
                ? new Array(8)
                    .fill(undefined)
                    .map((_, idx) => (
                      <div
                        className='w-full bg-gray-500 rounded shadow h-80 animate-pulse'
                        key={idx}
                      />
                    ))
                : displayedAnimes &&
                  displayedAnimes.map((anime) => (
                    <AnimeCard anime={anime} key={anime.id} />
                  ))}
            </div>
            {!loading && !displayedAnimes && (
              <div className='py-10 space-y-4'>
                <h2 className='text-3xl font-bold text-center'>
                  No Results Found
                </h2>
                <button
                  onClick={() => setFilter('none')}
                  className='flex px-3 py-2 mx-auto space-x-2 text-white bg-blue-600 rounded shadow-2xl'
                >
                  <Reset className='w-6 h-6' />
                  <span>Reset Filters</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomeScreen
