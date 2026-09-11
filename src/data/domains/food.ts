import type { Domain } from '../types';

export const food: Domain = {
  id: 'food',
  title: 'Food & Taste',
  subtitle: 'the six rasas, grains, and how you eat',
  question: 'Forty-five things about eating. The six tastes were assigned to grahas long before anyone called it nutrition.',
  clusterNotes: {
    surya: 'Pungent heat and the single central dish. Sūrya’s food is direct, hot, and eaten when the sun is highest.',
    chandra: 'Salt, milk, water and rice — everything soft, white, wet and consoling. This is food as being looked after.',
    mangala: 'Bitter and burning. Food that announces itself sharply and leaves heat behind.',
    budha: 'Mixed taste, small pieces, green things. Food you eat with your hands while your attention is elsewhere.',
    guru: 'Sweetness, richness and abundance. Guru’s food is the food of a feast, and it is also how Guru goes wrong.',
    shukra: 'Sour, fine, and plated. Everything here is as much about the experience of eating as about the food.',
    shani: 'Astringent, dry, aged, cold, plain. Food that has already had time applied to it — and food eaten without pleasure.',
    rahu: 'What you cannot stop eating. Engineered, imported, intoxicating, or consumed for the image rather than the taste.',
    ketu: 'Food with the pleasure subtracted — fasting, tastelessness, ash and smoke, and eating you do not notice.',
  },
  items: [
    { graha: 'surya', label: 'pungent taste (kaṭu)', note: 'The rasa assigned to Sūrya in BPHS.' },
    { graha: 'surya', label: 'wheat', note: 'Attested: Sūrya’s grain.' },
    { graha: 'surya', label: 'open-flame cooking', note: 'One heat source, direct, unmediated.' },
    { graha: 'surya', label: 'the main dish', note: 'The one thing the rest of the meal is arranged around.' },
    { graha: 'surya', label: 'eating at noon', note: 'Classically the strongest hour for digestion.' },

    { graha: 'chandra', label: 'salty taste (lavaṇa)', note: 'Chandra’s rasa. Salt is what water carries.' },
    { graha: 'chandra', label: 'rice', note: 'Attested. White, soft, water-cooked.' },
    { graha: 'chandra', label: 'milk & curd', note: 'Classically Chandra’s. Food that comes from being mothered.' },
    { graha: 'chandra', label: 'water-rich fruit', note: 'Cooling, soft, high in liquid.' },
    { graha: 'chandra', label: 'food that comforts', note: 'Eaten for how it feels rather than what it contains.' },

    { graha: 'mangala', label: 'bitter taste (tikta)', note: 'Maṅgala’s rasa in the classical assignment.' },
    { graha: 'mangala', label: 'chilli & heat', note: 'Not the classical rasa, but unmistakably Maṅgala’s quality.' },
    { graha: 'mangala', label: 'red meat', note: 'Blood and muscle — Maṅgala’s own tissues.' },
    { graha: 'mangala', label: 'red lentils (masūr)', note: 'Attested: the red pulse belongs to Maṅgala.' },
    { graha: 'mangala', label: 'seared & charred food', note: 'Cooked by direct violent heat.' },

    { graha: 'budha', label: 'mixed taste (miśra)', note: 'Budha’s rasa is explicitly the combined one.' },
    { graha: 'budha', label: 'green gram (mūṅg)', note: 'Attested: Budha’s pulse, and the green one.' },
    { graha: 'budha', label: 'leafy greens', note: 'Light, green, quick.' },
    { graha: 'budha', label: 'nuts & seeds', note: 'Many small units, eaten in handfuls.' },
    { graha: 'budha', label: 'food eaten while working', note: 'Nutrition subordinated to a task. Very Budha.', extension: true },

    { graha: 'guru', label: 'sweet taste (madhura)', note: 'Guru’s rasa. The taste of sufficiency and more.' },
    { graha: 'guru', label: 'ghee', note: 'Classically Guru’s: rich, golden, expanding.' },
    { graha: 'guru', label: 'chickpeas (chana)', note: 'Attested as Guru’s pulse.' },
    { graha: 'guru', label: 'turmeric & saffron', note: 'Yellow, sanctifying, and used generously.' },
    { graha: 'guru', label: 'the feast', note: 'Eating organised around abundance rather than hunger.' },

    { graha: 'shukra', label: 'sour taste (amla)', note: 'Śukra’s rasa in the classical list.' },
    { graha: 'shukra', label: 'wine', note: 'Attested. Pleasure refined into a drink.' },
    { graha: 'shukra', label: 'cream & dessert', note: 'Food whose only argument is that it is delicious.' },
    { graha: 'shukra', label: 'beans (rājmā)', note: 'Attested as Śukra’s pulse.' },
    { graha: 'shukra', label: 'food plated to be seen', note: 'Where presentation is part of the flavour.' },

    { graha: 'shani', label: 'astringent taste (kaṣāya)', note: 'Śani’s rasa: the taste that contracts the mouth.' },
    { graha: 'shani', label: 'black sesame', note: 'Attested. Śani’s own seed, dark and oily.' },
    { graha: 'shani', label: 'aged & fermented food', note: 'Food that time has already worked on.' },
    { graha: 'shani', label: 'dry, cold, plain food', note: 'Nourishment with the pleasure stripped out.' },
    { graha: 'shani', label: 'yesterday’s leftovers', note: 'Classically avoided — stale food is Śani’s.' },

    { graha: 'rahu', label: 'intoxicants', note: 'Attested. Substances that amplify and distort.' },
    { graha: 'rahu', label: 'food you can’t stop eating', note: 'Appetite that grows by being fed.', extension: true },
    { graha: 'rahu', label: 'ultra-processed food', note: 'Engineered to imitate a food it is not.', extension: true },
    { graha: 'rahu', label: 'exotic imports', note: 'Classically Rāhu’s: the foreign, eaten for its foreignness.' },
    { graha: 'rahu', label: 'food eaten for the photo', note: 'Consumption where image outruns substance.', extension: true },

    { graha: 'ketu', label: 'fasting', note: 'Attested. The deliberate subtraction of food.' },
    { graha: 'ketu', label: 'tasteless food', note: 'Eaten purely as fuel, with the rasa absent.' },
    { graha: 'ketu', label: 'smoked & ashen flavours', note: 'The taste of what fire has already finished with.' },
    { graha: 'ketu', label: 'the last portion', note: 'What is left in the pot after everyone has taken theirs.' },
    { graha: 'ketu', label: 'eating without noticing', note: 'The meal happened; you were not present for it.' },
  ],
};
