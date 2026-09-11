import type { Domain } from '../types';

export const objects: Domain = {
  id: 'objects',
  title: 'Objects & Materials',
  subtitle: 'metals, stones, substances, made things',
  question: 'Forty-five things you could hold. The oldest and most literal layer of the whole system.',
  clusterNotes: {
    surya: 'Materials that do not tarnish and objects that mark a single holder. Gold does not corrode; a crown fits one head.',
    chandra: 'Materials that reflect, hold liquid, or take an impression. None of them generates anything; all of them carry.',
    mangala: 'Things with an edge, things that strike, and the metals you have to heat to work. Objects for applying force.',
    budha: 'Objects that record, measure or transmit. Every one of them is useless on its own and essential in a system.',
    guru: 'Objects of accumulation and sanction — things that store surplus or shelter what is beneath them.',
    shukra: 'Things whose value is that they are exquisite. Every one is refined, and refinement is the entire point.',
    shani: 'Heavy, dull, dark, durable. Materials that have already been worked on by enormous amounts of time and pressure.',
    rahu: 'Things that are not what they appear to be — smoke, masks, lenses, synthetics. Rāhu distorts what passes through it.',
    ketu: 'What is left over. Ash, shards, relics, empty vessels: objects defined by the absence of what they used to hold.',
  },
  items: [
    { graha: 'surya', label: 'gold', note: 'Classically Sūrya’s metal. It does not tarnish — vitality that does not degrade.' },
    { graha: 'surya', label: 'ruby', note: 'The attested stone: red, singular, brilliant.' },
    { graha: 'surya', label: 'the crown', note: 'An object that can only be worn by one person at a time.' },
    { graha: 'surya', label: 'the signet seal', note: 'Authority made portable and impressible.' },
    { graha: 'surya', label: 'the lamp', note: 'A single source with everything arranged around its light.' },

    { graha: 'chandra', label: 'silver', note: 'Classically Chandra’s: bright, soft, reflective.' },
    { graha: 'chandra', label: 'the pearl', note: 'The attested stone. Formed in water, inside a soft body.' },
    { graha: 'chandra', label: 'water vessels', note: 'Objects whose only function is to hold liquid.' },
    { graha: 'chandra', label: 'the mirror', note: 'Holds no image of its own. Pure reflection.' },
    { graha: 'chandra', label: 'linen & soft cloth', note: 'Takes the shape of whatever it is laid over.' },

    { graha: 'mangala', label: 'iron', note: 'Maṅgala’s metal: strong, red-rusting, worked only under heat.' },
    { graha: 'mangala', label: 'the blade', note: 'The object whose entire purpose is severance.' },
    { graha: 'mangala', label: 'red coral', note: 'The attested stone — red, and grown in hostile conditions.' },
    { graha: 'mangala', label: 'the hammer', note: 'Force concentrated into one small area.' },
    { graha: 'mangala', label: 'machinery', note: 'Heat and metal applied to matter, continuously.', extension: true },

    { graha: 'budha', label: 'paper & ink', note: 'The physical substrate of articulation.' },
    { graha: 'budha', label: 'the emerald', note: 'Budha’s stone. Green, and classically tied to intellect.' },
    { graha: 'budha', label: 'the ledger', note: 'Reality divided into columns that must reconcile.' },
    { graha: 'budha', label: 'measuring instruments', note: 'Objects that turn a continuum into numbers.' },
    { graha: 'budha', label: 'the key', note: 'A small thing that only matters relative to another thing.' },

    { graha: 'guru', label: 'books', note: 'Attested: Guru’s object. Meaning, stored and transferable.' },
    { graha: 'guru', label: 'yellow sapphire', note: 'The classical stone of Guru.' },
    { graha: 'guru', label: 'the canopy', note: 'Shelter that confers status on whatever stands beneath it.' },
    { graha: 'guru', label: 'saffron', note: 'Attested. Yellow, costly, and used to sanctify.' },
    { graha: 'guru', label: 'the granary', note: 'Surplus, held against a future that has not arrived.' },

    { graha: 'shukra', label: 'the diamond', note: 'Śukra’s stone: the hardest material, valued purely for how it looks.' },
    { graha: 'shukra', label: 'silk', note: 'Attested. The most refined possible version of cloth.' },
    { graha: 'shukra', label: 'perfume', note: 'Pleasure with no substance at all — pure quality.' },
    { graha: 'shukra', label: 'jewellery', note: 'Objects worn for no reason except that they are beautiful.' },
    { graha: 'shukra', label: 'the musical instrument', note: 'A made thing whose output is proportion and delight.' },

    { graha: 'shani', label: 'stone', note: 'Heavy, cold, unchanging — time compressed into material.' },
    { graha: 'shani', label: 'lead', note: 'Classically Śani’s metal: dense, dull, and slow.' },
    { graha: 'shani', label: 'blue sapphire', note: 'The attested stone. Dark, and traditionally treated with caution.' },
    { graha: 'shani', label: 'leather', note: 'Attested: worn, tough, and made from what has died.' },
    { graha: 'shani', label: 'rust', note: 'Not an object. The visible record of time acting on one.' },

    { graha: 'rahu', label: 'smoke', note: 'Rāhu’s classical substance. It obscures, expands, and has no body.' },
    { graha: 'rahu', label: 'intoxicants', note: 'Attested. Substances that amplify and distort perception.' },
    { graha: 'rahu', label: 'the mask', note: 'An object for being taken as something you are not.' },
    { graha: 'rahu', label: 'the lens', note: 'It magnifies, and in magnifying it also distorts.', extension: true },
    { graha: 'rahu', label: 'synthetic materials', note: 'Convincing imitation of a substance it is not.', extension: true },

    { graha: 'ketu', label: 'ash', note: 'What remains when everything combustible is gone.' },
    { graha: 'ketu', label: 'the banner', note: 'Ketu literally means flag or standard — the visible trace of a presence.' },
    { graha: 'ketu', label: 'the relic', note: 'A fragment kept for what it used to be part of.' },
    { graha: 'ketu', label: 'the broken shard', note: 'A piece severed from a whole that no longer exists.' },
    { graha: 'ketu', label: 'the empty vessel', note: 'Defined entirely by what it does not contain.' },
  ],
};
