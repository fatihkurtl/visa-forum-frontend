import type { ICategory, ICreateComment, ICreateReply, IThread } from "@/interfaces/thread";
import { getMemberCookies } from "@/middlewares/cookies";
import { ApiServices } from "@/services/api";

export class ThreadHelper {
  private api: ApiServices;

  constructor(api: ApiServices) {
    this.api = api;
  }

  async getThreads(): Promise<IThread[]> {
    return this.api.get("/threads", {
      "Content-Type": "application/json",
    });
  }

  async getThread(id: string): Promise<IThread> {
    return this.api.get(`/threads/${id}`, {
      "Content-Type": "application/json",
    });
  }

  async addComment(comment: ICreateComment): Promise<any> {
    const token = await getMemberCookies();
    return this.api.post(`/threads/${comment.thread_id}/add/comment/`, comment, {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    });
  }

  async addReply(reply: ICreateReply): Promise<any> {
    const token = await getMemberCookies();
    return this.api.post(`/threads/${reply.parent_id}/add/reply/`, reply, {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    });
  }

  async addReplyToReply(reply: ICreateReply): Promise<any> {
    const token = await getMemberCookies();
    return this.api.post(`/threads/${reply.parent_id}/replies`, reply, {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    });
  }

  async getCategories(): Promise<ICategory[]> {
    return this.api.get("/threads/categories", {
      "Content-Type": "application/json",
    });
  }

  async createThread(data: any): Promise<any> {
    const token = await getMemberCookies();
    return this.api.post("/threads/create/", data, {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    });
  }
}
