import { Links } from './common'

export interface CharacterMeta {
  id: string
  type: string
  links: Links
  attributes: Attributes
  relationships: { [key: string]: { links: Links } }
}

export interface Attributes {
  createdAt: string
  updatedAt: string
  role: string
}
