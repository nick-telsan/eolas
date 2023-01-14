import { useRef } from 'react'
import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { toast, Toaster } from '@redwoodjs/web/toast'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.index())
    }
  }, [isAuthenticated])

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await logIn({
      username: data.email,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <main className="flex justify-center mt-[200px]">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="border-matcha border-2 rounded-md flex flex-col items-center min-w-[300px]">
          <h2 className="font-overlock text-3xl font-semibold text-matcha mb-2">
            eolas
          </h2>

          <div className="rw-form-wrapper">
            <Form onSubmit={onSubmit} className="rw-form-wrapper">
              <div className="flex flex-col mb-4">
                <Label name="email" className="text-lg">
                  Email
                </Label>
                <TextField
                  name="email"
                  className="bg-transparent border-matcha border-2 rounded-md focus:border-mint px-2 outline-none text-lg"
                  errorClassName="rw-input rw-input-error"
                  ref={emailRef}
                  validation={{
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                  }}
                />

                <FieldError name="email" />
              </div>

              <div className="flex flex-col mb-4">
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

                <FieldError name="password" />
              </div>

              <Submit className="w-full p-1 bg-matcha border-matcha border-2 rounded-md mb-2 text-lg hover:border-mint outline-none focus:border-mint">
                Login
              </Submit>
            </Form>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage
