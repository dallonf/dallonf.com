import { Temporal } from "temporal-polyfill";

/**
 * Estimated time I started working with React.
 * About halfway through my time at GameSalad.
 */
const REACT_START = new Temporal.PlainDate(2015, 1, 1);
/**
 * When I started my engineering career (at Terralever), I was working part-time.
 * I don't feel quite right about counting those as a full years of experience,
 * but it's not nothing either, so I count them as half a year.
 * 
 * I also don't remember exactly when I started at Terralever, so I'm rounding up
 * to the end of the month.
 */
const PARTTIME_START = new Temporal.PlainDate(2010, 8, 30);
/**
 * I started working full-time at InMotion Software.
 */
const FULLTIME_START = new Temporal.PlainDate(2013, 8, 1);

export function reactYears(): number {
  const now = Temporal.Now.plainDateISO();
  const duration = now.since(REACT_START, {
    largestUnit: "year",
    smallestUnit: "month",
  });
  return duration.years;
}

export function experienceYears(): number {
  const now = Temporal.Now.plainDateISO();
  const fulltimeDuration = now.since(FULLTIME_START, {
    largestUnit: "year",
    smallestUnit: "month",
  });
  const parttimeDuration = FULLTIME_START.since(PARTTIME_START, {
    largestUnit: "year",
    smallestUnit: "month",
  });
  return fulltimeDuration.years + parttimeDuration.years / 2;
}
