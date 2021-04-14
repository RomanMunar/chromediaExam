import { useGetCharacters } from '../../../hooks/useGetCharacters'
import AnimeCharacterCard from '../characterCard'

const CharacterGridSection = ({ animeId }: { animeId: string }) => {
  const { loading, characters } = useGetCharacters(animeId)

  return (
    <section id="characters">
      <h2 className="mb-2 text-2xl font-bold">Characters</h2>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          new Array(8)
            .fill(undefined)
            .map((_, idx) => (
              <div
                className="w-full h-56 bg-gray-500 rounded shadow animate-pulse"
                key={idx}
              />
            ))
        ) : characters ? (
          characters.map((character) => (
            <AnimeCharacterCard character={character} key={character.id} />
          ))
        ) : (
          <h3 className="text-3xl text-center">No Characters Found</h3>
        )}
      </div>
    </section>
  )
}

export default CharacterGridSection
