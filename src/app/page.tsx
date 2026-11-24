import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { AboutIntro } from "@/components/home/AboutIntro";
import { ProductsHorizontal } from "@/components/home/ProductsHorizontal";
import { WhyStack } from "@/components/home/WhyStack";
import { IndustriesBento } from "@/components/home/IndustriesBento";
import { ProcessLine } from "@/components/home/ProcessLine";
import { Testimonials } from "@/components/home/Testimonials";
import { Certifications } from "@/components/home/Certifications";
import { CtaBand } from "@/components/home/CtaBand";
import { CaseStudiesHover } from "@/components/sections/CaseStudiesHover";
import { IntegrationsOrbit } from "@/components/sections/IntegrationsOrbit";
import { GalleryParallax } from "@/components/sections/GalleryParallax";
import { GlobalPresence } from "@/components/sections/GlobalPresence";
import { NewsEvents } from "@/components/sections/NewsEvents";
import { Faq } from "@/components/sections/Faq";
import { PhotoSliderSection } from "@/components/media/PhotoSlider";
import { eventPhotos } from "@/data/content";
import { ClientsShowcase } from "@/components/sections/ClientsShowcase";
import { ServicesTeaser, SolutionsTeaser } from "@/components/home/OfferingsTeasers";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutIntro />
      <ProductsHorizontal />
      <SolutionsTeaser />
      <WhyStack />
      <ServicesTeaser />
      <CaseStudiesHover />
      <ClientsShowcase />
      <IndustriesBento />
      <IntegrationsOrbit />
      <ProcessLine />
      <GalleryParallax />
      <GlobalPresence />
      <Testimonials />
      <NewsEvents />
      <PhotoSliderSection
        eyebrow="Events & exhibitions"
        title="Meet us around the world"
        text="Trade shows, summits and masterclasses where our team shares what we have learned."
        items={eventPhotos}
        label="Events and exhibitions photos"
      />
      <Faq />
      <Certifications />
      <CtaBand />
    </>
  );
}
