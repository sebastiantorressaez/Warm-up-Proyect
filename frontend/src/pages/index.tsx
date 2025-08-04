import ArticleList from "@/components/ArticleList/ArticleList";
import Header from "@/components/Header/Header";
import { useDeleteArticle, useGetArticles } from "@/hooks/useArticles";

export default function Home() {
  const { data: articles, status } = useGetArticles();
  const { mutate: deleteArticle, isPending: isDeleting } = useDeleteArticle();

  return (
    <main>
      <Header />
      <ArticleList 
        articles={articles ?? []} 
        onDelete={deleteArticle} 
        status={status} 
      />
    </main>
  );
}
