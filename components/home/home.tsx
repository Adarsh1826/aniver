"use client"
import { Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import AboutPage from "../about/about";
import TopNavBar from "../navbar/nav";
import Service from "../services/service";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
gsap.registerPlugin(ScrollTrigger);

export function Home() {
    const heroRef = useRef<HTMLDivElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const floatingRefs = useRef<HTMLDivElement[]>([]);

    const particleRef = useRef<HTMLDivElement>(null)

    const exploreRef = useRef(null)

    useEffect(() => {
    const avatar = avatarRef.current;

    

    // Initial entrance + rotation
    const tl = gsap.timeline();
    tl.from(avatar, {
        scale: 0,
        rotationY: -180,
        opacity: 0,
        duration: 1.5,
        ease: "back.out(1.7)"
    });
    tl.to(avatar, {
        rotationY: "+=360",
        duration: 10,
        repeat: -1,
        ease: "linear"
    });

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

    // Floating elements animation
    floatingRefs.current.forEach((el, i) => {
        gsap.to(el, {
            y: Math.random() * 40 - 20,
            x: Math.random() * 40 - 20,
            rotation: Math.random() * 360,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2
        });
    });

    // Scroll-triggered backflip
    gsap.to(avatar, {
        rotationX: "+=360", // Backflip along X-axis
        scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true, // smoothly animate with scroll
        },
        ease: "power1.inOut"
    });
}, []);


  const custom = () => {
  if (exploreRef.current) {
    gsap.to(exploreRef.current, {
      y: -20,
      duration: 0.3, 
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }
};

    



    return (
        <>
        <TopNavBar/>
        <div
            ref={heroRef}
            className="w-full h-screen relative flex justify-center items-start pt-20 overflow-hidden "
            style={{ perspective: 1200 }}
        >

             <div  className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
          ref={particleRef}
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

            {/* Avatar */}
            <div
                ref={wrapperRef}
                style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center"
                }}
            >
                <div
                    ref={avatarRef}
                    className="avatar w-96 h-auto rounded-2xl  overflow-hidden"
                    style={{ backfaceVisibility: "visible", transformStyle: "preserve-3d" }}
                >
                    <img
                        src="/icon/h2.png"
                        alt="Anime Avatar"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>

            {/* Hero text */}
            <div className="absolute bottom-10 text-center w-full text-white space-y-3">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide">
                    Multi-Verse Experience
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 max-w-xl mx-auto">
                    Enter a futuristic, fully animated 3D world. Neon lights, floating elements, and savage design.
                </p>
                     <button
                    className="mt-4 px-6 py-3 rounded-full border-2 border-grey-400 text-white
             font-bold transition-all duration-300  hover:text-white"
                    ref={exploreRef}
                    onClick={custom}

                >
                    <a href="#about">Contact Now</a>
                </button>


            </div>
            
        </div>
        <AboutPage/>
        <Service />
        </>
    );
}





