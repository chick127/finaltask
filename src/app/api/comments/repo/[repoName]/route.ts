import connectMongoDB from '@/libs/mongodb'
import Comment from '@/models/comment'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { repoName: string } }
) {
  try {
    const { repoName } = params

    await connectMongoDB()

    const comments = await Comment.find({ repoName }).sort({ createdAt: -1 })

    return NextResponse.json(comments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
