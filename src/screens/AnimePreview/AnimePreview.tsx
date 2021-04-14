import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { ArrowBack } from '../../components/icons'
import { getAnime } from '../../fetchers'
import { Anime } from '../../models/anime'
import { LeftContainer } from './leftContainer'
import { EpisodesSection } from './sections'
import CharacterGridSection from './sections/CharacterSection'

const AnimePreview = () => {
  const { animeId } = useParams<{ animeId: string }>()
  const [anime, setAnime] = useState<Anime>()
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    const fetchAnime = async () => {
      const anime = await getAnime(animeId)
      if (anime) {
        setAnime(anime.data)
      }
      setLoading(false)
    }
    fetchAnime()
  }, [animeId])

  return (
    <div className='min-h-screen pb-40 bg-blue-50'>
      {loading ? (
        <div className='p-40 text-3xl text-center'>Loading ...</div>
      ) : anime ? (
        <>
          <div className='m-auto mb-5 max-w-7xl'>
            <h1 className='pt-5 pb-2 text-4xl font-bold text-center'>
              {anime.attributes.titles.en
                ? anime.attributes.titles.en
                : anime.attributes.titles.en_jp}
            </h1>
            <button
              onClick={() => history.push('/')}
              className='flex items-center p-2'
            >
              <ArrowBack className='w-7 h-7 ' />
              <span className='font-bold'>Back</span>
            </button>
          </div>
          <div className='flex flex-col m-auto space-y-5 md:space-x-10 md:flex-row max-w-7xl'>
            <LeftContainer anime={anime} />
            <div className='flex flex-col flex-grow p-4 space-y-8'>
              <section id='synopsis'>
                <h2 className='mb-2 text-2xl font-bold'>Synopsis</h2>
                <div>{anime.attributes.synopsis}</div>
              </section>
              <CharacterGridSection animeId={animeId} />
              <EpisodesSection animeId={animeId} />
            </div>
          </div>
        </>
      ) : (
        <div className='p-40 text-3xl text-center'>No Anime Found</div>
      )}
    </div>
  )
}

export default AnimePreview
