import BenefitsGrid from "@/app/(main)/_components/BenefitsGrid";
import ChurchMarquee from "@/app/(main)/_components/ChurchMarquee";
import CoreServices from "@/app/(main)/_components/CoreServices";
import FAQ from "@/app/(main)/_components/FAQ";
import FragmentedTools from "@/app/(main)/_components/FragmentedTools";
import HeroSection from "@/app/(main)/_components/HeroSection";
import MidCTA from "@/app/(main)/_components/MidCTA";
import OnePlace from "@/app/(main)/_components/OnePlace";
import OperationsShowcase from "@/app/(main)/_components/OperationsShowcase";
import PainPoint from "@/app/(main)/_components/PainPoint";
import Testimonials from "@/app/(main)/_components/Testimonials";

export default function MainPage() {
  return (
    <div>
      <HeroSection />
      <PainPoint />
      <div className="relative">
        <FragmentedTools />
        <OnePlace />
      </div>
      <BenefitsGrid />
      <OperationsShowcase />
      <CoreServices />
      <Testimonials />
      <ChurchMarquee />
      <FAQ />
      <MidCTA />
    </div>
  );
}
