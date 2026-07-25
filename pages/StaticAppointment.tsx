import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { SectionHeading } from "../src/components/site/SectionLabel";

type FormState = "idle" | "success";

export function StaticAppointment() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [state, setState] = useState<FormState>("idle");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      "Добрий день! Хочу записатися на консультацію в Ami Dental.",
      `Імʼя: ${name.trim()}`,
      `Телефон: ${phone.trim()}`,
      comment.trim() ? `Коментар: ${comment.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/380686707519?text=${encodeURIComponent(message)}`;
    const opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (!opened) {
      window.location.href = whatsappUrl;
    }

    setState("success");
  }

  return (
    <section id="appointment" className="relative py-20 md:py-28 bg-brand-aurora overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-center">
          <div>
            <SectionHeading
              label="Запис"
              title={<>Зробіть перший крок <br /><em style={{ color: "var(--brand-pink-strong)" }}>до здорової усмішки</em></>}
              subtitle="Залиште свої дані — повідомлення відкриється у WhatsApp адміністратора клініки."
            />

            <div className="mt-8 space-y-3 text-sm text-foreground/80">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Телефони адміністратора</div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  <a href="tel:+380686707519" className="hover:text-foreground">+38 (068) 670 75 19</a>
                  <a href="tel:+380736707519" className="hover:text-foreground">+38 (073) 670 75 19</a>
                  <a href="tel:+380996707719" className="hover:text-foreground">+38 (099) 670 77 19</a>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">Пн–Пт: 9:00–21:00 · Сб: 9:00–18:00</div>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-border/70 bg-background/85 backdrop-blur p-6 sm:p-8 shadow-xl"
          >
            {state === "success" ? (
              <div className="flex flex-col items-center text-center py-10">
                <div
                  className="h-14 w-14 rounded-full inline-flex items-center justify-center mb-4"
                  style={{ background: "color-mix(in oklab, var(--brand-green) 22%, transparent)", color: "var(--brand-green-deep)" }}
                >
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-display">WhatsApp відкрито</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                  Перевірте повідомлення та натисніть «Надіслати» у WhatsApp.
                </p>
                <button
                  type="button"
                  onClick={() => setState("idle")}
                  className="mt-6 text-sm font-medium"
                  style={{ color: "var(--brand-green-deep)" }}
                >
                  Створити інше повідомлення
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      Імʼя та прізвище
                    </span>
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      maxLength={80}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                      placeholder="Ольга Петренко"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      Номер телефону
                    </span>
                    <input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      required
                      maxLength={30}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                      placeholder="+38 (0__) ___-__-__"
                      inputMode="tel"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      Коментар <span className="normal-case text-muted-foreground/60">(за бажанням)</span>
                    </span>
                    <textarea
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                      maxLength={500}
                      rows={3}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                      placeholder="Опишіть коротко, з чим звертаєтеся"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full btn-primary-brand rounded-full px-5 py-3.5 text-sm font-medium inline-flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" /> Надіслати заявку
                </button>
                <p className="mt-3 text-[11px] text-muted-foreground text-center">
                  Після натискання відкриється WhatsApp із готовим повідомленням адміністратору.
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
