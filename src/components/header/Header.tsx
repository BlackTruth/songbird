import React, { createRef, useEffect, useState } from 'react';

import { v4 as uuid } from 'uuid';
import styles from './header.module.scss';

import { Buttons } from '../../constants/strings';
import navigationSubject from '../../subjects/NavigationSubject';

import scoreSubject from '../../subjects/ScoreSubject';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    indexkey?: string;
  }
}

const Header: React.FC = () => {
  const [score, setScore] = useState(0);
  const addScore = (newPoints: number) => {
    setScore(score + newPoints);
  };
  useEffect(() => {
    scoreSubject.subscribe(addScore);
    return () => {
      scoreSubject.unsubscribe(addScore);
    };
  });
  const mobileMenuRef = createRef<HTMLElement>();
  const menuRef = createRef<HTMLUListElement>();
  const burgerRef = createRef<HTMLDivElement>();

  const onMenuToggle = () => {
    const burger: HTMLElement | null = burgerRef.current;
    const menu: HTMLElement | null = mobileMenuRef.current;
    if (burger) {
      const isShown = burger.classList.contains(styles.burgerMenuToggled);
      if (isShown) {
        burger.classList.remove(styles.burgerMenuToggled);
      } else {
        burger.classList.add(styles.burgerMenuToggled);
      }
      if (menu) {
        if (isShown) {
          menu.classList.remove(styles.menuMobileEnabled);
        } else {
          menu.classList.add(styles.menuMobileEnabled);
        }
      }
    }
  };

  const setActiveMenu = (path: string) => {
    const mobileMenu: HTMLElement | null = mobileMenuRef.current;
    const mainMenu: HTMLElement | null = menuRef.current;
    const updateMenu = (menu: HTMLElement, active: string, completed?: string) => {
      let beforeActive = true;
      menu.querySelectorAll('li').forEach((item) => {
        const key: string | null = item.getAttribute('indexkey');
        if (key && path.includes(key)) {
          beforeActive = false;
          if (!item.classList.contains(active)) {
            item.classList.add(active);
          }
        } else if (item.classList.contains(active)) {
          item.classList.remove(active);
        }
        if (completed) {
          item.classList.remove(completed);
        }
        if (beforeActive && completed) {
          item.classList.add(completed);
        }
      });
    };
    if (mobileMenu) {
      updateMenu(mobileMenu, styles.active);
    }
    if (mainMenu) {
      updateMenu(mainMenu, styles.menuButtonActive, styles.menuButtonCompleted);
    }
  };

  useEffect(() => {
    navigationSubject.subscribe(setActiveMenu);

    return () => {
      navigationSubject.unsubscribe(setActiveMenu);
    };
  });

  return (
    <>
      <header>
        <div className={styles.info}>
          <h1 className={styles.infoAppName}>SongBird</h1>
          <div className={styles.infoScore}>
            Очки:
            {' '}
            {score}
          </div>
          <div
            role="button"
            ref={burgerRef}
            className={styles.burgerMenu}
            onClick={onMenuToggle}
            tabIndex={0}
            onKeyPress={() => {
            }}
          >
            {[1, 2, 3, 4, 5].map(() => (<span key={uuid()} />))}
          </div>
        </div>

        <ul className={styles.menu} ref={menuRef}>
          {Object.keys(Buttons).map((button) => (
            <li className={`${styles.menuButton}`} key={button} indexkey={button}>
              <span>{Buttons[button as keyof typeof Buttons]}</span>
            </li>
          ))}
        </ul>
      </header>
      <menu ref={mobileMenuRef} className={styles.menuMobile}>
        <ul>
          <li>Текущий уровень</li>
          {Object.keys(Buttons).map((button) => (
            <li key={button} indexkey={button}>
              <span>
                {Buttons[button as keyof typeof Buttons]}
              </span>
            </li>
          ))}
        </ul>
      </menu>
    </>
  );
};

export default Header;
