import styles from "./ArticleRow.module.css";

export default function ArticleRow({ story_title, author, created_at, onDelete }) {
  return (
    <div className={styles.row}>
      <div className={styles.title}>{story_title}</div>
      <div className={styles.author}>{author}</div>
      <div className={styles.createdAt}>{created_at}</div>
      <button className={styles.deleteButton} onClick={onDelete}>Delete</button>
    </div>
  );
}
