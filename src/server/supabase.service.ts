import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL || "https://ngsnyjrxvqyhrbnjxwyw.supabase.co";
    const supabaseKey = process.env.SUPABASE_ANON_KEY || "placeholder-key";
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getClient() {
    return this.supabase;
  }
}
