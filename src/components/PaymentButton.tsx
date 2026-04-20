import React, { useState } from "react";
import { CreditCard, Loader2, ArrowRight } from "lucide-react";
import { paymentService } from "../services/paymentService";
import { motion } from "motion/react";

interface PaymentButtonProps {
  itemName: string;
  amount: number;
  className?: string;
  label?: string;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ 
  itemName, 
  amount, 
  className = "", 
  label = "Pay Fee Online" 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await paymentService.createCheckoutSession(itemName, amount);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full flex items-center justify-between gap-4 px-8 py-4 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-brand-primary/20 hover:bg-brand-text transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        <div className="flex items-center gap-3">
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <CreditCard size={20} className="group-hover:rotate-12 transition-transform" />
          )}
          <span>{isLoading ? "Processing..." : label}</span>
        </div>
        {!isLoading && (
          <div className="flex items-center gap-4">
            <span className="text-white/60 font-mono tracking-tighter">PHP {amount.toLocaleString()}</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </motion.button>
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xs font-bold uppercase tracking-widest text-center bg-red-50 py-2 rounded-lg border border-red-100"
        >
          {error}
        </motion.p>
      )}
      
      <p className="text-[10px] text-brand-muted font-bold uppercase tracking-[0.15em] text-center opacity-60">
        Secure payment via Stripe. All major cards accepted.
      </p>
    </div>
  );
};

export default PaymentButton;
