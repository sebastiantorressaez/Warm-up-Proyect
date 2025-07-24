import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>HN Feed</h1>
      <p className={styles.subtitle}>We &lt;3 hacker news!</p>
    </div>
  );
}
