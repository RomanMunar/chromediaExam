import { Links } from './common'

export interface Character {
  id: string
  type: string
  links: Links
  attributes: Attributes
  relationships: { [key: string]: { links: Links } }
}

interface Attributes {
  createdAt: string
  updatedAt: string
  slug: string
  names: Names
  canonicalName: string
  otherNames: any[]
  name: string
  malId: number
  description: string
  image?: Image
}

interface Image {
  original?: string
}

interface Names {
  en?: string
  en_jp?: string
  ja_jp: string
}
