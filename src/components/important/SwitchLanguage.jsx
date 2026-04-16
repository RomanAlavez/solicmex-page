import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlobeIcon from "@/components/icons/GlobeIcon";
import {Languages} from "lucide-react";
const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // Función para cambiar idioma sin perder la ruta
  const switchLanguage = (lang) => {
    let newPath = currentPath;

    if (lang === "es") {
      // quitar /en al inicio si existe
      if (newPath.startsWith("/en")) {
        newPath = newPath.replace("/en", "") || "/";
      }
    } else if (lang === "en") {
      // agregar /en al inicio si no existe
      if (!newPath.startsWith("/en")) {
        newPath = "/en" + newPath;
      }
    }

    window.location.href = newPath;
  };

  return (
    <div className="relative inline-block" onMouseLeave={closeDropdown}>
      <button
        onClick={toggleDropdown}
        className="p-2 flex items-center text-white rounded transition-colors hover:bg-white/10 cursor-pointer"
        aria-label="Language selector"
        aria-expanded={isOpen}
      >
        <GlobeIcon />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 backdrop-blur-3xl bg-black/50 rounded-lg shadow-lg min-w-[120px] py-2 z-10 group"
          >
            <button
              onClick={() => switchLanguage("es")}
              className="inline-flex items-center gap-2 w-full px-4 py-2  text-left text-white group-hover:text-white/50 hover:text-white cursor-pointer text-xs font-bold transition-all duration-200"
            >
              <Languages />Español
            </button>
            <button
              onClick={() => switchLanguage("en")}
              className="inline-flex items-center gap-2 w-full px-4 py-2  text-left text-white group-hover:text-white/50 hover:text-white cursor-pointer text-xs font-bold transition-all duration-200"
            >
              <Languages /> English
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
