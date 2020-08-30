import React from 'react';
import styles from './button.module.scss';

interface IButton {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  isDisabled?: boolean;
}

const Button: React.FC<IButton> = ({
  label, className, onClick, isDisabled,
}: IButton) => {
  const animateOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const button: HTMLButtonElement = e.target as HTMLButtonElement;
    button.classList.remove(styles.animate);
    button.classList.add(styles.animate);
    onClick(e);
    setTimeout(() => {
      button.classList.remove(styles.animate);
    }, 700);
  };

  return (
    <button
      disabled={isDisabled}
      type="button"
      className={`${styles.bubblyButton} ${className} ${isDisabled ? styles.bubblyButtonDisabled : ''}`}
      onClick={animateOnClick}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  isDisabled: false,
};

export default Button;
