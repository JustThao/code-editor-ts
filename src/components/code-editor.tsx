import './code-editor.css'
import { useRef } from 'react'
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'

interface CodeEditorProps {
  initValue: string
  onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initValue, onChange }) => {
  const editorRef = useRef<any>()
  const handleEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue())
    })

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 })
  }

  const handleFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue()
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: false,
        singleQuote: true,
      })
      .replace(/\n$/, '')

    editorRef.current.setValue(formatted)
  }

  return (
    <div className="wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={handleFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        value={initValue}
        editorDidMount={handleEditorDidMount}
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        theme="dark"
        language="javascript"
        height="500px"
      />
    </div>
  )
}

export default CodeEditor
