import { Injectable, InternalServerErrorException } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class PaymentsService {
  private readonly paymongoBaseUrl = "https://api.paymongo.com/v1";

  private get authHeader() {
    const secretKey = process.env.PAYMONGO_SECRET_KEY;
    if (!secretKey) {
      throw new InternalServerErrorException("PAYMONGO_SECRET_KEY is not defined in environment variables.");
    }
    return {
      Authorization: `Basic ${Buffer.from(secretKey).toString("base64")}`,
      "Content-Type": "application/json",
    };
  }

  async createCheckoutSession(itemName: string, amount: number, successUrl: string, cancelUrl: string) {
    try {
      const response = await axios.post(
        `${this.paymongoBaseUrl}/checkout_sessions`,
        {
          data: {
            attributes: {
              billing: {
                address: {
                  city: "Talibon",
                  country: "PH",
                  line1: "Municipal Hall, Poblacion",
                  postal_code: "6325",
                  state: "Bohol",
                },
              },
              line_items: [
                {
                  amount: amount * 100, // PayMongo expects amount in cents/centavos
                  currency: "PHP",
                  name: itemName,
                  quantity: 1,
                  description: "Municipal Official Fee - Talibon, Bohol, Philippines",
                },
              ],
              payment_method_types: ["card", "gcash", "grab_pay", "maya", "7eleven"],
              success_url: successUrl,
              cancel_url: cancelUrl,
              description: `Payment for ${itemName} - Municipality of Talibon`,
            },
          },
        },
        { headers: this.authHeader }
      );

      return { 
        sessionId: response.data.data.id, 
        url: response.data.data.attributes.checkout_url 
      };
    } catch (error: any) {
      console.error("PayMongo Error:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.errors?.[0]?.detail || error.message;
      throw new InternalServerErrorException(`PayMongo Error: ${errorMessage}`);
    }
  }
}
