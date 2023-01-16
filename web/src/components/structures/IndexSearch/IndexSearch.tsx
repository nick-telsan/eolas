import { useState } from 'react'

import { useLazyQuery } from '@apollo/client'

import { routes } from '@redwoodjs/router'

import ItemsCell from 'src/components/cells/ItemsCell'
import { Link } from 'src/components/ui/Link'

import { ITEMS_SEARCH_QUERY } from './graphql'

export const IndexSearch = () => {
  const [search, setSearch] = useState('')
  const [itemsSearch, { loading, data }] = useLazyQuery(ITEMS_SEARCH_QUERY)

  const onSearch = () => {
    itemsSearch({
      variables: {
        search,
      },
    })
  }

  return (
    <>
      <div className="mb-4 flex w-full flex-col items-center">
        <label htmlFor="search" className="font-overlock text-lg">
          Search for stuff!
        </label>
        <div className="relative h-10 w-full min-w-[300px] max-w-[600px] rounded-md border-2 border-matcha focus-within:border-mint">
          <input
            className="w-full bg-transparent p-2 outline-none"
            id="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button
            onClick={onSearch}
            className="absolute right-0 h-9 rounded-l-md border-2 border-matcha bg-matcha px-2 outline-none focus:border-mint"
          >
            Search
          </button>
        </div>
      </div>

      {data && search ? (
        <>
          {loading && <p className="text-center">Searching...</p>}
          {data.itemsSearch.length ? (
            <ul className="grid grid-cols-8">
              {data.itemsSearch.map((item) => {
                return (
                  <li key={item.id} className="col-span-1 px-2">
                    <Link to={`${routes.view()}?id=${item.id}`}>
                      {item.name || 'Unnamed Item'}
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <>
              <p className="text-center text-red-500">No items found</p>
              <p className="text-center">Search terms are case sensitive.</p>
            </>
          )}
        </>
      ) : (
        <div>
          <ItemsCell />
        </div>
      )}
    </>
  )
}
