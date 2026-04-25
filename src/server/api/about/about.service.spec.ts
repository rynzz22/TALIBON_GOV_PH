import { Test, TestingModule } from '@nestjs/testing'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { AboutService } from './about.service'
import { SupabaseService } from '../../supabase.service'

describe('AboutService', () => {
  let service: AboutService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AboutService,
        {
          provide: SupabaseService,
          useValue: {
            getClient: vi.fn()
          }
        }
      ],
    }).compile()

    service = module.get<AboutService>(AboutService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getProfile', () => {
    it('should return profile data', () => {
      const result = service.getProfile()
      expect(result).toHaveProperty('title', 'Brief Profile')
      expect(result).toHaveProperty('content')
      expect(result.content).toContain('Talibon')
      expect(result.content).toContain('Seafood Capital of Bohol')
    })
  })

  describe('getSeal', () => {
    it('should return seal data', () => {
      const result = service.getSeal()
      expect(result).toHaveProperty('title', 'Official Seal')
      expect(result).toHaveProperty('description')
      expect(result.description).toContain('maritime heritage')
    })
  })
})