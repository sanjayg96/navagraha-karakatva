import type { Domain } from '../types';

export const places: Domain = {
  id: 'places',
  title: 'Places',
  subtitle: 'rooms, buildings, landscapes, atmospheres',
  question: 'Forty-five places. Why does a mine belong with a prison and a graveyard?',
  clusterNotes: {
    surya: 'Places built around a single focal point, where everyone present is oriented the same way — toward the centre.',
    chandra: 'Places you are held in rather than perform in. All of them are soft, enclosed, and associated with water or with being fed.',
    mangala: 'Places where heat is applied and material is forced to change. Every one of them is dangerous if you are careless.',
    budha: 'Places whose entire purpose is exchange — of goods, of information, of messages. Nothing is made here; things move.',
    guru: 'Places where legitimacy is conferred and where space is deliberately larger than function requires.',
    shukra: 'Places designed to be pleasurable to be in. The only justification any of them needs is that it is lovely.',
    shani: 'Places where time and labour are visible in the walls. Hard, cold, enclosed, and holding what nobody wants to look at.',
    rahu: 'Places of threshold and appetite, where the usual rules are suspended and something can be got that is not available elsewhere.',
    ketu: 'Places defined by what has been removed. Emptied, abandoned, or given over entirely to an ending.',
  },
  items: [
    { graha: 'surya', label: 'the seat of government', note: 'Classically Sūrya’s: palaces and places of rule.' },
    { graha: 'surya', label: 'the temple sanctum', note: 'The innermost chamber, holding a single focus.' },
    { graha: 'surya', label: 'the main square', note: 'The centre a town organises itself around.' },
    { graha: 'surya', label: 'open sunlit ground', note: 'Nothing hidden, nothing shaded.' },
    { graha: 'surya', label: 'the stage', note: 'Purpose-built so that one person can be seen.', extension: true },

    { graha: 'chandra', label: 'the kitchen', note: 'Water, food, and the smell of being looked after.' },
    { graha: 'chandra', label: 'the bedroom', note: 'Where you are unguarded and receptive.' },
    { graha: 'chandra', label: 'lakes & wells', note: 'Standing water is Chandra’s most literal domain.' },
    { graha: 'chandra', label: 'the childhood home', note: 'The place memory keeps returning to whether you like it or not.' },
    { graha: 'chandra', label: 'the nursery', note: 'A room built entirely around sustaining someone helpless.' },

    { graha: 'mangala', label: 'the forge', note: 'Fire and iron: Maṅgala without metaphor.' },
    { graha: 'mangala', label: 'the operating theatre', note: 'A room designed for cutting a person open safely.' },
    { graha: 'mangala', label: 'the barracks', note: 'Where force is housed between uses.' },
    { graha: 'mangala', label: 'the furnace room', note: 'Contained heat, kept at the edge of danger.' },
    { graha: 'mangala', label: 'the gym', note: 'A building for deliberately applying strain to a body.', extension: true },

    { graha: 'budha', label: 'the market', note: 'The classical site of exchange.' },
    { graha: 'budha', label: 'the school', note: 'Where information is distributed in units.' },
    { graha: 'budha', label: 'the library', note: 'Knowledge classified, indexed and retrievable.' },
    { graha: 'budha', label: 'the post office', note: 'Messages in transit, made institutional.' },
    { graha: 'budha', label: 'the newsroom', note: 'Events converted into transmissible sentences.', extension: true },

    { graha: 'guru', label: 'the university', note: 'Teaching given a building and a charter.' },
    { graha: 'guru', label: 'the assembly hall', note: 'Deliberately more volume than the function requires.' },
    { graha: 'guru', label: 'the treasury', note: 'Classically Guru’s: the accumulated, the stored, the endowed.' },
    { graha: 'guru', label: 'the pilgrimage road', note: 'A journey whose entire point is meaning.' },
    { graha: 'guru', label: 'the courtroom', note: 'Where a rule is expanded into a ruling.' },

    { graha: 'shukra', label: 'the pleasure garden', note: 'Attested: Śukra’s gardens, made for delight and nothing else.' },
    { graha: 'shukra', label: 'the theatre', note: 'A building for arranged beauty.' },
    { graha: 'shukra', label: 'the artist’s studio', note: 'Where quality is perceived and then made.' },
    { graha: 'shukra', label: 'the salon', note: 'A room that exists so people can be charming in it.' },
    { graha: 'shukra', label: 'the perfumery', note: 'Refinement reduced to its most concentrated form.' },

    { graha: 'shani', label: 'the mine', note: 'Deep, dark, slow, and extracting what time compressed.' },
    { graha: 'shani', label: 'the graveyard', note: 'Where the community keeps what it cannot change.' },
    { graha: 'shani', label: 'the factory floor', note: 'Repetition, hours, and wear made architectural.' },
    { graha: 'shani', label: 'the prison', note: 'Limitation built out of stone on purpose.' },
    { graha: 'shani', label: 'the ruin', note: 'A building with nothing left but the effect of time on it.' },

    { graha: 'rahu', label: 'the border crossing', note: 'The threshold between one order and another.' },
    { graha: 'rahu', label: 'the casino', note: 'Appetite engineered into architecture.', extension: true },
    { graha: 'rahu', label: 'the black market', note: 'Exchange with the rules removed.' },
    { graha: 'rahu', label: 'the foreign city', note: 'Classically Rāhu’s: everywhere you have no standing.' },
    { graha: 'rahu', label: 'the crowd at night', note: 'Amplification, anonymity, and no daylight to check it.' },

    { graha: 'ketu', label: 'the cave', note: 'Attested: the ascetic’s place. Shelter with nothing added.' },
    { graha: 'ketu', label: 'the cremation ground', note: 'Where a body becomes ash. Residue is Ketu’s whole nature.' },
    { graha: 'ketu', label: 'the abandoned building', note: 'A structure that has outlived its purpose entirely.' },
    { graha: 'ketu', label: 'the monastery', note: 'A place organised around wanting less.' },
    { graha: 'ketu', label: 'the desert', note: 'Landscape with everything subtracted from it.' },
  ],
};
