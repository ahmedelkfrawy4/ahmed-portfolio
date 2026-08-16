import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import SelectedWork from "@/components/SelectedWork";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <AboutPreview />
        <SelectedWork />
        <Projects />
        <Process />
        <Services />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
