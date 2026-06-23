import { Localized } from "./types";

export interface BlogPost {
  slug: string;
  title: Localized;
  excerpt: Localized;
  category: Localized;
  author: Localized;
  date: string;
  readMin: number;
  emoji: string;
  body: Localized[];
}

const L = (en: string, ka: string, ru: string): Localized => ({ en, ka, ru });

export const blogPosts: BlogPost[] = [
  {
    slug: "choosing-the-right-cement",
    title: L(
      "How to Choose the Right Cement for Your Project",
      "როგორ ავირჩიოთ სწორი ცემენტი თქვენი პროექტისთვის",
      "Как выбрать правильный цемент для проекта"
    ),
    excerpt: L(
      "Portland, rapid-set or blended? A practical guide to picking the correct cement type.",
      "პორტლანდი, სწრაფგამყარებადი თუ შერეული? პრაქტიკული გზამკვლევი ცემენტის სწორი ტიპის ასარჩევად.",
      "Портланд, быстротвердеющий или смешанный? Практический гид по выбору типа цемента."
    ),
    category: L("Product Guides", "პროდუქტის გზამკვლევი", "Гид по товарам"),
    author: L("Engineering Team", "საინჟინრო გუნდი", "Инженерная команда"),
    date: "2026-06-10",
    readMin: 6,
    emoji: "🪨",
    body: [
      L(
        "Cement is the binder at the heart of nearly every construction project, but not all cement is created equal. Choosing the wrong type can lead to cracking, slow curing or weak structures.",
        "ცემენტი თითქმის ყველა სამშენებლო პროექტის გულია, თუმცა ყველა ცემენტი ერთნაირი არ არის. არასწორი ტიპის არჩევამ შეიძლება გამოიწვიოს ბზარები, ნელი გამყარება ან სუსტი კონსტრუქცია.",
        "Цемент — связующее почти любого проекта, но не весь цемент одинаков. Неправильный выбор ведёт к трещинам и слабым конструкциям."
      ),
      L(
        "Ordinary Portland Cement (OPC) is the workhorse for most general construction. For projects that need to be back in service quickly, rapid-set cement reaches structural strength in hours rather than days.",
        "ჩვეულებრივი პორტლანდცემენტი (OPC) უმეტესი სამშენებლო სამუშაოს საფუძველია. სწრაფი ექსპლუატაციისთვის სწრაფგამყარებადი ცემენტი სიმტკიცეს დღეების ნაცვლად საათებში აღწევს.",
        "Обычный портландцемент (OPC) — основа большинства работ. Быстротвердеющий набирает прочность за часы, а не дни."
      ),
      L(
        "Blended cements, which include additives like fly ash or slag, offer improved durability and are more sustainable. For foundations exposed to sulfates, always specify a sulfate-resistant grade.",
        "შერეული ცემენტები, რომლებიც შეიცავს დანამატებს, უფრო გამძლე და ეკოლოგიურია. სულფატებთან კონტაქტში მყოფი საძირკვლისთვის ყოველთვის აირჩიეთ სულფატმედეგი მარკა.",
        "Смешанные цементы с добавками долговечнее и экологичнее. Для фундаментов с воздействием сульфатов выбирайте сульфатостойкую марку."
      ),
      L(
        "When in doubt, request the technical data sheet — every product on ERA Build includes downloadable specifications.",
        "ეჭვის შემთხვევაში მოითხოვეთ ტექნიკური მონაცემები — ERA Build-ის ყველა პროდუქტს თან ახლავს ჩამოსატვირთი სპეციფიკაცია.",
        "В случае сомнений запросите техлист — у каждого товара ERA Build есть спецификация для скачивания."
      ),
    ],
  },
  {
    slug: "essential-power-tools-2026",
    title: L(
      "10 Essential Power Tools Every Contractor Needs in 2026",
      "10 აუცილებელი ელექტრო ხელსაწყო ყველა კონტრაქტორისთვის 2026-ში",
      "10 необходимых электроинструментов для подрядчика в 2026"
    ),
    excerpt: L(
      "From brushless drills to laser levels — our updated checklist of must-have power tools.",
      "უქმუხო დრელებიდან ლაზერულ ნიველირამდე — განახლებული სია აუცილებელი ელექტრო ხელსაწყოებისა.",
      "От бесщёточных дрелей до лазерных уровней — обновлённый чек-лист инструментов."
    ),
    category: L("Construction Tips", "სამშენებლო რჩევები", "Советы по стройке"),
    author: L("Tools Desk", "ხელსაწყოების განყოფილება", "Отдел инструментов"),
    date: "2026-05-28",
    readMin: 8,
    emoji: "🪚",
    body: [
      L(
        "A reliable tool kit is the foundation of efficient work. In 2026, brushless motors and high-capacity batteries have made cordless tools a genuine replacement for corded equivalents.",
        "საიმედო ხელსაწყოების ნაკრები ეფექტური მუშაობის საფუძველია. 2026-ში უქმუხო ძრავებმა და მაღალი ტევადობის ბატარეებმა უსადენო ხელსაწყოები სადენიანის სრულფასოვან ჩამნაცვლებლად აქცია.",
        "Надёжный набор инструментов — основа эффективной работы. В 2026 бесщёточные моторы и ёмкие батареи сделали аккумуляторный инструмент полноценной заменой сетевому."
      ),
      L(
        "Top of the list is the 18V brushless combi drill, followed by an impact driver, angle grinder and circular saw. A good laser level pays for itself in time saved on layout.",
        "სიის სათავეშია 18V უქმუხო კომბი-დრელი, შემდეგ დარტყმითი ხრახნისამხვევი, კუთხსახეხი და წრიული ხერხი. კარგი ლაზერული ნიველირი თავის ფასს დაზოგილი დროით ანაზღაურებს.",
        "Возглавляет список бесщёточная дрель 18V, далее ударный шуруповёрт, УШМ и циркулярная пила. Хороший лазерный уровень окупается экономией времени."
      ),
      L(
        "Invest in one battery platform and stick with it; sharing batteries across tools dramatically reduces downtime and cost.",
        "ჩადეთ ერთ ბატარეის პლატფორმაში და დარჩით მასთან; ბატარეების გაზიარება ხელსაწყოებს შორის მნიშვნელოვნად ამცირებს დანახარჯს.",
        "Выберите одну батарейную платформу — общие аккумуляторы снижают простои и затраты."
      ),
    ],
  },
  {
    slug: "waterproofing-basics",
    title: L(
      "Waterproofing Basics: Protecting Foundations and Wet Areas",
      "ჰიდროიზოლაციის საფუძვლები: საძირკვლისა და სველი წერტილების დაცვა",
      "Основы гидроизоляции: защита фундамента и влажных зон"
    ),
    excerpt: L(
      "Water is the number one enemy of buildings. Learn the membranes, sealants and detailing that keep moisture out.",
      "წყალი შენობების მთავარი მტერია. გაეცანი მემბრანებს, ჰერმეტიკებსა და კვანძებს, რომლებიც ტენს არ უშვებს.",
      "Вода — главный враг зданий. Узнайте о мембранах, герметиках и узлах, не пропускающих влагу."
    ),
    category: L("DIY Tutorials", "DIY გაკვეთილები", "DIY уроки"),
    author: L("Site Solutions", "ობიექტის გადაწყვეტები", "Решения для объекта"),
    date: "2026-05-15",
    readMin: 5,
    emoji: "💧",
    body: [
      L(
        "Effective waterproofing starts with good detailing. Most leaks occur at junctions, penetrations and movement joints rather than across flat surfaces.",
        "ეფექტური ჰიდროიზოლაცია სწორი კვანძებით იწყება. გაჟონვის უმეტესობა ხდება შეერთებებსა და ნაკერებში, და არა ბრტყელ ზედაპირზე.",
        "Эффективная гидроизоляция начинается с правильных узлов. Большинство протечек — на стыках и примыканиях, а не на плоскостях."
      ),
      L(
        "For below-ground structures, bituminous or self-adhesive membranes provide a robust barrier. For bathrooms and balconies, liquid-applied membranes give seamless coverage.",
        "მიწისქვეშა კონსტრუქციებისთვის ბიტუმის ან თვითწებვადი მემბრანები საიმედო ბარიერია. აბაზანებსა და აივნებზე თხევადი მემბრანა უნაკერო საფარს იძლევა.",
        "Для подземных конструкций подходят битумные или самоклеящиеся мембраны. Для ванных и балконов — жидкие мембраны без швов."
      ),
      L(
        "Always prime the substrate, respect drying times, and lap membranes correctly. A small detailing error can undo an otherwise perfect installation.",
        "ყოველთვის დაამუშავეთ ზედაპირი გრუნტით, დაიცავით გაშრობის დრო და სწორად გადააფარეთ მემბრანები. მცირე შეცდომამ კვანძში შეიძლება გააფუჭოს მთელი სამუშაო.",
        "Всегда грунтуйте основание, соблюдайте время высыхания и правильно нахлёстывайте мембраны. Мелкая ошибка сводит на нет всю работу."
      ),
    ],
  },
  {
    slug: "sustainable-building-materials",
    title: L(
      "Sustainable Building Materials: A Buyer's Guide",
      "მდგრადი სამშენებლო მასალები: მყიდველის გზამკვლევი",
      "Экологичные стройматериалы: гид покупателя"
    ),
    excerpt: L(
      "Lower-carbon concrete, recycled steel and natural insulation — how to build greener without compromising performance.",
      "დაბალნახშირბადიანი ბეტონი, გადამუშავებული ფოლადი და ბუნებრივი იზოლაცია — როგორ ავაშენოთ მწვანედ ხარისხის დათმობის გარეშე.",
      "Низкоуглеродный бетон, переработанная сталь и натуральная изоляция — как строить экологичнее без потери качества."
    ),
    category: L("Industry News", "ინდუსტრიის სიახლეები", "Новости отрасли"),
    author: L("Sustainability Desk", "მდგრადობის განყოფილება", "Отдел устойчивости"),
    date: "2026-04-30",
    readMin: 7,
    emoji: "🌱",
    body: [
      L(
        "Sustainability is no longer a niche concern — clients and regulators increasingly demand lower-carbon construction.",
        "მდგრადობა აღარ არის ვიწრო თემა — კლიენტები და მარეგულირებლები სულ უფრო მეტად ითხოვენ დაბალნახშირბადიან მშენებლობას.",
        "Устойчивость — уже не ниша: клиенты и регуляторы всё чаще требуют низкоуглеродного строительства."
      ),
      L(
        "Look for cements with supplementary cementitious materials, steel with high recycled content, and natural insulation such as wood fibre or sheep's wool.",
        "ეძებეთ დანამატებიანი ცემენტები, მაღალი გადამუშავების შემცველობის ფოლადი და ბუნებრივი იზოლაცია — მაგ. ხის ბოჭკო ან ცხვრის მატყლი.",
        "Ищите цементы с добавками, сталь с высокой долей вторсырья и натуральную изоляцию — древесное волокно или овечью шерсть."
      ),
      L(
        "Certifications like EPD let you compare the real embodied carbon of products. ERA Build is steadily expanding its range of certified low-impact materials.",
        "EPD სერტიფიკატები საშუალებას გაძლევთ შეადაროთ პროდუქტების რეალური ნახშირბადული კვალი. ERA Build თანმიმდევრულად აფართოებს სერტიფიცირებული მასალების ასორტიმენტს.",
        "Сертификаты EPD позволяют сравнить реальный углеродный след товаров. ERA Build постоянно расширяет ассортимент сертифицированных материалов."
      ),
    ],
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
