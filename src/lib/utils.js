import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function timeToZero(oldDate) {
  const newDate = new Date(oldDate)

  // Set Time to 00:00:00
  newDate.setHours(0)
  newDate.setMinutes(0)
  newDate.setSeconds(0)

  // Technically ms still different, but doesn't show up in default string form

  return newDate
}