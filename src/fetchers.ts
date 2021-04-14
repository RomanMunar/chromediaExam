import axios from 'axios'
import {
  AnimesResponse,
  AnimeResponse,
  CharacterResponse,
  EpisodesResponse,
  CharactersResponse,
} from './models/responses'

axios.defaults.baseURL = 'https://kitsu.io/api/edge'

export const getAnimes = async (query?: string) => {
  try {
    const data = (await axios
      .get(`/anime/${query}`)
      .then((res) => res.data)) as AnimesResponse
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getAnime = async (animeId: string | number) => {
  try {
    const data = (await axios
      .get(`/anime/${animeId}`)
      .then((res) => res.data)) as AnimeResponse
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getCharacters = async (animeId: number) => {
  const getCharacterIds = async () => {
    const characterIds = await getCharactersMeta(animeId).then((res) =>
      res?.data.map((d) => d.id)
    )
    return characterIds
  }
  const ids = await getCharacterIds()
  if (ids) {
    const characters = await Promise.all(
      ids.map(async (id) => await getCharacter(parseInt(id)))
    )
    return characters
  }
}

export const getCharactersMeta = async (animeId: number) => {
  try {
    const data = (await axios
      .get(`/anime/${animeId}/characters`)
      .then((res) => res.data)) as CharactersResponse
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getCharacter = async (characterId: number) => {
  try {
    const data = (await axios
      .get(`/media-characters/${characterId}/character`)
      .then((res) => res.data)) as CharacterResponse
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getEpisodes = async (animeId: number) => {
  try {
    const data = (await axios
      .get(`/anime/${animeId}/episodes`)
      .then((res) => res.data)) as EpisodesResponse
    return data
  } catch (error) {
    console.error(error)
  }
}
