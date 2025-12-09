import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const session = req.nextauth.token
    const { pathname } = req.nextUrl

    const isLoggedIn = !!session?.user
    const isProtectedPage = ['/project'].some((p) => pathname.startsWith(p))

    // 로그인 안 했는데 보호 페이지 접근 → 로그인 페이지로 redirect
    if (isProtectedPage && !isLoggedIn) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

// middleware가 동작할 경로
export const config = {
  matcher: ['/project/:path*'],
}
