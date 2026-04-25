#!/bin/bash

# Talibon Government Website - Deployment Script
# Usage: ./deploy.sh [platform]
# Platforms: vercel, netlify, railway, docker

set -e

PLATFORM=${1:-vercel}
PROJECT_NAME="talibon-gov-ph"

echo "🚀 Deploying $PROJECT_NAME to $PLATFORM"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local not found!"
    echo "Please copy .env.example to .env.local and configure your environment variables."
    echo "See SECURITY.md for details."
    exit 1
fi

# Check if build works
echo "📦 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix build errors before deploying."
    exit 1
fi

echo "✅ Build successful"

case $PLATFORM in
    "vercel")
        echo "🔧 Deploying to Vercel..."
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi

        vercel --prod --yes
        ;;

    "netlify")
        echo "🔧 Deploying to Netlify..."
        if ! command -v netlify &> /dev/null; then
            echo "Installing Netlify CLI..."
            npm install -g netlify-cli
        fi

        netlify deploy --prod --dir=dist
        ;;

    "railway")
        echo "🔧 Deploying to Railway..."
        if ! command -v railway &> /dev/null; then
            echo "Installing Railway CLI..."
            npm install -g @railway/cli
        fi

        railway up
        ;;

    "docker")
        echo "🐳 Building Docker image..."
        docker build -t $PROJECT_NAME .

        echo "🚀 Running Docker container..."
        docker run -d \
            --name $PROJECT_NAME \
            -p 3000:3000 \
            --env-file .env.local \
            $PROJECT_NAME

        echo "✅ Container started on http://localhost:3000"
        ;;

    *)
        echo "❌ Unknown platform: $PLATFORM"
        echo "Supported platforms: vercel, netlify, railway, docker"
        exit 1
        ;;
esac

echo "🎉 Deployment completed!"
echo "Don't forget to:"
echo "  - Set environment variables in your hosting platform"
echo "  - Configure your domain"
echo "  - Test all functionality"
echo "  - Set up monitoring"