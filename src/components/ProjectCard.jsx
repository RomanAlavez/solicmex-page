import { motion } from "framer-motion";
import slugify from "../utils/utils";

export default function ProjectCard({ name, description, images,locale,ubication,app }) {

  const basePath = locale === "en" ? "/en/project" : "/project";
  return (
    <a
      href={`${basePath}/${slugify(name)}`}
      className="group justify-between flex flex-col rounded-lg bg-gradient-to-tr hover:bg-gradient-to-t from-slate-950 to-transparent backdrop-blur-md border-white/30 hover:border-white/100 hover:shadow-lg border-1 p-8 duration-200 transition-all cursor-pointer"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <picture className="w-full border-b border-b-white/30 h-24 p-2 justify-center items-center flex opacity-90 group-hover:opacity-100">
          <img
            className="w-full h-full object-cover rounded-md"
            src={images[0]}
            alt={name}
            style={{ viewTransitionName: `project-image-${name}` }}
          />
        </picture>
        <div className="flex flex-col items-start justify-start text-left mt-4 truncate overflow-hidden w-full">
          <h4
            className="text-2xl font-bold text-white mb-4 text-wrap"
            style={{ viewTransitionName: `project-name-${slugify(name)}` }}
          >
            {name}
          </h4>
          <p
            className="text-white/90 w-full text-sm truncate"
            style={{ viewTransitionName:`project-description-${slugify(name)}` }}
          >
            {description}
          </p>
        </div>
      </motion.div>
    </a>
  );
}
