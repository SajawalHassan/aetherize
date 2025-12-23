import { CTA } from "@/components/pages/home/cta";
import { Header } from "@/components/pages/home/header";
import { Hero } from "@/components/pages/home/hero/hero";
import { Prices } from "@/components/pages/home/prices/prices";

export default function Home() {
  return (
    <div className="bg-black min-h-screen w-full text-white font-finlandica! px-6 pb-20">
      <Header />
      <Hero />
      <Prices />
      <CTA />
    </div>
  );
}
