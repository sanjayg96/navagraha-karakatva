import type { Domain } from '../types';

export const body: Domain = {
  id: 'body',
  title: 'The Body',
  subtitle: 'organs, tissues, systems — and what goes wrong with them',
  question: 'Forty-five parts of a human body. Why would anyone group them like this?',
  clusterNotes: {
    surya: 'The irreplaceable singles. You have one heart, one head, one axis — no redundancy, no substitute, and the entire system is arranged around them.',
    chandra: 'Everything whose job is to be a medium. Fluids carry, buffer and reflect; none of them is the message, and nothing works without them.',
    mangala: 'The hot and the red. Tissue that carries force, generates heat, and bleeds the moment it is breached.',
    budha: 'The interfaces. Skin, nerve, tongue, hand, gut — every surface where inside and outside exchange information or material.',
    guru: 'Tissue that exists to hold surplus. Fat, liver, girth: the body’s capacity to store more than this moment requires.',
    shukra: 'The apparatus of attraction and of joining — what makes one body want another, and what makes it pleasant to look at.',
    shani: 'The load-bearing and the slow-decaying. What is left after everything soft is gone, and what time visibly works on.',
    rahu: 'Amplifications and intrusions. Reactions out of all proportion, substances that were never meant to be inside, symptoms with no lesion to point at.',
    ketu: 'The body’s subtractions — what is missing, what has wasted away, what healed and left only a mark.',
  },
  items: [
    { graha: 'surya', label: 'the heart', note: 'One pump, no backup, at the centre of everything.' },
    { graha: 'surya', label: 'the right eye', note: 'Classically Sūrya’s own eye; the Moon takes the left.' },
    { graha: 'surya', label: 'the head', note: 'The seat of the self — where authority is located in a body.' },
    { graha: 'surya', label: 'digestive fire', note: 'Agni: the single heat source that makes food into a person.' },
    { graha: 'surya', label: 'vitality & immunity', note: 'Ojas — the overall capacity to stay alive and resist.' },

    { graha: 'chandra', label: 'plasma & lymph', note: 'Rasa dhātu: the first tissue, pure medium, carrier of everything.' },
    { graha: 'chandra', label: 'the left eye', note: 'The reflecting eye, as Sūrya rules the radiating one.' },
    { graha: 'chandra', label: 'the breasts', note: 'The organ of nourishing another body from your own.' },
    { graha: 'chandra', label: 'mucous membranes', note: 'Soft, wet, receptive surfaces — the body where it is most impressionable.' },
    { graha: 'chandra', label: 'fluid balance', note: 'Swelling, retention, thirst: the tides inside a person.' },

    { graha: 'mangala', label: 'red blood', note: 'The tissue that carries heat and force, and is lost on breach.' },
    { graha: 'mangala', label: 'bone marrow', note: 'Majjā — the fire kept in the deepest, most defended place.' },
    { graha: 'mangala', label: 'muscle', note: 'Māmsa: the body’s only means of applying force to the world.' },
    { graha: 'mangala', label: 'the gall bladder', note: 'Bile — concentrated corrosive heat, held under pressure.' },
    { graha: 'mangala', label: 'inflammation', note: 'Fever, redness, swelling: the body attacking something.' },

    { graha: 'budha', label: 'the nervous system', note: 'Signal, not substance — discrimination made physical.' },
    { graha: 'budha', label: 'the skin', note: 'The boundary that reports. Touch is how the body classifies.' },
    { graha: 'budha', label: 'tongue & vocal cords', note: 'The organs of articulation — dividing breath into meaning.' },
    { graha: 'budha', label: 'the hands', note: 'Manipulation, writing, trade, craft: intelligence with fingers.' },
    { graha: 'budha', label: 'the intestines', note: 'A long sorting machine: take this, reject that, in order.' },

    { graha: 'guru', label: 'the liver', note: 'The organ of metabolic abundance — storing, converting, detoxifying.' },
    { graha: 'guru', label: 'adipose fat', note: 'Meda dhātu: stored surplus. Guru’s vice and virtue in one tissue.' },
    { graha: 'guru', label: 'the thighs', note: 'Classically Guru’s limb; the body’s largest mass and its support.' },
    { graha: 'guru', label: 'the pancreas', note: 'Regulator of how much gets stored versus spent.', extension: true },
    { graha: 'guru', label: 'growth & girth', note: 'Sheer increase in volume — the most literal expansion there is.' },

    { graha: 'shukra', label: 'reproductive fluids', note: 'Śukra dhātu is named for this graha: the tissue of joining.' },
    { graha: 'shukra', label: 'the kidneys', note: 'Paired, balancing, refining — and classically Śukra’s.' },
    { graha: 'shukra', label: 'the throat', note: 'Where voice becomes music and where ornament is worn.' },
    { graha: 'shukra', label: 'complexion', note: 'The surface by which a body is found beautiful.' },
    { graha: 'shukra', label: 'hormonal glands', note: 'The chemistry of desire and attraction.', extension: true },

    { graha: 'shani', label: 'bones', note: 'What remains when everything soft has gone. Structure as residue.' },
    { graha: 'shani', label: 'teeth', note: 'Hard, slow-growing, unrepairable — they record your whole history.' },
    { graha: 'shani', label: 'joints & cartilage', note: 'Where the body experiences friction, and where it wears out.' },
    { graha: 'shani', label: 'fascia', note: 'Connective tissue: unglamorous, everywhere, load-bearing.', extension: true },
    { graha: 'shani', label: 'ageing of tissue', note: 'Not a part of the body — a process applied to all of it.' },

    { graha: 'rahu', label: 'undiagnosable symptoms', note: 'Real suffering with nothing to point at. Rāhu has no body.' },
    { graha: 'rahu', label: 'autoimmune reaction', note: 'Defence amplified past its limit, turned on the self.', extension: true },
    { graha: 'rahu', label: 'craving & addiction', note: 'A hunger that grows by being fed — Rāhu’s signature exactly.', extension: true },
    { graha: 'rahu', label: 'poisons & toxins', note: 'What should never have been inside, amplifying inside.' },
    { graha: 'rahu', label: 'parasites', note: 'An appetite living in a body that is not its own.' },

    { graha: 'ketu', label: 'scars', note: 'Healing that leaves only a mark — residue, which is Ketu’s whole nature.' },
    { graha: 'ketu', label: 'amputation', note: 'The part that is simply no longer there.' },
    { graha: 'ketu', label: 'wasting', note: 'Emaciation: subtraction continuing past where it should stop.' },
    { graha: 'ketu', label: 'sudden remission', note: 'Recovery nobody can account for. It arrives unearned and unexplained.' },
    { graha: 'ketu', label: 'phantom limb', note: 'Sensation with no body attached — Ketu in one image.', extension: true },
  ],
};
