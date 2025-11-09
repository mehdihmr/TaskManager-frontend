/**
 * Returns the difference in days between a target date string and today.
 * @param {string} dateStr - A date string parsable by Date, e.g. "Sun, 09 Nov 2025 12:53:45 GMT"
 * @returns {number} - Number of days difference (positive if in the future, negative if past)
 */
export function getDaysDifference(dateStr) {
  const targetDate = new Date(dateStr);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to midnight

  const diffMs = targetDate - today;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
}
