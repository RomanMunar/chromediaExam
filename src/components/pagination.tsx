import clsx from 'clsx'
import { Chevron } from './icons'

interface PaginationProps {
  offset: number
  page: number
  pages?: number
  resultsCount: number
  setPage: (page: number) => void
}
const Pagination = ({
  offset,
  page,
  pages = 8,
  setPage,
  resultsCount,
}: PaginationProps) => {
  const incrementPage = () => {
    if (page === 0) {
      return
    }
    setPage(page + 1)
  }
  const decrementPage = () => {
    if (page === resultsCount / offset) {
      return
    }
    setPage(page - 1)
  }

  return (
    <div className="w-full">
      <div className="flex justify-between flex-1 sm:hidden">
        <button
          onClick={incrementPage}
          className="inline-flex items-center px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500"
        >
          Previous
        </button>
        <button
          onClick={decrementPage}
          className="inline-flex items-center px-4 py-2 ml-3 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-bold">{page + 1}</span> to{' '}
            <span className="font-bold">{page + 1 * offset}</span> of{' '}
            <span className="font-bold">{resultsCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className="z-0 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={decrementPage}
              className="inline-flex items-center px-2 py-2 text-sm font-bold text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <Chevron className="w-5 h-5" />
            </button>
            {new Array(pages).fill(undefined).map((_, idx) => (
              <button
                onClick={() => setPage(idx + 1)}
                key={idx}
                className={clsx(
                  page === idx
                    ? 'text-white bg-blue-700 hover:bg-blue-800'
                    : 'text-gray-700 bg-white hover:bg-gray-50',
                  'items-center px-4 py-2 text-sm font-bold border border-gray-300 '
                )}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={incrementPage}
              className="relative inline-flex items-center px-2 py-2 text-sm font-bold text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <Chevron className="w-5 h-5 transform rotate-180" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
