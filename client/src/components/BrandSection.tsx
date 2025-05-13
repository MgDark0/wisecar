import { SiAudi, SiBmw, SiMercedes, SiPorsche, SiFerrari, SiLamborghini, SiMaserati, SiBentley } from "react-icons/si";

const BrandSection = () => {
  const brands = [
    { name: "AUDI", icon: SiAudi },
    { name: "BMW", icon: SiBmw },
    { name: "MERCEDES", icon: SiMercedes },
    { name: "PORSCHE", icon: SiPorsche },
    { name: "FERRARI", icon: SiFerrari },
    { name: "LAMBORGHINI", icon: SiLamborghini },
    { name: "MASERATI", icon: SiMaserati },
    { name: "BENTLEY", icon: SiBentley },
  ];

  return (
    <section className="py-16 bg-[#121212] relative overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-center text-2xl md:text-3xl font-bold font-montserrat text-white mb-2">Premium Brands</h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          We partner with the world's most prestigious automotive manufacturers to bring you unparalleled quality and performance.
        </p>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <div className="flex space-x-12 car-carousel py-6">
          {brands.map((brand, index) => (
            <div key={index} className="flex items-center justify-center bg-[#1E1E1E] rounded-lg w-32 h-24 px-4 flex-shrink-0">
              <div className="text-white text-center">
                {<brand.icon className="mx-auto h-8 w-8 mb-2" />}
                <div className="text-sm font-montserrat font-bold">{brand.name}</div>
              </div>
            </div>
          ))}
          
          {/* Duplicate for infinite scroll effect */}
          {brands.map((brand, index) => (
            <div key={`duplicate-${index}`} className="flex items-center justify-center bg-[#1E1E1E] rounded-lg w-32 h-24 px-4 flex-shrink-0">
              <div className="text-white text-center">
                {<brand.icon className="mx-auto h-8 w-8 mb-2" />}
                <div className="text-sm font-montserrat font-bold">{brand.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
