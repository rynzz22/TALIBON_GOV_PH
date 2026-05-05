import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function bootstrap() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // API Middleware
  app.use(express.json());

  // API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Serve front-end
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Application is running on: http://localhost:${PORT}`);
  });
}

bootstrap();
