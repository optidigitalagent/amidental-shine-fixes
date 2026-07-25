import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, X, ZoomIn } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Appointment } from "@/components/site/Appointment";
import { SectionLabel } from "@/components/site/SectionLabel";
import { withBasePath } from "@/lib/base-path";

const CATEGORIES = [
  {
    n: 1,
    title: "Огляд, діагностика, профілактика та пародонтологія",
    range: "Позиції 1–30",
    img: withBasePath("media/price/price-01.webp"),
  },
  {
    n: 2,
    title: "Рентгенологія, знеболення та прямі реставрації",
    range: "Позиції 31–65",
    img: withBasePath("media/price/price-02.webp"),
  },
  {
    n: 3,
    title: "Лікування кореневих каналів і гнатологія",
    range: "Позиції 66–92",
    img: withBasePath("media/price/price-03.webp"),
  },
  {
    n: 4,
    title: "Хірургічне лікування",
    range: "Позиції 93–126",
    img: withBasePath("media/price/price-04.webp"),
  },
  {
    n: 5,
    title: "Дентальна імплантологія",
    range: "Позиції 127–154",
    img: withBasePath("media/price/price-05.webp"),
  },
  {
    n: 6,
    title: "Протезування зубів",
    range: "Позиції 155–199",
    img: withBasePath("media/price/price-06.webp"),
  },
  {
    n: 7,
    title: "Дитяча стоматологія та ортодонтичне лікування",
    range: "Позиції 200–221",
    img: withBasePath("media/price/price-07.webp"),
  },
  {
    n: 8,
    title: "Ортодонтія, відбілювання та додаткові послуги",
    range: "Позиції 222–261",
    img: withBasePath("media/price/price-08.webp"),
  },
];

export const Route = createFileRoute("/price")({
  head: () => ({
    meta: [
      { title: "Прайс-лист Ami Dental — ціни на стоматологічні послуги в Києві" },
      {
        name: "description",
        content:
          "Актуальний прайс-лист медичного центру Ami Dental: терапія, хірургія, імплантація, ортодонтія, протезування. Категорії послуг та вартість.",
      },
      { property: "og:title", content: "Прайс Ami Dental — ціни на послуги" },
      {
        property: "og:description",
        content: "Прайс-лист Ami Dental станом на 01 травня 2025 — усі категорії послуг в одному місці.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricePage,
});

function PricePage() {
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set([1]));
  const [zoom, setZoom] = useState<string | null>(null);

  const toggle = (n: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isPricePage />

      {/* Intro — Status-style: centered label, big title, brief intro */}
      <section className="relative pt-28 md:pt-32 pb-10 md:pb-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <div className="flex justify-center">
            <SectionLabel>Прайс-лист</SectionLabel>
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl leading-[1.05] font-display">
            Повний перелік <em style={{ color: "var(--brand-pink-strong)" }}>послуг і цін</em>
          </h1>
          <p className="mt-5 text-base text-muted-foreground">
            Остаточну вартість лікування лікар озвучує після діагностики — ціни в прайсі є
            орієнтовними та можуть уточнюватись індивідуально. Прайс станом на 01 травня 2025 року.
          </p>
        </div>
      </section>

      <main className="flex-1 pb-16 md:pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-6">
            Категорії послуг
          </div>

          <div className="divide-y divide-border/70 border-y border-border/70">
            {CATEGORIES.map((c) => {
              const isOpen = openSet.has(c.n);
              const num = String(c.n).padStart(2, "0");
              return (
                <article id={`cat-${c.n}`} key={c.n} className="scroll-mt-28">
                  <button
                    type="button"
                    onClick={() => toggle(c.n)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start gap-5 sm:gap-8 py-6 sm:py-8 text-left group"
                  >
                    <span
                      className="shrink-0 font-display text-3xl sm:text-4xl leading-none tabular-nums"
                      style={{ color: "var(--brand-green-deep)" }}
                    >
                      {num}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl sm:text-2xl font-display leading-tight group-hover:text-foreground/80 transition-colors">
                        {c.title}
                      </h2>
                      <div className="mt-1.5 text-xs uppercase tracking-wider text-muted-foreground">
                        {c.range}
                      </div>
                    </div>
                    <span
                      className={`shrink-0 mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-all ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      style={
                        isOpen
                          ? {
                              background: "color-mix(in oklab, var(--brand-green) 18%, transparent)",
                              borderColor: "transparent",
                              color: "var(--brand-green-deep)",
                            }
                          : undefined
                      }
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-8 sm:pb-10 -mt-2">
                      <div className="relative rounded-2xl overflow-hidden border border-border/70 bg-white">
                        <img src={c.img} alt={c.title} className="w-full block" />
                        <button
                          onClick={() => setZoom(c.img)}
                          className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-background transition-colors"
                        >
                          <ZoomIn className="h-3.5 w-3.5" /> Збільшити
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <p className="mt-10 text-sm text-muted-foreground text-center">
            Не знайшли потрібну послугу? Залиште заявку — адміністратор передзвонить та підкаже вартість.
          </p>
        </div>
      </main>

      <Appointment />

      {zoom && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setZoom(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] overflow-auto rounded-2xl bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoom(null)}
              aria-label="Закрити"
              className="sticky top-3 right-3 ml-auto mr-3 mt-3 flex h-11 w-11 rounded-full bg-background border border-border shadow-md items-center justify-center hover:bg-muted transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>
            <img src={zoom} alt="Прайс" className="w-full -mt-11" />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
