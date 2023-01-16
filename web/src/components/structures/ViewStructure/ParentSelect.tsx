import { useEffect, useState } from 'react'

import { useLazyQuery } from '@apollo/client'

type ParentSelectType = {
  name: string
  setParent: (name: string) => void
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

export const ParentSelect = ({
  name,
  callback,
  setParent,
}: ParentSelectType) => {
  const [flyoutOpen, setFlyoutOpen] = useState(false)
  const [itemsByName, { loading, data }] = useLazyQuery(ITEMS_BY_NAME_QUERY)

  useEffect(() => {
    itemsByName({
      variables: {
        name: name,
      },
    })
  }, [name, itemsByName])

  const handleSearch = (value: string) => {
    setParent(value)
  }

  const handleSelect = (name: string, id: number | undefined) => {
    setParent(name)
    callback(id)
    setFlyoutOpen(false)
  }

  return (
    <div className="relative">
      <input
        className="w-[300px] rounded-md border-2 border-matcha bg-transparent px-2 text-lg outline-none focus:border-mint"
        type="text"
        value={name}
        onChange={(event) => handleSearch(event.target.value)}
        onFocus={() => setFlyoutOpen(true)}
        placeholder="Parent"
      />
      {flyoutOpen && (
        <div className="absolute top-2 right-2 z-10 w-[200px] rounded-md border-2 border-matcha bg-chocolate p-2">
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
