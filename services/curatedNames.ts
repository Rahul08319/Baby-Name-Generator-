import { BabyName, Gender } from '../types';

export const CURRENT_YEAR = new Date().getFullYear();

// High-resolution curated ethereal aesthetic images for baby name cards
const ETHEREAL_IMAGES = [
  'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80', // Ethereal pink cherry blossom
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', // Peaceful dawn ocean
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80', // Starry night mountain
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80', // Soft clouds pastel
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80', // Spring flowers bloom
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80', // Northern lights ethereal
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80', // Meadow wildflower sunlight
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Yosemite ethereal mist
  'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80', // Golden hour forest rays
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80', // Abstract liquid pastel gradient
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=800&q=80', // Soft violet magenta gradient
  'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80', // Lavender field twilight
];

export const RAW_CURATED_NAMES: Omit<BabyName, 'id' | 'popularityTrend'>[] = [
  // JAPANESE
  {
    name: 'Aoi',
    meaning: 'Hollyhock flower; peaceful blue-green hue symbolizing tranquility and steadfast growth.',
    origin: 'Japanese',
    gender: 'unisex',
    pronunciation: 'ah-oh-ee',
    syllables: 3,
    vibe: 'Nature & Floral',
    imageUrl: ETHEREAL_IMAGES[0],
    numerologyNumber: 7,
    astrologySign: 'Pisces',
    element: 'Water',
    historicMeaning: 'In classic Heian poetry, Aoi symbolizes purity and unwavering fidelity.',
    famousNamesakes: ['Aoi Yu (Award-winning actress)', 'Aoi Miyazaki (Artist)']
  },
  {
    name: 'Ren',
    meaning: 'Lotus blossom; sacred symbol of spiritual purity, rebirth, and beauty rising above still waters.',
    origin: 'Japanese',
    gender: 'boy',
    pronunciation: 'rehn',
    syllables: 1,
    vibe: 'Ethereal & Zen',
    imageUrl: ETHEREAL_IMAGES[4],
    numerologyNumber: 1,
    astrologySign: 'Virgo',
    element: 'Earth',
    historicMeaning: 'Revered in Buddhist philosophy as a lotus rising untainted above muddy ponds.',
    famousNamesakes: ['Ren Mori (Historic poet)', 'Ren Meguro (Actor & Singer)']
  },
  {
    name: 'Sora',
    meaning: 'The boundless azure sky; representing limitless freedom, vision, and tranquility.',
    origin: 'Japanese',
    gender: 'unisex',
    pronunciation: 'soh-rah',
    syllables: 2,
    vibe: 'Celestial & Sky',
    imageUrl: ETHEREAL_IMAGES[3],
    numerologyNumber: 3,
    astrologySign: 'Aquarius',
    element: 'Air',
    historicMeaning: 'Used in classical Japanese literature to evoke an open mind and boundless dreams.',
    famousNamesakes: ['Sora Amamiya (Voice Artist)', 'Sora Tokui (Illustrator)']
  },
  {
    name: 'Kaede',
    meaning: 'Maple leaf; graceful elegance and vibrant seasonal transformation.',
    origin: 'Japanese',
    gender: 'unisex',
    pronunciation: 'kah-eh-deh',
    syllables: 3,
    vibe: 'Nature & Floral',
    imageUrl: ETHEREAL_IMAGES[8],
    numerologyNumber: 6,
    astrologySign: 'Scorpio',
    element: 'Fire',
    historicMeaning: 'The Japanese maple represents peace, serenity, and the quiet dignity of autumn.',
    famousNamesakes: ['Kaede Hondo (Voice Artist)']
  },
  {
    name: 'Hana',
    meaning: 'Blossoming flower; grace, delicate beauty, and cheerful blossoming radiance.',
    origin: 'Japanese',
    gender: 'girl',
    pronunciation: 'hah-nah',
    syllables: 2,
    vibe: 'Nature & Floral',
    imageUrl: ETHEREAL_IMAGES[4],
    numerologyNumber: 5,
    astrologySign: 'Taurus',
    element: 'Earth',
    historicMeaning: 'Central motif in Ikebana and Hanami spring celebrations throughout Kyoto.',
    famousNamesakes: ['Hana Sugisaki (Actress)', 'Hana Kimura (Pioneer)']
  },

  // SANSKRIT / INDIAN
  {
    name: 'Aarav',
    meaning: 'Peaceful wisdom; melodious harmonic sound and gentle strength.',
    origin: 'Sanskrit',
    gender: 'boy',
    pronunciation: 'ah-ruhv',
    syllables: 2,
    vibe: 'Ethereal & Zen',
    imageUrl: ETHEREAL_IMAGES[1],
    numerologyNumber: 9,
    astrologySign: 'Aries',
    element: 'Fire',
    historicMeaning: 'Rooted in Vedic hymns denoting harmonious music and tranquil leadership.',
    famousNamesakes: ['Aarav Kumar (Artist)', 'Aarav Patel (Scholar)']
  },
  {
    name: 'Ananya',
    meaning: 'Matchless, peerless, and utterly unique; one of divine grace who has no equal.',
    origin: 'Sanskrit',
    gender: 'girl',
    pronunciation: 'uh-nuhn-yah',
    syllables: 3,
    vibe: 'Royal & Timeless',
    imageUrl: ETHEREAL_IMAGES[6],
    numerologyNumber: 8,
    astrologySign: 'Leo',
    element: 'Fire',
    historicMeaning: 'Classical epithet for the goddess Parvati representing supreme beauty and devotion.',
    famousNamesakes: ['Ananya Panday (Actress)', 'Ananya Birla (Musician & Philanthropist)']
  },
  {
    name: 'Advait',
    meaning: 'Non-dual, unified oneness; profound spiritual integrity and holistic wisdom.',
    origin: 'Sanskrit',
    gender: 'boy',
    pronunciation: 'uhd-vait',
    syllables: 2,
    vibe: 'Ethereal & Zen',
    imageUrl: ETHEREAL_IMAGES[2],
    numerologyNumber: 1,
    astrologySign: 'Capricorn',
    element: 'Earth',
    historicMeaning: 'The cornerstone philosophical doctrine of Advaita Vedanta expounded by Adi Shankara.',
    famousNamesakes: ['Advait Chandan (Film Director)', 'Advait Jathar (Astronomer)']
  },
  {
    name: 'Isha',
    meaning: 'The ruling divine protector; pure radiant energy and supreme clarity.',
    origin: 'Sanskrit',
    gender: 'girl',
    pronunciation: 'ee-shah',
    syllables: 2,
    vibe: 'Royal & Timeless',
    imageUrl: ETHEREAL_IMAGES[9],
    numerologyNumber: 5,
    astrologySign: 'Libra',
    element: 'Air',
    historicMeaning: 'Derives from the Isha Upanishad, celebrating the indwelling luminous spirit of the cosmos.',
    famousNamesakes: ['Isha Koppikar (Artist)', 'Isha Ambani (Cultural Patron)']
  },
  {
    name: 'Veda',
    meaning: 'Sacred timeless knowledge, illuminated wisdom, and cosmic insight.',
    origin: 'Sanskrit',
    gender: 'girl',
    pronunciation: 'vay-dah',
    syllables: 2,
    vibe: 'Ethereal & Zen',
    imageUrl: ETHEREAL_IMAGES[5],
    numerologyNumber: 4,
    astrologySign: 'Sagittarius',
    element: 'Fire',
    historicMeaning: 'Named for the four foundational sacred texts of ancient Indian philosophy.',
    famousNamesakes: ['Veda Krishnamurthy (Athlete)', 'Veda Sastry (Scholar)']
  },

  // IRISH / CELTIC
  {
    name: 'Aiden',
    meaning: 'Little warm fire; passionate beacon of light, courage, and vitality.',
    origin: 'Irish',
    gender: 'boy',
    pronunciation: 'ay-duhn',
    syllables: 2,
    vibe: 'Modern Minimalist',
    imageUrl: ETHEREAL_IMAGES[8],
    numerologyNumber: 3,
    astrologySign: 'Sagittarius',
    element: 'Fire',
    historicMeaning: 'Derived from Aodhán, son of the Celtic god of fire and light Aodh.',
    famousNamesakes: ['Saint Aidan of Lindisfarne', 'Aidan Quinn (Actor)']
  },
  {
    name: 'Maeve',
    meaning: 'She who intoxicates with wonder; warrior queen of legendary sovereign grace.',
    origin: 'Irish',
    gender: 'girl',
    pronunciation: 'mayv',
    syllables: 1,
    vibe: 'Royal & Timeless',
    imageUrl: ETHEREAL_IMAGES[7],
    numerologyNumber: 8,
    astrologySign: 'Aries',
    element: 'Fire',
    historicMeaning: 'Legendary Queen of Connacht in the Ulster Cycle of Gaelic mythology.',
    famousNamesakes: ['Maeve Binchy (Renowned Author)', 'Maeve Higgins (Comedian & Writer)']
  },
  {
    name: 'Rowan',
    meaning: 'Little red one; sacred mountain ash tree bearing protective bright berries.',
    origin: 'Celtic',
    gender: 'unisex',
    pronunciation: 'roh-uhn',
    syllables: 2,
    vibe: 'Nature & Floral',
    imageUrl: ETHEREAL_IMAGES[6],
    numerologyNumber: 6,
    astrologySign: 'Taurus',
    element: 'Earth',
    historicMeaning: 'In Celtic lore, the rowan tree was planted near dwellings to ward off enchantments.',
    famousNamesakes: ['Rowan Atkinson (Actor & Comedian)', 'Rowan Blanchard (Activist & Actress)']
  },
  {
    name: 'Saoirse',
    meaning: 'Freedom, liberty, and soaring untamed independence.',
    origin: 'Irish',
    gender: 'girl',
    pronunciation: 'seer-shuh',
    syllables: 2,
    vibe: 'Ethereal & Zen',
    imageUrl: ETHEREAL_IMAGES[1],
    numerologyNumber: 5,
    astrologySign: 'Aquarius',
    element: 'Air',
    historicMeaning: 'Gained prominence in 1920s Ireland as a poetic celebration of sovereign liberty.',
    famousNamesakes: ['Saoirse Ronan (Four-time Academy Award Nominee)']
  },
  {
    name: 'Liam',
    meaning: 'Resolute protector; strong-willed guardian and loyal champion.',
    origin: 'Irish',
    gender: 'boy',
    pronunciation: 'lee-uhm',
    syllables: 2,
    vibe: 'Modern Minimalist',
    imageUrl: ETHEREAL_IMAGES[10],
    numerologyNumber: 1,
    astrologySign: 'Leo',
    element: 'Fire',
    historicMeaning: 'Shortened from Uilliam (William), meaning guardian of resolute gold armor.',
    famousNamesakes: ['Liam Neeson (Actor)', 'Liam Hemsworth (Actor)']
  },

  // GREEK
  {
    name: 'Atlas',
    meaning: 'Enduring pillar of celestial strength; bearer of starry heavens.',
    origin: 'Greek',
    gender: 'boy',
    pronunciation: 'at-luhs',
    syllables: 2,
    vibe: 'Celestial & Sky',
    imageUrl: ETHEREAL_IMAGES[2],
    numerologyNumber: 4,
    astrologySign: 'Capricorn',
    element: 'Earth',
    historicMeaning: 'Titan in Greek mythology tasked with holding celestial spheres upon his shoulders.',
    famousNamesakes: ['Atlas (Mythological Titan)', 'Atlas Shrugged']
  },
  {
    name: 'Chloe',
    meaning: 'Young green foliage, spring blossom, and fertile regeneration.',
    origin: 'Greek',
    gender: 'girl',
    pronunciation: 'kloh-ee',
    syllables: 2,
    vibe: 'Nature & Floral',
    imageUrl: ETHEREAL_IMAGES[4],
    numerologyNumber: 3,
    astrologySign: 'Gemini',
    element: 'Air',
    historicMeaning: 'Epithet of the goddess Demeter referring to tender young shoots of grain in April.',
    famousNamesakes: ['Chloé Zhao (Oscar-winning Director)', 'Chloe Sevigny (Actress)']
  },
  {
    name: 'Orion',
    meaning: 'Dweller of celestial light; the legendary cosmic hunter among constellations.',
    origin: 'Greek',
    gender: 'boy',
    pronunciation: 'oh-rye-uhn',
    syllables: 3,
    vibe: 'Celestial & Sky',
    imageUrl: ETHEREAL_IMAGES[2],
    numerologyNumber: 9,
    astrologySign: 'Sagittarius',
    element: 'Fire',
    historicMeaning: 'One of the oldest documented constellations, recognizable globally by its glowing belt.',
    famousNamesakes: ['Constellation Orion', 'Orion Clemens (Historical figure)']
  },
  {
    name: 'Thalia',
    meaning: 'To flourish, bloom abundantly, and bring joyous poetic festivity.',
    origin: 'Greek',
    gender: 'girl',
    pronunciation: 'thah-lee-uh',
    syllables: 3,
    vibe: 'Royal & Timeless',
    imageUrl: ETHEREAL_IMAGES[0],
    numerologyNumber: 7,
    astrologySign: 'Libra',
    element: 'Air',
    historicMeaning: 'One of the nine sacred Muses in Greek mythology, presiding over comedy and idyllic poetry.',
    famousNamesakes: ['Thalía (Singer & Cultural Icon)', 'Thalia Grace (Literary figure)']
  },
  {
    name: 'Zephyr',
    meaning: 'Gentle west wind of spring; refreshing breath of warm dawn.',
    origin: 'Greek',
    gender: 'unisex',
    pronunciation: 'zehf-uhr',
    syllables: 2,
    vibe: 'Nature & Floral',
    imageUrl: ETHEREAL_IMAGES[3],
    numerologyNumber: 5,
    astrologySign: 'Gemini',
    element: 'Air',
    historicMeaning: 'In ancient Greek mythology, Zephyros was the harbinger of fruitful spring breezes.',
    famousNamesakes: ['Zephyr Teachout (Professor & Author)']
  },

  // NORSE / SCANDINAVIAN
  {
    name: 'Astrid',
    meaning: 'Divinely loved beauty; starlit strength and majestic northern nobility.',
    origin: 'Norse',
    gender: 'girl',
    pronunciation: 'as-trihd',
    syllables: 2,
    vibe: 'Royal & Timeless',
    imageUrl: ETHEREAL_IMAGES[5],
    numerologyNumber: 6,
    astrologySign: 'Virgo',
    element: 'Earth',
    historicMeaning: 'Royal Scandinavian name borne by numerous queens of Norway and Sweden.',
    famousNamesakes: ['Astrid Lindgren (Author of Pippi Longstocking)', 'Queen Astrid of Belgium']
  },
  {
    name: 'Freya',
    meaning: 'Noble lady of golden dawn; goddess of love, beauty, fertility, and starlit skies.',
    origin: 'Norse',
    gender: 'girl',
    pronunciation: 'fray-uh',
    syllables: 2,
    vibe: 'Royal & Timeless',
    imageUrl: ETHEREAL_IMAGES[0],
    numerologyNumber: 2,
    astrologySign: 'Taurus',
    element: 'Earth',
    historicMeaning: 'Central deity of the Vanir in Norse mythology, ruler of Fólkvangr.',
    famousNamesakes: ['Freya Allan (Actress)', 'Freya Stark (Explorer & Writer)']
  },
  {
    name: 'Leif',
    meaning: 'Heir, descendant, and pioneer; courageous explorer of uncharted horizons.',
    origin: 'Norse',
    gender: 'boy',
    pronunciation: 'layf',
    syllables: 1,
    vibe: 'Nature & Floral',
    imageUrl: ETHEREAL_IMAGES[8],
    numerologyNumber: 1,
    astrologySign: 'Sagittarius',
    element: 'Fire',
    historicMeaning: 'Borne by Norse voyager Leif Erikson, the first European to set foot in North America.',
    famousNamesakes: ['Leif Erikson (Norse Navigator)', 'Leif Ove Andsnes (Pianist)']
  },
  {
    name: 'Soren',
    meaning: 'Stern integrity and thoughtful philosopher; quiet inner fortitude.',
    origin: 'Scandinavian',
    gender: 'boy',
    pronunciation: 'sor-ehn',
    syllables: 2,
    vibe: 'Modern Minimalist',
    imageUrl: ETHEREAL_IMAGES[1],
    numerologyNumber: 7,
    astrologySign: 'Scorpio',
    element: 'Water',
    historicMeaning: 'Derived from Severus; made famous by Danish existential philosopher Søren Kierkegaard.',
    famousNamesakes: ['Søren Kierkegaard (Philosopher)', 'Soren Bowie (Writer)']
  },

  // LATIN & ITALIAN
  {
    name: 'Aurelia',
    meaning: 'The golden one; radiant sunlight, majesty, and enduring inner brilliance.',
    origin: 'Latin',
    gender: 'girl',
    pronunciation: 'ow-reh-lee-uh',
    syllables: 4,
    vibe: 'Royal & Timeless',
    imageUrl: ETHEREAL_IMAGES[9],
    numerologyNumber: 3,
    astrologySign: 'Leo',
    element: 'Fire',
    historicMeaning: 'Distinguished Roman patrician gens; mother of Julius Caesar was Aurelia Cotta.',
    famousNamesakes: ['Aurelia Cotta (Roman Matron)', 'Aurelia Plath (Scholar)']
  },
  {
    name: 'Felix',
    meaning: 'Happy, fortunate, and blessed with joyful destiny and bright luck.',
    origin: 'Latin',
    gender: 'boy',
    pronunciation: 'fee-lihks',
    syllables: 2,
    vibe: 'Modern Minimalist',
    imageUrl: ETHEREAL_IMAGES[10],
    numerologyNumber: 9,
    astrologySign: 'Cancer',
    element: 'Water',
    historicMeaning: 'Ancient Roman cognomen given to generals favored by fortune and the gods.',
    famousNamesakes: ['Felix Mendelssohn (Composer)', 'Felix Baumgartner (Skydiver)']
  },
  {
    name: 'Nova',
    meaning: 'Brilliant newly born star bursting with ethereal cosmic illumination.',
    origin: 'Latin',
    gender: 'unisex',
    pronunciation: 'noh-vah',
    syllables: 2,
    vibe: 'Celestial & Sky',
    imageUrl: ETHEREAL_IMAGES[2],
    numerologyNumber: 8,
    astrologySign: 'Aquarius',
    element: 'Air',
    historicMeaning: 'From the Latin stella nova ("new star"), used by astronomers to record stellar births.',
    famousNamesakes: ['Nova Pilbeam (Actress)', 'Nova Peris (Olympic Gold Medalist)']
  },
  {
    name: 'Matteo',
    meaning: 'Gift of the heavens; cherished blessing of warmth and charisma.',
    origin: 'Italian',
    gender: 'boy',
    pronunciation: 'mah-tay-oh',
    syllables: 3,
    vibe: 'Royal & Timeless',
    imageUrl: ETHEREAL_IMAGES[7],
    numerologyNumber: 6,
    astrologySign: 'Gemini',
    element: 'Air',
    historicMeaning: 'Classic Italian iteration of Matthew, renowned throughout Renaissance Florence.',
    famousNamesakes: ['Matteo Bocelli (Vocalist)', 'Matteo Renzi (Statesman)']
  },
  {
    name: 'Chiara',
    meaning: 'Clear, luminous, and sparkling with serene celestial clarity.',
    origin: 'Italian',
    gender: 'girl',
    pronunciation: 'kee-ah-rah',
    syllables: 3,
    vibe: 'Ethereal & Zen',
    imageUrl: ETHEREAL_IMAGES[11],
    numerologyNumber: 7,
    astrologySign: 'Cancer',
    element: 'Water',
    historicMeaning: 'Italian form of Clare, championed by Saint Clare of Assisi.',
    famousNamesakes: ['Chiara Ferragni (Entrepreneur)', 'Chiara Lubich (Peace Activist)']
  },

  // ARABIC & HEBREW
  {
    name: 'Zayn',
    meaning: 'Grace, elegance, and captivating spiritual and physical beauty.',
    origin: 'Arabic',
    gender: 'boy',
    pronunciation: 'zayn',
    syllables: 1,
    vibe: 'Modern Minimalist',
    imageUrl: ETHEREAL_IMAGES[1],
    numerologyNumber: 5,
    astrologySign: 'Libra',
    element: 'Air',
    historicMeaning: 'Classic Arabic name celebrating refinement, honor, and artistic charm.',
    famousNamesakes: ['Zayn Malik (Singer & Songwriter)', 'Zayn al-Abidin (Historic Figure)']
  },
  {
    name: 'Layla',
    meaning: 'Enchanting starlit night; deep beauty, poetry, and mystic wonder.',
    origin: 'Arabic',
    gender: 'girl',
    pronunciation: 'lay-lah',
    syllables: 2,
    vibe: 'Celestial & Sky',
    imageUrl: ETHEREAL_IMAGES[2],
    numerologyNumber: 2,
    astrologySign: 'Scorpio',
    element: 'Water',
    historicMeaning: 'The heroine of the classic 7th-century Arabian love story Layla and Majnun.',
    famousNamesakes: ['Layla Moran (Parliamentarian)', 'Layla Al-Attar (Celebrated Painter)']
  },
  {
    name: 'Asher',
    meaning: 'Happy, blessed, and fortunate one who spreads abundant joy.',
    origin: 'Hebrew',
    gender: 'boy',
    pronunciation: 'ash-uhr',
    syllables: 2,
    vibe: 'Modern Minimalist',
    imageUrl: ETHEREAL_IMAGES[8],
    numerologyNumber: 3,
    astrologySign: 'Sagittarius',
    element: 'Fire',
    historicMeaning: 'One of the twelve tribes of Israel, prophesied to inherit fertile lands of olive and oil.',
    famousNamesakes: ['Asher Brown Durand (Hudson River School Artist)', 'Asher Angel (Actor)']
  },
  {
    name: 'Eden',
    meaning: 'Delight, paradise, and a tranquil haven of lush natural beauty.',
    origin: 'Hebrew',
    gender: 'unisex',
    pronunciation: 'ee-duhn',
    syllables: 2,
    vibe: 'Nature & Floral',
    imageUrl: ETHEREAL_IMAGES[4],
    numerologyNumber: 6,
    astrologySign: 'Taurus',
    element: 'Earth',
    historicMeaning: 'Biblical garden of harmony and pure unblemished creation.',
    famousNamesakes: ['Eden Hazard (Football Icon)', 'Eden Sher (Actress)']
  },
  {
    name: 'Kai',
    meaning: 'The gentle sea ocean tide; keeper of the keys and expansive horizons.',
    origin: 'Hawaiian',
    gender: 'unisex',
    pronunciation: 'kye',
    syllables: 1,
    vibe: 'Nature & Floral',
    imageUrl: ETHEREAL_IMAGES[1],
    numerologyNumber: 1,
    astrologySign: 'Pisces',
    element: 'Water',
    historicMeaning: 'In Polynesian Hawaiian, Kai is revered as the living spirit and sustenance of the ocean.',
    famousNamesakes: ['Kai Lenny (Big Wave Surfer)', 'Kai Wachi (Music Producer)']
  }
];

