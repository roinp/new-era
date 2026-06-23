"use client";

import Link from "next/link";
import {
  HardHat,
  Phone,
  Mail,
  MapPin,
  Globe,
  Share2,
  Rss,
  Video,
  Truck,
  ShieldCheck,
  CreditCard,
  Headphones,
} from "lucide-react";
import { categories, tr } from "@/lib/categories";
import { useStore } from "@/context/StoreContext";

export function Footer() {
  const { t, locale } = useStore();

  const features = [
    { icon: Truck, t: "footer.f.delivery.t", d: "footer.f.delivery.d" },
    { icon: ShieldCheck, t: "footer.f.secure.t", d: "footer.f.secure.d" },
    { icon: CreditCard, t: "footer.f.pay.t", d: "footer.f.pay.d" },
    { icon: Headphones, t: "footer.f.support.t", d: "footer.f.support.d" },
  ];

  const companyLinks: [string, string][] = [
    ["footer.about", "/about"],
    ["footer.blog", "/blog"],
    ["footer.contact", "/contact"],
    ["footer.quote", "/contact"],
    ["footer.shipping", "/about"],
    ["footer.privacy", "/about"],
    ["footer.terms", "/about"],
  ];

  return (
    <footer className="mt-16 border-t bg-surface">
      {/* Trust strip */}
      <div className="border-b">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.t} className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <f.icon size={22} />
              </span>
              <div>
                <p className="text-sm font-semibold">{t(f.t)}</p>
                <p className="text-xs text-muted">{t(f.d)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white">
              <HardHat size={22} />
            </span>
            <span className="text-xl font-extrabold">
              ERA<span className="text-primary">Build</span>
            </span>
          </Link>
          <p className="mt-4 text-sm text-muted">{t("footer.tagline")}</p>
          <div className="mt-4 flex gap-2">
            {[Globe, Share2, Rss, Video].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-lg border text-muted transition-colors hover:bg-primary hover:text-white"
                aria-label="Social link"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wide">
            {t("footer.topCategories")}
          </h4>
          <ul className="space-y-2 text-sm text-muted">
            {categories.slice(0, 7).map((c) => (
              <li key={c.slug}>
                <Link href={`/categories/${c.slug}`} className="hover:text-primary">
                  {tr(c.name, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wide">
            {t("footer.company")}
          </h4>
          <ul className="space-y-2 text-sm text-muted">
            {companyLinks.map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="hover:text-primary">
                  {t(label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wide">
            {t("footer.getInTouch")}
          </h4>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
              {locale === "ka"
                ? "ინდუსტრიული გამზ. 12, თბილისი, საქართველო"
                : locale === "ru"
                  ? "Индустриальный пр. 12, Тбилиси, Грузия"
                  : "12 Industrial Ave, Tbilisi, Georgia"}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-primary" />
              +995 322 00 00 00
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-primary" />
              sales@erabuild.example
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted md:flex-row">
          <p>{t("footer.rights")}</p>
          <p>Visa · Mastercard · PayPal · Stripe · {locale === "ka" ? "ბანკით გადარიცხვა" : locale === "ru" ? "Банковский перевод" : "Bank Transfer"}</p>
        </div>
      </div>
    </footer>
  );
}
