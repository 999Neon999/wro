/* ═══════════════════════════════════════════════
   WORLD DANCE ATLAS — script.js (v2)
   ═══════════════════════════════════════════════ */

const RARITY_ORDER = { Common: 0, Uncommon: 1, Rare: 2, Legendary: 3 };
const SKILL_ORDER  = { Beginner: 0, Intermediate: 1, Advanced: 2, Master: 3 };

const REGION_EMOJIS = {
  'South Asia': '🪷', 'Europe': '🌍', 'East Asia': '🌸',
  'South America': '🌺', 'Oceania': '🌊', 'North America': '🗽',
  'Southeast Asia': '🌴', 'Middle East': '🌙', 'Africa': '🦁'
};

const DANCE_ICONS = {
  'Bharatanatyam': '💫', 'Flamenco': '🌹', 'Kabuki Dance': '🎭',
  'Samba': '🪄', 'Haka': '⚡', 'Kathak': '🔮', 'Breakdancing': '🔥',
  'Odissi': '🌸', 'Tango': '🌹', 'Legong': '✨', 'Kecak': '🔥',
  'Whirling Dervishes': '🌀', 'Capoeira': '⚔️', 'Tinkling': '🎋',
  'Mohiniyattam': '🪷', 'Hula': '🌺', 'Popping & Locking': '⚡',
  'Cossack Dance (Hopak)': '⚔️', 'Kathakali': '🎭', 'Voguing': '💫',
  'Adumu (Maasai)': '🦁', 'Zaouli': '🎭', 'Waltz': '🌹', 'Butoh': '🌑'
};

/* ── CURATED IMAGE LIBRARY ──
   Using reliable Unsplash photo IDs known to work */
