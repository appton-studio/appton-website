"use client";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import apps from "../data/apps.json";

type App = {
  name: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
};

function AnimatedLogos({ apps, animationClasses }: { apps: App[]; animationClasses: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ellipse, setEllipse] = useState({ a: 40, b: 40 });
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useLayoutEffect(() => {
    function updateEllipse() {
      const width = containerRef.current?.offsetWidth || 0;
      if (width < 400) {
        setEllipse({ a: 28, b: 24 }); // mobile
      } else if (width < 700) {
        setEllipse({ a: 36, b: 32 }); // tablet
      } else {
        setEllipse({ a: 40, b: 40 }); // desktop
      }
    }
    updateEllipse();
    window.addEventListener("resize", updateEllipse);
    return () => window.removeEventListener("resize", updateEllipse);
  }, []);

  if (!hasMounted) return null;

  const n = apps.length;
  const centerX = 50;
  const centerY = 45;

  return (
    <div ref={containerRef} className="absolute inset-0">
      {apps.map((app, i) => {
        const angle = (2 * Math.PI * i) / n;
        const left = centerX + ellipse.a * Math.cos(angle);
        const top = centerY + ellipse.b * Math.sin(angle);
        return (
          <div
            key={app.name}
            className={`absolute ${animationClasses[i % animationClasses.length]}`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              transform: "translate(-50%, -50%)",
              pointerEvents: "auto"
            }}
          >
            <a href={app.link} target="_blank" rel="noopener noreferrer">
              <div className="rounded-[18px] shadow-2xl ring-2 ring-white/30 p-1 bg-black/40 flex items-center justify-center">
                <Image
                  src={`/${app.image}`}
                  alt={`${app.name} Logo`}
                  width={50}
                  height={50}
                  className="w-12 h-12 object-contain rounded-[16px]"
                />
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
}

function AppsShowcase({ apps }: { apps: App[] }) {
  const [selected, setSelected] = useState(0);
  const app = apps[selected];

  return (
    <section id="apps" className="relative z-0 w-full bg-[#0C0C0C] min-h-screen flex flex-col items-center justify-center py-16">
      <h2 className="text-3xl font-bold text-white mb-12">Our Apps</h2>
      <div className="flex flex-col items-center w-full max-w-4xl">
        {/* Two-column layout for info and logo */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 mb-8">
          {/* Info on the left */}
          <div className="flex-1 flex flex-col items-center md:items-end text-center md:text-right">
            <div className="text-2xl font-semibold text-white mb-2">{app.name}</div>
            <div className="text-lg text-gray-300 mb-2">{app.subtitle}</div>
            <div className="text-md text-gray-400 mb-4 max-w-md">{app.description}</div>
            <a href={app.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">Visit {app.name}</a>
          </div>
          {/* Logo on the right */}
          <div className="flex-1 flex flex-col items-center">
            <div className="rounded-[18px] shadow-2xl ring-2 ring-white/30 p-2 bg-black/40 flex items-center justify-center mb-4">
              <Image
                src={`/${app.image}`}
                alt={`${app.name} Logo`}
                width={128}
                height={128}
                className="w-32 h-32 object-contain rounded-[16px]"
              />
            </div>
          </div>
        </div>
        {/* Carousel */}
        <div className="flex gap-4 mt-8 justify-center w-full">
          {apps.map((a, i) => (
            <button
              key={a.name}
              onClick={() => setSelected(i)}
              className={`rounded-full p-1 border-2 ${i === selected ? 'border-blue-400' : 'border-transparent'} bg-black/40 transition`}
              style={{ outline: 'none' }}
            >
              <Image
                src={`/${a.image}`}
                alt={a.name}
                width={40}
                height={40}
                className="w-8 h-8 object-contain rounded-full"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  // Animation classes for variety
  const animationClasses = [
    "animate-float-updown",
    "animate-float-leftright",
    "animate-float-updown",
    "animate-float-leftright"
  ];

  return (
    <>
      <div
        className="h-screen w-full bg-cover bg-center bg-no-repeat relative flex flex-col items-center"
        style={{
          backgroundImage: 'url("/background.png")'
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0C0C0C_80%)]" />
        {/* Navbar */}
        <div className="relative flex items-center gap-12 z-30 pt-8 pb-4">
          <a href="#apps" className="text-white text-sm font-medium hover:underline transition">OUR APPS</a>
          <Image
            src="/logo_appton.png"
            alt="Appton Logo"
            width={74}
            height={22}
            className="max-h-[50px] w-auto"
            priority
          />
          <a href="#contact" className="text-white text-sm font-medium hover:underline transition">CONTACT</a>
        </div>
        {/* Animation area fills the space above the title */}
        <div className="flex-1 w-full max-w-xl flex items-end justify-center relative pb-8" style={{ zIndex: 2 }}>
          <AnimatedLogos apps={apps} animationClasses={animationClasses} />
        </div>
        {/* Title centered vertically */}
        <div className="flex flex-col items-center justify-center pt-8">
          <h1 className="text-4xl font-bold text-white max-w-2xl text-center z-0 relative mb-8">
            We create apps that make life simpler, smarter, and more playful
          </h1>
        </div>
        {/* Spacer to push title to vertical center */}
        <div className="flex-1" />
      </div>
      <AppsShowcase apps={apps} />
    </>
  );
}
