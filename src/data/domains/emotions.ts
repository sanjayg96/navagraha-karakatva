import type { Domain } from '../types';

export const emotions: Domain = {
  id: 'emotions',
  title: 'Emotions',
  subtitle: 'moods, drives, and states of mind',
  question: 'Forty-five feelings. Sorted not by pleasant and unpleasant — by what each one does.',
  clusterNotes: {
    surya: 'Feelings organised around a centre that must be recognised. Every one of them is about standing in the middle of something and being seen there.',
    chandra: 'The tidal feelings. They arrive, crest and recede without being chosen, and every one of them is about belonging or its absence.',
    mangala: 'Heat states. Each raises the temperature and shortens the distance between feeling something and doing something.',
    budha: 'Feelings that live at the speed of thought — quick, light, verbal, and never quite still.',
    guru: 'Expansive states. Each enlarges your sense of what is possible; each becomes a vice simply by not stopping.',
    shukra: 'Feelings that pull one person toward another, or toward a beautiful thing. Attraction, and attraction’s shadow.',
    shani: 'The cold, slow, heavy feelings. Every one of them is the felt sense of a limit that is not going to move.',
    rahu: 'Hungers. The test for whether a feeling belongs to Rāhu is simple: does it get bigger when you feed it?',
    ketu: 'The emptied states — what is left when wanting withdraws. Sometimes that is freedom and sometimes it is only absence.',
  },
  items: [
    { graha: 'surya', label: 'pride', note: 'The feeling of being the centre, and of that being correct.' },
    { graha: 'surya', label: 'dignity', note: 'Self-worth that does not poll the room first.' },
    { graha: 'surya', label: 'confidence', note: 'Certainty sourced from inside rather than from agreement.' },
    { graha: 'surya', label: 'the wish to be seen', note: 'Sūrya’s engine and Sūrya’s trap, undivided.' },
    { graha: 'surya', label: 'magnanimity', note: 'Generosity from a position of surplus — the king’s virtue.' },

    { graha: 'chandra', label: 'contentment', note: 'Nothing is wanted. The mind’s surface is briefly still.' },
    { graha: 'chandra', label: 'nostalgia', note: 'Memory felt as mood — the past arriving as weather.' },
    { graha: 'chandra', label: 'moodiness', note: 'Emotional tide without an identifiable cause.' },
    { graha: 'chandra', label: 'tenderness', note: 'The softening that makes care possible.' },
    { graha: 'chandra', label: 'homesickness', note: 'Belonging, experienced as a lack.' },

    { graha: 'mangala', label: 'anger', note: 'The pure form: heat that wants to cut something.' },
    { graha: 'mangala', label: 'courage', note: 'Identical machinery to anger, pointed at a worthier target.' },
    { graha: 'mangala', label: 'irritation', note: 'Anger at low amplitude and high frequency.' },
    { graha: 'mangala', label: 'competitiveness', note: 'The need to be measured against someone and win.' },
    { graha: 'mangala', label: 'decisiveness', note: 'The felt snap of cutting off every other option.' },

    { graha: 'budha', label: 'curiosity', note: 'The impulse to take a thing apart and see the pieces.' },
    { graha: 'budha', label: 'wit', note: 'Intelligence moving faster than the situation requires.' },
    { graha: 'budha', label: 'nervous anxiety', note: 'Thought speed exceeding what the body can carry. Not dread — buzz.' },
    { graha: 'budha', label: 'scepticism', note: 'The reflex to test a claim before believing it.' },
    { graha: 'budha', label: 'playfulness', note: 'Handling something seriously without taking it seriously.' },

    { graha: 'guru', label: 'faith', note: 'Confidence in a meaning you cannot presently verify.' },
    { graha: 'guru', label: 'gratitude', note: 'The recognition of having received more than you supplied.' },
    { graha: 'guru', label: 'optimism', note: 'The forward-leaning assumption that there is more room ahead.' },
    { graha: 'guru', label: 'generosity', note: 'Expansion enacted rather than merely felt.' },
    { graha: 'guru', label: 'complacency', note: 'Expansion that has stopped checking whether it is still true.' },

    { graha: 'shukra', label: 'attraction', note: 'The pull toward. Śukra in its simplest form.' },
    { graha: 'shukra', label: 'affection', note: 'Warmth that wants proximity rather than possession.' },
    { graha: 'shukra', label: 'aesthetic delight', note: 'The involuntary yes in front of something beautiful.' },
    { graha: 'shukra', label: 'romantic longing', note: 'Attraction with distance built into it.' },
    { graha: 'shukra', label: 'jealousy', note: 'Attraction defending its claim — Śukra’s characteristic distortion.' },

    { graha: 'shani', label: 'fear', note: 'The anticipation of a limit you will not be able to move.' },
    { graha: 'shani', label: 'patience', note: 'Willing agreement with how long something actually takes.' },
    { graha: 'shani', label: 'grief', note: 'The weight of something that has finished and will not restart.' },
    { graha: 'shani', label: 'resignation', note: 'Acceptance with the vitality drained out of it.' },
    { graha: 'shani', label: 'dread', note: 'Fear with no object and no deadline. Saturn’s baseline hum.' },

    { graha: 'rahu', label: 'craving', note: 'Wanting that survives being satisfied.' },
    { graha: 'rahu', label: 'obsession', note: 'Attention that has lost the ability to leave.' },
    { graha: 'rahu', label: 'envy', note: 'Craving aimed at a person instead of a thing.' },
    { graha: 'rahu', label: 'restlessness', note: 'Appetite with no specific object yet.' },
    { graha: 'rahu', label: 'fascination', note: 'The pull of the strange — Rāhu’s most generative face.' },

    { graha: 'ketu', label: 'indifference', note: 'Wanting has withdrawn. Whether that is peace depends entirely on context.' },
    { graha: 'ketu', label: 'disillusionment', note: 'The moment a thing stops being able to hold your desire.' },
    { graha: 'ketu', label: 'detachment', note: 'Presence without grip.' },
    { graha: 'ketu', label: 'existential doubt', note: 'The question that dissolves the frame instead of answering inside it.' },
    { graha: 'ketu', label: 'sudden clarity', note: 'Understanding that arrives unearned, usually after you gave up.' },
  ],
};
