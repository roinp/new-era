import { Product, Review, Localized } from "./types";
import { categories, brands, tr } from "./categories";

// Deterministic pseudo-random so SSR and client render identically.
function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const emojiByCategory: Record<string, string> = {
  "cement-concrete": "🪨",
  "bricks-blocks": "🧱",
  "sand-gravel": "⛰️",
  "steel-reinforcement": "🔧",
  roofing: "🏠",
  insulation: "🧊",
  plumbing: "🚰",
  electrical: "🔌",
  "paints-coatings": "🎨",
  flooring: "🪵",
  "tiles-ceramics": "🔲",
  "doors-windows": "🚪",
  "drywall-ceiling": "🧰",
  "hand-tools": "🔨",
  "power-tools": "🪚",
  "safety-equipment": "⛑️",
  "garden-outdoor": "🌳",
  machinery: "🚜",
  "fasteners-hardware": "🔩",
  "adhesives-sealants": "🧴",
  industrial: "🏭",
};

// English product names per category.
const namesEn: Record<string, string[]> = {
  "cement-concrete": ["Portland Cement 50kg", "Rapid-Set Concrete Mix", "High-Strength Mortar", "Self-Levelling Screed", "Concrete Plasticizer"],
  "bricks-blocks": ["Solid Clay Brick", "Hollow Concrete Block", "AAC Lightweight Block", "Interlocking Paver", "Facing Brick Premium"],
  "sand-gravel": ["Washed River Sand 1t", "Crushed Stone 20mm", "Pea Gravel 10mm", "Building Sand Bulk Bag", "Granite Aggregate"],
  "steel-reinforcement": ["Deformed Rebar 12mm", "Welded Wire Mesh A393", "Structural I-Beam", "Steel Angle Bar", "Reinforcement Stirrups"],
  roofing: ["Corrugated Metal Sheet", "Clay Roof Tile", "EPDM Roofing Membrane", "Aluminium Gutter", "Ridge Cap Tile"],
  insulation: ["Mineral Wool Roll 100mm", "XPS Foam Board 50mm", "PIR Insulation Panel", "Acoustic Insulation Slab", "Spray Foam Kit"],
  plumbing: ["PPR Pipe 25mm", "Brass Elbow Fitting", 'Ball Valve 1"', "Ceramic Sink Mixer", "PVC Drainage Pipe"],
  electrical: ["Copper Cable 2.5mm²", "MCB Circuit Breaker 32A", "Double Wall Socket", "LED Panel Light 36W", "Distribution Board 12-Way"],
  "paints-coatings": ["Interior Matt Paint 10L", "Exterior Weather Paint 10L", "Acrylic Primer 5L", "Bituminous Waterproofing", "Anti-Rust Metal Paint"],
  flooring: ["Oak Laminate AC4", "Luxury Vinyl Plank", "Engineered Hardwood", "Self-Levelling Underlay", "Skirting Board MDF"],
  "tiles-ceramics": ["Ceramic Wall Tile 30x60", "Porcelain Floor Tile 60x60", "Glass Mosaic Sheet", "Anti-Slip Outdoor Tile", "Marble-Effect Porcelain"],
  "doors-windows": ["Solid Core Interior Door", "Steel Security Door", "uPVC Casement Window", "Aluminium Sliding Door", "Double-Glazed Window"],
  "drywall-ceiling": ["Gypsum Board 12.5mm", "CD Ceiling Profile", "Suspended Ceiling Tile", "Moisture-Resistant Board", "Corner Bead Galvanised"],
  "hand-tools": ["Claw Hammer 16oz", 'Adjustable Wrench 10"', "Tape Measure 8m", "Spirit Level 1200mm", "Utility Knife Set"],
  "power-tools": ["Cordless Drill 18V", "Angle Grinder 125mm", "Circular Saw 1500W", "Impact Driver 18V", "Rotary Hammer SDS"],
  "safety-equipment": ["Safety Helmet ABS", "Cut-Resistant Gloves", "Full-Body Harness", "Safety Goggles Clear", "Steel-Toe Boots"],
  "garden-outdoor": ["Galvanised Fence Panel", "Composite Decking Board", "Landscaping Fabric Roll", "Garden Paving Slab", "Treated Timber Post"],
  machinery: ["Concrete Mixer 140L", "Diesel Generator 5kVA", "Plate Compactor", "Mini Excavator Rental", "Scaffold Tower Set"],
  "fasteners-hardware": ["Wood Screws Box 200", "Hex Bolt M10 Set", "Wall Anchor Plugs", "Heavy-Duty Hinge Pair", "Threaded Rod 1m"],
  "adhesives-sealants": ["Tile Adhesive 25kg", "Silicone Sealant Clear", "Expanding Foam 750ml", "Construction Adhesive", "Polyurethane Sealant"],
  industrial: ["MIG Welding Machine", "Air Compressor 50L", "Submersible Water Pump", "Industrial Vacuum", "Hydraulic Jack 10t"],
};

