import React from 'react';
import { useLocation } from 'react-router-dom';
import AudioCard from '../audioCard/AudioCard';
import AnswersList from '../answersList/AnswersList';
import Button from '../button/Button';
import navigationSubject from '../../subjects/NavigationSubject';
import styles from './game.module.scss';
import modifyBirdsData from '../../viewModels/birdsViewModel';

const Game: React.FC = () => {
  const path: string = useLocation().pathname;
  navigationSubject.notify(path);
  const birdData = modifyBirdsData(path);
  const truthy = birdData.find((x) => x.isCorrect);
  const answers = birdData.map((bird) => bird.name);
  return (
    <div className={styles.game}>
      <AudioCard
        className={styles.audioCard}
        image={truthy ? truthy.imageElement : ''}
        audioUrl={truthy ? truthy.audio : 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
        name={truthy ? truthy.name : 'Something went wrong :('}
      />
      <AnswersList
        className={styles.answersList}
        answers={answers}
        handleClick={() => {
        }}
      />
      <AudioCard
        className={styles.audioCardAnswer}
        image={truthy ? truthy.imageElement : ''}
        audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        name="Name"
        latin="Latin"
        description="Description"
        isFull
      />
      <Button className={styles.button} label="Next" onClick={() => {}} />
    </div>
  );
};

export default Game;
