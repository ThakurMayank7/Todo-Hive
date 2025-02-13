export function CheckCurrentDate(date: Date): boolean {
  // Normalize both dates to the start of the day (midnight)
  const d1 = new Date(date);
  const d2 = new Date();

  d1.setHours(0, 0, 0, 0); // Set time to midnight (00:00:00.000)
  d2.setHours(0, 0, 0, 0); // Set time to midnight (00:00:00.000)

  // Compare the dates (without time)
  return d1.getTime() === d2.getTime();
}
export function checkPastDate(date: Date): boolean {
  // Normalize both dates to the start of the day (midnight)
  const d1 = new Date(date);
  const d2 = new Date();

  d1.setHours(0, 0, 0, 0); // Set time to midnight (00:00:00.000)
  d2.setHours(0, 0, 0, 0); // Set time to midnight (00:00:00.000)

  // Compare the dates (without time)
  return d1.getTime() < d2.getTime();
}
export function CheckUpcomingDate(date: Date): boolean {
  // Normalize both dates to the start of the day (midnight)
  const d1 = new Date(date);
  const d2 = new Date();

  d1.setHours(0, 0, 0, 0); // Set time to midnight (00:00:00.000)
  d2.setHours(0, 0, 0, 0); // Set time to midnight (00:00:00.000)

  // Compare the dates (without time)
  return d1.getTime() >= d2.getTime();
}

export function CheckDateAfterDays(date: Date, days: number): boolean {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + days);

  return (
    date.getDate() === targetDate.getDate() &&
    date.getMonth() === targetDate.getMonth() &&
    date.getFullYear() === targetDate.getFullYear()
  );
}

export function CheckDateBeforeDays(date: Date, days: number): boolean {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() - days);

  return (
    date.getDate() === targetDate.getDate() &&
    date.getMonth() === targetDate.getMonth() &&
    date.getFullYear() === targetDate.getFullYear()
  );
}
