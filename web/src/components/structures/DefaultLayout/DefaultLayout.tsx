import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

type DefaultLayoutProps = {
  children?: React.ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { logOut, hasRole } = useAuth()
  const admin = hasRole('admin')

  return (
    <div className="h-full w-full">
      <header className="flex h-10 w-full items-center justify-between border-b border-b-mint/20 bg-matcha p-4">
        <Link
          className="font-overlock text-2xl font-semibold"
          to={routes.index()}
        >
          eolas
        </Link>

        <div className="flex gap-10">
          <Link className="font-overlock" to={routes.index()}>
            Index
          </Link>

          <Link className="font-overlock" to={routes.view()}>
            Create
          </Link>

          <Link className="font-overlock" to={routes.compare()}>
            Compare
          </Link>

          {admin && (
            <Link className="font-overlock" to={routes.admin()}>
              Compare
            </Link>
          )}
          <button className="font-overlock" onClick={logOut}>
            Log Out
          </button>
        </div>
      </header>
      <main className="h-full w-full p-4">{children}</main>
    </div>
  )
}
