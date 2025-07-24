import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Appton - Apps That Make Life Simpler, Smarter, and More Playful",
  description: "We create apps that make life simpler, smarter, and more playful",
  keywords: "mobile apps, iOS apps, Android apps, productivity apps, lifestyle apps, Appton, software development, mobile applications",
  authors: [{ name: "Appton LLC" }],
  creator: "Appton LLC",
  publisher: "Appton LLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://appton.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Appton - Apps That Make Life Simpler, Smarter, and More Playful",
    description: "We create apps that make life simpler, smarter, and more playful",
    url: 'https://appton.io',
    siteName: 'Appton',
    images: [
      {
        url: '/logo_appton.png',
        width: 1200,
        height: 630,
        alt: 'Appton - Mobile App Development Company',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Appton - Apps That Make Life Simpler, Smarter, and More Playful",
    description: "We create apps that make life simpler, smarter, and more playful",
    images: ['/logo_appton.png'],
    creator: '@appton',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo_appton.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0C0C0C" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preload" href="/background.webp" as="image" />
        <link rel="preload" href="/logo_appton.png" as="image" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Appton LLC",
              "url": "https://appton.io",
              "logo": "https://appton.io/logo_appton.png",
              "description": "We create apps that make life simpler, smarter, and more playful",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "701 Tillery Street Unit 12 Suite 3028",
                "addressLocality": "Austin",
                "addressRegion": "TX",
                "postalCode": "78702",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "contact@appton.io"
              },
              "sameAs": [
                "https://linkedin.com/company/appton"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${poppins.variable} ${geistMono.variable} antialiased font-sans`}
        style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
