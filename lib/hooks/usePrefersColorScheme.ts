import { useState, useEffect } from 'react';

export type PrefersColorScheme = 'dark' | 'light' | 'no-preference';

/**
 * React hook for determining the preferred color scheme (aka 'prefers-color-scheme').
 * When server side rendered returns `no-preference`.
 */
export const usePrefersColorScheme = (): string => {
  const [scheme, setScheme] = useState<PrefersColorScheme>('no-preference');

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return;
    }

    const isDark = window.matchMedia('(prefers-color-scheme: dark)');
    const isLight = window.matchMedia('(prefers-color-scheme: light)');

    // Get initial state
    setScheme(
      isDark.matches ? 'dark' : isLight.matches ? 'light' : 'no-preference'
    );

    // Subscribe to changes
    if (typeof isLight.addEventListener === 'function') {
      const darkListener = ({ matches }: MediaQueryListEvent) => {
        matches && setScheme('dark');
      };

      const lightListener = ({ matches }: MediaQueryListEvent) => {
        matches && setScheme('light');
      };

      isDark.addEventListener('change', darkListener);
      isLight.addEventListener('change', lightListener);

      return () => {
        isDark.removeEventListener('change', darkListener);
        isLight.removeEventListener('change', lightListener);
      };
    }

    return;
  }, []);

  return scheme;
};

export default usePrefersColorScheme;
