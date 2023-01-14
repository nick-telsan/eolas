import type { CommentsByItemQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { CommentsStructure } from 'src/components/structures/CommentsStructure/CommentsStructure'

export const QUERY = gql`
  query CommentsByItemQuery($itemId: Int!) {
    commentsByItem(itemId: $itemId) {
      id
      body
      user {
        email
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  commentsByItem,
}: CellSuccessProps<CommentsByItemQuery>) => {
  return <CommentsStructure comments={commentsByItem} />
}
