import type { Domain } from '../types';

export const speech: Domain = {
  id: 'speech',
  title: 'Speech',
  subtitle: 'what you say, how you say it, and what you don’t',
  question: 'Forty-five ways of using language. Silence is in here too — it is one of the strongest.',
  clusterNotes: {
    surya: 'Speech that puts your name behind it. Each of these is unshareable and irrevocable once said.',
    chandra: 'Speech that regulates someone’s emotional state. Content is almost irrelevant here; tone does the work.',
    mangala: 'Speech that cuts. Short, hot, direct, and aimed at a specific person who will feel it land.',
    budha: 'Speech as exchange and as play. Every one of these depends on precision, timing and agility.',
    guru: 'Speech that confers or explains. Each of these enlarges the listener rather than merely informing them.',
    shukra: 'Speech that attracts and repairs. Language used for the pleasure of it, and for keeping people close.',
    shani: 'Speech withheld, delayed or made to cost something. Śani’s language is expensive and therefore weighty.',
    rahu: 'Speech built to spread. Optimised for propagation rather than for accuracy — the further it travels, the less it means.',
    ketu: 'Speech subtracted. What goes unsaid, what is left cryptic, and the conversation you simply exit.',
  },
  items: [
    { graha: 'surya', label: 'the declaration', note: 'Stated once, in the open, in your own name.' },
    { graha: 'surya', label: 'speaking as yourself', note: 'No committee, no hedge, no proxy.' },
    { graha: 'surya', label: 'the command', note: 'Speech that is an act, because of who said it.' },
    { graha: 'surya', label: 'addressing a crowd', note: 'One voice, everyone facing the same way.' },
    { graha: 'surya', label: 'your signature', note: 'The smallest possible unit of personal authority.' },

    { graha: 'chandra', label: 'soothing talk', note: 'Speech whose only purpose is to settle someone.' },
    { graha: 'chandra', label: 'the lullaby', note: 'Meaning irrelevant; rhythm and tone do everything.' },
    { graha: 'chandra', label: 'what you tell one close friend', note: 'Speech that requires having been held safely first.' },
    { graha: 'chandra', label: 'rumour', note: 'Classically Chandra’s: what the public is collectively feeling.' },
    { graha: 'chandra', label: 'tone of voice', note: 'The carrier wave underneath the words.' },

    { graha: 'mangala', label: 'the ultimatum', note: 'Speech that removes every remaining option.' },
    { graha: 'mangala', label: 'the direct challenge', note: 'Named person, named issue, now.' },
    { graha: 'mangala', label: 'the insult', note: 'Language used purely to wound.' },
    { graha: 'mangala', label: 'the shout', note: 'Volume as force.' },
    { graha: 'mangala', label: 'the clean refusal', note: 'No. Maṅgala at its healthiest.' },

    { graha: 'budha', label: 'the explanation', note: 'Classically Budha’s: dividing a thing into understandable parts.' },
    { graha: 'budha', label: 'the joke & the pun', note: 'Attested. Wit is Budha’s signature faculty.' },
    { graha: 'budha', label: 'writing', note: 'Speech made durable and transferable.' },
    { graha: 'budha', label: 'the negotiation', note: 'Language used to move value between parties.' },
    { graha: 'budha', label: 'the quick reply', note: 'Speed as the dominant quality.' },

    { graha: 'guru', label: 'the teaching', note: 'Speech that makes the listener larger.' },
    { graha: 'guru', label: 'the blessing', note: 'Classically Guru’s: words that sanction and expand.' },
    { graha: 'guru', label: 'the sermon', note: 'Meaning delivered at length, with authority.' },
    { graha: 'guru', label: 'considered counsel', note: 'The answer given after actually thinking.' },
    { graha: 'guru', label: 'the long answer', note: 'Where the length is the respect.' },

    { graha: 'shukra', label: 'the compliment', note: 'Speech whose function is attraction.' },
    { graha: 'shukra', label: 'flirtation', note: 'Classically Śukra’s. Language as pleasure.' },
    { graha: 'shukra', label: 'the song', note: 'Attested. Speech refined until it is music.' },
    { graha: 'shukra', label: 'the well-turned phrase', note: 'Said beautifully, and better for it.' },
    { graha: 'shukra', label: 'the apology that mends', note: 'Language repairing a relation.' },

    { graha: 'shani', label: 'silence', note: 'Śani’s most characteristic speech act. Nothing is cheaper and nothing weighs more.' },
    { graha: 'shani', label: 'the terse reply', note: 'Minimum words, full meaning.' },
    { graha: 'shani', label: 'the delayed answer', note: 'Time inserted deliberately into a conversation.' },
    { graha: 'shani', label: 'the word that costs you', note: 'Said knowing exactly what it will take.' },
    { graha: 'shani', label: 'the formal notice', note: 'Language with legal consequence and no warmth.' },

    { graha: 'rahu', label: 'the slogan', note: 'Compressed for transmission, not for truth.', extension: true },
    { graha: 'rahu', label: 'propaganda', note: 'Classically Rāhu’s: deception operated at scale.' },
    { graha: 'rahu', label: 'the lie that works', note: 'Effective precisely because it is not checkable.' },
    { graha: 'rahu', label: 'rumour amplified', note: 'Chandra’s rumour, with the limiter removed.' },
    { graha: 'rahu', label: 'the phrase that spreads', note: 'Selected for propagation rather than meaning.', extension: true },

    { graha: 'ketu', label: 'what is left unsaid', note: 'The absence that carries the message.' },
    { graha: 'ketu', label: 'the cryptic remark', note: 'Classically Ketu’s: meaning withheld inside the words.' },
    { graha: 'ketu', label: 'walking out of the conversation', note: 'Exit as a speech act.' },
    { graha: 'ketu', label: 'the unanswered message', note: 'A thread simply severed. Ketu is the severed part.' },
    { graha: 'ketu', label: 'the last word', note: 'After which there is nothing further.' },
  ],
};
