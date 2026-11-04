import "@testing-library/jest-dom";
import { afterEach, afterAll } from "vitest";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Mock requestAnimationFrame & cancelAnimationFrame globally
const mockRaf = (callback: FrameRequestCallback): number => {
  return setTimeout(callback, 16) as unknown as number;
};
const mockCaf = (id: number): void => {
  clearTimeout(id);
};

window.requestAnimationFrame = mockRaf;
window.cancelAnimationFrame = mockCaf;
globalThis.requestAnimationFrame = mockRaf;
globalThis.cancelAnimationFrame = mockCaf;
(global as Record<string, unknown>).requestAnimationFrame = mockRaf;
(global as Record<string, unknown>).cancelAnimationFrame = mockCaf;

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
globalThis.ResizeObserver = class ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
};

// Mock HTMLCanvasElement.getContext
HTMLCanvasElement.prototype.getContext = (() => ({
  fillRect: () => {},
  clearRect: () => {},
  getImageData: () => ({ data: new Array(4) }),
  putImageData: () => {},
  createImageData: () => [],
  setTransform: () => {},
  drawImage: () => {},
  save: () => {},
  fillText: () => {},
  restore: () => {},
  beginPath: () => {},
  moveTo: () => {},
  lineTo: () => {},
  closePath: () => {},
  stroke: () => {},
  translate: () => {},
  scale: () => {},
  rotate: () => {},
  arc: () => {},
  fill: () => {},
  measureText: () => ({ width: 0 }),
  transform: () => {},
  rect: () => {},
  clip: () => {},
})) as unknown as typeof HTMLCanvasElement.prototype.getContext;

// Disable ScrollTrigger and stop _rafBugFix loop to cleanly tear down
afterEach(() => {
  try {
    ScrollTrigger.disable(true, true);
  } catch {
    // Ignore if ScrollTrigger wasn't registered
  }
});

afterAll(() => {
  try {
    ScrollTrigger.disable(true, true);
    ScrollTrigger.clearMatchMedia();
  } catch {
    // Ignore
  }
});
