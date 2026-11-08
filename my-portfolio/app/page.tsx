import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Education from "./sections/Education"; // <-- Make sure this is here
import FeaturedWork from "./sections/FeaturedWork";
import Workflow from "./sections/Workflow";
import Skills from "./sections/Skills";
import Resume from "./sections/Resume";
import Contact from "./sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <Stats /> <-- Removed */}
      <About />
      <Services />
      <Education /> {/* <-- This is the new layout */}
      <FeaturedWork />
      <Workflow />
      <Skills />
      <Resume />
      <Contact />
    </>
  )
}