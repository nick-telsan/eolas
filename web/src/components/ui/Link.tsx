import { ReactNode } from 'react'

import { Link as RWLink } from '@redwoodjs/router'

type LinkProps = {
  to: string
  children: ReactNode
}

export const Link = ({ to, children }: LinkProps) => {
  return <RWLink to={to}>{children}</RWLink>
}
