import { useLocation } from 'react-router'

export const filterByUniqueField = <T>(array: T[], field: keyof T) => {
  const displayedResults: T[] = []
  array.filter(function (item) {
    return displayedResults.findIndex((x) => x[field] === item[field]) === -1
      ? displayedResults.push(item)
      : null
  })
  return displayedResults
}

export const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}
