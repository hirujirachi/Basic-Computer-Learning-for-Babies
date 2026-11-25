/**
 * bitty-renderer.js — Layered SVG renderer for Bitty.
 *
 * Bitty is a small desktop computer: rounded monitor body with stand/base.
 * The screen IS the face. Fully customizable via equip slots.
 *
 * Usage:
 *   renderBitty(containerEl, { expression, equipped, size })
 *
 * expression: 'neutral'|'happy'|'sad'|'surprised'|'blink'|'yawn'
 * equipped:   object from pet state (equipped slots)
 * size:       'sm' | 'md' | 'lg'  (controls viewBox scaling only)
 */

import { SHOP_CATALOG } from './pet-catalog.js';

// ---- Layer drawing functions ----
// All coordinates are in a 200×240 viewBox

/** BACKGROUND layer */
function drawBackground(id) {
  switch (id) {
    case 'bg_bedroom':
      return `
        <!-- Bedroom background -->
        <rect x="0" y="0" width="200" height="240" fill="#FFE0C8"/>
        <!-- Wall -->
        <rect x="0" y="0" width="200" height="150" fill="#FFF0E6"/>
        <!-- Floor -->
        <rect x="0" y="150" width="200" height="90" fill="#D4A574"/>
        <!-- Window -->
        <rect x="130" y="15" width="55" height="45" rx="4" fill="#87CEEB"/>
        <rect x="128" y="13" width="59" height="49" rx="5" fill="none" stroke="#C09060" stroke-width="3"/>
        <line x1="157" y1="13" x2="157" y2="62" stroke="#C09060" stroke-width="2"/>
        <line x1="128" y1="37" x2="187" y2="37" stroke="#C09060" stroke-width="2"/>
        <!-- Star on window -->
        <circle cx="145" cy="30" r="4" fill="#FFE66D" opacity=".8"/>
        <circle cx="170" cy="22" r="3" fill="#FFE66D" opacity=".6"/>
        <!-- Baseboard -->
        <rect x="0" y="145" width="200" height="8" fill="#C09060"/>
      `;
    case 'bg_computer_room':
      return `
        <!-- Computer room background -->
        <rect x="0" y="0" width="200" height="240" fill="#E8F4F8"/>
        <rect x="0" y="0" width="200" height="150" fill="#D0E8F0"/>
        <rect x="0" y="150" width="200" height="90" fill="#B0C4D0"/>
        <!-- Desk -->
        <rect x="0" y="145" width="200" height="10" fill="#8B6914"/>
        <!-- Monitor on desk (decorative) -->
        <rect x="10" y="100" width="40" height="30" rx="3" fill="#2C3E50"/>
        <rect x="13" y="103" width="34" height="22" rx="2" fill="#4ECDC4" opacity=".7"/>
        <circle cx="30" cy="130" r="3" fill="#2C3E50"/>
        <rect x="26" y="133" width="8" height="5" rx="1" fill="#3D3D3D"/>
        <!-- Bookshelf -->
        <rect x="150" y="80" width="45" height="65" fill="#8B6914"/>
        <rect x="152" y="82" width="10" height="20" rx="1" fill="#FF6B35"/>
        <rect x="164" y="82" width="8" height="20" rx="1" fill="#4ECDC4"/>
        <rect x="174" y="82" width="10" height="20" rx="1" fill="#9B59B6"/>
        <rect x="152" y="105" width="12" height="18" rx="1" fill="#FFE66D"/>
        <rect x="166" y="105" width="8" height="18" rx="1" fill="#2ECC71"/>
      `;
    case 'bg_garden':
      return `
        <!-- Garden background -->
        <rect x="0" y="0" width="200" height="240" fill="#87CEEB"/>
        <!-- Ground -->
        <rect x="0" y="145" width="200" height="95" fill="#5D8A3C"/>
        <!-- Grass top -->
        <ellipse cx="100" cy="145" rx="110" ry="12" fill="#6FAF45"/>
        <!-- Sun -->
        <circle cx="30" cy="30" r="20" fill="#FFE66D"/>
        <line x1="30" y1="5" x2="30" y2="0" stroke="#FFE66D" stroke-width="2"/>
        <line x1="30" y1="55" x2="30" y2="60" stroke="#FFE66D" stroke-width="2"/>
        <line x1="5" y1="30" x2="0" y2="30" stroke="#FFE66D" stroke-width="2"/>
        <line x1="55" y1="30" x2="60" y2="30" stroke="#FFE66D" stroke-width="2"/>
        <!-- Flowers -->
        <circle cx="20" cy="155" r="6" fill="#FF6B35"/>
        <circle cx="20" cy="155" r="3" fill="#FFE66D"/>
        <line x1="20" y1="161" x2="20" y2="175" stroke="#5D8A3C" stroke-width="2"/>
        <circle cx="175" cy="160" r="7" fill="#FF69B4"/>
        <circle cx="175" cy="160" r="3" fill="#FFE66D"/>
        <line x1="175" y1="167" x2="175" y2="180" stroke="#5D8A3C" stroke-width="2"/>
        <circle cx="150" cy="158" r="6" fill="#9B59B6"/>
        <circle cx="150" cy="158" r="3" fill="#FFE66D"/>
        <!-- Clouds -->
        <ellipse cx="120" cy="25" rx="22" ry="12" fill="white" opacity=".9"/>
        <ellipse cx="140" cy="22" rx="16" ry="10" fill="white" opacity=".9"/>
        <ellipse cx="100" cy="28" rx="15" ry="9" fill="white" opacity=".9"/>
        <ellipse cx="170" cy="40" rx="18" ry="10" fill="white" opacity=".8"/>
      `;
    case 'bg_space':
      return `
        <!-- Outer space background -->
        <rect x="0" y="0" width="200" height="240" fill="#0D0D2B"/>
        <!-- Stars -->
        <circle cx="15" cy="20" r="1.5" fill="white"/>
        <circle cx="45" cy="10" r="1" fill="white"/>
        <circle cx="80" cy="30" r="2" fill="white"/>
        <circle cx="120" cy="8" r="1.5" fill="white"/>
        <circle cx="160" cy="25" r="1" fill="white"/>
        <circle cx="185" cy="12" r="2" fill="white"/>
        <circle cx="30" cy="55" r="1" fill="white"/>
        <circle cx="70" cy="65" r="1.5" fill="white"/>
        <circle cx="140" cy="50" r="1" fill="white"/>
        <circle cx="175" cy="70" r="2" fill="white"/>
        <circle cx="10" cy="100" r="1" fill="white"/>
        <circle cx="190" cy="90" r="1.5" fill="white"/>
        <circle cx="55" cy="120" r="1" fill="white"/>
        <circle cx="165" cy="115" r="1" fill="white"/>
        <!-- Nebula glow -->
        <circle cx="150" cy="40" r="30" fill="#4B0082" opacity=".3"/>
        <circle cx="50" cy="80" r="25" fill="#1E3A8A" opacity=".3"/>
        <!-- Planet -->
        <circle cx="168" cy="168" r="22" fill="#9B59B6"/>
        <ellipse cx="168" cy="168" rx="32" ry="8" fill="none" stroke="#C39BD3" stroke-width="3" opacity=".7"/>
        <circle cx="162" cy="162" r="5" fill="#7D3C98" opacity=".5"/>
        <!-- Ground (moon surface) -->
        <ellipse cx="100" cy="230" rx="120" ry="30" fill="#2C2C5E"/>
        <ellipse cx="40" cy="218" rx="15" ry="8" fill="#1E1E44"/>
        <ellipse cx="160" cy="222" rx="12" ry="7" fill="#1E1E44"/>
      `;
    case 'bg_underwater':
      return `
        <!-- Underwater background -->
        <rect x="0" y="0" width="200" height="240" fill="#0077B6"/>
        <!-- Water gradient effect -->
        <rect x="0" y="0" width="200" height="80" fill="#00B4D8" opacity=".4"/>
        <!-- Bubbles -->
        <circle cx="20" cy="50" r="6" fill="none" stroke="white" stroke-width="1.5" opacity=".6"/>
        <circle cx="40" cy="20" r="4" fill="none" stroke="white" stroke-width="1" opacity=".5"/>
        <circle cx="170" cy="40" r="5" fill="none" stroke="white" stroke-width="1.5" opacity=".6"/>
        <circle cx="185" cy="15" r="3" fill="none" stroke="white" stroke-width="1" opacity=".5"/>
        <circle cx="90" cy="30" r="4" fill="none" stroke="white" stroke-width="1" opacity=".4"/>
        <!-- Sea floor -->
        <rect x="0" y="185" width="200" height="55" fill="#0A5C7A"/>
        <!-- Sand -->
        <rect x="0" y="200" width="200" height="40" fill="#C4A35A"/>
        <!-- Seaweed -->
        <path d="M20 200 Q15 185 20 170 Q25 155 20 140" stroke="#2D6A4F" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M180 200 Q175 180 180 165 Q185 150 180 135" stroke="#2D6A4F" stroke-width="4" fill="none" stroke-linecap="round"/>
        <!-- Coral -->
        <circle cx="60" cy="200" r="8" fill="#FF6B35" opacity=".8"/>
        <circle cx="55" cy="192" r="5" fill="#FF6B35" opacity=".8"/>
        <circle cx="65" cy="193" r="5" fill="#FF6B35" opacity=".8"/>
        <!-- Fish -->
        <ellipse cx="140" cy="90" rx="14" ry="8" fill="#FFE66D"/>
        <polygon points="154,90 162,84 162,96" fill="#FFE66D"/>
        <circle cx="137" cy="88" r="2" fill="#2C3E50"/>
        <!-- Little starfish on sand -->
        <text x="130" y="215" font-size="16" text-anchor="middle">⭐</text>
      `;
    default: // bg_default
      return `<rect x="0" y="0" width="200" height="240" fill="#FFF8F0"/>`;
  }
}

