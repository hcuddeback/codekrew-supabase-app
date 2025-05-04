import { createClient } from "@/lib/utils/supabase/server"
import { Octokit } from "octokit";
import { cookies } from "next/headers";


export async function getUserGitHubToken() {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();
    
    if (userError || !user) {
        throw new Error("User not authenticated.");
    }
    
    const { data, error } = await supabase
        .from("github_tokens")
        .select("access_token")
        .eq("id", user.id)
        .single();
    
    if (error || !data) {
        throw new Error("GitHub token not found for this user.");
    }
    
    return data.access_token;
}

// src/lib/actions/github.ts
export async function createGitHubRepo(accessToken: string, repoName: string) {
    const res = await fetch('/api/github/create-repo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken, repoName }),
    })
  
    const result = await res.json()
    return result
  }

  
export async function createAndPushRepo({
    token,
    repoName,
    files,
}: {
    token: string;
    repoName: string;
    files: { path: string; content: string }[];
}) {
    const octokit = new Octokit({ auth: token });

    //Get GitHub username
    const user = await octokit.rest.users.getAuthenticated();
    const owner = user.data.login;

    //Step 1: Create a new GitHub repo
    const { data: repo } = await octokit.rest.repos.createForAuthenticatedUser({
        name: repoName,
        private: false,
    });

    //Step 2: Get base SHA (main or master branch)
    const { data: ref } = await octokit.rest.git.getRef({
        owner,
        repo: repoName,
        ref: "heads/main",
    }).catch(async () => {
        const masterRef = await octokit.rest.git.getRef({
            owner,
            repo: repoName,
            ref: "heads/master", 
        });
        return { data: { sha: masterRef.data.object.sha } };
    });

    //Step 3: Create tree with provided files
    const { data: tree } = await octokit.data.object.createTree({
        owner,
        repo: repoName,
        base_tree: files.map((f) => ({
            path: f.path,
            mode: "100644",
            type: "blob",
            content: f.content,
        })),
    });

    //Step 4: Create a commit pointing to that tree
    const { data: commit } = await octokit.rest.git.createCommit({
        owner,
        repo: repoName,
        message: "Initial commit from CodeKrew GitBot",
        tree: tree.sha,
        parents: [ref.sha],
    });

    //Step 5: Update ref to point to new commit
    await octokit.rest.git.updateRef({
        owner,
        repo: repoName,
        ref: "heads/main",
        sha: commit.sha,
        force: true,
    });

    return {
        success: true,
        repoUrl: repo.html_url,
    };
}