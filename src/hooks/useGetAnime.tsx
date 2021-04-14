import { useEffect, useState } from 'react'
import { getAnime } from '../fetchers'
import { Anime } from '../models/anime'

export const useGetAnime = (animeId: string) => {
  const [anime, setAnime] = useState<Anime>()
  const [loading, setLoading] = useState(true)

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

  return { loading, anime }
}
