import { ViewStructure } from 'src/components/structures/ViewStructure'

const CreatePage = () => {
  return (
    <div className="grid grid-cols-5 gap-8">
      <div className="col-span-3">
        <ViewStructure />
      </div>
      <div className="col-span-2">
        <h3>Comments enabled after creating your item.</h3>
      </div>
    </div>
  )
}

export default CreatePage
