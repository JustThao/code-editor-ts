import { useState } from 'react'
import CodeEditor from './code-editor'
import Preview from './preview'
import bundler from '../bundler'

const CodeCell = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const handleClick = async () => {
    const output = await bundler(input)
    setCode(output)
  }

  return (
    <div>
      <CodeEditor initValue="" onChange={(value: string) => setInput(value)} />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <pre>{code}</pre>
      <Preview code={code} />
    </div>
  )
}

export default CodeCell
