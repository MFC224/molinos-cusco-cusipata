import "@testing-library/jest-dom";

// Mock matchMedia for jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock ResizeObserver for jsdom & Lenis
global.ResizeObserver = class ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
};

// Mock requestAnimationFrame & cancelAnimationFrame
window.requestAnimationFrame = (callback: FrameRequestCallback): number => {
  return setTimeout(callback, 16) as unknown as number;
};
window.cancelAnimationFrame = (id: number): void => {
  clearTimeout(id);
};
