import { Outlet } from '@tanstack/react-router'
import { TanstackDevtools } from '@tanstack/react-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { useCookies } from 'react-cookie'
import styles from './AppLayout.module.scss'
import { NavigationSideBar } from '@/widgets/NavigationSideBar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar.tsx'
import { ThemeToggler } from '@/shared/components/ThemeToggler/ThemeToggler.tsx'
import { Separator } from '@/shared/components/ui/separator.tsx'

export function AppLayout() {
  const [{ sidebar_state }] = useCookies(['sidebar_state'])

  return (
    <SidebarProvider defaultOpen={!!sidebar_state}>
      <NavigationSideBar />
      <SidebarInset className={styles.container}>
        <div className="flex items-center gap-2 px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="ml-auto mr-2 data-[orientation=vertical]:h-4"
          />
          <ThemeToggler />
        </div>
        <Separator />
        <Outlet />
        <TanstackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </SidebarInset>
    </SidebarProvider>
  )
}