/** CASING / body layer — desktop computer shape */
function drawCasing(id) {
  let casingColor, casingDark, bezelColor;
  switch (id) {
    case 'casing_blue':
      casingColor = '#3498DB'; casingDark = '#2980B9'; bezelColor = '#1A6E9E';
      break;
    case 'casing_pink':
      casingColor = '#FF85A1'; casingDark = '#E0708A'; bezelColor = '#C55070';
      break;
    case 'casing_mint':
      casingColor = '#4ECDC4'; casingDark = '#3ABDB5'; bezelColor = '#2E9E96';
      break;
    case 'casing_galaxy':
      return `
        <!-- Galaxy casing with gradient effect -->
        <!-- Monitor body -->
        <rect x="38" y="30" width="124" height="100" rx="12" fill="url(#galaxyGrad)"/>
        <defs>
          <radialGradient id="galaxyGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stop-color="#9B59B6"/>
            <stop offset="50%" stop-color="#3498DB"/>
            <stop offset="100%" stop-color="#E74C3C"/>
          </radialGradient>
        </defs>
        <!-- Bezel/frame around screen -->
        <rect x="46" y="38" width="108" height="84" rx="8" fill="#1A0030"/>
        <!-- Stand neck -->
        <rect x="90" y="130" width="20" height="18" rx="3" fill="#7D3C98"/>
        <!-- Base -->
        <rect x="62" y="148" width="76" height="12" rx="6" fill="#6C3483"/>
        <!-- Power LED -->
        <circle cx="145" cy="124" r="3" fill="#FFE66D"/>
      `;
    default: // casing_default (warm beige)
      casingColor = '#FF6B35'; casingDark = '#E55A25'; bezelColor = '#CC4A1A';
      break;
  }
  return `
    <!-- Monitor body -->
    <rect x="38" y="30" width="124" height="100" rx="12" fill="${casingColor}"/>
    <!-- Bezel/frame around screen -->
    <rect x="46" y="38" width="108" height="84" rx="8" fill="${casingDark}"/>
    <!-- Stand neck -->
    <rect x="90" y="130" width="20" height="18" rx="3" fill="${casingDark}"/>
    <!-- Base -->
    <rect x="62" y="148" width="76" height="12" rx="6" fill="${bezelColor}"/>
    <!-- Power LED -->
    <circle cx="145" cy="124" r="3" fill="#2ECC71"/>
  `;
}

