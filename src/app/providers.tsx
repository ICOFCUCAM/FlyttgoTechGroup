'use client';

import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { AppProvider } from '@/contexts/AppContext';
import { CommandPaletteProvider } from '@/components/flytt/CommandPalette';
import ScrollToTop from '@/components/flytt/ScrollToTop';
import { I18nProvider } from '@/lib/i18n/I18nProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, refetchOnWindowFocus: false },
        },
      }),
  );

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <I18nProvider>
            <AppProvider>
              <CommandPaletteProvider>
                {children}
                <ScrollToTop />
                <Toaster />
                <Sonner />
              </CommandPaletteProvider>
            </AppProvider>
          </I18nProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
