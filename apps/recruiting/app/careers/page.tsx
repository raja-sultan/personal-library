import React from "react";
import JobOpenings from "@sections/careers";
import { HeroSection } from "@layouts/careers-layout/hero-section";

function Careers(): JSX.Element {
  return (
    <>
      <HeroSection />
      <JobOpenings />
    </>
  );
}

export default Careers;
