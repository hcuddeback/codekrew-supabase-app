'use client'
import { useEffect, useState } from 'react'

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-orange-900 via-cyan-900 to-purple-900 bg-size-200 animate-gradient opacity-70" />
  )
}
