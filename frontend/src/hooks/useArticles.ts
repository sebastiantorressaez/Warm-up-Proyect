import { Article } from "@/types/article";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetArticles() {
  const { data, status } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles`
      );
      const articles = (await res.json()) as Article[];

      return articles.filter(
        (article) =>
          (article.story_title || article.title) &&
          (article.story_url || article.url)
      );
    },
  });

  return { data, status };
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (objectID: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/${objectID}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error("Error deleting article");
      }
      return objectID;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}
