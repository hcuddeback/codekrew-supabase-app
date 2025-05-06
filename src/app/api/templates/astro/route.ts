// /src/app/api/templates/astro/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { loadAstroStarter } from '@/lib/templates/loadAstroStarter'

export async function GET(_req: NextRequest) {
  const files = loadAstroStarter()
  return NextResponse.json(files)
}
