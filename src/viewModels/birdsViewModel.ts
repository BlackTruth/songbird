import getBirdsData, { IBirdsData } from '../models/birdsModel';
import preloadImage from '../utils/preloadMedia';
import { Paths } from '../constants/strings';

export interface IBirdsDataExtended extends IBirdsData{
  isCorrect: boolean
  imageElement: string;
}

const modifyBirdsData = (pathName: string): IBirdsDataExtended[] => {
  const correctAnswer: number = Math.floor(Math.random() * 5);
  const birdsData: IBirdsData[] = getBirdsData(Paths[pathName as keyof typeof Paths]);
  return birdsData.map((bird, index) => {
    const extendedBird: IBirdsDataExtended = {
      ...bird,
      imageElement: preloadImage(bird.image),
      isCorrect: index === correctAnswer,
    };
    return extendedBird;
  }).sort(() => Math.random() - 0.5);
};

export default modifyBirdsData;
