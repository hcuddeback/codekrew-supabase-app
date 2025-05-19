// github.ts
// Utility functions for GitHub OAuth, repo creation, and push support

import { createClient } from '@/lib/utils/supabase/server'
import { Octokit } from 'octokit'

export async function getUserGitHubToken() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error('User not authenticated.')
  }

  const { data, error } = await supabase
    .from('github_tokens')
    .select('access_token')
    .eq('id', user.id)
    .single()

  if (error || !data) {
    throw new Error('GitHub token not found for this user.')
  }

  return data.access_token
}

export async function createGitHubRepo({
  token,
  name,
  description = '',
  privateRepo = true,
  org, // optional organization name
}: {
  token: string
  name: string
  description?: string
  privateRepo?: boolean
  org?: string
}) {
  const octokit = new Octokit({ auth: token })

  const owner = org || (await octokit.rest.users.getAuthenticated()).data.login

  // Check for existing repo
  try {
    const existing = await octokit.rest.repos.get({ owner, repo: name })
    if (existing?.data) {
      console.warn('Repo already exists:', existing.data.html_url)
      return existing.data
    }
  } catch (err: any) {
    if (err.status !== 404) throw err // 404 is okay (means repo doesn't exist)
  }

  // Create the repo if it doesn't exist
  const { data: repo } = org
    ? await octokit.rest.repos.createInOrg({
        org,
        name,
        description,
        private: privateRepo,
      })
    : await octokit.rest.repos.createForAuthenticatedUser({
        name,
        description,
        private: privateRepo,
      })

  return repo
}

export async function createAndPushRepo({
  token,
  repoName,
  files,
}: {
  token: string
  repoName: string
  files: { path: string; content: string }[]
}) {
  const octokit = new Octokit({ auth: token })
  const user = await octokit.rest.users.getAuthenticated()
  const owner = user.data.login

  const { data: repo } = await octokit.rest.repos.createForAuthenticatedUser({
    name: repoName,
    private: true,
  })

  const refData = await octokit.rest.git.getRef({ owner, repo: repoName, ref: 'heads/main' }).catch(async () => {
    const fallback = await octokit.rest.git.getRef({ owner, repo: repoName, ref: 'heads/master' })
    return { data: { sha: fallback.data.object.sha } }
  })

  const { data: tree } = await octokit.rest.git.createTree({
    owner,
    repo: repoName,
    tree: files.map((f) => ({ path: f.path, mode: '100644', type: 'blob', content: f.content })),
    base_tree: refData.data.sha,
  })

  const { data: commit } = await octokit.rest.git.createCommit({
    owner,
    repo: repoName,
    message: 'Initial commit from CodeKrew GitBot',
    tree: tree.sha,
    parents: [refData.data.sha],
  })

  await octokit.rest.git.updateRef({
    owner,
    repo: repoName,
    ref: 'heads/main',
    sha: commit.sha,
    force: true,
  })

  return {
    success: true,
    repoUrl: repo.html_url,
  }
}

export async function pushFiles(
  accessToken: string,
  repoName: string,
  files: { path: string; content: string }[]
) {
  const ownerRes = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const owner = await ownerRes.json()

  for (const file of files) {
    const res = await fetch(`https://api.github.com/repos/${owner.login}/${repoName}/contents/${file.path}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add ${file.path}`,
        content: btoa(file.content),
      }),
    })

    if (!res.ok) {
      console.error(`Error pushing ${file.path}`, await res.json())
    }
  }

  return true
}
