import { handlers } from '@/auth'
import type { NextRequest } from 'next/server'

type RouteHandler = (
  request: NextRequest,
  context: { params: Promise<{ nextauth: string[] }> }
) => void | Response | Promise<void | Response>

export const GET = handlers.GET as RouteHandler
export const POST = handlers.POST as RouteHandler
