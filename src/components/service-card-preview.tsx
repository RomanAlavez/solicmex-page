import { ArrowRight } from "lucide-react";
import type { Service } from "@/types/types";
interface Props {
    service: Service;
    icon: any;
}
export default function ServiceCardPreview({ service, icon }: Props) {
    const Icon = icon;
    return (
        <article className="service-panel group bg-primary">
            <div className="service-overlay" />

            <div className="service-accent" />

            <div className="service-inner">
                <div className="service-icon">
                    <Icon className="h-7 w-7 text-white" />
                </div>

                <div className="service-collapsed-title">
                    <span>{service.NAME}</span>
                </div>

                <div className="service-content">
                    <h3 className="service-title">{service.NAME}</h3>

                    <p className="service-description">{service.SHORT_DESCRIPTION}</p>

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
    )
}
