import clsx from 'clsx'
import { useState } from 'react'
import { Check } from '../../components/icons'
import { Episode as EpisodeType } from '../../models/episode'
import {
  getWatchedEpisodes,
  removeWatchedEpisode,
  addWatchedEpisode,
} from '../../localStorage'

const Episode = ({ episode }: { episode: EpisodeType }) => {
  const [watched, setWatched] = useState(
    getWatchedEpisodes().find((e) => e.id === episode.id) ? true : false
  )

  const onEpisodeClick = () => {
    if (watched) {
      removeWatchedEpisode(episode)
      setWatched(false)
    } else {
      addWatchedEpisode(episode)
      setWatched(true)
    }
  }

  return (
    <div className='flex space-x-6'>
      <button onClick={onEpisodeClick}>
        <Check
          className={clsx(
            'w-5 h-5',
            watched ? 'text-green-600' : 'text-gray-700'
          )}
          strokeWidth='4'
        />
      </button>
      <span>{episode.attributes.airdate}</span>
      <span>
        {episode.attributes.number}:{' '}
        {episode.attributes.titles.en_us
          ? episode.attributes.titles.en_us
          : episode.attributes.titles.en_jp}
      </span>
    </div>
  )
}

export default Episode