// Georgian product names per category.
const namesKa: Record<string, string[]> = {
  "cement-concrete": ["პორტლანდცემენტი 50კგ", "სწრაფგამყარებადი ბეტონი", "მაღალი სიმტკიცის ხსნარი", "თვითგასწორებადი მოასფალტება", "ბეტონის პლასტიფიკატორი"],
  "bricks-blocks": ["მთლიანი თიხის აგური", "ღრუ ბეტონის ბლოკი", "მსუბუქი AAC ბლოკი", "ჩამკეტი ბრუსჩატკა", "ფასადის პრემიუმ აგური"],
  "sand-gravel": ["გარეცხილი მდინარის ქვიშა 1ტ", "ნაყარი ქვა 20მმ", "წვრილი ხრეში 10მმ", "სამშენებლო ქვიშა (დიდი ტომარა)", "გრანიტის ნაყარი"],
  "steel-reinforcement": ["პერიოდული არმატურა 12მმ", "შედუღებული ბადე A393", "ფოლადის I-კოჭი", "ფოლადის კუთხოვანა", "არმატურის სამაგრები"],
  roofing: ["პროფილირებული ლითონის ფურცელი", "თიხის სახურავის კრამიტი", "EPDM სახურავის მემბრანა", "ალუმინის წყალსაწრეტი", "სათავო კრამიტი"],
  insulation: ["მინერალური ბამბა 100მმ", "XPS ფენოპლასტი 50მმ", "PIR საიზოლაციო პანელი", "აკუსტიკური საიზოლაციო ფილა", "შესაშხურებელი ქაფი (ნაკრები)"],
  plumbing: ["PPR მილი 25მმ", "სპილენძის მუხლი", 'ბურთულა ონკანი 1"', "კერამიკული ნიჟარის შემრევი", "PVC საკანალიზაციო მილი"],
  electrical: ["სპილენძის კაბელი 2.5მმ²", "ავტომატური ამომრთველი 32A", "ორმაგი როზეტი", "LED პანელი 36W", "გამანაწილებელი ფარი 12-ხაზიანი"],
  "paints-coatings": ["შიდა მქრქალი საღებავი 10ლ", "ფასადის საღებავი 10ლ", "აკრილის გრუნტი 5ლ", "ბიტუმის ჰიდროიზოლაცია", "ანტიკოროზიული საღებავი"],
  flooring: ["მუხის ლამინატი AC4", "ვინილის ფიცარი", "საინჟინრო პარკეტი", "თვითგასწორებადი ფენა", "MDF პლინტუსი"],
  "tiles-ceramics": ["კერამიკული კედლის ფილა 30x60", "ფაიფურის იატაკის ფილა 60x60", "მინის მოზაიკა", "არასრიალა გარე ფილა", "მარმარილოს იმიტაცია ფაიფური"],
  "doors-windows": ["მთლიანი შიდა კარი", "ფოლადის უსაფრთხო კარი", "uPVC ფანჯარა", "ალუმინის მოცურავე კარი", "ორმაგი მინაპაკეტიანი ფანჯარა"],
  "drywall-ceiling": ["თაბაშირმუყაო 12.5მმ", "ჭერის CD პროფილი", "შეკიდული ჭერის ფილა", "ტენგამძლე ფურცელი", "გალვანური კუთხის პროფილი"],
  "hand-tools": ["ჩაქუჩი 16oz", 'სასხლეტი გასაღები 10"', "მზომი ლენტი 8მ", "წყალბურთულა 1200მმ", "სამშენებლო დანის ნაკრები"],
  "power-tools": ["უსადენო დრელი 18V", "კუთხსახეხი 125მმ", "წრიული ხერხი 1500W", "დარტყმითი ხრახნისამხვევი 18V", "პერფორატორი SDS"],
  "safety-equipment": ["ABS დამცავი ჩაფხუტი", "ჭრისგამძლე ხელთათმანი", "სრული სხეულის ღვედი", "გამჭვირვალე სათვალე", "ფოლადის ცხვირიანი ფეხსაცმელი"],
  "garden-outdoor": ["გალვანური ღობის პანელი", "კომპოზიტური ტერასული დაფა", "გეოტექსტილის რულონი", "ბაღის ტროტუარის ფილა", "დამუშავებული ხის ბოძი"],
  machinery: ["ბეტონის შემრევი 140ლ", "დიზელის გენერატორი 5kVA", "ვიბროფილა", "მინი ექსკავატორი (ქირა)", "ხარაჩოს ნაკრები"],
  "fasteners-hardware": ["ხის ხრახნები (200ც)", "ექვსკუთხა ჭანჭიკი M10", "კედლის დიუბელები", "მძიმე ანჯამა (წყვილი)", "კუთხოვანი ღერო 1მ"],
  "adhesives-sealants": ["ფილის წებო 25კგ", "სილიკონი (გამჭვირვალე)", "მონტაჟის ქაფი 750მლ", "სამშენებლო წებო", "პოლიურეთანის ჰერმეტიკი"],
  industrial: ["MIG შესადუღებელი აპარატი", "ჰაერის კომპრესორი 50ლ", "ჩასაძირი ტუმბო", "სამრეწველო მტვერსასრუტი", "ჰიდრავლიკური ჯეკი 10ტ"],
};

