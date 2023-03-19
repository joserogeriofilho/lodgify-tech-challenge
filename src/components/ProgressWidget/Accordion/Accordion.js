import { useState } from 'react';
import styles from './Accordion.module.css';

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
