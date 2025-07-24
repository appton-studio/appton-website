"use client";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import apps from "../data/apps.json";
import members from "../data/members.json";

type App = {
  name: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  published: boolean;
  appstore_link: string;
  playstore_link: string;
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
    <div ref={containerRef} className="absolute inset-0" role="presentation" aria-hidden="true">
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
            <a
              href={app.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${app.name} website`}
            >
              <div className="rounded-[18px] shadow-2xl ring-2 ring-white/30 p-1 bg-black/40 flex items-center justify-center">
                <Image
                  src={`/${app.image}`}
                  alt={`${app.name} Logo`}
                  width={50}
                  height={50}
                  className="w-12 h-12 object-contain rounded-[16px]"
                  priority={i < 4} // Prioritize first 4 images
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
    <section id="apps" className="relative z-0 w-full bg-[#0C0C0C] h-screen flex flex-col items-center justify-center py-16">
      <header>
        <h2 className="text-3xl font-bold text-white mb-12">Our Apps</h2>
      </header>
      <div className="flex flex-col items-center w-full max-w-4xl flex-1 justify-center">
        {/* App content with consistent spacing */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 mb-8">
          {/* Info on the left */}
          <div className="flex-1 flex flex-col items-center md:items-end text-center md:text-right">
            <h3 className="text-2xl font-semibold text-white mb-2">{app.name}</h3>
            <p className="text-lg text-gray-300 mb-2">{app.subtitle}</p>
            <p className="text-md text-gray-400 mb-4 max-w-md">{app.description}</p>
            <a
              href={app.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline text-sm font-bold mb-4"
              aria-label={`Visit ${app.name} website`}
            >
              Visit {app.name}
            </a>
            {/* Store links or Coming Soon */}
            {app.published ? (
              <div className="flex gap-4 mt-2" role="group" aria-label="Download links">
                <a
                  href={app.appstore_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Download on App Store"
                  aria-label={`Download ${app.name} on App Store`}
                >
                  <img src="/appstore.png" alt="App Store" className="h-8" />
                </a>
                {app.playstore_link && (
                  <a
                    href={app.playstore_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Download on Google Play"
                    aria-label={`Download ${app.name} on Google Play`}
                  >
                    <img src="/playstore.png" alt="Play Store" className="h-8" />
                  </a>
                )}
              </div>
            ) : (
              <div className="text-gray-500 text-sm mt-4">Coming Soon</div>
            )}
          </div>
          {/* Logo on the right */}
          <div className="flex-1 flex flex-col items-center">
            <div className="rounded-[18px] shadow-2xl ring-2 ring-white/30 p-2 bg-black/40 flex items-center justify-center">
              <Image
                src={`/${app.image}`}
                alt={`${app.name} Logo`}
                width={128}
                height={128}
                className="w-32 h-32 object-contain rounded-[16px]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      {/* Carousel */}
      <nav className="flex gap-4 mt-8 justify-center w-full" role="tablist" aria-label="App selection">
        {apps.map((a, i) => (
          <button
            key={a.name}
            onClick={() => setSelected(i)}
            className={`rounded-full p-1 border-2 ${i === selected ? 'border-white' : 'border-transparent'} bg-black/40 transition`}
            style={{ outline: 'none' }}
            role="tab"
            aria-selected={i === selected}
            aria-label={`Select ${a.name} app`}
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
      </nav>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative z-0 w-full bg-[#0C0C0C] min-h-screen flex flex-col items-center justify-center py-16">
      <header>
        <h2 className="text-3xl font-bold text-white mb-12">Contact</h2>
      </header>
      <div className="flex flex-wrap justify-center gap-12 mb-12">
        {members.map((member) => (
          <article key={member.name} className="flex flex-col items-center bg-black/40 rounded-2xl p-6 shadow-lg">
            <img
              src={`/${member.image}`}
              alt={`${member.name} - ${member.title}`}
              className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-[#1C1C1C]"
            />
            <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
            <p className="text-sm text-gray-300 mb-2">{member.title}</p>
            <a
              href={member.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline text-sm font-bold"
              aria-label={`Connect with ${member.name} on LinkedIn`}
            >
              LinkedIn
            </a>
          </article>
        ))}
      </div>
      <a
        href="mailto:contact@appton.io"
        className="px-8 py-3 bg-white hover:bg-gray-200 text-[#1C1C1C] font-bold rounded-full text-lg shadow-lg transition"
        aria-label="Send us an email"
      >
        Contact us
      </a>
    </section>
  );
}

function Footer() {
  // Import apps for logos
  const appsData = apps;
  return (
    <footer className="w-full bg-[#0C0C0C] border-t border-[#1C1C1C] py-8 flex flex-col items-center justify-center text-center gap-4">
      {/* Footer navigation links */}
      <nav className="flex gap-8 mb-2" aria-label="Footer navigation">
        <a
          href="#apps"
          className="text-gray-300 hover:text-white text-sm font-medium transition cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('apps')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Our Apps
        </a>
        <a
          href="#contact"
          className="text-gray-300 hover:text-white text-sm font-medium transition cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Contact
        </a>
      </nav>
      {/* App logos */}
      <div className="flex gap-4 mb-2" role="group" aria-label="Our applications">
        {appsData.map(app => (
          <img
            key={app.name}
            src={`/${app.image}`}
            alt={app.name}
            className="w-8 h-8 object-contain rounded-xl bg-black/40 p-1 shadow"
          />
        ))}
      </div>
      <address className="not-italic">
        <div className="text-white text-lg font-bold mb-2">Appton LLC</div>
        <div className="text-gray-400 text-sm leading-relaxed">
          701 Tillery Street Unit 12 Suite 3028, Austin<br />
          Austin, TX 78702
        </div>
      </address>
    </footer>
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
    <main>
      <section
        className="h-screen w-full bg-cover bg-center bg-no-repeat relative flex flex-col items-center animate-fade-in-up"
        style={{
          backgroundImage: 'url("/background.webp")'
        }}
        aria-label="Hero section"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0C0C0C_80%)]" />
        {/* Navbar */}
        <nav className="relative flex items-center gap-12 z-30 pt-8 pb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }} aria-label="Main navigation">
          <a
            href="#apps"
            className="text-white text-sm font-medium hover:underline transition cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('apps')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            OUR APPS
          </a>
          <Image
            src="/logo_appton.png"
            alt="Appton Logo"
            width={74}
            height={22}
            className="max-h-[50px] w-auto"
            priority
          />
          <a
            href="#contact"
            className="text-white text-sm font-medium hover:underline transition cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            CONTACT
          </a>
        </nav>
        {/* Animation area fills the space above the title */}
        <div className="flex-1 w-full max-w-xl flex items-end justify-center relative pb-8 animate-fade-in-up" style={{ zIndex: 2, animationDelay: '0.2s' }}>
          <AnimatedLogos apps={apps} animationClasses={animationClasses} />
        </div>
        {/* Title centered vertically */}
        <div className="flex flex-col items-center justify-center pt-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-4xl font-bold text-white max-w-2xl text-center z-0 relative mb-8">
            We create apps that make life simpler, smarter, and more playful
          </h1>
        </div>
        {/* Spacer to push title to vertical center */}
        <div className="flex-1 animate-fade-in-up" style={{ animationDelay: '0.4s' }} />
      </section>
      <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <AppsShowcase apps={apps} />
      </div>
      <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <ContactSection />
      </div>
      <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
        <Footer />
      </div>
    </main>
  );
}
