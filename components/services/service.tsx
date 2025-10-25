"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Service() {
  const cardRef = useRef(null);
  const particleRef=useRef<HTMLDivElement>(null)

  useEffect(()=>{

    gsap.utils.toArray(".particle").forEach((p:any,i)=>{
        gsap.to(particleRef.current,{
          y: () => Math.random() * 150 - 75,
          x: () => Math.random() * 200 - 100,
          rotation: () => Math.random() * 360,
           duration: 5 + Math.random() * 3,
           repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        })
    })
  },[])

 

  return (
    <section
      id="services"
      className="w-full py-20  text-white text-center overflow-hidden"
    >
      {/* <div ref={particleRef} className="absolute inset-0">
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
      </div> */}
      <h2 className="text-4xl font-bold mb-10">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
        <div
          ref={cardRef}
          
          className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-amber-400 transition-all"
        >
          <h3 className="text-2xl font-semibold mb-3">Web Development</h3>
          <p className="text-gray-400">
            Responsive websites built for performance, scalability, and style.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-amber-400 transition-all">
          <h3 className="text-2xl font-semibold mb-3">App Development</h3>
          <p className="text-gray-400">
            Modern mobile apps for Android, iOS, and cross-platform experiences.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-amber-400 transition-all">
          <h3 className="text-2xl font-semibold mb-3">Web3 / AI & ML</h3>
          <p className="text-gray-400">
            Innovative blockchain and intelligent AI-powered solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