// Helper to calculate dynamic automatic year trends
export function getPopularityTrendForYear(name: string, year: number = CURRENT_YEAR) {
  // Deterministic seed based on name characters and year
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + year;
  const baseRank = (hash % 180) + 1; // Rank 1 to 180
  
  const trends: ('rising' | 'peaking' | 'classic' | 'unique')[] = ['rising', 'peaking', 'classic', 'unique'];
  const trendType = trends[hash % trends.length];

  // Dynamic 5-year trajectory: [year-2, year-1, year, year+1, year+2]
  const momentum = (hash % 15) - 7;
  const trajectory = [
    Math.max(1, baseRank + momentum * 2),
    Math.max(1, baseRank + momentum),
    baseRank,
    Math.max(1, baseRank - momentum),
    Math.max(1, baseRank - momentum * 2),
  ];

  const changePercent = Math.round(((trajectory[0] - trajectory[2]) / (trajectory[0] || 1)) * 100);

  return {
    rank: baseRank,
    trend: trendType,
    forecastYear: year,
    changePercent: changePercent || 12,
    trajectory,
  };
}

// Attach dynamic year calculation to raw curated names
export function getEnrichedCuratedNames(year: number = CURRENT_YEAR): BabyName[] {
  return RAW_CURATED_NAMES.map((item, idx) => ({
    ...item,
    id: `curated-${item.name.toLowerCase()}-${idx}`,
    popularityTrend: getPopularityTrendForYear(item.name, year),
  }));
}

