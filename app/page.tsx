'use client';

import { useState } from 'react';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import NewsCards from '@/components/NewsCards/NewsCards';
import CategoryBlocks from '@/components/CategoryBlocks/CategoryBlocks';
import TypographicSection from '@/components/TypographicSection/TypographicSection';
import FeatureBlocks from '@/components/FeatureBlocks/FeatureBlocks';
import ProjectsGallery from '@/components/ProjectsGallery/ProjectsGallery';
import BrandLogos from '@/components/BrandLogos/BrandLogos';
import Footer from '@/components/Footer/Footer';
import AppointmentModal from '@/components/AppointmentModal/AppointmentModal';

export default function Home() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  return (
    <>
      <Header onAppointmentClick={() => setIsAppointmentModalOpen(true)} />
      <main>
        <Hero />
        <NewsCards />
        <CategoryBlocks />
        <TypographicSection />
        <FeatureBlocks />
        <ProjectsGallery />
        <BrandLogos />
      </main>
      <Footer />
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </>
  );
}
