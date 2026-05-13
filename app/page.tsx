import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F3EE]">
      <Navbar />
      <HeroSection />
      <Calculator />

      {/* Footer strip */}
      
    </main>
  );
}
