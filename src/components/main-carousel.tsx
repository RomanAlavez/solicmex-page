

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface Slide {
    id: number;
    image: string;
}

const slides: Slide[] = [
    {
        id: 1,
        image: "/images/extras/Solicmex-wallpaper.webp"
    },
    {
        id: 2,
        image: "/images/extras/Solicmex-wallpaper-2.webp"
    },
    {
        id: 3,
        image: "/images/extras/Solicmex-wallpaper-3.webp"
    },
    {
        id: 4,
        image: "/images/extras/Solicmex-wallpaper-4.webp"
    },
    {
        id: 5,
        image: "/images/extras/Solicmex-wallpaper-5.webp"
    },
    {
        id: 6,
        image: "/images/extras/Solicmex-wallpaper-6.webp"
    },
    {
        id: 7,
        image: "/images/extras/Solicmex-wallpaper-7.webp"
    },
    {
        id: 8,
        image: "/images/extras/Solicmex-wallpaper-8.webp"
    },
    {
        id: 9,
        image: "/images/extras/Solicmex-wallpaper-9.webp"
    },
    {
        id: 10,
        image: "/images/extras/Solicmex-wallpaper-10.webp"
    },
    {
        id: 11,
        image: "/images/extras/Solicmex-wallpaper-11.webp"
    },
    {
        id: 12,
        image: "/images/extras/Solicmex-wallpaper-12.webp"
    },
    {
        id: 13,
        image: "/images/extras/Solicmex-wallpaper-13.webp"
    },

    {
        id: 14,
        image: "/images/extras/Solicmex-wallpaper-14.webp"
    },
    {
        id: 15,
        image: "/images/extras/Solicmex-wallpaper-15.webp"
    },
    {
        id: 16,
        image: "/images/extras/Solicmex-wallpaper-16.webp"
    },
    {
        id: 17,
        image: "/images/extras/Solicmex-wallpaper-17.webp"
    },
    {
        id: 18,
        image: "/images/extras/Solicmex-wallpaper-18.webp"
    },
    {
        id: 19,
        image: "/images/extras/Solicmex-wallpaper-19.webp"
    },
    {
        id: 20,
        image: "/images/extras/Solicmex-wallpaper-20.webp"
    },
    {
        id: 21,
        image: "/images/extras/Solicmex-wallpaper-21.webp"
    },
    {
        id: 22,
        image: "/images/extras/Solicmex-wallpaper-22.webp"
    },
    {
        id: 23,
        image: "/images/extras/Solicmex-wallpaper-23.webp"
    },

    {
        id: 28,
        image: "/images/extras/Solicmex-wallpaper-28.webp"
    },
    {
        id: 29,
        image: "/images/extras/Solicmex-wallpaper-29.webp"
    },
    {
        id: 30,
        image: "/images/extras/Solicmex-wallpaper-30.webp"
    },
    {
        id: 31,
        image: "/images/extras/Solicmex-wallpaper-31.webp"
    },
    {
        id: 32,
        image: "/images/extras/Solicmex-wallpaper-32.webp"
    },
    {
        id: 33,
        image: "/images/extras/Solicmex-wallpaper-33.webp"
    },
    {
        id: 34,
        image: "/images/extras/Solicmex-wallpaper-34.webp"
    },
    {
        id: 35,
        image: "/images/extras/Solicmex-wallpaper-35.webp"
    }

];

