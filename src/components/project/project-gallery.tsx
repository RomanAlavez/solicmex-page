import { useState } from "react";
import slugify from "@/utils/utils";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Props = {
  images: string[];
  alt: string;
};

export default function ProjectGallery({ images, alt }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!images.length) return null;

  const hasMultiple = images.length > 1;
  const slides = images.map((src) => ({ src }));
  const thumbnails = images.slice(1, 5);
  const remaining = images.length - 1 - thumbnails.length;

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <div>
      <div
        className={
          hasMultiple
            ? "grid grid-cols-2 gap-3 sm:grid-cols-4 sm:grid-rows-2"
            : ""
        }
      >
        {/* Main image */}
        <button
          type="button"
          onClick={() => openAt(0)}
          aria-label={`Ver imagen de ${alt} en pantalla completa`}
          className={
            hasMultiple
              ? "group relative col-span-2 overflow-hidden rounded-2xl border border-slate-200 sm:col-span-2 sm:row-span-2"
              : "group relative block w-full overflow-hidden rounded-2xl border border-slate-200"
          }
        >
          <img
            src={images[0]}
            alt={alt}
            style={{
              viewTransitionName: `project-image-main-${slugify(alt)}`,
            }}
            className={
              hasMultiple
                ? "h-full min-h-55 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                : "aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            }
          />
          <span className="pointer-events-none absolute inset-0 border-2 border-transparent transition-colors duration-300 group-hover:border-orange-600" />
        </button>

        {/* Secondary thumbnails */}
        {hasMultiple &&
          thumbnails.map((src, i) => {
            const realIndex = i + 1;
            const isLast = i === thumbnails.length - 1 && remaining > 0;
            return (
              <button
                key={src}
                type="button"
                onClick={() => openAt(realIndex)}
                aria-label={`Ver imagen ${realIndex + 1} de ${alt}`}
                className="group relative overflow-hidden rounded-xl border border-slate-200"
              >
                <img
                  src={src}
                  alt={`${alt} ${realIndex + 1}`}
                  className="h-full min-h-20 w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <span className="pointer-events-none absolute inset-0 border-2 border-transparent transition-colors duration-300 group-hover:border-cyan-600" />
                {isLast && (
                  <span className="absolute inset-0 flex items-center justify-center bg-slate-900/60 font-mono text-sm font-semibold text-white">
                    +{remaining}
                  </span>
                )}
              </button>
            );
          })}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        styles={{
          container: { backgroundColor: "rgba(15, 23, 42, 0.95)" },
        }}
      />
    </div>
  );
}