import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentSuccess = () => {
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-lg mx-auto bg-[#121212] rounded-xl p-8 shadow-lg border border-gray-800">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-20 w-20 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Payment Successful!</h1>
          <p className="text-gray-400 mb-6">
            Thank you for your purchase. Your transaction has been completed successfully.
          </p>
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6"></div>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between py-2 border-b border-gray-800">
            <span className="text-gray-400">Transaction ID:</span>
            <span className="text-white font-medium">{generateRandomId()}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-800">
            <span className="text-gray-400">Date:</span>
            <span className="text-white font-medium">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-800">
            <span className="text-gray-400">Status:</span>
            <span className="text-green-500 font-medium">Completed</span>
          </div>
        </div>
        
        <div className="text-center space-y-6">
          <p className="text-gray-400 text-sm">
            A confirmation email with your order details has been sent to your email address.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <Button 
              onClick={() => setLocation('/')}
              className="flex-1 bg-[#2D3748] hover:bg-[#4A5568] text-white"
            >
              Back to Home
            </Button>
            <Button 
              onClick={() => setLocation('/shop')}
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate a random transaction ID
function generateRandomId() {
  return 'TXN' + Math.random().toString(36).substring(2, 10).toUpperCase();
}

export default PaymentSuccess;