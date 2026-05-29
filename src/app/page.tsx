import { Hero } from "@/components/sections/Hero";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { AfterHours } from "@/components/sections/AfterHours";
import { Gallery } from "@/components/sections/Gallery";
import { Signoff } from "@/components/sections/Signoff";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsShowcase />
      <AfterHours />
      <Gallery />
      <Signoff />
    </>
  );
}
