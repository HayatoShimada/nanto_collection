import { Hero } from "@/components/Hero";
import { TitleSection } from "@/components/TitleSection";
import { About } from "@/components/About";
import { EventInfo } from "@/components/EventInfo";
import { Application } from "@/components/Application";
import { Donation } from "@/components/Donation";
import { Committee } from "@/components/Committee";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { FixedBanner } from "@/components/FixedBanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <TitleSection />
      <About />
      <EventInfo />
      <Application />
      <Donation />
      <Committee />
      <Faq />
      <Contact />
      <FixedBanner />
    </main>
  );
}
