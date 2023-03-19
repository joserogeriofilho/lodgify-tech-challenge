import styles from './ProgressBar.module.css';

export function ProgressBar({ progress }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.progress} style={{ width: `${progress}%` }}>
        {progress}%
      </div>
    </div>
  );
}
