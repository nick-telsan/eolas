import type { ItemsQuery } from 'types/graphql'

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
  return (
    <ul className="grid grid-cols-8">
      {items.map((item) => {
        return (
          <li key={item.id} className="col-span-1 px-2">
            <Link to={`${routes.view()}?id=${item.id}`}>
              {item.name || 'Unnamed Item'}
            </Link>
            <ul className="ml-4">
              {item.children.map((child) => {
                return (
                  <li key={child.id} className="col-span-1 px-2">
                    <Link to={`${routes.view()}?id=${child.id}`}>
                      {child.name || 'Unnamed Item'}
                    </Link>
                    <ul className="ml-4">
                      {child.children.map((grandchild) => {
                        return (
                          <li key={grandchild.id} className="col-span-1 px-2">
                            <Link to={`${routes.view()}?id=${grandchild.id}`}>
                              {grandchild.name || 'Unnamed Item'}
                            </Link>
                            <ul className="ml-4">
                              {grandchild.children.map((greatgrandchild) => {
                                return (
                                  <li
                                    key={greatgrandchild.id}
                                    className="col-span-1 px-2"
                                  >
                                    <Link
                                      to={`${routes.view()}?id=${
                                        greatgrandchild.id
                                      }`}
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
  )
}
