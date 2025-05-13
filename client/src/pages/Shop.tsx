import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CarCard from "@/components/CarCard";
import { Car } from "@shared/schema";

const Shop = () => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");

  const { data: cars, isLoading } = useQuery<Car[]>({
    queryKey: ['/api/cars'],
  });

  const carTypes = ["all", "luxury", "sports", "suv"];
  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "under50k", label: "Under $50,000" },
    { value: "50k-100k", label: "50,000 - $100,000" },
    { value: "100k-200k", label: "$100,000 - $200,000" },
    { value: "over200k", label: "$200,000+" },
  ];

  const filteredCars = cars?.filter(car => {
    let matchesType = selectedType === "all" || car.type === selectedType;
    
    let matchesPrice = true;
    if (priceRange === "under50k") matchesPrice = car.price < 50000;
    else if (priceRange === "50k-100k") matchesPrice = car.price >= 50000 && car.price < 100000;
    else if (priceRange === "100k-200k") matchesPrice = car.price >= 100000 && car.price < 200000;
    else if (priceRange === "over200k") matchesPrice = car.price >= 200000;
    
    return matchesType && matchesPrice;
  }) || [];

  return (
    <>
      <Helmet>
        <title>Shop Luxury Cars | WiseCars</title>
        <meta name="description" content="Browse our exclusive selection of premium vehicles. Filter by type, price range, and find your dream car today." />
        <meta property="og:title" content="Shop Luxury Cars | WiseCars" />
        <meta property="og:description" content="Browse our exclusive selection of premium vehicles. Each car is carefully selected to meet our high standards." />
      </Helmet>
      
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-white mb-4">Our Collection</h1>
          <p className="text-gray-400 mb-12 max-w-2xl">
            Browse our exclusive selection of premium vehicles. Each car is carefully selected to meet our high standards of performance, luxury, and reliability.
          </p>

          {/* Filters */}
          <div className="mb-12 flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
            <div className="flex flex-wrap gap-4">
              {carTypes.map((type) => (
                <Button 
                  key={type}
                  variant={selectedType === type ? "default" : "secondary"}
                  className={`${
                    selectedType === type 
                      ? "bg-[#2D3748] text-white" 
                      : "bg-[#121212] text-gray-300 hover:bg-[#1E1E1E]"
                  } px-5 py-2 rounded-md text-sm font-medium transition-colors duration-300`}
                  onClick={() => setSelectedType(type)}
                >
                  {type === "all" ? "All Cars" : `${type.charAt(0).toUpperCase() + type.slice(1)}s`}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-gray-400 text-sm">Price Range:</span>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="bg-[#1E1E1E] border border-[#2D3748] text-white rounded-md w-40">
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E1E1E] border border-[#2D3748] text-white">
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(9).fill(null).map((_, i) => (
                <div key={i} className="h-96 bg-[#1E1E1E] animate-pulse rounded-xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
              
              {filteredCars.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-medium text-white mb-2">No cars match your criteria</h3>
                  <p className="text-gray-400">Try adjusting your filters to see more options.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Shop;
