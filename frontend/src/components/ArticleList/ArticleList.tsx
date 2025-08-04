import ArticleRow from "../ArticleRow/ArticleRow";
import styles from "./ArticleList.module.css";
import { useDeleteArticle, useGetArticles } from "@/hooks/useArticles";

export default function ArticleList() {
  const { data: articles, status } = useGetArticles();
  const { mutate: deleteArticle } = useDeleteArticle();

  if (status === "pending") return <p>Cargando artículos...</p>;
  if (status === "error") return <p>Error al cargar artículos</p>;
  if (status === "success" && articles!.length === 0) {
    return <p>No hay artículos disponibles.</p>;
  }

  return (
    <div className={styles.list}>
      {articles?.map((article) => (
        <ArticleRow
          key={article._id}
          {...article}
          onDelete={() => deleteArticle(article.objectID)}
        />
      ))}
    </div>
  );
}
