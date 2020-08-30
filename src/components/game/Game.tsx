import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import correctAudio from '../../assets/sounds/correct.mp3';
import wrongAudio from '../../assets/sounds/wrong.mp3';
import AudioCard from '../audioCard/AudioCard';
import AnswersList, { IAnswerItem } from '../answersList/AnswersList';
import Button from '../button/Button';
import navigationSubject from '../../subjects/NavigationSubject';
import styles from './game.module.scss';
import modifyBirdsData, { IBirdsDataExtended } from '../../viewModels/birdsViewModel';
import { maxScore, Paths } from '../../constants/strings';
import { useAudio } from '../../utils/preloadMedia';
import scoreSubject from '../../subjects/ScoreSubject';

const Game: React.FC = () => {
  const history = useHistory();
  const [isCorrect, setCorrect] = useState(false);
  const [isAnswered, setAnswered] = useState(false);
  const [answer, setAnswer] = useState<IBirdsDataExtended | undefined>(undefined);
  const [score, setScore] = useState(maxScore);

  const path: string = useLocation().pathname;

  const [birdsData, setBirdsData] = useState(modifyBirdsData(path));

  navigationSubject.notify(path);
  const truthy = birdsData.find((x) => x.isCorrect);
  const [answers, setAnswers] = useState<IAnswerItem[]>(birdsData.map(({ name }) => ({ name })));

  const [playingCorrect, toggleCorrect] = useAudio(correctAudio);
  const [playingWrong, toggleWrong] = useAudio(wrongAudio);

  const onAnswer = (name: string) => {
    setAnswered(true);
    let correct = false;
    if (truthy && truthy.name === name) {
      if (!isCorrect) {
        setCorrect(true);
        correct = true;
        toggleCorrect();
        scoreSubject.notify(score);
        setScore(maxScore);
      }
    }

    if (!isCorrect) {
      let needUpdate = false;
      const currentBird = answers.find((bird) => bird.name === name);
      if (currentBird) {
        if (currentBird.correct === undefined) {
          needUpdate = true;
        }
      }
      setAnswers((state) => {
        const correctBird = state.find((bird) => bird.name === name);
        if (correctBird) {
          correctBird.correct = correct;
        }
        return state;
      });
      if (!correct && needUpdate) {
        toggleWrong();
        setScore(score - 1);
      }
    }
    setAnswer(birdsData.find((bird) => bird.name === name));
  };

  const onNextClick = () => {
    if (isCorrect) {
      let currentPathIndex = Paths[path as keyof typeof Paths];
      if (currentPathIndex < Object.keys(Paths).length / 2 - 1) {
        currentPathIndex += 1;
        history.push(Paths[currentPathIndex]);
        const newBirds = modifyBirdsData(Paths[currentPathIndex]);
        setBirdsData(newBirds);
        setAnswered(false);
        setCorrect(false);
        setAnswers(newBirds.map(({ name }) => ({ name })));
      } else {
        // TODO
      }
    }
  };

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

      <Button className={styles.button} label="Далее" onClick={onNextClick} isDisabled={!isCorrect} />

    </div>
  );
};

export default Game;
