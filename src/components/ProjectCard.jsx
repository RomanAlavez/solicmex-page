import { motion } from "framer-motion";
import slugify from "../utils/utils";

export default function ProjectCard({ name, description, images, locale, ubication, app, index = 0 }) {
  const basePath = locale === "en" ? "/en/project" : "/project";

  return (
    <motion.a
      href={`${basePath}/${slugify(name)}`}
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.15 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-400/25 cursor-pointer transition-colors duration-500"
      style={{
        background: "rgba(2,18,28,0.48)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: "0 4px 28px rgba(0,0,0,0.35)",
      }}
    >
      {/* Glow en hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.1) 0%, transparent 65%)",
        }}
      />

      {/* Imagen */}
      <div className="relative w-full aspect-video overflow-hidden">
        {images?.[0] ? (
          <img
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ viewTransitionName: `project-image-${slugify(name)}` }}
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.07), rgba(2,18,28,0.7))" }}
          >
            <svg className="w-10 h-10 text-cyan-400/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Overlay inferior */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(2,12,20,0.75) 0%, transparent 55%)" }}
        />

        {/* Ubicación sobre la imagen */}
        {ubication && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            <svg className="w-3 h-3 shrink-0" style={{ color: "rgba(103,232,249,0.7)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span
              className="text-[10px] font-medium"
              style={{ color: "rgba(103,232,249,0.65)" }}
            >
              {ubication}
            </span>
          </div>
        )}

        {/* Badge de app si existe */}
        {app && (
          <div className="absolute top-3 right-3">
            <span
              className="text-[9px] tracking-widest uppercase font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(6,182,212,0.15)",
                border: "1px solid rgba(6,182,212,0.3)",
                color: "rgba(103,232,249,0.8)",
                backdropFilter: "blur(6px)",
              }}
            >
              {app}
            </span>
          </div>
        )}
      </div>

      {/* Cuerpo */}
      <div className="flex flex-col gap-2.5 p-5 flex-1">
        <h4
          className="text-base sm:text-lg font-bold text-white/90 group-hover:text-cyan-100 leading-snug transition-colors duration-300"
          style={{ viewTransitionName: `project-name-${slugify(name)}` }}
        >
          {name}
        </h4>

        <p
          className="text-xs sm:text-sm leading-relaxed flex-1"
          style={{
            color: "rgba(255,255,255,0.4)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            viewTransitionName: `project-description-${slugify(name)}`,
          }}
        >
          {description}
        </p>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-3 mt-auto"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span
            className="text-[11px] font-medium flex items-center gap-1.5 transition-colors duration-200"
            style={{ color: "rgba(6,182,212,0.65)" }}
          >
            Ver proyecto
            <svg
              className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>

          {/* Contador de imágenes */}
          {images?.length > 1 && (
            <span
              className="text-[10px] flex items-center gap-1"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {images.length}
            </span>
          )}
        </div>
      </div>

      {/* Línea glow inferior al hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(to right, transparent, rgba(6,182,212,0.55), transparent)" }}
      />
    </motion.a>
  );
}