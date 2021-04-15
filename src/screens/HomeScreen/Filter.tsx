import { Heart, Reset, Star } from '../../components/icons'
import { FilterType } from './HomeScreen'

interface FilterProps {
  setFilter: (filter: FilterType) => void
  filter: FilterType
}

const Filter = ({ setFilter, filter }: FilterProps) => {
  const onStarFilterClick = () => {
    if (filter === 'star') return setFilter('none') //toggle filter
    setFilter('star')
  }

  const onHeartFilterClick = () => {
    if (filter === 'heart') return setFilter('none') //toggle filter
    setFilter('heart')
  }
  const onResetClick = () => {
    setFilter('none')
  }

  return (
    <div className="flex space-x-2">
      <span>Filter: </span>
      <button title="Go to your starred animes" onClick={onStarFilterClick}>
        <Star
          fill={filter === 'star' ? '#E6CB50' : 'none'}
          className="w-6 h-6 text-black"
        />
      </button>
      <button title="Go to your hearted animes" onClick={onHeartFilterClick}>
        <Heart
          fill={filter === 'heart' ? '#CB0202' : 'none'}
          className="w-6 h-6 text-black"
        />
      </button>
      <button title="Go back previous results" onClick={onResetClick}>
        <Reset className="w-6 h-6 text-black" />
      </button>
    </div>
  )
}

export default Filter
