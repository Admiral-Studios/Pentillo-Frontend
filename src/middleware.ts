'next client'

import { NextRequest, NextResponse, NextFetchEvent } from 'next/server'
import { NAV_LINKS } from './utils/constants/nav'
import axiosApi from './data/axiosApi'

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  if (req.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next()
  }

  event.waitUntil(axiosApi.get('/auth/authenticate'))

  return NextResponse.next()
}
