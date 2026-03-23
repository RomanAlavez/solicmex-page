import { motion, AnimatePresence } from 'framer-motion';

export default function Dialog({ children, handleDialog }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-1000 flex items-center justify-center bg-gradient-to-t from-slate-950 to-transparent backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        duration={{ duration: 0.1 }}
      >
        <motion.div
          id="dialog-content"
          className="border border-white/60 rounded-2xl shadow-lg max-w-md min-w-1/2 min-h-1/2 max-h-10/12 overflow-y-auto p-6 relative bg-black/40 backdrop-blur-3xl"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ damping: 10, stiffness: 200 }}
          duration={{ duration: 0.1 }}
        >
          <button
            className="absolute top-2 right-2 text-gray-100 hover:text-black text-xl cursor-pointer"
            aria-label="Cerrar"
            onClick={handleDialog}
          >
            &times;
          </button>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
