import { ModeToggle } from "../mode-toggle";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";

// Navigation items for non-authenticated users
const publicItems = [
  { label: "Home", href: "/" },
  { label: "Appointment", href: "/appointment" },
  { label: "About Us", href: "/aboutus" },
];

// Navigation items for patients
const patientItems = [
  { label: "Dashboard", href: "/patient-dashboard" },
  { label: "Appointments", href: "/patient-appointments" },
];

// Navigation items for doctors
const doctorItems = [
  { label: "Appointments", href: "/doctor-appointments" },
  { label: "My Profile", href: "/doctor-dashboard" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userProfile, loading, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Determine which navigation items to show based on user role
  const getNavItems = () => {
    if (loading) return []; // Return empty array while loading
    if (!user) return publicItems;
    return userProfile?.role === 'doctor' ? doctorItems : patientItems;
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return null; // Or return a loading skeleton
  }

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo + Dark Mode Toggle */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              Ilaaze-e-36
            </span>
          </Link>
          <ModeToggle />
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden sm:flex items-center space-x-6">
          {getNavItems().map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "relative text-sm font-medium text-foreground transition-colors duration-200",
                "before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-0 before:bg-teal-500 before:transition-all before:duration-300 hover:before:w-full"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden sm:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {userProfile?.displayName || user.email}
              </span>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-sm font-medium"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <Button
          onClick={toggleMenu}
          className="sm:hidden text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none"
          aria-label="Toggle menu"
          variant="ghost"
          size="icon"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`sm:hidden fixed inset-0 z-40 transform ${
          isOpen ? "translate-y-16" : "-translate-y-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 h-full overflow-y-auto">
          <div className="container px-4 py-2">
            <div className="flex flex-col space-y-4 py-4">
              {getNavItems().map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="relative text-lg font-medium py-2 px-3 rounded-md transition-colors hover:text-teal-500 
                  before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-0 before:bg-teal-500 before:transition-all before:duration-300 hover:before:w-full"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-border/40 pt-4 pb-6">
              {user ? (
                <div className="space-y-4">
                  <div className="text-center text-lg font-medium text-muted-foreground">
                    {userProfile?.displayName || user.email}
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full text-lg font-medium py-2"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="block w-full text-center text-lg font-medium py-2 px-4 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors mb-3"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth"
                    className="block w-full text-center text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;