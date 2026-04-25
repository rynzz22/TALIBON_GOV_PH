import { render, screen, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import type { ReactElement } from 'react'
import About from '../components/About'
import { supabase } from '../lib/supabase'

const renderWithRouter = (ui: ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

// Mock Supabase
vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn()
  }
}))

describe('About Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: null,
            error: { message: 'Not found' },
          }),
        }),
      }),
    } as any)
  })

  it('renders loading state initially', () => {
    renderWithRouter(<About />)
    // Check for loading skeleton - should have animate-pulse class
    const skeletonContainer = document.querySelector('.animate-pulse')
    expect(skeletonContainer).toBeInTheDocument()
  })

  it('renders content after successful fetch', async () => {
    const mockData = {
      description: 'Test description',
      vision: 'Test vision',
      mission: 'Test mission',
      mayor: {
        name: 'Test Mayor',
        title: 'Test Title',
        image: 'test.jpg'
      }
    }

    // Set up mock after clearing
    const mockSingle = vi.fn().mockResolvedValue({
      data: { body: mockData },
      error: null
    })
    const mockEq = vi.fn().mockReturnValue({ single: mockSingle })
    const mockSelect = vi.fn().mockReturnValue({ eq: mockEq })
    vi.mocked(supabase.from).mockReturnValue({ select: mockSelect } as any)

    renderWithRouter(<About />)

    await waitFor(() => {
      expect(screen.getByText('Our Story')).toBeInTheDocument()
      expect(screen.getByText('Test description')).toBeInTheDocument()
    })
  })

  it('handles fetch error gracefully', async () => {
    const mockSingle = vi.fn().mockResolvedValue({
      data: null,
      error: { message: 'Fetch failed' }
    })
    const mockEq = vi.fn().mockReturnValue({ single: mockSingle })
    const mockSelect = vi.fn().mockReturnValue({ eq: mockEq })
    vi.mocked(supabase.from).mockReturnValue({ select: mockSelect } as any)

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    renderWithRouter(<About />)

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching about content:', expect.any(Object))
    })

    consoleSpy.mockRestore()
  })
})