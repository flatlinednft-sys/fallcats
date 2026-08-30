import Hero from "@/components/Hero";
import EligibilityForm from "@/components/EligibilityForm";
import CurvedMarquee from "@/components/CurvedMarquee";
import SakuraPetals from "@/components/SakuraPetals";

export default function Home() {
  return (
    <main className="relative grain">
      {/* Fixed, page-wide pixelated petal animation — sits above every section */}
      <SakuraPetals />

      <Hero />
      <EligibilityForm />
      <CurvedMarquee />
    </main>
  );
}
