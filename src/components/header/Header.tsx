import React from 'react';

import { v4 as uuid } from 'uuid';
import styles from './header.module.scss';

import { buttons } from '../../constants/strings';

console.log(styles);

const header: React.FC< {score: number} > = ({ score }) => (
  <header>
    <div className={styles.info}>
      <h1 className={styles.infoAppName}>SongBird</h1>
      <div className={styles.infoScore}>
        Score:
        {score}
      </div>
    </div>

    <ul className={styles.menu}>
      {buttons.map((button) => (
        <li className={styles.menuButton} key={uuid()}>{button}</li>
      ))}
    </ul>
  </header>

);

export default header;
