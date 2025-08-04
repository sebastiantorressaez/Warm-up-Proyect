import { ArticleRowProps } from "@/types/article";
import styles from "./ArticleRow.module.css";
import DeleteButton from "../DeleteButton/DeleteButton";
import { formatArticleDate } from "@/utils/formatArticleDate";

const ArticleRow = ({
  story_title,
  title,
  author,
  created_at,
  story_url,
  url,
  onDelete,
}: ArticleRowProps) => {
  const displayTitle = story_title ?? title;
  const displayUrl = story_url ?? url;
  return (
    <div className={styles.row}>
      <a href={displayUrl} className={styles.fullLink}>
        <div className={styles.titleAuthor}>
          <span className={styles.title}>{displayTitle}</span>
          <span className={styles.author}>- {author} -</span>
        </div>
      </a>
      <div className={styles.rightSide}>
        <div className={styles.createdAt}>{formatArticleDate(created_at)}</div>
        <DeleteButton onClick={onDelete} className={styles.visibleOnHover} />
      </div>
    </div>
  );
};

export default ArticleRow;
