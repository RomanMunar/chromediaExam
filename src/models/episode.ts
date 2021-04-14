import { Links, Relationship, Titles } from './common'

export interface Episode {
  id: string
  type: string
  links: Links
  attributes: Attributes
  relationships: Relationship
}

interface Attributes {
  createdAt: string
  updatedAt: string
  synopsis: string
  description: string
  titles: Titles
  canonicalTitle: string
  seasonNumber: number
  number: number
  relativeNumber: number
  airdate: string
  length: number
  thumbnail: {
    original: string
  }
}
