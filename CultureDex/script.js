const RARITY_ORDER = { Common: 0, Uncommon: 1, Rare: 2, Legendary: 3 };
const SKILL_ORDER  = { Beginner: 0, Intermediate: 1, Advanced: 2, Master: 3 };

const dances = [
  {
    id: 1, name: "Bharatanatyam", origin: "Tamil Nadu, India", type: "Classical",
    rarity: "Rare", skill: "Master", emoji: "🪷",
    color: "#f5d4a0",
    description: "One of the oldest classical dance forms of India, Bharatanatyam is a synthesis of Nritta (pure dance), Nritya (expressive dance), and Natya (dance drama). Rooted in the Natya Shastra, this ancient art form was historically performed by Devadasis in Hindu temples and later revived in the 20th century. Its hallmark is the use of mudras (hand gestures), intricate footwork, and expressive facial storytelling.",
    origin_era: "2nd century BCE", costumes: "Vibrant silk sarees, gold jewelry", music: "Carnatic classical",
    similar: ["Odissi", "Kuchipudi", "Mohiniyattam"]
  },
  {
    id: 2, name: "Flamenco", origin: "Andalusia, Spain", type: "Semi-Classical",
    rarity: "Uncommon", skill: "Advanced", emoji: "🌹",
    color: "#f0b8a0",
    description: "Born from the rich cultural confluence of Romani, Moorish, and Andalusian traditions in southern Spain, Flamenco is a passionate art of song (cante), dance (baile), and guitar (guitarra). The dancer's zapateado (foot-stamping), castanets, and dramatic hand movements express deep human emotions — joy, grief, longing. Recognized by UNESCO as Intangible Cultural Heritage.",
    origin_era: "18th century", costumes: "Ruffled bata de cola dress", music: "Flamenco guitar & cante jondo",
    similar: ["Tango", "Sevillanas", "Bulería"]
  },
  {
    id: 3, name: "Kabuki Dance", origin: "Japan", type: "Classical",
    rarity: "Rare", skill: "Master", emoji: "🎭",
    color: "#c8d8f0",
    description: "Kabuki is a classical Japanese theatre form with highly stylized dance and drama, celebrated for its elaborate makeup (kumadori), ornate costumes, and exaggerated movements. Originating in the Edo period, female roles (onnagata) are traditionally performed by male actors. Each gesture carries deep symbolic meaning, making it one of the world's most visually striking performance arts.",
    origin_era: "Early 17th century", costumes: "Elaborate kimono & wigs", music: "Shamisen & taiko drums",
    similar: ["Noh Theatre", "Butoh", "Bon Odori"]
  },
  {
    id: 4, name: "Samba", origin: "Brazil", type: "Folk",
    rarity: "Common", skill: "Beginner", emoji: "🥁",
    color: "#f5e090",
    description: "Samba is the pulsating heartbeat of Brazil — an exuberant dance and music genre born from African rhythms brought to Brazil through the slave trade and blended with European and indigenous influences. During Rio's Carnival, samba schools compete with enormous floats, sequined costumes, and thousands of synchronized dancers. The basic samba step involves a rapid three-step weight transfer.",
    origin_era: "Late 19th century", costumes: "Feathered, sequined outfits", music: "Surdo drums, tamborim, cavaquinho",
    similar: ["Forró", "Axé", "Baião"]
  },
  {
    id: 5, name: "Haka", origin: "New Zealand (Māori)", type: "Ceremonial",
    rarity: "Rare", skill: "Intermediate", emoji: "⚔️",
    color: "#c8e8c8",
    description: "The Haka is a powerful ceremonial dance of the Māori people of New Zealand. Far more than a war dance, it encompasses welcoming guests, celebrating achievements, and funerals. Performed with thunderous foot-stomping, protruding tongues (whetero), wide eyes (pūkana), and chanted verses, the Haka commands presence. The Ka Mate and Kapa o Pango versions are iconic worldwide.",
    origin_era: "Pre-18th century", costumes: "Traditional tā moko tattoos, piupiu skirts", music: "Chanted vocals only",
    similar: ["Poi", "Kapa Haka", "Siva Samoa"]
  },
  {
    id: 6, name: "Kathak", origin: "North India", type: "Classical",
    rarity: "Rare", skill: "Master", emoji: "💫",
    color: "#e8d0f0",
    description: "Kathak, meaning 'storyteller', traces its roots to the wandering bards (Kathakas) of ancient India who narrated epics through gesture and movement. Later refined in the Mughal courts, Kathak fused Hindu temple traditions with Persian aesthetics. It is celebrated for its rapid pirouettes (chakkar), intricate footwork echoing tabla rhythms, and expressive abhinaya.",
    origin_era: "3rd century BCE", costumes: "Ghunghroo-adorned anklets, ghagra-choli", music: "Hindustani classical",
    similar: ["Bharatanatyam", "Odissi", "Manipuri"]
  },
  {
    id: 7, name: "Breakdancing", origin: "New York, USA", type: "Street",
    rarity: "Common", skill: "Advanced", emoji: "🌀",
    color: "#d0e8f8",
    description: "Breaking (B-boying/B-girling) emerged in the South Bronx in the early 1970s as a cornerstone of hip-hop culture. Pioneered by DJ Kool Herc's block parties, it features four main elements: toprock (upright footwork), downrock (floor footwork), power moves (windmills, headspins), and freezes. Breaking became an Olympic sport at Paris 2024, cementing its global legitimacy.",
    origin_era: "1970s", costumes: "Streetwear, sneakers", music: "Hip-hop breakbeats",
    similar: ["Popping", "Locking", "Waacking"]
  },
  {
    id: 8, name: "Odissi", origin: "Odisha, India", type: "Classical",
    rarity: "Rare", skill: "Master", emoji: "🌊",
    color: "#b8ddf0",
    description: "Odissi is considered one of the oldest surviving dance forms, with evidence in the rock-cut caves of Udayagiri dating to the 2nd century BCE. Characterized by the tribhangi (three-body-bend) posture and the chowk (square stance), Odissi is lyrical and sculpturesque — movements seem to come alive from temple friezes. It celebrates the love of Radha and Krishna.",
    origin_era: "2nd century BCE", costumes: "Silver filigree jewelry, silk saree", music: "Odissi classical (Odishi)",
    similar: ["Bharatanatyam", "Manipuri", "Sattriya"]
  },
  {
    id: 9, name: "Tango", origin: "Buenos Aires, Argentina", type: "Semi-Classical",
    rarity: "Uncommon", skill: "Intermediate", emoji: "🌑",
    color: "#e0c8b0",
    description: "The Tango was born in the slums (arrabales) of Buenos Aires in the late 19th century, emerging from African candombe, European immigrant dances, and the Argentine milonga. It is a dance of tension and surrender — partners locked in a close embrace, responding to each other's weight and breath. The sharp head-snaps (cabeceo), leg flicks (ganchos), and dramatic pauses make Tango unmistakable.",
    origin_era: "1880s", costumes: "Fitted suits, split-hem gowns", music: "Bandoneón-led orchestras",
    similar: ["Flamenco", "Milonga", "Vals Cruzado"]
  },
  {
    id: 10, name: "Legong", origin: "Bali, Indonesia", type: "Classical",
    rarity: "Legendary", skill: "Master", emoji: "🌺",
    color: "#f0d890",
    description: "Legong is Bali's most refined and sacred classical dance, traditionally performed by prepubescent girls in the royal courts. The dance depicts tales from Balinese Hindu mythology, performed with extraordinary precision — every finger trembles (agem), eyes dart rapidly (seledet), and the entire body expresses layered narrative. Costumes are breathtakingly ornate, requiring hours to assemble.",
    origin_era: "19th century (royal courts)", costumes: "Gold-painted headdresses, gilded silk", music: "Gamelan orchestra",
    similar: ["Barong", "Kecak", "Topeng"]
  },
  {
    id: 11, name: "Kecak", origin: "Bali, Indonesia", type: "Ceremonial",
    rarity: "Legendary", skill: "Advanced", emoji: "🔥",
    color: "#f8c890",
    description: "Kecak (also called the Ramayana Monkey Chant) is a ritual dance-drama featuring a chorus of 50–150 men chanting 'cak' in rhythmic interlocking patterns — no musical instruments. Developed in the 1930s from the trance ritual Sanghyang, the performance tells of Prince Rama's battle against the demon king Rawana, with the chorus embodying the monkey army. Performed at sunset in Uluwatu Temple.",
    origin_era: "1930s (modernized)", costumes: "Black-and-white checkered cloth", music: "A cappella choral chanting",
    similar: ["Legong", "Barong", "Topeng"]
  },
  {
    id: 12, name: "Whirling Dervishes", origin: "Turkey (Sufi tradition)", type: "Ceremonial",
    rarity: "Legendary", skill: "Advanced", emoji: "🌪️",
    color: "#f0f0f8",
    description: "The Sema ceremony of the Mevlevi Order (founded by Rumi's followers) is a moving meditation in the form of whirling. Dressed in white flowing robes (tennure) symbolizing the ego's shroud, and tall felt hats (sikke) representing tombstones, dervishes spin counterclockwise for extended periods, one hand raised to receive divine grace, one hand lowered to channel it to Earth. A UNESCO-recognized practice.",
    origin_era: "13th century", costumes: "White tennure robe, felt sikke hat", music: "Ney flute & reed instruments",
    similar: ["Kecak", "Haka", "Tinkling"]
  },
  {
    id: 13, name: "Capoeira", origin: "Brazil (Afro-Brazilian)", type: "Street",
    rarity: "Uncommon", skill: "Advanced", emoji: "🤸",
    color: "#f0f8c8",
    description: "Capoeira is a unique Afro-Brazilian martial art disguised as dance. Enslaved Africans in 16th-century Brazil developed it as a means of self-defense, masking combat training as music and dance to deceive slave owners. Players (capoeiristas) engage in a fluid 'jogo' (game) of acrobatic kicks, sweeps, and dodges within a circle (roda), accompanied by the berimbau bow instrument.",
    origin_era: "16th century", costumes: "White abadá uniform", music: "Berimbau, atabaque, pandeiro",
    similar: ["Breakdancing", "Samba", "Locking"]
  },
  {
    id: 14, name: "Tinkling", origin: "Philippines", type: "Folk",
    rarity: "Uncommon", skill: "Intermediate", emoji: "🎋",
    color: "#d8f0d0",
    description: "The Philippines' national dance, Tinkling, mimics the graceful movements of the tikling bird weaving between bamboo traps set by farmers. Two people rhythmically clap and slide two long bamboo poles together while a dancer nimbly steps in and out between them, barefoot. The dance requires extraordinary agility, rhythm, and timing — the poles are struck at increasing speeds.",
    origin_era: "Pre-colonial Philippines", costumes: "Balintawak dress or barong tagalog", music: "Rondalla ensemble",
    similar: ["Tinikling", "Maglalatik", "Singkil"]
  },
  {
    id: 15, name: "Mohiniyattam", origin: "Kerala, India", type: "Classical",
    rarity: "Rare", skill: "Master", emoji: "🌙",
    color: "#fff0c0",
    description: "Mohiniyattam ('Dance of the Enchantress') is a graceful classical dance form of Kerala, traditionally performed exclusively by women. Named after the divine enchantress Mohini (an avatar of Vishnu), it is distinguished by its soft, swaying movements (lasya), white and gold costume, and distinctive eye movements. The rhythmic system follows the sopana (step-by-step) style of Kerala's temple music.",
    origin_era: "16th century", costumes: "White and gold kasavu saree", music: "Sopana sangeetham",
    similar: ["Bharatanatyam", "Odissi", "Kathakali"]
  },
  {
    id: 16, name: "Hula", origin: "Hawaii, USA", type: "Folk",
    rarity: "Common", skill: "Beginner", emoji: "🌸",
    color: "#c8f0e8",
    description: "Hula is the heartbeat of Hawaiian culture — a living library of history, myth, and spiritual connection to the land (ʻāina). The ancient form (hula kahiko) uses chant and traditional percussion; the modern form (hula ʻauana) incorporates ukulele and guitar. The fluid arm movements narrate stories of creation, nature, and royalty. Each hand gesture depicts elements from palm trees to ocean waves.",
    origin_era: "Ancient Polynesia", costumes: "Ti-leaf skirts, leis, kupe'e (anklets)", music: "Ipu gourd drum, chant",
    similar: ["Siva Samoa", "Tahitian dance", "Poi"]
  },
  {
    id: 17, name: "Popping & Locking", origin: "California, USA", type: "Street",
    rarity: "Common", skill: "Intermediate", emoji: "⚡",
    color: "#e0e8f8",
    description: "Popping emerged in Fresno with Sam Solomon ('Boogaloo Sam') in the 1970s, characterized by quick contractions and releases of muscles to create a 'pop' or 'hit'. Locking (invented by Don Campbell in Los Angeles) uses sudden freezes ('locks') followed by relaxed grooves. Together they form the backbone of street funk styles, with influences from cartoons, robots, and mime.",
    origin_era: "1970s", costumes: "Bright-colored, loose-fitting streetwear", music: "Funk, electronic",
    similar: ["Breakdancing", "Waacking", "Voguing"]
  },
  {
    id: 18, name: "Cossack Dance (Hopak)", origin: "Ukraine", type: "Folk",
    rarity: "Uncommon", skill: "Advanced", emoji: "🌾",
    color: "#f8f0c0",
    description: "The Hopak (or Gopak) is Ukraine's national dance — a joyful, explosive folk dance born among the Zaporozhian Cossacks. Male dancers perform spectacular athletic feats: squat-kicks (prysiadky), acrobatic leaps, and spins. Female dancers move with graceful, sweeping arms and stepping patterns. The dance celebrates freedom, strength, and the Cossack warrior spirit.",
    origin_era: "16th–17th century", costumes: "Embroidered vyshyvanka, wide trousers", music: "Bandura, tsymbaly (dulcimer)",
    similar: ["Lezginka", "Khorovod", "Krakoviak"]
  },
  {
    id: 19, name: "Kathakali", origin: "Kerala, India", type: "Classical",
    rarity: "Legendary", skill: "Master", emoji: "👁️",
    color: "#f0d0c8",
    description: "Kathakali is perhaps the world's most visually dramatic classical dance-theatre. Performers wear monumental face paint (chutti) built layer by layer over 4–6 hours, massive costumes, and headdresses. Every eye movement, facial micro-expression, and hand gesture (mudra) conveys narrative. Stories from the Mahabharata and Ramayana are enacted through all-night performances. Training begins in childhood.",
    origin_era: "17th century", costumes: "Towering chutti makeup, 30kg costumes", music: "Chenda & maddalam drums",
    similar: ["Mohiniyattam", "Bharatanatyam", "Kecak"]
  },
  {
    id: 20, name: "Voguing", origin: "New York, USA", type: "Contemporary",
    rarity: "Uncommon", skill: "Intermediate", emoji: "💎",
    color: "#f0d8f8",
    description: "Voguing emerged from the underground LGBTQ+ ballroom scene of Harlem in the 1960s–80s, largely created by Black and Latino gay and trans communities. Named after Vogue magazine, performers strike catalog-like poses and battle in 'houses'. Categories include Old Way (geometric poses), New Way (contortionist shapes), and Vogue Femme (liquid femininity). Madonna's 1990 song launched it globally.",
    origin_era: "1960s–1970s", costumes: "Haute couture fantasy, streetwear", music: "House music, ballroom beats",
    similar: ["Waacking", "Popping & Locking", "Breakdancing"]
  },
  {
    id: 21, name: "Adumu (Maasai)", origin: "Kenya & Tanzania", type: "Ceremonial",
    rarity: "Rare", skill: "Beginner", emoji: "🦁",
    color: "#f8e8b0",
    description: "The Adumu is the iconic jumping ceremony of the Maasai warriors (morans) of East Africa, performed during the Eunoto coming-of-age ceremony. Warriors stand in a circle, one or two at a time entering the center to leap as high as possible while singing and chanting. The jumps are competitive — the highest jumper earns the most respect. The red shuka cloth and beaded jewelry flutter with each leap.",
    origin_era: "Ancient, pre-colonial", costumes: "Red shuka, elaborate beadwork", music: "Throat-singing chants",
    similar: ["Haka", "Kecak", "Zaouli"]
  },
  {
    id: 22, name: "Zaouli", origin: "Côte d'Ivoire (Guro people)", type: "Ceremonial",
    rarity: "Legendary", skill: "Advanced", emoji: "🎪",
    color: "#f0c870",
    description: "Zaouli is a sacred masked dance of the Guro people, recognized by UNESCO as Intangible Cultural Heritage. The dancer wears an ornate painted wooden mask and performs breathtaking footwork of extraordinary speed and complexity — feet seem to blur as they execute precise patterns. The dance is performed at funerals and village festivities, channeling spiritual forces for community healing.",
    origin_era: "Mid-20th century (modern form)", costumes: "Sacred wooden mask, raffia skirt", music: "Flutes, percussion ensemble",
    similar: ["Adumu", "Kecak", "Haka"]
  },
  {
    id: 23, name: "Waltz", origin: "Vienna, Austria", type: "Semi-Classical",
    rarity: "Common", skill: "Beginner", emoji: "🎠",
    color: "#e8d8f0",
    description: "The Waltz scandalized 18th-century Europe: partners daring to hold each other in a closed embrace! Originating from Austrian and German Ländler folk dances, the Viennese Waltz was the first ballroom dance where couples rotated together. Its 3/4 time signature, continuous rotation, and flowing momentum made it the most popular social dance of the 19th century — and it remains a staple of formal ballrooms worldwide.",
    origin_era: "Late 18th century", costumes: "Evening gowns, white tie & tails", music: "Johann Strauss waltzes",
    similar: ["Tango", "Foxtrot", "Viennese Waltz"]
  },
  {
    id: 24, name: "Butoh", origin: "Japan", type: "Contemporary",
    rarity: "Legendary", skill: "Advanced", emoji: "🌑",
    color: "#d0d0d8",
    description: "Butoh (Dance of Darkness) was born from Japan's post-WWII trauma and devastation. Founded by Tatsumi Hijikata in the late 1950s, it is a visceral avant-garde art involving extreme slow movement, contorted body forms, white body paint, and unsettling imagery. Butoh confronts death, taboo, and the grotesque. There are no rules — each performer's interpretation is radically unique. It has deeply influenced contemporary dance worldwide.",
    origin_era: "Late 1950s", costumes: "White body paint, minimal or elaborate", music: "Experimental, silence, soundscape",
    similar: ["Kabuki Dance", "Contemporary dance", "Voguing"]
  }
];

