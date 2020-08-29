import birdsList from '../constants/birdsList';

export interface IBirdsData {
  id: number,
  name: string,
  species: string,
  description: string,
  image: string,
  audio: string
}

const getBirdsData = (pathName: number): IBirdsData[] => birdsList[pathName];

export default getBirdsData;
