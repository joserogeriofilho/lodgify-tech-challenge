import { useState } from 'react';
import { Checkbox } from '../../Checkbox';
import styles from './Accordion.module.css';

import icon from '../../../assets/icon-clipboard.svg';
import greenIcon from '../../../assets/icon-clipboard-green.svg';
import arrowUp from '../../../assets/icon-arrow-line-up.svg';
import arrowDown from '../../../assets/icon-arrow-line-down.svg';

export function Accordion({
  title,
  tasks,
  expanded,
  onToggleExpand,
  onToggleTask,
}) {
  const allTasksChecked = tasks.reduce((acc, task) => {
    if (!acc) return false;
    if (!task.checked) return false;
    return true;
  }, true);

  return (
    <div
      className={`${styles.wrapper} ${
        allTasksChecked ? styles.completed : null
      }`}
    >
      <div className={styles.header} onClick={onToggleExpand}>
        <img
          src={allTasksChecked ? greenIcon : icon}
          className={styles.iconTitle}
          alt=""
        />
        <div className={styles.title}>{title}</div>
        <div className={styles.expandLink}>{expanded ? 'Hide' : 'Show'}</div>
        <img
          src={expanded ? arrowUp : arrowDown}
          className={styles.iconExpandLink}
          alt=""
        />
      </div>
      {expanded && (
        <div className={styles.content}>
          {tasks.map((item, index) => (
            <div key={index}>
              <Checkbox
                itemKey={index}
                label={item.description}
                checked={item.checked}
                onToggleSelection={() => onToggleTask(index)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
