"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { ChevronRight, X } from "lucide-react";

gsap.registerPlugin(Flip, CustomEase, useGSAP);

const FLIP_EASE = "M0,0 C0.305,0.206 0.116,0.567 0.3,0.8 0.394,0.921 0.491,1 1,1";

const MODAL_STYLES = `
    dialog.quote-modal {
        border: none;
        padding: 0;
        background: transparent;
        overflow: visible;
    }
    dialog.quote-modal::backdrop { display: none; }

    .quote-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.35);
        backdrop-filter: blur(2px);
        z-index: 49;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.35s ease;
    }
    .quote-backdrop.open {
        opacity: 1;
        pointer-events: auto;
    }

    .pretty-modal-opening {
        animation: pretty-modal-opening 500ms cubic-bezier(.56,.27,0,1);
    }
    @keyframes pretty-modal-opening {
        from { opacity: 0; filter: blur(8px); }
        to   { opacity: 1; filter: blur(0px); }
    }

    .pretty-modal-closing {
        animation:
            pretty-modal-closing-border-radius 500ms cubic-bezier(.56,.27,0,1),
            pretty-modal-closing-blur          500ms cubic-bezier(.37,.35,0,1),
            pretty-modal-closing-fade          700ms cubic-bezier(.56,.27,0,1);
    }

`;

interface QuoteYourProjectProps {
    buttonText: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function QuoteYourProject({ buttonText }: QuoteYourProjectProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef    = useRef<HTMLButtonElement>(null);
    const dialogRef    = useRef<HTMLDialogElement>(null);
    const backdropRef  = useRef<HTMLDivElement>(null);

    // useGSAP scopes animations to containerRef and handles cleanup automatically
    const { contextSafe } = useGSAP(
        () => {
            // Inject styles once, scoped inside the GSAP context
            if (!document.getElementById("pretty-modal-styles")) {
                const el = document.createElement("style");
                el.id = "pretty-modal-styles";
                el.textContent = MODAL_STYLES;
                document.head.appendChild(el);
            }
        },
        { scope: containerRef }
    );

    // ── open ─────────────────────────────────────────────────────────────────
    // contextSafe wraps the handler so GSAP can track & clean up its tweens
    const openModal = contextSafe(() => {
        const dialog   = dialogRef.current;
        const trigger  = buttonRef.current;
        const backdrop = backdropRef.current;
        if (!dialog || !trigger) return;

        const state = Flip.getState(trigger);

        dialog.showModal();
        backdrop?.classList.add("open");

        Flip.from(state, {
            targets: dialog,
            scale: true,
            duration: 0.7,
            ease: CustomEase.create("open-custom", FLIP_EASE),
            toggleClass: "pretty-modal-opening",
        });
    });

    // ── close ────────────────────────────────────────────────────────────────
    const closeModal = contextSafe(() => {
        const dialog   = dialogRef.current;
        const trigger  = buttonRef.current;
        const backdrop = backdropRef.current;
        if (!dialog || !trigger) return;

        const state = Flip.getState(trigger);
        backdrop?.classList.remove("open");

        Flip.to(state, {
            targets: dialog,
            scale: true,
            duration: 0.7,
            ease: CustomEase.create("close-custom", FLIP_EASE),
            toggleClass: "pretty-modal-closing",
            onComplete: () => {
                dialog.removeAttribute("style");
                dialog.close();
            },
        });
    });

    return (
        <div ref={containerRef}>
            {/* ── Trigger button ── */}
            <button
                ref={buttonRef}
                onClick={openModal}
                className="w-fit inline-flex items-center gap-2 relative z-10 py-3 px-10
                           bg-gradient-to-tr from-primary to-primary/30
                           hover:to-primary/50 text-white font-medium rounded-xl
                           cursor-pointer hover:shadow-lg transition-all duration-300"
            >
                {buttonText}
                <ChevronRight />
            </button>

            {/* ── Backdrop ── */}
            <div ref={backdropRef} className="quote-backdrop" onClick={closeModal} />

            {/* ── Dialog ── */}
            <dialog
                ref={dialogRef}
                className="quote-modal fixed inset-0 z-50 m-auto w-full max-w-lg
                           rounded-3xl bg-white p-8 shadow-2xl"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Cotiza tu proyecto</h2>
                    <button
                        onClick={closeModal}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <p className="text-gray-600 mb-6">
                    Cuéntanos sobre tu proyecto y nos pondremos en contacto contigo.
                </p>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="w-full border rounded-xl px-4 py-3 outline-none
                                   focus:ring-2 focus:ring-primary/40"
                    />
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="w-full border rounded-xl px-4 py-3 outline-none
                                   focus:ring-2 focus:ring-primary/40"
                    />
                    <textarea
                        placeholder="Describe tu proyecto"
                        rows={4}
                        className="w-full border rounded-xl px-4 py-3 resize-none outline-none
                                   focus:ring-2 focus:ring-primary/40"
                    />
                    <button
                        type="button"
                        className="w-full py-3 rounded-xl bg-primary text-white font-medium
                                   hover:bg-primary/90 transition-colors"
                    >
                        Enviar solicitud
                    </button>
                </div>
            </dialog>
        </div>
    );
}