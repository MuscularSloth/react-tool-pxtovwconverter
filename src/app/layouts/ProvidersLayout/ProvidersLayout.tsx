import { CookiesProvider } from 'react-cookie'
import { ThemeProvider } from '@/app/providers/ThemeProvider/ThemeProvider.tsx'
import { AppLayout } from '@/app/layouts/AppLayout/AppLayout.tsx'
import { Toaster } from '@/shared/components/ui/sonner.tsx'

export function ProvidersLayout() {
  return (
    <CookiesProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppLayout />
        <Toaster position="top-center" />
      </ThemeProvider>
    </CookiesProvider>
  )
}
