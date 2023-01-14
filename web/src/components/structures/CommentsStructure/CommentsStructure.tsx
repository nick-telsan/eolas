import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Submit,
  TextAreaField,
  SubmitHandler,
  useForm,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import { QUERY as COMMENTS_BY_ITEM_ID_QUERY } from 'src/components/cells/CommentsByItemCell'
import { useItemStore } from 'src/utilities/item-store'

import { CREATE_COMMENT } from './graphql'

interface FormValues {
  comment: string
}

type Comment = {
  id: string
  user: {
    email: string
  }
  body?: string
}

type CommentsStructureProps = {
  comments: Comment[]
}

export const CommentsStructure = ({ comments }: CommentsStructureProps) => {
  const { currentUser } = useAuth()
  const formMethods = useForm()
  const itemId = useItemStore((state) => state.id)

  const [createComment] = useMutation(CREATE_COMMENT, {
    onCompleted: () => {
      formMethods.reset()
    },
    refetchQueries: [
      { query: COMMENTS_BY_ITEM_ID_QUERY, variables: { itemId } },
    ],
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    createComment({
      variables: {
        input: {
          userId: currentUser.id,
          itemId,
          body: data.comment,
        },
      },
    })
  }

  return (
    <>
      <Form onSubmit={onSubmit} formMethods={formMethods}>
        <div className="border-matcha border-2 rounded-md focus-within:border-mint">
          <TextAreaField
            className="w-full min-h-[100px] bg-transparent p-2 outline-none resize-none"
            name="comment"
            spellCheck
          />
          <div className="w-full flex justify-end">
            <Submit className="px-2 py-1 bg-matcha rounded-tl-md">Save</Submit>
          </div>
        </div>
      </Form>
      {comments.map((comment) => {
        return (
          <div
            className="w-full border-matcha border-2 rounded-md my-2"
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