const dances = [
  {
    id: 1, name: "Bharatanatyam", origin: "Tamil Nadu, India", region: "South Asia",
    type: "Classical", rarity: "Rare", skill: "Master", color: "#b36a2a", era: "2nd century BCE",
    img: "https://images.unsplash.com/photo-1604503468506-a8da13d11b0f?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1604503468506-a8da13d11b0f?w=1200&q=85&auto=format&fit=crop",
    description: "One of the oldest classical dance forms of India, Bharatanatyam is a synthesis of Nritta (pure dance), Nritya (expressive dance), and Natya (dance drama). Rooted in the Natya Shastra, it was historically performed by Devadasis in Hindu temples and later revived in the 20th century. Its hallmark is the use of mudras (hand gestures), intricate footwork, and expressive facial storytelling.",
    costumes: "Vibrant silk sarees, gold jewelry", music: "Carnatic classical",
    unesco: true, significance: { cultural: 90, complexity: 95, global: 75, longevity: 98 },
    similar: ["Odissi", "Kathak", "Mohiniyattam"]
  },
  {
    id: 2, name: "Flamenco", origin: "Andalusia, Spain", region: "Europe",
    type: "Semi-Classical", rarity: "Uncommon", skill: "Advanced", color: "#8b1a1a", era: "18th century",
    img: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=1200&q=85&auto=format&fit=crop",
    description: "Born from the rich cultural confluence of Romani, Moorish, and Andalusian traditions, Flamenco is a passionate art of song (cante), dance (baile), and guitar (guitarra). The dancer's zapateado (foot-stamping), castanets, and dramatic hand movements express deep human emotions — joy, grief, longing. Recognized by UNESCO as Intangible Cultural Heritage.",
    costumes: "Ruffled bata de cola dress", music: "Flamenco guitar & cante jondo",
    unesco: true, significance: { cultural: 88, complexity: 82, global: 90, longevity: 72 },
    similar: ["Tango", "Bolero", "Sevillanas"]
  },
  {
    id: 3, name: "Kabuki Dance", origin: "Japan", region: "East Asia",
    type: "Classical", rarity: "Rare", skill: "Master", color: "#1a2e5e", era: "Early 17th century",
    img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=85&auto=format&fit=crop",
    description: "Kabuki is a classical Japanese theatre form with highly stylized dance and drama, celebrated for its elaborate kumadori makeup, ornate costumes, and exaggerated movements. Originating in the Edo period, female roles (onnagata) are traditionally performed by male actors. Each gesture carries deep symbolic meaning, making it one of the world's most visually striking performance arts.",
    costumes: "Elaborate kimono & wigs", music: "Shamisen & taiko drums",
    unesco: true, significance: { cultural: 92, complexity: 96, global: 68, longevity: 85 },
    similar: ["Noh Theatre", "Butoh", "Bon Odori"]
  },
  {
    id: 4, name: "Samba", origin: "Brazil", region: "South America",
    type: "Folk", rarity: "Common", skill: "Beginner", color: "#9a6a00", era: "Late 19th century",
    img: "https://images.unsplash.com/photo-1551373884-8a5bba42a574?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1551373884-8a5bba42a574?w=1200&q=85&auto=format&fit=crop",
    description: "Samba is the pulsating heartbeat of Brazil — an exuberant dance and music genre born from African rhythms blended with European and indigenous influences. During Rio's Carnival, samba schools compete with enormous floats, sequined costumes, and thousands of synchronized dancers. The basic step involves a rapid three-step weight transfer full of infectious joy.",
    costumes: "Feathered, sequined outfits", music: "Surdo drums, tamborim, cavaquinho",
    significance: { cultural: 95, complexity: 42, global: 92, longevity: 55 },
    similar: ["Forró", "Axé", "Baião"]
  },
  {
    id: 5, name: "Haka", origin: "New Zealand (Māori)", region: "Oceania",
    type: "Ceremonial", rarity: "Rare", skill: "Intermediate", color: "#2a5a30", era: "Pre-18th century",
    img: "https://images.unsplash.com/photo-1531685250784-7569952593d2?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1531685250784-7569952593d2?w=1200&q=85&auto=format&fit=crop",
    description: "The Haka is a powerful ceremonial dance of the Māori people of New Zealand. Far more than a war dance, it encompasses welcoming guests, celebrating achievements, and funerals. Performed with thunderous foot-stomping, protruding tongues (whetero), wide eyes (pūkana), and chanted verses, the Haka commands elemental presence that stops time.",
    costumes: "Traditional tā moko tattoos, piupiu skirts", music: "Chanted vocals only",
    significance: { cultural: 97, complexity: 55, global: 85, longevity: 90 },
    similar: ["Poi", "Kapa Haka", "Siva Samoa"]
  },
  {
    id: 6, name: "Kathak", origin: "North India", region: "South Asia",
    type: "Classical", rarity: "Rare", skill: "Master", color: "#6a2a8a", era: "3rd century BCE",
    img: "https://images.unsplash.com/photo-1583743814966-8d20eb5be2b4?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1583743814966-8d20eb5be2b4?w=1200&q=85&auto=format&fit=crop",
    description: "Kathak, meaning 'storyteller', traces its roots to the wandering bards of ancient India who narrated epics through gesture and movement. Later refined in the Mughal courts, Kathak fused Hindu temple traditions with Persian aesthetics. It is celebrated for its rapid pirouettes (chakkar), intricate footwork echoing tabla rhythms, and expressive abhinaya.",
    costumes: "Ghunghroo-adorned anklets, ghagra-choli", music: "Hindustani classical",
    significance: { cultural: 88, complexity: 92, global: 62, longevity: 96 },
    similar: ["Bharatanatyam", "Odissi", "Manipuri"]
  },
  {
    id: 7, name: "Breakdancing", origin: "New York, USA", region: "North America",
    type: "Street", rarity: "Common", skill: "Advanced", color: "#1a3a6a", era: "1970s",
    img: "https://images.unsplash.com/photo-1545412595-6d9b72f6c3c1?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1545412595-6d9b72f6c3c1?w=1200&q=85&auto=format&fit=crop",
    description: "Breaking (B-boying/B-girling) emerged in the South Bronx as a cornerstone of hip-hop culture. Pioneered by DJ Kool Herc's block parties, it features toprock (upright footwork), downrock (floor footwork), power moves (windmills, headspins), and freezes. Breaking became an Olympic sport at Paris 2024, cementing its global legitimacy as an athletic art form.",
    costumes: "Streetwear, sneakers", music: "Hip-hop breakbeats",
    significance: { cultural: 82, complexity: 88, global: 95, longevity: 30 },
    similar: ["Popping & Locking", "Waacking", "Capoeira"]
  },
  {
    id: 8, name: "Odissi", origin: "Odisha, India", region: "South Asia",
    type: "Classical", rarity: "Rare", skill: "Master", color: "#1a4a6e", era: "2nd century BCE",
    img: "https://images.unsplash.com/photo-1584727638096-9f4b2619f13e?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1584727638096-9f4b2619f13e?w=1200&q=85&auto=format&fit=crop",
    description: "Odissi is one of the oldest surviving dance forms, with evidence in rock-cut caves of Udayagiri dating to the 2nd century BCE. Characterized by the tribhangi (three-body-bend) posture and the chowk (square stance), Odissi is lyrical and sculpturesque — movements seem to come alive from temple friezes. It celebrates the eternal love of Radha and Krishna.",
    costumes: "Silver filigree jewelry, silk saree", music: "Odissi classical (Odishi)",
    significance: { cultural: 85, complexity: 90, global: 58, longevity: 98 },
    similar: ["Bharatanatyam", "Manipuri", "Sattriya"]
  },
  {
    id: 9, name: "Tango", origin: "Buenos Aires, Argentina", region: "South America",
    type: "Semi-Classical", rarity: "Uncommon", skill: "Intermediate", color: "#5a3a20", era: "1880s",
    img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&q=85&auto=format&fit=crop",
    description: "Tango was born in the slums (arrabales) of Buenos Aires, emerging from African candombe, European immigrant dances, and the Argentine milonga. It is a dance of tension and surrender — partners locked in a close embrace, responding to each other's weight and breath. The sharp head-snaps (cabeceo), leg flicks (ganchos), and dramatic pauses make Tango unmistakable.",
    costumes: "Fitted suits, split-hem gowns", music: "Bandoneón-led orchestras",
    unesco: true, significance: { cultural: 86, complexity: 72, global: 92, longevity: 70 },
    similar: ["Flamenco", "Milonga", "Vals Cruzado"]
  },
  {
    id: 10, name: "Legong", origin: "Bali, Indonesia", region: "Southeast Asia",
    type: "Classical", rarity: "Legendary", skill: "Master", color: "#8a6000", era: "19th century",
    img: "https://images.unsplash.com/photo-1537996008257-740b8e3bba72?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1537996008257-740b8e3bba72?w=1200&q=85&auto=format&fit=crop",
    description: "Legong is Bali's most refined and sacred classical dance, traditionally performed by prepubescent girls in the royal courts. The dance depicts tales from Balinese Hindu mythology with extraordinary precision — every finger trembles (agem), eyes dart rapidly (seledet), and the entire body expresses layered narrative. Costumes are breathtakingly ornate, requiring hours to assemble.",
    costumes: "Gold-painted headdresses, gilded silk", music: "Gamelan orchestra",
    significance: { cultural: 96, complexity: 98, global: 60, longevity: 82 },
    similar: ["Barong", "Kecak", "Topeng"]
  },
  {
    id: 11, name: "Kecak", origin: "Bali, Indonesia", region: "Southeast Asia",
    type: "Ceremonial", rarity: "Legendary", skill: "Advanced", color: "#8a3a00", era: "1930s",
    img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=85&auto=format&fit=crop",
    description: "Kecak is a ritual dance-drama featuring a chorus of 50–150 men chanting 'cak' in rhythmic interlocking patterns — no musical instruments, only voice. Developed from the trance ritual Sanghyang, it tells of Prince Rama's battle against the demon king Rawana, with the chorus embodying the monkey army. Performed at sunset at Uluwatu Temple, it is unforgettable.",
    costumes: "Black-and-white checkered cloth", music: "A cappella choral chanting",
    unesco: true, significance: { cultural: 94, complexity: 78, global: 72, longevity: 55 },
    similar: ["Legong", "Barong", "Kathakali"]
  },
  {
    id: 12, name: "Whirling Dervishes", origin: "Turkey (Sufi tradition)", region: "Middle East",
    type: "Ceremonial", rarity: "Legendary", skill: "Advanced", color: "#3a3a6a", era: "13th century",
    img: "https://images.unsplash.com/photo-1524492518831-b374490d4f43?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1524492518831-b374490d4f43?w=1200&q=85&auto=format&fit=crop",
    description: "The Sema ceremony of the Mevlevi Order is a moving meditation in the form of whirling. Dressed in white flowing robes (tennure) symbolizing the ego's shroud, and tall felt hats (sikke) representing tombstones, dervishes spin counterclockwise for extended periods, one hand raised to receive divine grace, one lowered to channel it to Earth. A UNESCO-recognized practice.",
    costumes: "White tennure robe, felt sikke hat", music: "Ney flute & reed instruments",
    unesco: true, significance: { cultural: 98, complexity: 65, global: 82, longevity: 95 },
    similar: ["Kecak", "Zaouli", "Adumu (Maasai)"]
  },
  {
    id: 13, name: "Capoeira", origin: "Brazil (Afro-Brazilian)", region: "South America",
    type: "Street", rarity: "Uncommon", skill: "Advanced", color: "#2a6a10", era: "16th century",
    img: "https://images.unsplash.com/photo-1544140708-514e62e4e6e0?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1544140708-514e62e4e6e0?w=1200&q=85&auto=format&fit=crop",
    description: "Capoeira is a unique Afro-Brazilian martial art disguised as dance. Enslaved Africans in 16th-century Brazil developed it as self-defense, masking combat training as music and dance to deceive slave owners. Players (capoeiristas) engage in a fluid 'jogo' of acrobatic kicks, sweeps, and dodges within a circle (roda), accompanied by the hypnotic berimbau bow instrument.",
    costumes: "White abadá uniform", music: "Berimbau, atabaque, pandeiro",
    unesco: true, significance: { cultural: 90, complexity: 85, global: 78, longevity: 80 },
    similar: ["Breakdancing", "Samba", "Locking"]
  },
  {
    id: 14, name: "Tinkling", origin: "Philippines", region: "Southeast Asia",
    type: "Folk", rarity: "Uncommon", skill: "Intermediate", color: "#1a6a30", era: "Pre-colonial",
    img: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=1200&q=85&auto=format&fit=crop",
    description: "The Philippines' national dance mimics the graceful movements of the tikling bird weaving between bamboo traps set by farmers. Two people rhythmically clap and slide two long bamboo poles together while a dancer nimbly steps in and out between them, barefoot. The dance requires extraordinary agility, rhythm, and split-second timing — the poles are struck at increasing speeds.",
    costumes: "Balintawak dress or barong tagalog", music: "Rondalla ensemble",
    significance: { cultural: 82, complexity: 68, global: 52, longevity: 78 },
    similar: ["Maglalatik", "Singkil", "Pandanggo"]
  },
  {
    id: 15, name: "Mohiniyattam", origin: "Kerala, India", region: "South Asia",
    type: "Classical", rarity: "Rare", skill: "Master", color: "#8a7000", era: "16th century",
    img: "https://images.unsplash.com/photo-1603302576837-37d728ee7861?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1603302576837-37d728ee7861?w=1200&q=85&auto=format&fit=crop",
    description: "Mohiniyattam ('Dance of the Enchantress') is a graceful classical dance of Kerala, traditionally performed exclusively by women. Named after the divine enchantress Mohini (an avatar of Vishnu), it is distinguished by its soft, swaying lasya movements, white and gold costume, and mesmerizing eye movements. The rhythm follows the sopana style of Kerala's ancient temple music.",
    costumes: "White and gold kasavu saree", music: "Sopana sangeetham",
    significance: { cultural: 80, complexity: 88, global: 50, longevity: 82 },
    similar: ["Bharatanatyam", "Odissi", "Kathakali"]
  },
  {
    id: 16, name: "Hula", origin: "Hawaii, USA", region: "Oceania",
    type: "Folk", rarity: "Common", skill: "Beginner", color: "#007a50", era: "Ancient Polynesia",
    img: "https://images.unsplash.com/photo-1505661037935-fa66e4de6cb3?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1505661037935-fa66e4de6cb3?w=1200&q=85&auto=format&fit=crop",
    description: "Hula is the heartbeat of Hawaiian culture — a living library of history, myth, and spiritual connection to the land (ʻāina). The ancient form (hula kahiko) uses chant and traditional percussion; the modern form (hula ʻauana) incorporates ukulele and guitar. The fluid arm movements narrate stories of creation, nature, and royalty with profound poetry.",
    costumes: "Ti-leaf skirts, leis, kupe'e anklets", music: "Ipu gourd drum, chant",
    significance: { cultural: 90, complexity: 40, global: 75, longevity: 95 },
    similar: ["Siva Samoa", "Tahitian dance", "Poi"]
  },
  {
    id: 17, name: "Popping & Locking", origin: "California, USA", region: "North America",
    type: "Street", rarity: "Common", skill: "Intermediate", color: "#1a3a7a", era: "1970s",
    img: "https://images.unsplash.com/photo-1565119796218-f1a3f2b2a34a?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1565119796218-f1a3f2b2a34a?w=1200&q=85&auto=format&fit=crop",
    description: "Popping emerged in Fresno with Sam Solomon ('Boogaloo Sam'), characterized by quick muscle contractions to create a 'pop'. Locking (invented by Don Campbell) uses sudden freezes ('locks') followed by relaxed grooves. Together they form the backbone of street funk styles, drawing on cartoons, robots, and mime to create a uniquely American vernacular art form.",
    costumes: "Bright-colored, loose-fitting streetwear", music: "Funk, electronic",
    significance: { cultural: 78, complexity: 72, global: 85, longevity: 30 },
    similar: ["Breakdancing", "Waacking", "Voguing"]
  },
  {
    id: 18, name: "Cossack Dance (Hopak)", origin: "Ukraine", region: "Europe",
    type: "Folk", rarity: "Uncommon", skill: "Advanced", color: "#7a6000", era: "16th–17th century",
    img: "https://images.unsplash.com/photo-1544535830-9df3f39c8821?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1544535830-9df3f39c8821?w=1200&q=85&auto=format&fit=crop",
    description: "The Hopak is Ukraine's national dance — a joyful, explosive folk dance born among the Zaporozhian Cossacks. Male dancers perform spectacular squat-kicks (prysiadky), acrobatic leaps, and spins. Female dancers move with graceful, sweeping arms and stepping patterns. The dance celebrates freedom, strength, and the indomitable Cossack warrior spirit.",
    costumes: "Embroidered vyshyvanka, wide trousers", music: "Bandura, tsymbaly (dulcimer)",
    significance: { cultural: 85, complexity: 80, global: 55, longevity: 80 },
    similar: ["Lezginka", "Khorovod", "Krakoviak"]
  },
  {
    id: 19, name: "Kathakali", origin: "Kerala, India", region: "South Asia",
    type: "Classical", rarity: "Legendary", skill: "Master", color: "#7a1a00", era: "17th century",
    img: "https://images.unsplash.com/photo-1605286978633-2dec93ff88a2?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1605286978633-2dec93ff88a2?w=1200&q=85&auto=format&fit=crop",
    description: "Kathakali is perhaps the world's most visually dramatic classical dance-theatre. Performers wear monumental face paint (chutti) built layer by layer over 4–6 hours, massive costumes, and towering headdresses. Every eye movement, facial micro-expression, and hand gesture (mudra) conveys narrative. Stories from the Mahabharata and Ramayana are enacted through all-night performances.",
    costumes: "Towering chutti makeup, 30kg costumes", music: "Chenda & maddalam drums",
    significance: { cultural: 98, complexity: 99, global: 70, longevity: 90 },
    similar: ["Mohiniyattam", "Bharatanatyam", "Kecak"]
  },
  {
    id: 20, name: "Voguing", origin: "New York, USA", region: "North America",
    type: "Street", rarity: "Uncommon", skill: "Advanced", color: "#6a1a6a", era: "1970s–80s",
    img: "https://images.unsplash.com/photo-1547472081-cae8b5ba9ad9?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1547472081-cae8b5ba9ad9?w=1200&q=85&auto=format&fit=crop",
    description: "Voguing emerged in Harlem's underground ballroom scene, created by LGBTQ+ Black and Latinx communities. Inspired by the poses in Vogue magazine, it features sharp angular arm movements, dramatic runway walks, 'dips' (sudden floor drops), and elaborate 'death drops'. The ballroom culture's houses (chosen families) compete in categories — a vibrant subculture made global by Madonna.",
    costumes: "High fashion, avant-garde couture", music: "House music, electronic beats",
    significance: { cultural: 88, complexity: 75, global: 78, longevity: 40 },
    similar: ["Waacking", "Popping & Locking", "Breakdancing"]
  },
  {
    id: 21, name: "Adumu (Maasai)", origin: "Kenya & Tanzania", region: "Africa",
    type: "Ceremonial", rarity: "Rare", skill: "Beginner", color: "#8a4a00", era: "Ancient, pre-colonial",
    img: "https://images.unsplash.com/photo-1516026672322-5c0cf3ed1f3e?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1516026672322-5c0cf3ed1f3e?w=1200&q=85&auto=format&fit=crop",
    description: "The Adumu is the iconic jumping ceremony of the Maasai warriors (morans), performed during the Eunoto coming-of-age ceremony. Warriors stand in a circle, one or two at a time entering the center to leap as high as possible while singing and chanting. The jumps are competitive — the highest jumper earns the most respect. Red shuka cloth and beaded jewelry flutter with each leap.",
    costumes: "Red shuka, elaborate beadwork", music: "Throat-singing chants",
    significance: { cultural: 96, complexity: 30, global: 65, longevity: 95 },
    similar: ["Haka", "Kecak", "Zaouli"]
  },
  {
    id: 22, name: "Zaouli", origin: "Côte d'Ivoire (Guro people)", region: "Africa",
    type: "Ceremonial", rarity: "Legendary", skill: "Advanced", color: "#7a5500", era: "Mid-20th century",
    img: "https://images.unsplash.com/photo-1547471080-fbbd-4d26-ab49-abe24ffe61f4?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1547471080-fbbd-4d26-ab49-abe24ffe61f4?w=1200&q=85&auto=format&fit=crop",
    description: "Zaouli is a sacred masked dance of the Guro people, recognized by UNESCO as Intangible Cultural Heritage. The dancer wears an ornate painted wooden mask and performs breathtaking footwork of extraordinary speed and complexity — feet seem to blur as they execute precise patterns. The dance channels spiritual forces for community healing at funerals and festivities.",
    costumes: "Sacred wooden mask, raffia skirt", music: "Flutes, percussion ensemble",
    unesco: true, significance: { cultural: 95, complexity: 90, global: 45, longevity: 65 },
    similar: ["Adumu (Maasai)", "Kecak", "Haka"]
  },
  {
    id: 23, name: "Waltz", origin: "Vienna, Austria", region: "Europe",
    type: "Semi-Classical", rarity: "Common", skill: "Beginner", color: "#4a3a7a", era: "Late 18th century",
    img: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1200&q=85&auto=format&fit=crop",
    description: "The Waltz scandalized 18th-century Europe: partners daring to hold each other in a closed embrace! Originating from Austrian Ländler folk dances, the Viennese Waltz was the first ballroom dance where couples rotated together. Its 3/4 time signature, continuous rotation, and flowing momentum made it the most popular social dance of the 19th century — and it endures.",
    costumes: "Evening gowns, white tie & tails", music: "Johann Strauss waltzes",
    significance: { cultural: 82, complexity: 38, global: 96, longevity: 85 },
    similar: ["Tango", "Foxtrot", "Viennese Waltz"]
  },
  {
    id: 24, name: "Butoh", origin: "Japan", region: "East Asia",
    type: "Contemporary", rarity: "Legendary", skill: "Advanced", color: "#2a2a2a", era: "Late 1950s",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&q=80&auto=format&fit=crop",
    imgModal: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=85&auto=format&fit=crop",
    description: "Butoh (Dance of Darkness) was born from Japan's post-WWII trauma. Founded by Tatsumi Hijikata, it is a visceral avant-garde art involving extreme slow movement, contorted body forms, white body paint, and unsettling imagery. Butoh confronts death, taboo, and the grotesque. There are no rules — each performer's interpretation is radically unique, making every performance unrepeatable.",
    costumes: "White body paint, minimal or elaborate", music: "Experimental, silence, soundscape",
    significance: { cultural: 85, complexity: 70, global: 55, longevity: 40 },
    similar: ["Kabuki Dance", "Voguing", "Contemporary"]
  }
];

