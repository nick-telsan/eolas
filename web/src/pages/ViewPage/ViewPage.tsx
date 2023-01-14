import { useLocation } from '@redwoodjs/router'

import CommentsByItemCell from 'src/components/cells/CommentsByItemCell'
import ItemCell from 'src/components/cells/ItemCell'
import { getSearchParam } from 'src/utilities/urls'

const ViewPage = () => {
  const { search } = useLocation()
  const id = getSearchParam(search, 'id')

  return (
    <>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-3">
          <ItemCell id={parseInt(id)} />
        </div>
        <div className="col-span-2">
          <CommentsByItemCell itemId={parseInt(id)} />
        </div>
      </div>
    </>
  )
}

export default ViewPage
