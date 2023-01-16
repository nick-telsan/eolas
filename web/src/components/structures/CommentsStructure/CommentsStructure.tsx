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
import CommentsByItemCell from 'src/components/cells/CommentsByItemCell'

import { CREATE_COMMENT } from './graphql'

interface FormValues {
  comment: string
}

type CommentsStructureProps = {
  itemId: number
}

export const CommentsStructure = ({ itemId }: CommentsStructureProps) => {
  const { currentUser } = useAuth()
  const formMethods = useForm()

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
        <div className="rounded-md border-2 border-matcha focus-within:border-mint">
          <TextAreaField
            className="min-h-[100px] w-full resize-none bg-transparent p-2 outline-none"
            name="comment"
            spellCheck
          />
          <div className="flex w-full justify-end">
            <Submit className="rounded-tl-md bg-matcha px-2 py-1">Save</Submit>
          </div>
        </div>
      </Form>
      <CommentsByItemCell itemId={itemId} />
    </>
  )
}
