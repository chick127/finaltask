'use client'

import { useState } from 'react'

interface CommentFormProps {
  repoName: string
}

export default function CommentForm({ repoName }: CommentFormProps) {
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!author.trim() || !content.trim()) {
      alert('Please fill in all fields')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repoName,
          author: author.trim(),
          content: content.trim(),
        }),
      })

      if (response.ok) {
        alert('댓글 등록이 완료되었습니다.')
        setAuthor('')
        setContent('')
        // Optionally, refresh the page or update the comments list
        window.location.reload()
      } else {
        const errorData = await response.json()
        alert(`Error: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
      alert('An error occurred while submitting the comment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-white shadow-md w-full">
      <h3 className="text-lg font-semibold mb-4">댓글 남기기</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            사용자
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            댓글
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? '제출 중...' : '댓글 남기기'}
        </button>
      </form>
    </div>
  )
}
