import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { ResumeSection } from "@/components/ResumeSection";
import { Services } from "@/components/Services";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Skills } from "@/components/Skills";
import { StructuredData } from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Experience />
        <Skills />
        <Projects />
        <ResumeSection />
        <Contact />
      </main>
      <SiteFooter />
      <StructuredData />
    </>
  );
}
