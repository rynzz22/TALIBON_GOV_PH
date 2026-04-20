import { Injectable, InternalServerErrorException } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class PaymentsService {
  private readonly hitpayBaseUrl = "https://api.hitpayapp.com/v1";

  private get headers() {
    const apiKey = process.env.HITPAY_API_KEY;
    if (!apiKey) {
      throw new InternalServerErrorException("HITPAY_API_KEY is not defined in environment variables.");
    }
    return {
      "X-BUSINESS-API-KEY": apiKey,
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
    };
  }

  async createCheckoutSession(itemName: string, amount: number, successUrl: string, cancelUrl: string) {
    try {
      // HitPay expects amount as a string or number, but some versions expect specific formats.
      // We'll use URLSearchParams for x-www-form-urlencoded
      const params = new URLSearchParams();
      params.append("amount", amount.toString());
      params.append("currency", "PHP");
      params.append("purpose", itemName);
      params.append("redirect_url", successUrl);
      params.append("name", "Talibon Payment Portal");
      // Optional: params.append("email", userEmail);

      const response = await axios.post(
        `${this.hitpayBaseUrl}/payment-requests`,
        params.toString(),
        { headers: this.headers }
      );

      // HitPay returns id and url for the payment request
      return { 
        sessionId: response.data.id, 
        url: response.data.url 
      };
    } catch (error: any) {
      console.error("HitPay Error:", error.response?.data || error.message);
      const errorMessage = typeof error.response?.data === 'string' ? error.response.data : JSON.stringify(error.response?.data || error.message);
      throw new InternalServerErrorException(`HitPay Error: ${errorMessage}`);
    }
  }
}
