import Hero from "./sections/Hero";
import Stats from "./sections/Stats";
import Marquee from "./sections/Marquee";
import About from "./sections/About";
import Services from "./sections/Services";
import Education from "./sections/Education";
import FeaturedWork from "./sections/FeaturedWork";
import Workflow from "./sections/Workflow";
import Skills from "./sections/Skills";
import Resume from "./sections/Resume";
import Contact from "./sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Marquee />
      <About />
      <Services />
      <Education />
      <FeaturedWork />
      <Workflow />
      <Skills />
      <Resume />
      <Contact />
    </>
  )
}