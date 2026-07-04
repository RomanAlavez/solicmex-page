import type { Service } from "@/types/types";

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
  Check
} from "lucide-react";
import {
  SharedDialogContent,
  SharedDialogItem,
  SharedDialogOnly,
  SharedDialogRoot,
  SharedDialogTrigger,
  SharedDialogCloseButton,
} from "@ursa/ursa-design";

interface ServiceCardProps {
  service: Service;
  slugifyService: string;
}
export default function ServiceCard({ service, slugifyService }: ServiceCardProps) {
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

  const Icon = ICONS[service.ICON] ?? Flame;
  return (
    <article className="relative p-8 max-w-2xl mx-auto bg-white rounded-xl shadow-lg ">
      <SharedDialogCloseButton className="z-1000 absolute top-4 right-4   text-gray-500 hover:text-gray-700 cursor-pointer" >
        X
      </SharedDialogCloseButton>
      <div className="flex items-center gap-4">
        <SharedDialogItem dialogId={`service-${slugifyService}`} id={`icon-service-${slugifyService}`}>
          <Icon className="size-12 text-primary" />
        </SharedDialogItem>
        <SharedDialogItem dialogId={`service-${slugifyService}`} id={`title-service-${slugifyService}`}>
          <h2 className="text-2xl font-bold uppercase">{service.NAME}</h2>
        </SharedDialogItem>
      </div>

      <SharedDialogItem dialogId={`service-${slugifyService}`} id={`description-service-${slugifyService}`}>
        <p className="mt-4 text-gray-700">{service.SHORT_DESCRIPTION}</p>
      </SharedDialogItem>

      <p className="mt-4 text-gray-700">{service.DESCRIPTION}</p>

      <SharedDialogOnly >
        <ul className="mt-6 space-y-2">
          {service.HIGHLIGHTS.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-700">
              <Check className="size-5 text-primary shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {service.STATS.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </SharedDialogOnly>

    </article >
  )
}
