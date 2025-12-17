import React from 'react';

export default function TypographicSection() {
  return (
    <section className="py-11.25 px-8.75 max-w-375 mx-auto text-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-[2.5em] md:text-[4em] font-silka font-thin uppercase leading-[0.9]">
          Heritage
        </h2>
        <h2 className="text-[2.5em] md:text-[4em] font-silka font-thin uppercase leading-[0.9]">
          Design
        </h2>
        <h2 className="text-[2.5em] md:text-[4em] font-silka font-thin uppercase leading-[0.9]">
          Commitment
        </h2>
        <div className="text-xl uppercase tracking-widest my-8 font-silka font-medium">Of</div>
        <h2 className="text-[2.5em] md:text-[4em] font-silka font-thin uppercase leading-[0.9]">
          Three Generations
        </h2>
      </div>
    </section>
  );
}
