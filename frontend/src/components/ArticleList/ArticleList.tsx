import ArticleRow from "../ArticleRow/ArticleRow";
import { ArticleListProps } from "@/types/article";

export default function ArticleList({
  articles,
  onDelete,
  status,
}: ArticleListProps) {
  if (status === "pending") return <p>Cargando artículos...</p>;
  if (status === "error") return <p>Error al cargar artículos</p>;
  if (status === "success" && articles.length === 0) {
    return <p>No hay artículos disponibles.</p>;
  }

  return (
    <>
      {articles.map((article) => (
        <ArticleRow
          key={article._id}
          {...article}
          onDelete={() => onDelete(article.objectID)}
        />
      ))}
    </>
  );
}