export default function MainCarousel() {
    const [current, setCurrent] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const openLightbox = (index: number) => {
        setCurrent(index);
        setLightboxOpen(true);
    };

    return (
        <>
            <section className="w-full px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-7xl">

                    <div className="relative flex items-center">

                        {/* Flecha izquierda */}
                        <button
                            type="button"
                            onClick={prevSlide}
                            aria-label="Imagen anterior"
                            className="
                absolute left-0 z-20
                hidden sm:flex
                h-11 w-11 lg:h-12 lg:w-12
                -translate-x-1/2
                items-center justify-center
                rounded-full
                bg-white
                text-gray-800
                shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                ring-1 ring-black/5
                transition-all duration-300
                hover:scale-110
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]
                active:scale-95
              "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-5 w-5"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </button>

                        {/* Área del carousel */}
                        <div className="w-full overflow-hidden px-0 sm:px-8 lg:px-12">
                            <div className="relative flex h-[260px] items-center sm:h-[380px] lg:h-[480px]">

                                {slides.map((slide, index) => {
                                    const position = index - current;

                                    /*
                                     * Permite que el carousel sea circular.
                                     */
                                    const normalizedPosition =
                                        ((position + slides.length / 2) % slides.length) -
                                        slides.length / 2;

                                    const isCurrent = normalizedPosition === 0;
                                    const isPrevious = normalizedPosition === -1;
                                    const isNext = normalizedPosition === 1;

                                    /*
                                     * Solo renderizamos visualmente:
                                     * - imagen anterior
                                     * - imagen actual
                                     * - imagen siguiente
                                     */
                                    if (
                                        !isCurrent &&
                                        !isPrevious &&
                                        !isNext
                                    ) {
                                        return null;
                                    }

                                    return (
                                        <button
                                            key={slide.id}
                                            type="button"
                                            onClick={() => {
                                                if (isCurrent) {
                                                    openLightbox(index);
                                                } else {
                                                    setCurrent(index);
                                                }
                                            }}
                                            className={`
                        absolute left-1/2
                        h-full
                        overflow-hidden
                        rounded-3xl
                        shadow-[0_25px_70px_-20px_rgba(0,0,0,0.3)]
                        ring-1 ring-black/5
                        transition-all
                        duration-700
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-cyan-500

                        ${isCurrent
                                                    ? `
                              z-10
                              w-[78%]
                              -translate-x-1/2
                              scale-100
                              opacity-100
                            `
                                                    : isPrevious
                                                        ? `
                              z-0
                              w-[65%]
                              -translate-x-[108%]
                              scale-[0.82]
                              opacity-75
                            `
                                                        : `
                              z-0
                              w-[65%]
                              translate-x-[8%]
                              scale-[0.82]
                              opacity-75
                            `
                                                }
                      `}
                                        >
                                            <img
                                                src={slide.image}
                                                alt="Imagen de Solicmex Sistemas contra incendios"
                                                className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          hover:scale-[1.02]
                        "
                                            />

                                            {/* Overlay únicamente en imágenes laterales */}
                                            {!isCurrent && (
                                                <div className="absolute inset-0 bg-black/20 transition-colors duration-300 hover:bg-black/10" />
                                            )}

                                            {/* Overlay de la imagen actual */}
                                            {isCurrent && (
                                                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Flecha derecha */}
                        <button
                            type="button"
                            onClick={nextSlide}
                            aria-label="Siguiente imagen"
                            className="
                absolute right-0 z-20
                hidden sm:flex
                h-11 w-11 lg:h-12 lg:w-12
                translate-x-1/2
                items-center justify-center
                rounded-full
                bg-white
                text-gray-800
                shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                ring-1 ring-black/5
                transition-all duration-300
                hover:scale-110
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]
                active:scale-95
              "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-5 w-5"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    </div>

                    {/* Controles móviles */}
                    <div className="mt-5 flex items-center justify-center gap-2 sm:hidden">
                        <button
                            type="button"
                            onClick={prevSlide}
                            aria-label="Imagen anterior"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 shadow-md ring-1 ring-black/5"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-5 w-5"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </button>

                        {/* Indicadores */}
                        <div className="flex items-center gap-2 px-3">
                            {slides.map((slide, index) => (
                                <button
                                    key={slide.id}
                                    type="button"
                                    onClick={() => setCurrent(index)}
                                    aria-label={`Ir a imagen ${index + 1}`}
                                    className={`
                    h-2 rounded-full transition-all duration-300
                    ${index === current
                                            ? "w-7 bg-gray-800"
                                            : "w-2 bg-gray-300"
                                        }
                  `}
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={nextSlide}
                            aria-label="Siguiente imagen"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 shadow-md ring-1 ring-black/5"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-5 w-5"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    </div>

                    {/* Indicadores desktop */}
                    <div className="mt-6 hidden items-center justify-center gap-2 sm:flex">
                        {slides.map((slide, index) => (
                            <button
                                key={slide.id}
                                type="button"
                                onClick={() => setCurrent(index)}
                                aria-label={`Ir a imagen ${index + 1}`}
                                className={`
                  h-2 rounded-full transition-all duration-300
                  ${index === current
                                        ? "w-8 bg-gray-800"
                                        : "w-2 bg-gray-300 hover:bg-gray-500"
                                    }
                `}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={current}
                slides={slides.map((slide) => ({
                    src: slide.image,
                }))}
                on={{
                    view: ({ index }) => {
                        setCurrent(index);
                    },
                }}
            />
        </>
    );
}

