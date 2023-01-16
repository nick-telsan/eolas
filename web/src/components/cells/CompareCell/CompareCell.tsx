import type { compareItemsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { EditorBlock } from 'src/components/ui/EditorBlock'

export const QUERY = gql`
  query compareItemsQuery($items: [Int!]) {
    compareItems(items: $items) {
      id
      name
      body
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  compareItems,
}: CellSuccessProps<compareItemsQuery>) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {compareItems.map((item) => {
        return (
          <div key={item.id} className=" col-span-1">
            <EditorBlock
              state={item.body}
              readOnly
              type={item.name}
              namespace={item.id.toString()}
              callback={() => {}}
              id={item.id}
            />
          </div>
        )
      })}
    </div>
  )
}
