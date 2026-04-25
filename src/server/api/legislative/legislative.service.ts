import { Injectable, Inject } from "@nestjs/common";
import { SupabaseService } from "../../supabase.service";

@Injectable()
export class LegislativeService {
  constructor(@Inject(SupabaseService) private readonly supabaseService: SupabaseService) {}

  getMandate() {
    return {
      title: "Legislative Mandate",
      content: "The Sangguniang Bayan is the legislative body of the municipality, responsible for enacting ordinances and resolutions.",
    };
  }

  getStructure() {
    return {
      title: "Organizational Structure",
      imageUrl: "https://talibon.gov.ph/wp-content/themes/yootheme/cache/05/viber_image_2025-10-24_14-50-54-459-05f74d51.webp",
    };
  }

  async getOrdinances() {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from("ordinances")
        .select("*")
        .is("barangay_id", null)
        .order("year", { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (e) {
      return [
        { id: "2023-01", title: "Environmental Protection Ordinance", date: "2023-01-15" },
        { id: "2023-02", title: "Traffic Management Code", date: "2023-02-20" },
      ];
    }
  }

  async getResolutions() {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from("resolutions")
        .select("*")
        .order("date", { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (e) {
      return [
        { id: "RES-2023-01", title: "Resolution for New Public Market", date: "2023-01-10" },
      ];
    }
  }

  async getReports() {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from("legislative_reports")
        .select("*")
        .order("date", { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (e) {
      return [];
    }
  }
}
