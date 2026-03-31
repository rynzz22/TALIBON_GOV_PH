import { Module, MiddlewareConsumer, NestModule, RequestMethod } from "@nestjs/common";
import { createServer as createViteServer } from "vite";
import * as path from "path";
import * as express from "express";

import { AboutController } from "./api/about/about.controller";
import { ExecutiveController } from "./api/executive/executive.controller";
import { LegislativeController } from "./api/legislative/legislative.controller";
import { NewsController } from "./api/news/news.controller";
import { TransparencyController } from "./api/transparency/transparency.controller";
import { TourismController } from "./api/tourism/tourism.controller";
import { FormsController } from "./api/forms/forms.controller";

import { SupabaseService } from "./supabase.service";

@Module({
  imports: [],
  controllers: [
    AboutController,
    ExecutiveController,
    LegislativeController,
    NewsController,
    TransparencyController,
    TourismController,
    FormsController,
  ],
  providers: [SupabaseService],
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    if (process.env.NODE_ENV !== "production") {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      consumer
        .apply(vite.middlewares)
        .forRoutes({ path: "*", method: RequestMethod.ALL });
    } else {
      const distPath = path.join(process.cwd(), "dist");
      consumer
        .apply(express.static(distPath))
        .forRoutes({ path: "*", method: RequestMethod.ALL });
      
      // Serve index.html for SPA fallback
      consumer
        .apply((req, res, next) => {
          if (!req.path.startsWith("/api")) {
            res.sendFile(path.join(distPath, "index.html"));
          } else {
            next();
          }
        })
        .forRoutes({ path: "*", method: RequestMethod.ALL });
    }
  }
}
