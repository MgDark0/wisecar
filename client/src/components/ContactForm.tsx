import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactSchema } from "@shared/schema";

const ContactForm = () => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interest: "purchase",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof contactSchema>) => {
      const res = await apiRequest("POST", "/api/contact", values);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "We've received your inquiry and will contact you shortly.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-400">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  className="bg-[#1E1E1E] border border-[#2D3748] rounded-md px-4 py-3 text-white focus:ring-amber-400 placeholder-gray-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-400">Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="bg-[#1E1E1E] border border-[#2D3748] rounded-md px-4 py-3 text-white focus:ring-amber-400 placeholder-gray-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-400">Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="(123) 456-7890"
                  className="bg-[#1E1E1E] border border-[#2D3748] rounded-md px-4 py-3 text-white focus:ring-amber-400 placeholder-gray-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="interest"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-400">Interested In</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-[#1E1E1E] border border-[#2D3748] rounded-md px-4 py-3 text-white focus:ring-amber-400">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-[#1E1E1E] border border-[#2D3748] text-white">
                  <SelectItem value="purchase">New Vehicle Purchase</SelectItem>
                  <SelectItem value="test-drive">Test Drive</SelectItem>
                  <SelectItem value="financing">Financing Options</SelectItem>
                  <SelectItem value="trade-in">Trade-In Valuation</SelectItem>
                  <SelectItem value="other">Other Inquiry</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-sm font-medium text-gray-400">Your Message</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Tell us about your automotive needs..."
                  className="bg-[#1E1E1E] border border-[#2D3748] rounded-md px-4 py-3 text-white focus:ring-amber-400 placeholder-gray-500 min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="md:col-span-2">
          <Button 
            type="submit" 
            disabled={isPending}
            className="bg-accent hover:bg-red-700 text-white font-montserrat uppercase tracking-wider text-sm py-3 px-8 rounded-md transition-colors duration-300"
          >
            {isPending ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
