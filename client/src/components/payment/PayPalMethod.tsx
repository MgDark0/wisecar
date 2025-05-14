import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

interface PayPalMethodProps {
  amount: string;
  currency: string;
  intent: string;
}

const PayPalMethod = ({ amount, currency, intent }: PayPalMethodProps) => {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const paypalButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPayPalScript = async () => {
      setLoading(true);
      try {
        // In a real implementation, you would use the PayPal SDK
        // Here we're just simulating the experience for display purposes
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Failed to load PayPal", error);
        setLoading(false);
      }
    };

    loadPayPalScript();
  }, []);

  const handlePayPalPayment = () => {
    // This would normally be handled by the PayPal SDK
    toast({
      title: "PayPal Payment",
      description: "You would now be redirected to PayPal to complete your payment.",
    });
    
    // Simulate payment process
    setTimeout(() => {
      toast({
        title: "Payment Successful",
        description: "Your PayPal payment has been processed successfully.",
      });
      
      // Redirect to success page
      setTimeout(() => {
        setLocation('/payment-success');
      }, 1000);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-[#1E1E1E] rounded-lg border border-gray-700">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 text-white font-bold text-xl py-2 px-4 rounded">
            PayPal
          </div>
        </div>
        
        <p className="text-gray-300 text-center mb-6">
          Pay securely using your PayPal account. You will be redirected to PayPal to complete your purchase.
        </p>
        
        <div className="flex justify-center">
          <div ref={paypalButtonRef}>
            <Button 
              onClick={handlePayPalPayment}
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-3 px-6 rounded-md"
            >
              Pay with PayPal
            </Button>
          </div>
        </div>
      </div>
      
      <div className="text-gray-400 text-sm">
        <p className="mb-2">By clicking the button above, you will be redirected to PayPal to complete your purchase securely.</p>
        <p>Total amount: {currency} {parseFloat(amount).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default PayPalMethod;