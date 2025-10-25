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
                <button ref={logoRef} className="text-2xl md:text-1xl font-extrabold tracking-wide">Multi-Verse</button>

                <div className="hidden md:flex space-x-5" >
                    <a href="#about" className="nav-link">
                        About
                    </a>
                    <a href="#services" className="nav-link">Services</a>
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
                        <a className="nav-link">Services</a>
                        <a className="nav-link">Contact</a>
                    </div>
                )}
            </div>
            
        </div>
    );
}