'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export default function MarketingLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen text-white bg-transparent">
      <header className="sticky top-0 z-50 w-full px-6 py-4 border-b bg-zinc-900 dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Image
              src="/codekrew.png"
              alt="CodeKrew Logo"
              width={140}
              height={48}
              className="h-6 w-auto"
              priority
            />
          </Link>
          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/pricing" className="hover:text-orange-500 py-2">Pricing</Link>
            <Link href="/blog" className="hover:text-orange-500 py-2">Blog</Link>
            <Link href="/sign-in" className="border border-zinc-500 text-zinc-300 px-4 py-2 rounded hover:bg-zinc-800">Sign In</Link>
            <Link href="/sign-up" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold">Sign Up</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full">{children}</main>
    </div>
  )
}
