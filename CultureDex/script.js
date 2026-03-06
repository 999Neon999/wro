/* ═══════════════════════════════════════════════
   WORLD DANCE ATLAS — script.js (Enhanced)
   ═══════════════════════════════════════════════ */

const RARITY_ORDER = { Common: 0, Uncommon: 1, Rare: 2, Legendary: 3 };
const SKILL_ORDER  = { Beginner: 0, Intermediate: 1, Advanced: 2, Master: 3 };

function uImg(id, w = 800) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
}

const REGION_EMOJIS = {
  'South Asia': '🪷', 'Europe': '🌍', 'East Asia': '🌸',
  'South America': '🌺', 'Oceania': '🌊', 'North America': '🗽',
  'Southeast Asia': '🌴', 'Middle East': '🌙', 'Africa': '🦁'
};

const dances = [
  {
    id: 1, name: "Bharatanatyam", origin: "Tamil Nadu, India", region: "South Asia",
    type: "Classical", rarity: "Rare", skill: "Master", color: "#b36a2a", era: "2nd century BCE",
    img: uImg("1580489944761-15a19d674e81"), imgModal: uImg("1580489944761-15a19d674e81", 1200),
    description: "One of the oldest classical dance forms of India, Bharatanatyam is a synthesis of Nritta (pure dance), Nritya (expressive dance), and Natya (dance drama). Rooted in the Natya Shastra, it was historically performed by Devadasis in Hindu temples and later revived in the 20th century. Its hallmark is the use of mudras (hand gestures), intricate footwork, and expressive facial storytelling.",
    costumes: "Vibrant silk sarees, gold jewelry", music: "Carnatic classical",
    similar: ["Odissi", "Kathak", "Mohiniyattam"]
  },
  {
    id: 2, name: "Flamenco", origin: "Andalusia, Spain", region: "Europe",
    type: "Semi-Classical", rarity: "Uncommon", skill: "Advanced", color: "#8b1a1a", era: "18th century",
    img: uImg("1518834117_1572566167773-a65d7b91c571"), imgModal: uImg("1518834117_1572566167773-a65d7b91c571", 1200),
    description: "Born from the rich cultural confluence of Romani, Moorish, and Andalusian traditions, Flamenco is a passionate art of song (cante), dance (baile), and guitar (guitarra). The dancer's zapateado (foot-stamping), castanets, and dramatic hand movements express deep human emotions — joy, grief, longing. Recognized by UNESCO as Intangible Cultural Heritage.",
    costumes: "Ruffled bata de cola dress", music: "Flamenco guitar & cante jondo",
    similar: ["Tango", "Bolero", "Sevillanas"]
  },
  {
    id: 3, name: "Kabuki Dance", origin: "Japan", region: "East Asia",
    type: "Classical", rarity: "Rare", skill: "Master", color: "#1a2e5e", era: "Early 17th century",
    img: uImg("1528360983277-13d401cdc186"), imgModal: uImg("1528360983277-13d401cdc186", 1200),
    description: "Kabuki is a classical Japanese theatre form with highly stylized dance and drama, celebrated for its elaborate kumadori makeup, ornate costumes, and exaggerated movements. Originating in the Edo period, female roles (onnagata) are traditionally performed by male actors. Each gesture carries deep symbolic meaning, making it one of the world's most visually striking performance arts.",
    costumes: "Elaborate kimono & wigs", music: "Shamisen & taiko drums",
    similar: ["Noh Theatre", "Butoh", "Bon Odori"]
  },
  {
    id: 4, name: "Samba", origin: "Brazil", region: "South America",
    type: "Folk", rarity: "Common", skill: "Beginner", color: "#9a6a00", era: "Late 19th century",
    img: uImg("1518834117_1547826005073-a85e2c0d3c20"), imgModal: uImg("1518834117_1547826005073-a85e2c0d3c20", 1200),
    description: "Samba is the pulsating heartbeat of Brazil — an exuberant dance and music genre born from African rhythms blended with European and indigenous influences. During Rio's Carnival, samba schools compete with enormous floats, sequined costumes, and thousands of synchronized dancers. The basic step involves a rapid three-step weight transfer full of infectious joy.",
    costumes: "Feathered, sequined outfits", music: "Surdo drums, tamborim, cavaquinho",
    similar: ["Forró", "Axé", "Baião"]
  },
  {
    id: 5, name: "Haka", origin: "New Zealand (Māori)", region: "Oceania",
    type: "Ceremonial", rarity: "Rare", skill: "Intermediate", color: "#2a5a30", era: "Pre-18th century",
    img: uImg("1531685250784-7569952593d2"), imgModal: uImg("1531685250784-7569952593d2", 1200),
    description: "The Haka is a powerful ceremonial dance of the Māori people of New Zealand. Far more than a war dance, it encompasses welcoming guests, celebrating achievements, and funerals. Performed with thunderous foot-stomping, protruding tongues (whetero), wide eyes (pūkana), and chanted verses, the Haka commands elemental presence that stops time.",
    costumes: "Traditional tā moko tattoos, piupiu skirts", music: "Chanted vocals only",
    similar: ["Poi", "Kapa Haka", "Siva Samoa"]
  },
  {
    id: 6, name: "Kathak", origin: "North India", region: "South Asia",
    type: "Classical", rarity: "Rare", skill: "Master", color: "#6a2a8a", era: "3rd century BCE",
    img: uImg("1542103749-8ef59b94f47e"), imgModal: uImg("1542103749-8ef59b94f47e", 1200),
    description: "Kathak, meaning 'storyteller', traces its roots to the wandering bards of ancient India who narrated epics through gesture and movement. Later refined in the Mughal courts, Kathak fused Hindu temple traditions with Persian aesthetics. It is celebrated for its rapid pirouettes (chakkar), intricate footwork echoing tabla rhythms, and expressive abhinaya.",
    costumes: "Ghunghroo-adorned anklets, ghagra-choli", music: "Hindustani classical",
    similar: ["Bharatanatyam", "Odissi", "Manipuri"]
  },
  {
    id: 7, name: "Breakdancing", origin: "New York, USA", region: "North America",
    type: "Street", rarity: "Common", skill: "Advanced", color: "#1a3a6a", era: "1970s",
    img: uImg("1545412595-6d9b72f6c3c1"), imgModal: uImg("1545412595-6d9b72f6c3c1", 1200),
    description: "Breaking (B-boying/B-girling) emerged in the South Bronx as a cornerstone of hip-hop culture. Pioneered by DJ Kool Herc's block parties, it features toprock (upright footwork), downrock (floor footwork), power moves (windmills, headspins), and freezes. Breaking became an Olympic sport at Paris 2024, cementing its global legitimacy as an athletic art form.",
    costumes: "Streetwear, sneakers", music: "Hip-hop breakbeats",
    similar: ["Popping & Locking", "Waacking", "Capoeira"]
  },
  {
    id: 8, name: "Odissi", origin: "Odisha, India", region: "South Asia",
    type: "Classical", rarity: "Rare", skill: "Master", color: "#1a4a6e", era: "2nd century BCE",
    img: uImg("1584727638096-9f4b2619f13e"), imgModal: uImg("1584727638096-9f4b2619f13e", 1200),
    description: "Odissi is one of the oldest surviving dance forms, with evidence in rock-cut caves of Udayagiri dating to the 2nd century BCE. Characterized by the tribhangi (three-body-bend) posture and the chowk (square stance), Odissi is lyrical and sculpturesque — movements seem to come alive from temple friezes. It celebrates the eternal love of Radha and Krishna.",
    costumes: "Silver filigree jewelry, silk saree", music: "Odissi classical (Odishi)",
    similar: ["Bharatanatyam", "Manipuri", "Sattriya"]
  },
  {
    id: 9, name: "Tango", origin: "Buenos Aires, Argentina", region: "South America",
    type: "Semi-Classical", rarity: "Uncommon", skill: "Intermediate", color: "#5a3a20", era: "1880s",
    img: uImg("1508700115892-45ecd05ae2ad"), imgModal: uImg("1508700115892-45ecd05ae2ad", 1200),
    description: "Tango was born in the slums (arrabales) of Buenos Aires, emerging from African candombe, European immigrant dances, and the Argentine milonga. It is a dance of tension and surrender — partners locked in a close embrace, responding to each other's weight and breath. The sharp head-snaps (cabeceo), leg flicks (ganchos), and dramatic pauses make Tango unmistakable.",
    costumes: "Fitted suits, split-hem gowns", music: "Bandoneón-led orchestras",
    similar: ["Flamenco", "Milonga", "Vals Cruzado"]
  },
  {
    id: 10, name: "Legong", origin: "Bali, Indonesia", region: "Southeast Asia",
    type: "Classical", rarity: "Legendary", skill: "Master", color: "#8a6000", era: "19th century",
    img: uImg("1537996008257-740b8e3bba72"), imgModal: uImg("1537996008257-740b8e3bba72", 1200),
    description: "Legong is Bali's most refined and sacred classical dance, traditionally performed by prepubescent girls in the royal courts. The dance depicts tales from Balinese Hindu mythology with extraordinary precision — every finger trembles (agem), eyes dart rapidly (seledet), and the entire body expresses layered narrative. Costumes are breathtakingly ornate, requiring hours to assemble.",
    costumes: "Gold-painted headdresses, gilded silk", music: "Gamelan orchestra",
    similar: ["Barong", "Kecak", "Topeng"]
  },
  {
    id: 11, name: "Kecak", origin: "Bali, Indonesia", region: "Southeast Asia",
    type: "Ceremonial", rarity: "Legendary", skill: "Advanced", color: "#8a3a00", era: "1930s",
    img: uImg("1555400038-63f5ba517a47"), imgModal: uImg("1555400038-63f5ba517a47", 1200),
    description: "Kecak is a ritual dance-drama featuring a chorus of 50–150 men chanting 'cak' in rhythmic interlocking patterns — no musical instruments, only voice. Developed from the trance ritual Sanghyang, it tells of Prince Rama's battle against the demon king Rawana, with the chorus embodying the monkey army. Performed at sunset at Uluwatu Temple, it is unforgettable.",
    costumes: "Black-and-white checkered cloth", music: "A cappella choral chanting",
    similar: ["Legong", "Barong", "Kathakali"]
  },
  {
    id: 12, name: "Whirling Dervishes", origin: "Turkey (Sufi tradition)", region: "Middle East",
    type: "Ceremonial", rarity: "Legendary", skill: "Advanced", color: "#3a3a6a", era: "13th century",
    img: uImg("1524492518831-b374490d4f43"), imgModal: uImg("1524492518831-b374490d4f43", 1200),
    description: "The Sema ceremony of the Mevlevi Order is a moving meditation in the form of whirling. Dressed in white flowing robes (tennure) symbolizing the ego's shroud, and tall felt hats (sikke) representing tombstones, dervishes spin counterclockwise for extended periods, one hand raised to receive divine grace, one lowered to channel it to Earth. A UNESCO-recognized practice.",
    costumes: "White tennure robe, felt sikke hat", music: "Ney flute & reed instruments",
    similar: ["Kecak", "Zaouli", "Adumu (Maasai)"]
  },
  {
    id: 13, name: "Capoeira", origin: "Brazil (Afro-Brazilian)", region: "South America",
    type: "Street", rarity: "Uncommon", skill: "Advanced", color: "#2a6a10", era: "16th century",
    img: uImg("1544140708-514e62e4e6e0"), imgModal: uImg("1544140708-514e62e4e6e0", 1200),
    description: "Capoeira is a unique Afro-Brazilian martial art disguised as dance. Enslaved Africans in 16th-century Brazil developed it as self-defense, masking combat training as music and dance to deceive slave owners. Players (capoeiristas) engage in a fluid 'jogo' of acrobatic kicks, sweeps, and dodges within a circle (roda), accompanied by the hypnotic berimbau bow instrument.",
    costumes: "White abadá uniform", music: "Berimbau, atabaque, pandeiro",
    similar: ["Breakdancing", "Samba", "Locking"]
  },
  {
    id: 14, name: "Tinkling", origin: "Philippines", region: "Southeast Asia",
    type: "Folk", rarity: "Uncommon", skill: "Intermediate", color: "#1a6a30", era: "Pre-colonial",
    img: uImg("1518834117_1516832700752-c7c35d1c2a8b"), imgModal: uImg("1518834117_1516832700752-c7c35d1c2a8b", 1200),
    description: "The Philippines' national dance mimics the graceful movements of the tikling bird weaving between bamboo traps set by farmers. Two people rhythmically clap and slide two long bamboo poles together while a dancer nimbly steps in and out between them, barefoot. The dance requires extraordinary agility, rhythm, and split-second timing — the poles are struck at increasing speeds.",
    costumes: "Balintawak dress or barong tagalog", music: "Rondalla ensemble",
    similar: ["Maglalatik", "Singkil", "Pandanggo"]
  },
  {
    id: 15, name: "Mohiniyattam", origin: "Kerala, India", region: "South Asia",
    type: "Classical", rarity: "Rare", skill: "Master", color: "#8a7000", era: "16th century",
    img: uImg("1603302576837-37d728ee7861"), imgModal: uImg("1603302576837-37d728ee7861", 1200),
    description: "Mohiniyattam ('Dance of the Enchantress') is a graceful classical dance of Kerala, traditionally performed exclusively by women. Named after the divine enchantress Mohini (an avatar of Vishnu), it is distinguished by its soft, swaying lasya movements, white and gold costume, and mesmerizing eye movements. The rhythm follows the sopana style of Kerala's ancient temple music.",
    costumes: "White and gold kasavu saree", music: "Sopana sangeetham",
    similar: ["Bharatanatyam", "Odissi", "Kathakali"]
  },
  {
    id: 16, name: "Hula", origin: "Hawaii, USA", region: "Oceania",
    type: "Folk", rarity: "Common", skill: "Beginner", color: "#007a50", era: "Ancient Polynesia",
    img: uImg("1505661037935-fa66e4de6cb3"), imgModal: uImg("1505661037935-fa66e4de6cb3", 1200),
    description: "Hula is the heartbeat of Hawaiian culture — a living library of history, myth, and spiritual connection to the land (ʻāina). The ancient form (hula kahiko) uses chant and traditional percussion; the modern form (hula ʻauana) incorporates ukulele and guitar. The fluid arm movements narrate stories of creation, nature, and royalty with profound poetry.",
    costumes: "Ti-leaf skirts, leis, kupe'e anklets", music: "Ipu gourd drum, chant",
    similar: ["Siva Samoa", "Tahitian dance", "Poi"]
  },
  {
    id: 17, name: "Popping & Locking", origin: "California, USA", region: "North America",
    type: "Street", rarity: "Common", skill: "Intermediate", color: "#1a3a7a", era: "1970s",
    img: uImg("1547153760-18fc86324498"), imgModal: uImg("1547153760-18fc86324498", 1200),
    description: "Popping emerged in Fresno with Sam Solomon ('Boogaloo Sam'), characterized by quick muscle contractions to create a 'pop'. Locking (invented by Don Campbell) uses sudden freezes ('locks') followed by relaxed grooves. Together they form the backbone of street funk styles, drawing on cartoons, robots, and mime to create a uniquely American vernacular art form.",
    costumes: "Bright-colored, loose-fitting streetwear", music: "Funk, electronic",
    similar: ["Breakdancing", "Waacking", "Voguing"]
  },
  {
    id: 18, name: "Cossack Dance (Hopak)", origin: "Ukraine", region: "Europe",
    type: "Folk", rarity: "Uncommon", skill: "Advanced", color: "#7a6000", era: "16th–17th century",
    img: uImg("1544535830-9df3f39c8821"), imgModal: uImg("1544535830-9df3f39c8821", 1200),
    description: "The Hopak is Ukraine's national dance — a joyful, explosive folk dance born among the Zaporozhian Cossacks. Male dancers perform spectacular squat-kicks (prysiadky), acrobatic leaps, and spins. Female dancers move with graceful, sweeping arms and stepping patterns. The dance celebrates freedom, strength, and the indomitable Cossack warrior spirit.",
    costumes: "Embroidered vyshyvanka, wide trousers", music: "Bandura, tsymbaly (dulcimer)",
    similar: ["Lezginka", "Khorovod", "Krakoviak"]
  },
  {
    id: 19, name: "Kathakali", origin: "Kerala, India", region: "South Asia",
    type: "Classical", rarity: "Legendary", skill: "Master", color: "#7a1a00", era: "17th century",
    img: uImg("1518834117_1552058744860-ecb9ac77e7f0"), imgModal: uImg("1518834117_1552058744860-ecb9ac77e7f0", 1200),
    description: "Kathakali is perhaps the world's most visually dramatic classical dance-theatre. Performers wear monumental face paint (chutti) built layer by layer over 4–6 hours, massive costumes, and towering headdresses. Every eye movement, facial micro-expression, and hand gesture (mudra) conveys narrative. Stories from the Mahabharata and Ramayana are enacted through all-night performances.",
    costumes: "Towering chutti makeup, 30kg costumes", music: "Chenda & maddalam drums",
    similar: ["Mohiniyattam", "Bharatanatyam", "Kecak"]
  },
  {
    id: 20, name: "Voguing", origin: "New York, USA", region: "North America",
    type: "Street", rarity: "Uncommon", skill: "Advanced", color: "#6a1a6a", era: "1970s–80s",
    img: uImg("1547472081-cae8b5ba9ad9"), imgModal: uImg("1547472081-cae8b5ba9ad9", 1200),
    description: "Voguing emerged in Harlem's underground ballroom scene, created by LGBTQ+ Black and Latinx communities. Inspired by the poses in Vogue magazine, it features sharp angular arm movements, dramatic runway walks, 'dips' (sudden floor drops), and elaborate 'death drops'. The ballroom culture's houses (chosen families) compete in categories — a vibrant subculture made global by Madonna.",
    costumes: "High fashion, avant-garde couture", music: "House music, electronic beats",
    similar: ["Waacking", "Popping & Locking", "Breakdancing"]
  },
  {
    id: 21, name: "Adumu (Maasai)", origin: "Kenya & Tanzania", region: "Africa",
    type: "Ceremonial", rarity: "Rare", skill: "Beginner", color: "#8a4a00", era: "Ancient, pre-colonial",
    img: uImg("1516026672322-5c0cf3ed1f3e"), imgModal: uImg("1516026672322-5c0cf3ed1f3e", 1200),
    description: "The Adumu is the iconic jumping ceremony of the Maasai warriors (morans), performed during the Eunoto coming-of-age ceremony. Warriors stand in a circle, one or two at a time entering the center to leap as high as possible while singing and chanting. The jumps are competitive — the highest jumper earns the most respect. Red shuka cloth and beaded jewelry flutter with each leap.",
    costumes: "Red shuka, elaborate beadwork", music: "Throat-singing chants",
    similar: ["Haka", "Kecak", "Zaouli"]
  },
  {
    id: 22, name: "Zaouli", origin: "Côte d'Ivoire (Guro people)", region: "Africa",
    type: "Ceremonial", rarity: "Legendary", skill: "Advanced", color: "#7a5500", era: "Mid-20th century",
    img: uImg("1547471080-fbbd-4d26-ab49-abe24ffe61f4"), imgModal: uImg("1547471080-fbbd-4d26-ab49-abe24ffe61f4", 1200),
    description: "Zaouli is a sacred masked dance of the Guro people, recognized by UNESCO as Intangible Cultural Heritage. The dancer wears an ornate painted wooden mask and performs breathtaking footwork of extraordinary speed and complexity — feet seem to blur as they execute precise patterns. The dance channels spiritual forces for community healing at funerals and festivities.",
    costumes: "Sacred wooden mask, raffia skirt", music: "Flutes, percussion ensemble",
    similar: ["Adumu (Maasai)", "Kecak", "Haka"]
  },
  {
    id: 23, name: "Waltz", origin: "Vienna, Austria", region: "Europe",
    type: "Semi-Classical", rarity: "Common", skill: "Beginner", color: "#4a3a7a", era: "Late 18th century",
    img: uImg("1504609813442-a8924e83f76e"), imgModal: uImg("1504609813442-a8924e83f76e", 1200),
    description: "The Waltz scandalized 18th-century Europe: partners daring to hold each other in a closed embrace! Originating from Austrian Ländler folk dances, the Viennese Waltz was the first ballroom dance where couples rotated together. Its 3/4 time signature, continuous rotation, and flowing momentum made it the most popular social dance of the 19th century — and it endures.",
    costumes: "Evening gowns, white tie & tails", music: "Johann Strauss waltzes",
    similar: ["Tango", "Foxtrot", "Viennese Waltz"]
  },
  {
    id: 24, name: "Butoh", origin: "Japan", region: "East Asia",
    type: "Contemporary", rarity: "Legendary", skill: "Advanced", color: "#2a2a2a", era: "Late 1950s",
    img: uImg("1583743814966-8d20eb5be2b4"), imgModal: uImg("1583743814966-8d20eb5be2b4", 1200),
    description: "Butoh (Dance of Darkness) was born from Japan's post-WWII trauma. Founded by Tatsumi Hijikata, it is a visceral avant-garde art involving extreme slow movement, contorted body forms, white body paint, and unsettling imagery. Butoh confronts death, taboo, and the grotesque. There are no rules — each performer's interpretation is radically unique, making every performance unrepeatable.",
    costumes: "White body paint, minimal or elaborate", music: "Experimental, silence, soundscape",
    similar: ["Kabuki Dance", "Voguing", "Contemporary"]
  }
];

