export default class DateService {
  static now(): string {
    const formattedDate = this.formatDate(new Date());
    return this.sliceYearPostfix(formattedDate);
  }

  static normalize(date: string): string {
    const dateObj = new Date(date);

    const formattedDate = this.formatDate(dateObj);
    return this.sliceYearPostfix(formattedDate);
  }

  // парсит дату формата "11 июля 2022"
  static parse(date: string): Date {
    const [day, stringMonth, year] = date.split(' ');

    if (!day || !stringMonth || !year) {
      throw new Error(`parseDate: Invalid argument date: ${date}`);
    }

    const month = this.convertMonth(stringMonth);

    if (month === -1) {
      throw new Error(`parseDate: Invalid month string: ${stringMonth}`);
    }

    const obj = new Date(Number(year), month, Number(day));
    return obj;
  }

  private static formatDate(date: Date): string {
    return new Intl.DateTimeFormat('ru-Ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  // обрезаем 'г.' от даты формата '05 февраля 2022 г.'
  private static sliceYearPostfix(date: string): string {
    const yearPostfixIndexFromEnd = -3;

    return date.slice(0, yearPostfixIndexFromEnd);
  }

  private static convertMonth(month: string): number {
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
}
