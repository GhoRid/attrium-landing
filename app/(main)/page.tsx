import BenefitsGrid from "@/app/(main)/_components/BenefitsGrid";
import ChurchMarquee from "@/app/(main)/_components/ChurchMarquee";
import CoreServices from "@/app/(main)/_components/CoreServices";
import FAQ from "@/app/(main)/_components/FAQ";
import FragmentedTools from "@/app/(main)/_components/FragmentedTools";
import Hero from "@/app/(main)/_components/Hero";
import MidCTA from "@/app/(main)/_components/MidCTA";
import OnePlace from "@/app/(main)/_components/OnePlace";
import OperationsShowcase from "@/app/(main)/_components/OperationsShowcase";
import PainPoint from "@/app/(main)/_components/PainPoint";
import Testimonials from "@/app/(main)/_components/Testimonials";

export default function page() {
  return (
    <div>
      <Hero />
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
