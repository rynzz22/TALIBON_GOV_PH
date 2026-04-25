# 🔐 Security Configuration Guide

## 🚨 IMMEDIATE ACTION REQUIRED

**Your API keys have been exposed in the repository.** Follow these steps to secure your application:

## 1. Regenerate Compromised API Keys

### Supabase Keys
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings > API**
4. **Regenerate** the following keys:
   - **Project API Key** (anon/public key)
   - **Service Role Key** (keep this secret!)
5. Update your `.env.local` file with the new keys

### HitPay Keys
1. Go to [HitPay Dashboard](https://dashboard.hitpayapp.com)
2. Navigate to **Settings > API Keys**
3. **Regenerate** your API key and salt
4. Update your `.env.local` file

### Gemini AI Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. **Create a new API key**
3. **Delete the old key**
4. Update your `.env.local` file

## 2. Environment Setup

### Development (.env.local)
```bash
# Copy from .env.example and fill with your NEW keys
cp .env.example .env.local
# Edit .env.local with your regenerated keys
```

### Production
- Use environment variables in your hosting platform
- **Never commit real keys to version control**
- Use secret management services (e.g., AWS Secrets Manager, Azure Key Vault)

## 3. Security Best Practices

### ✅ What We Fixed
- ✅ Environment variable validation with Zod
- ✅ Type-safe environment access
- ✅ Proper .gitignore configuration
- ✅ Separated development/production configs

### 🔒 Additional Recommendations
- Enable 2FA on all service accounts
- Use IP restrictions where possible
- Monitor API usage for anomalies
- Rotate keys regularly (quarterly)
- Use environment-specific keys

## 4. Verification

Run this to verify your environment is secure:
```bash
npm run build  # Should pass without errors
npm run lint   # Should pass without errors
```

## 5. Emergency Checklist

- [ ] Regenerated Supabase keys
- [ ] Regenerated HitPay keys
- [ ] Regenerated Gemini API key
- [ ] Updated .env.local with new keys
- [ ] Verified application still works
- [ ] Committed security fixes
- [ ] Notified team about key rotation

---

**Status**: 🔴 ACTION REQUIRED - Keys need regeneration