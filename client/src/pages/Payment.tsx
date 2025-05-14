import { useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Wallet, DollarSign } from "lucide-react";
import CreditCardForm from "@/components/payment/CreditCardForm";
import PayPalMethod from "@/components/payment/PayPalMethod";
import CryptoMethod from "@/components/payment/CryptoMethod";

// Mock car data for payment page
const mockCarData = {
  id: 1,
  name: "Porsche 911 GT3",
  price: 189500,
  imageUrl: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
};

const Payment = () => {
  const [, setLocation] = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  
  // This would typically come from a previous page or context
  const car = mockCarData;
  
  // Calculate costs - in a real app, these would likely come from the backend
  const subtotal = car.price;
  const taxRate = 0.07; // 7% tax
  const tax = subtotal * taxRate;
  const deliveryFee = 1500;
  const total = subtotal + tax + deliveryFee;
  
  return (
    <>
      <Helmet>
        <title>Payment | WiseCars</title>
        <meta name="description" content="Secure payment processing for your luxury vehicle purchase." />
      </Helmet>
      
      <div className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="text-gray-400 hover:text-white mb-6 pl-0"
            onClick={() => setLocation(`/cars/${car.id}`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Vehicle Details
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-white mb-6">Complete Your Purchase</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Payment Methods */}
            <div className="lg:col-span-8">
              <Card className="bg-[#121212] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Payment Method</CardTitle>
                  <CardDescription className="text-gray-400">
                    Select your preferred payment method
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                    <TabsList className="grid grid-cols-3 bg-[#1E1E1E]">
                      <TabsTrigger value="credit-card" className="data-[state=active]:bg-[#2D3748]">
                        <CreditCard className="h-4 w-4 mr-2" /> Credit Card
                      </TabsTrigger>
                      <TabsTrigger value="paypal" className="data-[state=active]:bg-[#2D3748]">
                        <DollarSign className="h-4 w-4 mr-2" /> PayPal
                      </TabsTrigger>
                      <TabsTrigger value="crypto" className="data-[state=active]:bg-[#2D3748]">
                        <Wallet className="h-4 w-4 mr-2" /> Cryptocurrency
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="credit-card" className="mt-6">
                      <CreditCardForm />
                    </TabsContent>
                    
                    <TabsContent value="paypal" className="mt-6">
                      <PayPalMethod amount={total.toString()} currency="USD" intent="CAPTURE" />
                    </TabsContent>
                    
                    <TabsContent value="crypto" className="mt-6">
                      <CryptoMethod amount={total} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-4">
              <Card className="bg-[#121212] border-gray-800 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-20 w-24 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={car.imageUrl} 
                          alt={car.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{car.name}</h3>
                        <p className="text-amber-400 font-bold">${car.price.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 space-y-2 border-t border-gray-800">
                      <div className="flex justify-between text-gray-400">
                        <span>Subtotal</span>
                        <span className="text-white">${subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Tax</span>
                        <span className="text-white">${tax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Delivery Fee</span>
                        <span className="text-white">${deliveryFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-4 border-t border-gray-800 text-lg font-bold">
                        <span className="text-white">Total</span>
                        <span className="text-amber-400">${total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-red-700 text-white font-montserrat uppercase py-6 tracking-wider transition-colors duration-300"
                    onClick={() => {
                      if (paymentMethod === "credit-card") {
                        document.getElementById("credit-card-form")?.dispatchEvent(
                          new Event("submit", { bubbles: true, cancelable: true })
                        );
                      }
                    }}
                  >
                    Complete Purchase
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;