import { useEffect, useMemo, useState } from "react";
import {
    SharedDialogContent,
    SharedDialogItem,
    SharedDialogOnly,
    SharedDialogRoot,
    SharedDialogTrigger,
    SharedDialogCloseButton,
} from "@ursa/ursa-design";
import type { Privacy } from "@/types/types";
import { X } from "lucide-react";



type Block =
    | { kind: "p"; text: string }
    | { kind: "ul"; items: string[] };

interface PolicySection {
    id: string;
    title: string;
    blocks: Block[];
}

const p = (text?: string): Block[] => (text ? [{ kind: "p", text }] : []);
const ul = (items?: string[]): Block[] =>
    items && items.length ? [{ kind: "ul", items }] : [];

function buildSections(s: Privacy["SECTIONS"]): PolicySection[] {
    return [
        {
            id: "responsable",
            title: s.RESPONSIBLE.TITLE,
            blocks: [...p(s.RESPONSIBLE.CONTENT), ...p(s.RESPONSIBLE.contact)],
        },
        {
            id: "informacion",
            title: s.informationCollected.TITLE,
            blocks: [
                ...p(s.informationCollected.INTRO),
                ...ul(s.informationCollected.DIRECT_INFORMATION),
                ...p(s.informationCollected.TECHNICAL_INTRO),
                ...ul(s.informationCollected.TECHNICAL_INFORMATION),
                ...p(s.informationCollected.CLOSING),
            ],
        },
        {
            id: "analytics",
            title: s.GOOGLE_ANALYTICS.TITLE,
            blocks: [
                ...p(s.GOOGLE_ANALYTICS.CONTENT),
                ...p(s.GOOGLE_ANALYTICS.DATA),
                ...p(s.GOOGLE_ANALYTICS.PERSONAL_DATA),
                ...ul(s.GOOGLE_ANALYTICS.PURPOSES),
            ],
        },
        {
            id: "finalidad",
            title: s.PURPOSES.TITLE,
            blocks: [
                ...p(s.PURPOSES.INTRO),
                ...ul(s.PURPOSES.ITEMS),
                ...p(s.PURPOSES.CLOSING),
            ],
        },
        {
            id: "cookies",
            title: s.cookies.TITLE,
            blocks: [
                ...p(s.cookies.CONTENT),
                ...p(s.cookies.ANALYTICS),
                ...p(s.cookies.BROWSER),
                ...p(s.cookies.CONSENT),
            ],
        },
        {
            id: "comparticion",
            title: s.SHARING.TITLE,
            blocks: [
                ...p(s.SHARING.INTRO),
                ...p(s.SHARING.CONTENT),
                ...ul(s.SHARING.ITEMS),
                ...p(s.SHARING.CLOSING),
            ],
        },
        {
            id: "seguridad",
            title: s.SEGURITY.TITLE,
            blocks: [...p(s.SEGURITY.CONTENT), ...p(s.SEGURITY.limitation)],
        },
        {
            id: "conservacion",
            title: s.RETENTION.TITLE,
            blocks: [...p(s.RETENTION.CONTENT), ...p(s.RETENTION.thirdParty)],
        },
        {
            id: "derechos",
            title: s.USER_RIGHTS.TITLE,
            blocks: [...p(s.USER_RIGHTS.CONTENT), ...p(s.USER_RIGHTS.CONTACT)],
        },
        {
            id: "enlaces",
            title: s.EXTERNAL_LINKS.TITLE,
            blocks: [...p(s.EXTERNAL_LINKS.CONTENT), ...p(s.EXTERNAL_LINKS.limitation)],
        },
        {
            id: "modificaciones",
            title: s.MODIFICATIONS.TITLE,
            blocks: [...p(s.MODIFICATIONS.CONTENT), ...p(s.MODIFICATIONS.EFFECTIVE)],
        },
        {
            id: "contacto",
            title: s.CONTACT.TITLE,
            blocks: [...p(s.CONTACT.CONTENT)],
        },
    ];
}

function splitTitle(title: string) {
    const match = title.match(/^(\d+)\.\s*(.+)$/);
    return match
        ? { number: match[1].padStart(2, "0"), label: match[2] }
        : { number: null, label: title };
}


const ID_PREFIX = "privacy-section-";

