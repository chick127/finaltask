import { githubuser } from '@/types/content'
import { Repository } from '@/types/repo'
import Link from 'next/link'
import React from 'react'
import { FaCodeBranch, FaEye, FaStar } from 'react-icons/fa'

const username = typeof githubuser === 'string' ? githubuser : 'bradtraversy'

export default async function ReposPage() {
  let repos: Repository[] = []

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN || ''}`,
      },
    })
    const data = await res.json()
    repos = Array.isArray(data) ? data : []
  } catch (err) {
    console.error('Error fetching repos:', err)
    repos = []
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Github Repositories of {username}
      </h2>
      {repos.length > 0 ? (
        <ul>
          {repos.map((repo: Repository) => (
            <li key={repo.id} className="bg-gray-100 m-4 p-4 rounded-md">
              <Link href={`/repos/${repo.name}`}>
                <h3 className="text-xl font-bold">{repo.name}</h3>
                <p>{repo.description}</p>
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <FaStar /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center">
                    <FaCodeBranch /> {repo.forks_count}
                  </span>
                  <span className="flex items-center">
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
