import ArticleRow from "@/components/ArticleRow";
import Header from "@/components/Header";
import { useArticles } from "@/hooks/useArticles";

export default function Home() {
  const { articles, loading, error } = useArticles();

  if (loading) return <p>Cargando artículos...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <main>
      <Header />
      <div style={{ padding: "0 20px" }}>
        {articles.map((article) => (
          <ArticleRow
            key={article._id}
            story_title={article.story_title}
            author={article.author}
            created_at={article.created_at}
            onDelete={() => alert(`Borrar ${article._id}`)}
          />
        ))}
      </div>
    </main>
  );
}
