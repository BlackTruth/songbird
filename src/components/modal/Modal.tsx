import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.scss';
import Button from '../button/Button';
import { scoreToWIn } from '../../constants/strings';
import winPicture from '../../assets/images/tryAgain.gif';
import excellentPicture from '../../assets/images/win.gif';

interface IModal {
  isShowing: boolean,
  hide: ()=>void,
  score: number,
}

const Modal: React.FC<IModal> = ({
  isShowing, hide, score,
}) => {
  let greeting = (
    <p>
      Вы набрали
      {' '}
      {score}
      {' '}
      баллов из
      {' '}
      {scoreToWIn}
      {' '}
      возможных.
    </p>
  );
  if (score < scoreToWIn) {
    greeting = (
      <p>
        Вы набрали
        {' '}
        {score}
        {' '}
        баллов из
        {' '}
        {scoreToWIn}
        {' '}
        возможных. Попробуйте еще раз.
      </p>
    );
  }

  return (isShowing ? ReactDOM.createPortal(
    <>
      <div className={styles.modalOverlay} />
      <div className={styles.modalWrapper} aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className={styles.modal}>

          <div className={styles.modalHeader}>
            {greeting}
          </div>
          <img src={score >= scoreToWIn ? excellentPicture : winPicture} alt="win" />
          <Button
            label="Начать новую игру"
            onClick={hide}
          />
        </div>
      </div>
    </>, document.body,
  ) : null);
};

export default Modal;
