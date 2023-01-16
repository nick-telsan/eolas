import type { CommentsByItemQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query CommentsByItemQuery($itemId: Int) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  commentsByItem,
}: CellSuccessProps<CommentsByItemQuery>) => {
  return (
    <>
      {commentsByItem.map((comment) => {
        return (
          <div
            className="my-2 w-full rounded-md border-2 border-matcha"
            key={comment.id}
          >
            <div className="p-2">
              <p>{comment.body}</p>
            </div>
            <div className="bg-matcha px-2">
              <p>{comment.user.email}</p>
            </div>
          </div>
        )
      })}
    </>
  )
}
