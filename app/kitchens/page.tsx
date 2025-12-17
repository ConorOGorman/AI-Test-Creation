'use client';

import { useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import AppointmentModal from '@/components/AppointmentModal/AppointmentModal';

const galleryItems = [
  { title: 'Pollensa', subtitle: 'Natural light & stone tones' },
  { title: 'Palma', subtitle: 'Warm woods & brass details' },
  { title: 'Calvià', subtitle: 'Minimal lines, maximum function' },
  { title: 'Sóller', subtitle: 'Soft neutrals, timeless craft' },
];

export default function KitchensPage() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  return (
    <>
      <Header onAppointmentClick={() => setIsAppointmentModalOpen(true)} />

      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-secondary">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-background-secondary to-accent-50 opacity-60" />
          <div className="absolute inset-0 bg-black/10" />

          <div className="container-custom relative z-10 py-32 text-center">
            <div className="mx-auto max-w-5xl">
              <h1 className="text-display-lg lg:text-display-xl font-serif text-white tracking-tight">
                <span className="block uppercase">The heart and soul</span>
                <span className="block uppercase mt-4">
                  <i className="font-normal">of a home.</i>
                </span>
              </h1>
              <p className="mt-8 text-body-lg text-white/80 max-w-2xl mx-auto">
                Kitchens designed for real life — crafted with care, built to last, and made to be shared.
              </p>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-20 lg:py-24">
          <div className="container-custom">
            <h2 className="text-display-md lg:text-display-lg font-serif text-text-primary">
              Experts in <i className="font-normal">kitchens</i> since 1945.
            </h2>
            <p className="mt-8 text-body-lg text-text-secondary max-w-3xl">
              We are passionate about our work. That is why we never tire of exploring how we live and enjoy the spaces
              within our home. We study each project to create balanced spaces: functional, elegant, and welcoming.
            </p>
          </div>
        </section>

        {/* Feature */}
        <section className="pb-24 lg:pb-32">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-accent-200" />
              </div>
              <div>
                <h3 className="text-h1 lg:text-display-md font-serif text-text-primary mb-6">
                  Designed around the way you live
                </h3>
                <p className="text-body-lg text-text-secondary mb-8">
                  From layout to lighting, we design kitchens that feel effortless: tailored storage, intuitive zones,
                  durable materials, and a timeless finish.
                </p>
                <button onClick={() => setIsAppointmentModalOpen(true)} className="btn btn-secondary">
                  Make an appointment
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-24 lg:py-32 bg-background-secondary">
          <div className="container-custom">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-display-md lg:text-display-lg font-serif text-text-primary">
                We create moments to <i className="font-normal">share.</i>
              </h2>
            </div>

            <div className="flex gap-8 overflow-x-auto pb-6 snap-x snap-mandatory">
              {galleryItems.map((item) => (
                <figure key={item.title} className="snap-center shrink-0 w-[320px]">
                  <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-background-tertiary" />
                  </div>
                  <figcaption className="mt-5">
                    <div className="text-h4 font-serif text-text-primary">{item.title}</div>
                    <div className="text-body-sm text-text-muted mt-1">{item.subtitle}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </>
  );
}

