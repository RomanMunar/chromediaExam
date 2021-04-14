import { useEffect, useState } from 'react'
import { getEpisodes } from '../fetchers'
import { Episode } from '../models/episode'

export const useGetEpisodes = (animeId: string) => {
  const [episodes, setEpisodes] = useState<Episode[]>()
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

  return { episodes, loading }
}
