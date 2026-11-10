"use client";

import dynamic from "next/dynamic";
import Hero from "./sections/Hero";

const About = dynamic(() => import("./sections/About"));
const Services = dynamic(() => import("./sections/Services"));
const FeaturedWork = dynamic(() => import("./sections/FeaturedWork"));
const Workflow = dynamic(() => import("./sections/Workflow"));
const Skills = dynamic(() => import("./sections/Skills"));
const Resume = dynamic(() => import("./sections/Resume"));
const Contact = dynamic(() => import("./sections/Contact"));

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
  );
}