import { render, screen, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import About from '../components/About'
import { supabase } from '../lib/supabase'

// Mock Supabase
vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn()
  }
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('About Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state initially', () => {
    const mockSupabase = vi.mocked(supabase)
    const mockSingle = vi.fn().mockResolvedValue({
      data: null,
      error: null
    })
    const mockEq = vi.fn().mockReturnValue({ single: mockSingle })
    const mockSelect = vi.fn().mockReturnValue({ eq: mockEq })
    mockSupabase.from.mockReturnValue({ select: mockSelect } as any)

    renderWithRouter(<About />)
    // Check for loading skeleton
    expect(screen.getByText('Our Story')).toBeInTheDocument()
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

    const mockSupabase = vi.mocked(supabase)
    const mockSingle = vi.fn().mockResolvedValue({
      data: { body: mockData },
      error: null
    })
    const mockEq = vi.fn().mockReturnValue({ single: mockSingle })
    const mockSelect = vi.fn().mockReturnValue({ eq: mockEq })
    mockSupabase.from.mockReturnValue({ select: mockSelect } as any)

    renderWithRouter(<About />)

    await waitFor(() => {
      expect(screen.getByText('Test description')).toBeInTheDocument()
    })
  })

  it('handles fetch error gracefully', async () => {
    const mockSupabase = vi.mocked(supabase)
    const mockSingle = vi.fn().mockResolvedValue({
      data: null,
      error: { message: 'Fetch failed' }
    })
    const mockEq = vi.fn().mockReturnValue({ single: mockSingle })
    const mockSelect = vi.fn().mockReturnValue({ eq: mockEq })
    mockSupabase.from.mockReturnValue({ select: mockSelect } as any)

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    renderWithRouter(<About />)

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching about content:', expect.any(Object))
    })

    consoleSpy.mockRestore()
  })
})