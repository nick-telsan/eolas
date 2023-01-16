import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { EditorState, EditorThemeClasses } from 'lexical'

import { CallbackType } from 'src/utilities/types'

import { RestoreStatePlugin } from './RestoreStatePlugin'

const theme: EditorThemeClasses = {
  paragraph: 'editor-paragraph',
  placeholder: 'editor-placeholder',
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
}

export const EditorBlock = ({
  namespace,
  state,
  callback,
  readOnly = false,
}: EditorBlockProps) => {
  const initialConfig = {
    namespace,
    theme,
    onError: (error: unknown) => console.error(error),
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative min-h-[200px] w-full rounded-md border-2 border-matcha p-2 focus-within:border-mint">
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
        <OnChangePlugin
          onChange={(editorState) => onChange(editorState, callback)}
        />
        <RestoreStatePlugin state={state} />
      </div>
    </LexicalComposer>
  )
}
