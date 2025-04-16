import React from "react";
import HeroSection from "@/components/home/HeroSection";
import SkillsSection from "@/components/home/SkillsSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import CtaSection from "@/components/home/CtaSection";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <SkillsSection />
      <FeaturedProjects projects={projects} />
      <CtaSection />
    </div>
  );
}
