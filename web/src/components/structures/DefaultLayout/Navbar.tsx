import { routes } from '@redwoodjs/router'

import ItemsCell from 'src/components/cells/ItemsCell'
import { Link } from 'src/components/ui/Link'

export const Navbar = () => {
  return (
    <nav className="min-w-[100px] w-full max-w-[200px] h-full bg-matcha border-r border-r-mint/20 flex flex-col items-center">
      <div className="border-b border-b-mint w-full text-center mb-1 p-2">
        <Link to={routes.view()}>Create</Link>
      </div>
      <ItemsCell />
    </nav>
  )
}
