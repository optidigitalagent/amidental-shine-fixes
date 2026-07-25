import { useState } from "react";
import { ChevronDown, X, ZoomIn } from "lucide-react";
import { Header } from "../src/components/site/Header";
import { Footer } from "../src/components/site/Footer";
import { SectionLabel } from "../src/components/site/SectionLabel";
import { withBasePath } from "../src/lib/base-path";
import { StaticAppointment } from "./StaticAppointment";

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

export function StaticPricePage() {
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set([1]));
  const [zoom, setZoom] = useState<string | null>(null);

  const toggle = (n: number) => {
    setOpenSet((previous) => {
      const next = new Set(previous);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isPricePage />

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
            {CATEGORIES.map((category) => {
              const isOpen = openSet.has(category.n);
              const number = String(category.n).padStart(2, "0");

              return (
                <article id={`cat-${category.n}`} key={category.n} className="scroll-mt-28">
                  <button
                    type="button"
                    onClick={() => toggle(category.n)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start gap-5 sm:gap-8 py-6 sm:py-8 text-left group"
                  >
                    <span
                      className="shrink-0 font-display text-3xl sm:text-4xl leading-none tabular-nums"
                      style={{ color: "var(--brand-green-deep)" }}
                    >
                      {number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl sm:text-2xl font-display leading-tight group-hover:text-foreground/80 transition-colors">
                        {category.title}
                      </h2>
                      <div className="mt-1.5 text-xs uppercase tracking-wider text-muted-foreground">
                        {category.range}
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
                        <img src={category.img} alt={category.title} className="w-full block" />
                        <button
                          type="button"
                          onClick={() => setZoom(category.img)}
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
            Не знайшли потрібну послугу? Залиште заявку — адміністратор підкаже вартість.
          </p>
        </div>
      </main>

      <StaticAppointment />

      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setZoom(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] overflow-auto rounded-2xl bg-background"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
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
