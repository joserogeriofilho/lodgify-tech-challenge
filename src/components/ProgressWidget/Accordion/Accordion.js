import { useState } from 'react';
import styles from './Accordion.module.css';

export function Accordion({
  title,
  tasks,
  expanded,
  onToggleExpand,
  onToggleTask,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>icon</div>
        <div>{title}</div>
        <div className={styles.expandLink} onClick={onToggleExpand}>
          {expanded ? 'Hide' : 'Show'}
        </div>
      </div>
      <div
        className={`${styles.content} ${
          expanded ? styles.expanded : styles.collapsed
        }`}
      >
        {tasks.map((item, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => onToggleTask(index)}
            />
            {item.description} + {item.value}
          </label>
        ))}
      </div>
    </div>
  );
}
