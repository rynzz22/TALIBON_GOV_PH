import '@testing-library/jest-dom'

class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

Object.assign(globalThis, {
  IntersectionObserver: IntersectionObserverStub,
})