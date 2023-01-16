import { useParams } from '@redwoodjs/router'

import CompareCell from 'src/components/cells/CompareCell'

const ComparePage = () => {
  const { ids } = useParams()
  const items = ids.split(',').map((id) => parseInt(id))

  return <CompareCell items={items} />
}

export default ComparePage
