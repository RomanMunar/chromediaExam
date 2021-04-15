import { Episode } from './models/episode'
import { Anime } from './models/anime'
import { filterByUniqueField } from './utils'

interface LocalStorage {
  starredAnimes: Anime[]
  heartedAnimes: Anime[]
  watchedEpisodes: Episode[]
}

export type FilterId = keyof LocalStorage

interface Controller<T> {
  id: FilterId
  get: () => T[]
  set: (items: T[]) => T[]
  add: (item: T) => T[]
  remove: (item: T) => T[]
}

export const StarController: Controller<Anime> = {
  id: 'starredAnimes',
  get: getStarredAnimes,
  set: setStarredAnimes,
  add: addStarAnime,
  remove: removeStarAnime,
}

export const HeartController: Controller<Anime> = {
  id: 'heartedAnimes',
  get: getHeartedAnimes,
  set: setHeartedAnimes,
  add: addHeartAnime,
  remove: removeHeartAnime,
}

const getLocalStorageItem = (item: FilterId) => {
  const items = JSON.parse(localStorage.getItem(item)!)
  return items ? items : setLocalStorageItem(item, [])
}

const setLocalStorageItem = (item: FilterId, items: (Anime | Episode)[]) => {
  localStorage.setItem(item, JSON.stringify(items))
  return items
}

export function getStarredAnimes() {
  return getLocalStorageItem('starredAnimes') as Anime[]
}

export function setStarredAnimes(animes: Anime[]) {
  const uniqueAnimes = filterByUniqueField(animes, 'id')
  return setLocalStorageItem('starredAnimes', uniqueAnimes) as Anime[]
}

export function addStarAnime(anime: Anime) {
  const starredAnimes = [...getStarredAnimes(), anime]
  return setStarredAnimes(starredAnimes)
}

export function removeStarAnime(anime: Anime) {
  const starredAnimes = filterByUniqueField(getStarredAnimes(), 'id')
  return setStarredAnimes(starredAnimes)
}

export function getHeartedAnimes() {
  return getLocalStorageItem('heartedAnimes') as Anime[]
}

export function setHeartedAnimes(animes: Anime[]) {
  const uniqueAnimes = filterByUniqueField(animes, 'id')
  return setLocalStorageItem('heartedAnimes', uniqueAnimes) as Anime[]
}

export function addHeartAnime(anime: Anime) {
  const heartedAnimes = [...getHeartedAnimes(), anime]
  return setHeartedAnimes(heartedAnimes)
}

export function removeHeartAnime(anime: Anime) {
  const heartedAnimes = filterByUniqueField(getHeartedAnimes(), 'id')
  return setHeartedAnimes(heartedAnimes)
}

export function getWatchedEpisodes() {
  return getLocalStorageItem('watchedEpisodes') as Episode[]
}

export function setWatchedEpisodes(episodes: Episode[]) {
  return setLocalStorageItem('watchedEpisodes', episodes) as Episode[]
}

export function addWatchedEpisode(episode: Episode) {
  const watchedEpisodes = [...getWatchedEpisodes(), episode]
  return setWatchedEpisodes(watchedEpisodes)
}

export function removeWatchedEpisode(episode: Episode) {
  const watchedEpisodes = filterByUniqueField(getWatchedEpisodes(), 'id')
  return setWatchedEpisodes(watchedEpisodes)
}