// Units localized.
const unitL: Record<string, Localized> = {
  bag: { en: "bag", ka: "ტომარა", ru: "мешок" },
  piece: { en: "piece", ka: "ცალი", ru: "шт." },
  ton: { en: "ton", ka: "ტონა", ru: "тонна" },
  bar: { en: "bar", ka: "ღერო", ru: "пруток" },
  sheet: { en: "sheet", ka: "ფურცელი", ru: "лист" },
  roll: { en: "roll", ka: "რულონი", ru: "рулон" },
  unit: { en: "unit", ka: "ერთეული", ru: "ед." },
  can: { en: "can", ka: "ქილა", ru: "банка" },
  "m²": { en: "m²", ka: "მ²", ru: "м²" },
  box: { en: "box", ka: "ყუთი", ru: "коробка" },
  tube: { en: "tube", ka: "ტუბი", ru: "туба" },
};

const unitByCategory: Record<string, string> = {
  "cement-concrete": "bag",
  "bricks-blocks": "piece",
  "sand-gravel": "ton",
  "steel-reinforcement": "bar",
  roofing: "sheet",
  insulation: "roll",
  plumbing: "piece",
  electrical: "unit",
  "paints-coatings": "can",
  flooring: "m²",
  "tiles-ceramics": "m²",
  "doors-windows": "piece",
  "drywall-ceiling": "sheet",
  "hand-tools": "piece",
  "power-tools": "unit",
  "safety-equipment": "piece",
  "garden-outdoor": "piece",
  machinery: "unit",
  "fasteners-hardware": "box",
  "adhesives-sealants": "tube",
  industrial: "unit",
};

const originL: Localized[] = [
  { en: "EU", ka: "ევროკავშირი", ru: "ЕС" },
  { en: "Georgia", ka: "საქართველო", ru: "Грузия" },
  { en: "Turkey", ka: "თურქეთი", ru: "Турция" },
  { en: "China", ka: "ჩინეთი", ru: "Китай" },
];

export function unitLabel(unit: string, locale: "en" | "ka" | "ru" = "ka") {
  return tr(unitL[unit] ?? unitL.piece, locale);
}

const reviewAuthors = ["Giorgi M.", "Anna K.", "David T.", "Elene B.", "Nika R.", "Mariam L.", "Luka S.", "Sophie W.", "John D.", "Irakli G."];
const reviewComments: Localized[] = [
  {
    en: "Excellent quality, exactly as described. Fast delivery to the site.",
    ka: "შესანიშნავი ხარისხი, ზუსტად აღწერის შესაბამისი. სწრაფი მიწოდება ობიექტზე.",
    ru: "Отличное качество, точно как в описании. Быстрая доставка на объект.",
  },
  {
    en: "Good value for the price. Would order again for the next project.",
    ka: "ფასად ღირს. შემდეგ პროექტზეც ვიყიდი.",
    ru: "Хорошее соотношение цена-качество. Закажу ещё.",
  },
  {
    en: "Solid product, performed well on our commercial build.",
    ka: "ხარისხიანი პროდუქტი, კარგად მუშაობდა ჩვენს ობიექტზე.",
    ru: "Надёжный продукт, отлично показал себя на стройке.",
  },
  {
    en: "Packaging was great and nothing was damaged in transit.",
    ka: "შეფუთვა მშვენიერი იყო, ტრანსპორტირებისას არაფერი დაზიანდა.",
    ru: "Отличная упаковка, при доставке ничего не повредилось.",
  },
];

function buildReviews(rng: () => number, rating: number, count: number): Review[] {
  const n = Math.min(count, 4);
  const out: Review[] = [];
  for (let i = 0; i < n; i++) {
    out.push({
      author: reviewAuthors[Math.floor(rng() * reviewAuthors.length)],
      rating: Math.max(3, Math.round(rating + (rng() - 0.5))),
      date: `2026-0${1 + Math.floor(rng() * 5)}-${10 + Math.floor(rng() * 18)}`,
      comment: reviewComments[Math.floor(rng() * reviewComments.length)].ka,
    });
  }
  return out;
}

