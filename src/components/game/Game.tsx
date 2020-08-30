import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import correctAudio from '../../assets/sounds/correct.mp3';
import wrongAudio from '../../assets/sounds/wrong.mp3';
import winAudio from '../../assets/sounds/win.mp3';
import partlyWinAudio from '../../assets/sounds/partlyWin.mp3';
import AudioCard from '../audioCard/AudioCard';
import AnswersList, { IAnswerItem } from '../answersList/AnswersList';
import Button from '../button/Button';
import styles from './game.module.scss';
import modifyBirdsData, { IBirdsDataExtended } from '../../viewModels/birdsViewModel';
import { maxScore, scoreToWIn, Paths } from '../../constants/strings';
import { useAudio } from '../../utils/preloadMedia';
import scoreSubject from '../../subjects/ScoreSubject';
import Modal from '../modal/Modal';
import useModal from '../../utils/useModal';
import navigationSubject from '../../subjects/NavigationSubject';
import correctSubject from '../../subjects/CorrectSubject';

const Game: React.FC = () => {
  const history = useHistory();
  const [isNewGame, setNewGame] = useState(true);
  const path: string = useLocation().pathname;
  const [isCorrect, setCorrect] = useState(false);
  const [isAnswered, setAnswered] = useState(false);
  const [answer, setAnswer] = useState<IBirdsDataExtended | undefined>(undefined);
  const [score, setScore] = useState(maxScore);
  const [total, setTotal] = useState(0);
  const [birdsData, setBirdsData] = useState(modifyBirdsData(path));
  const [answers, setAnswers] = useState<IAnswerItem[]>(birdsData.map(({ name }) => ({ name })));

  const truthy = birdsData.find((x) => x.isCorrect);
  console.log('Правильный ответ:', truthy ? truthy.name : '?');
  navigationSubject.notify(path);

  const { isShowing, toggle } = useModal();
  const [, toggleCorrect] = useAudio(correctAudio);
  const [, toggleWrong] = useAudio(wrongAudio);
  const [, toggleWin] = useAudio(winAudio);
  const [, togglePartlyWin] = useAudio(partlyWinAudio);

  const stopAudio = () => {
    toggleCorrect(false);
    toggleWrong(false);
    toggleWin(false);
    togglePartlyWin(false);
  };

  const resetLevel = (nextLevel: number) => {
    const newBirds = modifyBirdsData(Paths[nextLevel]);
    setBirdsData(newBirds);
    setAnswered(false);
    setAnswer(undefined);
    setCorrect(false);
    setScore(maxScore);
    setAnswers(newBirds.map(({ name }) => ({ name })));
    history.push(Paths[nextLevel]);
  };

  const onNewGame = () => {
    toggle();
    scoreSubject.notify(-total);
    setTotal(0);
    resetLevel(0);
  };

  const onAnswer = (name: string) => {
    setAnswered(true);
    let correct = false;
    if (truthy && truthy.name === name) {
      if (!isCorrect) {
        setCorrect(true);
        correct = true;
        stopAudio();
        correctSubject.notify();
        toggleCorrect();
        scoreSubject.notify(score);
        setTotal(total + score);
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
        stopAudio();
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
        resetLevel(currentPathIndex);
      } else {
        if (scoreToWIn === total) {
          stopAudio();
          toggleWin();
        } else {
          stopAudio();
          togglePartlyWin();
        }
        toggle();
      }
    }
  };

  if (isNewGame) {
    setNewGame(false);
    if (path !== Paths[0]) {
      resetLevel(0);
    }
  }

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
      <Modal
        isShowing={isShowing}
        hide={onNewGame}
        score={total}
      />
      <Button className={styles.button} label="Далее" onClick={onNextClick} isDisabled={!isCorrect} />

    </div>
  );
};

export default Game;
