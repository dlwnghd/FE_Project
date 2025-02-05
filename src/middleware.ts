import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { match } from 'path-to-regexp'

const matchersForAuth = [
  '/seoul-signiel/board/:path*', // board 페이지와 그 하위 경로
  // 필요한 경로를 추가
]

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value

  // 리디렉션 설정
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/seoul-signiel', request.url))
  }

  // 인증이 필요한 경로 검사
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    if (accessToken) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/seoul-signiel/login', request.url))
    }
  }

  return NextResponse.next()
}

function isMatch(pathname: string, urls: string[]) {
  return pathname !== '/' && urls.some(url => !!match(url)(pathname))
}

export const config = {
  matcher: [
    /*
     * 아래의 경로는 미들웨어의 필터링을 건너띔:
     * - api/session, api/user (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth/*|font/*|_next/static|_next/imgs|favicon.ico).*)',
  ],
}