let activeType = 'all';
let activeSort = 'default';

function rarityClass(r) {
  return `badge-rarity-${r.toLowerCase()}`;
}

function skillClass(s) {
  return `badge-skill-${s.toLowerCase()}`;
}

function getBgStyle(dance) {
  return `background: linear-gradient(135deg, ${dance.color}ee, ${dance.color}66);`;
}

function renderGrid() {
  const grid = document.getElementById('danceGrid');
  let filtered = [...dances];

  if (activeType !== 'all') {
    filtered = filtered.filter(d => d.type === activeType);
  }

  if (activeSort === 'alpha-asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
  else if (activeSort === 'alpha-desc') filtered.sort((a, b) => b.name.localeCompare(a.name));
  else if (activeSort === 'rarity-asc') filtered.sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]);
  else if (activeSort === 'rarity-desc') filtered.sort((a, b) => RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity]);
  else if (activeSort === 'skill-asc') filtered.sort((a, b) => SKILL_ORDER[a.skill] - SKILL_ORDER[b.skill]);
  else if (activeSort === 'skill-desc') filtered.sort((a, b) => SKILL_ORDER[b.skill] - SKILL_ORDER[a.skill]);

  document.getElementById('resultsCount').textContent = `${filtered.length} dance${filtered.length !== 1 ? 's' : ''}`;

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="no-results"><div class="big-icon">🎭</div><p>No dances match this filter.</p></div>`;
    return;
  }

  filtered.forEach((dance, i) => {
    const tile = document.createElement('div');
    tile.className = 'dance-tile';
    tile.style.animationDelay = `${i * 0.04}s`;
    tile.dataset.id = dance.id;
    tile.innerHTML = `
      <div class="tile-banner" style="${getBgStyle(dance)}">
        <span>${dance.emoji}</span>
      </div>
      <div class="tile-body">
        <div class="tile-type">${dance.type}</div>
        <div class="tile-name">${dance.name}</div>
        <div class="tile-origin">📍 ${dance.origin}</div>
        <div class="tile-meta">
          <span class="badge ${rarityClass(dance.rarity)}">${dance.rarity}</span>
          <span class="badge ${skillClass(dance.skill)}">${dance.skill}</span>
        </div>
      </div>
    `;
    tile.addEventListener('click', () => openModal(dance.id));
    grid.appendChild(tile);
  });
}

function openModal(id) {
  const dance = dances.find(d => d.id === id);
  if (!dance) return;

  document.getElementById('modalBanner').style = getBgStyle(dance);
  document.getElementById('modalBanner').innerHTML = `<span style="font-size:5rem">${dance.emoji}</span>`;
  document.getElementById('modalType').textContent = dance.type;
  document.getElementById('modalTitle').textContent = dance.name;
  document.getElementById('modalOrigin').textContent = `📍 ${dance.origin}`;
  document.getElementById('modalDesc').textContent = dance.description;

  document.getElementById('modalBadges').innerHTML = `
    <span class="badge ${rarityClass(dance.rarity)}">${dance.rarity}</span>
    <span class="badge ${skillClass(dance.skill)}">${dance.skill} level</span>
  `;

  document.getElementById('modalFacts').innerHTML = `
    <div class="fact-item">
      <div class="fact-label">Origin Era</div>
      <div class="fact-value">${dance.origin_era}</div>
    </div>
    <div class="fact-item">
      <div class="fact-label">Dance Type</div>
      <div class="fact-value">${dance.type}</div>
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
    chip.textContent = name;
    if (found) {
      chip.addEventListener('click', () => openModal(found.id));
    }
    similarDiv.appendChild(chip);
  });

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Event listeners
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.querySelectorAll('[data-filter-type]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-filter-type]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeType = btn.dataset.filterType;
    renderGrid();
  });
});

document.getElementById('sortSelect').addEventListener('change', e => {
  activeSort = e.target.value;
  renderGrid();
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', next);
});

renderGrid();