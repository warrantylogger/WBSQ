export type Brand = {
  initials: string;
  name: string;
  slug: string;
  categories: string[];
  summary: string;
  description: string;
  location: string;
  website?: string;
  websites?: { label: string; url: string }[];
  logoPending?: boolean;
  largeLogo?: boolean;
};

const nivekenDescription =
  "NIVEKEN LOGISTICS moves freight for businesses needing cargo handled reliably from pickup to delivery, with a network covering Singapore, Malaysia, Thailand, the United States, and Shenzhen. The team manages transport, documentation, and scheduling, so a shipment moves without unnecessary delay across any of those routes. Businesses use NIVEKEN LOGISTICS for regular supply runs and one-off large shipments alike. The company serves manufacturers, retailers, and distributors looking for a logistics partner to plan around, wherever the shipment starts or ends.";

export const brands: Brand[] = [
  {
    initials: "AC",
    name: "The Appliances Co.",
    slug: "the-appliances-co",
    categories: ["Home appliances"],
    summary: "Multi-brand retail and distribution of kitchen and living appliances.",
    description:
      "THE APPLIANCES CO. supplies home appliances for kitchens, laundry rooms, and living spaces across Singapore. The brand carries a curated range from trusted manufacturers, chosen for reliability and everyday performance. Every purchase comes with clear warranty support and a team ready to help with installation and after-sales questions. THE APPLIANCES CO. serves homeowners, renovators, and contractors who want equipment built to last.",
    location: "Singapore",
    website: "https://appliances.sg/",
  },
  {
    initials: "HH",
    name: "Hobs and Hoods",
    slug: "hobs-and-hoods",
    categories: ["Home appliances"],
    summary: "Specialist cooking appliances with installation and after-sales support.",
    description:
      "HOBS AND HOODS focuses on one part of the kitchen: cooking hobs and range hoods. The brand stocks gas, induction, and electric hobs alongside hoods built to match, so ventilation and cooking performance work together. Product advice comes from a team who test fit, power, and noise levels before recommending a model. Homeowners and renovation contractors turn to HOBS AND HOODS for a kitchen setup built to cook well and clear smoke fast.",
    location: "Singapore",
    website: "https://hobhood.sg/",
  },
  {
    initials: "FR",
    name: "Fridge",
    slug: "fridge",
    categories: ["Home appliances"],
    summary: "Refrigeration products selected for modern homes and everyday reliability.",
    description:
      "FRIDGE SG sells refrigerators for Singapore homes, from compact single-door units to large multi-door models built for bigger families. The brand compares capacity, energy rating, and noise level for each listing, so buyers pick a fridge suited to their kitchen space and budget. Delivery, installation, and warranty registration come as part of the service.",
    location: "Singapore",
    website: "https://fridge.sg/",
  },
  {
    initials: "WF",
    name: "Wine Fridge",
    slug: "wine-fridge",
    categories: ["Home appliances"],
    summary: "Purpose-built wine storage for homes, hospitality and collectors.",
    description:
      "WINEFRIDGE SG supplies wine coolers and cellars built to hold temperature and humidity steady for collectors and casual drinkers alike. The range spans small countertop units for a handful of bottles to full-size cellars for serious collections, alongside custom-built wine fridges sized and finished to fit a specific space. Each listing states capacity, temperature zones, and noise level, so a buyer matches a unit to the space and the collection. WINEFRIDGE SG serves homeowners, restaurants, and wine bars across Singapore looking for a ready-made unit or a custom build.",
    location: "Singapore",
    website: "https://winefridge.sg/",
  },
  {
    initials: "DB",
    name: "DryBox",
    slug: "drybox",
    categories: ["Home appliances"],
    summary: "Humidity-controlled storage that protects cameras, collections and valuables.",
    description:
      "DRYBOX makes dry cabinets and humidity control systems for cameras, lenses, documents, and other items sensitive to moisture. Operating across Malaysia and Singapore, the brand pairs a dry cabinet line built in-house with service and support for photographers, collectors, and businesses storing valuable equipment. Humidity control settings, capacity, and build quality get tested before a model reaches the showroom floor. DRYBOX runs physical showrooms alongside online sales, backed by a team who understand storage needs beyond the product spec sheet.",
    location: "Singapore, Malaysia",
    websites: [
      { label: "Singapore website", url: "https://drybox.com.sg/" },
      { label: "Malaysia website", url: "https://drybox.com.my/" },
    ],
  },
  {
    initials: "AD",
    name: "AirDry",
    slug: "airdry",
    categories: ["Home appliances"],
    summary: "Practical drying and air-care products designed for tropical living.",
    description:
      "AIRDRY makes dehumidifiers built for closets, wardrobes, and small enclosed spaces where moisture and mustiness build up fast in Southeast Asia’s climate. The units run quietly, need no ongoing maintenance beyond an occasional check, and fit into tight spaces without taking over the room. AIRDRY targets a problem most home appliance brands overlook: keeping clothes, shoes, and stored items dry between wears.",
    location: "Global",
    website: "https://www.airdry.asia/",
  },
  {
    initials: "CC",
    name: "Cadenza Celler",
    slug: "cadenza-celler",
    categories: ["Home appliances"],
    summary: "Specialist cellar and storage solutions for considered residential spaces.",
    description:
      "CADENZA sells wine fridges, dry agers, and humidors built for the home and for commercial use. The range spans ready-made units alongside custom builds, sized and finished to fit a specific room or business need. Each product runs on temperature and humidity settings tuned to the contents, whether wine, aging meat, or cigars. CADENZA serves homeowners, restaurants, and collectors looking for a stock unit or a build made to fit their space exactly.",
    location: "Global",
    website: "https://cadenza-cellars.com/",
  },
  {
    initials: "DP",
    name: "Dewpoint.Co",
    slug: "dewpoint-co",
    categories: ["Home appliances"],
    summary: "Climate-aware appliance solutions shaped for tropical environments.",
    description:
      "DEWPOINT supplies dehumidification equipment for commercial and industrial spaces, including warehouses, server rooms, and storage facilities where humidity control matters at scale. Units get sized to room volume and moisture load, rather than sold as a one-size solution. Cadenza and AirDry sit under the Dewpoint umbrella, extending the same moisture and climate control expertise into wine storage, dry aging, and closet-sized spaces. DEWPOINT serves facility managers and businesses protecting stock, equipment, or infrastructure from humidity damage, backed by a wider group built around one core skill: controlling the air around what matters.",
    location: "Global",
    website: "http://dewpoint.co/",
  },
  {
    initials: "HI",
    name: "Hiniso",
    slug: "hiniso",
    categories: ["Home appliances"],
    summary: "Low-power thermo-electric dry cabinets for cameras and moisture-sensitive equipment.",
    description:
      "Japanese thermo-electric desiccant technology sits behind every Hiniso dry cabinet, controlling humidity without a compressor or the noise one brings. Units run on low power, some under 10 watts, while holding steady conditions for cameras, lenses, and other moisture-sensitive gear. Fully automatic humidity control and a simple, modular build keep the units easy to live with day to day. Hiniso dry cabinets sell alongside the DryBox range across Singapore and Malaysia, giving photographers and collectors a lower-cost entry point into proper humidity control.",
    location: "Singapore, Malaysia",
    website: "http://hiniso.com.sg",
    largeLogo: true,
  },
  {
    initials: "BP",
    name: "Blupura",
    slug: "blupura",
    categories: ["Home appliances"],
    summary: "Design-led filtered water dispensers and coolers for homes and commercial spaces.",
    description:
      "Design sits at the center of Blupura's water dispensers and coolers, built for homes, offices, and hospitality venues wanting a unit worth looking at, not just a filter box in the corner. The range covers countertop and floor-standing models for domestic use, office-grade dispensers, and vending-style machines for public and commercial spaces. Filtration runs through Blupura's own Blutron system, cutting down on bottled water while keeping water cold and clean on tap. Blupura serves businesses and homeowners looking to replace bottled water with a dispenser built to last, backed by design recognition including an iF Design Award.",
    location: "Singapore, Malaysia",
    website: "https://www.blupura.com/en/",
    largeLogo: true,
  },
  {
    initials: "WE",
    name: "Wine Emotion",
    slug: "wine-emotion",
    categories: ["Home appliances"],
    summary: "Wine preservation and dispensing systems for hospitality and retail venues.",
    description:
      "An opened bottle stays fresh for weeks under a Wine Emotion system, instead of turning within a single night behind most bars. The ISOL-PLUS system seals each bottle from the others inside the unit, holding aroma and flavor steady while the machine pours a consistent, pre-set glass size every time. Back-bar models serve staff pouring behind a counter, while self-serve units let a guest pour their own glass on a prepaid card or tap. Wine Emotion serves wine bars, restaurants, hotels, and retail venues looking to offer more wine by the glass without losing a bottle to oxidation.",
    location: "Singapore",
    website: "https://www.wineemotion.com",
    largeLogo: true,
  },
  {
    initials: "SW",
    name: "Smart Watch",
    slug: "smart-watch",
    categories: ["Tech & robotics"],
    summary: "Connected wearable technology for everyday activity and personal wellbeing.",
    description:
      "SMART WATCH sells wearable technology for everyday use, from fitness tracking to notifications and health monitoring. The range covers multiple price points and feature sets, so a buyer picks a device suited to their activity level and budget rather than paying for features they will not use. Product pages break down battery life, water resistance, and compatibility with iOS and Android. SMART WATCH serves shoppers looking for a straightforward wearable, without the noise of an oversized electronics store.",
    location: "Singapore",
    website: "https://www.smartwatch.sg/",
  },
  {
    initials: "KR",
    name: "KeenOn Robotics",
    slug: "keenon-robotics",
    categories: ["Tech & robotics"],
    summary: "Service robotics for F&B, hospitality and healthcare floor operations.",
    description:
      "KEENON ROBOTICS brings service robots to restaurants, hotels, and retail spaces across the region, handling food delivery, guest greeting, and cleaning tasks, freeing up staff for higher-value work. The robots navigate crowded floors and busy service hours without supervision, built for commercial environments rather than demonstration booths. Support covers setup, staff training, and ongoing maintenance after installation. KEENON ROBOTICS serves F&B operators and hospitality businesses looking to automate repetitive floor work.",
    location: "Singapore",
    website: "https://www.keenon.com/en",
  },
  {
    initials: "BL",
    name: "Bambu Lab",
    slug: "bambu-lab",
    categories: ["Tech & robotics"],
    summary: "Accessible multi-color 3D printing for makers, professionals and production teams.",
    description:
      "A Bambu Lab printer turns a design file into a finished part with less fuss than most machines in the category, running multi-color and multi-material prints without heavy manual calibration. The X1 Carbon leads a lineup built for hobbyists and makers as much as professionals, dropping the entry cost most 3D printing setups still carry. A large maker community shares prints and settings around the brand, turning the machines into a shared hobby rather than a solitary tool.",
    location: "Singapore",
    website: "https://bambulab.com/en",
    largeLogo: true,
  },
  {
    initials: "BB",
    name: "Boh Beh Zao Construction",
    slug: "boh-beh-zao-construction",
    categories: ["Construction"],
    summary: "Responsive construction and project delivery for commercial and residential needs.",
    description:
      "BOH BEH ZAO CONSTRUCTION handles renovation and construction projects for homes and commercial spaces, from structural work to final finishing. The name carries a local promise: hand the project over and stop worrying. Projects run on a fixed timeline and budget agreed before work starts, with a site team who communicate progress at each stage. BOH BEH ZAO CONSTRUCTION serves homeowners and business owners who want the stress taken out of a build.",
    location: "Singapore",
    website: "https://www.bohbehzao.sg/",
  },
  {
    initials: "HT",
    name: "Hightech",
    slug: "hightech",
    categories: ["Construction"],
    summary: "Technical building solutions for modern commercial and residential environments.",
    description:
      "HIGHTECH handles construction and renovation projects for homes, offices, and industrial sites, built around precise planning and modern equipment rather than guesswork on site. The team runs each project through detailed measurement and planning tools before work starts, cutting down on rework and delays once the crew moves in. Structural work, fit-outs, and technical installations all fall under one contract, so a client works with one team rather than coordinating several trades. HIGHTECH serves homeowners, businesses, and developers who want a construction partner running on process as much as manpower.",
    location: "Singapore",
    website: "https://hitechencsg.com/",
  },
  {
    initials: "WP",
    name: "Waterproofing",
    slug: "waterproofing",
    categories: ["Construction"],
    summary: "Waterproofing, repair and protection systems for built environments.",
    description:
      "WATERPROOFING treats leaks, seepage, and water damage in roofs, walls, bathrooms, and basements for homes and commercial buildings. The team inspects a site to find the source of a leak before applying a treatment, rather than covering a symptom likely to return months later. Work comes with a warranty period, so a client has recourse if a treated area fails. WATERPROOFING serves property owners dealing with an active leak and those looking to prevent leaks before they start.",
    location: "Malaysia",
    website: "https://www.nomoreleaks.com.my/",
  },
  {
    initials: "NL",
    name: "niveken Logistics",
    slug: "niveken-logistics",
    categories: ["Logistics"],
    summary: "Coordinated storage, delivery and operational support for the group’s brands.",
    description: nivekenDescription,
    location: "Singapore, Malaysia",
  },
  {
    initials: "BAW",
    name: "Better with Age Wine",
    slug: "better-with-age-wine",
    categories: ["Wellness & education"],
    summary: "Wine appreciation and learning experiences designed around discovery, wellbeing and craft.",
    description:
      "BETTER WITH AGE covers wine, spirits, and other goods built to improve the longer they get stored. Content and product picks focus on what to buy now and hold onto, alongside storage advice so a bottle or piece improves rather than degrades over the years. The brand pairs with WINEFRIDGE SG for equipment recommendations, closing the gap between buying something worth aging and giving the purchase the right conditions to age well. BETTER WITH AGE serves collectors and enthusiasts building a collection over years, not a single purchase.",
    location: "Singapore",
    website: "https://betterwithage.sg/",
  },
  {
    initials: "SK",
    name: "Science Kits",
    slug: "science-kits",
    categories: ["Wellness & education"],
    summary: "Hands-on learning kits that make science approachable through experimentation.",
    description:
      "SCIENCE KITS SG sells hands-on science kits, telescopes, and STEM toys for kids and beginners in Singapore. Product listings explain what a kit teaches and the best-suited age group, so a parent picks a gift built to get used rather than left in a box. SCIENCE KITS SG serves parents, educators, and curious kids looking to learn by building something with their hands.",
    location: "Singapore",
    website: "https://sciencekits.sg/",
  },
  {
    initials: "NA",
    name: "Nighte Aromatherapy",
    slug: "nighte-aromatherapy",
    categories: ["Wellness & education"],
    summary: "Aromatherapy products designed to support rest, ritual and everyday wellbeing.",
    description:
      "NIGHTE currently sells reed diffusers built for a calmer bedroom or living space, with more products planned for the range ahead. Each scent gets chosen for how long the fragrance holds through a room, rather than picked for packaging alone. The diffusers mark a starting point for the brand, with future releases set to expand what NIGHTE offers well beyond one product line. NIGHTE serves shoppers looking to ease into a calmer routine now, with more of the range to follow.",
    location: "Global",
    website: "https://www.nightelab.com/",
  },
  {
    initials: "CD",
    name: "Calm Desk Co.",
    slug: "calm-desk-co",
    categories: ["Marketing services"],
    summary: "Focused marketing support, content and campaign operations for growing businesses.",
    description:
      "CALM DESK CO. handles digital marketing for businesses wanting a steady hand on their online presence, from content and social media to website updates and campaign planning. The team builds a marketing plan around what a business needs each month, rather than a fixed package sold the same way to every client. Work covers strategy, execution, and reporting, giving a client visibility on what got done and the numbers each campaign produced. CALM DESK CO. also builds software products, including the Warranty Logger app, pairing marketing work with product development under one roof.",
    location: "Global",
    website: "https://www.calmdeskco.com/",
  },
  {
    initials: "WL",
    name: "Warranty Logger",
    slug: "warranty-logger",
    categories: ["Marketing services"],
    summary: "Warranty registration and customer lifecycle tools that keep brands connected after purchase.",
    description:
      "WARRANTY LOGGER is an app built by Calm Desk Co. to keep track of product warranties in one place, so a receipt or warranty card never gets lost in a drawer again. Users log a purchase once and get notified before a warranty expires, with support for multiple currencies for cross-border shoppers. The app replaces a folder of paper receipts with a system flagging what needs attention and when. WARRANTY LOGGER serves anyone who owns appliances, electronics, or gear worth protecting.",
    location: "Global",
    website: "https://www.warrantylogger.com/",
  },
];

export const getBrandBySlug = (slug: string) => brands.find((brand) => brand.slug === slug);

const sharedLogoBySlug: Record<string, string> = {
  "niveken-logistics": "niveken",
};

export const getBrandLogo = (slug: string) =>
  `/brand-logos/${sharedLogoBySlug[slug] ?? slug}.png`;
