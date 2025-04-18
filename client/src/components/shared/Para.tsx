import React from "react";

const Para: React.FC = () => {
  return (
    <div className="p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-xl text-center">
        {/* Section for Who We Are */}
        <div className="flex justify-between mb-10">
          {/* Who We Are Section */}
          <div className="w-1/2 animate-slide-diagonal-from-left">
            <h3 className="text-2xl font-bold mb-4 text-black">Who We Are?</h3>
            <p className="text-lg text-black">
              We are a team of passionate individuals dedicated to improving healthcare services through technology.
              Our mission is to provide accessible, reliable, and innovative solutions for patients and doctors alike.
            </p>
          </div>

          {/* What Do We Do Section */}
          <div className="w-1/2 animate-slide-diagonal-from-right">
            <h3 className="text-2xl font-bold mb-4 text-black">What Do We Do?</h3>
            <p className="text-lg text-black">
              We develop cutting-edge tools and platforms for healthcare professionals to offer better patient care.
              From telemedicine to appointment scheduling, we make healthcare accessible anytime, anywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Para;
