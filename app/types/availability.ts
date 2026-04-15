import type { WeekDay, TimeString } from "./common";

export interface AvailabilityDay {
  day: WeekDay;

  isAvailable: boolean;

  startTime: TimeString;
  endTime: TimeString;
}