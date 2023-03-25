export function normalizeDate(date: string) {
  const dateObj = new Date(date);

  return new Intl.DateTimeFormat('ru-Ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
    .format(dateObj)
    .slice(0, -3);
}
