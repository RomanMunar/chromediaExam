export interface PaginationLinks {
  first: string
  next: string
  last: string
}

export interface Links {
  self?: string
  related?: string
}

export interface Relationship {
  [key: string]: { links: Links }
}

export interface Meta {
  count: string | number | null
}

export interface Titles {
  en?: string
  en_jp?: string
  ja_jp: string
  en_us?: string
}