/** SCREEN / face layer */
function drawScreen(expression) {
  // Screen area: x=50, y=42, width=100, height=76 rx=6
  const screenBase = `<rect x="50" y="42" width="100" height="76" rx="6" fill="#E8F8FF"/>`;

  let eyes = '';
  let mouth = '';

  switch (expression) {
    case 'happy':
      eyes = `
        <!-- Happy eyes -->
        <circle cx="80" cy="68" r="10" fill="white"/>
        <circle cx="120" cy="68" r="10" fill="white"/>
        <circle cx="82" cy="70" r="6" fill="#2C3E50"/>
        <circle cx="122" cy="70" r="6" fill="#2C3E50"/>
        <!-- Eye shine -->
        <circle cx="84" cy="68" r="2.5" fill="white"/>
        <circle cx="124" cy="68" r="2.5" fill="white"/>
        <!-- Happy eyes crinkle -->
        <path d="M74 60 Q80 55 86 60" stroke="#2C3E50" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <path d="M114 60 Q120 55 126 60" stroke="#2C3E50" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      `;
      mouth = `<path d="M82 94 Q100 108 118 94" stroke="#FF6B35" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      break;

    case 'sad':
      eyes = `
        <!-- Sad eyes, slightly drooping -->
        <circle cx="80" cy="70" r="10" fill="white"/>
        <circle cx="120" cy="70" r="10" fill="white"/>
        <circle cx="80" cy="72" r="6" fill="#2C3E50"/>
        <circle cx="120" cy="72" r="6" fill="#2C3E50"/>
        <circle cx="82" cy="70" r="2.5" fill="white"/>
        <circle cx="122" cy="70" r="2.5" fill="white"/>
        <!-- Sad eyebrows -->
        <path d="M73 61 Q80 65 87 61" stroke="#2C3E50" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <path d="M113 61 Q120 65 127 61" stroke="#2C3E50" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <!-- Tear -->
        <ellipse cx="77" cy="82" rx="2" ry="4" fill="#87CEEB" opacity=".8"/>
      `;
      mouth = `<path d="M84 100 Q100 90 116 100" stroke="#2C3E50" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
      break;

    case 'surprised':
      eyes = `
        <!-- Surprised eyes (wide open) -->
        <circle cx="80" cy="67" r="13" fill="white"/>
        <circle cx="120" cy="67" r="13" fill="white"/>
        <circle cx="80" cy="67" r="8" fill="#2C3E50"/>
        <circle cx="120" cy="67" r="8" fill="#2C3E50"/>
        <circle cx="83" cy="64" r="3" fill="white"/>
        <circle cx="123" cy="64" r="3" fill="white"/>
        <!-- Raised eyebrows -->
        <path d="M70 51 Q80 46 90 51" stroke="#2C3E50" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M110 51 Q120 46 130 51" stroke="#2C3E50" stroke-width="2" fill="none" stroke-linecap="round"/>
      `;
      mouth = `<ellipse cx="100" cy="99" rx="8" ry="6" fill="#FF6B35"/>`;
      break;

    case 'blink':
      eyes = `
        <!-- Blink — eyes as lines -->
        <path d="M70 68 Q80 74 90 68" stroke="#2C3E50" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M110 68 Q120 74 130 68" stroke="#2C3E50" stroke-width="3" fill="none" stroke-linecap="round"/>
      `;
      mouth = `<path d="M83 94 Q100 104 117 94" stroke="#FF6B35" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
      break;

    case 'yawn':
      eyes = `
        <!-- Yawn — half-closed eyes -->
        <ellipse cx="80" cy="68" rx="10" ry="6" fill="white"/>
        <ellipse cx="120" cy="68" rx="10" ry="6" fill="white"/>
        <ellipse cx="80" cy="70" rx="6" ry="3.5" fill="#2C3E50"/>
        <ellipse cx="120" cy="70" rx="6" ry="3.5" fill="#2C3E50"/>
        <circle cx="82" cy="69" r="1.8" fill="white"/>
        <circle cx="122" cy="69" r="1.8" fill="white"/>
      `;
      mouth = `<ellipse cx="100" cy="99" rx="12" ry="9" fill="#FF6B35"/>
               <ellipse cx="100" cy="102" rx="8" ry="5" fill="#CC4A1A"/>`;
      break;

    default: // neutral
      eyes = `
        <!-- Neutral eyes -->
        <circle cx="80" cy="68" r="10" fill="white"/>
        <circle cx="120" cy="68" r="10" fill="white"/>
        <circle cx="82" cy="70" r="6" fill="#2C3E50"/>
        <circle cx="122" cy="70" r="6" fill="#2C3E50"/>
        <circle cx="84" cy="68" r="2.5" fill="white"/>
        <circle cx="124" cy="68" r="2.5" fill="white"/>
      `;
      mouth = `<path d="M86 96 Q100 103 114 96" stroke="#FF6B35" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
      break;
  }

  return `${screenBase}${eyes}${mouth}`;
}

