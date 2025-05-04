// app/style-guide/page.tsx
import { createClient } from '@/lib/utils/supabase/server'
import { redirect } from 'next/navigation'
import Markdown from 'react-markdown'
import fs from 'fs'
import path from 'path'

export default async function StyleGuidePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!['admin', 'dev'].includes(profile?.role)) {
    redirect('/')
  }

  const filePath = path.join(process.cwd(), 'src', 'app', 'docs', 'style-guide', 'content', 'style-guide.md')
  const content = fs.readFileSync(filePath, 'utf-8')

  return (
    <main className="prose max-w-3xl mx-auto p-8">
      <Markdown>{content}</Markdown>
    </main>
  )
}
