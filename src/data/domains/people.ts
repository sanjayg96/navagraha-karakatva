import type { Domain } from '../types';

export const people: Domain = {
  id: 'people',
  title: 'People & Roles',
  subtitle: 'the kinds of person a society produces',
  question: 'Forty-five kinds of person. What makes a watchman and a judge the same sort of thing?',
  clusterNotes: {
    surya: 'The ones with a single name on the decision. Each of these roles is unshareable — delegate it and it stops being that role.',
    chandra: 'The ones who hold and sustain. None of them direct anything; all of them are what makes continuing possible.',
    mangala: 'The ones licensed to cut. Society grants each of these permission to do violence of some kind, under rules.',
    budha: 'The ones who move things between other people — goods, words, numbers, meaning. Intermediaries, all of them.',
    guru: 'The ones who confer legitimacy. Each can say “this is now permitted, or true, or yours”, and it becomes so.',
    shukra: 'The ones whose work is that something should be pleasing. Relation and refinement as an occupation.',
    shani: 'The ones who absorb time and consequence on everyone else’s behalf — and who are, almost universally, not thanked for it.',
    rahu: 'The ones who come from outside the system and distort it. Every one of them is defined by not belonging.',
    ketu: 'The ones who left. Each has stepped out of the ordinary order of exchange and does not want back in.',
  },
  items: [
    { graha: 'surya', label: 'the father', note: 'The classical kāraka. The origin of authority in a life.' },
    { graha: 'surya', label: 'the head of state', note: 'One office, one occupant, unshareable.' },
    { graha: 'surya', label: 'the boss', note: 'The person the decision stops with.' },
    { graha: 'surya', label: 'the physician', note: 'Classically Sūrya’s: the one whose judgement restores vitality.' },
    { graha: 'surya', label: 'whoever must decide', note: 'Not a job — a position in any structure.' },

    { graha: 'chandra', label: 'the mother', note: 'The classical kāraka. The first medium a person registers on.' },
    { graha: 'chandra', label: 'the nurse', note: 'Care as a sustained condition, not an intervention.' },
    { graha: 'chandra', label: 'the host', note: 'Whoever makes a place feel like somewhere you can stay.' },
    { graha: 'chandra', label: 'the general public', note: 'The crowd as a mood-bearing body — classically Chandra’s.' },
    { graha: 'chandra', label: 'the sailor', note: 'Attested: those whose living is made on water.' },

    { graha: 'mangala', label: 'the soldier', note: 'Licensed violence in its most literal form.' },
    { graha: 'mangala', label: 'the surgeon', note: 'Cutting a body open, sanctioned. Maṅgala exactly.' },
    { graha: 'mangala', label: 'the police officer', note: 'Force applied on behalf of an order.' },
    { graha: 'mangala', label: 'the athlete', note: 'The body trained as an instrument of contest.' },
    { graha: 'mangala', label: 'the younger sibling', note: 'The classical relation — the one you competed with first.' },

    { graha: 'budha', label: 'the merchant', note: 'Value moved between two parties who never meet.' },
    { graha: 'budha', label: 'the writer', note: 'Experience converted into transmissible units.' },
    { graha: 'budha', label: 'the accountant', note: 'Reality rendered as a reconcilable list.' },
    { graha: 'budha', label: 'the messenger', note: 'Budha’s oldest job description.' },
    { graha: 'budha', label: 'the student', note: 'The one whose entire occupation is taking things in.' },

    { graha: 'guru', label: 'the teacher', note: 'The kāraka itself — guru means exactly this.' },
    { graha: 'guru', label: 'the priest', note: 'The one who can declare an act legitimate before the sacred.' },
    { graha: 'guru', label: 'the counsellor', note: 'Whoever is asked what a thing means, not what to do.' },
    { graha: 'guru', label: 'the lawyer', note: 'Expansion and sanction inside a formal system of rules.' },
    { graha: 'guru', label: 'the patron', note: 'The one who makes room for someone else’s work.' },

    { graha: 'shukra', label: 'the spouse', note: 'The classical kāraka for marriage and the partner.' },
    { graha: 'shukra', label: 'the artist', note: 'Whoever is paid for perceiving quality.' },
    { graha: 'shukra', label: 'the designer', note: 'Attraction engineered on purpose.', extension: true },
    { graha: 'shukra', label: 'the performer', note: 'Charm organised into a profession.' },
    { graha: 'shukra', label: 'the diplomat', note: 'Relation itself as the skill being sold.' },

    { graha: 'shani', label: 'the labourer', note: 'The classical kāraka: work measured in hours and wear.' },
    { graha: 'shani', label: 'the elder', note: 'The person time has already finished working on.' },
    { graha: 'shani', label: 'the watchman', note: 'Paid to be present and unremarked for hours.' },
    { graha: 'shani', label: 'the judge', note: 'The one who imposes consequence. Śani never exempts.' },
    { graha: 'shani', label: 'the undertaker', note: 'Necessary, unglamorous, and quietly avoided by everyone.' },

    { graha: 'rahu', label: 'the foreigner', note: 'Classically Rāhu’s: whoever is from outside this order.' },
    { graha: 'rahu', label: 'the outcaste', note: 'Excluded by the system, and therefore not bound by it.' },
    { graha: 'rahu', label: 'the addict', note: 'A person organised entirely around one appetite.' },
    { graha: 'rahu', label: 'the con artist', note: 'Image detached from substance, operated deliberately.' },
    { graha: 'rahu', label: 'the celebrity', note: 'Amplification applied to a person until scale replaces substance.', extension: true },

    { graha: 'ketu', label: 'the ascetic', note: 'The classical kāraka. Renunciation as a way of life.' },
    { graha: 'ketu', label: 'the hermit', note: 'Withdrawal made permanent.' },
    { graha: 'ketu', label: 'the mystic', note: 'Knowledge arriving by subtraction rather than study.' },
    { graha: 'ketu', label: 'the one who walked away', note: 'Competent, established, and gone.' },
    { graha: 'ketu', label: 'the person with no lineage', note: 'Cut from the thread — Ketu is the severed part.' },
  ],
};
