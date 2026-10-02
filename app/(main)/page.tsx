import BenefitsGridSection from "@/app/(main)/_components/BenefitsGridSection";
import ChurchMarqueeSection from "@/app/(main)/_components/ChurchMarqueeSection";
import CoreServicesSection from "@/app/(main)/_components/CoreServicesSection";
import FAQSection from "@/app/(main)/_components/FAQSection";
import FragmentedToolsSection from "@/app/(main)/_components/FragmentedToolsSection";
import HeroSection from "@/app/(main)/_components/HeroSection";
import MidCTASection from "@/app/(main)/_components/MidCTASection";
import OnePlaceSection from "@/app/(main)/_components/OnePlaceSection";
import OperationsShowcaseSection from "@/app/(main)/_components/OperationsShowcaseSection";
import PainPointSection from "@/app/(main)/_components/PainPointSection";
import TestimonialsSection from "@/app/(main)/_components/TestimonialsSection";

export default function MainPage() {
  return (
    <div>
      <HeroSection />
      <PainPointSection />
      <div className="relative">
        <FragmentedToolsSection />
        <OnePlaceSection />
      </div>
      <BenefitsGridSection />
      <OperationsShowcaseSection />
      <CoreServicesSection />
      <TestimonialsSection />
      <ChurchMarqueeSection />
      <FAQSection />
      <MidCTASection />
    </div>
  );
}
