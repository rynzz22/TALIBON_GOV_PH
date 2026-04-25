import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import { config } from "dotenv";

// Load environment variables from .env if it exists
config();

// Log missing critical variables instead of crashing
const criticalVars = ['GEMINI_API_KEY', 'SUPABASE_SERVICE_ROLE_KEY'];
criticalVars.forEach(v => {
  if (!process.env[v]) {
    console.warn(`WARNING: Missing environment variable ${v}. Some features may not work.`);
  }
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("Bootstrap");
  const PORT = process.env.PORT || 3000;

  // Security headers (skip in development for HMR)
  if (process.env.NODE_ENV !== 'development') {
    app.use(helmet());
  }

  // Enable CORS for frontend
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, "0.0.0.0");
  logger.log(`Server running on http://localhost:${PORT}`);
}

bootstrap();
