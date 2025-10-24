"use client"
import { Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import AboutPage from "../about/about";
import Link from "next/link";
export default function TopNavBar() {
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const logoRef = useRef(null)
    const conRef = useRef(null)
    useEffect(() => {
        let tl = gsap.timeline()
        tl.from(logoRef.current, {
            x: "100vw",
            duration: 2,
            delay: 1.5,
            rotate: 360,

        })

        tl.from(".nav-link", {
            x: "100vw",
            duration: 2,
            stagger: 1,
            rotate: 360,
        },)
    }, [])

    return (
        <div className="overflow-hidden">
            <div className="flex justify-between p-5 relative">
                <button ref={logoRef} className="text-5xl md:text-2xl font-extrabold tracking-wide">Multi-Verse</button>

                <div className="hidden md:flex space-x-5" >
                    <a href="#about" className="nav-link">
                        About
                    </a>
                    <a className="nav-link">Contact</a>
                </div>

                <div className="md:hidden" onClick={() => setOpen(prev => !prev)}>
                    {open ? <X size={28} /> : <Menu size={28} />}
                </div>

                {open && (
                    <div className="fixed top-0 right-0 h-full w-64 bg-[#171717] text-white shadow-lg z-50 p-5 flex flex-col">
                        <div className="flex justify-end mb-5">
                            <X size={28} className="cursor-pointer" onClick={() => setOpen(false)} />
                        </div>
                        <a href="#about" className="nav-link">
                            About
                        </a>
                        <a className="nav-link">Contact</a>
                    </div>
                )}
            </div>
            <Home />
            <AboutPage />
        </div>
    );
}

export function Home() {
    const heroRef = useRef<HTMLDivElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const floatingRefs = useRef<HTMLDivElement[]>([]);
    const exploreRef = useRef(null)

    useEffect(() => {
        const avatar = avatarRef.current;

        // Avatar entrance + rotation
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
        <div
            ref={heroRef}
            className="w-full h-screen relative flex justify-center items-start pt-20 overflow-hidden "
            style={{ perspective: 1200 }}
        >

            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        if (el) floatingRefs.current[i] = el;
                    }}
                    className="absolute w-8 h-8 bg-blue-500/60 rounded-full blur-lg"
                    style={{
                        top: `${Math.random() * 80 + 10}%`,
                        left: `${Math.random() * 80 + 10}%`,
                    }}
                ></div>
            ))}

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
                    className="mt-4 px-6 py-3 rounded-full text-white font-bold transition-all duration-300"
                    ref={exploreRef}
                    onClick={custom}
                >
                    Explore Now
                </button>


            </div>
        </div>
    );
}
