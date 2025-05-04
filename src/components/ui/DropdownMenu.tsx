'use client'

export default function DropdownMenu({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
  return (
    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 border rounded shadow-md z-50" onMouseLeave={onClose}>
      {children}
    </div>
  )
}