// Procedural linguistic synthesis fallback for any custom letter & culture
export function synthesizeCulturalName(culture: string, letter: string, gender: Gender = 'all', index: number = 0): BabyName {
  const currentYear = CURRENT_YEAR;
  const upperLetter = letter.toUpperCase();
  
  // Culturally authentic name prefixes and suffixes
  const prefixes: Record<string, string[]> = {
    Japanese: ['Aki', 'Dai', 'Emi', 'Haru', 'Jun', 'Ken', 'Mei', 'Ren', 'Shin', 'Yuki', 'Kazu', 'Rin'],
    Sanskrit: ['Arya', 'Bhav', 'Dev', 'Esh', 'Gauri', 'Ish', 'Kav', 'Nav', 'Om', 'Pran', 'Rishi', 'Shiv'],
    Irish: ['Aoif', 'Brae', 'Colm', 'Dara', 'Eala', 'Finn', 'Glen', 'Lor', 'Niall', 'Orla', 'Rory', 'Tiern'],
    Greek: ['Alex', 'Cali', 'Daph', 'Eos', 'Helio', 'Iris', 'Kass', 'Lyra', 'Niko', 'Phoe', 'Thal', 'Xan'],
    Norse: ['Arvid', 'Bryn', 'Eira', 'Frey', 'Hal', 'Ing', 'Kari', 'Liv', 'Ragn', 'Tor', 'Vidar', 'Ylva'],
    Italian: ['Aless', 'Bell', 'Cos', 'Dant', 'Elia', 'Gia', 'Lluc', 'Mari', 'Nico', 'Rafa', 'Sant', 'Vito'],
    French: ['Adel', 'Beau', 'Ciel', 'Etie', 'Flor', 'Gasp', 'Jean', 'Leoc', 'Marc', 'Noel', 'Remy', 'Solo'],
    Arabic: ['Adil', 'Basm', 'Dany', 'Fadi', 'Hamz', 'Idris', 'Jann', 'Mal', 'Qas', 'Rami', 'Tariq', 'Ziy'],
    Celtic: ['Bran', 'Cael', 'Dwyn', 'Emyr', 'Gwen', 'Kian', 'Mael', 'Rhys', 'Sion', 'Taran', 'Wyn', 'Yor']
  };

  const cultureKey = Object.keys(prefixes).find(k => k.toLowerCase() === culture.toLowerCase()) || 'Greek';
  const prefixList = prefixes[cultureKey] || prefixes['Greek'];

  // Match or synthesize with starting letter
  let chosenName = `${upperLetter}${prefixList[index % prefixList.length].slice(1).toLowerCase()}`;
  if (chosenName.length < 3) {
    chosenName = `${upperLetter}an`;
  }

  const vibes = ['Ethereal & Zen', 'Nature & Floral', 'Celestial & Sky', 'Royal & Timeless', 'Modern Minimalist'];
  const assignedVibe = vibes[index % vibes.length];
  const assignedGender: 'boy' | 'girl' | 'unisex' = gender === 'all' ? (index % 2 === 0 ? 'girl' : 'boy') : gender;

  return {
    id: `synth-${chosenName.toLowerCase()}-${index}-${Date.now()}`,
    name: chosenName,
    meaning: `Luminous essence in ${culture} heritage signifying grace, courage, and harmonious light.`,
    origin: culture,
    gender: assignedGender,
    pronunciation: `${chosenName.toLowerCase()}`,
    syllables: 2,
    vibe: assignedVibe,
    imageUrl: ETHEREAL_IMAGES[(index + upperLetter.charCodeAt(0)) % ETHEREAL_IMAGES.length],
    popularityTrend: getPopularityTrendForYear(chosenName, currentYear),
    numerologyNumber: ((upperLetter.charCodeAt(0) + index) % 9) + 1,
    astrologySign: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'][index % 12],
    element: (['Air', 'Water', 'Fire', 'Earth'] as const)[index % 4],
    historicMeaning: `Celebrated in classic ${culture} folk traditions as a bearer of bright fortune.`,
    famousNamesakes: [`Notable ${culture} cultural figures and artists`]
  };
}

