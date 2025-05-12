import Image from "next/image";

export default function Home() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat relative flex flex-col items-center justify-center"
      style={{
        backgroundImage: 'url("/background.png")'
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0C0C0C_80%)]" />
      <Image
        src="/logo_appton.png"
        alt="Appton Logo"
        width={37}
        height={11}
        className="absolute top-8 left-8 max-h-[50px] w-auto"
        priority
      />
      <div className="w-full max-w-xl h-32 flex items-center justify-center mb-4" style={{ zIndex: 2 }}>
        <div className="relative w-full h-full">
          <div className="absolute left-[20%] top-0 animate-float-updown z-20" style={{ pointerEvents: 'auto' }}>
            <div className="rounded-[20px] shadow-2xl ring-2 ring-white/30 p-1 bg-black/40 flex items-center justify-center">
              <Image
                src="/onira_logo.png"
                alt="Onira Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain rounded-[16px]"
              />
            </div>
          </div>
          <div className="absolute left-[50%] top-6 animate-float-leftright z-10" style={{ pointerEvents: 'auto' }}>
            <div className="rounded-[20px] shadow-2xl ring-2 ring-white/30 p-1 bg-black/40 flex items-center justify-center">
              <Image
                src="/rushmore_logo.png"
                alt="Rushmore Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain rounded-[16px]"
              />
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-white max-w-2xl text-center z-0 relative">
        We create apps that make life simpler, smarter, and more playful
      </h1>
    </div>
  );
}
