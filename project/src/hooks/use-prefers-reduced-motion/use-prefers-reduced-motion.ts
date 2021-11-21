import { useEffect, useState } from 'react';

function usePrefersReducedMotion(): [boolean] {

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const mediaQueryChangeHandler = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);

  useEffect(() => {
    // без этой проверки тест падает в ошибку
    if (typeof window.matchMedia === 'function') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if(mediaQuery) {
        setPrefersReducedMotion(mediaQuery.matches);
        mediaQuery.addEventListener('change', mediaQueryChangeHandler);

        return () => mediaQuery.removeEventListener('change', mediaQueryChangeHandler);
      }
    }
  }, []);

  return [prefersReducedMotion];
}

export default usePrefersReducedMotion;
