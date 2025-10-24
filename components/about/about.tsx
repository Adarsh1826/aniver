"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const about = aboutRef.current;
    const content = contentRef.current;

    if (about && content) {
      // Rotate About section in 3D on scroll
      gsap.fromTo(
        about,
        { rotationY: -90, opacity: 0, transformOrigin: "left center" },
        {
          rotationY: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: about,
            start: "top 80%", // start when top of about reaches 80% of viewport
            end: "top 30%",
            scrub: true,
          },
        }
      );

      // Animate content fading in after rotation
      gsap.fromTo(
        content.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: about,
            start: "top 50%",
          },
        }
      );
    }
  }, []);

  return (
    <div
      id="about"
      ref={aboutRef}
      className="w-full min-h-screen flex flex-col items-center justify-center bg-[#111111] text-white px-10 py-20 perspective-1000 overflow-hidden"
      style={{ perspective: 1500 }}
    >
      <div ref={contentRef} className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-wide">
          About Us
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-4">
          We started our journey with a simple observation: quality tech development shouldn’t cost a fortune. As young entrepreneurs ourselves, we’ve felt the frustration of inflated quotes and slow delivery timelines. That’s why we built a team of passionate developers who genuinely enjoy the work—not just for the paycheck, but for the thrill of building something impactful.
        </p>
        {/* <p className="text-lg md:text-xl text-gray-400">
          Scroll through, explore neon-lit floating elements, and watch as the
          web bends to the digital experience we craft.
        </p> */}
      </div>
    </div>
  );
}
