import clsx from 'clsx'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  addStarAnime,
  getStarredAnimes,
  removeStarAnime,
} from '../../localStorage'
import { Anime } from '../../models/anime'
import { Heart, Star } from '../icons'

interface AnimeCardProps {
  anime: Anime
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  const history = useHistory()
  const [hovered, setHovered] = useState(false)
  const [starred, setStarred] = useState(
    getStarredAnimes().find((a) => a.id === anime.id) ? true : false
  )
  const onStarClick = () => {
    if (starred) {
      removeStarAnime(anime)
      setStarred(false)
    } else {
      addStarAnime(anime)
      setStarred(true)
    }
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className='relative w-full overflow-hidden duration-300 transform bg-black rounded shadow cursor-pointer h-80 hover:shadow-xl bg-opacity-40'
    >
      <Link to={`/anime/${anime.id}`}>
        <div
          style={{
            backgroundImage: `url(${anime.attributes.posterImage.small})`,
            willChange: 'transform', //removes the giggle at the end of the animation
          }}
          className={clsx(
            'h-full bg-center bg-no-repeat bg-contain transform transition',
            hovered ? 'scale-110' : 'scale-100'
          )}
        />
      </Link>
      <div className='absolute bottom-0 z-10 w-full p-4 bg-black bg-opacity-70 '>
        <h2 className='text-center text-white text-md line-clamp-2'>
          {anime.attributes.titles.en
            ? anime.attributes.titles.en
            : anime.attributes.titles.en_jp}
        </h2>
        <div className='flex items-center justify-around px-4 mt-2'>
          <div className='flex items-center'>
            <button onClick={onStarClick}>
              <Star
                fill={starred ? '#E6CB50' : 'none'}
                className='w-6 h-6 text-white'
              />
            </button>
            <span className='text-sm text-white'>
              {anime.attributes.averageRating}
            </span>
          </div>
          <div className='flex items-center'>
            <Heart className='w-6 h-6 text-white' />
            <span className='text-sm text-white'>
              {anime.attributes.favoritesCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimeCard
