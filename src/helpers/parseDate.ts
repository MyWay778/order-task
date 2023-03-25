// парсит дату формата "11 июля 2022"
export default function parseDate(date: string) {
  const [day, stringMonth, year] = date.split(' ');

  if (!day || !stringMonth || !year) {
    throw new Error(`parseDate: Invalid argument date: ${date}`);
  }

  const month = convertMonth(stringMonth);

  if (month === -1) {
    throw new Error(`parseDate: Invalid month string: ${stringMonth}`);
  }

  const obj = new Date(Number(year), month, Number(day));
  return obj;
}

function convertMonth(month: string): number {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'сентября',
    'октября',
    'ноября',
    'декабря'
  ];

  return months.indexOf(month);
}
