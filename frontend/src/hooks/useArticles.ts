// src/hooks/useArticles.ts
import { useEffect, useState } from "react";

type Article = {
  _id: string;
  story_title: string;
  author: string;
  created_at: string;
};

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5000/articles");
        if (!res.ok) throw new Error("Error al obtener artículos");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { articles, loading, error };
}