/* ── STATE ── */
let activeType  = 'all';
let activeSort  = 'default';
let searchQuery = '';
let viewMode    = 'grid';

/* ── PAGE LOADER ── */
function initLoader() {
  const loader = document.getElementById('pageLoader');
  const fill   = document.getElementById('loaderFill');
  if (!loader || !fill) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 22;
    if (progress > 95) progress = 95;
    fill.style.width = progress + '%';
  }, 80);

  window.addEventListener('load', () => {
    clearInterval(interval);
    fill.style.width = '100%';
    setTimeout(() => loader.classList.add('hidden'), 350);
  });

  setTimeout(() => {
    clearInterval(interval);
    fill.style.width = '100%';
    loader.classList.add('hidden');
  }, 2200);
}

/* ── CUSTOM CURSOR ── */
function initCursor() {
  const cursor = document.getElementById('customCursor');
  const trail  = document.getElementById('cursorTrail');
  if (!cursor || !trail) return;

  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    trailX += (e.clientX - trailX) * 0.14;
    trailY += (e.clientY - trailY) * 0.14;
    trail.style.left = trailX + 'px';
    trail.style.top  = trailY + 'px';
  });

  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
  });
  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  // Smooth trail animation
  function animTrail() {
    trail.style.left = trailX + 'px';
    trail.style.top  = trailY + 'px';
    requestAnimationFrame(animTrail);
  }
  animTrail();
}

