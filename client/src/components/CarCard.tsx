import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car } from "@shared/schema";
import { Link } from "wouter";
import { Activity, Gauge, Fuel } from "lucide-react";

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-[#121212] rounded-xl overflow-hidden shadow-lg hover:shadow-xl border-gray-800">
        <div className="h-52 overflow-hidden">
          <img 
            src={car.imageUrl} 
            alt={car.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold font-montserrat text-white">{car.name}</h3>
            <span className="text-amber-400 font-bold">${car.price.toLocaleString()}</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{car.description}</p>
          <div className="flex justify-between text-sm text-gray-400 mb-6">
            <span className="flex items-center"><Gauge className="mr-1 h-4 w-4" /> {car.horsepower} HP</span>
            <span className="flex items-center"><Activity className="mr-1 h-4 w-4" /> {car.acceleration}s 0-60</span>
            <span className="flex items-center"><Fuel className="mr-1 h-4 w-4" /> {car.mpg} MPG</span>
          </div>
          <Link href={`/cars/${car.id}`}>
            <Button className="w-full bg-[#1E1E1E] hover:bg-[#2D3748] text-white py-3 rounded-md font-medium transition-colors duration-300">
              View Details
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CarCard;
