import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import FeaturedWork from "./sections/FeaturedWork";
import Workflow from "./sections/Workflow";
import Skills from "./sections/Skills";
import Resume from "./sections/Resume";
import Contact from "./sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <FeaturedWork />
      <Workflow />
      <Skills />
      <Resume />
      <Contact />
    </>
  )
}