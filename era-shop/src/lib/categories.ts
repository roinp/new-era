import { Category, Brand, Localized, Locale } from "./types";

/** Pick the right language out of a Localized value (defaults to Georgian). */
export const tr = (l: Localized | undefined, locale: Locale = "ka"): string =>
  l ? l[locale] || l.en : "";

const L = (en: string, ka: string, ru: string): Localized => ({ en, ka, ru });

export const categories: Category[] = [
  {
    slug: "cement-concrete",
    icon: "Layers",
    name: L("Cement & Concrete", "ცემენტი და ბეტონი", "Цемент и бетон"),
    description: L(
      "Cement, ready-mix concrete, mortar and additives for every pour.",
      "ცემენტი, მზა ბეტონი, ხსნარი და დანამატები ნებისმიერი სამუშაოსთვის.",
      "Цемент, готовый бетон, растворы и добавки для любых работ."
    ),
    subcategories: [
      { slug: "portland-cement", name: L("Portland Cement", "პორტლანდცემენტი", "Портландцемент") },
      { slug: "ready-mix", name: L("Ready-Mix Concrete", "მზა ბეტონი", "Готовый бетон") },
      { slug: "mortar", name: L("Mortar & Grout", "ხსნარი და ფუგა", "Раствор и затирка") },
      { slug: "concrete-additives", name: L("Concrete Additives", "ბეტონის დანამატები", "Добавки для бетона") },
    ],
  },
  {
    slug: "bricks-blocks",
    icon: "Brick",
    name: L("Bricks & Blocks", "აგური და ბლოკები", "Кирпич и блоки"),
    description: L(
      "Clay bricks, concrete blocks, AAC and paving units.",
      "თიხის აგური, ბეტონის ბლოკები, AAC და ბრუსჩატკა.",
      "Глиняный кирпич, бетонные блоки, газоблоки и брусчатка."
    ),
    subcategories: [
      { slug: "clay-bricks", name: L("Clay Bricks", "თიხის აგური", "Глиняный кирпич") },
      { slug: "concrete-blocks", name: L("Concrete Blocks", "ბეტონის ბლოკები", "Бетонные блоки") },
      { slug: "aac-blocks", name: L("AAC Blocks", "AAC ბლოკები", "Газоблоки") },
      { slug: "pavers", name: L("Pavers", "ბრუსჩატკა", "Брусчатка") },
    ],
  },
  {
    slug: "sand-gravel",
    icon: "Mountain",
    name: L("Sand & Gravel", "ქვიშა და ხრეში", "Песок и щебень"),
    description: L(
      "Aggregates, sand, gravel and crushed stone in bulk.",
      "ინერტული მასალები, ქვიშა, ხრეში და ნაყარი ქვა.",
      "Инертные материалы, песок, гравий и щебень навалом."
    ),
    subcategories: [
      { slug: "river-sand", name: L("River Sand", "მდინარის ქვიშა", "Речной песок") },
      { slug: "crushed-stone", name: L("Crushed Stone", "ნაყარი ქვა", "Щебень") },
      { slug: "gravel", name: L("Gravel", "ხრეში", "Гравий") },
    ],
  },
  {
    slug: "steel-reinforcement",
    icon: "Wrench",
    name: L("Steel & Reinforcement", "ლითონი და არმატურა", "Металл и арматура"),
    description: L(
      "Rebar, mesh, beams and structural steel.",
      "არმატურა, ბადეები, კოჭები და კონსტრუქციული ფოლადი.",
      "Арматура, сетки, балки и конструкционная сталь."
    ),
    subcategories: [
      { slug: "rebar", name: L("Rebar", "არმატურა", "Арматура") },
      { slug: "wire-mesh", name: L("Wire Mesh", "შედუღებული ბადე", "Сварная сетка") },
      { slug: "steel-beams", name: L("Steel Beams", "ფოლადის კოჭები", "Стальные балки") },
    ],
  },
  {
    slug: "roofing",
    icon: "Home",
    name: L("Roofing Materials", "სახურავის მასალები", "Кровельные материалы"),
    description: L(
      "Sheets, tiles, membranes and gutters.",
      "ფურცლები, კრამიტი, მემბრანები და წყალსაწრეტები.",
      "Листы, черепица, мембраны и водостоки."
    ),
    subcategories: [
      { slug: "metal-roofing", name: L("Metal Roofing", "ლითონის სახურავი", "Металлочерепица") },
      { slug: "roof-tiles", name: L("Roof Tiles", "სახურავის კრამიტი", "Черепица") },
      { slug: "membranes", name: L("Waterproof Membranes", "ჰიდრომემბრანები", "Гидромембраны") },
    ],
  },
  {
    slug: "insulation",
    icon: "ThermometerSnowflake",
    name: L("Insulation Materials", "საიზოლაციო მასალები", "Теплоизоляция"),
    description: L(
      "Thermal and acoustic insulation systems.",
      "თბო- და ხმის საიზოლაციო სისტემები.",
      "Тепло- и звукоизоляционные системы."
    ),
    subcategories: [
      { slug: "mineral-wool", name: L("Mineral Wool", "მინერალური ბამბა", "Минвата") },
      { slug: "foam-boards", name: L("Foam Boards", "ფენოპლასტი", "Пенопласт") },
      { slug: "spray-foam", name: L("Spray Foam", "შესაშხურებელი ქაფი", "Напыляемая пена") },
    ],
  },
  {
    slug: "plumbing",
    icon: "Droplets",
    name: L("Plumbing Supplies", "სანტექნიკა", "Сантехника"),
    description: L(
      "Pipes, fittings, valves and fixtures.",
      "მილები, ფიტინგები, ონკანები და სანტექნიკა.",
      "Трубы, фитинги, краны и сантехника."
    ),
    subcategories: [
      { slug: "pipes", name: L("Pipes", "მილები", "Трубы") },
      { slug: "fittings", name: L("Fittings", "ფიტინგები", "Фитинги") },
      { slug: "valves", name: L("Valves", "ონკანები", "Краны") },
      { slug: "fixtures", name: L("Fixtures", "სანტექნიკა", "Сантехника") },
    ],
  },
  {
    slug: "electrical",
    icon: "Zap",
    name: L("Electrical Supplies", "ელექტრო მასალები", "Электротовары"),
    description: L(
      "Cables, breakers, switches and lighting.",
      "კაბელები, ამომრთველები, ჩამრთველები და განათება.",
      "Кабели, автоматы, выключатели и освещение."
    ),
    subcategories: [
      { slug: "cables", name: L("Cables & Wires", "კაბელები და სადენები", "Кабели и провода") },
      { slug: "breakers", name: L("Breakers & Panels", "ამომრთველები და ფარები", "Автоматы и щиты") },
      { slug: "switches", name: L("Switches & Sockets", "ჩამრთველები და როზეტები", "Выключатели и розетки") },
      { slug: "lighting", name: L("Lighting", "განათება", "Освещение") },
    ],
  },
  {
    slug: "paints-coatings",
    icon: "Paintbrush",
    name: L("Paints & Coatings", "საღებავები და საფარები", "Краски и покрытия"),
    description: L(
      "Interior, exterior, primers and protective coatings.",
      "შიდა, გარე, გრუნტები და დამცავი საფარები.",
      "Внутренние, фасадные, грунтовки и защитные покрытия."
    ),
    subcategories: [
      { slug: "interior-paint", name: L("Interior Paint", "შიდა საღებავი", "Интерьерная краска") },
      { slug: "exterior-paint", name: L("Exterior Paint", "ფასადის საღებავი", "Фасадная краска") },
      { slug: "primers", name: L("Primers", "გრუნტები", "Грунтовки") },
      { slug: "waterproofing", name: L("Waterproofing", "ჰიდროიზოლაცია", "Гидроизоляция") },
    ],
  },
  {
    slug: "flooring",
    icon: "LayoutGrid",
    name: L("Flooring Materials", "იატაკის მასალები", "Напольные покрытия"),
    description: L(
      "Laminate, vinyl, hardwood and screeds.",
      "ლამინატი, ვინილი, პარკეტი და მოასფალტება.",
      "Ламинат, винил, паркет и стяжки."
    ),
    subcategories: [
      { slug: "laminate", name: L("Laminate", "ლამინატი", "Ламинат") },
      { slug: "vinyl", name: L("Vinyl", "ვინილი", "Винил") },
      { slug: "hardwood", name: L("Hardwood", "პარკეტი", "Паркет") },
    ],
  },
  {
    slug: "tiles-ceramics",
    icon: "Grid3x3",
    name: L("Tiles & Ceramics", "ფილები და კერამიკა", "Плитка и керамика"),
    description: L(
      "Ceramic, porcelain and natural stone tiles.",
      "კერამიკის, ფაიფურისა და ბუნებრივი ქვის ფილები.",
      "Керамическая, керамогранитная и каменная плитка."
    ),
    subcategories: [
      { slug: "ceramic", name: L("Ceramic Tiles", "კერამიკული ფილა", "Керамическая плитка") },
      { slug: "porcelain", name: L("Porcelain Tiles", "ფაიფურის ფილა", "Керамогранит") },
      { slug: "mosaic", name: L("Mosaic", "მოზაიკა", "Мозаика") },
    ],
  },
  {
    slug: "doors-windows",
    icon: "DoorOpen",
    name: L("Doors & Windows", "კარები და ფანჯრები", "Двери и окна"),
    description: L(
      "Interior, exterior doors, uPVC and aluminium windows.",
      "შიდა, გარე კარები, uPVC და ალუმინის ფანჯრები.",
      "Межкомнатные, входные двери, окна ПВХ и алюминий."
    ),
    subcategories: [
      { slug: "interior-doors", name: L("Interior Doors", "შიდა კარები", "Межкомнатные двери") },
      { slug: "exterior-doors", name: L("Exterior Doors", "გარე კარები", "Входные двери") },
      { slug: "windows", name: L("Windows", "ფანჯრები", "Окна") },
    ],
  },
  {
    slug: "drywall-ceiling",
    icon: "PanelTop",
    name: L("Drywall & Ceiling", "თაბაშირმუყაო და ჭერი", "Гипсокартон и потолки"),
    description: L(
      "Gypsum boards, profiles and ceiling systems.",
      "თაბაშირმუყაო, პროფილები და ჭერის სისტემები.",
      "Гипсокартон, профили и потолочные системы."
    ),
    subcategories: [
      { slug: "gypsum-board", name: L("Gypsum Board", "თაბაშირმუყაო", "Гипсокартон") },
      { slug: "profiles", name: L("Metal Profiles", "ლითონის პროფილები", "Металлопрофили") },
      { slug: "ceiling-tiles", name: L("Ceiling Tiles", "ჭერის ფილები", "Потолочная плитка") },
    ],
  },
  {
    slug: "hand-tools",
    icon: "Hammer",
    name: L("Hand Tools", "ხელის ხელსაწყოები", "Ручной инструмент"),
    description: L(
      "Hammers, wrenches, measuring and cutting tools.",
      "ჩაქუჩები, გასაღებები, მზომი და საჭრელი ხელსაწყოები.",
      "Молотки, ключи, измерительный и режущий инструмент."
    ),
    subcategories: [
      { slug: "hammers", name: L("Hammers", "ჩაქუჩები", "Молотки") },
      { slug: "wrenches", name: L("Wrenches", "გასაღებები", "Ключи") },
      { slug: "measuring", name: L("Measuring Tools", "მზომი ხელსაწყოები", "Измерительный инструмент") },
    ],
  },
  {
    slug: "power-tools",
    icon: "Drill",
    name: L("Power Tools", "ელექტრო ხელსაწყოები", "Электроинструмент"),
    description: L(
      "Drills, grinders, saws and accessories.",
      "დრელები, სახეხები, ხერხები და აქსესუარები.",
      "Дрели, шлифмашины, пилы и аксессуары."
    ),
    subcategories: [
      { slug: "drills", name: L("Drills", "დრელები", "Дрели") },
      { slug: "grinders", name: L("Grinders", "სახეხები", "Шлифмашины") },
      { slug: "saws", name: L("Saws", "ხერხები", "Пилы") },
    ],
  },
  {
    slug: "safety-equipment",
    icon: "HardHat",
    name: L("Safety Equipment", "დაცვის საშუალებები", "Средства защиты"),
    description: L(
      "Helmets, gloves, harnesses and protective wear.",
      "ჩაფხუტები, ხელთათმანები, ღვედები და დამცავი ტანსაცმელი.",
      "Каски, перчатки, ремни и защитная одежда."
    ),
    subcategories: [
      { slug: "helmets", name: L("Helmets", "ჩაფხუტები", "Каски") },
      { slug: "gloves", name: L("Gloves", "ხელთათმანები", "Перчатки") },
      { slug: "harnesses", name: L("Harnesses", "უსაფრთხოების ღვედები", "Страховочные ремни") },
    ],
  },
  {
    slug: "garden-outdoor",
    icon: "Trees",
    name: L("Garden & Outdoor", "ბაღი და ეზო", "Сад и участок"),
    description: L(
      "Landscaping, fencing and outdoor materials.",
      "კეთილმოწყობა, ღობეები და გარე მასალები.",
      "Благоустройство, заборы и материалы для участка."
    ),
    subcategories: [
      { slug: "fencing", name: L("Fencing", "ღობეები", "Заборы") },
      { slug: "decking", name: L("Decking", "ტერასული დაფა", "Террасная доска") },
      { slug: "landscaping", name: L("Landscaping", "კეთილმოწყობა", "Благоустройство") },
    ],
  },
  {
    slug: "machinery",
    icon: "Truck",
    name: L("Construction Machinery", "სამშენებლო ტექნიკა", "Строительная техника"),
    description: L(
      "Mixers, generators, compactors and lifts.",
      "შემრევები, გენერატორები, ვიბროფილები და ამწეები.",
      "Миксеры, генераторы, виброплиты и подъёмники."
    ),
    subcategories: [
      { slug: "mixers", name: L("Concrete Mixers", "ბეტონმზიდები", "Бетономешалки") },
      { slug: "generators", name: L("Generators", "გენერატორები", "Генераторы") },
      { slug: "compactors", name: L("Compactors", "ვიბროფილები", "Виброплиты") },
    ],
  },
  {
    slug: "fasteners-hardware",
    icon: "Bolt",
    name: L("Fasteners & Hardware", "სამაგრები და ფურნიტურა", "Крепёж и фурнитура"),
    description: L(
      "Screws, bolts, anchors and hinges.",
      "ხრახნები, ჭანჭიკები, დიუბელები და ანჯამები.",
      "Винты, болты, анкеры и петли."
    ),
    subcategories: [
      { slug: "screws", name: L("Screws", "ხრახნები", "Винты") },
      { slug: "bolts", name: L("Bolts & Nuts", "ჭანჭიკები და ქანჩები", "Болты и гайки") },
      { slug: "anchors", name: L("Anchors", "დიუბელები", "Анкеры") },
    ],
  },
  {
    slug: "adhesives-sealants",
    icon: "Container",
    name: L("Adhesives & Sealants", "წებოები და ჰერმეტიკები", "Клеи и герметики"),
    description: L(
      "Tile adhesive, silicone, foam and glues.",
      "ფილის წებო, სილიკონი, ქაფი და წებოები.",
      "Плиточный клей, силикон, пена и клеи."
    ),
    subcategories: [
      { slug: "tile-adhesive", name: L("Tile Adhesive", "ფილის წებო", "Плиточный клей") },
      { slug: "silicone", name: L("Silicone", "სილიკონი", "Силикон") },
      { slug: "foam", name: L("Expanding Foam", "მონტაჟის ქაფი", "Монтажная пена") },
    ],
  },
  {
    slug: "industrial",
    icon: "Factory",
    name: L("Industrial Equipment", "სამრეწველო აღჭურვილობა", "Промышленное оборудование"),
    description: L(
      "Heavy-duty industrial supplies and equipment.",
      "მძიმე სამრეწველო მასალები და აღჭურვილობა.",
      "Промышленные материалы и оборудование."
    ),
    subcategories: [
      { slug: "welding", name: L("Welding Equipment", "შესადუღებელი აპარატები", "Сварочное оборудование") },
      { slug: "compressors", name: L("Compressors", "კომპრესორები", "Компрессоры") },
      { slug: "pumps", name: L("Pumps", "ტუმბოები", "Насосы") },
    ],
  },
];

export const brands: Brand[] = [
  { slug: "buildmax", name: "BuildMax", logo: "🏗️" },
  { slug: "stronghold", name: "StrongHold", logo: "🧱" },
  { slug: "powerline", name: "PowerLine", logo: "⚡" },
  { slug: "terratools", name: "TerraTools", logo: "🛠️" },
  { slug: "aquaflow", name: "AquaFlow", logo: "💧" },
  { slug: "thermosafe", name: "ThermoSafe", logo: "🛡️" },
  { slug: "ferroline", name: "FerroLine", logo: "🔩" },
  { slug: "colorpro", name: "ColorPro", logo: "🎨" },
];

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);
export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);
