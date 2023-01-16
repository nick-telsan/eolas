import { ListItemNode, ListNode } from '@lexical/list'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'
import { EditorState, EditorThemeClasses } from 'lexical'

import { CallbackType } from 'src/utilities/types'

import { RestoreStatePlugin } from './RestoreStatePlugin'
import { ToolbarPlugin } from './ToolbarPlugin'

const theme: EditorThemeClasses = {
  placeholder: 'editor-placeholder',
  list: {
    nested: {
      listitem: 'editor-nested-listitem',
    },
    ol: 'editor-list-ol',
    ul: 'editor-list-ul',
    listitem: 'editor-listitem',
  },
}

let filterTimeout: NodeJS.Timeout

function onChange(editorState: EditorState, callback: CallbackType) {
  clearTimeout(filterTimeout)

  filterTimeout = setTimeout(() => {
    callback(JSON.stringify(editorState.toJSON()))
  }, 1000)
}

type EditorBlockProps = {
  namespace: string
  state?: string
  callback: CallbackType
  readOnly?: boolean
  type: string
}

export const EditorBlock = ({
  namespace,
  state,
  callback,
  readOnly = false,
  type,
}: EditorBlockProps) => {
  const initialConfig = {
    namespace,
    theme,
    onError: (error: unknown) => console.error(error),
    nodes: [ListNode, ListItemNode],
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="min-h-[200px] w-full rounded-md border-2 border-matcha focus-within:border-mint">
        <ToolbarPlugin name={type} />
        <div className="relative p-2">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                spellCheck
                readOnly={readOnly}
                className="relative outline-none"
              />
            }
            placeholder={
              <div className="editor-placeholder">Enter some text...</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <OnChangePlugin
          onChange={(editorState) => onChange(editorState, callback)}
        />
        <RestoreStatePlugin state={state} />
        <TabIndentationPlugin />
        <ListPlugin />
      </div>
    </LexicalComposer>
  )
}
