export function isNumeric(n) {
  return !Number.isNaN(Number.parseFloat(n)) && Number.isFinite(n);
}
