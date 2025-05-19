// app/api/github/create-repo/route.ts
import { NextResponse } from 'next/server'
import { createGitHubRepo } from '@/lib/actions/github'
import { createClient } from '@/lib/utils/supabase/server'

export async function POST(req: Request) {
  const { token, name, description } = await req.json()
  const supabase = createClient()

  const {
    data: { user },
    error: authError,
  } = await (await supabase).auth.getUser()
  
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: tokenData , error: tokenError } = await supabase
    .from('github_tokens')
    .select('access_token')
    .eq('id', user.id)
    .single()

  if (tokenError || !tokenData) {
    return NextResponse.json({ error: 'GitHub token not found' }, { status: 403 })
  }

  if (!token || !name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }



  try {
    const repo = await createGitHubRepo({
      token: tokenData.access_token,
      name,
      description,
      privateRepo: true // ✅ Recommended: Create repo as private by default
    })

    return NextResponse.json(repo)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
