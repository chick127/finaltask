// components/Repo.tsx (최종 수정 코드)

import { githubuser } from '@/types/content'

import Link from 'next/link'

import { FaStar, FaCodeBranch, FaEye } from 'react-icons/fa'

import Image from 'next/image' // ⭐ Image 컴포넌트 import 추가

import { notFound } from 'next/navigation' // ⭐ 오류 처리를 위한 notFound import

import { getCustomRepoDetail } from '@/data/customRepos'

interface RepoProps {
  name: string
}

export default async function Repo({ name }: RepoProps) {
  const username = githubuser

  // 2. GitHub API 호출

  const response = await fetch(
    `https://api.github.com/repos/${username}/${name}`,

    { next: { revalidate: 3600 } }
  )

  // ⭐ API 오류 처리: 응답이 성공(ok)하지 않으면 404 페이지로 처리합니다.

  if (!response.ok) {
    console.error(`GitHub API Error: ${response.status} ${response.statusText}`)

    return notFound()
  }

  const repo = await response.json()

  // ⭐ repo 객체에 필수 데이터가 없는 경우도 처리합니다.

  if (!repo || !repo.name) {
    return notFound()
  }

  // 3. 사용자 정의 데이터 가져오기

  const customDetail = getCustomRepoDetail(name)

  return (
    <div className="w-full">
      {/* ------------------------------------- */}

      {/* 🚀 1. 제목 및 GitHub 링크 */}

      {/* ------------------------------------- */}

      <h3 className="text-3xl font-bold mb-4 text-orange-900">
        <Link
          href={`https://github.com/${username}/${name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {repo.name}
        </Link>
      </h3>

      {/* ------------------------------------- */}

      {/* ⭐ 2. 프로젝트 이미지 (설명 위에 위치) */}

      {/* ------------------------------------- */}

      {customDetail?.imageUrl && (
        <div className="mb-6 rounded-lg overflow-hidden shadow-xl">
          <Image
            src={customDetail.imageUrl}
            alt={`${repo.name} 프로젝트 미리보기`}
            width={800} // ⭐ 이미지의 너비 (필수)
            height={450} // ⭐ 이미지의 높이 (필수)
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* ------------------------------------- */}

      {/* 3. 상세 소개 (이미지 아래에 위치) */}

      {/* ------------------------------------- */}

      {customDetail?.fullDescription && (
        <section className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-lg font-semibold mb-2">프로젝트 소개:</p>

          <p className="text-gray-700 whitespace-pre-wrap">
            {customDetail.fullDescription}
          </p>
        </section>
      )}

      {/* 1-2. GitHub 기본 description (API 데이터 사용) */}

      <p className="text-gray-600 italic mb-4">{repo.description}</p>

      {/* ------------------------------------- */}

      {/* 🔗 4. 사이트로 들어가는 링크 구현 */}

      {/* ------------------------------------- */}

      {customDetail?.siteUrl && (
        <div className="mb-6">
          <a
            href={customDetail.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            🚀 배포된 사이트 바로가기
          </a>
        </div>
      )}

      {/* ------------------------------------- */}

      {/* 📊 5. GitHub 통계 정보 */}

      {/* ------------------------------------- */}

      <div className="flex justify-start items-center space-x-6 text-lg text-gray-600">
        <span className="flex items-center gap-1">
          <FaStar className="text-yellow-500 w-5 h-5" /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <FaCodeBranch className="text-red-500 w-5 h-5" /> {repo.forks_count}
        </span>
        <span className="flex items-center gap-1">
          <FaEye className="text-blue-500 w-5 h-5" /> {repo.watchers_count}
        </span>
      </div>
    </div>
  )
}
