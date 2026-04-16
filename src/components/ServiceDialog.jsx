import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlarmClock, Flame, Zap, Cog, Boxes, X, ArrowRight, CheckCircle } from "lucide-react";

const iconMap = {
    AlarmIcon: AlarmClock,
    FireIcon: Flame,
    LightningIcon: Zap,
    EngineeringIcon: Cog,
    BoxesIcon: Boxes,
};

export default function ServiceDialog({
    shortDescription,
    name,
    description,
    icon,
    highlights = [],   
    stats = [],        
    toggleOpen,
}) {
    const Icon = iconMap[icon];

    // Cerrar con Escape
    useEffect(() => {
        const handleKey = (e) => { if (e.key === "Escape") toggleOpen(); };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [toggleOpen]);

    return (
        <AnimatePresence>
            {/* ── Backdrop ── */}
            <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                onClick={toggleOpen}
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
            />

            {/* ── Centering shell ── */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                    key="dialog"
                    initial={{ opacity: 0, scale: 0.94, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 16 }}
                    transition={{ type: "spring", damping: 28, stiffness: 340 }}
                    className="relative w-full max-w-[500px] pointer-events-auto
            rounded-[20px] overflow-hidden
            bg-[rgba(2,18,28,0.07)]
            border border-white/[0.08]
            shadow-[0_32px_80px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(6,182,212,0.06)]"
                >
                    {/* Top-edge glow line */}
                    <div className="absolute inset-x-0 top-0 h-px
            bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

                    {/* Ambient radial glow */}
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2
            w-48 h-28 rounded-full pointer-events-none
            bg-cyan-400/[0.07] blur-[38px]" />

                    {/* Status dot */}
                    <span className="absolute top-[18px] right-14
            w-[6px] h-[6px] rounded-full
            bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.75)]" />

                    {/* Close button */}
                    <button
                        onClick={toggleOpen}
                        className="absolute top-3.5 right-3.5 z-10
              flex items-center justify-center w-8 h-8 rounded-[8px]
              border border-white/[0.08] bg-white/[0.04]
              text-white/35 transition-all duration-200
              hover:bg-white/[0.09] hover:text-white/75"
                    >
                        <X size={13} />
                    </button>

                    {/* ── Header ── */}
                    <div className="px-7 pt-7 pb-0">
                        <motion.div
                            layoutId={`icon-${name}-service-card`}
                            className="mb-5"
                        >
                            <div className="flex items-center justify-center w-[54px] h-[54px]
                rounded-[13px]
                bg-cyan-500/[0.10] border border-cyan-400/[0.28]">
                                {Icon && <Icon className="w-[26px] h-[26px] text-cyan-300/85" />}
                            </div>
                        </motion.div>

                        <motion.h2
                            layoutId={`name-${name}-service-card`}
                            className="text-[1.3rem] font-bold text-white/92
                tracking-[-0.02em] leading-tight mb-1.5"
                        >
                            {name}
                        </motion.h2>

                        <motion.p
                            layoutId={`short-description-${name}-service-card`}
                            className="text-[0.82rem] font-medium text-cyan-300/65 leading-relaxed"
                        >
                            {shortDescription}
                        </motion.p>
                    </div>

                    {/* Divider */}
                    <div className="mx-7 my-5 h-px
            bg-gradient-to-r from-cyan-400/30 via-cyan-400/06 to-transparent" />

                    {/* ── Body ── */}
                    <div className="px-7">
                        <p className="text-[0.875rem] text-white/55 leading-[1.78] mb-5">
                            {description}
                        </p>

                        {/* Feature highlights grid */}
                        {highlights.length > 0 && (
                            <div className="grid grid-cols-2 gap-2 mb-5">
                                {highlights.map((h, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-2 px-3 py-2.5 rounded-[10px]
                      bg-cyan-500/[0.04] border border-cyan-400/[0.09]"
                                    >
                                        <CheckCircle
                                            size={13}
                                            className="text-cyan-400/70 mt-[1px] shrink-0"
                                        />
                                        <span className="text-[0.78rem] text-white/50 leading-snug">
                                            {h}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Stats row */}
                        {stats.length > 0 && (
                            <div className="flex gap-2 mb-1">
                                {stats.map((s, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 text-center px-3 py-3 rounded-[10px]
                      bg-white/[0.02] border border-white/[0.06]"
                                    >
                                        <span className="block text-[1.2rem] font-bold text-cyan-300/85 leading-none">
                                            {s.value}
                                        </span>
                                        <span className="block text-[0.71rem] text-white/35 mt-1.5 leading-tight">
                                            {s.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── Footer ── */}
                    <div className="px-7 pt-5 pb-6 flex gap-2.5">
                        <a href="#contact" onClick={toggleOpen}
                            className="flex-1 flex items-center justify-center gap-1.5
                px-4 py-[11px] rounded-[10px] text-white
                font-semibold text-[0.84rem] tracking-[0.01em]
                bg-gradient-to-br from-cyan-500/85 to-sky-600/85
                border border-cyan-400/45
                transition-opacity duration-200 hover:opacity-80"
                        >
                            Solicitar información
                            <ArrowRight size={13} />
                        </a>
                        <button
                            onClick={toggleOpen}
                            className="px-4 py-[11px] rounded-[10px]
                border border-white/[0.09] bg-transparent
                text-white/40 font-medium text-[0.84rem]
                transition-all duration-200
                hover:bg-white/[0.04] hover:text-white/65"
                        >
                            Cerrar
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}