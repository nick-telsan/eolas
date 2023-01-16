import { useLocation } from '@redwoodjs/router'

import ItemCell from 'src/components/cells/ItemCell'
import { CommentsStructure } from 'src/components/structures/CommentsStructure/CommentsStructure'
import { getSearchParam } from 'src/utilities/urls'

const ViewPage = () => {
  const { search } = useLocation()
  const id = parseInt(getSearchParam(search, 'id'))

  return (
    <>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-3">
          <ItemCell id={id} />
        </div>
        <div className="col-span-2">
          <CommentsStructure itemId={id} />
        </div>
      </div>
    </>
  )
}

export default ViewPage
