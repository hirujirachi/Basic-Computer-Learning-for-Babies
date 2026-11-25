/**
 * pet-catalog.js — Single source of truth for the Bitty pet system.
 * All prices, reward amounts, and item definitions live here.
 * Never hard-code these values anywhere else.
 */

// ---- Pet identity ----
export const PET_NAME = 'Bitty';

// ---- Reward table ----
// Each entry: { id, label (Indonesian), amount }
export const REWARD_TABLE = [
  { id: 'learn_complete',  label: 'Mengenal Komputer selesai',  amount: 20 },
  { id: 'match_complete',  label: 'Cocokkan Gambar selesai',    amount: 10 },
  { id: 'mouse_complete',  label: 'Latihan Mouse selesai',      amount: 10 },
  { id: 'typing_complete', label: 'Latihan Mengetik selesai',   amount: 10 },
  { id: 'quiz_3',          label: 'Kuis nilai 3/5',             amount: 10 },
  { id: 'quiz_4',          label: 'Kuis nilai 4/5',             amount: 15 },
  { id: 'quiz_5',          label: 'Kuis nilai 5/5',             amount: 25 },
  { id: 'fmc_complete',    label: 'Fix My Computer selesai',    amount: 30 },
];

// ---- Shop catalog ----
// Categories: head, face, body, casing, background
// slot: which equip slot this item occupies
// price: 0 = free/default (auto-owned at init)
// svgKey: key into ITEM_SVG_PARTS map in bitty-renderer.js

export const SHOP_CATALOG = [

  // === HEAD ACCESSORIES ===
  {
    id: 'head_wizard_hat',
    name: 'Topi Penyihir',
    category: 'head',
    slot: 'head',
    price: 30,
    description: 'Topi kerucut ajaib milik penyihir!'
  },
  {
    id: 'head_crown',
    name: 'Mahkota Raja',
    category: 'head',
    slot: 'head',
    price: 40,
    description: 'Mahkota berkilau untuk raja dan ratu!'
  },
  {
    id: 'head_bow',
    name: 'Pita Lucu',
    category: 'head',
    slot: 'head',
    price: 15,
    description: 'Pita cantik di atas kepala!'
  },
  {
    id: 'head_baseball_cap',
    name: 'Topi Kasual',
    category: 'head',
    slot: 'head',
    price: 20,
    description: 'Topi olahraga yang keren!'
  },
  {
    id: 'head_headphones',
    name: 'Headphone Musik',
    category: 'head',
    slot: 'head',
    price: 35,
    description: 'Dengarkan musik favorit!'
  },

  // === FACE ACCESSORIES ===
  {
    id: 'face_round_glasses',
    name: 'Kacamata Bulat',
    category: 'face',
    slot: 'face_glasses',
    price: 20,
    description: 'Kacamata bulat ala ilmuwan!'
  },
  {
    id: 'face_sunglasses',
    name: 'Kacamata Hitam',
    category: 'face',
    slot: 'face_glasses',
    price: 25,
    description: 'Kacamata hitam super keren!'
  },
  {
    id: 'face_blush',
    name: 'Pipi Merah Muda',
    category: 'face',
    slot: 'face_blush',
    price: 10,
    description: 'Pipi merah muda yang imut!'
  },
  {
    id: 'face_mustache',
    name: 'Kumis Lucu',
    category: 'face',
    slot: 'face_mustache',
    price: 15,
    description: 'Kumis yang lucu dan menggemaskan!'
  },
  {
    id: 'face_star_stickers',
    name: 'Stiker Bintang (Muka)',
    category: 'face',
    slot: 'face_sticker',
    price: 10,
    description: 'Stiker bintang di pipi!'
  },

  // === BODY ACCESSORIES ===
  {
    id: 'body_lightning_stickers',
    name: 'Stiker Petir',
    category: 'body',
    slot: 'body_sticker',
    price: 10,
    description: 'Stiker petir yang energik!'
  },
  {
    id: 'body_heart_stickers',
    name: 'Stiker Hati',
    category: 'body',
    slot: 'body_sticker',
    price: 10,
    description: 'Stiker hati penuh kasih sayang!'
  },
  {
    id: 'body_star_stickers',
    name: 'Stiker Bintang (Badan)',
    category: 'body',
    slot: 'body_sticker',
    price: 10,
    description: 'Stiker bintang di badan!'
  },

  // === CASING DESIGNS ===
  {
    id: 'casing_default',
    name: 'Kasing Klasik',
    category: 'casing',
    slot: 'casing',
    price: 0,
    description: 'Kasing bawaan Bitty yang hangat dan ramah.'
  },
  {
    id: 'casing_blue',
    name: 'Kasing Biru Langit',
    category: 'casing',
    slot: 'casing',
    price: 20,
    description: 'Biru seperti langit cerah!'
  },
  {
    id: 'casing_pink',
    name: 'Kasing Merah Muda',
    category: 'casing',
    slot: 'casing',
    price: 20,
    description: 'Merah muda yang manis dan cantik!'
  },
  {
    id: 'casing_mint',
    name: 'Kasing Hijau Mint',
    category: 'casing',
    slot: 'casing',
    price: 20,
    description: 'Hijau segar seperti daun mint!'
  },
  {
    id: 'casing_galaxy',
    name: 'Kasing Galaksi',
    category: 'casing',
    slot: 'casing',
    price: 45,
    description: 'Warna-warni seperti galaksi bintang!'
  },

  // === BACKGROUNDS ===
  {
    id: 'bg_default',
    name: 'Latar Polos',
    category: 'background',
    slot: 'background',
    price: 0,
    description: 'Latar bawaan yang bersih dan nyaman.'
  },
  {
    id: 'bg_bedroom',
    name: 'Kamar Tidur',
    category: 'background',
    slot: 'background',
    price: 25,
    description: 'Kamar tidur yang nyaman dan hangat!'
  },
  {
    id: 'bg_computer_room',
    name: 'Ruang Komputer',
    category: 'background',
    slot: 'background',
    price: 25,
    description: 'Ruang komputer yang keren!'
  },
  {
    id: 'bg_garden',
    name: 'Taman Bunga',
    category: 'background',
    slot: 'background',
    price: 30,
    description: 'Taman penuh bunga berwarna-warni!'
  },
  {
    id: 'bg_space',
    name: 'Luar Angkasa',
    category: 'background',
    slot: 'background',
    price: 40,
    description: 'Luar angkasa penuh bintang!'
  },
  {
    id: 'bg_underwater',
    name: 'Bawah Laut',
    category: 'background',
    slot: 'background',
    price: 35,
    description: 'Dunia bawah laut yang ajaib!'
  },
];

// ---- Slot conflict rules ----
// Items sharing a conflictGroup cannot be equipped at the same time
export const SLOT_CONFLICT_GROUPS = [
  ['face_round_glasses', 'face_sunglasses'], // mutually exclusive glasses
];

// ---- Convenience lookups ----
export function getRewardById(id) {
  return REWARD_TABLE.find(r => r.id === id) || null;
}

export function getItemById(id) {
  return SHOP_CATALOG.find(i => i.id === id) || null;
}

export function getDefaultOwnedIds() {
  return SHOP_CATALOG.filter(i => i.price === 0).map(i => i.id);
}

export function getDefaultEquipped() {
  return {
    head:       null,
    face_glasses: null,
    face_blush:   null,
    face_mustache: null,
    face_sticker:  null,
    body_sticker:  null,
    casing:     'casing_default',
    background: 'bg_default',
  };
}
