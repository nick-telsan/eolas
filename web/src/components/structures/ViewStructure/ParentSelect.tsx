import { useEffect, useState } from 'react'

import { useLazyQuery } from '@apollo/client'

type ParentSelectType = {
  id?: number
  name: string
  setParent: (name: string) => void
  callback: (value: number) => void
  disabled?: boolean
}

export const ITEMS_BY_NAME_QUERY = gql`
  query ItemsByName($name: String!, $id: Int) {
    itemsByName(name: $name, id: $id) {
      id
      name
    }
  }
`

export const ParentSelect = ({
  id,
  name = '',
  callback,
  setParent,
  disabled = false,
}: ParentSelectType) => {
  const [flyoutOpen, setFlyoutOpen] = useState(false)
  const [itemsByName, { loading, data }] = useLazyQuery(ITEMS_BY_NAME_QUERY)

  useEffect(() => {
    itemsByName({
      variables: {
        id,
        name,
      },
    })
  }, [id, name, itemsByName])

  const handleFocus = () => {
    if (disabled) {
      return
    }

    setFlyoutOpen(true)
  }

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
        className="w-[300px] rounded-md border-2 border-matcha bg-transparent px-2 text-lg text-whip-cream outline-none placeholder:italic placeholder:text-whip-cream focus:border-mint"
        type="text"
        value={name}
        onChange={(event) => handleSearch(event.target.value)}
        onFocus={handleFocus}
        placeholder="Parent"
        disabled={disabled}
      />
      {flyoutOpen && (
        <div className="absolute top-2 right-2 z-10 w-[225px] rounded-md border-2 border-matcha bg-chocolate p-2">
          {loading && <p className="text-lg">Searching...</p>}
          {data && data.itemsByName.length > 0 ? (
            <>
              <div className="flex max-h-[200px] flex-col justify-start overflow-scroll">
                {data.itemsByName.map((datum) => (
                  <button
                    className="text-left text-lg"
                    key={datum.id}
                    onClick={() => handleSelect(datum.name, datum.id)}
                  >
                    {datum.name}
                  </button>
                ))}
              </div>
              <button
                className="text-left text-lg"
                onClick={() => handleSelect(name, undefined)}
              >
                Close
              </button>
            </>
          ) : (
            <p className="text-lg">No results</p>
          )}
        </div>
      )}
    </div>
  )
}
