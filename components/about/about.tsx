"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const about = aboutRef.current;
    const content = contentRef.current;
    const particles = particleRef.current;

    if (about && content && particles) {
      // 3D rotation on scroll
      gsap.fromTo(
        about,
        { rotationY: -90, opacity: 0, transformOrigin: "left center" },
        {
          rotationY: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: about,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

      // Content fade + slide
      gsap.fromTo(
        content.children,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: about,
            start: "top 50%",
          },
        }
      );

      // Floating particles animation
      gsap.utils.toArray(".particle").forEach((p: any, i) => {
        gsap.to(p, {
          y: () => Math.random() * 150 - 75,
          x: () => Math.random() * 200 - 100,
          rotation: () => Math.random() * 360,
          duration: 5 + Math.random() * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });
    }
  }, []);

  return (
    <div
      id="about"
      ref={aboutRef}
      className="w-full min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-10 py-20 perspective-1000 overflow-hidden relative"
      style={{ perspective: 1500 }}
    >
      {/* Floating particles */}
      <div ref={particleRef} className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 rounded-full bg-white/30 opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: `blur(${Math.random() * 2}px)`,
            }}
          />
        ))}
      </div>

      <div ref={contentRef} className="max-w-4xl text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-wide glow-text">
          About Us
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-4">
          We started our journey with a simple observation: quality tech
          development shouldn’t cost a fortune. As young entrepreneurs
          ourselves, we’ve felt the frustration of inflated quotes and slow
          delivery timelines. That’s why we built a team of passionate
          developers who genuinely enjoy the work—not just for the paycheck,
          but for the thrill of building something impactful.
        </p>
      </div>

      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.4),
                       0 0 10px rgba(0, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        .glow-text:hover {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.6),
                       0 0 20px rgba(0, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
