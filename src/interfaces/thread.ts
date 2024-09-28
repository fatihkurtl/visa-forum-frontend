interface Reply {
  id: number;
  content: string;
  author: string;
  likes: number[];
  created_at: string;
  updated_at: string;
}

interface Comment {
  id: number;
  content: string;
  likes_count: number;
  replies: Reply[];
  author: string;
  created_at: string;
  updated_at: string;
}

interface IThread {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  likes_count: number;
  comments: Comment[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ICategory {
    id: number;
    name: string;
    sub_title: string;
    image: string | null;
    threads: IThread[];
    created_at: string;
    updated_at: string;
}

export interface ICreateThread {
  title: string;
  category: string;
  content: string;
}
