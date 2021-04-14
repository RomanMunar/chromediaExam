import { Episode } from './models/episode'
import { Anime } from './models/anime'
import { filterByUniqueField } from './utils'

interface LocalStorage {
  starredAnimes: Anime[]
  heartedAnimes: Anime[]
  watchedEpisodes: Episode[]
}

const getLocalStorageItem = (item: keyof LocalStorage) => {
  const items = JSON.parse(localStorage.getItem(item)!)
  return items ? items : setLocalStorageItem(item, [])
}

const setLocalStorageItem = (
  item: keyof LocalStorage,
  items: (Anime | Episode)[]
) => {
  localStorage.setItem(item, JSON.stringify(items))
  return items
}

export const getStarredAnimes = () => {
  return getLocalStorageItem('starredAnimes') as Anime[]
}

export const setStarredAnimes = (animes: Anime[]) => {
  const uniqueAnimes = filterByUniqueField(animes, 'id')
  return setLocalStorageItem('starredAnimes', uniqueAnimes) as Anime[]
}

export const addStarAnime = (anime: Anime) => {
  const starredAnimes = [...getStarredAnimes(), anime]
  return setStarredAnimes(starredAnimes)
}

export const removeStarAnime = (anime: Anime) => {
  const starredAnimes = filterByUniqueField(getStarredAnimes(), 'id')
  return setStarredAnimes(starredAnimes)
}

export const getHeartedAnimes = () => {
  return getLocalStorageItem('heartedAnimes') as Anime[]
}

export const setHeartedAnimes = (animes: Anime[]) => {
  const uniqueAnimes = filterByUniqueField(animes, 'id')
  return setLocalStorageItem('heartedAnimes', uniqueAnimes) as Anime[]
}

export const addHeartAnime = (anime: Anime) => {
  const heartedAnimes = [...getHeartedAnimes(), anime]
  return setHeartedAnimes(heartedAnimes)
}

export const removeHeartAnime = (anime: Anime) => {
  const heartedAnimes = filterByUniqueField(getHeartedAnimes(), 'id')
  return setHeartedAnimes(heartedAnimes)
}

export const getWatchedEpisodes = () => {
  return getLocalStorageItem('watchedEpisodes') as Episode[]
}

export const setWatchedEpisodes = (episodes: Episode[]) => {
  return setLocalStorageItem('watchedEpisodes', episodes) as Episode[]
}

export const addWatchedEpisode = (episode: Episode) => {
  const watchedEpisodes = [...getWatchedEpisodes(), episode]
  return setWatchedEpisodes(watchedEpisodes)
}

export const removeWatchedEpisode = (episode: Episode) => {
  const watchedEpisodes = filterByUniqueField(getWatchedEpisodes(), 'id')
  return setWatchedEpisodes(watchedEpisodes)
}
