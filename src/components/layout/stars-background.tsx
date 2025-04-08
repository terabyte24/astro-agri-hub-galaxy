
import { useEffect, useRef, useState } from "react";

interface StarProps {
  density?: "low" | "medium" | "high";
}

const StarsBackground = ({ density = "medium" }: StarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const generateStars = () => {
      const { clientWidth, clientHeight } = containerRef.current!;
      
      // Determine number of stars based on density
      const starCount = {
        low: Math.floor((clientWidth * clientHeight) / 10000),
        medium: Math.floor((clientWidth * clientHeight) / 5000),
        high: Math.floor((clientWidth * clientHeight) / 2500),
      }[density];
      
      const newStars: JSX.Element[] = [];
      
      for (let i = 0; i < starCount; i++) {
        const size = Math.random() > 0.8 ? "star-lg" : Math.random() > 0.5 ? "star-md" : "star-sm";
        const left = `${Math.random() * 100}%`;
        const top = `${Math.random() * 100}%`;
        const delay = `${Math.random() * -10}s`;
        
        newStars.push(
          <div
            key={i}
            className={`star ${size}`}
            style={{
              left,
              top,
              animationDelay: delay,
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        );
      }
      
      setStars(newStars);
    };

    generateStars();
    
    window.addEventListener("resize", generateStars);
    return () => window.removeEventListener("resize", generateStars);
  }, [density]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
      {stars}
    </div>
  );
};

export default StarsBackground;
