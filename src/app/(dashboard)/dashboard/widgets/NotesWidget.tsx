'use client'

import { useEffect, useState } from 'react'
import { getNotes } from '@/app/actions/notes/getNotes'
import { createNote } from '@/app/actions/notes/createNote'
import { updateNote } from '@/app/actions/notes/updateNote'
import { deleteNote } from '@/app/actions/notes/deleteNote'
import { useSession } from '@/hooks/useSession'
import { Button } from '@/components/ui/button'

interface Note {
  id: string
  title: string
  content: string
}

export default function NotesWidget() {
  const session = useSession()
  const user = session?.user
  const [notes, setNotes] = useState<Note[]>([])
  const [activeNote, setActiveNote] = useState<Note | null>(null)
  const [newTitle, setNewTitle] = useState('')

  useEffect(() => {
    if (user?.id) {
      getNotes(user.id).then(setNotes).catch(console.error)
    }
  }, [user])

  const handleCreate = async () => {
    if (!newTitle.trim()) return
    if (!user) return
    const note = await createNote(user.id, newTitle)
    setNotes([note, ...notes])
    setActiveNote(note)
    setNewTitle('')
  }

  const handleUpdate = async (id: string, content: string) => {
    const updated = await updateNote(id, content)
    setNotes(notes.map(n => (n.id === id ? updated : n)))
    setActiveNote(updated)
  }

  const handleDelete = async (id: string) => {
    await deleteNote(id)
    setNotes(notes.filter(n => n.id !== id))
    setActiveNote(null)
  }

  return (
    <div className="p-4 border rounded shadow bg-white dark:bg-slate-800">
      <h2 className="widget-header font-semibold text-lg mb-4">Notes</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New note title..."
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="flex-1 px-3 py-2 border rounded bg-white dark:bg-slate-700 dark:text-white"
        />
        <Button
          onClick={handleCreate}
          className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="w-1/3">
          <ul className="space-y-2 text-sm">
            {notes.map(note => (
              <li
                key={note.id}
                onClick={() => setActiveNote(note)}
                className={`cursor-pointer p-2 rounded ${
                  activeNote?.id === note.id
                    ? 'bg-indigo-100 dark:bg-slate-700'
                    : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                {note.title}
              </li>
            ))}
          </ul>
        </div>

        {activeNote && (
          <div className="w-2/3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold">{activeNote.title}</h3>
              <button
                onClick={() => handleDelete(activeNote.id)}
                className="text-xs px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
            <textarea
              value={activeNote.content || ''}
              onChange={e => handleUpdate(activeNote.id, e.target.value)}
              placeholder="Write your note here..."
              className="w-full h-48 p-2 rounded border bg-white dark:bg-slate-700 dark:text-white"
            />
          </div>
        )}
      </div>
    </div>
  )
}
