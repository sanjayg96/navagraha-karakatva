import type { Domain } from '../types';

export const money: Domain = {
  id: 'money',
  title: 'Money',
  subtitle: 'income, assets, debt, and how wealth behaves',
  question: 'Forty-four things money does. Grouped by mechanism, not by amount.',
  clusterNotes: {
    surya: 'Money attached to a name and an office. It arrives because of who you are in a structure, not because of a transaction.',
    chandra: 'Money as liquid. Everything here is about flow, buffer and fluctuation rather than accumulation.',
    mangala: 'Money taken. Won, seized, collected or extracted by direct effort — every rupee here cost a fight.',
    budha: 'Money made in the gap between two parties. The margin, the fee, the spread: value from moving, never from holding.',
    guru: 'Money that grows while you are not touching it. Trust, credit, compounding — expansion as a financial mechanism.',
    shukra: 'Money as taste. Spent on beauty, received through relationship, measured in the quality of what it buys.',
    shani: 'Money and time bound together — debt, rent, depreciation, the long repayment. Obligation with a clock attached.',
    rahu: 'Money that appears out of proportion to the work. Leverage, speculation, windfall: amplification applied to capital.',
    ketu: 'Money that leaves. Written off, renounced, lost without explanation, or quietly stopped mattering.',
  },
  items: [
    { graha: 'surya', label: 'salary from office', note: 'Paid for occupying a position, not for a transaction.' },
    { graha: 'surya', label: 'capital in your own name', note: 'Ownership that cannot be delegated.' },
    { graha: 'surya', label: 'reputation as an asset', note: 'The balance sheet item that is literally your name.', extension: true },
    { graha: 'surya', label: 'the inheritance you head', note: 'Classically Sūrya’s: patrimony and the father’s estate.' },
    { graha: 'surya', label: 'the decision to spend', note: 'Authority over the money, distinct from having it.' },

    { graha: 'chandra', label: 'cash flow', note: 'Not how much — how freely it moves.' },
    { graha: 'chandra', label: 'the emergency fund', note: 'Money kept purely so you can feel safe.' },
    { graha: 'chandra', label: 'income from the public', note: 'Classically Chandra’s: earnings from the crowd.' },
    { graha: 'chandra', label: 'fluctuating earnings', note: 'Income with a tide in it.' },
    { graha: 'chandra', label: 'household money', note: 'What actually runs the home, day to day.' },

    { graha: 'mangala', label: 'money won by competition', note: 'Someone else did not get it.' },
    { graha: 'mangala', label: 'land', note: 'Classically Maṅgala’s: property, held and defended.' },
    { graha: 'mangala', label: 'deliberate risk', note: 'Exposure taken on purpose, with the odds understood.' },
    { graha: 'mangala', label: 'debt you collect', note: 'Recovering what is owed takes nerve, not arithmetic.' },
    { graha: 'mangala', label: 'earnings from sheer effort', note: 'Paid in direct proportion to force applied.' },

    { graha: 'budha', label: 'commission & margin', note: 'Classically Budha’s: the trader’s cut.' },
    { graha: 'budha', label: 'the contract', note: 'Where the terms of an exchange are fixed in language.' },
    { graha: 'budha', label: 'bookkeeping', note: 'Attested. Money made legible to itself.' },
    { graha: 'budha', label: 'many small transactions', note: 'Volume and velocity rather than size.' },
    { graha: 'budha', label: 'the negotiated price', note: 'Value settled by articulation, not by cost.' },

    { graha: 'guru', label: 'compounding investment', note: 'Expansion with no further input. Guru’s purest financial form.' },
    { graha: 'guru', label: 'credit & trust', note: 'Money extended purely on the belief you will return it.' },
    { graha: 'guru', label: 'patronage received', note: 'Someone made room for you.' },
    { graha: 'guru', label: 'wealth that grows unattended', note: 'Classically Guru’s: increase without effort.' },
    { graha: 'guru', label: 'what you give away', note: 'Dāna — expenditure that expands rather than depletes.' },

    { graha: 'shukra', label: 'luxury spending', note: 'Paying for quality past the point of function.' },
    { graha: 'shukra', label: 'what a partner brings', note: 'Classically Śukra’s: wealth through marriage and alliance.' },
    { graha: 'shukra', label: 'money spent on beauty', note: 'Expenditure where the return is entirely aesthetic.' },
    { graha: 'shukra', label: 'collectibles', note: 'Assets whose value is taste agreeing with taste.', extension: true },
    { graha: 'shukra', label: 'the cost of comfort', note: 'The standing price of living well.' },

    { graha: 'shani', label: 'debt you owe', note: 'Obligation with time attached. Śani in one line.' },
    { graha: 'shani', label: 'rent', note: 'Paying continuously for something that never becomes yours.' },
    { graha: 'shani', label: 'depreciation', note: 'Not a loss event — time, billed quietly.' },
    { graha: 'shani', label: 'the thirty-year repayment', note: 'A commitment measured in decades.' },
    { graha: 'shani', label: 'savings built slowly', note: 'Accumulation by patience rather than by return.' },

    { graha: 'rahu', label: 'speculation', note: 'Gain uncoupled from production.' },
    { graha: 'rahu', label: 'leverage', note: 'Amplification applied directly to capital.', extension: true },
    { graha: 'rahu', label: 'the sudden windfall', note: 'Classically Rāhu’s: gain out of all proportion to cause.' },
    { graha: 'rahu', label: 'hype assets', note: 'Price driven by appetite rather than by value.', extension: true },
    { graha: 'rahu', label: 'money you can’t fully source', note: 'Where the provenance gets vague.' },

    { graha: 'ketu', label: 'unexplained losses', note: 'Classically Ketu’s: money that simply goes.' },
    { graha: 'ketu', label: 'write-offs', note: 'Formally recognising that it is gone.' },
    { graha: 'ketu', label: 'what you renounce', note: 'Attested. Wealth deliberately let go of.' },
    { graha: 'ketu', label: 'money you stop caring about', note: 'Still there; no longer has any hold on you.' },
  ],
};
