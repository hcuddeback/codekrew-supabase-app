'use server'

import { OpenAI } from 'openai'

export async function generateFromPrompt(prompt: string) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })
  const chat = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful AI writing assistant.' },
      { role: 'user', content: prompt }
    ]
  })
  return chat.choices[0].message.content
}
