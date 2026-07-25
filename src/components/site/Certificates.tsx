import { useState } from "react";
import { X } from "lucide-react";
import { withBasePath } from "@/lib/base-path";
import { SectionHeading } from "./SectionLabel";

const CERTS = Array.from({ length: 30 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { n, src: withBasePath(`media/certificates/certificate-${n}.webp`) };
});

const row1 = CERTS.slice(0, 15);
const row2 = CERTS.slice(15, 30);

function CertCard({ c, onOpen }: { c: (typeof CERTS)[number]; onOpen: (c: (typeof CERTS)[number]) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(c)}
      className="shrink-0 w-[180px] sm:w-[220px] rounded-xl overflow-hidden border border-border/70 bg-card hover:shadow-md transition-shadow"
    >
      <img src={c.src} alt={`Сертифікат Ami Dental ${c.n}`} className="aspect-[3/4] w-full object-cover" />
    </button>
  );
}

export function Certificates() {
  const [open, setOpen] = useState<(typeof CERTS)[number] | null>(null);

  return (
    <section id="certificates" className="py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Кваліфікація"
          title={<>Сертифікати <br /><em style={{ color: "var(--brand-pink-strong)" }}>та професійний розвиток</em></>}
          subtitle="Фото сертифікатів і документів, наданих клінікою. Натисніть на будь-який документ, щоб роздивитися."
        />
      </div>

      <div className="mt-12 space-y-4 marquee-pause">
        <div className="overflow-hidden">
          <div className="marquee-track gap-4" style={{ animationDuration: "80s" }}>
            {[...row1, ...row1].map((c, idx) => (
              <CertCard key={`c1-${idx}`} c={c} onOpen={setOpen} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track-reverse gap-4" style={{ animationDuration: "80s" }}>
            {[...row2, ...row2].map((c, idx) => (
              <CertCard key={`c2-${idx}`} c={c} onOpen={setOpen} />
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(null)}
              aria-label="Закрити"
              className="absolute -top-4 -right-4 h-10 w-10 rounded-full bg-background inline-flex items-center justify-center shadow"
            >
              <X className="h-4 w-4" />
            </button>
            <img src={open.src} alt={`Сертифікат ${open.n}`} className="w-full rounded-2xl" />
          </div>
        </div>
      )}
    </section>
  );
}
