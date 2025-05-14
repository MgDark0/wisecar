import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Car } from "@shared/schema";
import { ArrowLeft, Activity, Gauge, Fuel, Truck, Calendar, Cog, Award } from "lucide-react";

const CarDetails = () => {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  
  const { data: car, isLoading, error } = useQuery<Car>({
    queryKey: [`/api/cars/${params.id}`],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="animate-pulse bg-[#1E1E1E] h-96 rounded-xl mb-8"></div>
        <div className="animate-pulse bg-[#1E1E1E] h-8 w-64 rounded mb-4"></div>
        <div className="animate-pulse bg-[#1E1E1E] h-4 w-full rounded mb-2"></div>
        <div className="animate-pulse bg-[#1E1E1E] h-4 w-full rounded mb-2"></div>
        <div className="animate-pulse bg-[#1E1E1E] h-4 w-3/4 rounded"></div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Car Not Found</h2>
        <p className="text-gray-400 mb-8">The car you're looking for could not be found.</p>
        <Button 
          variant="outline"
          onClick={() => setLocation("/shop")}
          className="bg-transparent border border-accent text-accent hover:bg-accent hover:text-white"
        >
          Return to Shop
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{car.name} | WiseCars</title>
        <meta name="description" content={`Explore the ${car.name}. ${car.description}`} />
        <meta property="og:title" content={`${car.name} | WiseCars`} />
        <meta property="og:description" content={car.description} />
      </Helmet>
      
      <div className="bg-primary py-24">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="text-gray-400 hover:text-white mb-8 pl-0"
            onClick={() => setLocation("/shop")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-[#121212] rounded-xl overflow-hidden mb-8">
                <img 
                  src={car.imageUrl} 
                  alt={car.name} 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {[car.imageUrl, car.imageUrl, car.imageUrl].map((img, index) => (
                  <div key={index} className="bg-[#121212] rounded-xl overflow-hidden cursor-pointer">
                    <img 
                      src={img} 
                      alt={`${car.name} view ${index + 1}`} 
                      className="w-full h-24 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-white mb-2">{car.name}</h1>
              <div className="text-xl font-bold text-amber-400 mb-6">${car.price.toLocaleString()}</div>
              
              <p className="text-gray-300 mb-8">{car.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#121212] p-4 rounded-lg">
                  <div className="flex items-center text-gray-400 mb-1">
                    <Gauge className="h-4 w-4 mr-2" /> Engine
                  </div>
                  <div className="text-white font-semibold">{car.horsepower} HP</div>
                </div>
                <div className="bg-[#121212] p-4 rounded-lg">
                  <div className="flex items-center text-gray-400 mb-1">
                    <Activity className="h-4 w-4 mr-2" /> 0-60 mph
                  </div>
                  <div className="text-white font-semibold">{car.acceleration}s</div>
                </div>
                <div className="bg-[#121212] p-4 rounded-lg">
                  <div className="flex items-center text-gray-400 mb-1">
                    <Fuel className="h-4 w-4 mr-2" /> Fuel Economy
                  </div>
                  <div className="text-white font-semibold">{car.mpg} MPG</div>
                </div>
                <div className="bg-[#121212] p-4 rounded-lg">
                  <div className="flex items-center text-gray-400 mb-1">
                    <Truck className="h-4 w-4 mr-2" /> Type
                  </div>
                  <div className="text-white font-semibold capitalize">{car.type}</div>
                </div>
              </div>
              
              <Tabs defaultValue="specs" className="mb-8">
                <TabsList className="bg-[#121212] border-b border-gray-800 w-full justify-start">
                  <TabsTrigger value="specs" className="data-[state=active]:bg-[#2D3748]">Specifications</TabsTrigger>
                  <TabsTrigger value="features" className="data-[state=active]:bg-[#2D3748]">Features</TabsTrigger>
                  <TabsTrigger value="warranty" className="data-[state=active]:bg-[#2D3748]">Warranty</TabsTrigger>
                </TabsList>
                <TabsContent value="specs" className="pt-4">
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <Calendar className="h-4 w-4 mr-3 text-amber-400" />
                      <span>Year: 2023</span>
                    </li>
                    <li className="flex items-center">
                      <Cog className="h-4 w-4 mr-3 text-amber-400" />
                      <span>Transmission: 8-Speed Automatic</span>
                    </li>
                    <li className="flex items-center">
                      <Gauge className="h-4 w-4 mr-3 text-amber-400" />
                      <span>Engine: {car.horsepower} HP Twin-Turbo V8</span>
                    </li>
                    <li className="flex items-center">
                      <Activity className="h-4 w-4 mr-3 text-amber-400" />
                      <span>Top Speed: 205 mph</span>
                    </li>
                    <li className="flex items-center">
                      <Fuel className="h-4 w-4 mr-3 text-amber-400" />
                      <span>Fuel Type: Premium Unleaded</span>
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="features" className="pt-4">
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <Award className="h-4 w-4 mr-3 text-amber-400" />
                      <span>Premium Leather Interior</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="h-4 w-4 mr-3 text-amber-400" />
                      <span>Adaptive Cruise Control</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="h-4 w-4 mr-3 text-amber-400" />
                      <span>Lane Keeping Assist</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="h-4 w-4 mr-3 text-amber-400" />
                      <span>Premium Audio System</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="h-4 w-4 mr-3 text-amber-400" />
                      <span>Heads Up Display</span>
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="warranty" className="pt-4">
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <Award className="h-4 w-4 mr-3 text-amber-400" />
                      <span>4-Year/50,000-Mile Basic Warranty</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="h-4 w-4 mr-3 text-amber-400" />
                      <span>6-Year/70,000-Mile Powertrain Warranty</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="h-4 w-4 mr-3 text-amber-400" />
                      <span>Complimentary Maintenance for 3 Years</span>
                    </li>
                    <li className="flex items-center">
                      <Award className="h-4 w-4 mr-3 text-amber-400" />
                      <span>24/7 Roadside Assistance</span>
                    </li>
                  </ul>
                </TabsContent>
              </Tabs>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-accent hover:bg-red-700 text-white font-montserrat uppercase tracking-wider text-sm py-6 px-8 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-red-900/30"
                  onClick={() => setLocation('/payment')}
                >
                  Purchase Now
                </Button>
                <Button 
                  className="bg-amber-400 hover:bg-yellow-600 text-black font-montserrat uppercase tracking-wider text-sm py-6 px-8 rounded-md transition-all duration-300"
                >
                  Schedule Test Drive
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-transparent border border-white text-white hover:border-amber-400 hover:text-amber-400 font-montserrat uppercase tracking-wider text-sm py-6 px-8 rounded-md transition-colors duration-300"
                >
                  Inquire About This Car
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetails;
