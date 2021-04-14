import { Heart, Reset, Star } from '../../components/icons'
import { FilterType } from './HomeScreen'

interface FilterProps {
  onStarFilterClick: () => void
  onHeartFilterClick: () => void
  onResetFilterClick: () => void
  filter: FilterType
}

const Filter = ({
  onStarFilterClick,
  onHeartFilterClick,
  onResetFilterClick,
  filter,
}: FilterProps) => {
  return (
    <div className="flex space-x-2">
      <span>Filter: </span>
      <button onClick={onStarFilterClick}>
        <Star
          fill={filter === 'star' ? '#E6CB50' : 'none'}
          className="w-6 h-6 text-black"
        />
      </button>
      <button onClick={onHeartFilterClick}>
        <Heart
          fill={filter === 'heart' ? '#CB0202' : 'none'}
          className="w-6 h-6 text-black"
        />
      </button>
      <button onClick={onResetFilterClick}>
        <Reset className="w-6 h-6 text-black" />
      </button>
    </div>
  )
}

export default Filter
