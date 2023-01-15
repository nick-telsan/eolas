import { useEffect, useState } from 'react'

import { useLazyQuery } from '@apollo/client'

type ParentSelectType = {
  defaultName?: string
  callback: (value: number) => void
}

export const ITEMS_BY_NAME_QUERY = gql`
  query ItemsByName($name: String!) {
    itemsByName(name: $name) {
      id
      name
    }
  }
`

export const ParentSelect = ({ defaultName, callback }: ParentSelectType) => {
  const [search, setSearch] = useState<string | undefined>(defaultName)
  const [flyoutOpen, setFlyoutOpen] = useState(false)
  const [itemsByName, { loading, data }] = useLazyQuery(ITEMS_BY_NAME_QUERY)

  useEffect(() => {
    itemsByName({
      variables: {
        name: search || '',
      },
    })
  }, [search, itemsByName])

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const handleSelect = (name: string, id: number | undefined) => {
    setSearch(name)
    callback(id)
    setFlyoutOpen(false)
  }

  return (
    <div className="relative">
      <input
        className="bg-transparent outline-none border-matcha border-2 rounded-md text-lg focus:border-mint px-2 w-[300px]"
        type="text"
        value={search}
        onChange={(event) => handleSearch(event.target.value)}
        onFocus={() => setFlyoutOpen(true)}
      />
      {flyoutOpen && (
        <div className="absolute z-10 bg-chocolate border-matcha border-2 p-2 rounded-md top-2 right-2 w-[200px]">
          {loading && <p className="text-lg">Searching...</p>}
          {data && data.itemsByName.length > 0 ? (
            <div className="flex flex-col justify-start">
              {data.itemsByName.map((datum) => (
                <button
                  className="text-left text-lg"
                  key={datum.id}
                  onClick={() => handleSelect(datum.name, datum.id)}
                >
                  {datum.name}
                </button>
              ))}
              <button
                className="text-left text-lg"
                onClick={() => handleSelect('', undefined)}
              >
                Close
              </button>
            </div>
          ) : (
            <p className="text-lg">No results</p>
          )}
        </div>
      )}
    </div>
  )
}
