import { useEffect, useState } from 'react'

import {
  CreateOrUpdateItemMutation,
  CreateOrUpdateItemMutationVariables,
} from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes, useLocation } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { QUERY as ITEM_QUERY } from 'src/components/cells/ItemsCell'
import { EditorBlock } from 'src/components/ui/EditorBlock'
import { TextInput } from 'src/components/ui/TextInput'
import { useItemStore } from 'src/utilities/item-store'
import { getSearchParam } from 'src/utilities/urls'

import { CREATE_OR_UPDATE_ITEM } from './graphql'
import { ParentSelect } from './ParentSelect'

type ViewStructureProps = {
  id?: number
  name?: string
  body?: string
  philosophy?: string
  parentId?: number
  parentName: string
}

let filterTimeout: NodeJS.Timeout

export const ViewStructure = ({
  id,
  name,
  body,
  philosophy,
  parentId,
  parentName,
}: ViewStructureProps) => {
  const { search } = useLocation()
  const { hasRole } = useAuth()
  const searchId = getSearchParam(search, 'id')
  const readOnly = hasRole('admin')

  const internalId = useItemStore((state) => state.id)
  const setInternalId = useItemStore((state) => state.setId)

  const [internalName, setName] = useState<string>(name)
  const [internalBody, setBody] = useState<string>(body)
  const [internalPhilosophy, setPhilosophy] = useState<string>(philosophy)
  const [internalParentId, setParentId] = useState<number | undefined>(parentId)
  const [internalParentName, setParentName] = useState<string>(parentName)

  const [createOrUpdateItem] = useMutation<
    CreateOrUpdateItemMutation,
    CreateOrUpdateItemMutationVariables
  >(CREATE_OR_UPDATE_ITEM, {
    onCompleted: (result) => {
      setInternalId(result.createOrUpdateItem.id)
    },
    onError: (error) => {
      toast.error(error.message)

      if (error.message === 'Child cannot be more than 4 levels deep.') {
        setParentId(undefined)
        setParentName('')
      }
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
            parentId: internalParentId,
          },
        },
      })
    }, 1000)
  }, [
    internalId,
    internalName,
    internalBody,
    internalPhilosophy,
    internalParentId,
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

  const handleParentChange = (value: number) => {
    setParentId(value)
  }

  const resetScreen = () => {
    setInternalId(undefined)
    if (searchId) {
      navigate(routes.view())
    } else {
      window.location.reload()
    }
  }

  return (
    <>
      <Toaster />
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

      <div className="mb-2 flex justify-end">
        <ParentSelect
          name={internalParentName}
          setParent={setParentName}
          callback={handleParentChange}
        />
      </div>

      <div className="mb-2">
        <EditorBlock
          namespace="item-philosophy"
          callback={handlePhilosophyChange}
          state={internalPhilosophy}
          readOnly={readOnly}
        />
      </div>

      <div className="flex w-full justify-end">
        <button onClick={resetScreen}>Reset</button>
      </div>
    </>
  )
}
