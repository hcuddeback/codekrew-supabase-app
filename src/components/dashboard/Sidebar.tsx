'use client'

import { Home, LayoutDashboard, Calendar, ListTodo, Menu, Table, Database, Bot, Cpu, FileText, BarChart, Settings, Lock, List, Grid, ChevronDown, BookOpenIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useUserRole } from '@/hooks/useUserRole'
import { usePathname } from 'next/navigation'

const menuItems = [
  { label: 'Dashboard', icon: Home, href: "/dashboard" },
  { label: 'Projects', icon: LayoutDashboard, href: "/dashboard/projects" },
  { label: "Tasks", icon: ListTodo, href: "/dashboard/tasks" },
  { label: "Bots", icon: Bot, href: "/dashboard/bots" },
  { label: "Roadmap", icon: Calendar, href: "/dashboard/roadmap" },
  { label: 'Style Guide', href: '/style-guide', icon: BookOpenIcon, roles: ['admin', 'dev'] },
  { label: 'User Management', href: '/admin/users', icon: UsersIcon, roles: ['admin'] },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false)
  
  const role = useUserRole()

  const filteredNav = menuItems.filter(
    (item) => !item.roles || (role && item.roles.includes(role))
  )
  
  
  return (
    <aside className="fixed top-14 left-0 bottom-0 z-20 w-12 pointer-events-none group-hover:pointer-events-auto hover:w-48 transition-all duration-300 bg-slate-800 dark:bg-slate-900 text-gray-800 dark:text-gray-200 overflow-hidden border-r border-slate-200 dark:border-slate-700">
      <nav className="flex-1 py-3 flex flex-col"> 
        {filteredNav.map(item => (
          <Link
            key={item.label}
            href={item.href}
            className={`pointer-events-auto flex items-center px-3 py-2 rounded-md transition-colors hover:bg-gray-100 hover:text-orange-500 ${pathname === item.href ? 'bg-slate-800 text-orange' : 'text-slate-400 hover:text-orange-500'}`}
          >
            <item.icon className="h-6 w-6 flex-shrink-0" /> 
            <span className={`ml-4 whitespace-nowrap transition-opacity duration-200 ${collapsed ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}> 
               {item.label} 
            </span>
          </Link>
        ))}
      </nav>

      {/* Footer: theme toggle, profile, etc. */}
      <div className="pointer-events-auto p-4 border-t">
        {/* Insert theme switch or avatar here */}
      </div>
    </aside>
  )
}