function PrivacyContent({ privacy }: { privacy: Privacy }) {
    const sections = useMemo(() => buildSections(privacy.SECTIONS), [privacy.SECTIONS]);
    const [active, setActive] = useState(sections[0]?.id);


    useEffect(() => {
        const elements = sections
            .map((s) => document.getElementById(ID_PREFIX + s.id))
            .filter((el): el is HTMLElement => el !== null);

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) {
                    setActive(visible[0].target.id.replace(ID_PREFIX, ""));
                }
            },
            { rootMargin: "-10% 0px -70% 0px" }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [sections]);

    const goTo = (id: string) => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document
            .getElementById(ID_PREFIX + id)
            ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        setActive(id);
    };

    return (
        <div className="px-6 sm:px-12 pt-14 sm:pt-16 pb-16 sm:pb-20 text-[#2F3437]">
            <header className="max-w-3xl">
                <div className=" text-4xl sm:text-5xl leading-[1.05] tracking-[-0.03em] text-[#111111]">
                    <SharedDialogOnly>
                        <SharedDialogItem id="privacy-title" dialogId="privacy-dialog">
                            {privacy.TITLE}
                        </SharedDialogItem>
                    </SharedDialogOnly>
                </div>

                <p className="mt-4 text-sm text-[#787774]">{privacy.LAST_UPDATED}</p>

                <p className="mt-10 text-lg sm:text-xl leading-relaxed text-[#111111]">
                    {privacy.INTRO}
                </p>

                <p className="mt-6 rounded-lg bg-[#F7F6F3] px-5 py-4 text-[15px] leading-relaxed">
                    {privacy.ACCEPTANCE}
                </p>
            </header>

            <div className="mt-16 sm:mt-20 grid gap-12 md:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
                {/* Índice (solo escritorio) */}
                <nav aria-label="Contenido de la política" className="hidden md:block">
                    <ol className="sticky top-8 flex flex-col gap-1">
                        {sections.map((s) => {
                            const { number, label } = splitTitle(s.title);
                            const isActive = s.id === active;
                            return (
                                <li key={s.id}>
                                    <button
                                        type="button"
                                        onClick={() => goTo(s.id)}
                                        aria-current={isActive ? "true" : undefined}
                                        className={`flex w-full items-baseline gap-3 rounded-md px-3 py-1.5 text-left text-sm transition-colors duration-200 cursor-pointer ${
                                            isActive
                                                ? "bg-contrast text-white font-medium"
                                                : "text-[#787774] hover:text-[#111111]"
                                        }`}
                                    >
                                        {number && (
                                            <span className="tabular-nums text-xs text-white">
                                                {number}
                                            </span>
                                        )}
                                        <span>{label}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                </nav>

                {/* Secciones */}
                <div className="flex flex-col gap-14 sm:gap-16 min-w-0">
                    {sections.map((s) => {
                        const { number, label } = splitTitle(s.title);
                        return (
                            <section
                                key={s.id}
                                id={ID_PREFIX + s.id}
                                aria-labelledby={`${ID_PREFIX}${s.id}-title`}
                                className="scroll-mt-8"
                            >
                                <h3
                                    id={`${ID_PREFIX}${s.id}-title`}
                                    className="flex items-baseline gap-4  text-2xl sm:text-3xl leading-tight tracking-[-0.02em] text-[#111111]"
                                >
                                    {number && (
                                        <span className="font-sans text-base tabular-nums tracking-normal text-[#787774]">
                                            {number}
                                        </span>
                                    )}
                                    <span>{label}</span>
                                </h3>

                                <div className="mt-6 max-w-[65ch] space-y-5 text-base leading-[1.65]">
                                    {s.blocks.map((block, i) =>
                                        block.kind === "p" ? (
                                            <p key={i}>{block.text}</p>
                                        ) : (
                                            <ul key={i} className="space-y-2.5">
                                                {block.items.map((item, j) => (
                                                    <li key={j} className="flex gap-3">
                                                        <span
                                                            aria-hidden="true"
                                                            className="mt-[0.7em] size-1.5 shrink-0 rounded-[1px] bg-[#111111]"
                                                        />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )
                                    )}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}



interface PrivacyProps {
    privacy: Privacy;
}

export default function PrivacyDialog({ privacy }: PrivacyProps) {
    return (
        <SharedDialogRoot>
            <SharedDialogTrigger
                id="privacy-dialog"
                className="hover:text-white transition-colors duration-200"
            >
                <SharedDialogItem id="privacy-title" dialogId="privacy-dialog">
                    {privacy.TITLE}
                </SharedDialogItem>
            </SharedDialogTrigger>

            <SharedDialogContent
                position="center"
                overlay="dark"
                id="privacy-dialog"
                closeButton={false}
                className="w-[95vw] min-h-1/2 max-w-5xl max-h-[90vh] sm:max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white text-black shadow-2xl shadow-black/50 p-0"
            >
                
                <div className="sticky top-0 z-10 h-0">
                    <SharedDialogCloseButton>
                        <X className="size-5 absolute top-3 right-3 sm:top-4 sm:right-4 p-1 bg-gray-200 rounded-full cursor-pointer" />
                    </SharedDialogCloseButton>
                </div>

                <PrivacyContent privacy={privacy} />
            </SharedDialogContent>
        </SharedDialogRoot>
    );
}