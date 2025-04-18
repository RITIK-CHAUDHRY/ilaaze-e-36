import React from "react";
import Slider from "react-slick";

// DoctorCard component to display each doctor's information
interface DoctorCardProps {
  name: string;
  image: string;
  details: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ name, image, details }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className="relative w-64 h-96 cursor-pointer overflow-hidden rounded-lg shadow-lg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Doctor image */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover rounded-lg transition-transform duration-500 ease-in-out"
      />

      {/* Overlay with details */}
      <div
        className={`absolute top-0 left-0 w-full h-full text-white p-4 transition-transform duration-500 ease-in-out ${
          hovered
            ? "bg-[#008080] transform translate-y-0" // Teal background when hovered
            : "bg-black bg-opacity-50 transform translate-y-full" // Default black background when not hovered
        }`}
      >
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="mt-2 text-sm">{details}</p>
      </div>
    </div>
  );
};

// Main App component with the slider
const App: React.FC = () => {
  // Dummy data for the doctors
  const doctors = [
    {
      name: "Dr. John Doe",
      image: "https://loremflickr.com/200/200?random=1",
      details: "Specialist in Cardiovascular Diseases with 10+ years of experience.",
    },
    {
      name: "Dr. Jane Smith",
      image: "https://loremflickr.com/200/200?random=2",
      details: "Expert in Neurology and Brain Disorders. Available for consultations.",
    },
    {
      name: "Dr. Mike Johnson",
      image: "https://loremflickr.com/200/200?random=4",
      details: "Orthopedic Surgeon with a focus on sports injuries and rehabilitation.",
    },
    {
      name: "Dr. Emily Davis",
      image: "https://loremflickr.com/200/200?random=3",
      details: "General Practitioner, offering comprehensive health services.",
    },
  ];

  // Slider settings for infinite autoplay
  const settings = {
    dots: true, // Display dots for navigation
    infinite: true, // Infinite loop
    speed: 500, // Slide transition speed
    slidesToShow: 3, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay speed (3 seconds)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // 2 slides for smaller screens
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // 1 slide for very small screens
        },
      },
    ],
  };

  return (
    <div className="p-8 flex justify-center items-center">
      <div className="w-full max-w-screen-xl">
        <h2 className="text-3xl font-semibold mb-6 text-center">Our Doctors</h2>
        <Slider {...settings}>
          {doctors.map((doctor, index) => (
            <DoctorCard
              key={index}
              name={doctor.name}
              image={doctor.image}
              details={doctor.details}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default App;
