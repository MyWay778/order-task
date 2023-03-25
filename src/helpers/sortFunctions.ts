import parseDate from './parseDate';

const sortFunctions = {
  byText: <K extends string, T extends { [key in K]: string }>(
    arr: T[],
    prop: K,
    mode = 'asc'
  ): T[] => {
    const copy = [...arr];
    const collator = new Intl.Collator(); //возможный аргумент 'ru-RU', для учета локали

    copy.sort((a, b) => {
      let res = collator.compare(a[prop], b[prop]);

      if (mode === 'desc') {
        res *= -1;
      }

      return res;
    });
    return copy;
  },

  byDate: <K extends string, T extends { [key in K]: string }>(arr: T[], prop: K, mode = 'asc') => {
    const copy = [...arr];

    copy.sort((a, b) => {
      const aDate = parseDate(a[prop]);
      const bDate = parseDate(b[prop]);
      let res = 0;

      if (aDate < bDate) {
        res = -1;
      } else if (aDate > bDate) {
        res = 1;
      }

      if (mode === 'desc') {
        res *= -1;
      }
      return res;
    });
    return copy;
  }
};

export default sortFunctions;
