// Fast Photo Color Lab (fastphotogifts) - Real Instagram Product Catalog

const PRODUCTS_DATA = [
  // --- ENGRAVED GIFTS ---
  {
    id: "fpg-101",
    sku: "FPG-ENG-01",
    title: "Custom Engraved Stainless Steel Ceremonial Plate",
    category: "Wooden & Metal Engraving",
    subcategory: "Metal Engraving",
    price: 999.00,
    rrp: 1499.00,
    rating: 5.0,
    reviewsCount: 84,
    badge: "BESTSELLER",
    badgeType: "bestseller",
    inStock: true,
    image: "images/engraved_wood_plaque_1788178833528.jpg",
    description: "Premium stainless steel plate laser engraved with custom Tamil/English script, photos, and ceremonial greetings. Comes with desktop stand.",
    dimensions: "10x12 inches",
    material: "Mirror Finish Stainless Steel"
  },
  {
    id: "fpg-102",
    sku: "FPG-ENG-02",
    title: "Laser Engraved Wooden Marriage Plaque",
    category: "Wooden & Metal Engraving",
    subcategory: "Wooden Plaques",
    price: 899.00,
    rrp: 1399.00,
    rating: 4.9,
    reviewsCount: 62,
    badge: "POPULAR",
    badgeType: "popular",
    inStock: true,
    image: "images/engraved_wood_plaque_1788178833528.jpg",
    description: "Intricately carved wooden portrait plaque with marriage wishes and couple name engraving on solid beechwood.",
    dimensions: "8x10 inches",
    material: "Solid Beechwood"
  },
  {
    id: "fpg-103",
    sku: "FPG-ENG-03",
    title: "Custom Laser Engraved Metal Name Pen",
    category: "Wooden & Metal Engraving",
    subcategory: "Personalized Pens",
    price: 249.00,
    rrp: 499.00,
    rating: 4.8,
    reviewsCount: 41,
    badge: "NEW",
    badgeType: "new",
    inStock: true,
    image: "images/sublimation_printed_mug_1788178857934.jpg",
    description: "Metallic rollerball pen precision laser engraved with your name or business logo. Packed in velvet gift box.",
    dimensions: "Standard Pen",
    material: "Matte Finish Alloy"
  },

  // --- SUBLIMATION GIFTS ---
  {
    id: "fpg-201",
    sku: "FPG-SUB-01",
    title: "Personalized Sublimation Thermos Bottle (Custom Name)",
    category: "Sublimation Gifts",
    subcategory: "Personalized Bottles",
    price: 599.00,
    rrp: 999.00,
    rating: 5.0,
    reviewsCount: 77,
    badge: "BESTSELLER",
    badgeType: "bestseller",
    inStock: true,
    image: "images/fast_photo_gifts_hero_1788178805563.jpg",
    description: "Double-wall insulated stainless steel vacuum thermos bottle printed with custom photo or name (e.g. B. Havishraj). Keeps hot 12hrs / cold 24hrs.",
    dimensions: "500ml / 750ml Capacity",
    material: "Insulated Stainless Steel"
  },
  {
    id: "fpg-202",
    sku: "FPG-SUB-02",
    title: "Customized Sublimation Photo Mug",
    category: "Sublimation Gifts",
    subcategory: "Printed Mugs",
    price: 299.00,
    rrp: 499.00,
    rating: 4.9,
    reviewsCount: 112,
    badge: "SALE",
    badgeType: "sale",
    inStock: true,
    image: "images/sublimation_printed_mug_1788178857934.jpg",
    description: "Glossy white ceramic mug with high definition permanent sublimation photo printing. Microwave & dishwasher safe.",
    dimensions: "325ml / 11oz",
    material: "Glossy Ceramic"
  },

  // --- WHOLESALE FRAMES & DEITIES ---
  {
    id: "fpg-301",
    sku: "FPG-FRM-01",
    title: "Synthetic Deity & God Photo Frame (Ready Stock)",
    category: "Wholesale Frames",
    subcategory: "Synthetic Frames",
    price: 699.00,
    rrp: 1199.00,
    rating: 5.0,
    reviewsCount: 95,
    badge: "READY STOCK",
    badgeType: "bestseller",
    inStock: true,
    image: "images/fast_photo_gifts_hero_1788178805563.jpg",
    description: "High quality synthetic wood photo frame featuring sacred deity prints with gold foil accents and acrylic glass.",
    dimensions: "10x14 inches",
    material: "Synthetic Wood & Acrylic"
  },
  {
    id: "fpg-302",
    sku: "FPG-FRM-02",
    title: "Bulk / Wholesale Batch Photo Frames (Set of 10)",
    category: "Wholesale Frames",
    subcategory: "Bulk Orders",
    price: 1999.00,
    rrp: 3499.00,
    rating: 4.9,
    reviewsCount: 53,
    badge: "WHOLESALE",
    badgeType: "sale",
    inStock: true,
    image: "images/fast_photo_gifts_hero_1788178805563.jpg",
    description: "Wholesale synthetic standing collage photo frames designed for school batches, college events, and bulk gifting.",
    dimensions: "Set of 10 Frames",
    material: "Synthetic Wood"
  },

  // --- SYNTHETIC ALBUMS ---
  {
    id: "fpg-401",
    sku: "FPG-ALB-01",
    title: "Non-Tearable Synthetic Wedding Photobook Album (20 Sheets)",
    category: "Synthetic Album Printing",
    subcategory: "Flush Mount Albums",
    price: 1499.00,
    rrp: 2499.00,
    rating: 5.0,
    reviewsCount: 120,
    badge: "PREMIUM",
    badgeType: "bestseller",
    inStock: true,
    image: "images/fast_photo_gifts_hero_1788178805563.jpg",
    description: "100% waterproof and non-tearable synthetic sheet lay-flat wedding album with padded leatherette presentation box.",
    dimensions: "12x18 inch Layflat",
    material: "Waterproof Synthetic Sheet"
  }
];

const STORE_LOCATIONS = [
  { id: "kallakurichi_lab", name: "Fast Photo Color Lab Main Studio", address: "Main Market Road, Kallakurichi, Tamil Nadu, India", phone: "+91 98765 43210", hours: "Mon-Sat 9:30am-9:00pm" },
  { id: "chennai_hub", name: "Chennai Hub", address: "T. Nagar, Chennai, Tamil Nadu 600017", phone: "+91 98400 12345", hours: "Mon-Sat 10:00am-8:00pm" }
];
