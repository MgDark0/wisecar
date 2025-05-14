import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, Home } from "lucide-react";

const PaymentSuccess = () => {
  const [, setLocation] = useLocation();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock order details - in a real app, this would come from the backend
  const orderDetails = {
    orderNumber: "WC-" + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleDateString(),
    car: {
      name: "Porsche 911 GT3",
      price: 189500,
    },
    paymentMethod: "Credit Card",
    deliveryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    deliveryAddress: "123 Luxury Lane, Beverly Hills, CA 90210",
  };

  return (
    <>
      <Helmet>
        <title>Payment Successful | WiseCars</title>
        <meta name="description" content="Your luxury vehicle purchase was successful. Thank you for choosing WiseCars." />
      </Helmet>
      
      <div className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-white mb-4">
              Payment Successful
            </h1>
            <p className="text-gray-300 text-lg">
              Thank you for your purchase! Your order has been confirmed.
            </p>
          </div>
          
          <div className="bg-[#121212] rounded-xl p-8 mb-10 border border-gray-800">
            <h2 className="text-xl font-bold font-montserrat text-white mb-6">Order Summary</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Order Number</p>
                  <p className="text-white font-medium">{orderDetails.orderNumber}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Order Date</p>
                  <p className="text-white font-medium">{orderDetails.date}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-800">
                <p className="text-gray-400 text-sm mb-4">Purchase Details</p>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-medium">{orderDetails.car.name}</p>
                    <p className="text-gray-400 text-sm">Luxury Sports Car</p>
                  </div>
                  <p className="text-amber-400 font-bold">${orderDetails.car.price.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-800">
                <p className="text-gray-400 text-sm mb-4">Payment Information</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Payment Method</p>
                    <p className="text-white font-medium">{orderDetails.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Amount Paid</p>
                    <p className="text-white font-medium">${orderDetails.car.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-800">
                <p className="text-gray-400 text-sm mb-4">Delivery Information</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Estimated Delivery</p>
                    <p className="text-white font-medium">{orderDetails.deliveryDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Delivery Address</p>
                    <p className="text-white font-medium">{orderDetails.deliveryAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#121212] rounded-xl p-8 mb-10 border border-gray-800">
            <h2 className="text-xl font-bold font-montserrat text-white mb-4">What's Next?</h2>
            <p className="text-gray-300 mb-6">
              Our team will contact you shortly to coordinate the delivery of your new vehicle. In the meantime, you can track your order status in your account.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2D3748] text-white mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="text-white font-medium">Order Confirmation</p>
                  <p className="text-gray-400 text-sm">
                    Your order has been confirmed and is now being processed.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2D3748] text-white mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="text-white font-medium">Vehicle Preparation</p>
                  <p className="text-gray-400 text-sm">
                    Your vehicle is being prepared and detailed for delivery.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2D3748] text-white mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="text-white font-medium">Delivery Scheduling</p>
                  <p className="text-gray-400 text-sm">
                    Our team will contact you to schedule the delivery at your convenience.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2D3748] text-white mr-4 flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="text-white font-medium">Delivery & Orientation</p>
                  <p className="text-gray-400 text-sm">
                    Your vehicle will be delivered, and our specialist will provide a comprehensive orientation.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setLocation("/")}
              className="bg-[#2D3748] hover:bg-[#3D4A5A] text-white font-medium py-2 px-4 rounded-md"
            >
              <Home className="mr-2 h-4 w-4" /> Return to Home
            </Button>
            
            <Button 
              onClick={() => setLocation("/shop")}
              className="bg-accent hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Continue Shopping <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;