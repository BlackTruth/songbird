import React from 'react';
import styles from './answersList.module.scss';

interface IAnswers {
  className: string,
  answers: IAnswerItem[],
  handleClick: (answer: string) => void,
}

export interface IAnswerItem {
  name: string,
  correct?: boolean,
}

const AnswersList: React.FC<IAnswers> = ({
  className, answers, handleClick,
}: IAnswers) => (
  <div className={`${styles.answers} ${className}`}>
    <div className={`${styles.answersFace} ${styles.answersFaceFront}`}>
      <ul>
        {answers.map(({ name: answer, correct }) => (
          <li className={`${correct ? styles.correct : ''} ${correct === false ? styles.mistake : ''}`} key={answer}>
            <button type="button" onClick={() => handleClick(answer)}>
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </div>
    <div className={`${styles.answersFace} ${styles.answersFaceBack}`} />
  </div>
);

export default AnswersList;
