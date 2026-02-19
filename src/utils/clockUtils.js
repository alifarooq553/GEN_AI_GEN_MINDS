// clockUtils.js — Live Clock using JavaScript Date API + setInterval

/**
 * Formats a Date object to "DD MMM YYYY | HH:MM:SS"
 */
export function formatDateTime(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mmm = date.toLocaleString('en-IN', { month: 'short' });
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${dd} ${mmm} ${yyyy}  |  ${hh}:${min}:${ss}`;
}

/**
 * Starts a live clock that calls onTick(formattedString) every second.
 * Returns a cleanup function to stop the clock.
 */
export function startClock(onTick) {
  onTick(formatDateTime(new Date())); // immediate first tick
  const id = setInterval(() => {
    onTick(formatDateTime(new Date()));
  }, 1000);
  return () => clearInterval(id);
}
