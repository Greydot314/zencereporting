import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const banners = [
  {
    title: "Atlantis is the one stop",
    subtitle: "SOLUTION",
    description: "for all the analysis needed for your brand",
    gradient: "from-blue-400 via-blue-500 to-blue-600"
  },
  {
    title: "AI-Powered Insights",
    subtitle: "INTELLIGENCE",
    description: "Transform data into actionable business decisions",
    gradient: "from-purple-400 via-purple-500 to-purple-600"
  },
  {
    title: "Unified Analytics",
    subtitle: "WORKSPACE",
    description: "All your business metrics in one place",
    gradient: "from-indigo-400 via-indigo-500 to-indigo-600"
  }
];

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden mb-8 card-shadow">
      <div className="relative h-64 md:h-80">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className={`h-full bg-gradient-to-r ${banner.gradient} flex items-center justify-between px-12`}>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-64 h-48 relative opacity-90">
                  <img 
                    src="/placeholder.svg" 
                    alt="Analytics Illustration" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="flex-1 text-right text-white">
                <h2 className="text-3xl md:text-4xl font-medium mb-2">{banner.title}</h2>
                <h3 className="text-5xl md:text-6xl font-bold mb-4">{banner.subtitle}</h3>
                <p className="text-xl opacity-90">{banner.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={() => goToSlide((currentSlide - 1 + banners.length) % banners.length)}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={() => goToSlide((currentSlide + 1) % banners.length)}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
