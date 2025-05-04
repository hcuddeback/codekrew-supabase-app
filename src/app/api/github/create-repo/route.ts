// /src/app/api/github/create-repo/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { accessToken, repoName } = await req.json()

  const response = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github+json',
    },
    body: JSON.stringify({
      name: repoName,
      private: false,
      auto_init: true,
      description: '🚀 Created with CodeKrew GitBot',
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    return NextResponse.json({ error: data }, { status: response.status })
  }

  return NextResponse.json({ success: true, repo: data })
}
