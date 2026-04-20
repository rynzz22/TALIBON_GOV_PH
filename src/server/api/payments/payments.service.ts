import { Injectable, InternalServerErrorException, BadRequestException } from "@nestjs/common";
import axios, { AxiosError } from "axios";

const MIN_AMOUNT = 1;
const MAX_AMOUNT = 1_000_000;

@Injectable()
export class PaymentsService {
  private readonly hitpayBaseUrl = "https://api.hitpayapp.com/v1";

  private get headers() {
    const apiKey = process.env.HITPAY_API_KEY;
    if (!apiKey) {
      throw new InternalServerErrorException(
        "Payment gateway is not configured. Please contact the administrator."
      );
    }
    return {
      "X-BUSINESS-API-KEY": apiKey,
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
    };
  }

  async createCheckoutSession(
    itemName: string,
    amount: number,
    successUrl: string,
    cancelUrl: string
  ) {
    if (!itemName || typeof itemName !== "string" || itemName.trim().length === 0) {
      throw new BadRequestException("Item name is required.");
    }

    if (!Number.isFinite(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
      throw new BadRequestException(
        `Amount must be between ₱${MIN_AMOUNT} and ₱${MAX_AMOUNT.toLocaleString()}.`
      );
    }

    const roundedAmount = Math.round(amount * 100) / 100;

    try {
      const params = new URLSearchParams();
      params.append("amount", roundedAmount.toFixed(2));
      params.append("currency", "PHP");
      params.append("purpose", itemName.trim().slice(0, 200));
      params.append("redirect_url", successUrl);
      params.append("name", "Municipality of Talibon Payment Portal");

      const response = await axios.post(
        `${this.hitpayBaseUrl}/payment-requests`,
        params.toString(),
        {
          headers: this.headers,
          timeout: 15_000,
        }
      );

      if (!response.data?.id || !response.data?.url) {
        throw new InternalServerErrorException("Invalid response from payment gateway.");
      }

      return {
        sessionId: response.data.id as string,
        url: response.data.url as string,
      };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) {
        throw error;
      }

      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;
      const responseData = axiosError.response?.data;

      console.error("[HitPay] Error:", { status, responseData });

      if (status === 401 || status === 403) {
        throw new InternalServerErrorException(
          "Payment gateway authentication failed. Please contact support."
        );
      }

      if (status === 422) {
        throw new BadRequestException(
          "Payment request validation failed. Please check the amount and try again."
        );
      }

      if (axiosError.code === 'ECONNABORTED') {
        throw new InternalServerErrorException(
          "Payment gateway timeout. Please try again."
        );
      }

      throw new InternalServerErrorException(
        "Payment processing failed. Please try again or contact support."
      );
    }
  }
}
