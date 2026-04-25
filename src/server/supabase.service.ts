import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { env } from "./utils/env";

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient | null = null;

  constructor() {
    try {
      this.supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      });
    } catch (error) {
      console.error("[Supabase Server] Initialization error:", error);
    }
  }

  getClient() {
    if (!this.supabase) {
      throw new InternalServerErrorException(
        "Supabase server-side configuration is incomplete. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment variables."
      );
    }
    return this.supabase;
  }
}
