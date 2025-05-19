'use client'
import { useState } from 'react'

export default function WriterChatPanel() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const res = await fetch('/api/ai-writer', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    setResponse(data.result)
    setLoading(false)
  }

  return (
    <div className="p-4 border rounded shadow bg-white dark:bg-zinc-800">
      <h2 className="text-lg font-bold mb-2">WriterBot Assistant</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask WriterBot to summarize notes, write a user story, etc."
        className="w-full p-2 rounded border bg-white dark:bg-zinc-700 dark:text-white"
        rows={3}
      />
      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        {loading ? 'Thinking...' : 'Generate'}
      </button>
      {response && (
        <pre className="mt-4 bg-gray-100 dark:bg-zinc-700 p-2 rounded text-sm whitespace-pre-wrap">
          {response}
        </pre>
      )}
    </div>
  )
}
