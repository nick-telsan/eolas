import { useParams } from '@redwoodjs/router'

import ItemCell from 'src/components/cells/ItemCell'
import { CommentsStructure } from 'src/components/structures/CommentsStructure/CommentsStructure'

const ViewPage = () => {
  const { id } = useParams()

  return (
    <>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-3">
          <ItemCell id={parseInt(id)} />
        </div>
        <div className="col-span-2">
          <CommentsStructure itemId={parseInt(id)} />
        </div>
      </div>
    </>
  )
}

export default ViewPage
