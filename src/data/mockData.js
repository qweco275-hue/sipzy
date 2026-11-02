export const INITIAL_USER = {
  id: "usr_001",
  name: "Bagus Wicaksono",
  email: "bagus.coffee@sipzy.id",
  phone: "+62 812-3456-7890",
  location: "Depok, Sleman, D.I. Yogyakarta",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  memberId: "SIP-9824-SLM",
  memberSince: "Maret 2024",
  membershipLevel: "Gold",
  points: 1450,
  notificationsEnabled: true,
  emailUpdates: true
};
export const MERCHANTS_DATA = [
  {
    id: "m_kaliurang",
    name: "Klinik Kopi & Roastery Kaliurang",
    category: "Roastery",
    rating: 4.9,
    reviewCount: 420,
    location: "Ngaglik, Sleman",
    address: "Jl. Kaliurang Km 7.8, Sinduharjo, Ngaglik, Sleman",
    openingHours: "08:00 - 21:00 WIB",
    coverImage: "/images/merchant_specialty_roastery_1793559240547.jpg",
    logoImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=160&q=80",
    description: "Pelopor single-origin manual brew legendaris di Sleman. Menyajikan biji kopi mikro langsung dari petani nusantara dan roasting harian dengan cerita di setiap cangkirnya.",
    distance: "1.2 km",
    priceRange: "$$",
    tags: ["Single Origin", "V60 Manual Brew", "Roastery Lokal", "Diskusi Barista"],
    isFeatured: true
  },
  {
    id: "m_palagan",
    name: "Space Roastery Sleman",
    category: "Kopi Spesialti",
    rating: 4.9,
    reviewCount: 560,
    location: "Palagan, Sleman",
    address: "Jl. Palagan Tentara Pelajar No. 88, Sariharjo, Ngaglik, Sleman",
    openingHours: "07:30 - 22:00 WIB",
    coverImage: "/images/hero_coffee_atmosphere_1793559239277.jpg",
    logoImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=160&q=80",
    description: "Surga pencinta kopi spesialti di Jogja utara. Menggunakan mesin sangrai canggih dan espresso machine modern dengan sajian blend juara dan manual brew kelas dunia.",
    distance: "2.4 km",
    priceRange: "$$$",
    tags: ["Eksperimental Fermentasi", "Cold Brew Nitro", "Roastery Modern"],
    isFeatured: true
  },
  {
    id: "m_seturan",
    name: "Couvee Seturan Atelier",
    category: "Coffee Shop",
    rating: 4.8,
    reviewCount: 680,
    location: "Seturan, Sleman",
    address: "Jl. Seturan Raya No. 4, Caturtunggal, Depok, Sleman",
    openingHours: "08:00 - 23:00 WIB",
    coverImage: "/images/merchant_botanical_cafe_1793559240749.jpg",
    logoImage: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=160&q=80",
    description: "Favorit mahasiswa dan pekerja kreatif di kawasan Seturan Sleman. Terkenal dengan varian kopi susu gula aren gurih, red velvet, matcha latte, dan cold brew praktis.",
    distance: "1.8 km",
    priceRange: "$$",
    tags: ["Kopi Susu Favorit", "Ramah Mahasiswa", "Pickup Cepat", "WiFi Kencang"],
    isFeatured: true
  },
  {
    id: "m_condongcatur",
    name: "Ekologi Desk & Coffee",
    category: "Kafe",
    rating: 4.8,
    reviewCount: 390,
    location: "Condongcatur, Sleman",
    address: "Jl. Pandean Sari Blok IV No. 10A, Condongcatur, Depok, Sleman",
    openingHours: "08:00 - 23:00 WIB",
    coverImage: "/images/merchant_botanical_cafe_1793559240749.jpg",
    logoImage: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=160&q=80",
    description: "Kafe asri dua lantai dengan taman rindang di Condongcatur Sleman. Suasana tenang ideal untuk nugas, meeting santai, dan menikmati artisan pastry hangat.",
    distance: "3.1 km",
    priceRange: "$$",
    tags: ["Taman Asri", "Work From Cafe", "Artisan Bakery", "Suasana Tenang"],
    isFeatured: false
  },
  {
    id: "m_damai",
    name: "Kala Coffee & Bistro Palagan",
    category: "Kafe",
    rating: 4.7,
    reviewCount: 310,
    location: "Ngaglik, Sleman",
    address: "Jl. Damai No. 111, Sinduharjo, Ngaglik, Sleman",
    openingHours: "09:00 - 23:00 WIB",
    coverImage: "/images/merchant_specialty_roastery_1793559240547.jpg",
    logoImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=160&q=80",
    description: "Perpaduan arsitektur modern tropis dengan seduhan kopi spesialti dan menu makanan nusantara kontemporer di kawasan kuliner Jalan Damai Sleman.",
    distance: "3.8 km",
    priceRange: "$$$",
    tags: ["Bistro & Brunch", "Espresso Blend", "Outdoor Cozy"],
    isFeatured: false
  },
  {
    id: "m_babarsari",
    name: "Simetri Coffee Roasters Babarsari",
    category: "Kopi Spesialti",
    rating: 4.8,
    reviewCount: 275,
    location: "Caturtunggal, Sleman",
    address: "Jl. Tambak Bayan No. 23, Babarsari, Caturtunggal, Sleman",
    openingHours: "07:30 - 22:00 WIB",
    coverImage: "/images/hero_coffee_atmosphere_1793559239277.jpg",
    logoImage: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=160&q=80",
    description: "Tempat berkumpulnya komunitas kopi Babarsari. Menghadirkan beragam single origin pilihan dari Lereng Gunung Merapi hingga biji kopi fermentasi dunia.",
    distance: "4.5 km",
    priceRange: "$$",
    tags: ["Kopi Merapi", "Manual Brew Flight", "Barista Friendly"],
    isFeatured: false
  }
];
export const PRODUCTS_DATA = [
  // Klinik Kopi Kaliurang Sleman
  {
    id: "p_klk_01",
    merchantId: "m_kaliurang",
    name: "V60 Arabica Merapi Washed",
    category: "Manual Brew (V60)",
    description: "Biji kopi lereng Merapi Sleman yang dipetik matang optimal. Karakter acidity bersih seperti jeruk keprok dengan aftertaste madu liar.",
    price: 32e3,
    image: "/images/merchant_specialty_roastery_1793559240547.jpg",
    isPopular: true,
    pointsEarned: 3
  },
  {
    id: "p_klk_02",
    merchantId: "m_kaliurang",
    name: "V60 Gayo Wine Fermentation",
    category: "Manual Brew (V60)",
    description: "Fermentasi anaerobik Aceh Gayo dengan aroma buah berry segar, anggur manis, dan sentuhan cokelat karamel lembut.",
    price: 38e3,
    image: "/images/merchant_specialty_roastery_1793559240547.jpg",
    isPopular: true,
    pointsEarned: 3
  },
  {
    id: "p_klk_03",
    merchantId: "m_kaliurang",
    name: "Es Kopi Kaliurang (Double Shot)",
    category: "Kopi Susu & Signature",
    description: "Double shot espresso racikan lokal dipadu susu segar Sleman dan sirup gula aren alami dari Kulon Progo.",
    price: 26e3,
    image: "/images/product_artisan_latte_1793559240756.jpg",
    isPopular: true,
    pointsEarned: 2
  },
  {
    id: "p_klk_04",
    merchantId: "m_kaliurang",
    name: "Croissant Butter Cokelat Lumer",
    category: "Pastry & Makanan",
    description: "Pastry mentega renyah berlapis dengan isian cokelat couverture hangat yang dipanggang segar setiap pagi.",
    price: 28e3,
    image: "/images/merchant_botanical_cafe_1793559240749.jpg",
    isPopular: false,
    pointsEarned: 2
  },
  // Space Roastery Sleman
  {
    id: "p_spc_01",
    merchantId: "m_palagan",
    name: "Artisan Oat Flat White",
    category: "Espresso Bar",
    description: "Double ristretto espresso blend juara berpadu microfoam oat milk creamy dengan aroma roasted hazelnut yang lembut.",
    price: 36e3,
    image: "/images/product_artisan_latte_1793559240756.jpg",
    isPopular: true,
    pointsEarned: 3
  },
  {
    id: "p_spc_02",
    merchantId: "m_palagan",
    name: "Nitro Cascara Cold Brew",
    category: "Cold Brew",
    description: "Seduhan dingin kulit buah kopi (cascara) berkarbonasi nitro dengan sensasi buah kismis dan asam segar yang menyegarkan.",
    price: 34e3,
    image: "/images/hero_coffee_atmosphere_1793559239277.jpg",
    isPopular: true,
    pointsEarned: 3
  },
  {
    id: "p_spc_03",
    merchantId: "m_palagan",
    name: "Iced Spanish Cinnamon Latte",
    category: "Kopi Susu & Signature",
    description: "Espresso dingin berpadu susu kental manis kayu manis Ceylon aromatik dan taburan bubuk rempah nusantara.",
    price: 35e3,
    image: "/images/product_artisan_latte_1793559240756.jpg",
    isPopular: false,
    pointsEarned: 3
  },
  // Couvee Seturan Sleman
  {
    id: "p_cou_01",
    merchantId: "m_seturan",
    name: "Kopi Susu Couvee Java (Brown Sugar)",
    category: "Kopi Susu & Signature",
    description: "Varian terlaris di Seturan. Paduan seimbang espresso pekat, susu murni, dan sirup gula kelapa khas Jawa.",
    price: 24e3,
    image: "/images/product_artisan_latte_1793559240756.jpg",
    isPopular: true,
    pointsEarned: 2
  },
  {
    id: "p_cou_02",
    merchantId: "m_seturan",
    name: "Signature Caramel Macchiato",
    category: "Espresso Bar",
    description: "Lapisan sirup vanilla, susu segar, double shot espresso, dan drizzle saus karamel lezat di atasnya.",
    price: 29e3,
    image: "/images/product_artisan_latte_1793559240756.jpg",
    isPopular: true,
    pointsEarned: 2
  },
  {
    id: "p_cou_03",
    merchantId: "m_seturan",
    name: "Almond Danish Pastry",
    category: "Pastry & Makanan",
    description: "Kue danish renyah beraroma vanila dengan taburan kacang almond panggang dan gula halus.",
    price: 25e3,
    image: "/images/merchant_botanical_cafe_1793559240749.jpg",
    isPopular: false,
    pointsEarned: 2
  },
  // Ekologi Condongcatur Sleman
  {
    id: "p_eko_01",
    merchantId: "m_condongcatur",
    name: "Americano Dingin Merapi Blend",
    category: "Espresso Bar",
    description: "Double espresso segar disajikan di atas air dingin dan es kristal, mempertahankan rasa bersih dan harum bunga kopi.",
    price: 25e3,
    image: "/images/product_artisan_latte_1793559240756.jpg",
    isPopular: true,
    pointsEarned: 2
  },
  {
    id: "p_eko_02",
    merchantId: "m_condongcatur",
    name: "Truffle Egg Brioche Toast",
    category: "Pastry & Makanan",
    description: "Roti brioche panggang lembut dengan telur orak-arik krim, aroma minyak truffle putih, dan irisan daun kucai.",
    price: 45e3,
    image: "/images/merchant_botanical_cafe_1793559240749.jpg",
    isPopular: true,
    pointsEarned: 4
  }
];
export const REWARDS_DATA = [
  {
    id: "rew_01",
    title: "Gratis 1 Cangkir Americano / Long Black",
    description: "Nikmati seduhan Americano panas atau dingin segar di seluruh gerai mitra SIPZY se-Kabupaten Sleman.",
    pointsRequired: 500,
    category: "Minuman Gratis",
    voucherCode: "SIPZY-KOPF-500",
    validUntil: "Berlaku 30 hari setelah penukaran",
    image: "/images/product_artisan_latte_1793559240756.jpg"
  },
  {
    id: "rew_02",
    title: "Diskon 20% Total Pesanan",
    description: "Potongan harga langsung 20% untuk pesanan makan di tempat atau pickup (maksimal potongan Rp 40.000).",
    pointsRequired: 750,
    category: "Diskon Pesanan",
    voucherCode: "SIPZY-DISKON-20",
    validUntil: "Berlaku 14 hari setelah penukaran",
    image: "/images/hero_coffee_atmosphere_1793559239277.jpg"
  },
  {
    id: "rew_03",
    title: "Gratis 1 Kopi Susu Spesialti / Cafe Latte",
    description: "Tukarkan dengan varian caffe latte, cappuccino, atau es kopi susu signature favoritmu.",
    pointsRequired: 1e3,
    category: "Minuman Gratis",
    voucherCode: "SIPZY-LATTE-1K",
    validUntil: "Berlaku 30 hari setelah penukaran",
    image: "/images/product_artisan_latte_1793559240756.jpg"
  },
  {
    id: "rew_04",
    title: "Gratis 1 French Butter Croissant",
    description: "Pilih roti croissant mentega hangat atau pastry pilihan hari ini saat memesan kopi.",
    pointsRequired: 1200,
    category: "Pastry Gratis",
    voucherCode: "SIPZY-PASTRY-GRATIS",
    validUntil: "Berlaku 21 hari setelah penukaran",
    image: "/images/merchant_botanical_cafe_1793559240749.jpg"
  },
  {
    id: "rew_05",
    title: "Tiket VIP Cupping & Seduh Manual Barista",
    description: "Undangan khusus 2 orang untuk sesi cupping dan sharing session bersama Q-Grader di Roastery Kaliurang Sleman.",
    pointsRequired: 2500,
    category: "Pengalaman VIP",
    merchantName: "Klinik Kopi & Roastery Kaliurang",
    voucherCode: "SIPZY-VIP-CUPPING",
    validUntil: "Berlaku 60 hari setelah penukaran",
    image: "/images/merchant_specialty_roastery_1793559240547.jpg"
  },
  {
    id: "rew_06",
    title: "Gratis 1 Botol Cold Brew Merapi (500ml)",
    description: "Bawa pulang 1 botol kaca cold brew konsentrat seduh dingin dari biji kopi arabika lereng Merapi.",
    pointsRequired: 800,
    category: "Minuman Gratis",
    voucherCode: "SIPZY-BTL-COLDBREW",
    validUntil: "Berlaku 30 hari setelah penukaran",
    image: "/images/hero_coffee_atmosphere_1793559239277.jpg"
  }
];
export const PROMOTIONS_DATA = [
  {
    id: "promo_01",
    title: "Selamat Datang di SIPZY Sleman",
    tagline: "Kopi pertama di Sleman dapat diskon 50%!",
    discountBadge: "DISKON 50%",
    promoCode: "SLEMANKOP1",
    description: "Dapatkan potongan 50% untuk pesanan pickup kopi pertamamu di seluruh coffee shop Sleman (maksimal potongan Rp 25.000).",
    minSpend: 3e4,
    validUntil: "30 Nov 2026",
    category: "Member Baru",
    isFeatured: true
  },
  {
    id: "promo_02",
    title: "Poin Loyalitas Ganda Akhir Pekan",
    tagline: "Kumpulkan poin 2x lebih cepat setiap Sabtu & Minggu.",
    discountBadge: "2X POIN",
    promoCode: "WEEKEND2X",
    description: "Dapatkan 2 poin loyalitas untuk setiap kelipatan transaksi Rp 10.000 saat ngopi akhir pekan di Sleman.",
    minSpend: 4e4,
    validUntil: "Berlaku Setiap Akhir Pekan",
    category: "Bonus Loyalitas",
    isFeatured: true
  },
  {
    id: "promo_03",
    title: "Beli 1 Gratis 1 Kopi Kaliurang",
    tagline: "Spesial sore hari di Roastery Kaliurang",
    discountBadge: "BELI 1 GRATIS 1",
    promoCode: "KALIURANGBOGO",
    description: "Pesan V60 Merapi Washed atau Es Kopi Kaliurang dan dapatkan gratis 1 cangkir tambahan antara pukul 14:00 - 17:00 WIB.",
    minSpend: 32e3,
    validUntil: "15 Nov 2026",
    merchantName: "Klinik Kopi & Roastery Kaliurang",
    category: "Promo Spesial Mitra",
    isFeatured: false
  },
  {
    id: "promo_04",
    title: "Diskon Mahasiswa & Pelajar Sleman",
    tagline: "Temani nugas di Couvee Seturan & Babarsari",
    discountBadge: "POTONGAN Rp 10.000",
    promoCode: "STUDENTSLM",
    description: "Potongan langsung Rp 10.000 untuk pesanan kopi susu atau cold brew di wilayah kampus Seturan & Babarsari.",
    minSpend: 35e3,
    validUntil: "20 Nov 2026",
    merchantName: "Couvee Seturan Atelier",
    category: "Promo Spesial Mitra",
    isFeatured: false
  }
];
export const INITIAL_ORDERS = [
  {
    id: "SIP-ORD-90821",
    userId: "usr_001",
    merchantId: "m_kaliurang",
    merchantName: "Klinik Kopi & Roastery Kaliurang",
    items: [
      {
        product: PRODUCTS_DATA[0],
        quantity: 2,
        merchantId: "m_kaliurang",
        merchantName: "Klinik Kopi & Roastery Kaliurang",
        notes: "Seduh panas, rasio 1:15"
      },
      {
        product: PRODUCTS_DATA[3],
        quantity: 1,
        merchantId: "m_kaliurang",
        merchantName: "Klinik Kopi & Roastery Kaliurang"
      }
    ],
    orderType: "Pickup (Bawa Pulang)",
    paymentMethod: "QRIS",
    subtotal: 92e3,
    discount: 15e3,
    promoCode: "SLEMANKOP1",
    totalPayment: 77e3,
    pointsEarned: 7,
    status: "Selesai",
    date: "31 Okt 2026, 14:20 WIB",
    createdAt: Date.now() - 864e5 * 2
  },
  {
    id: "SIP-ORD-90765",
    userId: "usr_001",
    merchantId: "m_palagan",
    merchantName: "Space Roastery Sleman",
    items: [
      {
        product: PRODUCTS_DATA[4],
        quantity: 1,
        merchantId: "m_palagan",
        merchantName: "Space Roastery Sleman"
      },
      {
        product: PRODUCTS_DATA[5],
        quantity: 1,
        merchantId: "m_palagan",
        merchantName: "Space Roastery Sleman"
      }
    ],
    orderType: "Dine-in (Makan di Tempat)",
    paymentMethod: "Transfer Bank (VA)",
    subtotal: 7e4,
    discount: 0,
    totalPayment: 7e4,
    pointsEarned: 7,
    status: "Selesai",
    date: "28 Okt 2026, 09:15 WIB",
    createdAt: Date.now() - 864e5 * 5
  },
  {
    id: "SIP-ORD-90610",
    userId: "usr_001",
    merchantId: "m_seturan",
    merchantName: "Couvee Seturan Atelier",
    items: [
      {
        product: PRODUCTS_DATA[7],
        quantity: 2,
        merchantId: "m_seturan",
        merchantName: "Couvee Seturan Atelier",
        notes: "Less sugar, normal ice"
      }
    ],
    orderType: "Pickup (Bawa Pulang)",
    paymentMethod: "Bayar di Kasir",
    subtotal: 48e3,
    discount: 0,
    totalPayment: 48e3,
    pointsEarned: 4,
    status: "Sedang Diproses",
    date: "02 Nov 2026, 10:30 WIB",
    createdAt: Date.now() - 36e5
  }
];
export const INITIAL_TRANSACTIONS = [
  {
    id: "tx_01",
    userId: "usr_001",
    type: "DIPEROLEH",
    title: "Pesanan di Klinik Kopi Kaliurang",
    points: 7,
    date: "31 Okt 2026",
    status: "Selesai",
    referenceId: "SIP-ORD-90821"
  },
  {
    id: "tx_02",
    userId: "usr_001",
    type: "BONUS",
    title: "Bonus Poin Ganda Akhir Pekan Sleman",
    points: 100,
    date: "26 Okt 2026",
    status: "Selesai"
  },
  {
    id: "tx_03",
    userId: "usr_001",
    type: "DITUKARKAN",
    title: "Penukaran Gratis Es Kopi Susu Spesialti",
    points: -1e3,
    date: "20 Okt 2026",
    status: "Selesai"
  },
  {
    id: "tx_04",
    userId: "usr_001",
    type: "BONUS",
    title: "Bonus Naik Level Gold Membership",
    points: 500,
    date: "15 Okt 2026",
    status: "Selesai"
  },
  {
    id: "tx_05",
    userId: "usr_001",
    type: "DIPEROLEH",
    title: "Pesanan di Space Roastery Palagan",
    points: 14,
    date: "10 Okt 2026",
    status: "Selesai"
  }
];
