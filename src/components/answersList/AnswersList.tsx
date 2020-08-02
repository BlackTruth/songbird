import React from 'react';
import styles from './answersList.module.scss';

interface IAnswers {
  answers: string[],
  handleClick: (answer: string) => void,
}

const AnswersList: React.FC<IAnswers> = ({
  answers, handleClick,
}: IAnswers) => (
  <div className={styles.answers}>
    <div className={`${styles.answersFace} ${styles.answersFaceFront}`}>
      <ul>
        {answers.map((answer) => (
          <li className={styles.correct} key={answer}>
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
