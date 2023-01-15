import { useAuth } from '@redwoodjs/auth'
import { routes } from '@redwoodjs/router'

import { Link } from 'src/components/ui/Link'

export const Navbar = () => {
  const { hasRole } = useAuth()
  const admin = hasRole('admin')

  return (
    <nav className="min-w-[100px] w-full max-w-[200px] h-full bg-matcha border-r border-r-mint/20 flex flex-col items-center">
      <Link to={routes.index()}>Index</Link>
      <Link to={routes.view()}>Create</Link>
      <Link to={routes.compare()}>Compare</Link>
      {admin && <Link to={routes.admin()}>Admin</Link>}
    </nav>
  )
}
