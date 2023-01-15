import type { ItemsQuery } from 'types/graphql'

import { routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link } from 'src/components/ui/Link'

export const QUERY = gql`
  query ItemsQuery {
    items {
      id
      name
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
    <ul className="text-center grid grid-cols-8">
      {items.map((item) => {
        return (
          <li key={item.id} className="mb-2 px-2 col-span-1">
            <Link to={`${routes.view()}?id=${item.id}`}>
              {item.name || 'Unnamed Item'}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