/* ── HERO CANVAS ── */
function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

  const orbs = Array.from({ length: 22 }, () => ({
    x: Math.random(), y: Math.random(),
    r: 70 + Math.random() * 160,
    vx: (Math.random() - 0.5) * 0.00025,
    vy: (Math.random() - 0.5) * 0.00025,
    hue: Math.floor(Math.random() * 360),
    opacity: 0.05 + Math.random() * 0.09,
  }));

  // Floating particles
  const particles = Array.from({ length: 28 }, () => ({
    x: Math.random(), y: Math.random(),
    r: 1 + Math.random() * 2,
    vy: -0.0002 - Math.random() * 0.0003,
    vx: (Math.random() - 0.5) * 0.0001,
    opacity: 0.1 + Math.random() * 0.25,
  }));

  function draw(t) {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    orbs.forEach(o => {
      o.x += o.vx; o.y += o.vy;
      if (o.x < -0.15) o.x = 1.15;
      if (o.x > 1.15)  o.x = -0.15;
      if (o.y < -0.15) o.y = 1.15;
      if (o.y > 1.15)  o.y = -0.15;
      const pulse = 0.85 + 0.15 * Math.sin(t * 0.0008 + o.hue * 0.05);
      const gr = ctx.createRadialGradient(o.x*w, o.y*h, 0, o.x*w, o.y*h, o.r * pulse);
      const alpha = isDark() ? o.opacity * 0.45 : o.opacity;
      gr.addColorStop(0, `hsla(${o.hue},55%,58%,${alpha})`);
      gr.addColorStop(1, `hsla(${o.hue},55%,58%,0)`);
      ctx.beginPath();
      ctx.arc(o.x*w, o.y*h, o.r * pulse, 0, Math.PI*2);
      ctx.fillStyle = gr;
      ctx.fill();
    });

    // Particles
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
      ctx.beginPath();
      ctx.arc(p.x*w, p.y*h, p.r, 0, Math.PI*2);
      const alpha = isDark() ? p.opacity * 0.5 : p.opacity * 0.35;
      ctx.fillStyle = `rgba(180,120,60,${alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

/* ── FLOATING BADGES ── */
function initFloatBadges() {
  const container = document.getElementById('floatBadges');
  if (!container) return;
  const regions = [...new Set(dances.map(d => d.region))];
  const positions = [
    { top: '12%', left: '5%',  dur: '6s',  delay: '0s'   },
    { top: '22%', right: '6%', dur: '7.5s', delay: '1.2s' },
    { top: '42%', left: '3%',  dur: '5.5s', delay: '2.1s' },
    { top: '58%', right: '4%', dur: '8s',  delay: '0.5s'  },
    { top: '72%', left: '7%',  dur: '6.8s', delay: '1.8s' },
    { top: '80%', right: '8%', dur: '7s',  delay: '3s'    },
  ];
  regions.slice(0, 6).forEach((region, i) => {
    const el = document.createElement('div');
    el.className = 'float-badge';
    const emoji = REGION_EMOJIS[region] || '🌍';
    el.textContent = `${emoji} ${region}`;
    const pos = positions[i] || positions[0];
    Object.assign(el.style, pos, {
      animationDuration: pos.dur,
      animationDelay: pos.delay,
    });
    container.appendChild(el);
  });
}

/* ── HELPERS ── */
function rarityClass(r) { return `badge-rarity-${r.toLowerCase()}`; }
function skillClass(s)  { return `badge-skill-${s.toLowerCase()}`; }
function pipClass(r)    { return `pip-${r.toLowerCase()}`; }

function buildRhythmBars(n = 36) {
  return Array.from({ length: n }, (_, i) => {
    const h1 = 3 + Math.random() * 8;
    const h2 = 10 + Math.random() * 32;
    const d  = 0.6 + Math.random() * 1.5;
    const delay = (i / n * 1.4).toFixed(2);
    return `<div class="rbar" style="--h1:${h1}px;--h2:${h2}px;--d:${d}s;animation-delay:-${delay}s"></div>`;
  }).join('');
}

/* ── RENDER GRID ── */
function renderGrid() {
  const grid = document.getElementById('danceGrid');
  let filtered = [...dances];

  if (activeType !== 'all') filtered = filtered.filter(d => d.type === activeType);

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.origin.toLowerCase().includes(q) ||
      d.region.toLowerCase().includes(q) ||
      d.type.toLowerCase().includes(q) ||
      d.rarity.toLowerCase().includes(q) ||
      d.era.toLowerCase().includes(q)
    );
  }

  if (activeSort === 'alpha-asc')   filtered.sort((a,b) => a.name.localeCompare(b.name));
  else if (activeSort === 'alpha-desc')  filtered.sort((a,b) => b.name.localeCompare(a.name));
  else if (activeSort === 'rarity-asc')  filtered.sort((a,b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]);
  else if (activeSort === 'rarity-desc') filtered.sort((a,b) => RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity]);
  else if (activeSort === 'skill-asc')   filtered.sort((a,b) => SKILL_ORDER[a.skill] - SKILL_ORDER[b.skill]);
  else if (activeSort === 'skill-desc')  filtered.sort((a,b) => SKILL_ORDER[b.skill] - SKILL_ORDER[a.skill]);

  const count = document.getElementById('resultsCount');
  const title = document.getElementById('sectionTitle');
  if (count) count.textContent = `${filtered.length} dance${filtered.length !== 1 ? 's' : ''}`;
  if (title) title.textContent = activeType === 'all' ? 'All Dance Forms' : `${activeType} Dances`;

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <span class="nr-icon">🎭</span>
        <h3>No dances found</h3>
        <p>Try adjusting your filters or search query.</p>
        <button onclick="clearAllFilters()">Clear all filters</button>
      </div>`;
    return;
  }

  filtered.forEach((dance, i) => {
    const tile = document.createElement('div');
    tile.className = 'dance-tile';
    tile.style.animationDelay = `${i * 0.042}s`;
    tile.dataset.id = dance.id;

    const regionEmoji = REGION_EMOJIS[dance.region] || '🌍';

    tile.innerHTML = `
      <div class="tile-banner" style="background: linear-gradient(140deg, ${dance.color}55, ${dance.color}22);">
        <img
          class="tile-img"
          src="${dance.img}"
          alt="${dance.name} dance"
          loading="lazy"
          onerror="this.style.display='none';"
        >
        <div class="tile-img-overlay"></div>
        <div class="tile-rarity-pip ${pipClass(dance.rarity)}"></div>
        <div class="tile-type-badge">${dance.type}</div>
        <div class="tile-explore">Explore →</div>
      </div>
      <div class="tile-body">
        <div class="tile-top-row">
          <span class="tile-era">${dance.era}</span>
          <span class="tile-region">${regionEmoji} ${dance.region}</span>
        </div>
        <div class="tile-name">${dance.name}</div>
        <div class="tile-origin">📍 ${dance.origin}</div>
        <div class="tile-rule"></div>
        <div class="tile-badges">
          <span class="badge ${rarityClass(dance.rarity)}">${dance.rarity}</span>
          <span class="badge ${skillClass(dance.skill)}">${dance.skill}</span>
        </div>
      </div>
    `;
    tile.addEventListener('click', () => openModal(dance.id));
    grid.appendChild(tile);
  });
}

