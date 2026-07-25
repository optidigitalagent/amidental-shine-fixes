import { useEffect, useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { withBasePath } from "@/lib/base-path";
import { SectionHeading } from "./SectionLabel";

const SLIDES = [
  withBasePath("media/clinic/team-photo.jpg"),
  withBasePath("media/clinic/team-photo.jpg"),
  withBasePath("media/clinic/team-photo.jpg"),
];

const POINTS = [
  "Індивідуальний план лікування з прозорою вартістю",
  "Стерилізація та безпека за міжнародними протоколами",
  "Лікарі, які пояснюють кожне рішення зрозумілою мовою",
  "Зручний графік і всі ключові напрямки в одній клініці",
];

export function AboutClinic() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="about" className="relative py-20 md:py-28 bg-brand-aurora-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Про клініку"
          title={<>Спокій починається <br /><em style={{ color: "var(--brand-pink-strong)" }}>ще у приймальні</em></>}
          subtitle="Ami Dental — це сучасна стоматологія, де турбота про пацієнта поєднується з досвідом, наукою та інноваціями."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-5 lg:gap-14 items-start">
          <div className="lg:col-span-3 relative rounded-3xl overflow-hidden border border-border/70 bg-card">
            <div className="relative aspect-[4/3] sm:aspect-[16/10]">
              {SLIDES.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="Про клініку Ami Dental"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                    idx === i ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <button
                aria-label="Попереднє фото"
                onClick={() => setI((i - 1 + SLIDES.length) % SLIDES.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 backdrop-blur inline-flex items-center justify-center"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Наступне фото"
                onClick={() => setI((i + 1) % SLIDES.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 backdrop-blur inline-flex items-center justify-center"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {SLIDES.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === i ? "w-6" : "w-1.5 opacity-50"
                    }`}
                    style={{ background: "var(--brand-green-strong)" }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <ul className="space-y-4">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full"
                    style={{ background: "color-mix(in oklab, var(--brand-green) 22%, transparent)", color: "var(--brand-green-deep)" }}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-foreground/85">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#appointment" className="btn-primary-brand rounded-full px-5 py-3 text-sm font-medium">
                Записатися на консультацію
              </a>
              <a href="#team" className="rounded-full px-5 py-3 text-sm font-medium border border-foreground/15">
                Познайомитися з лікарями
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
