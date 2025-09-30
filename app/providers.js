'use client';

import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/domains/auth/hooks/useAuth';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        storageKey="theme"
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}