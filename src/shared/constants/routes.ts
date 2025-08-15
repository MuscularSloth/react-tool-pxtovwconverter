import type { FileRoutesByTo } from '@/routeTree.gen.ts'

export const ROUTES: Record<string, keyof FileRoutesByTo> = {
  HOME: '/',
  TEXT_CONVERT: '/textPxToVw',
  COLOR_CONVERTER: '/colorConverter',
  RATIO_CALCULATOR: '/ratioCalculator',
  SHADOW_GENERATOR: '/shadowGenerator',
  GRADIENT_GENERATOR: '/gradientGenerator',
}