/* ── STATE ── */
let activeType    = 'all';
let activeSort    = 'default';
let searchQuery   = '';
let viewMode      = 'grid';
let currentModalId = null;
let filteredCache = [];

// Advanced filters
let activeRegions  = new Set();
let activeRarities = new Set();
let activeSkills   = new Set();
let activeSpecials = new Set();

/* ── LOADER ── */
function initLoader() {
  const loader = document.getElementById('pageLoader');
  const fill   = document.getElementById('loaderFill');
  if (!loader || !fill) return;
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress > 90) progress = 90;
    fill.style.width = progress + '%';
  }, 75);
  const done = () => {
    clearInterval(interval);
    fill.style.width = '100%';
    setTimeout(() => loader.classList.add('hidden'), 400);
  };
  window.addEventListener('load', done);
  setTimeout(done, 2000);
}

/* ── CURSOR ── */
function initCursor() {
  const cursor = document.getElementById('customCursor');
  const trail  = document.getElementById('cursorTrail');
  if (!cursor || !trail) return;

  let tx = 0, ty = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    cx = e.clientX; cy = e.clientY;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
  });

  document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%, -50%) scale(0.7)');
  document.addEventListener('mouseup',   () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');

  // Expand cursor on interactive elements
  document.addEventListener('mouseover', e => {
    const el = e.target.closest('button, a, .dance-tile, .pill, .similar-chip, .sort-trigger, .sort-option, .view-btn, .fd-chip, .filter-toggle-btn, .scroll-arrow, input');
    cursor.classList.toggle('expanded', !!el);
  });

  function animTrail() {
    tx += (cx - tx) * 0.13;
    ty += (cy - ty) * 0.13;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
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

  // Orbs
  const orbs = Array.from({ length: 18 }, (_, i) => ({
    x: Math.random(), y: Math.random(),
    r: 80 + Math.random() * 200,
    vx: (Math.random() - 0.5) * 0.00022,
    vy: (Math.random() - 0.5) * 0.00022,
    hue: [18, 34, 52, 220, 270, 320][i % 6] + Math.random() * 30,
    opacity: 0.04 + Math.random() * 0.1,
    phase: Math.random() * Math.PI * 2
  }));

  // Particles
  const particles = Array.from({ length: 30 }, () => ({
    x: Math.random(), y: Math.random(),
    r: 0.8 + Math.random() * 2.2,
    vy: -0.00018 - Math.random() * 0.00028,
    vx: (Math.random() - 0.5) * 0.00008,
    opacity: 0.1 + Math.random() * 0.3,
    pulse: Math.random() * Math.PI * 2
  }));

  let t = 0;
  function draw() {
    t++;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    orbs.forEach(o => {
      o.x += o.vx; o.y += o.vy;
      if (o.x < -0.2) o.x = 1.2;
      if (o.x > 1.2)  o.x = -0.2;
      if (o.y < -0.2) o.y = 1.2;
      if (o.y > 1.2)  o.y = -0.2;
      const pulse = 0.82 + 0.18 * Math.sin(t * 0.007 + o.phase);
      const gr = ctx.createRadialGradient(o.x*w, o.y*h, 0, o.x*w, o.y*h, o.r * pulse);
      const a = isDark() ? o.opacity * 0.5 : o.opacity;
      gr.addColorStop(0, `hsla(${o.hue},55%,62%,${a})`);
      gr.addColorStop(1, `hsla(${o.hue},55%,62%,0)`);
      ctx.beginPath();
      ctx.arc(o.x*w, o.y*h, o.r * pulse, 0, Math.PI*2);
      ctx.fillStyle = gr;
      ctx.fill();
    });

    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
      p.pulse += 0.03;
      const pr = p.r * (0.85 + 0.15 * Math.sin(p.pulse));
      ctx.beginPath();
      ctx.arc(p.x*w, p.y*h, pr, 0, Math.PI*2);
      const a = isDark() ? p.opacity * 0.45 : p.opacity * 0.3;
      ctx.fillStyle = `rgba(190,130,60,${a})`;
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
  const pos = [
    { top: '12%', left: '4%',  dur: '6s',   delay: '0s'   },
    { top: '20%', right: '5%', dur: '7.5s', delay: '1.3s' },
    { top: '40%', left: '2%',  dur: '5.8s', delay: '2.2s' },
    { top: '56%', right: '3%', dur: '8.2s', delay: '0.7s' },
    { top: '70%', left: '6%',  dur: '6.5s', delay: '1.9s' },
    { top: '80%', right: '7%', dur: '7.1s', delay: '3.1s' },
  ];
  regions.slice(0, 6).forEach((region, i) => {
    const el = document.createElement('div');
    el.className = 'float-badge';
    el.textContent = `${REGION_EMOJIS[region] || '🌍'} ${region}`;
    const p = pos[i];
    Object.assign(el.style, p, { animationDuration: p.dur, animationDelay: p.delay });
    container.appendChild(el);
  });
}

/* ── HELPERS ── */
function rarityClass(r) { return `badge-rarity-${r.toLowerCase()}`; }
function skillClass(s)  { return `badge-skill-${s.toLowerCase()}`; }
function pipClass(r)    { return `pip-${r.toLowerCase()}`; }

function buildRhythmBars(n = 40) {
  return Array.from({ length: n }, (_, i) => {
    const h1 = 2 + Math.random() * 6;
    const h2 = 8 + Math.random() * 36;
    const d  = 0.5 + Math.random() * 1.8;
    const delay = (i / n * 1.6).toFixed(2);
    return `<div class="rbar" style="--h1:${h1}px;--h2:${h2}px;--d:${d}s;animation-delay:-${delay}s"></div>`;
  }).join('');
}

function getFiltered() {
  let filtered = [...dances];
  if (activeType !== 'all') filtered = filtered.filter(d => d.type === activeType);
  if (activeRegions.size)   filtered = filtered.filter(d => activeRegions.has(d.region));
  if (activeRarities.size)  filtered = filtered.filter(d => activeRarities.has(d.rarity));
  if (activeSkills.size)    filtered = filtered.filter(d => activeSkills.has(d.skill));
  if (activeSpecials.has('unesco')) filtered = filtered.filter(d => d.unesco);
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
  return filtered;
}

/* ── RENDER ── */
function renderGrid() {
  const grid = document.getElementById('danceGrid');
  const filtered = getFiltered();
  filteredCache = filtered;

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
        <p>Try adjusting your filters or search.</p>
        <button onclick="clearAllFilters()">Clear all filters</button>
      </div>`;
    return;
  }

  filtered.forEach((dance, i) => {
    const tile = document.createElement('div');
    tile.className = 'dance-tile';
    tile.style.animationDelay = `${i * 0.038}s`;
    tile.dataset.id = dance.id;

    const icon = DANCE_ICONS[dance.name] || '🎭';

    tile.innerHTML = `
      <div class="tile-banner" style="background: linear-gradient(140deg, ${dance.color}44, ${dance.color}18);">
        <img
          class="tile-img"
          src="${dance.img}"
          alt="${dance.name} dance"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        >
        <div class="tile-img-error" style="display:none; background: linear-gradient(135deg, ${dance.color}33, ${dance.color}11);">${icon}</div>
        <div class="tile-img-overlay"></div>
        <div class="tile-rarity-pip ${pipClass(dance.rarity)}"></div>
        <div class="tile-type-badge">${dance.type}</div>
        ${dance.unesco ? '<div class="tile-type-badge" style="top:2.4rem;left:0.85rem;background:rgba(0,80,160,0.6);">🏛 UNESCO</div>' : ''}
        <div class="tile-explore">Explore →</div>
      </div>
      <div class="tile-body">
        <div class="tile-top-row">
          <span class="tile-era">${dance.era}</span>
          <span class="tile-region">${REGION_EMOJIS[dance.region] || '🌍'} ${dance.region}</span>
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
  searchQuery = ''; activeType = 'all'; activeSort = 'default';
  activeRegions.clear(); activeRarities.clear(); activeSkills.clear(); activeSpecials.clear();
  document.getElementById('searchInput').value = '';
  // Reset custom sort dropdown
  document.querySelectorAll('.sort-option').forEach(b => b.classList.toggle('active', b.dataset.sort === 'default'));
  const sortLabelEl = document.getElementById('sortLabel');
  if (sortLabelEl) sortLabelEl.textContent = 'Default order';
  document.getElementById('searchClear').classList.remove('visible');
  document.querySelectorAll('[data-filter-type]').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-filter-type="all"]').classList.add('active');
  document.querySelectorAll('.fd-chip').forEach(b => b.classList.remove('active'));
  updateFilterBadge();
  renderGrid();
}

/* ── MODAL ── */
function openModal(id) {
  const dance = dances.find(d => d.id === id);
  if (!dance) return;
  currentModalId = id;

  // Banner image
  const modalImg = document.getElementById('modalImg');
  const bannerGrad = document.getElementById('modalBannerGradient');
  bannerGrad.style.background = `linear-gradient(140deg, ${dance.color}cc, ${dance.color}44)`;
  modalImg.src = dance.imgModal;
  modalImg.alt = dance.name;

  // Rhythm bars
  document.getElementById('modalRhythm').innerHTML = buildRhythmBars();

  // Banner text
  document.getElementById('modalBannerMeta').textContent = `${dance.type} · ${dance.region}`;
  document.getElementById('modalBannerName').textContent  = dance.name;

  // Meta
  document.getElementById('modalEyebrow').textContent   = `${REGION_EMOJIS[dance.region] || ''} ${dance.region}`;
  document.getElementById('modalTitle').textContent     = dance.name;
  document.getElementById('modalOriginLine').innerHTML  = `📍 ${dance.origin} &nbsp;·&nbsp; ${dance.era}`;
  document.getElementById('modalDesc').textContent      = dance.description;

  // Badges
  const unescoTag = dance.unesco ? `<span class="badge" style="background:#d0e8f8;color:#003880;border:1px solid #80b8e8;">🏛 UNESCO</span>` : '';
  document.getElementById('modalBadgesRow').innerHTML = `
    <span class="badge ${rarityClass(dance.rarity)}">${dance.rarity}</span>
    <span class="badge ${skillClass(dance.skill)}">${dance.skill} level</span>
    <span class="badge" style="background:transparent;border:1px solid var(--warm-border);color:var(--muted);">${dance.type}</span>
    ${unescoTag}
  `;

  // Facts
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

  // Significance bars
  if (dance.significance) {
    const sig = dance.significance;
    document.getElementById('modalSignificance').innerHTML = `
      <div class="sig-label">Cultural Significance</div>
      <div class="sig-bars">
        ${Object.entries(sig).map(([k, v]) => `
          <div class="sig-bar-row">
            <span class="sig-bar-name">${k.charAt(0).toUpperCase() + k.slice(1)}</span>
            <div class="sig-bar-track"><div class="sig-bar-fill" data-val="${v}"></div></div>
            <span class="sig-bar-val">${v}</span>
          </div>
        `).join('')}
      </div>
    `;
    // Animate bars after render
    setTimeout(() => {
      document.querySelectorAll('.sig-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.val + '%';
      });
    }, 100);
  } else {
    document.getElementById('modalSignificance').innerHTML = '';
  }

  // Similar
  const similarDiv = document.getElementById('modalSimilar');
  similarDiv.innerHTML = '';
  dance.similar.forEach(name => {
    const found = dances.find(d => d.name === name);
    const chip = document.createElement('button');
    chip.className = `similar-chip${found ? '' : ' inactive'}`;
    chip.innerHTML = `<span>${name}</span>`;
    if (found) chip.addEventListener('click', () => openModal(found.id));
    similarDiv.appendChild(chip);
  });

  // Navigation
  updateModalNav();

  const overlay = document.getElementById('modalOverlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('modalEl').scrollTop = 0;
}

function updateModalNav() {
  const allDances = filteredCache.length > 0 ? filteredCache : dances;
  const idx = allDances.findIndex(d => d.id === currentModalId);
  const total = allDances.length;

  document.getElementById('modalProgress').textContent = `${idx + 1} / ${total}`;

  const prevBtn = document.getElementById('modalPrev');
  const nextBtn = document.getElementById('modalNext');

  prevBtn.onclick = () => {
    if (idx > 0) openModal(allDances[idx - 1].id);
  };
  nextBtn.onclick = () => {
    if (idx < total - 1) openModal(allDances[idx + 1].id);
  };

  prevBtn.style.opacity = idx === 0 ? '0.3' : '1';
  nextBtn.style.opacity = idx === total - 1 ? '0.3' : '1';
  prevBtn.disabled = idx === 0;
  nextBtn.disabled = idx === total - 1;
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  currentModalId = null;
}

/* ── THEME ── */
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const html   = document.documentElement;
  const saved  = localStorage.getItem('wda-theme') || 'light';
  html.setAttribute('data-theme', saved);

  toggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('wda-theme', next);
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
    btn.classList.toggle('visible', window.scrollY > 500);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── COUNTER ANIMATION ── */
function initCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = +el.dataset.target;
    let current  = 0;
    const step   = Math.max(1, target / 50);
    const timer  = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.round(current);
      if (current >= target) clearInterval(timer);
    }, 28);
  });
}

