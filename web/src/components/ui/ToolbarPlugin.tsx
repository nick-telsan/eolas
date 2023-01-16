/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react'

import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { FORMAT_TEXT_COMMAND } from 'lexical'

import { routes } from '@redwoodjs/router'

import { Link } from './Link'

type ToolbarPluginType = {
  name: string
  readOnly: boolean
  id?: number
}

export const ToolbarPlugin = ({ name, readOnly, id }: ToolbarPluginType) => {
  const [editor] = useLexicalComposerContext()
  const [blockType, setBlockType] = useState('paragraph')

  const formatBulletList = () => {
    if (blockType !== 'ul') {
      // @ts-ignore
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND)
      setBlockType('ul')
    } else {
      // @ts-ignore
      editor.dispatchCommand(REMOVE_LIST_COMMAND)
      setBlockType('paragraph')
    }
  }

  const formatOrderedList = () => {
    if (blockType !== 'ol') {
      // @ts-ignore
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND)
      setBlockType('ol')
    } else {
      // @ts-ignore
      editor.dispatchCommand(REMOVE_LIST_COMMAND)
      setBlockType('paragraph')
    }
  }

  const formatBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
  }

  const formatItalics = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
  }

  return (
    <div className="flex w-full justify-between bg-matcha px-2">
      <h3>{name}</h3>
      {!readOnly && (
        <div className="flex w-full justify-end gap-4">
          <button className="font-bold" onClick={formatBold}>
            Bold
          </button>
          <button className="italic" onClick={formatItalics}>
            Italic
          </button>
          <button className="pl-4" onClick={formatBulletList}>
            <ul>
              <li className="list-disc">Bullets</li>
            </ul>
          </button>
          <button className="pl-4" onClick={formatOrderedList}>
            <ol>
              <li className="list-decimal">Numbers</li>
            </ol>
          </button>
        </div>
      )}
      {id && <Link to={routes.view({ id })}>View</Link>}
    </div>
  )
}
