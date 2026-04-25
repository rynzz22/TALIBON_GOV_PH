"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTest = exports.isDevelopment = exports.isProduction = exports.env = void 0;
const zod_1 = require("zod");
// Environment variable validation schema
const envSchema = zod_1.z.object({
    // Gemini AI
    GEMINI_API_KEY: zod_1.z.string().min(1, 'GEMINI_API_KEY is required'),
    // App Configuration
    APP_URL: zod_1.z.string().url('APP_URL must be a valid URL'),
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    // Supabase
    VITE_SUPABASE_URL: zod_1.z.string().url('VITE_SUPABASE_URL must be a valid URL'),
    VITE_SUPABASE_ANON_KEY: zod_1.z.string().min(1, 'VITE_SUPABASE_ANON_KEY is required'),
    SUPABASE_URL: zod_1.z.string().url('SUPABASE_URL must be a valid URL'),
    SUPABASE_SERVICE_ROLE_KEY: zod_1.z.string().min(1, 'SUPABASE_SERVICE_ROLE_KEY is required'),
    // Payment Gateways (optional)
    HITPAY_API_KEY: zod_1.z.string().optional(),
    HITPAY_SALT: zod_1.z.string().optional(),
    XENDIT_SECRET_KEY: zod_1.z.string().optional(),
    // Optional services
    GOOGLE_MAPS_API_KEY: zod_1.z.string().optional(),
});
// Validate environment variables
let validatedEnv;
try {
    validatedEnv = envSchema.parse(process.env);
}
catch (error) {
    if (error instanceof zod_1.z.ZodError) {
        console.error('❌ Environment variable validation failed:');
        error.errors.forEach((err) => {
            console.error(`  - ${err.path.join('.')}: ${err.message}`);
        });
        process.exit(1);
    }
    throw error;
}
// Export validated environment variables
exports.env = validatedEnv;
// Helper to check if we're in production
exports.isProduction = exports.env.NODE_ENV === 'production';
exports.isDevelopment = exports.env.NODE_ENV === 'development';
exports.isTest = exports.env.NODE_ENV === 'test';
