import type { Domain } from '../types';

export const time: Domain = {
  id: 'time',
  title: 'Time',
  subtitle: 'hours, days, seasons, and stages of a life',
  question: 'Forty-five stretches of time. The weekdays still carry these names in English — Saturday is Saturn’s day.',
  clusterNotes: {
    surya: 'The high point of any cycle. Noon in the day, summer in the year, the prime in a life — maximum visibility, maximum output.',
    chandra: 'Time measured by a cycle that waxes and wanes rather than advancing. Everything here returns.',
    mangala: 'Short, hot, decisive intervals. Time experienced as a moment that must be seized before it closes.',
    budha: 'Small, countable, interruptible units. Time chopped into pieces you can schedule.',
    guru: 'Long, generous horizons, and the moments formally designated as auspicious. Time with room in it.',
    shukra: 'Time set aside for pleasure and for flowering. Every one of these is an interval whose purpose is delight.',
    shani: 'The cold and late parts of every cycle — and the experience of waiting. Śani is time itself, felt as weight.',
    rahu: 'Time that distorts. Booms, crazes, all-nighters, eclipses: intervals where the usual proportion breaks down.',
    ketu: 'Endings and the silence after them. Time that has finished, or that dissolved without being spent.',
  },
  items: [
    { graha: 'surya', label: 'noon', note: 'The sun at its own strongest hour.' },
    { graha: 'surya', label: 'Sunday', note: 'Sūrya’s vāra — the name survives intact in English.' },
    { graha: 'surya', label: 'high summer', note: 'The season of maximum solar force.' },
    { graha: 'surya', label: 'the prime of life', note: 'Classically Sūrya’s stage: full capacity, full responsibility.' },
    { graha: 'surya', label: 'the solar year', note: 'The cycle measured against the sun itself.' },

    { graha: 'chandra', label: 'the lunar month', note: 'Chandra’s own unit — the word month comes from moon.' },
    { graha: 'chandra', label: 'Monday', note: 'Chandra’s vāra. Moon-day, still, in English.' },
    { graha: 'chandra', label: 'infancy', note: 'Classically Chandra’s stage of life: wholly dependent, wholly receptive.' },
    { graha: 'chandra', label: 'evening', note: 'When the day softens and turns inward.' },
    { graha: 'chandra', label: 'the tides', note: 'Time you can see the Moon physically controlling.' },

    { graha: 'mangala', label: 'Tuesday', note: 'Maṅgala’s vāra — mardi, martes, Mars’ day.' },
    { graha: 'mangala', label: 'adolescence', note: 'Classically Maṅgala’s stage: heat, strength and no judgement yet.' },
    { graha: 'mangala', label: 'the moment of decision', note: 'The instant the other options are cut off.' },
    { graha: 'mangala', label: 'the sprint', note: 'A deliberately short, deliberately painful interval.' },
    { graha: 'mangala', label: 'the sharp season', note: 'Short, intense, and over quickly.' },

    { graha: 'budha', label: 'Wednesday', note: 'Budha’s vāra — mercredi, miércoles, Mercury’s day.' },
    { graha: 'budha', label: 'the hour', note: 'Time divided into equal countable units.' },
    { graha: 'budha', label: 'the school years', note: 'Classically Budha’s stage: the period organised around learning.' },
    { graha: 'budha', label: 'the interruption', note: 'Time subdivided by something arriving.' },
    { graha: 'budha', label: 'the quick errand', note: 'A small bounded task with a beginning and an end.' },

    { graha: 'guru', label: 'Thursday', note: 'Guru’s vāra — jeudi, jueves, Jupiter’s day.' },
    { graha: 'guru', label: 'the auspicious hour', note: 'Muhūrta: time formally judged to be favourable.' },
    { graha: 'guru', label: 'middle age', note: 'The stage of accumulated meaning and widest scope.' },
    { graha: 'guru', label: 'the long term', note: 'Any horizon far enough out to need faith.' },
    { graha: 'guru', label: 'the sabbatical', note: 'Time deliberately made spacious.', extension: true },

    { graha: 'shukra', label: 'Friday', note: 'Śukra’s vāra — vendredi, viernes, Venus’ day.' },
    { graha: 'shukra', label: 'spring', note: 'The season of flowering and attraction.' },
    { graha: 'shukra', label: 'courtship', note: 'The interval whose whole content is drawing together.' },
    { graha: 'shukra', label: 'the evening out', note: 'Time budgeted purely for pleasure.' },
    { graha: 'shukra', label: 'the pause for beauty', note: 'Stopping because something was lovely.' },

    { graha: 'shani', label: 'Saturday', note: 'Śani’s vāra. English kept the name unchanged.' },
    { graha: 'shani', label: 'old age', note: 'Classically Śani’s stage: what time has finished working on.' },
    { graha: 'shani', label: 'pre-dawn', note: 'The coldest, darkest, slowest part of the cycle.' },
    { graha: 'shani', label: 'winter', note: 'The season of contraction and endurance.' },
    { graha: 'shani', label: 'the long wait', note: 'Not a period — the felt experience of duration.' },

    { graha: 'rahu', label: 'the eclipse', note: 'Rāhu is the eclipse. The myth and the mechanism are the same story.' },
    { graha: 'rahu', label: 'the boom', note: 'A period where growth outruns any underlying cause.', extension: true },
    { graha: 'rahu', label: 'the all-nighter', note: 'Time taken from sleep by appetite.' },
    { graha: 'rahu', label: 'the passing craze', note: 'An interval defined by collective fascination.' },
    { graha: 'rahu', label: 'time you can’t account for', note: 'Hours gone, with nothing to show and no memory of spending them.', extension: true },

    { graha: 'ketu', label: 'endings', note: 'Ketu is the tail — the part where a thing stops.' },
    { graha: 'ketu', label: 'the moment after', note: 'When it is over and nothing has replaced it yet.' },
    { graha: 'ketu', label: 'the interval of silence', note: 'Time with the content removed.' },
    { graha: 'ketu', label: 'the last phase of life', note: 'Classically Ketu’s: after the worldly stages are done.' },
    { graha: 'ketu', label: 'time that dissolved', note: 'A period that left no residue at all.' },
  ],
};
