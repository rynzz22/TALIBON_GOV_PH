import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import { env } from "./utils/env";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("Bootstrap");
  const PORT = process.env.PORT || 3000;

  // Security headers (skip in development for HMR)
  if (env.NODE_ENV !== 'development') {
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
