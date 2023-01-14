import type { FindItemQuery, FindItemQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { ViewStructure } from 'src/components/structures/ViewStructure'

export const QUERY = gql`
  query FindItemQuery($id: Int) {
    item: item(id: $id) {
      id
      name
      body
      philosophy
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <ViewStructure />
}

export const Failure = ({
  error,
}: CellFailureProps<FindItemQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  item,
}: CellSuccessProps<FindItemQuery, FindItemQueryVariables>) => {
  return (
    <ViewStructure
      id={item.id}
      name={item.name || ''}
      body={item.body || ''}
      philosophy={item.philosophy || ''}
    />
  )
}
