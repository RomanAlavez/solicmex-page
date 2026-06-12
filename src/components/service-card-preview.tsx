
import {
    Droplets,
    SprayCan,
    MapPinned,
    Gauge,
    Route,
    Database,
    BellRing,
    ShieldAlert,
    Wind,
    Flame,
    ArrowRight,
} from "lucide-react";

import type { Service } from "@/types/types";
import {
    SharedDialogContent,
    SharedDialogItem,
    SharedDialogOnly,
    SharedDialogRoot,
    SharedDialogTrigger,
    SharedDialogCloseButton,
} from "@ursa/ursa-design";
import ServiceCard from "@/components/service-card";
interface Props {
    service: Service;
    isActive?: boolean;

}
export default function ServiceCardPreview({ service,  isActive = false, }: Props) {

    const ICONS: Record<string, any> = {
        SprinklerIcon: Droplets,
        WaterMistIcon: SprayCan,
        HydrantIcon: MapPinned,
        PumpIcon: Gauge,
        PipeIcon: Route,
        TankIcon: Database,
        AlarmIcon: BellRing,
        RiskIcon: ShieldAlert,
        GasIcon: Wind,
    };
    function slugify(text: string): string {
        return text.trim().toLowerCase().replace(/\s+/g, "-");
    }
    const Icon = ICONS[service.ICON] ?? Flame;


    const serviceSlug = slugify(service.NAME);
    return (
        <SharedDialogRoot>
            <SharedDialogTrigger className={`service-panel group ${isActive ? "active" : ""}`} id={`service-${serviceSlug}`}  >
                <article className="h-full group bg-primary  ">
                    <div className="service-overlay" />

                    <div className="service-accent" />

                    <div className="service-inner">
                        <SharedDialogItem dialogId={`service-${serviceSlug}`} id={`icon-service-${serviceSlug}`}>
                            <div className="service-icon">
                                <Icon className="h-7 w-7 text-white" />
                            </div>
                        </SharedDialogItem>


                        <div className="service-collapsed-title uppercase tracking-wide">
                            <span>{service.NAME}</span>
                        </div>

                        <div className="service-content">
                            <SharedDialogItem dialogId={`service-${serviceSlug}`} id={`title-service-${serviceSlug}`}>
                                <h3 className="service-title uppercase tracking-wide">{service.NAME}</h3>
                            </SharedDialogItem>

                            <SharedDialogItem dialogId={`service-${serviceSlug}`} id={`description-service-${serviceSlug}`}>
                                <p className="service-description tracking-wide">{service.SHORT_DESCRIPTION}</p>
                            </SharedDialogItem>
                            <button
                                type="button"
                                data-service={JSON.stringify(service)}
                                className="service-button"
                            >
                                Conocer más
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>
                </article>
            </SharedDialogTrigger>

            <SharedDialogContent
                position="center"
                overlay="none"
                velocity="fast"
                id={`service-${serviceSlug}`}>
                <ServiceCard service={service} slugifyService={serviceSlug} />
            </SharedDialogContent>
        </SharedDialogRoot>

    )
}
