"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { TbX, TbCheck } from "react-icons/tb";
import { workProjects } from "@/lib/site-config";

type Project = (typeof workProjects)[number];

function ProjectImage({ src, title }: { src: string; title: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="bg-parchment-dim flex h-64 w-full items-center justify-center md:h-80">
        <span className="font-body text-stone-light text-xs font-medium tracking-widest uppercase">
          Image pending
        </span>
      </div>
    );
  }

  return (
    <div className="bg-parchment-dim relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl md:h-80">
      <Image
        src={src}
        alt={`${title} — project preview`}
        fill
        className="object-contain p-6"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    if (!project) return;
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" as const }}
          className="bg-ink/80 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm md:p-6"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" as const }}
            onClick={(event) => event.stopPropagation()}
            className="bg-parchment relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-2"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="bg-parchment/90 text-stone hover:bg-parchment-dim hover:text-ink focus-visible:outline-crimson-bright absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <TbX className="h-5 w-5" />
            </button>

            <ProjectImage src={project.image} title={project.title} />

            <div className="p-6 md:p-8">
              <span className="font-body text-crimson-bright text-xs font-semibold tracking-widest uppercase">
                {project.category}
              </span>
              <h2
                id="project-modal-title"
                className="font-display text-ink mt-2 text-2xl font-semibold md:text-3xl"
              >
                {project.title}
              </h2>

              <div className="mt-6 grid gap-8 md:grid-cols-2">
                {/* Left: narrative */}
                <div className="flex flex-col gap-5">
                  {project.brief && (
                    <div>
                      <h3 className="font-body text-stone-light text-xs font-semibold tracking-widest uppercase">
                        Project Brief
                      </h3>
                      <p className="font-body text-stone mt-2 text-sm">
                        {project.brief}
                      </p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-body text-stone-light text-xs font-semibold tracking-widest uppercase">
                      About This Project
                    </h3>
                    <p className="font-body text-stone mt-2 text-sm">
                      {project.about}
                    </p>
                  </div>
                </div>

                {/* Right: facts */}
                <div className="flex flex-col gap-5">
                  {project.date && (
                    <div>
                      <h3 className="font-body text-stone-light text-xs font-semibold tracking-widest uppercase">
                        Date
                      </h3>
                      <p className="font-body text-stone mt-2 text-sm">
                        {project.date}
                      </p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-body text-stone-light text-xs font-semibold tracking-widest uppercase">
                      Activity Outline
                    </h3>
                    <ul className="mt-3 flex flex-col gap-2">
                      {project.activities.map((activity) => (
                        <li
                          key={activity}
                          className="font-body text-ink flex items-start gap-2 text-sm"
                        >
                          <TbCheck
                            className="text-crimson-bright mt-0.5 h-4 w-4 shrink-0"
                            aria-hidden="true"
                          />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
