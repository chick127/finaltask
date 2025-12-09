import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isProtectedPage = ['/project'].some((p) =>
    req.nextUrl.pathname.startsWith(p)
  )

  // 로그인 안 했는데 보호 페이지 접근 → 로그인 페이지로 redirect
  if (isProtectedPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/project/:path*'],
}