function build(): Product[] {
  const products: Product[] = [];
  let counter = 1;

  categories.forEach((cat, catIdx) => {
    const enNames = namesEn[cat.slug] ?? [];
    const kaNames = namesKa[cat.slug] ?? [];
    enNames.forEach((nameEn, i) => {
      const nameKa = kaNames[i] ?? nameEn;
      const rng = seeded(catIdx * 100 + i + 7);
      const brand = brands[Math.floor(rng() * brands.length)];
      const sub = cat.subcategories[i % cat.subcategories.length];
      const base = 5 + Math.round(rng() * 480);
      const onSale = rng() > 0.6;
      const price = base + (base % 2 === 0 ? 0.99 : 0.49);
      const salePrice = onSale ? Math.round(price * (0.75 + rng() * 0.1) * 100) / 100 : undefined;
      const rating = Math.round((3.6 + rng() * 1.4) * 10) / 10;
      const reviewCount = 4 + Math.floor(rng() * 180);
      const stock = Math.floor(rng() * 220);
      const id = `P-${String(counter).padStart(4, "0")}`;
      const slug = slugify(nameEn) + "-" + id.toLowerCase();
      const emoji = emojiByCategory[cat.slug] ?? "📦";
      const unit = unitByCategory[cat.slug] ?? "piece";
      const warranty = 1 + Math.floor(rng() * 5);
      const weight = 1 + Math.floor(rng() * 50);
      const origin = originL[Math.floor(rng() * originL.length)];

      const nameL: Localized = {
        en: nameEn,
        ka: nameKa,
        ru: namesEn[cat.slug] ? nameEn : nameEn, // ru falls back to en where not provided
      };

      const shortL: Localized = {
        en: `${nameEn} by ${brand.name} — ${cat.description.en}`,
        ka: `${nameKa} — ${brand.name}. ${cat.description.ka}`,
        ru: `${nameEn} от ${brand.name}. ${cat.description.ru}`,
      };

      const descriptionL: Localized = {
        en: `${nameEn} is a professional-grade product from ${brand.name}, engineered for demanding construction and renovation projects. Part of our ${cat.name.en} range (${sub.name.en}), it delivers consistent performance, durability and compliance with industry standards.`,
        ka: `${nameKa} არის პროფესიონალური დონის პროდუქტი ${brand.name}-ისგან, შექმნილი მომთხოვნი სამშენებლო და სარემონტო პროექტებისთვის. შედის ჩვენი ${cat.name.ka} ასორტიმენტში (${sub.name.ka}) და გამოირჩევა სტაბილური ხარისხით, გამძლეობითა და სტანდარტებთან შესაბამისობით.`,
        ru: `${nameEn} — профессиональный продукт от ${brand.name}, созданный для требовательных строительных и ремонтных проектов. Входит в ассортимент «${cat.name.ru}» (${sub.name.ru}) и отличается стабильным качеством и долговечностью.`,
      };

      const specs: { key: string; value: Localized }[] = [
        { key: "brand", value: { en: brand.name, ka: brand.name, ru: brand.name } },
        { key: "category", value: cat.name },
        { key: "unit", value: unitL[unit] ?? unitL.piece },
        {
          key: "warranty",
          value: {
            en: `${warranty} years`,
            ka: `${warranty} წელი`,
            ru: `${warranty} лет`,
          },
        },
        { key: "origin", value: origin },
        {
          key: "weight",
          value: { en: `${weight} kg`, ka: `${weight} კგ`, ru: `${weight} кг` },
        },
      ];

      products.push({
        id,
        slug,
        name: nameEn,
        nameL,
        shortL,
        descriptionL,
        sku: `${cat.slug.slice(0, 3).toUpperCase()}-${brand.slug.slice(0, 2).toUpperCase()}-${1000 + counter}`,
        categorySlug: cat.slug,
        brandSlug: brand.slug,
        price,
        salePrice,
        unit,
        stock,
        rating,
        reviewCount,
        images: [emoji, emoji, emoji],
        emoji,
        shortDescription: shortL.en,
        description: descriptionL.en,
        specs,
        tags: [cat.name.ka, brand.name, sub.name.ka, onSale ? "ფასდაკლება" : "სტანდარტი"],
        isNew: rng() > 0.7,
        isBestSeller: reviewCount > 120 && rating > 4.3,
        reviews: buildReviews(rng, rating, reviewCount),
      });
      counter++;
    });
  });

  return products;
}

export const products: Product[] = build();

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (categorySlug: string) =>
  products.filter((p) => p.categorySlug === categorySlug);

export const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);
export const newArrivals = products.filter((p) => p.isNew).slice(0, 8);
export const onSaleProducts = products.filter((p) => p.salePrice).slice(0, 8);

export const featuredProducts =
  bestSellers.length >= 8 ? bestSellers : products.slice(0, 8);
