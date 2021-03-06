import { useEffect, useRef, useState } from 'react'
import { Pagination } from '../../components'
import { AnimeCard } from '../../components/anime'
import { Reset } from '../../components/icons'
import Layout from '../../components/layout'
import { useFilter } from '../../hooks/useFilter'
import useIntersection from '../../hooks/useIntersection'
import { useSearch } from '../../hooks/useSearch'
import { Anime } from '../../models/anime'
import Filter from './Filter'
import SearchBar from './SearchBar'

export type FilterType = 'star' | 'heart' | 'none'

export interface PageConfig {
  totalCount: number
  offset?: number
  pages?: number
  page: number
  resultsCount: number
  setPage: (page: number) => void
}
const HomeScreen = () => {
  const [filter, setFilter] = useState<FilterType>('none')
  const [pageConfig, setPageConfig] = useState<PageConfig>()
  const [displayedAnimes, setDisplayedAnimes] = useState<Anime[]>()
  const [
    starredAnimes,
    starPage,
    setStarPage,
    starredAnimesTotalCount,
    starAnimesCount,
    incrementStarPage,
  ] = useFilter(filter, 'starredAnimes')
  const [
    heartedAnimes,
    heartPage,
    setHeartPage,
    heartedAnimesTotalCount,
    heartedAnimesCount,
    incrementHeartPage,
  ] = useFilter(filter, 'heartedAnimes')
  const [
    loading,
    searchedAnimes,
    searchPage,
    setSearchPage,
    searchKeyword,
    searchedAnimestotalCount,
    searchedAnimesCount,
    incrementSearchPage,
  ] = useSearch()
  const triggerNextPageElement = useRef<HTMLDivElement>(null)
  const intersection = useIntersection(triggerNextPageElement)
  useEffect(() => {
    setPageConfig({
      page: starPage,
      setPage: setStarPage,
      totalCount: starredAnimesTotalCount,
      resultsCount: starAnimesCount,
    })
    setDisplayedAnimes(starredAnimes)
    //eslint-disable-next-line
  }, [starPage, starredAnimes])

  useEffect(() => {
    setPageConfig({
      page: heartPage,
      setPage: setHeartPage,
      totalCount: heartedAnimesTotalCount,
      resultsCount: heartedAnimesCount,
    })
    setDisplayedAnimes(heartedAnimes)
    //eslint-disable-next-line
  }, [heartPage, heartedAnimes])

  useEffect(() => {
    setPageConfig({
      setPage: setSearchPage,
      page: searchPage,
      totalCount: searchedAnimestotalCount,
      resultsCount: searchedAnimesCount,
    })
    setDisplayedAnimes(searchedAnimes)
    //eslint-disable-next-line
  }, [searchPage, searchedAnimes])

  useEffect(() => {
    if (intersection) {
      if (intersection.isIntersecting) {
        if (filter === 'none') {
          incrementSearchPage()
        } else if (filter === 'star') {
          incrementStarPage()
        } else {
          incrementHeartPage()
        }
      }
    }
    //eslint-disable-next-line
  }, [intersection])

  return (
    <Layout>
      <div className="sticky top-0 z-50 flex-none bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between p-4 space-x-6">
            <Filter setFilter={setFilter} filter={filter} />
            <div className="flex-grow hidden w-full max-w-lg mx-auto md:block">
              <SearchBar />
            </div>
            <div className="font-medium">
              <span className="font-bold">
                {pageConfig ? pageConfig.resultsCount : 0}
              </span>{' '}
              Results
            </div>
          </div>
          <div className="flex-grow w-full max-w-lg p-4 mx-auto md:hidden">
            <SearchBar />
          </div>
        </div>
      </div>
      <div className="flex-grow pb-20 bg-blue-100 shadow-inner">
        <div className="bg-blue-100 shadow-inner">
          <div className="w-full max-w-6xl m-auto">
            {pageConfig && (
              <div className="px-4 py-2 space-y-4">
                <Pagination {...pageConfig} />
                {searchKeyword && (
                  <div>
                    Search Results for:{' '}
                    <h3 className="inline font-bold capitalize whitespace-nowrap text-md">
                      {searchKeyword}
                    </h3>
                  </div>
                )}
              </div>
            )}
            <div className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {displayedAnimes &&
                displayedAnimes.map((anime) => (
                  <AnimeCard anime={anime} key={anime.id} />
                ))}
              {loading &&
                new Array(8)
                  .fill(undefined)
                  .map((_, idx) => (
                    <div
                      className="w-full bg-gray-500 rounded shadow h-80 animate-pulse"
                      key={idx}
                    />
                  ))}
            </div>
            {displayedAnimes && displayedAnimes.length >= 0 && (
              <div className="h-20" ref={triggerNextPageElement}></div>
            )}
            {!loading && displayedAnimes && displayedAnimes.length <= 0 && (
              <div className="py-10 space-y-4">
                <h2 className="text-3xl font-bold text-center">
                  No Results Found
                </h2>
                <button
                  onClick={() => setFilter('none')}
                  className="flex px-3 py-2 mx-auto space-x-2 text-white bg-blue-600 rounded shadow-2xl"
                >
                  <Reset className="w-6 h-6" />
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
