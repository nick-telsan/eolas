import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  PasswordField,
  SelectField,
  Submit,
  SubmitErrorHandler,
  TextField,
  useForm,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import { QUERY as USERS_QUERY } from 'src/components/cells/UsersCell'

import { CREATE_USER, DELETE_USER } from './graphql'

interface FormValues {
  email: string
  password: string
  roles: string
}

type UserType = {
  id: number
  email: string
  roles: string
}

type ManageUsersProps = {
  users: UserType[]
}

export const ManageUsers = ({ users }: ManageUsersProps) => {
  const formMethods = useForm()
  const { currentUser } = useAuth()

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: () => {
      formMethods.reset()
    },
    refetchQueries: [{ query: USERS_QUERY }],
  })

  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: USERS_QUERY }],
  })

  const onSubmit: SubmitErrorHandler<FormValues> = (data) => {
    createUser({
      variables: {
        input: data,
      },
    })
  }

  const handleDelete = (id: number) => {
    if (id !== currentUser.id) {
      deleteUser({
        variables: {
          id,
        },
      })
    }
  }

  return (
    <>
      <h2 className="text-2xl mb-2">Create New User</h2>
      <Form
        onSubmit={onSubmit}
        formMethods={formMethods}
        className="flex gap-2 justify-evenly items-end border-b-2 border-b-matcha pb-4"
      >
        <div className="flex flex-col">
          <Label name="email" className="text-lg">
            Email
          </Label>
          <TextField
            name="email"
            className="bg-transparent border-matcha border-2 rounded-md focus:border-mint px-2 outline-none text-lg"
            errorClassName="rw-input rw-input-error"
            validation={{
              required: {
                value: true,
                message: 'Email is required',
              },
            }}
          />
        </div>

        <div className="flex flex-col">
          <Label name="password" className="text-lg">
            Password
          </Label>
          <PasswordField
            name="password"
            className="bg-transparent border-matcha border-2 rounded-md focus:border-mint px-2 outline-none text-lg"
            autoComplete="current-password"
            validation={{
              required: {
                value: true,
                message: 'Password is required',
              },
            }}
          />
        </div>

        <div className="flex flex-col">
          <Label name="roles" className="text-lg">
            Role
          </Label>
          <SelectField
            name="roles"
            className="bg-transparent border-matcha border-2 rounded-md focus:border-mint px-2 outline-none text-lg min-w-[200px] min-h-[32px]"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </SelectField>
        </div>

        <Submit className="max-w-[200px] p-1 bg-matcha border-matcha border-2 rounded-md text-lg hover:border-mint outline-none focus:border-mint">
          Create User
        </Submit>
      </Form>

      <div className="mt-4 w-full border-matcha border-2 rounded-md">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-matcha">
              <th className="p-2">Email</th>
              <th className="p-2">Roles</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="odd:bg-matcha/20">
                <td className="p-2 text-center">{user.email}</td>
                <td className="p-2 text-center">{user.roles}</td>
                <td className="p-2 text-center">
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
