// app/repos/page.tsx
import { githubuser } from '@/types/content'
import { Repository } from '@/types/repo'
import Link from 'next/link'
import React from 'react'
import { FaCodeBranch, FaEye, FaStar } from 'react-icons/fa'

const username =
  typeof githubuser === 'string' && githubuser.length > 0
    ? githubuser
    : 'bradtraversy' // fallback username

export const dynamic = 'force-dynamic' // 항상 서버에서 렌더링

export default async function ReposPage() {
  let repos: Repository[] = []

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN || ''}`,
        },
      }
    )

    const data = await response.json()

    // 안전하게 배열만 사용
    repos = Array.isArray(data) ? data : []
    if (!Array.isArray(data)) {
      console.error('Unexpected response format from GitHub API:', data)
    }
  } catch (error) {
    console.error('Error fetching repos:', error)
    repos = [] // fetch 실패 시에도 map 호출 가능
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Github Repositories of {username}
      </h2>

      {repos.length > 0 ? (
        <ul>
          {repos.map((repo: Repository) => (
            <li key={repo.id} className="bg-gray-100 m-4 p-4 rounded-md">
              <Link href={`/repos/${repo.name}`} className="block">
                <h3 className="text-xl font-bold">{repo.name}</h3>
                <p>{repo.description ?? 'No description'}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="flex items-center gap-1">
                    <FaStar /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCodeBranch /> {repo.forks_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaEye /> {repo.watchers_count}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No repositories found or error loading repositories.</p>
      )}
    </div>
  )
}
