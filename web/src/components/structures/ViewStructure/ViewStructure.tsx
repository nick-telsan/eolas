import { useEffect, useState } from 'react'

import {
  CreateOrUpdateItemMutation,
  CreateOrUpdateItemMutationVariables,
} from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'

import { QUERY as ITEM_QUERY } from 'src/components/cells/ItemsCell'
import { EditorBlock } from 'src/components/ui/EditorBlock'
import { TextInput } from 'src/components/ui/TextInput'
import { useItemStore } from 'src/utilities/item-store'

import { CREATE_OR_UPDATE_ITEM } from './graphql'

type ViewStructureProps = {
  id?: number
  name?: string
  body?: string
  philosophy?: string
}

let filterTimeout: NodeJS.Timeout

export const ViewStructure = ({
  id,
  name,
  body,
  philosophy,
}: ViewStructureProps) => {
  const { hasRole } = useAuth()
  const readOnly = hasRole('admin')

  const internalId = useItemStore((state) => state.id)
  const setInternalId = useItemStore((state) => state.setId)

  const [internalName, setName] = useState<string>(name)
  const [internalBody, setBody] = useState<string>(body)
  const [internalPhilosophy, setPhilosophy] = useState<string>(philosophy)

  const [createOrUpdateItem] = useMutation<
    CreateOrUpdateItemMutation,
    CreateOrUpdateItemMutationVariables
  >(CREATE_OR_UPDATE_ITEM, {
    onCompleted: (result) => {
      setInternalId(result.createOrUpdateItem.id)
    },
    refetchQueries: [{ query: ITEM_QUERY }],
  })

  useEffect(() => {
    if (id) {
      setInternalId(id)
    }
  }, [id, setInternalId])

  useEffect(() => {
    clearTimeout(filterTimeout)

    filterTimeout = setTimeout(() => {
      createOrUpdateItem({
        variables: {
          input: {
            id: internalId,
            name: internalName,
            body: internalBody,
            philosophy: internalPhilosophy,
          },
        },
      })
    }, 1000)
  }, [
    internalId,
    internalName,
    internalBody,
    internalPhilosophy,
    createOrUpdateItem,
  ])

  const handleNameChange = (value: string) => {
    setName(value)
  }

  const handleBodyChange = (state: string) => {
    setBody(state)
  }

  const handlePhilosophyChange = (state: string) => {
    setPhilosophy(state)
  }

  return (
    <>
      <div className="mb-2">
        <TextInput
          value={internalName}
          callback={handleNameChange}
          placeholder="Name"
        />
      </div>
      <div className="mb-2">
        <EditorBlock
          namespace="item-body"
          callback={handleBodyChange}
          state={internalBody}
          readOnly={readOnly}
        />
      </div>
      <EditorBlock
        namespace="item-philosophy"
        callback={handlePhilosophyChange}
        state={internalPhilosophy}
        readOnly={readOnly}
      />
    </>
  )
}
