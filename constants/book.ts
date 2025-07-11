export const mapBookFormat = {
  1: 'Тверда обкладинка',
  2: 'М’яка обкладинка',
  3: 'Великий шрифт',
  4: 'Аудіокнига',
  5: 'Електронна книга',
} as const;

export const mapBookLanguage = {
  1: 'Англійська',
  2: 'Українська',
  3: 'Іспанська',
  4: 'Німецька',
  5: 'Французька',
  6: 'Італійська',
  7: 'Японська',
  8: 'Корейська',
  9: 'Китайська',
  10: 'Іврит',
} as const;

export const bookFormats = Object.entries(mapBookFormat).map(([value, name]) => ({
  value: Number(value),
  name,
}));

export const bookLanguages = Object.entries(mapBookLanguage).map(([value, name]) => ({
  value: Number(value),
  name,
}));

export type BookFormat = keyof typeof mapBookFormat;
export type BookLanguage = keyof typeof mapBookLanguage;
