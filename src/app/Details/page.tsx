import React, { useState, useEffect } from "react";
import { Car, Calendar, Route, DollarSign, Zap, Star, ArrowRight } from "lucide-react";

const CarDetails: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const car = { 
    model: "McLaren 720S", 
    year: "2022", 
    mileage: "7,500 km", 
    price: "$299,000" 
  };

  const details = [
    { k: "model", l: "Model", v: car.model, i: <Car className="w-4 h-4" />, c: "blue" },
    { k: "year", l: "Year", v: car.year, i: <Calendar className="w-4 h-4" />, c: "emerald" },
    { k: "mileage", l: "Mileage", v: car.mileage, i: <Route className="w-4 h-4" />, c: "amber" },
    { k: "price", l: "Price", v: car.price, i: <DollarSign className="w-4 h-4" />, c: "rose" },
  ];

  return (
    <div className={`w-full max-w-3xl transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0 translate-y-4"}`}>
      <div className="bg-white rounded-2xl p-6 shadow-lg border relative overflow-hidden">
        
     
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4 relative">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-md">
              <Car className="w-6 h-6 text-white" />
            </div>
            <Zap className="absolute -top-1 -right-1 w-4 h-4 text-white bg-amber-400 rounded-full p-0.5" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{car.model}</h1>
          <div className="flex justify-center space-x-1 mb-2">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
            ))}
            <span className="ml-2 text-sm text-gray-600">4.9</span>
          </div>
          <p className="text-sm text-gray-600">Supercar performance with stunning aerodynamic design</p>
        </div>

      
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {details.map((d, i) => (
            <div
              key={d.k}
              onMouseEnter={() => setHovered(d.k)}
              onMouseLeave={() => setHovered(null)}
              className={`bg-gray-50 hover:bg-white rounded-lg p-4 border border-${d.c}-100 hover:border-gray-200 shadow-sm hover:shadow-md transition transform ${
                hovered === d.k ? "-translate-y-1 scale-102" : "hover:-translate-y-0.5"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`w-8 h-8 flex items-center justify-center bg-${d.c}-500 text-white rounded-lg mb-3`}>
                {d.i}
              </div>
              <p className={`text-xs font-medium text-${d.c}-600 uppercase`}>{d.l}</p>
              <p className="text-sm font-semibold text-gray-800">{d.v}</p>
            </div>
          ))}
        </div>

      
        <div className="text-center">
          <div className="flex justify-center space-x-1 mb-3">
            {Array(3).fill(0).map((_, i) => (
              <div 
                key={i} 
                className="w-1.5 h-1.5 bg-orange-500 rounded-full opacity-40 animate-pulse" 
                style={{ animationDelay: `${i * 0.3}s` }} 
              />
            ))}
          </div>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-medium py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
            View Details <ArrowRight className="w-3 h-3 inline ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
