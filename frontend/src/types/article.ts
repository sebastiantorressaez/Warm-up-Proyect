export type Article = {
  _id: string;
  objectID: string;
  story_title?: string;
  title?: string;
  author: string;
  story_url?: string;
  url?: string;
  created_at: string;
};

export type ArticleRowProps = {
  story_title?: string;
  title?: string;
  author: string;
  created_at: string;
  story_url?: string;
  url?: string;
  onDelete: () => void;
};

export type DeleteButtonProps = {
  onClick: () => void;
  className: string;
};

export type ArticleListProps = {
  articles: Article[];
  onDelete: (objectID: string) => void;
  status: "pending" | "error" | "success";
};
