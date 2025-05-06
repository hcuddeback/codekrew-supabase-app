'use client'

import { useEffect, useState } from 'react'

export default function Footer() {
  const [year, setYear] = useState<number>()

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="relative z-50 w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-4 py-4">
      <p>
        © {year ?? ''} CodeKrew. Powered by{' '}
        <a
          href=""
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer noopener"
        >
          Codence.
        </a>
      </p>
    </footer>
  )
}
