import { useEffect, useState } from 'react';
import { Accordion, Checkbox, ProgressBar } from '../../components';

import styles from './ProgressWidget.module.css';

import clipboardIcon from '../../assets/icon-clipboard.svg';
import clipboardIconGreen from '../../assets/icon-clipboard-green.svg';

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

const isGroupComplete = (group) =>
  group.tasks.reduce((acc, task) => {
    if (!acc) return false;
    if (!task.checked) return false;
    return true;
  }, true);

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
        <ProgressBar progress={progress} />
      </div>

      <div className={styles.content}>
        {groups &&
          !!groups.length &&
          groups.map((group, groupIndex) => {
            const isComplete = isGroupComplete(group);

            return (
              <Accordion
                expanded={group.expanded}
                key={groupIndex}
                onToggleExpand={() => handleToggleExpand(groupIndex)}
                header={
                  <>
                    <img
                      src={isComplete ? clipboardIconGreen : clipboardIcon}
                      className={styles.accordionIconTitle}
                      alt=""
                    />
                    <div
                      className={`${styles.accordionTitle} ${
                        isComplete ? styles.groupCompleted : ''
                      }`}
                    >
                      {group.name}
                    </div>
                  </>
                }
                content={
                  <>
                    {group.tasks.map((task, taskIndex) => (
                      <div key={taskIndex}>
                        <Checkbox
                          itemKey={taskIndex}
                          label={task.description}
                          checked={task.checked}
                          onToggleSelection={() =>
                            handleToggleTask(groupIndex, taskIndex)
                          }
                        />
                      </div>
                    ))}
                  </>
                }
              />
            );
          })}
      </div>
    </div>
  );
}
