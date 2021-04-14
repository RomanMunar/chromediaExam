import { useEffect, useState } from 'react'
import { Episode as EpisodeType } from '../../../models/episode'
import { getEpisodes } from '../../../fetchers'
import Episode from '../episode'

const EpisodesContainer = ({ animeId }: { animeId: string }) => {
  const [episodes, setEpisodes] = useState<EpisodeType[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEpisodes = async () => {
      const episodes = await getEpisodes(parseInt(animeId))
      if (episodes) {
        setEpisodes(episodes.data)
      }
      setLoading(false)
    }

    fetchEpisodes()
  }, [animeId])

  return (
    <section id='episodes'>
      <h2 className='mb-2 text-2xl font-bold'>Episodes</h2>
      <div className='flex flex-col space-y-2'>
        {loading ? (
          new Array(5)
            .fill(undefined)
            .map((_, idx) => (
              <div
                className='w-full bg-gray-700 rounded shadow animate-pulse h-14'
                key={idx}
              />
            ))
        ) : episodes ? (
          episodes.map((episode) => (
            <Episode episode={episode} key={episode.id} />
          ))
        ) : (
          <h3 className='h-10 text-3xl text-center'>No Episodes Found</h3>
        )}
      </div>
    </section>
  )
}

export default EpisodesContainer
