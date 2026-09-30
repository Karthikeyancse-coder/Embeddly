import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import BrandSignature from "@/sections/BrandSignature";
import About from "@/sections/About";
import WhyDifferent from "@/sections/WhyDifferent";
import BuildSession from "@/sections/BuildSession";
import Mentor from "@/sections/Mentor";
import UpcomingEvents from "@/sections/UpcomingEvents";
import BuildJourney from "@/sections/BuildJourney";
import WhoIsThisFor from "@/sections/WhoIsThisFor";
import PhotoGallery from "@/sections/PhotoGallery";
import FinalCTA from "@/sections/FinalCTA";
import Footer from "@/sections/Footer";

export const metadata = {
  title: "Embeddly — Don't Just Learn It. Build It.",
  description:
    "Embeddly is a practical engineering platform where students learn electronics, embedded systems and hardware by building real things. From circuit to code to prototype.",
};

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* 1. Hero — EDDY + "Don't Just Learn Electronics. Build It." */}
        <Hero />

        {/* 2. Brand Signature — LEARN→BUILD→BREAK→DEBUG→CREATE */}
        <BrandSignature />

        {/* 3. About — From Curious Student To Confident Builder */}
        <About />

        {/* 4. Why Different — 4 Build-First Principles */}
        <WhyDifferent />

        {/* 5. Build Session — Inside an Embeddly Build Session */}
        <BuildSession />

        {/* 6. Mentor — Akshay Venkatesan */}
        <Mentor />

        {/* 7. Events — What Are We Building Next? */}
        <UpcomingEvents />

        {/* 8. Build Journey — 2-Week Program + Investment + Disclaimer */}
        <BuildJourney />

        {/* 9. Who Is This For */}
        <WhoIsThisFor />

        {/* 10. Gallery — Things We've Built. Things We've Learned. */}
        <PhotoGallery />

        {/* 11. Final CTA — Your First Prototype Could Start Here */}
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
