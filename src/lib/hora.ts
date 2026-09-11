import type { GrahaId } from '../data/types';

/** Weekday lords, Sunday first. Rāhu and Ketu rule no vāra and no horā. */
export const VARA_LORDS: GrahaId[] = ['surya', 'chandra', 'mangala', 'budha', 'guru', 'shukra', 'shani'];

/**
 * Chaldean order — the seven visible grahas by apparent speed, slowest first.
 * The horā sequence walks this cycle, which is exactly why the weekday names
 * come out in the order they do.
 */
export const CHALDEAN: GrahaId[] = ['shani', 'guru', 'mangala', 'surya', 'shukra', 'budha', 'chandra'];

const DEG = Math.PI / 180;

/**
 * NOAA solar position equations. Returns sunrise and sunset as minutes past
 * local midnight, or null where the sun does not rise or set that day.
 */
export function sunTimes(date: Date, latDeg: number, lonEastDeg: number): { sunrise: number; sunset: number } | null {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const dayOfYear = Math.floor((Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start) / 86400000);

  const gamma = ((2 * Math.PI) / 365) * (dayOfYear - 1);
  const eqtime =
    229.18 * (0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma)
      - 0.014615 * Math.cos(2 * gamma) - 0.040849 * Math.sin(2 * gamma));
  const decl =
    0.006918 - 0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma)
    - 0.006758 * Math.cos(2 * gamma) + 0.000907 * Math.sin(2 * gamma)
    - 0.002697 * Math.cos(3 * gamma) + 0.00148 * Math.sin(3 * gamma);

  const lat = latDeg * DEG;
  // 90.833 degrees accounts for refraction and the solar disc.
  const cosH = Math.cos(90.833 * DEG) / (Math.cos(lat) * Math.cos(decl)) - Math.tan(lat) * Math.tan(decl);
  if (cosH > 1 || cosH < -1) return null; // polar day or night

  const ha = Math.acos(cosH) / DEG;
  const sunriseUTC = 720 - 4 * (lonEastDeg + ha) - eqtime;
  const sunsetUTC = 720 - 4 * (lonEastDeg - ha) - eqtime;

  // Shift from UTC minutes into this browser's local clock.
  const offset = -date.getTimezoneOffset();
  return { sunrise: sunriseUTC + offset, sunset: sunsetUTC + offset };
}

export interface HoraSlot { graha: GrahaId; start: Date; end: Date; night: boolean }

export interface HoraState {
  vara: GrahaId;
  /** The vāra changes at sunrise, so before dawn this is still yesterday's date. */
  varaDate: Date;
  slots: HoraSlot[];
  currentIndex: number;
  fallback: boolean;
  sunrise: Date;
  sunset: Date;
}

const atMinutes = (day: Date, mins: number) => {
  const d = new Date(day.getFullYear(), day.getMonth(), day.getDate());
  d.setTime(d.getTime() + mins * 60000);
  return d;
};

const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

/**
 * Twelve horās between sunrise and sunset and twelve more through the night,
 * each cycling the Chaldean order from the day lord. Falls back to 06:00/18:00
 * when no coordinates are available — the UI says so when it does.
 */
export function computeHoras(now: Date, coords: { lat: number; lon: number } | null): HoraState {
  const fallback = !coords;
  const sun = (day: Date) => {
    if (coords) {
      const t = sunTimes(day, coords.lat, coords.lon);
      if (t) return t;
    }
    return { sunrise: 6 * 60, sunset: 18 * 60 };
  };

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tToday = sun(today);
  let sunriseD = atMinutes(today, tToday.sunrise);
  let sunsetD = atMinutes(today, tToday.sunset);

  let varaDate = today;
  let dayStart: Date, dayEnd: Date, nightEnd: Date;

  if (now < sunriseD) {
    // Still in last night: the vāra has not turned over yet.
    const yest = addDays(today, -1);
    const tY = sun(yest);
    varaDate = yest;
    dayStart = atMinutes(yest, tY.sunrise);
    dayEnd = atMinutes(yest, tY.sunset);
    nightEnd = sunriseD;
    sunriseD = dayStart;
    sunsetD = dayEnd;
  } else {
    const tom = addDays(today, 1);
    dayStart = sunriseD;
    dayEnd = sunsetD;
    nightEnd = atMinutes(tom, sun(tom).sunrise);
  }

  const dayLen = (dayEnd.getTime() - dayStart.getTime()) / 12;
  const nightLen = (nightEnd.getTime() - dayEnd.getTime()) / 12;

  const vara = VARA_LORDS[varaDate.getDay()];
  const base = CHALDEAN.indexOf(vara);

  const slots: HoraSlot[] = [];
  for (let i = 0; i < 24; i++) {
    const night = i >= 12;
    const startMs = night
      ? dayEnd.getTime() + (i - 12) * nightLen
      : dayStart.getTime() + i * dayLen;
    slots.push({
      graha: CHALDEAN[(base + i) % 7],
      start: new Date(startMs),
      end: new Date(startMs + (night ? nightLen : dayLen)),
      night,
    });
  }

  let currentIndex = slots.findIndex((s) => now >= s.start && now < s.end);
  if (currentIndex < 0) currentIndex = now < slots[0].start ? 0 : 23;

  return { vara, varaDate, slots, currentIndex, fallback, sunrise: sunriseD, sunset: sunsetD };
}

export const fmtTime = (d: Date) =>
  d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
