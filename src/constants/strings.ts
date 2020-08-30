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

const maxScore = 5;
const scoreToWIn = 30;

export default {
  Buttons,
};

export {
  Buttons, Paths, maxScore, scoreToWIn,
};
