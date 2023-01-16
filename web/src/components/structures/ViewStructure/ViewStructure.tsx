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
  position?: number
}

export const ViewStructure = ({
  id,
  name,
  body,
  philosophy,
  parentId,
  parentName,
  position,
}: ViewStructureProps) => {
  const { hasRole } = useAuth()
  const readOnly = !hasRole('admin')

  const [internalName, setName] = useState<string>(name)
  const [internalBody, setBody] = useState<string>(body)
  const [internalPhilosophy, setPhilosophy] = useState<string>(philosophy)
  const [internalParentId, setParentId] = useState<number | undefined>(parentId)
  const [internalParentName, setParentName] = useState<string>(parentName)
  const [internalPosition, setPosition] = useState<string | number>(
    position || ''
  )

  const [createOrUpdateItem] = useMutation<
    CreateOrUpdateItemMutation,
    CreateOrUpdateItemMutationVariables
  >(CREATE_OR_UPDATE_ITEM, {
    onCompleted: (result) => {
      if (!id) {
        navigate(routes.view({ id: result.createOrUpdateItem.id }))
      } else {
        toast.success('Saved')
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

  const handlePositionChange = (value: string) => {
    const parsedValue = parseInt(value)

    if (parsedValue && parsedValue > 0) {
      setPosition(parsedValue)
    } else {
      toast.error('Position must be a number and greater than 0')
    }
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
          disabled={readOnly}
        />
      </div>
      <div className="mb-2">
        <EditorBlock
          namespace="item-body"
          callback={handleBodyChange}
          state={internalBody}
          readOnly={readOnly}
          type="Body"
        />
      </div>

      <div className="mb-2 flex justify-between">
        <input
          className="rounded-md border-2 border-matcha bg-transparent px-2 text-lg text-whip-cream outline-none placeholder:italic placeholder:text-whip-cream focus:border-mint"
          placeholder="Position"
          onChange={(event) => handlePositionChange(event.target.value)}
          value={internalPosition}
          disabled={readOnly}
        />
        <ParentSelect
          id={id}
          name={internalParentName}
          setParent={setParentName}
          callback={handleParentChange}
          disabled={readOnly}
        />
      </div>

      <div className="mb-2">
        <EditorBlock
          namespace="item-philosophy"
          callback={handlePhilosophyChange}
          state={internalPhilosophy}
          readOnly={readOnly}
          type="Philosophy"
        />
      </div>

      <div className="flex w-full justify-end">
        <button disabled={readOnly} onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  )
}