/* ── CONTROLS SCROLL ── */
function initControlsGlow() {
  const controls = document.getElementById('controls');
  if (!controls) return;
  window.addEventListener('scroll', () => {
    controls.classList.toggle('scrolled', window.scrollY > 80);
  });
}

/* ── KEYBOARD NAV ── */
function initKeyboardNav() {
  document.addEventListener('keydown', e => {
    const modalOpen = document.getElementById('modalOverlay').classList.contains('open');
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key === 'ArrowRight' && modalOpen && currentModalId) {
      document.getElementById('modalNext').click();
      return;
    }
    if (e.key === 'ArrowLeft' && modalOpen && currentModalId) {
      document.getElementById('modalPrev').click();
      return;
    }
    if (e.key === '/' && !modalOpen) {
      e.preventDefault();
      document.getElementById('searchInput').focus();
    }
  });
}

/* ── SURPRISE ME ── */
function initRandomDance() {
  const btn = document.getElementById('randomDanceBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const pool = filteredCache.length > 0 ? filteredCache : dances;
    const rand = pool[Math.floor(Math.random() * pool.length)];
    document.querySelector('.controls').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => openModal(rand.id), 600);
  });
}

/* ── INTERSECTION OBSERVER for tile reveal ── */
function initIntersectionAnim() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = 'running';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  // Observe future tiles via MutationObserver
  const grid = document.getElementById('danceGrid');
  const mo = new MutationObserver(() => {
    grid.querySelectorAll('.dance-tile').forEach(tile => {
      tile.style.animationPlayState = 'paused';
      observer.observe(tile);
    });
  });
  mo.observe(grid, { childList: true });
}


