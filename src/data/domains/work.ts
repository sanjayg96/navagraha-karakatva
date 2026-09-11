import type { Domain } from '../types';

export const work: Domain = {
  id: 'work',
  title: 'Work',
  subtitle: 'trades, professions, and kinds of effort',
  question: 'Forty-five ways of earning a living, grouped by what the work actually does.',
  clusterNotes: {
    surya: 'Work where one name is on the outcome. None of it can be done anonymously, and none of it can be shared.',
    chandra: 'Work that sustains other people. It produces no artefact; its output is that someone else kept going.',
    mangala: 'Work that requires the nerve to cut — into a body, a material, a situation. All of it carries risk of harm.',
    budha: 'Work that moves things between parties. The value added is entirely in the transfer, never in the thing itself.',
    guru: 'Work that confers legitimacy or grows what already exists. Each of these says “this is now allowed, or true, or larger”.',
    shukra: 'Work whose deliverable is that something is pleasing. The quality of the judgement is the entire product.',
    shani: 'Work measured in hours, wear and endurance — necessary, structural, and almost never credited.',
    rahu: 'Work at the edge of the regulated world, where the upside is enormous and nobody has written the rules yet.',
    ketu: 'Work done by seeing what is not there. All of it is diagnostic, solitary, and hard to explain from the inside.',
  },
  items: [
    { graha: 'surya', label: 'governing', note: 'Classically Sūrya’s: rule and public office.' },
    { graha: 'surya', label: 'leading an organisation', note: 'Where the buck genuinely stops.' },
    { graha: 'surya', label: 'medicine', note: 'Attested. The physician’s judgement restores vitality.' },
    { graha: 'surya', label: 'public office', note: 'Authority held visibly, and answerable for it.' },
    { graha: 'surya', label: 'anything you sign', note: 'Work that attaches irrevocably to your name.' },

    { graha: 'chandra', label: 'nursing', note: 'Continuous care rather than episodic intervention.' },
    { graha: 'chandra', label: 'caregiving', note: 'The work whose product is that somebody else is alright.' },
    { graha: 'chandra', label: 'hospitality', note: 'Making a stranger feel temporarily at home.' },
    { graha: 'chandra', label: 'dairy & farming', note: 'Attested. Water, milk, cultivation, and the patience of seasons.' },
    { graha: 'chandra', label: 'serving the public', note: 'Classically Chandra’s: work facing the crowd.' },

    { graha: 'mangala', label: 'surgery', note: 'The purest form of sanctioned cutting.' },
    { graha: 'mangala', label: 'soldiering', note: 'The classical Maṅgala profession.' },
    { graha: 'mangala', label: 'engineering', note: 'Attested. Metal, force, and the will to make matter behave.' },
    { graha: 'mangala', label: 'policing', note: 'Force exercised on behalf of an order.' },
    { graha: 'mangala', label: 'competitive sport', note: 'The body trained specifically to beat another body.' },

    { graha: 'budha', label: 'trade & brokerage', note: 'Classically Budha’s: buying in order to sell.' },
    { graha: 'budha', label: 'writing & editing', note: 'Experience converted into transmissible units.' },
    { graha: 'budha', label: 'accountancy', note: 'Attested. The world expressed as reconcilable figures.' },
    { graha: 'budha', label: 'programming', note: 'Precise instruction in a formal notation — Budha exactly.', extension: true },
    { graha: 'budha', label: 'translation', note: 'Moving meaning intact across a boundary.' },

    { graha: 'guru', label: 'teaching', note: 'The kāraka itself.' },
    { graha: 'guru', label: 'law', note: 'Attested. Rules expanded into rulings.' },
    { graha: 'guru', label: 'priesthood', note: 'Classically Guru’s. Sanction before the sacred.' },
    { graha: 'guru', label: 'advising & counselling', note: 'Being asked what a thing means.' },
    { graha: 'guru', label: 'banking', note: 'Attested. Money made larger by being lent on trust.' },

    { graha: 'shukra', label: 'art & design', note: 'Perceiving quality, professionally.' },
    { graha: 'shukra', label: 'music', note: 'Classically Śukra’s. Proportion rendered audible.' },
    { graha: 'shukra', label: 'fashion', note: 'Attraction as a manufactured good.' },
    { graha: 'shukra', label: 'diplomacy', note: 'Relation itself as the deliverable.' },
    { graha: 'shukra', label: 'anything involving taste', note: 'Where the judgement is the product.' },

    { graha: 'shani', label: 'manual labour', note: 'The classical Śani vocation. Paid in hours and wear.' },
    { graha: 'shani', label: 'mining & drilling', note: 'Attested. Deep, dark, slow extraction.' },
    { graha: 'shani', label: 'maintenance & repair', note: 'Keeping a thing alive past its glamour.' },
    { graha: 'shani', label: 'administration', note: 'The unseen scaffolding everything else stands on.' },
    { graha: 'shani', label: 'sanitation work', note: 'Necessary, structural, and systematically unthanked.' },

    { graha: 'rahu', label: 'speculation & trading', note: 'Gain uncoupled from production.' },
    { graha: 'rahu', label: 'advertising', note: 'Manufacturing appetite as a service.', extension: true },
    { graha: 'rahu', label: 'aviation', note: 'Classically Rāhu’s: crossing where humans do not belong.' },
    { graha: 'rahu', label: 'film & spectacle', note: 'Attested. The professional production of illusion.' },
    { graha: 'rahu', label: 'the unregulated new thing', note: 'Whatever the rules have not caught up with yet.' },

    { graha: 'ketu', label: 'pure research', note: 'Enquiry with no application in view.' },
    { graha: 'ketu', label: 'diagnosis', note: 'Classically Ketu’s. Seeing the hidden cause behind symptoms.' },
    { graha: 'ketu', label: 'contemplative practice', note: 'Attested. The renunciate’s occupation.' },
    { graha: 'ketu', label: 'forensic work', note: 'Reading what is left behind after the event.', extension: true },
    { graha: 'ketu', label: 'work you can’t explain doing', note: 'Competence arriving without a traceable method.' },
  ],
};
