import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

import { Navbar } from './Navbar'

type DefaultLayoutProps = {
  children?: React.ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { logOut } = useAuth()

  return (
    <div className="w-full h-full">
      <header className="w-full h-10 bg-matcha border-b-mint/20 border-b flex justify-between p-4 items-center z-[1000] relative">
        <Link
          className="font-semibold font-overlock text-2xl"
          to={routes.index()}
        >
          eolas
        </Link>
        <button onClick={logOut}>Log Out</button>
      </header>
      <div className="flex w-full top-0 h-full fixed pt-10">
        <Navbar />
        <main className="p-4 w-full h-full">{children}</main>
      </div>
    </div>
  )
}
