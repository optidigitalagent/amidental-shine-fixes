import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Appointment } from "@/components/site/Appointment";
import { SectionLabel } from "@/components/site/SectionLabel";
import { PRICE_CATEGORIES } from "@/lib/price-data";

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
        content:
          "Повний перелік послуг Ami Dental з цінами. Актуальний прайс станом на 01 травня 2025 року.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricePage,
});

function PricePage() {
  const [active, setActive] = useState<string>(PRICE_CATEGORIES[0].id);
  const category = PRICE_CATEGORIES.find((c) => c.id === active) ?? PRICE_CATEGORIES[0];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isPricePage />

      {/* Intro */}
      <section className="relative pt-28 md:pt-32 pb-8 md:pb-12">
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

      {/* Filter pills */}
      <div className="sticky top-16 z-30 bg-background/85 backdrop-blur border-y border-border/60">
        <div className="mx-auto max-w-5xl px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex gap-2 sm:gap-2.5 overflow-x-auto scrollbar-hide -mx-1 px-1 snap-x">
            {PRICE_CATEGORIES.map((c) => {
              const isActive = c.id === active;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(c.id)}
                  className={`shrink-0 snap-start rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium transition-colors border ${
                    isActive
                      ? "text-white border-transparent"
                      : "bg-background text-foreground/70 border-border hover:bg-muted"
                  }`}
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(135deg, var(--brand-green-strong), var(--brand-green-deep))",
                        }
                      : undefined
                  }
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main className="flex-1 py-10 md:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl sm:rounded-3xl border border-border/70 bg-card shadow-sm p-5 sm:p-8 md:p-10">
            <div
              className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium"
              style={{ color: "var(--brand-green-deep)" }}
            >
              — {category.label}
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-display leading-tight">
              {category.title}
            </h2>

            <div className="mt-6 sm:mt-8 space-y-8 sm:space-y-10">
              {category.groups.map((group, gi) => (
                <div key={gi}>
                  {group.title && (
                    <h3 className="text-lg sm:text-xl font-display mb-3 sm:mb-4 text-foreground/85">
                      {group.title}
                    </h3>
                  )}
                  <ul className="divide-y divide-border/60">
                    {group.items.map((it) => (
                      <li
                        key={it.n}
                        className="flex items-start gap-4 sm:gap-6 py-3.5 sm:py-4"
                      >
                        <span className="min-w-0 flex-1 text-sm sm:text-[15px] leading-snug text-foreground/90">
                          {it.name}
                        </span>
                        <span
                          className="shrink-0 rounded-full px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold tabular-nums whitespace-nowrap"
                          style={{
                            background:
                              "color-mix(in oklab, var(--brand-green) 18%, transparent)",
                            color: "var(--brand-green-deep)",
                          }}
                        >
                          {it.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 sm:mt-10 text-sm text-muted-foreground text-center">
            Не знайшли потрібну послугу? Залиште заявку — адміністратор передзвонить та підкаже вартість.
          </p>
        </div>
      </main>

      <Appointment />
      <Footer />
    </div>
  );
}
