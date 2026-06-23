"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageCircle } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function ContactPage() {
  const { locale } = useStore();
  const [sent, setSent] = useState(false);

  const L = (ka: string, en: string, ru: string) =>
    locale === "ka" ? ka : locale === "ru" ? ru : en;

  const reqTypes = [
    L("ზოგადი კითხვა", "General enquiry", "Общий вопрос"),
    L("მოცულობითი შეკვეთის ფასი", "Bulk order quote", "Расчёт оптового заказа"),
    L("პროდუქტის ხელმისაწვდომობა", "Product availability", "Наличие товара"),
    L("მიწოდების კითხვა", "Delivery question", "Вопрос по доставке"),
    L("მხარდაჭერა", "Support", "Поддержка"),
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">
        {L("კონტაქტი და ფასის მოთხოვნა", "Contact & Quote Requests", "Контакты и запрос цены")}
      </h1>
      <p className="mt-1 text-muted">
        {L(
          "კითხვები, მოცულობითი შეკვეთები ან ინდივიდუალური ფასი — ჩვენი გუნდი საათებში გპასუხობთ.",
          "Questions, bulk orders or custom quotes — our team responds within hours.",
          "Вопросы, оптовые заказы или индивидуальные цены — мы отвечаем в течение часов."
        )}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Form */}
        <div className="rounded-2xl border bg-surface p-6">
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <CheckCircle2 size={48} className="text-green-500" />
              <h2 className="text-xl font-bold">
                {L("შეტყობინება გაიგზავნა!", "Message sent!", "Сообщение отправлено!")}
              </h2>
              <p className="text-muted">
                {L("მალე დაგიკავშირდებით.", "We'll get back to you shortly.", "Скоро свяжемся с вами.")}
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={L("სრული სახელი", "Full name", "Полное имя")} required />
                <Field label={L("კომპანია", "Company", "Компания")} />
                <Field label={L("ელ-ფოსტა", "Email", "Email")} type="email" required />
                <Field label={L("ტელეფონი", "Phone", "Телефон")} type="tel" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold">
                  {L("მოთხოვნის ტიპი", "Request type", "Тип запроса")}
                </label>
                <select className="w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary">
                  {reqTypes.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold">
                  {L("შეტყობინება", "Message", "Сообщение")}
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                  placeholder={L(
                    "მოგვწერეთ თქვენი პროექტის შესახებ ან ჩამოწერეთ საჭირო პროდუქტები…",
                    "Tell us about your project or list the products you need…",
                    "Расскажите о проекте или перечислите нужные товары…"
                  )}
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover"
              >
                {L("შეტყობინების გაგზავნა", "Send message", "Отправить")} <Send size={16} />
              </button>
            </form>
          )}
        </div>

        {/* Info */}
        <aside className="space-y-4">
          <div className="rounded-2xl border bg-surface p-6">
            <h2 className="font-bold">{L("დაგვიკავშირდი", "Get in touch", "Связаться с нами")}</h2>
            <ul className="mt-4 space-y-4 text-sm">
              <InfoItem icon={MapPin} title={L("მისამართი", "Address", "Адрес")}>
                {L("ინდუსტრიული გამზ. 12, თბილისი 0190, საქართველო", "12 Industrial Ave, Tbilisi 0190, Georgia", "Индустриальный пр. 12, Тбилиси 0190, Грузия")}
              </InfoItem>
              <InfoItem icon={Phone} title={L("ტელეფონი", "Phone", "Телефон")}>
                +995 322 00 00 00
              </InfoItem>
              <InfoItem icon={Mail} title={L("ელ-ფოსტა", "Email", "Email")}>
                sales@erabuild.example
              </InfoItem>
              <InfoItem icon={Clock} title={L("სამუშაო საათები", "Working hours", "Часы работы")}>
                {L("ორშ–შაბ: 08:00 – 20:00", "Mon–Sat: 08:00 – 20:00", "Пн–Сб: 08:00 – 20:00")}
              </InfoItem>
            </ul>
            <a
              href="https://wa.me/995322000000"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700"
            >
              <MessageCircle size={18} /> {L("WhatsApp ჩატი", "Chat on WhatsApp", "Чат в WhatsApp")}
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border">
            <iframe
              title="map"
              className="h-64 w-full"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=44.78%2C41.69%2C44.83%2C41.73&layer=mapnik"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  type = "text",
  required,
}: {
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <input
        type={type}
        required={required}
        aria-label={label}
        className="w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}

function InfoItem({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon size={16} />
      </span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-muted">{children}</p>
      </div>
    </li>
  );
}
