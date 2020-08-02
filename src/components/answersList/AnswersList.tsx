import React from 'react';
import styles from './answersList.module.scss';

interface IAnswers {
  answers: string[],
  handleClick: (answer: string) => void,
}

const AnswersList: React.FC<IAnswers> = ({
  answers, handleClick,
}: IAnswers) => (
  <ul className={styles.answers}>
    {answers.map((answer) => (
      <li className={styles.correct} key={answer}>
        <button type="button" onClick={() => handleClick(answer)}>
          {answer}
        </button>
      </li>
    ))}
  </ul>
);

export default AnswersList;