/** FACE ACCESSORIES layer */
function drawFaceAccessories(equipped) {
  let svg = '';

  // Blush (behind glasses)
  if (equipped.face_blush) {
    svg += `
      <!-- Blush cheeks -->
      <ellipse cx="66" cy="84" rx="9" ry="6" fill="#FFB3A7" opacity=".65"/>
      <ellipse cx="134" cy="84" rx="9" ry="6" fill="#FFB3A7" opacity=".65"/>
    `;
  }

  // Face stickers
  if (equipped.face_sticker === 'face_star_stickers') {
    svg += `
      <!-- Star stickers on cheeks -->
      <text x="58" y="90" font-size="10" text-anchor="middle" aria-hidden="true">⭐</text>
      <text x="142" y="90" font-size="10" text-anchor="middle" aria-hidden="true">⭐</text>
    `;
  }

  // Mustache (below eyes, above mouth area)
  if (equipped.face_mustache) {
    svg += `
      <!-- Mustache -->
      <path d="M88 90 Q96 86 100 88 Q104 86 112 90" stroke="#4A3728" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M88 90 Q92 95 100 93 Q108 95 112 90" fill="#4A3728" opacity=".85"/>
    `;
  }

  // Glasses (over eyes)
  if (equipped.face_glasses === 'face_round_glasses') {
    svg += `
      <!-- Round glasses -->
      <circle cx="80" cy="68" r="12" fill="none" stroke="#4A3728" stroke-width="2.5"/>
      <circle cx="120" cy="68" r="12" fill="none" stroke="#4A3728" stroke-width="2.5"/>
      <line x1="92" y1="66" x2="108" y2="66" stroke="#4A3728" stroke-width="2"/>
      <line x1="60" y1="62" x2="68" y2="65" stroke="#4A3728" stroke-width="2"/>
      <line x1="132" y1="62" x2="140" y2="65" stroke="#4A3728" stroke-width="2"/>
    `;
  } else if (equipped.face_glasses === 'face_sunglasses') {
    svg += `
      <!-- Sunglasses -->
      <rect x="68" y="58" width="24" height="16" rx="8" fill="#1a1a1a"/>
      <rect x="108" y="58" width="24" height="16" rx="8" fill="#1a1a1a"/>
      <line x1="92" y1="64" x2="108" y2="64" stroke="#333" stroke-width="2.5"/>
      <line x1="60" y1="60" x2="68" y2="63" stroke="#333" stroke-width="2"/>
      <line x1="132" y1="60" x2="140" y2="63" stroke="#333" stroke-width="2"/>
      <!-- Lens sheen -->
      <path d="M71 61 Q76 60 80 62" stroke="white" stroke-width="1" fill="none" opacity=".4"/>
      <path d="M111 61 Q116 60 120 62" stroke="white" stroke-width="1" fill="none" opacity=".4"/>
    `;
  }

  return svg;
}

