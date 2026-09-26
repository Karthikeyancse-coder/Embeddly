import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import VideoGallery from "@/sections/VideoGallery";
import PhotoGallery from "@/sections/PhotoGallery";
import UpcomingEvents from "@/sections/UpcomingEvents";
import Enrollment from "@/sections/Enrollment";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <VideoGallery />
        <PhotoGallery />
        <UpcomingEvents />
        <Enrollment />
      </main>

      <Footer />
    </>
  );
}
