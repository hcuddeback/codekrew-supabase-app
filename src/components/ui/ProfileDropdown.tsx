'use client'

import { signOutAction } from "@/app/actions/actions";
import { useState } from 'react'
import DropdownMenu from '@/components/ui/DropdownMenu'

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="w-10 h-10 rounded-full overflow-hidden">
        <img src="/avatar-placeholder.png" alt="Profile" className="w-full h-full object-cover rounded-full" />
      </button>
      {open && (
        <DropdownMenu onClose={() => setOpen(false)}>
          <div className="px-4 py-2">
            <div className="font-semibold">hcuddeback</div>
            <div className="text-xs text-gray-500">heather.cuddeback@gmail.com</div>
          </div>
          <hr className="my-2 border-gray-200 dark:border-gray-700" />
          <ul className="text-sm">
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">Account preferences</li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">Feature previews</li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">Command menu</li>
          </ul>
          <hr className="my-2 border-gray-200 dark:border-gray-700" />
          <div className="px-4 py-2 text-xs text-gray-500">Theme</div>
          <ul className="text-sm">
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">Dark</li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">Light</li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">System</li>
          </ul>
          <hr className="my-2 border-gray-200 dark:border-gray-700" />
          <div className="px-4 py-2 text-red-500 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">
          <form action={signOutAction}>
              Sign out
          </form>
          </div>
        </DropdownMenu>
      )}
    </div>
  )
}
