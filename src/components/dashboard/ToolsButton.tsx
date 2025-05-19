'use client'

import { useState } from 'react'
import { WidgetSettingsModal } from './WidgetSettingsModal'
import { Settings2 } from 'lucide-react'

export default function ToolsButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-zinc-800 rounded-full shadow hover:bg-zinc-100 dark:hover:bg-zinc-700"
        aria-label="Customize Widgets"
      >
        <Settings2 className="w-5 h-5" />
      </button>
      <WidgetSettingsModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