/** HEAD ACCESSORIES layer */
function drawHeadAccessory(itemId) {
  // Head accessories sit on top of the monitor (y < 30)
  switch (itemId) {
    case 'head_wizard_hat':
      return `
        <!-- Wizard hat -->
        <polygon points="100,2 70,34 130,34" fill="#6C3483"/>
        <rect x="58" y="32" width="84" height="10" rx="5" fill="#9B59B6"/>
        <!-- Star on hat -->
        <text x="100" y="22" font-size="12" text-anchor="middle" aria-hidden="true">⭐</text>
      `;
    case 'head_crown':
      return `
        <!-- Crown -->
        <polygon points="68,32 68,12 84,22 100,8 116,22 132,12 132,32" fill="#FFE66D"/>
        <!-- Crown gems -->
        <circle cx="84" cy="20" r="4" fill="#E74C3C"/>
        <circle cx="100" cy="11" r="4" fill="#3498DB"/>
        <circle cx="116" cy="20" r="4" fill="#2ECC71"/>
        <!-- Crown base -->
        <rect x="66" y="29" width="68" height="8" rx="2" fill="#F5D700"/>
      `;
    case 'head_bow':
      return `
        <!-- Bow/ribbon -->
        <ellipse cx="84" cy="20" rx="16" ry="10" fill="#FF69B4"/>
        <ellipse cx="116" cy="20" rx="16" ry="10" fill="#FF69B4"/>
        <circle cx="100" cy="20" r="8" fill="#FF1493"/>
        <!-- Bow tails -->
        <path d="M94 26 Q80 36 72 32" stroke="#FF69B4" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M106 26 Q120 36 128 32" stroke="#FF69B4" stroke-width="4" fill="none" stroke-linecap="round"/>
      `;
    case 'head_baseball_cap':
      return `
        <!-- Baseball cap -->
        <ellipse cx="100" cy="28" rx="52" ry="16" fill="#FF6B35"/>
        <!-- Cap brim -->
        <path d="M56 30 Q100 20 144 30" fill="#E55A25"/>
        <!-- Cap brim extension -->
        <ellipse cx="100" cy="31" rx="52" ry="8" fill="#E55A25"/>
        <!-- Button on top -->
        <circle cx="100" cy="13" r="4" fill="#CC4A1A"/>
        <!-- Stitching line -->
        <path d="M78 24 Q100 18 122 24" stroke="#CC4A1A" stroke-width="1.5" fill="none" stroke-dasharray="3,2"/>
      `;
    case 'head_headphones':
      return `
        <!-- Headphones -->
        <!-- Headband arc -->
        <path d="M56 60 Q56 10 100 10 Q144 10 144 60" stroke="#2C3E50" stroke-width="6" fill="none" stroke-linecap="round"/>
        <!-- Ear cups -->
        <rect x="44" y="52" width="20" height="24" rx="10" fill="#4ECDC4"/>
        <rect x="136" y="52" width="20" height="24" rx="10" fill="#4ECDC4"/>
        <!-- Ear cup detail -->
        <circle cx="54" cy="64" r="6" fill="#3ABDB5"/>
        <circle cx="146" cy="64" r="6" fill="#3ABDB5"/>
      `;
    default:
      return '';
  }
}