function clearAllFilters() {
  searchQuery = '';
  activeType  = 'all';
  activeSort  = 'default';
  document.getElementById('searchInput').value = '';
  document.getElementById('sortSelect').value  = 'default';
  document.getElementById('searchClear').classList.remove('visible');
  document.querySelectorAll('[data-filter-type]').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-filter-type="all"]').classList.add('active');
  renderGrid();
}

/* ── MODAL ── */
function openModal(id) {
  const dance = dances.find(d => d.id === id);
  if (!dance) return;

  const banner = document.getElementById('modalBanner');
  banner.innerHTML = `
    <img
      class="modal-img"
      src="${dance.imgModal}"
      alt="${dance.name}"
      onerror="this.style.display='none';"
    >
    <div class="modal-img-overlay"></div>
    <div class="modal-rhythm">${buildRhythmBars()}</div>
    <div class="modal-banner-text">
      <div class="modal-banner-type">${dance.type} · ${dance.region}</div>
      <div class="modal-banner-name">${dance.name}</div>
    </div>
    <button class="modal-close" id="modalClose" aria-label="Close">✕</button>
  `;
  // Fallback banner color
  banner.style.background = `linear-gradient(140deg, ${dance.color}cc, ${dance.color}44)`;

  document.getElementById('modalClose').addEventListener('click', closeModal);

  document.getElementById('modalEyebrow').textContent    = dance.region;
  document.getElementById('modalTitle').textContent      = dance.name;
  document.getElementById('modalOriginLine').innerHTML   = `📍 ${dance.origin} &nbsp;·&nbsp; ${dance.era}`;
  document.getElementById('modalDesc').textContent       = dance.description;

  document.getElementById('modalBadgesRow').innerHTML = `
    <span class="badge ${rarityClass(dance.rarity)}">${dance.rarity}</span>
    <span class="badge ${skillClass(dance.skill)}">${dance.skill} level</span>
    <span class="badge badge-rarity-common" style="background:transparent;border:1px solid var(--warm-border);color:var(--muted);">${dance.type}</span>
  `;

  document.getElementById('modalFacts').innerHTML = `
    <div class="fact-item">
      <div class="fact-label">Origin Era</div>
      <div class="fact-value">${dance.era}</div>
    </div>
    <div class="fact-item">
      <div class="fact-label">Region</div>
      <div class="fact-value">${REGION_EMOJIS[dance.region] || ''} ${dance.region}</div>
    </div>
    <div class="fact-item">
      <div class="fact-label">Costumes</div>
      <div class="fact-value">${dance.costumes}</div>
    </div>
    <div class="fact-item">
      <div class="fact-label">Music</div>
      <div class="fact-value">${dance.music}</div>
    </div>
  `;

  const similarDiv = document.getElementById('modalSimilar');
  similarDiv.innerHTML = '';
  dance.similar.forEach(name => {
    const found = dances.find(d => d.name === name);
    const chip = document.createElement('button');
    chip.className = 'similar-chip';
    chip.innerHTML = `<span>${name}</span>`;
    if (found) chip.addEventListener('click', () => openModal(found.id));
    else chip.style.opacity = '0.5';
    similarDiv.appendChild(chip);
  });

  const overlay = document.getElementById('modalOverlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('modalEl').scrollTop = 0;
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── THEME ── */
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const html   = document.documentElement;
  const saved  = localStorage.getItem('dance-theme') || 'light';
  html.setAttribute('data-theme', saved);

  toggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('dance-theme', next);
  });
}

