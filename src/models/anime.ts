import { Titles, Relationship } from './common'

export interface Anime {
  id: string
  type: string
  links: {
    self: string
  }
  attributes: Attributes
  relationships: { [key: string]: { links: Relationship } }
}

export interface Attributes {
  createdAt: string
  updatedAt: string
  slug: string
  synopsis: string
  description: string
  coverImageTopOffset: number
  titles: Titles
  canonicalTitle: string
  abbreviatedTitles: string[]
  averageRating: string
  ratingFrequencies: { [key: string]: string }
  userCount: number
  favoritesCount: number
  startDate: string
  endDate: string
  nextRelease: null
  popularityRank: number
  ratingRank: number
  ageRating: 'PG' | 'R'
  ageRatingGuide: string
  subtype: 'TV' | 'movie'
  status: 'finished'
  tba?: string
  posterImage: Image
  coverImage?: Image
  episodeCount: number
  episodeLength?: number
  totalLength: number
  youtubeVideoId: string
  showType: 'TV' | 'movie'
  nsfw: boolean
}

export interface Image {
  tiny: string
  small: string
  large: string
  original: string
  meta: {
    dimensions: Dimensions
  }
}

export interface Dimensions {
  tiny: Dimension
  small: Dimension
  large: Dimension
  medium?: Dimension
}

export interface Dimension {
  width: number
  height: number
}
