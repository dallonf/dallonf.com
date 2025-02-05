import { Temporal } from "temporal-polyfill";

const REACT_START = new Temporal.PlainDate(2015, 1, 1);
const FULLTIME_START = new Temporal.PlainDate(2013, 8, 1);
const PARTTIME_START = new Temporal.PlainDate(2010, 8, 30); // don't remember the exact date; it was later in the month iirc

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
