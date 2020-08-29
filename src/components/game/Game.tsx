import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import AudioCard from '../audioCard/AudioCard';
import AnswersList from '../answersList/AnswersList';
import Button from '../button/Button';
import navigationSubject from '../../subjects/NavigationSubject';
import styles from './game.module.scss';
import modifyBirdsData, { IBirdsDataExtended } from '../../viewModels/birdsViewModel';
import { Buttons, Paths } from '../../constants/strings';

const Game: React.FC = () => {
  const history = useHistory();
  const [isCorrect, setCorrect] = useState(false);
  const [isAnswered, setAnswered] = useState(false);
  const [answer, setAnswer] = useState<IBirdsDataExtended | undefined>(undefined);

  const path: string = useLocation().pathname;

  const [birdsData, setBirdsData] = useState(modifyBirdsData(path));

  navigationSubject.notify(path);
  const truthy = birdsData.find((x) => x.isCorrect);

  const onAnswer = (name: string) => {
    setAnswered(true);
    if (truthy && truthy.name === name) {
      setCorrect(true);
    }
    setAnswer(birdsData.find((bird) => bird.name === name));
  };

  const onNextClick = () => {
    if (isCorrect) {
      let currentPathIndex = Paths[path as keyof typeof Paths];
      if (currentPathIndex < Object.keys(Paths).length / 2 - 1) {
        currentPathIndex += 1;
        history.push(Paths[currentPathIndex]);
        setBirdsData(modifyBirdsData(Paths[currentPathIndex]));
        setAnswered(false);
        setCorrect(false);
      } else {
        // TODO
      }
    }
  };

  const answers = birdsData.map((bird) => bird.name);
  return (
    <div className={styles.game}>
      <AudioCard
        className={styles.audioCard}
        image={truthy ? truthy.imageElement : ''}
        audioUrl={truthy ? truthy.audio : 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
        name={truthy ? truthy.name : 'Something went wrong :('}
        isCorrect={isCorrect}
      />
      <AnswersList
        className={styles.answersList}
        answers={answers}
        handleClick={onAnswer}
      />
      <AudioCard
        className={styles.audioCardAnswer}
        image={answer?.imageElement}
        audioUrl={answer?.audio}
        name={answer?.name}
        latin={answer?.species}
        description={answer?.description}
        isAnswered={isAnswered}
        isFull
      />

      <Button className={styles.button} label="Next" onClick={onNextClick} isDisabled={!isCorrect} />

    </div>
  );
};

export default Game;
