// src/components/scout/ScoutPanel.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

type ScoutPanelProps = {
    onClose: () => void
  }

export default function ScoutPanel({ onClose }: ScoutPanelProps) {
    const [messages, setMessages] = useState<string[]>(["Welcome! How can I help today?"])

    return (
        <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l z-50 shadow-lg flex flex-col">
        <div className="flex justify-between items-start p-4 border-b">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-8 h-8"
            >
              <Image
                src="/scout-avatar-transparent.png"
                alt="Scout"
                width={32}
                height={32}
              />
            </motion.div>
            <h2 className="text-xl font-bold">Hey, I'm Scout</h2>
          </div>
          <button
            onClick={onClose}
            className="text-xl text-muted-foreground hover:text-foreground leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
  
        <div className="flex-1 flex flex-col-reverse gap-2 overflow-y-auto p-4">
          {messages.map((msg, idx) => (
            <div key={idx} className="bg-muted p-2 rounded-md text-sm max-w-sm self-start">
              {msg}
            </div>
          ))}
        </div>
  
        <div className="sticky bottom-0 bg-background p-4 border-t">
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Ask Scout anything..."
          />
        </div>
      </div>
    )
  }
  
