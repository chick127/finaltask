// src/app/repos/[name]/page.tsx

import Repo from '@/components/Repo'
import RepoDirs from '@/components/RepoDirs'
import CommentsList from '@/components/CommentsList'
import CommentForm from '@/components/CommentForm'
import Link from 'next/link'
import React, { Suspense } from 'react'

export default async function RepoPage({
  params,
}: {
  params: { name: string }
}) {
  // ⭐ 문제의 13번째 줄을 다음과 같이 수정합니다.
  // `params` 객체를 await하여 `name` 속성을 추출하고 `repoName`으로 할당합니다.
  const { name: repoName } = await params

  return (
    <div className="flex flex-col justify-start items-start max-w-4xl mx-auto">
      <Link
        href="/repos"
        className="bg-orange-700 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded mb-4"
      >
         Back to Repositories
      </Link>
      <Suspense fallback={<div>Loading repo...</div>}>
        <Repo name={repoName} />
      </Suspense>
      <Suspense fallback={<div>Loading directories...</div>}>
        <RepoDirs name={repoName} />
      </Suspense>
      <CommentForm repoName={repoName} />
      <Suspense fallback={<div>Loading comments...</div>}>
        <CommentsList repoName={repoName} />
      </Suspense>
    </div>
  )
}
