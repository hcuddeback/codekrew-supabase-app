'use client'

interface Props {
  open: boolean
  onClose: () => void
}

export function WidgetSettingsModal({ open, onClose }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-4">Customize Your Dashboard</h2>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span>Show Projects</span>
            <input type="checkbox" defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <span>Show To-Do List</span>
            <input type="checkbox" defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <span>Show Kanban</span>
            <input type="checkbox" defaultChecked />
          </label>
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
