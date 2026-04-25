# 🚀 Deployment Guide

## Quick Deploy Options

### Option 1: Vercel (Recommended) ⭐

**Best for:** Full-stack applications with serverless functions

1. **Connect Repository**
   ```bash
   npm i -g vercel
   vercel login
   vercel --prod
   ```

2. **Set Environment Variables**
   - Go to Vercel Dashboard > Project Settings > Environment Variables
   - Copy values from `.env.production`

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

**Best for:** Static sites with serverless functions

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Connect your GitHub repository

2. **Set Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Set Environment Variables**
   - Go to Site Settings > Environment Variables
   - Copy values from `.env.production`

### Option 3: Railway

**Best for:** Docker-based deployments

1. **Connect Repository**
   ```bash
   npm install -g @railway/cli
   railway login
   railway link
   ```

2. **Deploy**
   ```bash
   railway up
   ```

3. **Set Environment Variables**
   ```bash
   railway variables set NODE_ENV=production
   # Set other variables...
   ```

### Option 4: Docker (Self-hosted)

**Best for:** Full control over infrastructure

1. **Build Image**
   ```bash
   docker build -t talibon-gov-ph .
   ```

2. **Run Container**
   ```bash
   docker run -p 3000:3000 \
     -e NODE_ENV=production \
     -e SUPABASE_URL=your_url \
     # ... other env vars
     talibon-gov-ph
   ```

3. **Using Docker Compose**
   ```bash
   docker-compose up -d
   ```

## Environment Variables Setup

### Required Variables
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `VITE_SUPABASE_URL` - Same as SUPABASE_URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anon key
- `GEMINI_API_KEY` - Google Gemini AI key

### Optional Variables
- `HITPAY_API_KEY` - For HitPay payments
- `HITPAY_SALT` - For HitPay payments
- `XENDIT_SECRET_KEY` - For Xendit payments
- `GOOGLE_MAPS_API_KEY` - For Google Maps integration

## Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] API endpoints respond correctly
- [ ] Database connections work
- [ ] Payment integrations function
- [ ] AI features work
- [ ] All pages load without errors
- [ ] Mobile responsiveness verified
- [ ] SSL certificate active
- [ ] Domain configured correctly

## Monitoring & Maintenance

### Health Checks
- Health endpoint: `GET /api/health`
- Monitor response times and error rates

### Logs
- Check platform-specific logging (Vercel Dashboard, Railway logs, etc.)
- Set up error tracking (Sentry, LogRocket)

### Backups
- Supabase handles database backups automatically
- Consider additional backup strategies for critical data

## Troubleshooting

### Common Issues

**Build Fails**
- Check Node.js version (requires 20+)
- Verify all environment variables are set
- Check build logs for specific errors

**API Errors**
- Verify Supabase keys are correct
- Check database permissions
- Confirm API endpoints are accessible

**Payment Issues**
- Verify payment gateway keys
- Check webhook configurations
- Test with small amounts first

**Performance Issues**
- Enable caching where appropriate
- Optimize images and assets
- Consider CDN for static assets

## Security Considerations

- ✅ Environment variables properly configured
- ✅ HTTPS enabled
- ✅ Sensitive data not logged
- ✅ API keys regenerated (see SECURITY.md)
- ✅ CORS properly configured
- ✅ Rate limiting implemented

---

**Need help?** Check the [README.md](README.md) or create an issue in the repository.