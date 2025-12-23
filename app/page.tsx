import { Header } from "@/components/pages/home/header";
import { Hero } from "@/components/pages/home/hero";

export default function Home() {
  return (
    <div className="bg-black min-h-screen w-full text-white font-finlandica!">
      <Header />
      <Hero />
    </div>
  );
}
