
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import StarsBackground from "./stars-background";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  withStars?: boolean;
}

const PageWrapper = ({ 
  children, 
  className,
  withStars = true
}: PageWrapperProps) => {
  return (
    <div className={cn(
      "w-full min-h-screen pt-20 pb-8 px-4",
      className
    )}>
      {withStars && <StarsBackground density="medium" />}
      {children}
    </div>
  );
};

export default PageWrapper;
