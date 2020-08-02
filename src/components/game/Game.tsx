import React from 'react';
import { useLocation } from 'react-router-dom';
import AudioCard from '../audioCard/AudioCard';
import AnswersList from '../answersList/AnswersList';
import navigationSubject from '../../subjects/NavigationSubject';

const Game: React.FC = () => {
  navigationSubject.notify(useLocation().pathname);
  return (
    <>
      <AudioCard
        imageUrl="https://www.freevector.com/uploads/vector/preview/15564/FreeVector-Happy-Bird.jpg"
        audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        name="Name"
        latin="Latin"
        description="Description"
        isFull
      />
      <AnswersList
        answers={['a', 'b', 'c', 'd', 'e']}
        handleClick={() => {
        }}
      />
    </>
  );
};

export default Game;
