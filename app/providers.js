'use client';

import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/providers/local-auth';

export default function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="theme"
    >
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}