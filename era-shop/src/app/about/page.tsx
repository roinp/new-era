"use client";

import { Target, Users, Truck, Award, Building2, Leaf } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function AboutPage() {
  const { locale } = useStore();
  const L = (ka: string, en: string, ru: string) =>
    locale === "ka" ? ka : locale === "ru" ? ru : en;

  const stats: [string, string][] = [
    ["10,000+", L("პროდუქტი", "Products", "Товаров")],
    ["5,000+", L("პრო კლიენტი", "Pro customers", "Клиентов")],
    ["21", L("კატეგორია", "Categories", "Категорий")],
    ["15+", L("წელი ბაზარზე", "Years of service", "Лет на рынке")],
  ];

  const values = [
    {
      icon: Award,
      title: L("სერტიფიცირებული ხარისხი", "Certified Quality", "Сертифицированное качество"),
      text: L("ყველა პროდუქტი აკმაყოფილებს ინდუსტრიის სტანდარტებსა და სერტიფიკატებს.", "Every product meets industry standards and certifications.", "Каждый товар соответствует отраслевым стандартам и сертификатам."),
    },
    {
      icon: Truck,
      title: L("საიმედო მიწოდება", "Reliable Delivery", "Надёжная доставка"),
      text: L("მეორე დღეს მიწოდება ობიექტებზე მთელ ქვეყანაში.", "Next-day delivery to job sites across the country.", "Доставка на объекты на следующий день по всей стране."),
    },
    {
      icon: Users,
      title: L("ექსპერტის მხარდაჭერა", "Expert Support", "Поддержка экспертов"),
      text: L("სამშენებლო სპეციალისტების გუნდი, 24/7.", "A dedicated team of construction specialists, 24/7.", "Команда строительных специалистов, 24/7."),
    },
    {
      icon: Target,
      title: L("სამართლიანი ფასი", "Fair Pricing", "Честные цены"),
      text: L("გამჭვირვალე კონტრაქტორის ფასები და მოცულობითი ფასდაკლებები.", "Transparent contractor pricing and volume discounts.", "Прозрачные цены подрядчика и скидки за объём."),
    },
    {
      icon: Building2,
      title: L("შექმნილია პროფესიონალებისთვის", "Built for Pros", "Создано для профи"),
      text: L("ერთი ხელსაწყოდან მთელი პროექტის მასალებამდე.", "From single tools to full project material lists.", "От одного инструмента до материалов всего проекта."),
    },
    {
      icon: Leaf,
      title: L("მდგრადი", "Sustainable", "Экологичность"),
      text: L("მზარდი ასორტიმენტი ეკოლოგიური სამშენებლო მასალებისა.", "Growing range of eco-friendly building materials.", "Растущий ассортимент эко-материалов."),
    },
  ];

  return (
    <div>
      <section className="border-b bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            {L("სამშენებლო მომარაგების მომავალს ვაშენებთ", "Building the future of construction supply", "Строим будущее снабжения стройки")}
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            {L(
              "ERA Build აკავშირებს კონტრაქტორებს, მშენებლებსა და მესაკუთრეებს ათასობით ხარისხიან სამშენებლო მასალასთან, ხელსაწყოსა და აღჭურვილობასთან — ერთ სივრცეში, სამართლიან ფასებში და სწრაფი მიწოდებით.",
              "ERA Build connects contractors, builders and homeowners with thousands of quality construction materials, tools and equipment — all in one place, at fair prices, with fast delivery.",
              "ERA Build объединяет подрядчиков, строителей и владельцев с тысячами качественных стройматериалов, инструментов и оборудования — в одном месте, по честным ценам и с быстрой доставкой."
            )}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map(([n, l]) => (
            <div key={l} className="rounded-2xl border bg-surface p-6 text-center">
              <p className="text-3xl font-extrabold text-primary">{n}</p>
              <p className="mt-1 text-sm text-muted">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="text-2xl font-extrabold tracking-tight">
          {L("ჩვენი ღირებულებები", "Our Values", "Наши ценности")}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border bg-surface p-6">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <v.icon size={24} />
              </span>
              <h3 className="mt-4 font-bold">{v.title}</h3>
              <p className="mt-1 text-sm text-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
