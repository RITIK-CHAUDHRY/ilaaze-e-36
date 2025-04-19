import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const WhatWeOffer: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      const text = headingRef.current.textContent || "";
      headingRef.current.textContent = "";
      const chars = text.split("");
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        headingRef.current?.appendChild(span);
      });

      gsap.fromTo(
        headingRef.current.querySelectorAll("span"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    }
  }, []);

  return (
    <section className="max-w-6xl mx-auto p-8">
      <h2
        ref={headingRef}
        className="text-4xl font-bold mb-12 border-b-4 border-teal-500 inline-block select-none"
      >
        Know About us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 border rounded-lg shadow-md hover:shadow-teal-400 hover:shadow-[0_0_15px_3px_rgba(45,212,191,0.7)] transition-shadow duration-500 cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Service One</h3>
          <p>
            Description of service one. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </div>
        <div className="p-6 border rounded-lg shadow-md hover:shadow-teal-400 hover:shadow-[0_0_15px_3px_rgba(45,212,191,0.7)] transition-shadow duration-500 cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Service Two</h3>
          <p>
            Description of service two. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </div>
        <div className="p-6 border rounded-lg shadow-md hover:shadow-teal-400 hover:shadow-[0_0_15px_3px_rgba(45,212,191,0.7)] transition-shadow duration-500 cursor-pointer">
          <h3 className="text-xl font-semibold mb-2">Service Three</h3>
          <p>
            Description of service three. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
