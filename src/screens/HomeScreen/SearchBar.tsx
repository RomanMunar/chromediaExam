import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router'
import { Search } from '../../components/icons'

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('')
  const history = useHistory()
  const onSearchSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (searchInput && searchInput !== '') {
      history.push('?filter[text]=' + searchInput)
      setSearchInput('')
    }
  }

  return (
    <form className="relative" onSubmit={onSearchSubmit}>
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full h-10 pl-10 border rounded-full shadow focus:outline-none focus:ring-2 ring-blue-400"
        placeholder="Search for an anime Ex. Attack on Titan..."
        type="text"
      />
      <Search className="absolute  w-6 h-6 top-2.5 left-2" />
      <button
        type="submit"
        className="absolute top-0 right-0 flex h-10 px-3 py-2 mx-auto space-x-2 text-white bg-blue-600 rounded-full focus:outline-none focus:ring-2 ring-blue-400"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar
