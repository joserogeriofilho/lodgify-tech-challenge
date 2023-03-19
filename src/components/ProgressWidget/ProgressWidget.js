import { useEffect, useState } from 'react';
import styles from './ProgressWidget.module.css';
import { Accordion } from './Accordion';

const calculateProgress = (groups) => {
  if (!groups || !groups.length) return;

  let totalAmount = 0,
    selectedAmount = 0;

  groups.forEach((group) => {
    group.tasks.forEach((task) => {
      if (task.checked) selectedAmount += task.value;
      totalAmount += task.value;
    });
  });

  return Math.round((100 * selectedAmount) / totalAmount);
};

export function ProgressWidget({ title, taskGroups }) {
  const [groups, setGroups] = useState([]);

  const progress = calculateProgress(groups);

  const handleToggleExpand = (groupIndex) => {
    const newState = [...groups];
    newState[groupIndex].expanded = !newState[groupIndex].expanded;
    setGroups(newState);
  };

  const handleToggleTask = (groupIndex, taskIndex) => {
    const newState = [...groups];
    newState[groupIndex].tasks[taskIndex].checked =
      !newState[groupIndex].tasks[taskIndex].checked;
    setGroups(newState);
  };

  useEffect(() => {
    if (taskGroups && taskGroups.length) {
      setGroups(
        taskGroups.map((item) => ({
          ...item,
          expanded: false,
        }))
      );
    }
  }, [taskGroups]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <div>{progress}</div>
      </div>
      <div className={styles.content}>
        {groups &&
          !!groups.length &&
          groups.map((group, groupIndex) => (
            <Accordion
              title={group.name}
              tasks={group.tasks}
              expanded={group.expanded}
              key={groupIndex}
              onToggleExpand={() => handleToggleExpand(groupIndex)}
              onToggleTask={(taskIndex) =>
                handleToggleTask(groupIndex, taskIndex)
              }
            />
          ))}
      </div>
    </div>
  );
}
