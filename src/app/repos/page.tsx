// app/repos/page.tsx
import { Repository } from '@/types/repo'
import Link from 'next/link'
import React from 'react'
import { FaCodeBranch, FaEye, FaStar } from 'react-icons/fa'

const username = 'bradtraversy' // 안전하게 fallback username

export const dynamic = 'force-dynamic'

export default async function ReposPage() {
  let repos: Repository[] = []

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    )
    if (response.ok) {
      const data = await response.json()
      repos = Array.isArray(data) ? data : []
    } else {
      console.warn('GitHub API error:', response.status, response.statusText)
    }
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Github Repositories of {username}
      </h2>
      {repos.length > 0 ? (
        <ul>
          {repos.map((repo) => (
            <li
              key={repo.id ?? repo.name}
              className="bg-gray-100 m-4 p-4 rounded-md"
            >
              <Link href={`/repos/${repo.name ?? ''}`} className="block">
                <h3 className="text-xl font-bold">{repo.name ?? 'No name'}</h3>
                <p>{repo.description ?? 'No description'}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="flex items-center gap-1">
                    <FaStar /> {repo.stargazers_count ?? 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCodeBranch /> {repo.forks_count ?? 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaEye /> {repo.watchers_count ?? 0}
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