/** BODY ACCESSORIES layer — stickers on the casing bezel area */
function drawBodyAccessory(itemId) {
  // Body stickers placed on the casing below the screen (y: 115–138, x: 55–145)
  switch (itemId) {
    case 'body_lightning_stickers':
      return `
        <!-- Lightning stickers on casing -->
        <text x="65" y="128" font-size="13" text-anchor="middle" aria-hidden="true">⚡</text>
        <text x="135" y="128" font-size="13" text-anchor="middle" aria-hidden="true">⚡</text>
        <text x="100" y="143" font-size="11" text-anchor="middle" aria-hidden="true">⚡</text>
      `;
    case 'body_heart_stickers':
      return `
        <!-- Heart stickers on casing -->
        <text x="65" y="128" font-size="13" text-anchor="middle" aria-hidden="true">❤️</text>
        <text x="135" y="128" font-size="13" text-anchor="middle" aria-hidden="true">❤️</text>
        <text x="100" y="143" font-size="11" text-anchor="middle" aria-hidden="true">💕</text>
      `;
    case 'body_star_stickers':
      return `
        <!-- Star stickers on casing -->
        <text x="65" y="128" font-size="13" text-anchor="middle" aria-hidden="true">⭐</text>
        <text x="135" y="128" font-size="13" text-anchor="middle" aria-hidden="true">⭐</text>
        <text x="100" y="143" font-size="11" text-anchor="middle" aria-hidden="true">✨</text>
      `;
    default:
      return '';
  }
}

