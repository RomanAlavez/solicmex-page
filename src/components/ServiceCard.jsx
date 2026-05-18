import { useState } from "react";
import {
  ArrowUpRight,
  AlarmClock, Flame, Zap, Cog, Boxes, Sprout, Droplets, Shell,
  Gauge, Database, ShieldAlert, CloudFog, ChartNetwork, Waypoints,
} from "lucide-react";
import { motion } from "framer-motion";
import ServiceDialog from "./ServiceDialog";
const iconMap = {
  AlarmIcon: AlarmClock,
  FireIcon: Flame,
  LightningIcon: Zap,
  EngineeringIcon: Cog,
  BoxesIcon: Boxes,
  SprinklerIcon: Sprout,        // Representa dispersión / agua
  WaterMistIcon: Droplets,      // Nebulización
  HydrantIcon: Shell ,   // Hidrantes
  PumpIcon: Gauge,              // Presión / bombeo
  PipeIcon: Waypoints,          // Tuberías
  TankIcon: Database,           // Almacenamiento (tanque)
  RiskIcon: ShieldAlert,        // Riesgos especiales
  GasIcon: CloudFog,            // Gases

};

export default function ServiceCard({ shortDescription, name, description, highlights, stats, icon, index = 0, }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = iconMap[icon];
  const toggleOpen = () => setIsOpen((prev) => !prev);
  return (
    <>
      <motion.div
        layout={`service-card-${name}`}
        onClick={toggleOpen}
        className="group relative flex flex-col gap-5 p-8 rounded-2xl overflow-hidden cursor-pointer
      bg-[rgba(2,18,28,0.48)] border border-white/5 backdrop-blur-xl
      shadow-[0_4px_28px_rgba(0,0,0,0.35)]
      opacity-0 translate-y-6 animate-[fadeUp_0.55s_cubic-bezier(0.22,1,0.36,1)_forwards]"
        style={{ animationDelay: `${index * 80}ms` }}
      >
        <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-400
        bg-[radial-gradient(ellipse_at_50%_0%,rgba(6,182,212,0.12)_0%,transparent_70%)]
        group-hover:opacity-100"
        />

        <motion.div className="flex items-center" layoutId={`icon-${name}-service-card`} >
          <div className="flex items-center justify-center w-14 h-14 rounded-xl
          bg-cyan-500/10 border border-cyan-400/20
          transition-all duration-300
          group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50
          group-hover:scale-110 group-hover:-rotate-3"
          >
            {Icon && (
              <Icon className="w-7 h-7 text-cyan-300/60 transition-colors duration-300 group-hover:text-cyan-300" />
            )}
          </div>
        </motion.div>


        <div className="h-px bg-gradient-to-r from-cyan-400/20 via-cyan-400/5 to-transparent
        transition-all duration-300
        group-hover:from-cyan-400/50 group-hover:via-cyan-400/10"
        />

        <motion.div className="flex flex-col gap-2 text-left">
          <motion.h4 layoutId={`name-${name}-service-card`} className="text-[1.05rem] font-bold text-white/90 tracking-tight leading-tight">
            {name}
          </motion.h4>
          <motion.p layoutId={`short-description-${name}-service-card`} className="text-sm text-white/40 leading-relaxed transition-colors duration-300 group-hover:text-white/65">
            {shortDescription}
          </motion.p>
        </motion.div>
        <span className="text-xs text-cyan-400/60">Más sobre este servicio <ArrowUpRight className="inline-block ml-1 w-4 h-4" /></span>
        <span className="absolute top-4 right-4 w-[6px] h-[6px] rounded-full
        bg-cyan-400/20 transition-all duration-300
        group-hover:bg-cyan-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(6,182,212,0.7)]"
        />
      </motion.div>
      {
        isOpen && (
          <ServiceDialog
            name={name}
            description={description}
            shortDescription={shortDescription}
            icon={icon}
            highlights={highlights}
            stats={stats}
            toggleOpen={toggleOpen}
          />
        )
      }
    </>

  );

}