/* ── VIEW TOGGLE ── */
function initViewToggle() {
  const gridBtn = document.getElementById('viewGrid');
  const listBtn = document.getElementById('viewList');
  const grid    = document.getElementById('danceGrid');
  if (!gridBtn || !listBtn) return;

  gridBtn.addEventListener('click', () => {
    viewMode = 'grid';
    grid.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
  });
  listBtn.addEventListener('click', () => {
    viewMode = 'list';
    grid.classList.add('list-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
  });
}

/* ── BACK TO TOP ── */
function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── COUNTER ANIMATION ── */
function initCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = +el.dataset.target;
    let current = 0;
    const step = Math.max(1, target / 45);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.round(current);
      if (current >= target) clearInterval(timer);
    }, 28);
  });
}

/* ── STICKY CONTROLS GLOW ── */
function initControlsGlow() {
  const controls = document.getElementById('controls');
  if (!controls) return;
  window.addEventListener('scroll', () => {
    controls.style.boxShadow = window.scrollY > 80
      ? '0 4px 32px rgba(0,0,0,0.12)'
      : 'none';
  });
}

/* ── KEYBOARD NAVIGATION IN MODAL ── */
function initKeyboardNav() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
    if (e.key === '/' && !document.getElementById('modalOverlay').classList.contains('open')) {
      e.preventDefault();
      document.getElementById('searchInput').focus();
    }
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initCanvas();
  initTheme();
  initFloatBadges();
  initViewToggle();
  initBackTop();
  initCounters();
  initControlsGlow();
  initKeyboardNav();
  renderGrid();

  // Modal overlay close
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });

  // Filter pills
  document.querySelectorAll('[data-filter-type]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter-type]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeType = btn.dataset.filterType;
      renderGrid();
    });
  });

  // Sort
  document.getElementById('sortSelect').addEventListener('change', e => {
    activeSort = e.target.value;
    renderGrid();
  });

  // Search with debounce
  let searchTimeout;
  document.getElementById('searchInput').addEventListener('input', e => {
    searchQuery = e.target.value;
    const clearBtn = document.getElementById('searchClear');
    clearBtn.classList.toggle('visible', searchQuery.length > 0);
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(renderGrid, 160);
  });

  // Clear search
  document.getElementById('searchClear').addEventListener('click', () => {
    searchQuery = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('searchClear').classList.remove('visible');
    renderGrid();
    document.getElementById('searchInput').focus();
  });
});