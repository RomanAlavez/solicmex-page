import { ChevronRight, Mails, Building2, User, Phone, Mail, MessageSquare } from "lucide-react";
import {
  SharedDialogContent,
  SharedDialogItem,
  SharedDialogOnly,
  SharedDialogRoot,
  SharedDialogTrigger,
} from "@ursa/ursa-design";
import type { Quote } from "@/types/types";

interface QuoteYourProjectProps {
  buttonText: string;
  quote: Quote;
}

export default function QuoteYourProject({
  buttonText,
  quote,
}: QuoteYourProjectProps) {
  return (
    <SharedDialogRoot>
      <SharedDialogTrigger
        id="quote-project"
        className="w-fit inline-flex items-center gap-2 relative z-10 py-3 px-10 bg-gradient-to-r from-black/30 to-transparent border border-white/10 hover:to-primary/50 hover:px-11 text-white font-medium rounded-xl cursor-pointer hover:shadow-lg transition-all duration-300"
      >
        <SharedDialogItem id="button-text" dialogId="quote-project">
          {buttonText}
        </SharedDialogItem>

        <SharedDialogItem id="button-icon" dialogId="quote-project">
          <ChevronRight />
        </SharedDialogItem>
      </SharedDialogTrigger>

      <SharedDialogContent
        position="center"
        overlay="darkblurred"
        id="quote-project"
        closeButton
        className="w-[95vw] max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white text-black shadow-2xl shadow-black/50 p-0"
      >
        <div className="grid lg:grid-cols-2">
          <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <SharedDialogItem id="button-icon" dialogId="quote-project">
                <Mails className="size-12 lg:size-16" />
              </SharedDialogItem>

              <SharedDialogItem
                id="button-text"
                dialogId="quote-project"
                className="text-2xl lg:text-4xl font-bold uppercase"
              >
                {buttonText}
              </SharedDialogItem>
            </div>

            <SharedDialogOnly>
              <div className="space-y-4">
                <p className="text-white/90 text-base lg:text-lg">
                  {
                    quote.DESCRIPTION
                  }
                </p>

                <ul className="space-y-3 text-white/90">
                  {
                    quote.POINTS.map((point, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-white">✓</span> {point}
                      </li>
                    ))
                  }

                </ul>
              </div>
            </SharedDialogOnly>
          </div>

          <SharedDialogOnly>
            <div className="p-6 lg:p-10">
              <h3 className="text-2xl font-bold mb-2">
                {quote.SUBTITLE}
              </h3>

              <p className="text-gray-500 mb-8">
                {quote.INSTRUCTIONS}
              </p>

              <form id="quote-form" className="space-y-5" action="https://formsubmit.co/operaciones@solicmex.com"
                method="POST">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {quote.FORM.NAME.LABEL}
                  </label>

                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

                    <input
                      type="text"
                      placeholder={quote.FORM.NAME.PLACEHOLDER}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {quote.FORM.COMPANY.LABEL}
                  </label>

                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

                    <input
                      type="text"
                      placeholder={quote.FORM.COMPANY.PLACEHOLDER}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {quote.FORM.EMAIL.LABEL}
                    </label>

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

                      <input
                        type="email"
                        placeholder={quote.FORM.EMAIL.PLACEHOLDER}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {quote.FORM.PHONE.LABEL}
                    </label>

                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

                      <input
                        type="tel"
                        placeholder={quote.FORM.PHONE.PLACEHOLDER}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {quote.FORM.MESSAGE.LABEL}
                  </label>

                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 size-4 text-gray-400" />

                    <textarea
                      rows={5}
                      placeholder={quote.FORM.MESSAGE.PLACEHOLDER}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  form="quote-form"
                  className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:opacity-90 transition"
                >
                  {quote.BUTTON}
                </button>
              </form>
            </div>
          </SharedDialogOnly>
        </div>
      </SharedDialogContent>
    </SharedDialogRoot>
  );
}