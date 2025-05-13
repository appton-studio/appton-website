import Image from "next/image";
import apps from "../data/apps.json";

export default function Home() {
  // Animation classes for variety
  const animationClasses = [
    "animate-float-updown",
    "animate-float-leftright",
    "animate-float-updown",
    "animate-float-leftright"
  ];

  return (
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
        <div className="absolute inset-0">
          {(() => {
            const n = apps.length;
            // Ellipse: center in the upper part of the area, fill 80% width and 80% height
            const ellipseA = 40; // percent of width (horizontal radius)
            const ellipseB = 40; // percent of height (vertical radius)
            const centerX = 50;
            const centerY = 45; // move ellipse center up so logos stay above the title
            return apps.map((app, i) => {
              const angle = (2 * Math.PI * i) / n;
              const left = centerX + ellipseA * Math.cos(angle);
              const top = centerY + ellipseB * Math.sin(angle);
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
            });
          })()}
        </div>
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
  );
}
