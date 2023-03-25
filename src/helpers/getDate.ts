// возвращает дату формата 05 февраля 2022
export default function getDate() {
  const date = new Date();

  return new Intl.DateTimeFormat('ru-Ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
    .format(date)
    .slice(0, -3);
}
