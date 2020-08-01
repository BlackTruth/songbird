import React, { createRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { v4 as uuid } from 'uuid';
import styles from './header.module.scss';

import { Buttons } from '../../constants/strings';

interface IHeader {
  score: number,
}

const Header: React.FC< IHeader > = ({ score }: IHeader) => {
  const mobileMenuRef = createRef<HTMLElement>();
  const burgerRef = createRef<HTMLDivElement>();
  const { pathname: location } = useLocation();

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

  const onMenuClick = () => {
    const burger: HTMLElement | null = burgerRef.current;
    const menu: HTMLElement | null = mobileMenuRef.current;
    if (menu && burger) {
      menu.classList.remove(styles.menuMobileEnabled);
      burger.classList.remove(styles.burgerMenuToggled);
    }
  };

  return (
    <>
      <header>
        <div className={styles.info}>
          <h1 className={styles.infoAppName}>SongBird</h1>
          <div className={styles.infoScore}>
            Score:
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

        <ul className={styles.menu}>
          {Object.keys(Buttons).map((button) => {
            const isActive: boolean = location.includes(button);
            return (
              <li className={`${styles.menuButton} ${isActive ? styles.menuButtonActive : ''}`} key={uuid()}>
                <Link to={button}>{Buttons[button as keyof typeof Buttons]}</Link>
              </li>
            );
          })}
        </ul>
      </header>
      <menu ref={mobileMenuRef} className={styles.menuMobile}>
        <ul>
          {Object.keys(Buttons).map((button) => {
            const isActive: boolean = location.includes(button);
            return (
              <li className={`${isActive ? styles.active : ''}`} key={uuid()}>
                <Link to={button} onClick={onMenuClick}>
                  {Buttons[button as keyof typeof Buttons]}
                </Link>
              </li>
            );
          })}
        </ul>
      </menu>
    </>
  );
};

export default Header;
