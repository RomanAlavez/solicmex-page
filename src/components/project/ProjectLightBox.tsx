import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

export default function ProjectLightbox({ images = [], name = "" }) {
  const [index, setIndex] = useState(-1); // -1 = cerrado

  const slides = images.map((src) => ({ src, alt: name }));

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="group relative overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            style={{
              aspectRatio: "16/9",
              border: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(2,18,28,0.48)",
            }}
            aria-label={`Ver imagen ${i + 1} de ${name}`}
          >
            <img
              src={src}
              alt={`${name} — ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              style={{ background: "rgba(2,12,20,0.55)" }}
            >
              <svg
                className="w-6 h-6"
                style={{ color: "rgba(103,232,249,0.9)" }}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>

            <span
              className="absolute bottom-2 right-2 text-[10px] font-mono tabular-nums opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: "rgba(103,232,249,0.6)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div
              className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(to right, transparent, rgba(6,182,212,0.55), transparent)" }}
            />
          </button>
        ))}
      </div>

      {/* ── Lightbox ── */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Thumbnails, Zoom, Counter]}
        styles={{
          container: {
            backgroundColor: "rgba(2,8,16,0.95)",
            backdropFilter: "blur(24px)",
          },
        }}
        thumbnails={{
          border: 1,
          borderRadius: 8,
          padding: 2,
          gap: 8,
        }}
        zoom={{ maxZoomPixelRatio: 3 }}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
        on={{
          view: ({ index: i }) => setIndex(i),
        }}
      />
    </>
  );
}