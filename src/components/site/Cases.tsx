import { useState } from "react";
import { X } from "lucide-react";
import { withBasePath } from "@/lib/base-path";
import { SectionHeading } from "./SectionLabel";

const CASES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  before: withBasePath("media/cases/placeholder.png"),
  after: withBasePath("media/cases/placeholder.png"),
}));

const row1 = CASES.slice(0, 6);
const row2 = CASES.slice(6, 12);

function CaseCard({
  c,
  onOpen,
}: {
  c: (typeof CASES)[number];
  onOpen: (c: (typeof CASES)[number]) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(c)}
      className="shrink-0 w-[280px] sm:w-[340px] rounded-2xl overflow-hidden border border-border/70 bg-card hover:shadow-lg transition-shadow"
    >
      <div className="grid grid-cols-2 divide-x divide-border">
        <figure className="relative">
          <img src={c.before} alt="До" className="aspect-square w-full object-cover" />
          <figcaption className="absolute left-2 top-2 rounded-full bg-background/85 px-2 py-0.5 text-[10px] uppercase tracking-wider">
            До
          </figcaption>
        </figure>
        <figure className="relative">
          <img src={c.after} alt="Після" className="aspect-square w-full object-cover" />
          <figcaption
            className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider text-white"
            style={{ background: "var(--brand-green-strong)" }}
          >
            Після
          </figcaption>
        </figure>
      </div>
    </button>
  );
}

export function Cases() {
  const [open, setOpen] = useState<(typeof CASES)[number] | null>(null);

  return (
    <section id="cases" className="relative py-20 md:py-28 bg-brand-aurora-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Кейси"
          title={<>Реальні результати <br /><em style={{ color: "var(--brand-pink-strong)" }}>наших пацієнтів</em></>}
          subtitle="Фото до і після — коротко, чесно, без ретуші. Натисніть на кейс, щоб роздивитися."
        />
      </div>

      <div className="mt-12 space-y-5">
        <div className="overflow-hidden">
          <div className="marquee-track gap-4" style={{ animationDuration: "60s" }}>
            {[...row1, ...row1].map((c, idx) => (
              <CaseCard key={`r1-${idx}`} c={c} onOpen={setOpen} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track-reverse gap-4" style={{ animationDuration: "60s" }}>
            {[...row2, ...row2].map((c, idx) => (
              <CaseCard key={`r2-${idx}`} c={c} onOpen={setOpen} />
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-background p-5 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="Закрити"
              className="absolute right-3 top-3 z-10 h-11 w-11 rounded-full bg-background border border-border shadow-md inline-flex items-center justify-center hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="grid gap-4 sm:grid-cols-2 mt-6 sm:mt-2">
              <figure>
                <div className="text-xs uppercase tracking-wider mb-2 text-muted-foreground">До</div>
                <img src={open.before} alt="До" className="w-full aspect-square rounded-2xl object-cover border border-border/60" />
              </figure>
              <figure>
                <div
                  className="text-xs uppercase tracking-wider mb-2"
                  style={{ color: "var(--brand-green-deep)" }}
                >
                  Після
                </div>
                <img src={open.after} alt="Після" className="w-full aspect-square rounded-2xl object-cover border border-border/60" />
              </figure>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
