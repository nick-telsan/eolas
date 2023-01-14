import { useEffect } from 'react'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

interface RestoreStatePluginProps {
  state?: string
}

export const RestoreStatePlugin = ({ state }: RestoreStatePluginProps) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (state) {
      const editorState = editor.parseEditorState(JSON.parse(state))
      editor.setEditorState(editorState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
