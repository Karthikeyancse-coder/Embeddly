import { spaceGrotesk, inter, kalam } from "@/lib/fonts";
import "./globals.css";
import CircuitBackground from "@/components/CircuitBackground";

export const metadata = {
  metadataBase: new URL("https://embeddly.edu"),
  title: "Embeddly | Learn Electronics & Embedded Systems",
  description:
    "Learn electronics, embedded systems, IoT and practical hardware skills through hands-on courses and real-world projects.",
  openGraph: {
    title: "Embeddly | Learn Electronics & Embedded Systems",
    description:
      "Hands-on electronics, embedded systems, and IoT education for future innovators.",
    images: [
      {
        url: "/images/hero-circuit.jpg",
        width: 1200,
        height: 630,
        alt: "Embeddly Electronics Hardware Prototyping",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo/NAVAHARISHEMBDDLY (1).png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${kalam.variable}`}
    >
      <body className="font-body bg-embeddly-bg text-slate-900 antialiased selection:bg-embeddly-blue selection:text-white">
        <CircuitBackground />
        {children}
      </body>
    </html>
  );
}
