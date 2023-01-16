import { useState } from 'react'

import type { ItemsQuery } from 'types/graphql'

import { Link as RWLink } from '@redwoodjs/router'
import { routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link } from 'src/components/ui/Link'

export const QUERY = gql`
  query ItemsQuery {
    items {
      id
      name
      children {
        id
        name
        children {
          id
          name
          children {
            id
            name
          }
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ items }: CellSuccessProps<ItemsQuery>) => {
  const [selected, setSelected] = useState<number[]>([])

  const handleChange = (value: number) => {
    const itemInArray = selected.includes(value)

    if (itemInArray) {
      const filteredArray = selected.filter((item) => item !== value)
      setSelected(filteredArray)
    } else {
      setSelected([...selected, value])
    }
  }

  return (
    <div className="relative">
      {selected.length > 0 && (
        <RWLink
          to={routes.compare({ ids: selected.toString() })}
          className="absolute top-[-55px] rounded-md border-2 border-matcha bg-matcha px-2 py-1"
        >
          Compare
        </RWLink>
      )}
      <ul className="grid list-none grid-cols-4">
        {items.map((item) => {
          return (
            <li key={item.id} className="col-span-1 px-2">
              <Link to={routes.view({ id: item.id })}>
                {item.name || 'Unnamed Item'}
              </Link>
              <ul className="ml-4 list-none">
                {item.children.map((child) => {
                  return (
                    <li key={child.id} className="px-2">
                      <Link to={routes.view({ id: child.id })}>
                        {child.name || 'Unnamed Item'}
                      </Link>
                      <ul className="ml-4 list-none">
                        {child.children.map((grandchild) => {
                          return (
                            <li key={grandchild.id} className="px-2">
                              <input
                                className="mr-2"
                                type="checkbox"
                                value={grandchild.id}
                                onChange={() => handleChange(grandchild.id)}
                                checked={selected.includes(grandchild.id)}
                              />
                              <Link to={routes.view({ id: grandchild.id })}>
                                {grandchild.name || 'Unnamed Item'}
                              </Link>
                              <ul className="ml-4 list-none">
                                {grandchild.children.map((greatgrandchild) => {
                                  return (
                                    <li
                                      key={greatgrandchild.id}
                                      className="px-2"
                                    >
                                      <Link
                                        to={routes.view({
                                          id: greatgrandchild.id,
                                        })}
                                      >
                                        {greatgrandchild.name || 'Unnamed Item'}
                                      </Link>
                                    </li>
                                  )
                                })}
                              </ul>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
