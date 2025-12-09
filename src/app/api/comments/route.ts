import connectMongoDB from '@/libs/mongodb'
import Comment from '@/models/comment'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { repoName, author, content } = await request.json()

    if (!repoName || !author || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await connectMongoDB()

    const newComment = new Comment({
      repoName,
      author,
      content,
    })

    await newComment.save()

    return NextResponse.json(
      { message: 'Comment added successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error adding comment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
