'use client'

import { useEffect, useState } from 'react'

interface Comment {
  _id: string
  repoName: string
  author: string
  content: string
  createdAt: string
}

interface CommentsListProps {
  repoName: string
}

export default function CommentsList({ repoName }: CommentsListProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [editAuthor, setEditAuthor] = useState('')

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments/repo/${repoName}`)
        if (response.ok) {
          const data = await response.json()
          setComments(data)
        } else {
          setError('Failed to fetch comments')
        }
      } catch (err) {
        setError('An error occurred while fetching comments')
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [repoName])

  const handleEdit = (id: string, content: string, author: string) => {
    setEditingId(id)
    setEditContent(content)
    setEditAuthor(author)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditContent('')
    setEditAuthor('')
  }

  const handleSaveEdit = async (id: string) => {
    if (!editContent.trim() || !editAuthor.trim()) {
      alert('댓글 내용과 작성자를 모두 입력해주세요.')
      return
    }

    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editContent.trim(),
          author: editAuthor.trim(),
        }),
      })

      if (response.ok) {
        setComments(
          comments.map((comment) =>
            comment._id === id
              ? {
                  ...comment,
                  content: editContent.trim(),
                  author: editAuthor.trim(),
                }
              : comment
          )
        )
        setEditingId(null)
        setEditContent('')
        setEditAuthor('')
        alert('댓글이 수정되었습니다.')
      } else {
        let errorData
        try {
          errorData = await response.json()
        } catch {
          errorData = { error: 'Unknown error' }
        }
        alert(`수정 실패: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Error updating comment:', error)
      alert('댓글 수정 중 오류가 발생했습니다.')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      return
    }

    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setComments(comments.filter((comment) => comment._id !== id))
        alert('댓글이 삭제되었습니다.')
      } else {
        let errorData
        try {
          errorData = await response.json()
        } catch {
          errorData = { error: 'Unknown error' }
        }
        alert(`삭제 실패: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Error deleting comment:', error)
      alert('댓글 삭제 중 오류가 발생했습니다.')
    }
  }

  if (loading) {
    return (
      <div className="mt-8 p-6 border border-gray-200 rounded-lg bg-white shadow-md w-full">
        Loading comments...
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-8 p-6 border border-gray-200 rounded-lg bg-red-50 text-red-700 w-full">
        {error}
      </div>
    )
  }

  return (
    <div className="mt-8 p-6 border border-gray-200 rounded-lg bg-white shadow-md w-full">
      <h3 className="text-lg font-semibold mb-4">댓글 ({comments.length})</h3>
      {comments.length === 0 ? (
        <p className="text-gray-500">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-white p-4 rounded-md shadow-sm border"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-gray-900">
                  {comment.author}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>

              {editingId === comment._id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editAuthor}
                    onChange={(e) => setEditAuthor(e.target.value)}
                    placeholder="작성자"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={3}
                    placeholder="댓글 내용"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSaveEdit(comment._id)}
                      className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
                    >
                      저장
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-1 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <p className="text-gray-700 flex-1">{comment.content}</p>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() =>
                        handleEdit(comment._id, comment.content, comment.author)
                      }
                      className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
