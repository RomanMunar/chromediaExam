import clsx from 'clsx'
import { useState } from 'react'
import { Modal } from '../../components'
import { Character } from '../../models/character'

const AnimeCharacterCard = ({ character }: { character: Character }) => {
  const [hovered, setHovered] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Modal isOpen={isModalOpen} setOpen={setModalOpen}>
        <div className="rounded-md shadow-2xl bg-blue-50">
          <h2 className="p-4 text-2xl font-bold text-center whitespace-nowrap">
            {character.attributes.name}
          </h2>
          <div className="flex flex-row justify-center space-x-4 bg-blue-100 shadow-inner">
            <div className="sticky top-0 flex-none hidden w-48 p-4 md:block">
              {character.attributes.image &&
              character.attributes.image.original ? (
                <div
                  style={{
                    backgroundImage: `url(${character.attributes.image.original})`,
                    willChange: 'transform', //removes the giggle at the end of the animation
                  }}
                  className={clsx(
                    'h-80 bg-center bg-no-repeat bg-contain transform transition',
                    hovered ? 'scale-110' : 'scale-100'
                  )}
                />
              ) : (
                <h3 className="text-2xl font-bold text-center">No Image</h3>
              )}
            </div>
            <div
              style={{ height: '400px' }}
              className="w-screen p-2 px-4 overflow-auto text-sm md:w-auto"
              dangerouslySetInnerHTML={{
                __html: character.attributes.description,
              }}
            />
          </div>
        </div>
      </Modal>
      <button
        onClick={() => setModalOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative w-full h-56 overflow-hidden duration-300 transform bg-black rounded shadow cursor-pointer hover:shadow-xl bg-opacity-40"
      >
        {character.attributes.image && character.attributes.image.original ? (
          <div
            style={{
              backgroundImage: `url(${character.attributes.image.original})`,
              willChange: 'transform', //removes the giggle at the end of the animation
            }}
            className={clsx(
              'h-full bg-center bg-no-repeat bg-contain transform transition',
              hovered ? 'scale-110' : 'scale-100'
            )}
          />
        ) : (
          <h3 className="text-2xl font-bold text-center">No Image</h3>
        )}
        <div className="absolute bottom-0 w-full p-4 text-lg text-center text-white transition transform bg-black bg-opacity-70">
          <h2 className="line-clamp-1">{character.attributes.name}</h2>
        </div>
      </button>
    </>
  )
}

export default AnimeCharacterCard
