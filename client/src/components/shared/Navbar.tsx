import { ModeToggle } from "../mode-toggle";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";

const items = [
  { label: "Home", href: "/" },
  { label: "Appointment", href: "/appointment" }, 
  { label: "About Us", href: "/aboutus" }, 
  { label: "Profile", href: "/user" }, 
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left side: Logo & Mode Toggle */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              Ilaaze-e-36
            </span>
          </Link>
          <ModeToggle />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center space-x-6">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                "hover:underline hover:underline-offset-4"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden sm:flex items-center space-x-4">
          <Link
            to="/login"
            className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button - Always visible on mobile */}
        <Button
          onClick={toggleMenu}
          className="sm:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation Menu - Slide in from top */}
      <div className={`sm:hidden fixed inset-0 z-40 transform ${isOpen ? 'translate-y-16' : '-translate-y-full'} transition-transform duration-300 ease-in-out`}>
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 h-full overflow-y-auto">
          <div className="container px-4 py-2">
            <div className="flex flex-col space-y-4 py-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-lg font-medium py-2 px-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            <div className="border-t border-border/40 pt-4 pb-6">
              <Link
                to="/login"
                className="block w-full text-center text-lg font-medium py-2 px-4 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors mb-3"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full text-center text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;