import GooeyNav from "./GooeyNav/GooeyNav";

const items = [
  { label: "Home", href: "#" },
  { label: "Appointment", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Profile", href: "#" },
];

function Header() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        height: "100vh",
        width: "auto",
        overflow: "hidden",
        zIndex: 10,
        padding: "5px 20px",
      }}
    >
      <GooeyNav
        items={items}
        animationTime={600}
        particleCount={15}
        particleDistances={[20, 42]}
        particleR={75}
        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        timeVariance={300}
      />
    </div>
  );
}

export default Header;
