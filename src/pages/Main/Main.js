import { ProgressWidget } from '../../components';
import { useFetchTaskGroups } from '../../hooks';
import styles from './Main.module.css';

export function Main() {
  const { taskGroups, status, error } = useFetchTaskGroups();

  return (
    <div className={styles.wrapper}>
      <ProgressWidget title={'Lodgify Grouped Tasks'} taskGroups={taskGroups} />
    </div>
  );
}
