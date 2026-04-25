import { z } from 'zod'
import { config } from 'dotenv-safe'

config({ allowEmptyValues: true })

// Environment variable validation schema
const envSchema = z.object({
  // Gemini AI
  GEMINI_API_KEY: z.string().min(1, 'GEMINI_API_KEY is required'),

  // App Configuration
  APP_URL: z.string().url('APP_URL must be a valid URL'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Supabase
  VITE_SUPABASE_URL: z.string().url('VITE_SUPABASE_URL must be a valid URL'),
  VITE_SUPABASE_ANON_KEY: z.string().min(1, 'VITE_SUPABASE_ANON_KEY is required'),
  SUPABASE_URL: z.string().url('SUPABASE_URL must be a valid URL'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'SUPABASE_SERVICE_ROLE_KEY is required'),

  // Payment Gateways (optional)
  HITPAY_API_KEY: z.string().optional(),
  HITPAY_SALT: z.string().optional(),
  XENDIT_SECRET_KEY: z.string().optional(),

  // Optional services
  GOOGLE_MAPS_API_KEY: z.string().optional(),
})

// Validate environment variables
let validatedEnv: z.infer<typeof envSchema>

try {
  validatedEnv = envSchema.parse(process.env)
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('❌ Environment variable validation failed:')
    error.issues.forEach((issue) => {
      console.error(`  - ${issue.path.join('.')}: ${issue.message}`)
    })
    process.exit(1)
  }
  throw error
}

// Export validated environment variables
export const env = validatedEnv

// Helper to check if we're in production
export const isProduction = env.NODE_ENV === 'production'
export const isDevelopment = env.NODE_ENV === 'development'
export const isTest = env.NODE_ENV === 'test'