/**
 * Render Bitty into a container element.
 * Renders into a .bitty-svg-slot child div (creates it if absent)
 * so other children (e.g. speech bubbles) are preserved.
 *
 * @param {HTMLElement} container
 * @param {object} options
 *   expression: string
 *   equipped: object (equipped slots from pet state)
 *   size: 'sm'|'md'|'lg'  → used for aria and CSS class
 *   label: optional accessible label override
 */
export function renderBitty(container, options = {}) {
  const {
    expression = 'neutral',
    equipped = {},
    size = 'md',
    label = 'Bitty, teman virtual kamu',
  } = options;

  const eq = {
    head: equipped.head || null,
    face_glasses: equipped.face_glasses || null,
    face_blush: equipped.face_blush || null,
    face_mustache: equipped.face_mustache || null,
    face_sticker: equipped.face_sticker || null,
    body_sticker: equipped.body_sticker || null,
    casing: equipped.casing || 'casing_default',
    background: equipped.background || 'bg_default',
  };

  const svg = `
    <svg
      class="bitty-svg bitty-svg--${size}"
      viewBox="0 0 200 240"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="${label}"
    >
      <!-- Layer 1: Background -->
      ${drawBackground(eq.background)}

      <!-- Layer 2: Casing/body -->
      ${drawCasing(eq.casing)}

      <!-- Layer 3: Screen face -->
      ${drawScreen(expression)}

      <!-- Layer 4: Face accessories -->
      ${drawFaceAccessories(eq)}

      <!-- Layer 5: Head accessories -->
      ${drawHeadAccessory(eq.head)}

      <!-- Layer 6: Body accessories -->
      ${drawBodyAccessory(eq.body_sticker)}
    </svg>
  `;

  // Use a dedicated slot so other children (e.g. bubble) are preserved
  let slot = container.querySelector(':scope > .bitty-svg-slot');
  if (!slot) {
    slot = document.createElement('div');
    slot.className = 'bitty-svg-slot';
    // Insert as FIRST child so bubble stays on top of stack
    if (container.firstChild) {
      container.insertBefore(slot, container.firstChild);
    } else {
      container.appendChild(slot);
    }
  }
  slot.innerHTML = svg;
}

/**
 * Render a simple Bitty preview (no background, just the pet shape).
 * Used in item preview thumbnails.
 */
export function renderBittyThumb(container, equipped = {}, expression = 'happy') {
  renderBitty(container, { expression, equipped, size: 'sm', label: 'Pratinjau Bitty' });
}
