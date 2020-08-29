enum Buttons {
  warmup = 'Разминка',
  sparrow ='Воробьиные',
  forest = 'Лесные птицы',
  sing = 'Певчие птицы',
  predatory = 'Хищные птицы',
  sea = 'Морские птицы',
}

enum Paths {
  '/warmup',
  '/sparrow',
  '/forest',
  '/sing',
  '/predatory',
  '/sea',
}

// const buttons: string[] = [
//   'Разминка', 'Воробьиные', 'Лесные птицы', 'Певчие птицы', 'Хищные птицы', 'Морские птицы',
// ];

export default {
  Buttons,
};

export { Buttons, Paths };
