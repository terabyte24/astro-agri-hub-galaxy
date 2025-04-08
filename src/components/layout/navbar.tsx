
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  CloudSun, 
  DollarSign, 
  MapPin, 
  LogIn,
  Menu,
  X,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";
import { useLanguage } from "@/lib/language-context";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: t("home"), icon: Home },
    { path: "/community", label: t("community"), icon: Users },
    { path: "/weather", label: t("weather"), icon: CloudSun },
    { path: "/prices", label: t("prices"), icon: DollarSign },
    { path: "/map", label: t("map"), icon: MapPin },
    { path: "/chatbot", label: t("chatbot"), icon: MessageSquare },
  ];

  const NavItem = ({ path, label, icon: Icon }: { path: string; label: string; icon: any }) => (
    <Link to={path} onClick={() => setIsOpen(false)}>
      <Button
        variant={isActive(path) ? "default" : "ghost"}
        className={cn(
          "w-full flex items-center justify-start gap-2 text-lg font-medium transition-all duration-200 group",
          isActive(path) 
            ? "bg-primary text-white"
            : "hover:bg-accent/20"
        )}
      >
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center transition-all",
          isActive(path) 
            ? "bg-white/20" 
            : "bg-accent/10 group-hover:bg-accent/20"
        )}>
          <Icon 
            size={18} 
            className={isActive(path) ? "text-white" : "text-foreground"} 
          />
        </div>
        {label}
      </Button>
    </Link>
  );

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex px-6 py-4 items-center justify-between w-full backdrop-blur-md bg-background/80 border-b border-border/50 fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-primary animate-pulse"></div>
            </div>
            <span className="text-xl font-bold cosmic-text">AstroAgri</span>
          </Link>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <ThemeToggle />
          <Link to="/login">
            <Button variant="default" className="gap-2">
              <LogIn size={16} />
              {t("login")}
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className={cn(
        "fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-in-out transform",
        isOpen 
          ? "translate-x-0 opacity-100" 
          : "translate-x-full opacity-0 pointer-events-none"
      )}>
        <div className="absolute inset-0 bg-background/95 backdrop-blur-lg" />
        <div className="relative h-full flex flex-col p-8 pt-16">
          <Link to="/" className="flex items-center gap-2 mb-8" onClick={() => setIsOpen(false)}>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-primary animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold cosmic-text">AstroAgri</span>
          </Link>
          
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </div>
          
          <div className="mt-auto flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <LanguageSelector />
              <ThemeToggle />
            </div>
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <Button variant="default" className="w-full gap-2">
                <LogIn size={18} />
                {t("login")}
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
