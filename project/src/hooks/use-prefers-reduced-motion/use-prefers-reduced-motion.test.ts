import { renderHook } from '@testing-library/react-hooks';
import usePrefersReducedMotion from './use-prefers-reduced-motion';

describe('Hook: usePrefersReducedMotion', () => {
  it('should return "false"', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: no-preference)' ,
      media: '',
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => usePrefersReducedMotion());

    const [prefersReducedMotion] = result.current;
    expect(prefersReducedMotion).toBe(false);
  });

  it('should return "true" when media query match', () => {

    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)' ,
      media: '',
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => usePrefersReducedMotion());

    const [prefersReducedMotion] = result.current;
    expect(prefersReducedMotion).toBe(true);
  });

  it('should subscribe after mount and unsubscribe after unmount', () => {
    const addEventListener = jest.fn();
    const removeEventListener = jest.fn();

    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)' ,
      media: '',
      onchange: null,
      addEventListener,
      removeEventListener,
    }));

    const { unmount} = renderHook(() => usePrefersReducedMotion());

    expect(addEventListener).toBeCalledTimes(1);

    unmount();
    expect(removeEventListener).toBeCalledTimes(1);
  });
});
