import connectMongoDB from '@/libs/mongodb'
import Comment from '@/models/comment'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  console.log('PUT request received for id:', id)
  try {
    const { content, author } = await request.json()
    console.log('Data to update:', { content, author })

    if (!content || !author) {
      return NextResponse.json(
        { error: 'Content and author are required' },
        { status: 400 }
      )
    }

    await connectMongoDB()
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { content, author },
      { new: true }
    )

    if (!updatedComment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
    }

    return NextResponse.json(updatedComment.toObject(), { status: 200 })
  } catch (error) {
    console.error('Error updating comment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  console.log('DELETE request received for id:', id)
  try {
    await connectMongoDB()
    const deletedComment = await Comment.findByIdAndDelete(id)
    console.log('Deleted comment:', deletedComment)

    if (!deletedComment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
    }

    return NextResponse.json(
      { message: 'Comment deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting comment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
