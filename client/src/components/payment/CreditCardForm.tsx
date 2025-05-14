import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Credit card validation schema
const creditCardSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  cardHolder: z.string().min(3, "Cardholder name is required"),
  expiryMonth: z.string().min(1, "Required"),
  expiryYear: z.string().min(1, "Required"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
});

type CreditCardFormValues = z.infer<typeof creditCardSchema>;

const CreditCardForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<CreditCardFormValues>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    },
  });
  
  const onSubmit = async (data: CreditCardFormValues) => {
    try {
      setIsSubmitting(true);
      
      // In a real app, you'd send this data to your payment processor
      console.log("Processing payment with:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
        variant: "default",
      });
      
      // Redirect to confirmation page or show success state
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };
  
  // Generate years for expiry
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  
  // Generate months for expiry
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  
  return (
    <Form {...form}>
      <form 
        id="credit-card-form" 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-6"
      >
        <div className="flex flex-col space-y-3">
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-400">Card Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    className="bg-[#1E1E1E] border-gray-700 text-white"
                    {...field}
                    onChange={(e) => {
                      const formattedValue = formatCardNumber(e.target.value);
                      e.target.value = formattedValue;
                      field.onChange(e.target.value.replace(/\s/g, ''));
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cardHolder"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-400">Cardholder Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="bg-[#1E1E1E] border-gray-700 text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="expiryMonth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Month</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[#1E1E1E] border-gray-700 text-white">
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#1E1E1E] border-gray-700 text-white">
                      {months.map((month) => (
                        <SelectItem 
                          key={month} 
                          value={month.toString().padStart(2, '0')}
                        >
                          {month.toString().padStart(2, '0')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="expiryYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">Year</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[#1E1E1E] border-gray-700 text-white">
                        <SelectValue placeholder="YYYY" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#1E1E1E] border-gray-700 text-white">
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">CVV</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123"
                      className="bg-[#1E1E1E] border-gray-700 text-white"
                      maxLength={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="flex items-center pt-4 mt-6 border-t border-gray-800">
          <div className="flex space-x-2">
            <div className="h-6 w-10 bg-blue-500 rounded"></div>
            <div className="h-6 w-10 bg-yellow-500 rounded"></div>
            <div className="h-6 w-10 bg-red-500 rounded"></div>
            <div className="h-6 w-10 bg-green-500 rounded"></div>
          </div>
          
          <div className="ml-auto">
            <p className="text-xs text-gray-400">All transactions are secure and encrypted.</p>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreditCardForm;