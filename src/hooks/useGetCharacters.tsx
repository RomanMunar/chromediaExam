import { useEffect, useState } from 'react'
import { getCharacters } from '../fetchers'
import { Character } from '../models/character'

export const useGetCharacters = (animeId: string) => {
  const [characters, setCharacters] = useState<Character[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCharacters = async () => {
      const characters = await getCharacters(parseInt(animeId))
      if (characters) {
        const charatersDatas = characters.map((c) => c!.data)
        if (charatersDatas) {
          setCharacters(charatersDatas)
        }
      }
      setLoading(false)
    }
    fetchCharacters()
  }, [animeId])

  return { loading, characters }
}
