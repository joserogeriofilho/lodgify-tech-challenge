import styles from './GroupedTasks.module.css';

export function GroupedTasks() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>Lodgify Grouped Tasks</div>
        <div>Progress bar</div>
      </div>
      <div className={styles.content}>
        <ul>
          <li>Group 1</li>
          <li>Group 2</li>
          <li>Group 3</li>
        </ul>
      </div>
    </div>
  );
}
