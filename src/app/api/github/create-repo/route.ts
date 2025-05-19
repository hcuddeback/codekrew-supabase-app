// app/api/github/create-repo/route.ts
import { NextResponse } from 'next/server'
import { createGitHubRepo } from '@/lib/actions/github'

export async function POST(req: Request) {
  const { token, name, description } = await req.json()

  if (!token || !name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const repo = await createGitHubRepo({
      token,
      name,
      description,
      privateRepo: true // ✅ Recommended: Create repo as private by default
    })

    return NextResponse.json(repo)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
