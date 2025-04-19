import { ModeToggle } from "../mode-toggle";
import GooeyNav from "./GooeyNav/GooeyNav";

const items = [
  { label: "Home", href: "/" },
  { label: "Appointment", href: "appointment" },
  { label: "About Us", href: "aboutus" },
  { label: "Profile", href: "user" },
];

function Navbar() {
  return (
    <div className="flex justify-between items-center px-4 h-16 bg-gradient-to-r from-teal-500 to-blue-500 text-teal-100">
      {/* Left side: Mode Toggle */}
      <div>
        <ModeToggle />
      </div>

      {/* Right side: GooeyNav */}
      <div>
        <GooeyNav
          items={items}
          animationTime={600}
          particleCount={15}
          particleDistances={[20, 42]}
          particleR={75}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]} // Optionally, adjust particle colors here too
          timeVariance={300}
          // Applying the teal text color to the GooeyNav items
         
        />
      </div>
    </div>
  );
}

export default Navbar;
