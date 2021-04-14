import { Anime } from './anime'
import { Character } from './character'
import { Episode } from './episode'
import { CharacterMeta } from './charactersMeta'
import { Meta, PaginationLinks } from './common'

export interface AnimeResponse {
  data: Anime
}

export interface CharacterResponse {
  data: Character
}

export interface AnimesResponse {
  data: Anime[]
  meta: {
    count: number
  }
  links: PaginationLinks
}

export interface EpisodesResponse {
  data: Episode[]
  meta: Meta
  links: PaginationLinks
}

export interface CharactersResponse {
  data: CharacterMeta[]
  meta: Meta
  links: PaginationLinks
}
