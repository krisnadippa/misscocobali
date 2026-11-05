import React from "react";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import AnnouncementBar from "@/components/AnnouncementBar";
import HeroSection from "@/components/HeroSection";
import FlavorsSection from "@/components/FlavorsSection";
import SpotlightSection from "@/components/SpotlightSection";
import IngredientsSection from "@/components/IngredientsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <div className="bg-[#24422E] text-slate-900 font-sans antialiased overflow-x-hidden selection:bg-zesto-lime selection:text-black">
      {/* Lenis Smooth Scroll Engine */}
      <SmoothScroll />

      {/* GSAP Preloader Animation with Per-Letter 'SPARKLING' */}
      <Preloader />

      {/* BEGIN: AnnouncementBar */}
      <AnnouncementBar />
      {/* END: AnnouncementBar */}

      {/* BEGIN: MainHeroSection */}
      <HeroSection />
      {/* END: MainHeroSection */}

      {/* Flavors Section */}
      <FlavorsSection />

      {/* Spotlight Section */}
      <SpotlightSection />

      {/* Ingredients Section */}
      <IngredientsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CtaBanner />

      {/* Footer Section */}
      <Footer />

      {/* Interactive Cart Drawer */}
      <CartDrawer />
    </div>
  );
}
