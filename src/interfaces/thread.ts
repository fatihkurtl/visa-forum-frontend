export interface IThread {

}

export interface ICategory {
  id: number;
  name: string;
  sub_title: string | null;
  image: string | null;
  threads: IThread[];
  created_at: string;
  updated_at: string;
}
