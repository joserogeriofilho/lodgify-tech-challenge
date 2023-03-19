import styles from './Checkbox.module.css';
import uncheckedIcon from '../../assets/icon-checkbox-unchecked.svg';
import checkedIcon from '../../assets/icon-checkbox-checked.svg';

export function Checkbox({ label, checked, onToggleSelection }) {
  return (
    <label className={styles.wrapper}>
      <input type="checkbox" checked={checked} onChange={onToggleSelection} />
      <img
        src={checked ? checkedIcon : uncheckedIcon}
        className={styles.checkbox}
        alt=""
      />
      {label}
    </label>
  );
}
