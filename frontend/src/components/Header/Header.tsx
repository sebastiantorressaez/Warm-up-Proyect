import styles from "./Header.module.css";
import Link from "next/link"; // Si usas Next.js

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.title}>HN Feed</h1>
        <p className={styles.subtitle}>We &lt;3 hacker news!</p>
      </div>
    </header>
  );
}
