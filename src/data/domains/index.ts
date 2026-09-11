import type { Domain } from '../types';
import { body } from './body';
import { emotions } from './emotions';
import { people } from './people';
import { places } from './places';
import { objects } from './objects';
import { work } from './work';
import { food } from './food';
import { money } from './money';
import { time } from './time';
import { speech } from './speech';

/** Order here is the order shown on the home grid. */
export const DOMAINS: Domain[] = [
  body, emotions, people, places, objects, work, food, money, time, speech,
];

export const DOMAIN_MAP: Record<string, Domain> = Object.fromEntries(
  DOMAINS.map((d) => [d.id, d]),
);
