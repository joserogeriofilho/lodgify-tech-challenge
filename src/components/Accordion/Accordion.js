import styles from './Accordion.module.css';

import arrowUp from '../../assets/icon-arrow-line-up.svg';
import arrowDown from '../../assets/icon-arrow-line-down.svg';

export function Accordion({ header, content, expanded, onToggleExpand }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header} onClick={onToggleExpand}>
        {header}
        <div className={styles.expandLink}>{expanded ? 'Hide' : 'Show'}</div>
        <img
          src={expanded ? arrowUp : arrowDown}
          className={styles.iconExpandLink}
          alt=""
        />
      </div>
      {expanded && <div className={styles.content}>{content}</div>}
    </div>
  );
}
