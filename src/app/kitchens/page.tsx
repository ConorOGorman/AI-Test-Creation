import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

const heroImage =
  "https://api.espaciohomedesign.com/uploads/xlarge_HDR_sin_titulo_8_6db5d5fe49.jpg";

const galleryImages = [
  {
    src: "https://api.espaciohomedesign.com/uploads/xlarge_SANTA_CILIA_EHOME_03_11cfcc7935.jpg",
    caption: "MH6 Kitchen - Modulnova",
  },
  {
    src: "https://api.espaciohomedesign.com/uploads/xlarge_Cocina_Molteni_505209e4b3.jpg",
    caption: "Intersection Kitchen by Vincent Van Duysen - Molteni&C",
  },
  {
    src: "https://api.espaciohomedesign.com/uploads/xlarge_HDR_sin_titulo_12_3_58b965851e.jpg",
    caption: "Espacio kitchens",
  },
];

export default function KitchensPage() {
  return (
    <main className="min-h-screen bg-primary-white text-primary-black font-silka selection:bg-blue-200">
      <Header />

      <section className="relative h-screen w-full overflow-hidden bg-primary-black text-primary-white">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-375 flex-col items-center justify-center px-8.75 text-center">
          <div className="grid gap-8.75">
            <h1 className="text-[3em] leading-[0.9] tracking-tight md:text-[5em] lg:text-[7em]">
              <span className="block uppercase">The heart and soul</span>
              <span className="block uppercase">
                of your <i className="font-normal">home</i>
              </span>
            </h1>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] md:text-base">
              Espacio Home Design Kitchens
            </h3>
          </div>
        </div>

        <div className="absolute bottom-11.25 left-1/2 z-10 -translate-x-1/2 text-sm font-semibold uppercase tracking-widest">
          Scroll Down
        </div>
      </section>

      <section className="mx-auto max-w-375 px-8.75 py-11.25">
        <h2 className="text-[2.25em] uppercase leading-[1.05] md:text-[3em] lg:text-[3.75em]">
          Experts in <i className="font-normal">kitchens</i> since 1945.
        </h2>
      </section>

      <section className="mx-auto max-w-375 px-8.75 pb-11.25">
        <p className="max-w-245 text-[1.1em] leading-relaxed">
          <span>
            We are passionate about our work. That is why we never tire of
            exploring how we live and enjoy the spaces within our home…
            particularly the kitchen:{" "}
          </span>
          <em className="not-italic">
            <span>the very heart and soul of the home.</span>
          </em>
        </p>
      </section>

      <section className="mx-auto max-w-375 px-8.75 pb-11.25">
        <div className="grid gap-8.75 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <div className="relative overflow-hidden">
            <img
              src="https://api.espaciohomedesign.com/uploads/xlarge_Espacio_Home_Pollensa_49_1x_1_1_0285f9b617.jpg"
              alt="Kitchen"
              className="block h-auto w-full"
              loading="lazy"
            />
          </div>
          <p className="text-[1em] leading-relaxed">
            The kitchen is where everything happens: from the morning coffee to
            long conversations with friends or that glass of wine after work.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-375 px-8.75 py-11.25">
        <h2 className="text-center text-[2.25em] uppercase leading-[1.05] md:text-[3em] lg:text-[3.75em]">
          We create moments to <i className="font-normal">share.</i>
        </h2>
      </section>

      <section className="mx-auto max-w-375 px-8.75 pb-17.5">
        <div className="flex snap-x snap-mandatory gap-8.75 overflow-x-auto pb-3.75">
          {galleryImages.map((img) => (
            <figure
              key={img.src}
              className="min-w-[85%] snap-start md:min-w-[60%] lg:min-w-[45%]"
            >
              <div className="relative overflow-hidden bg-bg-light">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="block h-auto w-full"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-2.5 text-xs font-semibold uppercase tracking-widest text-gray-600">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Footer />
      <FloatingContact />
    </main>
  );
}
