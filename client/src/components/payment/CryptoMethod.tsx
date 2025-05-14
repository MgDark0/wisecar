import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Copy } from "lucide-react";

interface CryptoMethodProps {
  amount: number;
}

interface CryptoOption {
  name: string;
  symbol: string;
  icon: React.ReactNode;
  address: string;
  rate: number;
}

const CryptoMethod = ({ amount }: CryptoMethodProps) => {
  const { toast } = useToast();
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  
  // Mock crypto options - in a real implementation these would come from an API
  const cryptoOptions: CryptoOption[] = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      icon: <div className="bg-orange-500 text-white p-1 rounded-full">₿</div>,
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      rate: 0.000022, // BTC per USD
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      icon: <div className="bg-purple-500 text-white p-1 rounded-full">Ξ</div>,
      address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      rate: 0.00035, // ETH per USD
    },
    {
      name: "USDC",
      symbol: "USDC",
      icon: <div className="bg-blue-500 text-white p-1 rounded-full">$</div>,
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      rate: 1, // USDC per USD (1:1)
    },
  ];
  
  const selectedOption = cryptoOptions.find(crypto => crypto.symbol.toLowerCase() === selectedCrypto);
  
  const handleCopyAddress = () => {
    if (selectedOption) {
      navigator.clipboard.writeText(selectedOption.address);
      toast({
        title: "Address Copied",
        description: `${selectedOption.name} address copied to clipboard`,
      });
    }
  };
  
  const calculateCryptoAmount = (usdAmount: number, rate: number) => {
    return (usdAmount * rate).toFixed(8);
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="bitcoin" value={selectedCrypto} onValueChange={setSelectedCrypto}>
        <TabsList className="grid grid-cols-3 bg-[#1E1E1E]">
          {cryptoOptions.map((crypto) => (
            <TabsTrigger 
              key={crypto.symbol} 
              value={crypto.symbol.toLowerCase()}
              className="data-[state=active]:bg-[#2D3748]"
            >
              <div className="flex items-center space-x-2">
                {crypto.icon}
                <span>{crypto.symbol}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {cryptoOptions.map((crypto) => (
          <TabsContent key={crypto.symbol} value={crypto.symbol.toLowerCase()}>
            <div className="p-6 bg-[#1E1E1E] rounded-lg border border-gray-700">
              <div className="text-center mb-6">
                <div className="inline-block p-3 rounded-full bg-[#2D3748] mb-3">
                  {crypto.icon}
                </div>
                <h3 className="text-white text-lg font-bold">{crypto.name}</h3>
                <p className="text-gray-400">
                  Pay with {crypto.name} ({crypto.symbol})
                </p>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-2">Amount to pay:</p>
                <div className="flex justify-between items-center p-3 bg-[#121212] rounded-md">
                  <span className="text-amber-400 font-mono">
                    {calculateCryptoAmount(amount, crypto.rate)} {crypto.symbol}
                  </span>
                  <span className="text-gray-500 text-sm">
                    ≈ ${amount.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-2">{crypto.name} Address:</p>
                <div className="flex justify-between items-center p-3 bg-[#121212] rounded-md">
                  <span className="text-white font-mono text-xs truncate max-w-[200px]">
                    {crypto.address}
                  </span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={handleCopyAddress}
                    className="ml-2 text-gray-400 hover:text-white"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="text-center">
                <div className="mb-6 p-4 bg-[#121212] rounded-md inline-block">
                  {/* This would be a QR code in a real implementation */}
                  <div className="w-32 h-32 grid grid-cols-5 grid-rows-5 gap-1">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div key={i} className={`bg-${Math.random() > 0.5 ? 'white' : '[#121212]'}`}></div>
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-gray-400">
                  Scan this QR code or copy the address above to pay
                </p>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="text-gray-400 text-sm space-y-2">
        <p>
          Once we detect your payment, your order will be processed automatically.
        </p>
        <p>
          Payment status will be updated automatically - no need to refresh the page.
        </p>
      </div>
    </div>
  );
};

export default CryptoMethod;