/* ── FILTER BADGE COUNT ── */
function updateFilterBadge() {
  const count = activeRegions.size + activeRarities.size + activeSkills.size + activeSpecials.size;
  const badge = document.getElementById('filterActiveCount');
  const btn   = document.getElementById('filterToggleBtn');
  if (!badge || !btn) return;
  badge.textContent = count;
  badge.hidden = count === 0;
  btn.classList.toggle('active', count > 0);
}

/* ── FILTER DRAWER ── */
function initFilterDrawer() {
  const btn    = document.getElementById('filterToggleBtn');
  const drawer = document.getElementById('filterDrawer');
  if (!btn || !drawer) return;

  // Populate region chips from data
  const regionChips = document.getElementById('regionChips');
  const regions = [...new Set(dances.map(d => d.region))].sort();
  regions.forEach(region => {
    const chip = document.createElement('button');
    chip.className = 'fd-chip';
    chip.dataset.filterRegion = region;
    chip.innerHTML = `<span style="font-size:0.8rem">${REGION_EMOJIS[region] || '🌍'}</span>${region}`;
    regionChips.appendChild(chip);
  });

  // Toggle drawer open/close
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = drawer.classList.contains('open');
    drawer.classList.toggle('open', !isOpen);
    drawer.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
    btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    // Close sort dropdown if open
    const sd = document.getElementById('sortDropdown');
    if (sd) { sd.classList.remove('open'); sd.setAttribute('aria-expanded','false'); }
  });

  // Generic chip toggle helper
  function makeChipToggle(selector, stateSet) {
    document.querySelectorAll(selector).forEach(chip => {
      chip.addEventListener('click', () => {
        const val = chip.dataset.filterRegion || chip.dataset.filterRarity || chip.dataset.filterSkill || chip.dataset.filterSpecial;
        if (stateSet.has(val)) {
          stateSet.delete(val);
          chip.classList.remove('active');
        } else {
          stateSet.add(val);
          chip.classList.add('active');
        }
        updateFilterBadge();
        renderGrid();
      });
    });
  }

  makeChipToggle('[data-filter-region]',  activeRegions);
  makeChipToggle('[data-filter-rarity]',  activeRarities);
  makeChipToggle('[data-filter-skill]',   activeSkills);
  makeChipToggle('[data-filter-special]', activeSpecials);

  // Clear all button inside drawer
  document.getElementById('fdClearBtn')?.addEventListener('click', () => {
    activeRegions.clear(); activeRarities.clear(); activeSkills.clear(); activeSpecials.clear();
    document.querySelectorAll('.fd-chip').forEach(b => b.classList.remove('active'));
    updateFilterBadge();
    renderGrid();
  });
}


