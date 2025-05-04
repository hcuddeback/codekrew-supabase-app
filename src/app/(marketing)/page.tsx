'use client'

import Image from 'next/image'
import { useState } from 'react'
import AnimatedBackground from '@/components/ui/animated-background'

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    if (res.ok) setSuccess(true)
  }

  return (
    <main className="flex-1 relative text-white overflow-hidden">
      <AnimatedBackground />
      <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <Image src="/smiling-robot-codekrew-ai-white.png" alt="CodeKrew AI Logo" width={250} height={250} className="mb-6" />
        <h1 className="text-4xl font-bold">Built for builders. Backed by AI.</h1>
        <p className="text-slate-400 text-lg mt-2">Your dream stack, with an AI co-pilot.</p>

        <div className="mt-6 flex gap-4">
          <a href="/sign-up" className="bg-orange-500 text-white px-6 py-3 rounded font-semibold hover:bg-orange-600">
            Start Your Project
          </a>
          <a href="/pricing" className="border border-slate-500 text-slate-300 px-6 py-3 rounded hover:bg-slate-800">
            See Pricing
          </a>
        </div>

        <div className="mt-16 text-xl font-semibold">Build fast. Think smart. Ship with superpowers.</div>

        {/* Signup Form */}
        <div id="signup" className="mt-16 w-full max-w-md">
          <form onSubmit={handleSubmit} className="bg-slate-900 p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Join the Waitlist</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="w-full px-4 py-2 mb-4 rounded bg-slate-800 text-white border border-slate-700"
            />
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded font-semibold"
            >
              Sign Up
            </button>
            {success && (
              <p className="text-sm text-green-400 mt-2">You're on the list!</p>
            )}
          </form>
        </div>
      </section>
    </main>
  )
}
