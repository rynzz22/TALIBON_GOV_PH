import { Injectable, Inject } from "@nestjs/common";
import { SupabaseService } from "../../supabase.service";

@Injectable()
export class TransparencyService {
  constructor(@Inject(SupabaseService) private readonly supabaseService: SupabaseService) {}

  getCitizenCharter() {
    return {
      title: "Citizen's Charter",
      content: "The Citizen's Charter of Talibon outlines the services provided by the LGU and the standards for each service.",
    };
  }

  getFullDisclosure() {
    return {
      title: "Full Disclosure Policy",
      content: "Compliance with the DILG Full Disclosure Policy, ensuring transparency in local governance.",
    };
  }

  async getInfrastructure() {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from("transparency_documents")
        .select("*")
        .eq("category", "INFRASTRUCTURE")
        .order("year", { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (e) {
      return [
        { id: 1, title: "Construction of New Health Center", status: "Ongoing", budget: "5M" },
        { id: 2, title: "Road Concreting - Brgy. San Jose", status: "Completed", budget: "2M" },
      ];
    }
  }

  async getFinanceReports() {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from("transparency_documents")
        .select("*")
        .eq("category", "FINANCE")
        .order("year", { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (e) {
      return [
        { id: 1, title: "Quarterly Financial Report - Q1 2024", url: "#" },
      ];
    }
  }

  async getExecutiveOrders() {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from("transparency_documents")
        .select("*")
        .eq("category", "EXECUTIVE_ORDER")
        .order("year", { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (e) {
      return [
        { id: 1, title: "EO No. 1 - Reorganization of LGU Committees", date: "2024-01-05" },
      ];
    }
  }

  getBudget() {
    return {
      title: "Budget and Finances",
      annualBudget: "150M",
      breakdown: [
        { category: "Social Services", amount: "60M" },
        { category: "Economic Services", amount: "40M" },
        { category: "General Public Services", amount: "50M" },
      ],
    };
  }

  getBayanihanGrant() {
    return {
      title: "Bayanihan Grant",
      content: "Reports on the utilization of the Bayanihan Grant for COVID-19 response.",
    };
  }

  async getBiddings() {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from("transparency_documents")
        .select("*")
        .eq("category", "BIDDINGS")
        .order("year", { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (e) {
      return [
        { id: 1, title: "Invitation to Bid: Office Supplies", deadline: "2024-04-10" },
      ];
    }
  }

  async getOrdinances() {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from("ordinances")
        .select("*")
        .order("year", { ascending: false });
      
      if (error) throw error;
      return data;
    } catch (e) {
      return [
        { id: 1, title: "Tax Incentive Ordinance", year: 2024 },
      ];
    }
  }

  getSroi() {
    return {
      title: "Social Return on Investment",
      content: "Measuring the social impact of LGU programs and projects.",
    };
  }
}
