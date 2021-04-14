import { Anime } from '../../models/anime'
import { Heart, Star } from '../../components/icons'

const LeftContainer = ({ anime }: { anime: Anime }) => {
  return (
    <div className='flex flex-col flex-none space-y-5'>
      <img
        className='w-72'
        src={anime.attributes.posterImage.small}
        alt={`${anime.attributes.titles.en_jp} Poster`}
      />
      <div className='flex items-center'>
        <Star fill='#E6CB50' className='w-6 h-6 mr-1' />
        <span className='text-blue-900'>
          {anime.attributes.averageRating} from {anime.attributes.userCount}{' '}
          users
        </span>
      </div>
      <div className='flex items-center space-x-5'>
        <div className='flex items-center'>
          <Heart fill='#CB0202' className='w-6 h-6 mr-1' />
          <span className='text-blue-900'>
            {anime.attributes.favoritesCount}
          </span>
        </div>
        <span>
          Rank{' '}
          <span className='text-blue-900'>
            #{anime.attributes.popularityRank}
          </span>
        </span>
      </div>
      <p>
        Rated:{' '}
        <span className='text-blue-900'>
          {anime.attributes.ageRating} {anime.attributes.ageRatingGuide}
        </span>
      </p>
      <p>
        Aired on:{' '}
        <span className='text-blue-900'>{anime.attributes.startDate}</span>
      </p>
      <p>
        Ongoing or Ended on:{' '}
        <span className='text-blue-900'>{anime.attributes.endDate}</span>
      </p>
      <p className='capitalize'>
        Type: <span className='text-blue-900'>{anime.attributes.showType}</span>
      </p>
    </div>
  )
}

export { LeftContainer }
