export interface IReply {
  id: number;
  content: string;
  likes_count: number;
  author: string;
  created_at: string;
  updated_at: string;
  parent: number | null;
  children: IReply[];
}

export interface ICreateReply {
  type: string;
  parent_id: number | string;
  content: string;
}

export interface IComment {
  thread: number;
  id: number;
  content: string;
  likes_count: number;
  author: string;
  created_at: string;
  updated_at: string;
  replies: IReply[];
}

export interface ICreateComment {
  thread_id: number | string;
  content: string;
}

export interface IThread {
  id: number;
  title: string;
  content: string;
  category: string;
  views: number;
  author: string;
  likes_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  comments: IComment[];
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
