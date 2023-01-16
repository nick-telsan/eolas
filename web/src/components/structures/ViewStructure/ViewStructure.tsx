import { useState } from 'react'

import {
  CreateOrUpdateItemMutation,
  CreateOrUpdateItemMutationVariables,
} from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { EditorBlock } from 'src/components/ui/EditorBlock'
import { TextInput } from 'src/components/ui/TextInput'

import { CREATE_OR_UPDATE_ITEM } from './graphql'
import { ParentSelect } from './ParentSelect'

type ViewStructureProps = {
  id?: number
  name?: string
  body?: string
  philosophy?: string
  parentId?: number
  parentName?: string
}

export const ViewStructure = ({
  id,
  name,
  body,
  philosophy,
  parentId,
  parentName,
}: ViewStructureProps) => {
  const { hasRole } = useAuth()
  const readOnly = hasRole('admin')

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
      if (!id) {
        navigate(`${routes.view()}?id=${result.createOrUpdateItem.id}`)
      }
    },
    onError: (error) => {
      toast.error(error.message)

      if (error.message === 'Child cannot be more than 4 levels deep.') {
        setParentId(undefined)
        setParentName('')
      }
    },
  })

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

  const handleSave = () => {
    createOrUpdateItem({
      variables: {
        input: {
          id: id,
          name: internalName,
          body: internalBody,
          philosophy: internalPhilosophy,
          parentId: internalParentId,
        },
      },
    })
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
        <button onClick={handleSave}>Save</button>
      </div>
    </>
  )
}
