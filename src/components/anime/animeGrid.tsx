import { AnimeCard } from '.'
import { Anime } from '../../models/anime'

const AnimeGrid = ({ animes }: { animes: Anime[] }) => {
  return animes.map((anime) => <AnimeCard anime={anime} key={anime.id} />)
}

export default AnimeGrid
