import ArticleRow from "../ArticleRow/ArticleRow";
import styles from "./ArticleList.module.css";
import { useDeleteArticle, useGetArticles } from "@/hooks/useArticles";

export default function ArticleList() {
  const { data: articles, status } = useGetArticles();
  const { mutate: deleteArticle } = useDeleteArticle();

  if (status === "pending")
    return <p className={styles.message}>Cargando artículos...</p>;
  if (status === "error")
    return <p className={styles.message}>Error al cargar artículos</p>;
  if (status === "success" && articles!.length === 0) {
    return <p className={styles.message}>No hay artículos disponibles.</p>;
  }

  return (
    <div className={styles.list}>
      {articles?.map((article) => (
        <ArticleRow
          key={article.objectID}
          {...article}
          onDelete={() => deleteArticle(article.objectID)}
        />
      ))}
    </div>
  );
}