// Query generator that handles filtering, searching, and fallback
export function queryCuratedNames(
  culture: string,
  letter: string,
  gender: Gender = 'all',
  vibe: string = 'all',
  count: number = 6
): BabyName[] {
  const currentYear = CURRENT_YEAR;
  const enriched = getEnrichedCuratedNames(currentYear);
  const targetLetter = letter.trim().toUpperCase();
  const targetCulture = culture.trim().toLowerCase();

  // Step 1: Exact matches
  let results = enriched.filter(item => {
    const letterMatch = targetLetter ? item.name.toUpperCase().startsWith(targetLetter) : true;
    const cultureMatch = targetCulture ? item.origin.toLowerCase().includes(targetCulture) : true;
    const genderMatch = gender === 'all' ? true : (item.gender === gender || item.gender === 'unisex');
    const vibeMatch = vibe === 'all' ? true : item.vibe.toLowerCase().includes(vibe.toLowerCase());

    return letterMatch && cultureMatch && genderMatch && vibeMatch;
  });

  // Step 2: Letter match if culture too strict
  if (results.length < count && targetLetter) {
    const letterMatches = enriched.filter(item => 
      item.name.toUpperCase().startsWith(targetLetter) &&
      !results.some(r => r.name === item.name)
    );
    results = [...results, ...letterMatches];
  }

  // Step 3: Culture match if letter too strict
  if (results.length < count && targetCulture) {
    const cultureMatches = enriched.filter(item => 
      item.origin.toLowerCase().includes(targetCulture) &&
      !results.some(r => r.name === item.name)
    );
    results = [...results, ...cultureMatches];
  }

  // Step 4: Procedural synthesis to guarantee full count of exquisite names
  let synthIdx = 0;
  while (results.length < count) {
    const synthesized = synthesizeCulturalName(culture || 'Ethereal', targetLetter || 'A', gender, synthIdx++);
    if (!results.some(r => r.name.toLowerCase() === synthesized.name.toLowerCase())) {
      results.push(synthesized);
    }
  }

  return results.slice(0, count);
}
