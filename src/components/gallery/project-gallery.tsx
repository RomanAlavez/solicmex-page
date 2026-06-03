"use client";

import { useState, useMemo, useCallback } from "react";
import type { Project } from "@/types/types";

interface ProjectGalleryProps {
  projects: Project[];
}

type ImageItem = {
  image: string;
  projectName: string;
  projectDescription: string;
  app: string;
  projectId: string;
};


const COLOR_PALETTE: Array<{ bg: string; text: string; dot: string }> = [
  { bg: "#FEE2E2", text: "#991B1B", dot: "#EF4444" }, // rojo
  { bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B" }, // ámbar
  { bg: "#DBEAFE", text: "#1E3A8A", dot: "#3B82F6" }, // azul
  { bg: "#D1FAE5", text: "#065F46", dot: "#10B981" }, // verde
  { bg: "#FCE7F3", text: "#831843", dot: "#EC4899" }, // rosa
  { bg: "#FDE8D8", text: "#7C2D12", dot: "#EA580C" }, // naranja
  { bg: "#EDE9FE", text: "#4C1D95", dot: "#7C3AED" }, // violeta
  { bg: "#CFFAFE", text: "#164E63", dot: "#06B6D4" }, // cian
  { bg: "#DCFCE7", text: "#14532D", dot: "#22C55E" }, // verde lima
  { bg: "#FFF7ED", text: "#7C2D12", dot: "#FB923C" }, // durazno
];


function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function getAppLabel(app: string): string {
  // Convierte "FIRE_SUPPRESSION" → "Fire Suppression", "Rociadores" → "Rociadores"
  return app
    .toLowerCase()
    .split(/[_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getBadgeStyle(app: string) {
  const index = hashString(app) % COLOR_PALETTE.length;
  return COLOR_PALETTE[index];
}

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<string>("TODOS");
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Tipos únicos de trabajo
  const appTypes = useMemo(() => {
    const types = Array.from(new Set(projects.map((p) => p.APP)));
    return types;
  }, [projects]);

  // Proyectos filtrados
  const filteredProjects = useMemo(() => {
    if (activeFilter === "TODOS") return projects;
    return projects.filter((p) => p.APP === activeFilter);
  }, [projects, activeFilter]);

  // Imágenes con metadata
  const images = useMemo<ImageItem[]>(() => {
    return filteredProjects.flatMap((project) =>
      project.IMAGES.map((image) => ({
        image,
        projectName: project.NAME,
        projectDescription: project.DESCRIPTION,
        app: project.APP,
        projectId: project.ID,
      }))
    );
  }, [filteredProjects]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, item: ImageItem) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setSelectedImage(item);
      }
    },
    []
  );

  const handleModalKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    },
    []
  );

  const currentIndex = selectedImage
    ? images.findIndex((i) => i === selectedImage)
    : -1;

  const goToPrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (currentIndex > 0) setSelectedImage(images[currentIndex - 1]);
    },
    [currentIndex, images]
  );

  const goToNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (currentIndex < images.length - 1)
        setSelectedImage(images[currentIndex + 1]);
    },
    [currentIndex, images]
  );

  const totalCount = projects.reduce((acc, p) => acc + p.IMAGES.length, 0);

  return (
    <section aria-label="Galería de proyectos" className="w-full">

      {/* ── Encabezado de filtros ── */}
      <div className="mb-8">
        {/* Contador */}
        <p className="text-sm text-gray-500 mb-4">
          {activeFilter === "TODOS"
            ? `${totalCount} imágenes · ${projects.length} proyectos`
            : `${images.length} imágenes · ${filteredProjects.length} proyectos en ${getAppLabel(activeFilter)}`}
        </p>

        {/* Chips de filtro */}
        <div
          role="group"
          aria-label="Filtrar por tipo de trabajo"
          className="flex flex-wrap gap-2"
        >
          {/* Chip "Todos" */}
          <FilterChip
            label="Todos"
            count={totalCount}
            active={activeFilter === "TODOS"}
            onClick={() => setActiveFilter("TODOS")}
          />
          {appTypes.map((app) => {
            const count = projects
              .filter((p) => p.APP === app)
              .reduce((acc, p) => acc + p.IMAGES.length, 0);
            return (
              <FilterChip
                key={app}
                label={getAppLabel(app)}
                count={count}
                active={activeFilter === app}
                app={app}
                onClick={() => setActiveFilter(app)}
              />
            );
          })}
        </div>
      </div>

      {/* ── Grilla de imágenes ── */}
      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 mb-4 opacity-40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg>
          <p className="text-base font-medium">Sin proyectos en esta categoría</p>
          <button
            className="mt-3 text-sm text-red-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
            onClick={() => setActiveFilter("TODOS")}
          >
            Ver todos los proyectos
          </button>
        </div>
      ) : (
        <div
          className="grid auto-rows-[240px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          role="list"
          aria-label="Imágenes de proyectos"
        >
          {images.map((item, index) => {
            const isLarge = index % 7 === 0 || index % 7 === 4;
            const badgeStyle = getBadgeStyle(item.app);

            return (
              <button
                key={`${item.projectId}-${index}`}
                role="listitem"
                onClick={() => setSelectedImage(item)}
                onKeyDown={(e) => handleKeyDown(e, item)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                aria-label={`Ver imagen de ${item.projectName}`}
                className={[
                  "group relative overflow-hidden rounded-2xl cursor-pointer text-left",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2",
                  "transition-shadow duration-300",
                  hoveredIndex === index
                    ? "shadow-xl shadow-black/20"
                    : "shadow-sm",
                  isLarge ? "sm:col-span-2 sm:row-span-2" : "",
                ].join(" ")}
              >
                {/* Imagen */}
                <img
                  src={item.image}
                  alt={item.projectName}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />

                {/* Overlay gradiente en hover */}
                <div
                  className={[
                    "absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent",
                    "transition-opacity duration-300",
                    hoveredIndex === index ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                  aria-hidden="true"
                />

                {/* Badge tipo de trabajo — siempre visible */}
                <span
                  className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                  style={{
                    background: badgeStyle.bg + "CC",
                    color: badgeStyle.text,
                  }}
                  aria-label={`Tipo: ${getAppLabel(item.app)}`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: badgeStyle.dot }}
                    aria-hidden="true"
                  />
                  {getAppLabel(item.app)}
                </span>

                {/* Info del proyecto — visible en hover */}
                <div
                  className={[
                    "absolute bottom-0 left-0 right-0 p-4 transition-all duration-300",
                    hoveredIndex === index
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0",
                  ].join(" ")}
                >
                  <p className="text-white font-semibold text-sm leading-snug line-clamp-1">
                    {item.projectName}
                  </p>
                  {item.projectDescription && (
                    <p className="text-white/70 text-xs mt-0.5 line-clamp-2 leading-relaxed">
                      {item.projectDescription}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1 mt-2 text-white/60 text-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                    Ver imagen
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* ── Lightbox ── */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
          onKeyDown={handleModalKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen de ${selectedImage.projectName}`}
          tabIndex={-1}
        >
          {/* Panel interior */}
          <div
            className="relative flex flex-col max-w-5xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barra superior */}
            <div className="flex items-center justify-between px-2 pb-3">
              <div className="flex flex-col">
                <span
                  className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit"
                  style={{
                    background: getBadgeStyle(selectedImage.app).bg + "33",
                    color: getBadgeStyle(selectedImage.app).bg,
                    border: `1px solid ${getBadgeStyle(selectedImage.app).bg}55`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: getBadgeStyle(selectedImage.app).dot }}
                    aria-hidden="true"
                  />
                  {getAppLabel(selectedImage.app)}
                </span>
                <h2 className="text-white font-semibold text-base mt-1.5">
                  {selectedImage.projectName}
                </h2>
                {selectedImage.projectDescription && (
                  <p className="text-white/60 text-sm mt-0.5 max-w-xl line-clamp-2">
                    {selectedImage.projectDescription}
                  </p>
                )}
              </div>

              {/* Contador + cerrar */}
              <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                <span className="text-white/40 text-sm tabular-nums">
                  {currentIndex + 1} / {images.length}
                </span>
                <button
                  onClick={() => setSelectedImage(null)}
                  aria-label="Cerrar vista previa"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Imagen principal */}
            <div className="relative flex items-center justify-center rounded-xl overflow-hidden bg-black/50 min-h-[300px]">
              <img
                src={selectedImage.image}
                alt={selectedImage.projectName}
                className="max-w-full max-h-[72vh] object-contain"
              />

              {/* Navegación prev/next */}
              {currentIndex > 0 && (
                <button
                  onClick={goToPrev}
                  aria-label="Imagen anterior"
                  className="absolute left-3 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
              )}
              {currentIndex < images.length - 1 && (
                <button
                  onClick={goToNext}
                  aria-label="Imagen siguiente"
                  className="absolute right-3 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              )}
            </div>

            {/* Miniaturas de navegación */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/20">
                {images.map((item, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(item);
                    }}
                    aria-label={`Ver imagen ${i + 1} de ${item.projectName}`}
                    aria-current={i === currentIndex ? "true" : undefined}
                    className={[
                      "flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      i === currentIndex
                        ? "ring-2 ring-white opacity-100 scale-105"
                        : "opacity-40 hover:opacity-75",
                    ].join(" ")}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}


interface FilterChipProps {
  label: string;
  count: number;
  active: boolean;
  app?: string;
  onClick: () => void;
}

function FilterChip({ label, count, active, app, onClick }: FilterChipProps) {
  const badgeStyle = app ? getBadgeStyle(app) : null;

  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={[
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
        "border transition-all duration-200 select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-1",
        active
          ? "bg-gray-900 text-white border-gray-900 shadow-sm"
          : "bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:bg-gray-50",
      ].join(" ")}
    >

      {badgeStyle && !active && (
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: badgeStyle.dot }}
          aria-hidden="true"
        />
      )}
      {label}
      <span
        className={[
          "text-xs px-1.5 py-0.5 rounded-full font-semibold tabular-nums",
          active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500",
        ].join(" ")}
      >
        {count}
      </span>
    </button>
  );
}