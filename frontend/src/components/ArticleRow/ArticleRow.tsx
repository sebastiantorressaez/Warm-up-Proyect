import { ArticleRowProps } from "@/types/article";
import styles from "./ArticleRow.module.css";
import DeleteButton from "../DeleteButton/DeleteButton";
import { formatArticleDate } from "@/utils/formatArticleDate";

export default function ArticleRow({
  story_title,
  title,
  author,
  created_at,
  story_url,
  url,
  onDelete,
}: ArticleRowProps) {
  const displayTitle = story_title ?? title;
  const displayUrl = story_url ?? url;
  return (
    <div className={styles.row}>
      <a href={displayUrl} className={styles.link}>
        <div className={styles.leftContainer}>
          <span className={styles.title}>{displayTitle}</span>
          <span className={styles.author}>- {author} -</span>
        </div>
        <div className={styles.createdAt}>{formatArticleDate(created_at)}</div>
      </a>
      <DeleteButton className={styles.visibleOnHover} onClick={onDelete} />
    </div>
  );
}