/* ── SCROLL ARROWS ── */
function initScrollArrows() {
  // Generic: given a scrollable element and its two arrow buttons,
  // wire click + update visibility on scroll/resize.
  function wire(scrollEl, leftBtn, rightBtn, step) {
    if (!scrollEl || !leftBtn || !rightBtn) return;

    function update() {
      const atStart = scrollEl.scrollLeft <= 2;
      const atEnd   = scrollEl.scrollLeft >= scrollEl.scrollWidth - scrollEl.clientWidth - 2;
      leftBtn.classList.toggle('hidden', atStart);
      rightBtn.classList.toggle('hidden', atEnd);
    }

    leftBtn.addEventListener('click',  e => { e.stopPropagation(); scrollEl.scrollLeft -= step; });
    rightBtn.addEventListener('click', e => { e.stopPropagation(); scrollEl.scrollLeft += step; });
    scrollEl.addEventListener('scroll', update, { passive: true });

    // Re-check on any chip added (region chips are added after init)
    new ResizeObserver(update).observe(scrollEl);
    update();
  }

  // Type pills
  const pillsEl    = document.getElementById('typePills');
  const pillsLeft  = document.getElementById('pillsScrollLeft');
  const pillsRight = document.getElementById('pillsScrollRight');
  wire(pillsEl, pillsLeft, pillsRight, 160);

  // Each fd-chips row — identified by data-track attribute on the arrow buttons
  document.querySelectorAll('.chips-track').forEach(track => {
    const arrowBtns = track.querySelectorAll('.scroll-arrow');
    if (arrowBtns.length < 2) return;
    const trackId  = arrowBtns[0].dataset.track;
    const chipsEl  = trackId ? document.getElementById(trackId) : track.querySelector('.fd-chips');
    wire(chipsEl, arrowBtns[0], arrowBtns[1], 140);
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
  initRandomDance();
  initIntersectionAnim();
  initFilterDrawer();
  initScrollArrows();
  renderGrid();

  // Modal overlay close
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });
  document.getElementById('modalClose').addEventListener('click', closeModal);

  // Filter pills
  document.querySelectorAll('[data-filter-type]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter-type]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeType = btn.dataset.filterType;
      renderGrid();
    });
  });

  // ── Custom Sort Dropdown ──
  const sortDropdown = document.getElementById('sortDropdown');
  const sortTrigger  = document.getElementById('sortTrigger');
  const sortPanel    = document.getElementById('sortPanel');
  const sortLabel    = document.getElementById('sortLabel');
  const sortOptions  = sortPanel.querySelectorAll('.sort-option');

  function openSort() {
    sortDropdown.classList.add('open');
    sortDropdown.setAttribute('aria-expanded', 'true');
  }
  function closeSort() {
    sortDropdown.classList.remove('open');
    sortDropdown.setAttribute('aria-expanded', 'false');
  }
  function toggleSort() {
    sortDropdown.classList.contains('open') ? closeSort() : openSort();
  }

  sortTrigger.addEventListener('click', e => { e.stopPropagation(); toggleSort(); });

  sortOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      sortOptions.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeSort = btn.dataset.sort;
      sortLabel.textContent = btn.querySelector('span:not(.sort-option-icon):not(.pip)').textContent.trim();
      closeSort();
      renderGrid();
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!sortDropdown.contains(e.target)) closeSort();
  });

  // Keyboard: Escape to close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSort();
  });

  // Search (debounced)
  let searchTimeout;
  document.getElementById('searchInput').addEventListener('input', e => {
    searchQuery = e.target.value;
    document.getElementById('searchClear').classList.toggle('visible', searchQuery.length > 0);
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(renderGrid, 150);
  });

  document.getElementById('searchClear').addEventListener('click', () => {
    searchQuery = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('searchClear').classList.remove('visible');
    renderGrid();
    document.getElementById('searchInput').focus();
  });
});