import auth from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default auth((req) => {
  return NextResponse.next()
})

export const config = {
  matcher: ['/about', '/project', '/team'],
}
