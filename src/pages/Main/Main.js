import { GroupedTasks } from '../../components';
import styles from './Main.module.css';

export function Main() {
  return (
    <div className={styles.wrapper}>
      <GroupedTasks />
    </div>
  );
}
