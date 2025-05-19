import { createClient } from '@/lib/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AccountPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="max-w-4xl mx-auto py-12 text-white">
      <h1 className="text-3xl font-bold mb-4">Account Preferences</h1>
      <p className="text-zinc-400">User: {user.email}</p>
      <p className="mt-4 text-zinc-500 italic">More settings coming soon...</p>
    </div>
  )
}
