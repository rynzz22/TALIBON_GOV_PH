import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock IntersectionObserver for framer-motion
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)